## Understanding Microsoft Graph API Integration with TypeScript in Teams AI Library Bots

Learn how to make Microsoft Graph calls using TypeScript from within a Teams AI Library-based bot, with a focus on remembering code samples.

### Microsoft Graph API introduction TypeScript

Microsoft Graph API is a unified API endpoint that allows developers to access a wide range of Microsoft services and data, including Microsoft 365, Azure Active Directory, Outlook, OneDrive, and more. It provides a single endpoint for interacting with various Microsoft services, enabling the creation, reading, and management of resources such as users, messages, events, and more.

TypeScript can be used with Microsoft Graph API by utilizing the Microsoft Graph JavaScript client library and SDKs, which provide a strongly-typed interface for making API calls. This allows developers to write type-safe code that interacts with the API, enhancing the development experience and reducing runtime errors.

To get started with Microsoft Graph API in TypeScript, you need to install necessary packages such as `@microsoft/msgraph-sdk`, `@microsoft/kiota-authentication-azure`, and `@azure/identity`. You can also use TypeScript type definitions to work with the API in a type-safe manner.

Here are some basic code samples for using Microsoft Graph API with TypeScript:

1. **Initializing a Graph Client:**
   ```typescript
   import { Client } from "@microsoft/microsoft-graph-client";
   import 'isomorphic-fetch';

   const client = Client.initWithMiddleware({
     defaultVersion: 'beta',
     ...
   });

   const response = await client.api("/me").get();
   const user = response as User;
   ```

2. **Creating a Message Object:**
   ```typescript
   let mail: MicrosoftGraphBeta.Message = {
     subject: "Microsoft Graph TypeScript Sample",
     toRecipients: [{
       emailAddress: {
         address: "microsoftgraph@example.com"
       }
     }],
     body: {
       content: "<h1>Microsoft Graph TypeScript Sample</h1>Try modifying the sample",
       contentType: "html"
     }
   }
   ```

3. **Making a Graph Call:**
   ```typescript
   export async function makeGraphCallAsync() {
     // INSERT YOUR CODE HERE
   }

   async function makeGraphCallAsync() {
     try {
       await graphHelper.makeGraphCallAsync();
     } catch (err) {
       console.log(`Error making Graph call: ${err}`);
     }
   }
   ```

These examples demonstrate how to set up user authentication, initialize a Graph client, and make API calls using TypeScript with Microsoft Graph API.

### Teams AI Library bot setup TypeScript

To set up a bot using the Teams AI Library with TypeScript, you need to follow several steps and meet certain prerequisites. Here's a detailed guide:

### Prerequisites:
1. **Development Environment**: Install Visual Studio Code and the Teams Toolkit extension. Ensure you have Node.js installed as it serves as the back-end JavaScript runtime environment.
2. **Microsoft Teams**: Familiarity with the Microsoft Teams platform is essential.
3. **OpenAI API Key**: Obtain an OpenAI API key or Azure OpenAI credentials to use for generating embeddings and other AI functionalities.
4. **Project Structure**: Your project should include necessary files such as `src/app/app.ts`, `src/app/turnState.ts`, and `src/prompts/chat/skprompt.txt`.
5. **Teams AI Library**: Install the Teams AI Library package from NPM.

### Setting Up the Bot:
1. **Import Required Services**: Begin by importing necessary services from the Bot Framework SDK, such as `CloudAdapter` and `ConfigurationBotFrameworkAuthentication`.

2. **Create Adapter and Configure Authentication**:
   ```typescript
   import {
     CloudAdapter,
     ConfigurationBotFrameworkAuthentication,
     MemoryStorage,
     TurnContext
   } from 'botbuilder';

   // Read botFilePath and botFileSecret from .env file.
   const ENV_FILE = path.join(__dirname, '..', '.env');
   config({ path: ENV_FILE });

   const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(
     {},
     new ConfigurationServiceClientCredentialFactory({
       MicrosoftAppId: process.env.BOT_ID,
       MicrosoftAppPassword: process.env.BOT_PASSWORD,
       MicrosoftAppType: 'MultiTenant'
     })
   );

   // Create adapter.
   const adapter = new CloudAdapter(botFrameworkAuthentication);
   ```

3. **Initialize the Application**: Use the `Application` class to manage conversation and user state.
   ```typescript
   import { DefaultConversationState, DefaultTempState, DefaultUserState, TurnState } from "@microsoft/teams-ai";

   export interface TempState extends DefaultTempState { }
   export interface UserState extends DefaultUserState { }
   export interface ConversationState extends DefaultConversationState {
     tasks: Record<string, Task>;
   }

   export interface Task {
     title: string;
     description: string;
   }

   export type ApplicationTurnState = TurnState<ConversationState, UserState, TempState>;

   const storage = new MemoryStorage();
   const app = new Application<ApplicationTurnState>({
     storage,
     ai: {
       planner,
     },
   });
   ```

4. **Define Prompts and Handlers**: Create a folder for your prompts and define them. Register action handlers using the `app.ai.action` method to handle user intents.

5. **Configure `config.json`**: Set up a `config.json` file with prompt model settings, including model type and maximum tokens.

### Code Samples:
- Sample code for setting up a basic bot can be found in the Teams AI GitHub repository. The `04.ai.a.teamsChefbot` sample demonstrates using the OpenAI GPT model to build a Teams app.
- The Echo bot sample, available in JavaScript, .NET, and Python, provides a basic conversational flow example.

By following these steps and ensuring you have the necessary prerequisites, you can successfully set up a bot using the Teams AI Library with TypeScript.

### Microsoft Graph API calls Teams bot TypeScript

To make Microsoft Graph API calls from a Teams bot using TypeScript, you need to follow several key steps, primarily focused on authentication and API interaction:

1. **Authentication Setup**: 
   - Register your bot in the Azure portal to obtain the necessary credentials, such as the client ID and client secret.
   - Implement authentication using Azure Active Directory (Azure AD). This typically involves using the Microsoft Authentication Library (MSAL) to handle the OAuth 2.0 flow, which allows your bot to authenticate users and acquire tokens for accessing Microsoft Graph.

2. **Permission Scopes**:
   - Add the required permission scopes in your `appSettings.ts` file for APIs that support user (delegated) authentication. This is crucial for ensuring your bot has the necessary permissions to perform actions like sending messages.

3. **API Calls**:
   - Create an instance of the class representing the data you want to work with (e.g., `Message`), set the desired properties, and send it in the API call using the `post` method.
   - For sending messages to a Teams channel, use the API endpoint `POST /teams/{TEAM_ID}/channels/{CHANNEL_ID}/messages` with the appropriate message content.

4. **Handling Authentication**:
   - For user-delegated permissions, use an Auth Dialog to interact with the user via a browser for login and consent.
   - For application permissions, use the Client Credentials Flow to obtain an access token, which allows access across the Microsoft 365 tenant without user interaction.

5. **Code Samples and Resources**:
   - The Microsoft Teams Samples repository on GitHub provides various task-focused samples in TypeScript that demonstrate how to implement these API calls within a Teams bot.
   - Samples like "Proactive installation of App and sending proactive notifications" and "Graph API Channel Life Cycle" can serve as references for making API calls.
   - The "App SSO" and "Authentication" samples showcase how to implement single sign-on (SSO) and authentication in Microsoft Teams, which are essential for making Graph API calls securely.

By following these steps and utilizing the available code samples, you can effectively make Microsoft Graph API calls from a Teams bot using TypeScript.

### Microsoft Graph API authentication permissions TypeScript

For Microsoft Graph API in TypeScript, several authentication methods are available:

1. **App-only Authentication**: This method is suitable for background services or applications that need to access data for all users in an organization. It involves registering the application in Azure Active Directory, configuring permissions, and using classes like `ClientSecretCredential` to authenticate calls to Microsoft Graph.

2. **User Authentication**: This method involves acting on behalf of a signed-in user. It uses delegated permissions and can be implemented using classes like `DeviceCodeCredential` for user authentication flows.

3. **On-behalf-of Authentication**: This is used when a web API calls Microsoft Graph on behalf of a user, typically using classes like `OnBehalfOfCredential`.

To configure permissions for a Teams bot, you need to:

- Register the bot in the Azure portal under App registrations.
- Specify the required API permissions for Microsoft Graph, which can include both delegated and application permissions depending on the scenario.
- Ensure that the necessary permissions are granted, such as "Read and write all groups" for delegated permissions.

Code samples for setting up authentication and permissions are available in the tutorials and discussions. For example, the app-only authentication tutorial provides detailed steps and code samples for setting up a TypeScript project, installing dependencies, and configuring authentication using `ClientSecretCredential`. Similarly, the user authentication tutorial includes examples of using `DeviceCodeCredential` to authenticate and make calls to Microsoft Graph. Additionally, discussions on platforms like Stack Overflow provide examples for using the on-behalf-of flow in TypeScript.

### Handling Microsoft Graph API responses errors TypeScript

To handle responses from the Microsoft Graph API in TypeScript, you typically use `try-catch` blocks to manage any errors that may occur during API calls. This approach allows you to catch exceptions and handle them appropriately, such as logging error messages or providing feedback to the user. For example, in a function making a Graph API call, you would wrap the call in a `try-catch` block and log any errors caught:

```typescript
async function makeGraphCallAsync() {
  try {
    await graphHelper.makeGraphCallAsync();
  } catch (err) {
    console.log(`Error making Graph call: ${err}`);
  }
}
```

Common errors when interacting with the Microsoft Graph API include:

1. **Authentication Errors (401 Unauthorized)**: These occur when the access token is invalid or expired. Ensure that the user is properly authenticated and that the token is refreshed as needed.

2. **Permission Errors (403 Forbidden)**: These happen when the application lacks the necessary permissions to access a resource. Verify that the correct permissions are configured in Azure AD.

3. **Resource Not Found (404 Not Found)**: This error indicates that the requested resource does not exist. Ensure that the resource is available and that the endpoint is correct.

4. **Rate Limiting (429 Too Many Requests)**: This occurs when too many requests are sent in a short period. Implement a back-off strategy using the `Retry-After` header to manage request throttling.

5. **Service Unavailability (503 Service Unavailable)**: This suggests that the service is temporarily unavailable. Similar to handling 429 errors, use a back-off strategy and retry the request after some time.

To effectively handle these errors, you should log the `request-id` and `Date` from the HTTP response headers, which can be useful for troubleshooting and reporting issues to Microsoft Support. Additionally, the Microsoft Graph SDK provides a Chaos Handler that allows developers to simulate errors, such as 429 or 5xx errors, to test their error handling logic during development. This can be particularly useful for ensuring that your application can gracefully handle various error scenarios.

### Best practices Microsoft Graph API Teams bot TypeScript

When using Microsoft Graph API in a Teams bot with TypeScript, several best practices should be followed to ensure effective implementation. Firstly, proper authentication and authorization are crucial, which involves obtaining Azure AD access tokens and managing permissions carefully. It's important to handle rate limits and cache tokens to improve performance. Additionally, following the principle of least privilege when requesting permissions is recommended to enhance security.

Advanced features of Microsoft Graph API that can be utilized in a Teams bot include sending proactive notifications, managing user presence, accessing calendar events, and integrating with Microsoft Teams messaging extensions. These features can significantly enhance the functionality and user experience of a Teams bot.

For developers looking to implement these advanced features, there are code samples available in the Microsoft Teams Samples repository on GitHub. These samples provide practical examples of using Microsoft Graph API in Teams bots, such as sending proactive messages, managing conversations, and handling meeting transcripts. These resources can serve as valuable references for building robust Teams applications.