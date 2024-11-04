// src/cards/taskCard.ts

import { CardFactory, Attachment } from 'botbuilder';

interface TaskData {
    id: string;
    title: string;
    description?: string;
    dueDate: string;
    assignedTo: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Not Started' | 'In Progress' | 'Completed';
    attachments?: string[];
}

export class TaskCard {
    /**
     * Creates a new task card
     */
    public static createTaskCard(task: TaskData): Attachment {
        return CardFactory.adaptiveCard({
            type: 'AdaptiveCard',
            version: '1.5',
            body: [
                {
                    type: 'Container',
                    style: 'emphasis',
                    items: [
                        {
                            type: 'TextBlock',
                            text: task.title,
                            size: 'Large',
                            weight: 'Bolder',
                            wrap: true
                        },
                        {
                            type: 'TextBlock',
                            text: task.description || '',
                            isSubtle: true,
                            wrap: true
                        }
                    ]
                },
                {
                    type: 'FactSet',
                    facts: [
                        { title: 'Due Date:', value: task.dueDate },
                        { title: 'Assigned To:', value: task.assignedTo },
                        { title: 'Priority:', value: task.priority },
                        { title: 'Status:', value: task.status }
                    ]
                },
                ...(task.attachments && task.attachments.length > 0 ? [{
                    type: 'Container',
                    items: [
                        {
                            type: 'TextBlock',
                            text: 'Attachments:',
                            weight: 'Bolder'
                        },
                        {
                            type: 'FactSet',
                            facts: task.attachments.map(attachment => ({
                                title: '📎',
                                value: attachment
                            }))
                        }
                    ]
                }] : [])
            ],
            actions: [
                {
                    type: 'Action.Submit',
                    title: 'Update Status',
                    data: {
                        taskId: task.id,
                        action: 'updateStatus'
                    }
                },
                {
                    type: 'Action.Submit',
                    title: 'Edit Task',
                    data: {
                        taskId: task.id,
                        action: 'editTask'
                    }
                },
                {
                    type: 'Action.Submit',
                    title: 'Add Attachment',
                    data: {
                        taskId: task.id,
                        action: 'addAttachment'
                    }
                }
            ]
        });
    }

    /**
     * Creates a task confirmation card
     */
    public static createConfirmationCard(task: TaskData): Attachment {
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
                            text: '✅ Task Created Successfully',
                            size: 'Medium',
                            weight: 'Bolder'
                        },
                        {
                            type: 'FactSet',
                            facts: [
                                { title: 'Task:', value: task.title },
                                { title: 'Due:', value: task.dueDate },
                                { title: 'Assigned:', value: task.assignedTo }
                            ]
                        }
                    ]
                }
            ],
            actions: [
                {
                    type: 'Action.Submit',
                    title: 'View Task Details',
                    data: {
                        taskId: task.id,
                        action: 'viewTask'
                    }
                }
            ]
        });
    }

    /**
     * Creates a task update card
     */
    public static createUpdateStatusCard(taskId: string): Attachment {
        return CardFactory.adaptiveCard({
            type: 'AdaptiveCard',
            version: '1.5',
            body: [
                {
                    type: 'TextBlock',
                    text: 'Update Task Status',
                    size: 'Medium',
                    weight: 'Bolder'
                },
                {
                    type: 'Input.ChoiceSet',
                    id: 'status',
                    style: 'expanded',
                    choices: [
                        { title: 'Not Started', value: 'Not Started' },
                        { title: 'In Progress', value: 'In Progress' },
                        { title: 'Completed', value: 'Completed' }
                    ]
                }
            ],
            actions: [
                {
                    type: 'Action.Submit',
                    title: 'Update',
                    data: {
                        taskId: taskId,
                        action: 'submitStatusUpdate'
                    }
                }
            ]
        });
    }
}