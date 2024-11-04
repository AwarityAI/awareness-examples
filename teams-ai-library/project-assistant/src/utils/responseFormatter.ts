// src/utils/responseFormatter.ts

import { Activity, CardFactory, MessageFactory } from 'botbuilder';

interface FormatOptions {
    useMarkdown?: boolean;
    useEmoji?: boolean;
    includeTimestamp?: boolean;
}

export class ResponseFormatter {
    /**
     * Format basic text response
     */
    public static formatText(text: string, options: FormatOptions = {}): Partial<Activity> {
        let formattedText = text;

        if (options.useMarkdown) {
            formattedText = this.convertMarkdown(formattedText);
        }

        if (options.useEmoji) {
            formattedText = this.addEmoji(formattedText);
        }

        if (options.includeTimestamp) {
            formattedText = `[${new Date().toLocaleTimeString()}] ${formattedText}`;
        }

        return MessageFactory.text(formattedText);
    }

    /**
     * Format success message
     */
    public static formatSuccess(message: string): Partial<Activity> {
        return this.formatText(`✅ ${message}`, { useEmoji: true });
    }

    /**
     * Format error message
     */
    public static formatError(error: Error | string): Partial<Activity> {
        const errorMessage = error instanceof Error ? error.message : error;
        return this.formatText(`❌ Error: ${errorMessage}`, { useEmoji: true });
    }

    /**
     * Format task details
     */
    public static formatTaskDetails(task: any): string {
        return `Task Details:
Title: ${task.title}
Due Date: ${new Date(task.dueDate).toLocaleDateString()}
Assigned To: ${task.assignedTo}
Priority: ${task.priority}
Status: ${task.status}
${task.description ? `Description: ${task.description}` : ''}`;
    }

    /**
     * Format meeting confirmation
     */
    public static formatMeetingConfirmation(meeting: any): string {
        return `📅 Meeting Scheduled:
Subject: ${meeting.subject}
Time: ${new Date(meeting.datetime).toLocaleString()}
Duration: ${meeting.duration} minutes
Attendees: ${meeting.attendees.join(', ')}
${meeting.meetingLink ? `Join URL: ${meeting.meetingLink}` : ''}`;
    }

    /**
     * Create basic adaptive card
     */
    public static createBasicCard(title: string, text: string): any {
        return CardFactory.adaptiveCard({
            type: 'AdaptiveCard',
            version: '1.5',
            body: [
                {
                    type: 'TextBlock',
                    text: title,
                    weight: 'Bolder',
                    size: 'Medium'
                },
                {
                    type: 'TextBlock',
                    text: text,
                    wrap: true
                }
            ]
        });
    }

    /**
     * Create confirmation card
     */
    public static createConfirmationCard(title: string, details: string): any {
        return CardFactory.adaptiveCard({
            type: 'AdaptiveCard',
            version: '1.5',
            body: [
                {
                    type: 'Container',
                    style: 'good',
                    items: [
                        {
                            type: 'TextBlock',
                            text: `✅ ${title}`,
                            weight: 'Bolder',
                            size: 'Medium'
                        },
                        {
                            type: 'TextBlock',
                            text: details,
                            wrap: true
                        }
                    ]
                }
            ]
        });
    }

    /**
     * Create error card
     */
    public static createErrorCard(error: string): any {
        return CardFactory.adaptiveCard({
            type: 'AdaptiveCard',
            version: '1.5',
            body: [
                {
                    type: 'Container',
                    style: 'attention',
                    items: [
                        {
                            type: 'TextBlock',
                            text: '❌ Error Occurred',
                            weight: 'Bolder',
                            size: 'Medium'
                        },
                        {
                            type: 'TextBlock',
                            text: error,
                            wrap: true
                        }
                    ]
                }
            ]
        });
    }

    /**
     * Convert markdown to HTML
     */
    private static convertMarkdown(text: string): string {
        return text
            .replace(/```(\w+)?\n(.*?)\n```/gs, '<pre><code>$2</code></pre>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
            .replace(/\n/g, '<br>');
    }

    /**
     * Add emoji based on context
     */
    private static addEmoji(text: string): string {
        return text
            .replace(/\b(task|todo)\b/gi, '📝 $1')
            .replace(/\b(meeting)\b/gi, '📅 $1')
            .replace(/\b(deadline|due)\b/gi, '⏰ $1')
            .replace(/\b(important|priority)\b/gi, '❗ $1')
            .replace(/\b(complete|done|finished)\b/gi, '✅ $1');
    }

    /**
     * Format list items
     */
    public static formatList(items: string[]): string {
        return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
    }

    /**
     * Format progress update
     */
    public static formatProgress(completed: number, total: number): string {
        const percentage = Math.round((completed / total) * 100);
        const progressBar = this.createProgressBar(percentage);
        return `Progress: ${progressBar} ${percentage}% (${completed}/${total})`;
    }

    /**
     * Create visual progress bar
     */
    private static createProgressBar(percentage: number): string {
        const filled = '█'.repeat(Math.floor(percentage / 10));
        const empty = '░'.repeat(10 - Math.floor(percentage / 10));
        return `[${filled}${empty}]`;
    }
}