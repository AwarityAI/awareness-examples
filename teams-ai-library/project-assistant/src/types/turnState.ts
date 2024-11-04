// src/types/turnState.ts

import { TurnState, DefaultConversationState, DefaultUserState, DefaultTempState, InputFile } from '@microsoft/teams-ai';

// Define the structure for task data
export interface TaskData {
    id: string;
    title: string;
    description?: string;
    dueDate: string;
    assignedTo: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Not Started' | 'In Progress' | 'Completed';
    attachments?: string[];
}

// Define the structure for meeting data
export interface MeetingData {
    id: string;
    subject: string;
    datetime: string;
    duration: number;
    attendees: string[];
    status: 'scheduled' | 'cancelled' | 'completed';
    onlineMeeting?: boolean;
    meetingLink?: string;
}

// Extend the default conversation state
export interface ProjectConversationState extends DefaultConversationState {
    messages: Array<{ role: string; content: string }>;
    lastCommand?: string;
    pendingAction?: string;
    tasks: Record<string, TaskData>;
    meetings: Record<string, MeetingData>;
    graphToken?: string;
}

// Extend the default user state
export interface ProjectUserState extends DefaultUserState {
    name?: string;
    email?: string;
    authenticated: boolean;
    preferences?: {
        timezone?: string;
        notifications?: boolean;
        language?: string;
    };
}

// Extend the default temporary state
export interface ProjectTempState extends DefaultTempState {
    currentTaskId?: string;
    currentMeetingId?: string;
    lastInteraction?: Date;
    processingAction?: boolean;
    // Required properties from DefaultTempState with correct types
    input: string;
    inputFiles: InputFile[];
    lastOutput: string;
    actionOutputs: Record<string, any>;
    authTokens: Record<string, string>;
}

// Define the complete application turn state
export type ProjectAssistantState = TurnState<
    ProjectConversationState,
    ProjectUserState,
    ProjectTempState
>;

// Export a type guard for checking state properties
export function isValidProjectState(state: any): state is ProjectAssistantState {
    return (
        state &&
        typeof state === 'object' &&
        'conversation' in state &&
        'user' in state &&
        'temp' in state
    );
}

// Export a function to create initial state
export function createInitialState(): Partial<ProjectAssistantState> {
    return {
        conversation: {
            messages: [],
            tasks: {},
            meetings: {}
        },
        user: {
            authenticated: false
        },
        temp: {
            input: '',
            inputFiles: [], // This is now an empty array of InputFile objects
            lastOutput: '',
            actionOutputs: {},
            authTokens: {},
            processingAction: false,
            lastInteraction: new Date()
        }
    };
}