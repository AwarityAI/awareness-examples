// src/config/config.ts

import { validateRequiredEnvVars, getEnvVar, getNumberEnvVar, getBooleanEnvVar } from './environment';

// Validate required environment variables on startup
validateRequiredEnvVars();

interface OpenAIConfig {
    apiKey: string;
    model: string;
    azureApiKey?: string;
    azureEndpoint?: string;
    temperature: number;
    maxTokens: number;
    useSystemMessage: boolean;
}

interface BotConfig {
    id: string;
    password: string;
    port: number;
    appId?: string;
    appPassword?: string;
}

interface AzureADConfig {
    clientId: string;
    clientSecret: string;
    tenantId: string;
    authorityHost: string;
}

interface StorageConfig {
    accountName?: string;
    accountKey?: string;
    containerName?: string;
    useMemoryStorage: boolean;
}

interface LogConfig {
    level: string;
    enableConsole: boolean;
    enableFile: boolean;
}

export interface ApplicationConfig {
    environment: string;
    openai: OpenAIConfig;
    bot: BotConfig;
    azureAD: AzureADConfig;
    storage: StorageConfig;
    logging: LogConfig;
}

// Create and export the configuration object
export const config: ApplicationConfig = {
    environment: getEnvVar('NODE_ENV', 'development'),
    
    openai: {
        apiKey: getEnvVar('OPENAI_KEY'),
        model: getEnvVar('OPENAI_MODEL', 'gpt-4'),
        azureApiKey: getEnvVar('AZURE_OPENAI_KEY', ''),
        azureEndpoint: getEnvVar('AZURE_OPENAI_ENDPOINT', ''),
        temperature: 0.7,
        maxTokens: 800,
        useSystemMessage: true
    },

    bot: {
        id: getEnvVar('BOT_ID'),
        password: getEnvVar('BOT_PASSWORD'),
        port: getNumberEnvVar('PORT', 3978),
        appId: getEnvVar('TEAMS_APP_ID', ''),
        appPassword: getEnvVar('TEAMS_APP_PASSWORD', '')
    },

    azureAD: {
        clientId: getEnvVar('AAD_APP_CLIENT_ID'),
        clientSecret: getEnvVar('AAD_APP_CLIENT_SECRET'),
        tenantId: getEnvVar('AAD_APP_TENANT_ID'),
        authorityHost: getEnvVar('AAD_APP_OAUTH_AUTHORITY_HOST')
    },

    storage: {
        accountName: getEnvVar('STORAGE_ACCOUNT_NAME', ''),
        accountKey: getEnvVar('STORAGE_ACCOUNT_KEY', ''),
        containerName: getEnvVar('STORAGE_CONTAINER_NAME', ''),
        useMemoryStorage: getBooleanEnvVar('USE_MEMORY_STORAGE', true)
    },

    logging: {
        level: getEnvVar('LOG_LEVEL', 'info'),
        enableConsole: getBooleanEnvVar('ENABLE_CONSOLE_LOGGING', true),
        enableFile: getBooleanEnvVar('ENABLE_FILE_LOGGING', false)
    }
};

// Utility function to get configuration based on environment
export function getConfig(): ApplicationConfig {
    return config;
}

// Validate OpenAI configuration
export function validateOpenAIConfig(config: OpenAIConfig): void {
    const supportedModels = [
        'gpt-4',
        'gpt-4-32k',
        'gpt-4-turbo',
        'gpt-3.5-turbo',
        'gpt-3.5-turbo-16k'
    ];

    if (!supportedModels.includes(config.model)) {
        throw new Error(`Unsupported OpenAI model: ${config.model}`);
    }

    if (!config.apiKey) {
        throw new Error('OpenAI API key is required');
    }

    if (config.azureEndpoint && !config.azureApiKey) {
        throw new Error('Azure OpenAI API key is required when endpoint is specified');
    }
}

// Validate the entire configuration
export function validateConfig(config: ApplicationConfig): void {
    validateOpenAIConfig(config.openai);

    if (!config.bot.id || !config.bot.password) {
        throw new Error('Bot credentials are required');
    }

    if (!config.azureAD.clientId || !config.azureAD.clientSecret) {
        throw new Error('Azure AD credentials are required');
    }

    if (config.storage.useMemoryStorage === false && 
        (!config.storage.accountName || !config.storage.accountKey)) {
        throw new Error('Azure Storage credentials are required when not using memory storage');
    }
}

// Initialize configuration with validation
export function initializeConfig(): ApplicationConfig {
    validateConfig(config);
    return config;
}

// Export default configuration
export default config;