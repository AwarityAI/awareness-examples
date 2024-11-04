// src/index.ts

import { ConfigurationServiceClientCredentialFactory, MemoryStorage, UserState, ConversationState } from 'botbuilder';
import { OpenAIModel, PromptManager } from '@microsoft/teams-ai';
import * as path from 'path';
import * as restify from 'restify';
import { ProjectAssistantBot } from './bot';
import { TaskManager } from './utils/taskManager';
import { MeetingManager } from './utils/meetingManager';
import { AuthManager } from './utils/authManager';
import { CloudAdapter, ConfigurationBotFrameworkAuthentication } from 'botbuilder';
import { config, initializeConfig, validateConfig } from './config/config';
import { ProjectAssistantState, createInitialState } from './types/turnState';

// Initialize and validate configuration
const appConfig = initializeConfig();
validateConfig(appConfig);

// Create HTTP server
const server = restify.createServer({
    name: 'Project Assistant Bot',
    version: '1.0.0'
});
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

// Create bot adapter
const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(
    {},
    new ConfigurationServiceClientCredentialFactory({
        MicrosoftAppId: appConfig.bot.id,
        MicrosoftAppPassword: appConfig.bot.password,
        MicrosoftAppType: "MultiTenant"
    })
);

const adapter = new CloudAdapter(botFrameworkAuthentication);

// Add error handling
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    console.error(error.stack);

    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');

    // Clear out state
    await conversationState.delete(context);
};

// Create storage and state
const memoryStorage = new MemoryStorage();
const userState = new UserState(memoryStorage);
const conversationState = new ConversationState(memoryStorage);

// Initialize managers
const taskManager = new TaskManager();
const meetingManager = new MeetingManager();
const authManager = new AuthManager();

// Initialize AI components
const model = new OpenAIModel({
    apiKey: appConfig.openai.apiKey,
    defaultModel: appConfig.openai.model,
    azureApiKey: appConfig.openai.azureApiKey,
    azureEndpoint: appConfig.openai.azureEndpoint,
    useSystemMessage: appConfig.openai.useSystemMessage,
    logRequests: appConfig.environment === 'development'
});

const prompts = new PromptManager({
    promptsFolder: path.join(__dirname, './prompts')
});

// Initialize bot with state
const bot = new ProjectAssistantBot<ProjectAssistantState>(
    model,
    prompts,
    taskManager,
    meetingManager,
    authManager,
    userState,
    conversationState,
    createInitialState()
);

// Handle incoming requests
server.post('/api/messages', async (req, res) => {
    await adapter.process(req, res, async (context) => {
        await bot.run(context);
    });
});

// Health check endpoint
server.get('/health', (_req, res) => {
    res.send({
        status: 'healthy',
        version: '1.0.0',
        environment: appConfig.environment
    });
});

// Start server
const port = appConfig.bot.port;
server.listen(port, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
    console.log(`\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator`);
    console.log(`\nTo talk to your bot, open your Teams client or the Emulator`);
    if (appConfig.environment === 'development') {
        console.log(`\nBot endpoint: ${server.url}/api/messages`);
    }
});

// Export for testing purposes
export { server, adapter, bot };

// Handle server shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down...');
    await server.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down...');
    await server.close();
    process.exit(0);
});

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Promise Rejection:', error);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Enable graceful shutdown
process.on('beforeExit', async () => {
    await server.close();
});

// Log startup configuration (excluding sensitive data)
if (appConfig.environment === 'development') {
    console.log('\nStartup Configuration:');
    console.log('- Environment:', appConfig.environment);
    console.log('- Port:', appConfig.bot.port);
    console.log('- OpenAI Model:', appConfig.openai.model);
    console.log('- Using Azure OpenAI:', !!appConfig.openai.azureEndpoint);
    console.log('- Storage Type:', appConfig.storage.useMemoryStorage ? 'Memory' : 'Azure');
    console.log('- Logging Level:', appConfig.logging.level);
}