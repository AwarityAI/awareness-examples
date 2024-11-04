// src/utils/taskManager.ts

import { TurnContext, MemoryStorage, ConversationState } from 'botbuilder';
import { Client } from '@microsoft/microsoft-graph-client';

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

export class TaskManager {
    private storage: MemoryStorage;
    private conversationState: ConversationState;
    private taskDataAccessor: any;
    private graphClient?: Client;

    constructor() {
        this.storage = new MemoryStorage();
        this.conversationState = new ConversationState(this.storage);
        this.taskDataAccessor = this.conversationState.createProperty('TaskData');
    }

    /**
     * Initialize Graph client with access token
     */
    public setGraphClient(client: Client) {
        this.graphClient = client;
    }

    /**
     * Create a new task
     */
    public async createTask(context: TurnContext, taskDetails: Partial<TaskData>): Promise<TaskData> {
        try {
            // Generate unique ID
            const taskId = `task_${Date.now()}`;

            const newTask: TaskData = {
                id: taskId,
                title: taskDetails.title || 'Untitled Task',
                description: taskDetails.description,
                dueDate: taskDetails.dueDate || new Date().toISOString(),
                assignedTo: taskDetails.assignedTo || '',
                priority: taskDetails.priority || 'Medium',
                status: 'Not Started',
                attachments: taskDetails.attachments || []
            };

            // If Graph client is available, create task in Planner
            if (this.graphClient) {
                const plannerTask = {
                    title: newTask.title,
                    assignments: {
                        [newTask.assignedTo]: {
                            "@odata.type": "microsoft.graph.plannerAssignment",
                            "orderHint": " !"
                        }
                    },
                    dueDateTime: newTask.dueDate
                };

                await this.graphClient
                    .api('/planner/tasks')
                    .post(plannerTask);
            }

            // Store in local state
            const taskData = await this.taskDataAccessor.get(context, { tasks: [] });
            taskData.tasks.push(newTask);
            await this.conversationState.saveChanges(context);

            return newTask;
        } catch (error) {
            console.error(`Task Creation Error: ${error}`);
            throw new Error('Failed to create task');
        }
    }

    /**
     * Update existing task
     */
    public async updateTask(context: TurnContext, taskId: string, updates: Partial<TaskData>): Promise<TaskData> {
        try {
            const taskData = await this.taskDataAccessor.get(context, { tasks: [] });
            const taskIndex = taskData.tasks.findIndex((t: TaskData) => t.id === taskId);

            if (taskIndex === -1) {
                throw new Error('Task not found');
            }

            const updatedTask = {
                ...taskData.tasks[taskIndex],
                ...updates
            };

            // Update in Planner if Graph client is available
            if (this.graphClient) {
                await this.graphClient
                    .api(`/planner/tasks/${taskId}`)
                    .patch(updates);
            }

            // Update local state
            taskData.tasks[taskIndex] = updatedTask;
            await this.conversationState.saveChanges(context);

            return updatedTask;
        } catch (error) {
            console.error(`Task Update Error: ${error}`);
            throw new Error('Failed to update task');
        }
    }

    /**
     * Get tasks for user
     */
    public async getUserTasks(context: TurnContext, userId: string): Promise<TaskData[]> {
        try {
            const taskData = await this.taskDataAccessor.get(context, { tasks: [] });
            return taskData.tasks.filter((task: TaskData) => task.assignedTo === userId);
        } catch (error) {
            console.error(`Get Tasks Error: ${error}`);
            throw new Error('Failed to retrieve tasks');
        }
    }

    /**
     * Add attachment to task
     */
    public async addAttachment(context: TurnContext, taskId: string, attachmentUrl: string): Promise<TaskData> {
        try {
            const taskData = await this.taskDataAccessor.get(context, { tasks: [] });
            const taskIndex = taskData.tasks.findIndex((t: TaskData) => t.id === taskId);

            if (taskIndex === -1) {
                throw new Error('Task not found');
            }

            if (!taskData.tasks[taskIndex].attachments) {
                taskData.tasks[taskIndex].attachments = [];
            }

            taskData.tasks[taskIndex].attachments.push(attachmentUrl);
            await this.conversationState.saveChanges(context);

            return taskData.tasks[taskIndex];
        } catch (error) {
            console.error(`Attachment Error: ${error}`);
            throw new Error('Failed to add attachment');
        }
    }

    /**
     * Get task statistics
     */
    public async getTaskStats(context: TurnContext): Promise<{
        total: number;
        completed: number;
        inProgress: number;
        notStarted: number;
    }> {
        try {
            const taskData = await this.taskDataAccessor.get(context, { tasks: [] });
            const stats = {
                total: taskData.tasks.length,
                completed: 0,
                inProgress: 0,
                notStarted: 0
            };

            taskData.tasks.forEach((task: TaskData) => {
                switch (task.status) {
                    case 'Completed':
                        stats.completed++;
                        break;
                    case 'In Progress':
                        stats.inProgress++;
                        break;
                    case 'Not Started':
                        stats.notStarted++;
                        break;
                }
            });

            return stats;
        } catch (error) {
            console.error(`Stats Error: ${error}`);
            throw new Error('Failed to generate task statistics');
        }
    }
}