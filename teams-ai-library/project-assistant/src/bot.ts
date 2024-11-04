// src/bot.ts

import {
    Application,
    OpenAIModel,
    PromptManager,
    AI,
    Plan,
    Memory
} from '@microsoft/teams-ai';
import {
    ActivityHandler,
    TurnContext,
    UserState,
    ConversationState,
    CardFactory
} from 'botbuilder';
import { TaskManager } from './utils/taskManager';
import { MeetingManager } from './utils/meetingManager';
import { AuthManager } from './utils/authManager';
import { ResponseFormatter } from './utils/responseFormatter';
import { TaskCard } from './cards/taskCard';
import { ProjectAssistantState, createInitialState } from './types/turnState';

export class ProjectAssistantBot extends ActivityHandler {
    private application: Application<ProjectAssistantState>;
    private userProfileAccessor: any;
    private conversationDataAccessor: any;

    constructor(
        private aiModel: OpenAIModel,
        private prompts: PromptManager,
        private taskManager: TaskManager,
        private meetingManager: MeetingManager,
        private authManager: AuthManager,
        private userState: UserState,
        private conversationState: ConversationState,
        private initialState: Partial<ProjectAssistantState>
    ) {
        super();

        // Create accessors
        this.userProfileAccessor = this.userState.createProperty('UserProfile');
        this.conversationDataAccessor = this.conversationState.createProperty('ConversationData');

        // Initialize application with custom planner
        this.application = new Application<ProjectAssistantState>({
            storage: this.conversationState.storage,
            ai: {
                planner: {
                    model: this.aiModel,
                    prompts: this.prompts,
                    defaultPrompt: 'chat',
                    async beginTask(context: TurnContext, state: ProjectAssistantState, ai: AI<ProjectAssistantState>, memory: Memory): Promise<Plan> {
                        try {
                            const response = await ai.completePrompt(context, memory, {
                                prompt: 'chat',
                                temperature: 0.7,
                                maxTokens: 800
                            });

                            return {
                                type: 'plan',
                                commands: [{
                                    type: 'SAY',
                                    response: response.content
                                }]
                            };
                        } catch (error) {
                            console.error('AI Planning Error:', error);
                            return {
                                type: 'plan',
                                commands: [{
                                    type: 'SAY',
                                    response: 'I apologize, but I encountered an error processing your request.'
                                }]
                            };
                        }
                    },
                    async continueTask(context: TurnContext, state: ProjectAssistantState, ai: AI<ProjectAssistantState>): Promise<Plan> {
                        return { type: 'plan', commands: [] };
                    }
                }
            }
        });

        // Register message handler
        this.onMessage(async (context, next) => {
            try {
                await this.handleMessage(context);
            } catch (error) {
                await this.handleError(context, error);
            }
            await next();
        });

        // Register conversation update handler
        this.onConversationUpdate(async (context, next) => {
            if (context.activity.membersAdded?.some(m => m.id === context.activity.recipient.id)) {
                await this.sendWelcomeMessage(context);
            }
            await next();
        });

        // Register action handlers
        this.registerActionHandlers();
    }

    private registerActionHandlers(): void {
        this.application.ai.action('createTask', async (context: TurnContext, state: ProjectAssistantState, args: any) => {
            const task = await this.taskManager.createTask(context, args);
            const taskCard = TaskCard.createTaskCard(task);
            await context.sendActivity({ attachments: [taskCard] });
            return 'Task created successfully';
        });

        this.application.ai.action('scheduleMeeting', async (context: TurnContext, state: ProjectAssistantState, args: any) => {
            const meeting = await this.meetingManager.scheduleMeeting(context, args);
            const response = ResponseFormatter.formatMeetingConfirmation(meeting);
            await context.sendActivity(response);
            return 'Meeting scheduled successfully';
        });

        this.application.ai.action('viewTasks', async (context: TurnContext, state: ProjectAssistantState, args: any) => {
            const tasks = await this.taskManager.getUserTasks(context, args.userId);
            if (tasks.length === 0) {
                return 'No tasks found';
            }
            for (const task of tasks) {
                const taskCard = TaskCard.createTaskCard(task);
                await context.sendActivity({ attachments: [taskCard] });
            }
            return 'Tasks retrieved successfully';
        });

        this.application.ai.action('updateTask', async (context: TurnContext, state: ProjectAssistantState, args: any) => {
            const task = await this.taskManager.updateTask(context, args.taskId, args);
            const taskCard = TaskCard.createTaskCard(task);
            await context.sendActivity({ attachments: [taskCard] });
            return 'Task updated successfully';
        });
    }

    private async handleMessage(context: TurnContext): Promise<void> {
        // Check authentication
        const isAuthenticated = await this.authManager.checkAuthentication(context);
        if (!isAuthenticated) {
            await this.handleAuthenticationRequest(context);
            return;
        }

        // Get state
        const state = await this.getState(context);

        try {
            // Process message with AI
            await this.application.run(context, state);
        } catch (error) {
            await this.handleError(context, error);
        }
    }

    private async getState(context: TurnContext): Promise<ProjectAssistantState> {
        const state = this.initialState as ProjectAssistantState;
        state.conversation = await this.conversationDataAccessor.get(context, {
            messages: [],
            tasks: {},
            meetings: {}
        });
        state.user = await this.userProfileAccessor.get(context, {
            authenticated: false
        });
        return state;
    }

    private async handleAuthenticationRequest(context: TurnContext): Promise<void> {
        const card = CardFactory.signinCard(
            'Please sign in to use the Project Assistant Bot',
            'Sign In',
            'https://login.microsoftonline.com'
        );
        await context.sendActivity({ attachments: [card] });
    }

    private async handleError(context: TurnContext, error: any): Promise<void> {
        console.error('Bot Error:', error);
        const errorMessage = ResponseFormatter.formatError(error);
        await context.sendActivity(errorMessage);
    }

    private async sendWelcomeMessage(context: TurnContext): Promise<void> {
        const welcomeMessage = ResponseFormatter.formatText(
            'Welcome to Project Assistant Bot! I can help you with:\n' +
            '• Creating and managing tasks\n' +
            '• Scheduling meetings\n' +
            '• Team collaboration\n\n' +
            'Type "help" to see all available commands.',
            { useEmoji: true }
        );
        await context.sendActivity(welcomeMessage);
    }

    public async run(context: TurnContext): Promise<void> {
        await super.run(context);
        
        // Save state changes
        await this.conversationState.saveChanges(context);
        await this.userState.saveChanges(context);
    }
}