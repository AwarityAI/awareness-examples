// src/utils/authManager.ts

import { TurnContext, UserState, MemoryStorage, StatePropertyAccessor } from 'botbuilder';
import { ConfidentialClientApplication, AuthenticationResult } from '@azure/msal-node';
import { Client } from '@microsoft/microsoft-graph-client';
import { config } from 'dotenv';

// Load environment variables
config();

interface UserProfile {
    name?: string;
    authenticated?: boolean;
    accessToken?: string;
    tokenExpiration?: Date;
    idToken?: string;
}

export class AuthManager {
    private msalConfig: any;
    private msalClient: ConfidentialClientApplication;
    private storage: MemoryStorage;
    private userState: UserState;
    private userProfileAccessor: StatePropertyAccessor<UserProfile>;

    constructor() {
        // Initialize MSAL configuration
        this.msalConfig = {
            auth: {
                clientId: process.env.AAD_APP_CLIENT_ID || '',
                clientSecret: process.env.AAD_APP_CLIENT_SECRET || '',
                authority: `${process.env.AAD_APP_OAUTH_AUTHORITY_HOST}/${process.env.AAD_APP_TENANT_ID}`
            }
        };

        // Initialize MSAL client
        this.msalClient = new ConfidentialClientApplication(this.msalConfig);

        // Initialize storage and state
        this.storage = new MemoryStorage();
        this.userState = new UserState(this.storage);
        this.userProfileAccessor = this.userState.createProperty<UserProfile>('UserProfile');
    }

    /**
     * Authenticate user and acquire token
     */
    public async authenticate(context: TurnContext, userToken: string): Promise<AuthenticationResult> {
        try {
            const oboRequest = {
                oboAssertion: userToken,
                scopes: ['https://graph.microsoft.com/.default']
            };

            const response = await this.msalClient.acquireTokenOnBehalfOf(oboRequest);
            
            if (!response) {
                throw new Error('Failed to acquire token');
            }

            // Update user profile
            const userProfile = await this.userProfileAccessor.get(context, {});
            userProfile.authenticated = true;
            userProfile.accessToken = response.accessToken;
            userProfile.tokenExpiration = response.expiresOn || new Date(Date.now() + 3600 * 1000); // Default 1 hour
            userProfile.idToken = response.idToken;

            await this.userState.saveChanges(context);

            return response;
        } catch (error) {
            console.error(`Authentication error: ${error}`);
            throw new Error('Authentication failed');
        }
    }

    /**
     * Check if user is authenticated
     */
    public async checkAuthentication(context: TurnContext): Promise<boolean> {
        try {
            const userProfile = await this.userProfileAccessor.get(context, {});
            if (!userProfile.authenticated || !userProfile.accessToken) {
                return false;
            }

            // Check token expiration
            if (userProfile.tokenExpiration && new Date() > userProfile.tokenExpiration) {
                return await this.refreshAccessToken(context);
            }

            return true;
        } catch (error) {
            console.error(`Authentication check error: ${error}`);
            return false;
        }
    }

    /**
     * Refresh access token
     */
    private async refreshAccessToken(context: TurnContext): Promise<boolean> {
        try {
            const userProfile = await this.userProfileAccessor.get(context, {});
            
            if (!userProfile.accessToken) {
                return false;
            }

            const account = await this.msalClient.getTokenCache().getAccountByHomeId(userProfile.idToken || '');
            
            if (!account) {
                return false;
            }

            const silentRequest = {
                account,
                scopes: ['https://graph.microsoft.com/.default']
            };

            const response = await this.msalClient.acquireTokenSilent(silentRequest);
            
            if (!response) {
                return false;
            }

            userProfile.accessToken = response.accessToken;
            userProfile.tokenExpiration = response.expiresOn || new Date(Date.now() + 3600 * 1000);
            userProfile.idToken = response.idToken;

            await this.userState.saveChanges(context);
            return true;
        } catch (error) {
            console.error(`Token refresh error: ${error}`);
            return false;
        }
    }

    /**
     * Get Microsoft Graph client
     */
    public async getGraphClient(context: TurnContext): Promise<Client | null> {
        try {
            const userProfile = await this.userProfileAccessor.get(context, {});
            
            if (!userProfile.accessToken) {
                return null;
            }

            return Client.init({
                authProvider: (done) => {
                    done(null, userProfile.accessToken!);
                }
            });
        } catch (error) {
            console.error(`Graph client error: ${error}`);
            return null;
        }
    }

    /**
     * Sign out user
     */
    public async signOut(context: TurnContext): Promise<void> {
        try {
            const userProfile = await this.userProfileAccessor.get(context, {});
            userProfile.authenticated = false;
            userProfile.accessToken = undefined;
            userProfile.tokenExpiration = undefined;
            userProfile.idToken = undefined;

            await this.userState.saveChanges(context);
        } catch (error) {
            console.error(`Sign out error: ${error}`);
            throw new Error('Sign out failed');
        }
    }

    /**
     * Handle authentication success
     */
    public async onAuthenticationSuccess(context: TurnContext): Promise<void> {
        try {
            const userProfile = await this.userProfileAccessor.get(context, {});
            
            // Get user details from Graph API
            const graphClient = await this.getGraphClient(context);
            if (graphClient) {
                const user = await graphClient.api('/me').get();
                userProfile.name = user.displayName;
                await this.userState.saveChanges(context);
            }

            await context.sendActivity('Successfully authenticated! You can now use all bot features.');
        } catch (error) {
            console.error(`Authentication success handler error: ${error}`);
        }
    }

    /**
     * Handle authentication failure
     */
    public async onAuthenticationFailure(context: TurnContext, error: Error): Promise<void> {
        await context.sendActivity(`Authentication failed: ${error.message}. Please try again.`);
    }
}