// src/config/environment.d.ts

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Bot Configuration
            BOT_ID: string;
            BOT_PASSWORD: string;
            PORT?: string;

            // OpenAI Configuration
            OPENAI_KEY: string;
            OPENAI_MODEL: 'gpt-4' | 'gpt-4-32k' | 'gpt-4-turbo' | 'gpt-3.5-turbo' | 'gpt-3.5-turbo-16k';
            
            // Azure OpenAI Configuration (optional)
            AZURE_OPENAI_KEY?: string;
            AZURE_OPENAI_ENDPOINT?: string;
            
            // Azure AD Configuration
            AAD_APP_CLIENT_ID: string;
            AAD_APP_CLIENT_SECRET: string;
            AAD_APP_TENANT_ID: string;
            AAD_APP_OAUTH_AUTHORITY_HOST: string;

            // Application Configuration
            NODE_ENV: 'development' | 'production' | 'test';
            LOG_LEVEL?: 'error' | 'warn' | 'info' | 'debug';
            
            // Storage Configuration (optional)
            STORAGE_ACCOUNT_NAME?: string;
            STORAGE_ACCOUNT_KEY?: string;
            STORAGE_CONTAINER_NAME?: string;

            // Teams Configuration (optional)
            TEAMS_APP_ID?: string;
            TEAMS_APP_PASSWORD?: string;

            // API Configuration (optional)
            API_ENDPOINT?: string;
            API_KEY?: string;
        }
    }
}

// Export validation function for required environment variables
export function validateRequiredEnvVars(): void {
    const required = [
        'BOT_ID',
        'BOT_PASSWORD',
        'OPENAI_KEY',
        'OPENAI_MODEL',
        'AAD_APP_CLIENT_ID',
        'AAD_APP_CLIENT_SECRET',
        'AAD_APP_TENANT_ID',
        'AAD_APP_OAUTH_AUTHORITY_HOST'
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(', ')}\n` +
            'Please check your .env file or environment configuration.'
        );
    }
}

// Export helper functions for safe environment variable access
export function getEnvVar(key: keyof NodeJS.ProcessEnv, defaultValue?: string): string {
    const value = process.env[key];
    if (!value && defaultValue === undefined) {
        throw new Error(`Environment variable ${key} is not defined`);
    }
    return value || defaultValue || '';
}

export function getNumberEnvVar(key: keyof NodeJS.ProcessEnv, defaultValue?: number): number {
    const value = process.env[key];
    if (!value && defaultValue === undefined) {
        throw new Error(`Environment variable ${key} is not defined`);
    }
    const numValue = value ? parseInt(value, 10) : defaultValue;
    if (numValue === undefined || isNaN(numValue)) {
        throw new Error(`Environment variable ${key} is not a valid number`);
    }
    return numValue;
}

export function getBooleanEnvVar(key: keyof NodeJS.ProcessEnv, defaultValue?: boolean): boolean {
    const value = process.env[key]?.toLowerCase();
    if (!value && defaultValue === undefined) {
        throw new Error(`Environment variable ${key} is not defined`);
    }
    if (!value) return defaultValue || false;
    return value === 'true' || value === '1' || value === 'yes';
}

// This needs to be here to make the file a module
export {};