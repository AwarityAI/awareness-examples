# Creating Bots using the Teams AI Library and TypeScript

## Reference File and Folder Structure

The structure below represents the reference file and folder structure for a Teams AI bot, you can follow the structure outlined below. This structure is designed to organize the bot's code, configuration, and resources in a clear and maintainable way:

```
/my-bot
│
├── /src
│   ├── /prompts                         # Folder for storing prompt files
│   │   └── /chat                        # Subfolder for an individual prompt
│   │       ├── skprompts.txt            # Prompt template
│   │       ├── config.json              # Settings for the prompt
│   │       └── actions.json             # JSON Schema for actions (optional)
│   ├── /cards                           # Folder for storing Adaptive Card files
│   │   └── example.ts                   # Example Adaptive Card definition
│   ├── index.ts                         # Main bot application file
│   └── /utils                           # Utility functions and helpers
│
├── /lib                                 # Compiled output directory
│   └── index.js                         # Main entry point
│
├── /public                              # Static files for authentication or other purposes
│
├── /tests                               # Directory for test files
│   └── ...                              # Test files
│
├── .env                                 # Environment variables for bot configuration
├── .eslintrc.js                         # ESLint configuration
├── .prettierrc                          # Prettier configuration
├── .gitignore                           # Git ignore file
├── package.json                         # Project metadata and dependencies
├── tsconfig.json                        # TypeScript configuration file
└── README.md                            # Documentation for the bot
```

### Key Components:

- **src**: Contains the source code for the bot, including the main application file (`index.ts`), prompt files, action handlers, and utility functions.

- **lib**: Stores the compiled JavaScript files generated from TypeScript source files.

- **public**: Holds static files that might be used for authentication flows or other purposes.

- **tests**: Contains test files to ensure the bot's functionality is as expected.

- **.env**: A file for environment variables, which includes sensitive information like API keys and bot credentials.

- **package.json**: Lists the project's dependencies and scripts for building, testing, and running the bot.

- **tsconfig.json**: Configures TypeScript settings for the project.

- **README.md**: Provides documentation and instructions for setting up and running the bot.


## Example .env file 

Here is an example of an `.env` file for the reference bot:

```
# .env file for Teams AI Bot
BOT_ID=your_bot_id_here
BOT_PASSWORD=your_bot_password_here
OPENAI_API_KEY=your_openai_api_key_here
AZURE_OPENAI_KEY=your_azure_openai_key_here
AZURE_OPENAI_ENDPOINT=https://your_azure_openai_endpoint_here
```

This file includes placeholders for the bot's ID and password, API keys for OpenAI and Azure OpenAI, and other configuration parameters relevant to the bot's functionality.

This file should be included in the bots `.gitignore` file as it should never be checked in. Document the creation of the file in the `README.md` file for the bot.


## index.ts File Details

The `index.ts` file in a reference bot serves as the main application file and is responsible for several key functions:

1. **Imports and Configuration**: It imports necessary packages and services required for the bot's operation. It uses the `dotenv` package to load environment variables from a `.env` file, which includes sensitive information such as `BOT_ID`, `BOT_PASSWORD`, `OPENAI_KEY`, and `AZURE_OPENAI_KEY`.

2. **Teams Adapter Setup**: The file creates an instance of `TeamsAdapter` to handle communication with Microsoft Teams. This adapter uses credentials from the environment variables to authenticate and manage interactions.

3. **Error Handling**: An `onTurnErrorHandler` function is defined to manage errors during the bot's operation. This function logs errors and sends a message to the user to inform them of any issues.

4. **Server Initialization**: The bot sets up a Restify server to listen for incoming HTTP requests. It specifically listens on the `/api/messages` endpoint, which is where messages from Teams are routed.

5. **State Management**: A `ConversationState` interface is defined, extending `DefaultConversationState`, to include properties like `lightsOn` for tracking the state of the lights.

6. **AI Capabilities**: The bot creates an instance of `OpenAIModel` to enable AI functionalities. This model is configured with API keys and settings for both OpenAI and Azure OpenAI.

7. **Prompt Management**: A `PromptManager` is instantiated to handle prompt files located in the `src/prompts` folder. This allows the bot to utilize predefined prompts for interactions.

8. **Action Handlers**: The bot defines several action handlers for specific functionalities, such as controlling lights (turning them on and off) and pausing execution. These handlers are implemented using the `Application` class from the `@microsoft/teams-ai` library.

9. **Request Processing**: The bot listens for incoming requests and processes them using the `adapter`. It routes these requests to the `app` for further handling based on the defined actions and logic.

Overall, the `index.ts` file integrates various components and services to ensure the bot operates smoothly, handling communication, state management, AI interactions, and error handling effectively.

### Imports and Configuration

Here is an example set of imports for the `index.ts` file in a Teams AI bot project:

```typescript
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import { ConfigurationServiceClientCredentialFactory, MemoryStorage, TurnContext } from 'botbuilder';
import { ActionPlanner, Application, DefaultConversationState, Memory, OpenAIModel, PromptManager, TeamsAdapter, TurnState } from '@microsoft/teams-ai';
```

These imports include necessary packages and services for configuration, server setup, and bot functionalities, such as handling communication with Microsoft Teams and enabling AI capabilities.

### Teams Adapter Setup, Server Initialization, and Request Processing

Here is an example setup for the `index.ts` file in a Teams AI bot project, focusing on the adapter configuration:

```typescript
import * as dotenv from 'dotenv';
import * as restify from 'restify';
import { ConfigurationServiceClientCredentialFactory, TeamsAdapter } from '@microsoft/teams-ai';

// Load environment variables from the .env file
dotenv.config();

// Create an instance of TeamsAdapter to handle communication with Microsoft Teams
const adapter = new TeamsAdapter(
    {},
    new ConfigurationServiceClientCredentialFactory({
        MicrosoftAppId: process.env.BOT_ID,
        MicrosoftAppPassword: process.env.BOT_PASSWORD,
        MicrosoftAppType: 'MultiTenant' // or 'SingleTenant' based on your configuration
    })
);

// Define an error handler to manage errors during the bot's operation
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    await context.sendActivity('The bot encountered an error or bug.');
};

// Set up a Restify server to listen for incoming HTTP requests
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Listen for incoming requests on the /api/messages endpoint
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route the request to the bot's logic
        // Add your bot's logic here
    });
});
```

This setup includes loading environment variables, creating a `TeamsAdapter` instance with credentials, defining an error handler, and setting up a Restify server to handle incoming requests from Microsoft Teams.

### Error Handling

In the `index.ts` file of a Teams AI bot, error handling is managed through the `onTurnErrorHandler` function. This function is responsible for logging errors and notifying users when an issue occurs during the bot's operation. Here's an example of how error handling can be implemented:

```typescript
import { TurnContext } from 'botbuilder';

// Define the error handling function
const onTurnErrorHandler = async (context: TurnContext, error: Error) => {
    // Log the error to the console
    console.error(`\n [onTurnError] unhandled error: ${error}`);

    // Send a trace activity to the Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${error}`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

// Set the error handler on the adapter
adapter.onTurnError = onTurnErrorHandler;
```

In this example, the `onTurnErrorHandler` function logs the error to the console and sends a trace activity to the Bot Framework Emulator, which includes the error message. It also sends a message to the user, indicating that the bot encountered an error and suggesting that the bot's source code should be fixed to continue running. The `adapter.onTurnError` property is set to this function, ensuring that any unhandled errors during the bot's operation will trigger this error handling process.

### Configuring Application class with AI Capabilities

Here's an example of an `index.ts` file for a Teams AI bot that focuses on creating the `Application` class, configuring AI capabilities like the model and prompt manager, and adding actions that use state management:

```typescript
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import { ConfigurationServiceClientCredentialFactory, MemoryStorage, TurnContext } from 'botbuilder';
import { ActionPlanner, Application, DefaultConversationState, Memory, OpenAIModel, PromptManager, TeamsAdapter, TurnState } from '@microsoft/teams-ai';

// Load environment variables from the .env file
dotenv.config();

// Define the conversation state interface
interface ConversationState extends DefaultConversationState {
    lightsOn: boolean;
}
type ApplicationTurnState = TurnState<ConversationState>;

// Create an instance of TeamsAdapter to handle communication with Microsoft Teams
const adapter = new TeamsAdapter(
    {},
    new ConfigurationServiceClientCredentialFactory({
        MicrosoftAppId: process.env.BOT_ID,
        MicrosoftAppPassword: process.env.BOT_PASSWORD,
        MicrosoftAppType: 'MultiTenant'
    })
);

// Define an error handler to manage errors during the bot's operation
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    await context.sendActivity('The bot encountered an error or bug.');
};

// Set up a Restify server to listen for incoming HTTP requests
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
});

// Create AI capabilities
const aiModel = new OpenAIModel({
    apiKey: process.env.OPENAI_API_KEY,
    azureApiKey: process.env.AZURE_OPENAI_KEY,
    azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
    modelType: 'chatgpt-4o-latest',
    logRequests: true
});

// Define a prompt manager and add a function for getting the current status of the lights 
const prompts = new PromptManager(path.join(__dirname, 'prompts'));
prompts.addFunction('getLightStatus', async (context: TurnContext, memory: Memory) => {
    return memory.getValue('conversation.lightsOn') ? 'on' : 'off';
});

// Create Action Planner that uses Model and Prompt Manager
const planner = new ActionPlanner({
    model,
    prompts,
    defaultPrompt: 'chat'
});

// Define storage and application
const storage = new MemoryStorage();
const app = new Application<ApplicationTurnState>({
    storage,
    ai: {
        planner
    }
});

// Define actions using state management
app.ai.action('LightStatus', async (context: TurnContext, state: ApplicationTurnState) => {
    const status = state.conversation.lightsOn ? 'on' : 'off';
    return `the lights are ${status}`;
});

app.ai.action('LightsOn', async (context: TurnContext, state: ApplicationTurnState) => {
    state.conversation.lightsOn = true;
    await context.sendActivity(`[lights on]`);
    return `the lights are now on`;
});

app.ai.action('LightsOff', async (context: TurnContext, state: ApplicationTurnState) => {
    state.conversation.lightsOn = false;
    await context.sendActivity(`[lights off]`);
    return `the lights are now off`;
});

interface PauseParameters {
    time: number;
}

app.ai.action('Pause', async (context: TurnContext, state: ApplicationTurnState, parameters: PauseParameters) => {
    await context.sendActivity(`[pausing for ${parameters.time / 1000} seconds]`);
    await new Promise((resolve) => setTimeout(resolve, parameters.time));
    return `done pausing`;
});

// Listen for incoming requests on the /api/messages endpoint
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await app.run(context);
    });
});
```

In this example, the `Application` class is instantiated with a `MemoryStorage` for state management and AI capabilities, including an `ActionPlanner` that uses an `OpenAIModel` and a `PromptManager`. The bot defines actions such as "LightsOn", "LightsOff", and "LightStatus" that utilize state management to track and report the status of the lights.

Note that `app.ai.action()` handlers MUST return a string describing the action they took. This string is passed back to the Large Language Model for evaluation.

## Prompt Template Example

To create chat prompt template for the LightBot, you can follow the structure and examples outlined in the reference documentation. Here is an example of how you might set up the chat prompt files for the LightBot:

### skprompts.txt

This file serves as a template for the bot's conversation context. It defines how the bot should interpret and respond to user commands related to controlling lights.

```plaintext
The following is a conversation with an AI assistant.
The assistant can turn a light on or off.

context:
The lights are currently {{getLightStatus}}.
```

### config.json

This file contains settings for the prompt, allowing you to customize the bot's response behavior and interaction style.

```json
{
    "schema": 1.1,
    "description": "A bot that can turn the lights on and off",
    "type": "completion",
    "completion": {
        "model": "chatgpt-4o-latest",
        "completion_type": "chat",
        "include_history": true,
        "include_input": true,
        "max_input_tokens": 2800,
        "max_tokens": 4000,
        "presence_penalty": 0.6,
        "frequency_penalty": 0.0,
        "stop_sequences": []
    },
    "augmentation": {
        "augmentation_type": "tools"
    }
}
```

### actions.json

This optional file defines the actions that the LightBot can perform in response to user prompts. It includes descriptions and parameters for each action.

```json
[
    {
        "name": "LightsOn",
        "description": "Turns on the lights"
    },
    {
        "name": "LightsOff",
        "description": "Turns off the lights"
    },
    {
        "name": "LightStatus",
        "description": "Gets the lights status"
    },
    {
        "name": "Pause",
        "description": "Delays for a period of time",
        "parameters": {
            "type": "object",
            "properties": {
                "time": {
                    "type": "number",
                    "description": "The amount of time to delay in milliseconds"
                }
            },
            "required": ["time"]
        }
    }
]
```

These files should be placed in the `/src/prompts/chat` directory of your project. The `skprompts.txt` file provides the conversational context, while `config.json` and `actions.json` configure the bot's behavior and capabilities. This setup allows the LightBot to understand and execute user commands effectively.