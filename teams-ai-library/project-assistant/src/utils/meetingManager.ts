// src/utils/meetingManager.ts

import { TurnContext, MemoryStorage, ConversationState, StatePropertyAccessor } from 'botbuilder';
import { Client } from '@microsoft/microsoft-graph-client';

interface MeetingData {
    id?: string;
    subject: string;
    datetime: string;
    duration: number;
    attendees: string[];
    status: 'scheduled' | 'cancelled' | 'completed';
    onlineMeeting?: boolean;
    meetingLink?: string;
}

interface MeetingState {
    meetings: MeetingData[];
    lastInteraction: string;
}

export class MeetingManager {
    private storage: MemoryStorage;
    private conversationState: ConversationState;
    private meetingDataAccessor: StatePropertyAccessor<MeetingState>;
    private graphClient?: Client;

    constructor() {
        this.storage = new MemoryStorage();
        this.conversationState = new ConversationState(this.storage);
        this.meetingDataAccessor = this.conversationState.createProperty<MeetingState>('MeetingState');
    }

    /**
     * Initialize Graph client with access token
     */
    public setGraphClient(client: Client) {
        this.graphClient = client;
    }

    /**
     * Schedule a new meeting
     */
    public async scheduleMeeting(context: TurnContext, meetingDetails: Partial<MeetingData>): Promise<MeetingData> {
        try {
            const meetingId = `meeting_${Date.now()}`;

            const newMeeting: MeetingData = {
                id: meetingId,
                subject: meetingDetails.subject || 'Untitled Meeting',
                datetime: meetingDetails.datetime || new Date().toISOString(),
                duration: meetingDetails.duration || 30,
                attendees: meetingDetails.attendees || [],
                status: 'scheduled',
                onlineMeeting: meetingDetails.onlineMeeting || true
            };

            // Create meeting in Microsoft Calendar if Graph client is available
            if (this.graphClient) {
                const event = {
                    subject: newMeeting.subject,
                    start: {
                        dateTime: newMeeting.datetime,
                        timeZone: 'UTC'
                    },
                    end: {
                        dateTime: this.calculateEndTime(newMeeting.datetime, newMeeting.duration),
                        timeZone: 'UTC'
                    },
                    attendees: newMeeting.attendees.map(attendee => ({
                        emailAddress: {
                            address: attendee
                        },
                        type: 'required'
                    })),
                    isOnlineMeeting: newMeeting.onlineMeeting,
                    onlineMeetingProvider: 'teamsForBusiness'
                };

                const response = await this.graphClient
                    .api('/me/events')
                    .post(event);

                newMeeting.id = response.id;
                newMeeting.meetingLink = response.onlineMeeting?.joinUrl;
            }

            // Store in local state
            const state = await this.meetingDataAccessor.get(context, { 
                meetings: [],
                lastInteraction: new Date().toISOString()
            });
            
            state.meetings.push(newMeeting);
            state.lastInteraction = new Date().toISOString();
            
            await this.conversationState.saveChanges(context);

            return newMeeting;
        } catch (error) {
            console.error(`Meeting Scheduling Error: ${error}`);
            throw new Error('Failed to schedule meeting');
        }
    }

    /**
     * Update existing meeting
     */
    public async updateMeeting(context: TurnContext, meetingId: string, updates: Partial<MeetingData>): Promise<MeetingData> {
        try {
            const state = await this.meetingDataAccessor.get(context, { 
                meetings: [],
                lastInteraction: new Date().toISOString()
            });

            const meetingIndex = state.meetings.findIndex(m => m.id === meetingId);
            if (meetingIndex === -1) {
                throw new Error('Meeting not found');
            }

            const updatedMeeting = {
                ...state.meetings[meetingIndex],
                ...updates
            };

            // Update in Calendar if Graph client is available
            if (this.graphClient) {
                const event = {
                    subject: updatedMeeting.subject,
                    start: {
                        dateTime: updatedMeeting.datetime,
                        timeZone: 'UTC'
                    },
                    end: {
                        dateTime: this.calculateEndTime(updatedMeeting.datetime, updatedMeeting.duration),
                        timeZone: 'UTC'
                    }
                };

                await this.graphClient
                    .api(`/me/events/${meetingId}`)
                    .patch(event);
            }

            state.meetings[meetingIndex] = updatedMeeting;
            state.lastInteraction = new Date().toISOString();
            
            await this.conversationState.saveChanges(context);

            return updatedMeeting;
        } catch (error) {
            console.error(`Meeting Update Error: ${error}`);
            throw new Error('Failed to update meeting');
        }
    }

    /**
     * Cancel meeting
     */
    public async cancelMeeting(context: TurnContext, meetingId: string): Promise<void> {
        try {
            if (this.graphClient) {
                await this.graphClient
                    .api(`/me/events/${meetingId}`)
                    .delete();
            }

            const state = await this.meetingDataAccessor.get(context, { 
                meetings: [],
                lastInteraction: new Date().toISOString()
            });

            const meetingIndex = state.meetings.findIndex(m => m.id === meetingId);
            if (meetingIndex !== -1) {
                state.meetings[meetingIndex].status = 'cancelled';
                state.lastInteraction = new Date().toISOString();
                await this.conversationState.saveChanges(context);
            }
        } catch (error) {
            console.error(`Meeting Cancellation Error: ${error}`);
            throw new Error('Failed to cancel meeting');
        }
    }

    /**
     * Get upcoming meetings
     */
    public async getUpcomingMeetings(context: TurnContext): Promise<MeetingData[]> {
        try {
            const state = await this.meetingDataAccessor.get(context, { 
                meetings: [],
                lastInteraction: new Date().toISOString()
            });

            return state.meetings.filter(meeting => 
                meeting.status === 'scheduled' && 
                new Date(meeting.datetime) > new Date()
            );
        } catch (error) {
            console.error(`Get Meetings Error: ${error}`);
            throw new Error('Failed to retrieve meetings');
        }
    }

    /**
     * Calculate meeting end time
     */
    private calculateEndTime(startTime: string, durationMinutes: number): string {
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + durationMinutes);
        return endTime.toISOString();
    }

    /**
     * Format meeting confirmation message
     */
    public formatMeetingConfirmation(meeting: MeetingData): string {
        return `Meeting scheduled:
Subject: ${meeting.subject}
Time: ${new Date(meeting.datetime).toLocaleString()}
Duration: ${meeting.duration} minutes
Attendees: ${meeting.attendees.join(', ')}
${meeting.meetingLink ? `Join URL: ${meeting.meetingLink}` : ''}`;
    }
}