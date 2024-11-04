# Project Libraries

## Microsoft Teams AI Library for JavaScript

**Microsoft Teams AI Library for JavaScript: Useful Information and Code Snippets**

The Microsoft Teams AI Library for JavaScript is designed to simplify the process of building intelligent, AI-powered applications for Microsoft Teams. Below is a compilation of important information, features, and code snippets that will be useful when implementing your project.

---

### **Key Features of the Teams AI Library:**

1. **Simple Teams-Centric Component Scaffolding:**
   - Streamlined setup for various Teams app components, including chat bots, message extensions, link unfurling, and adaptive cards.

2. **Natural Language Modeling:**
   - Leverages OpenAI's Large Language Models (LLMs) like GPT-3.5-turbo, allowing users to interact with your app using natural language.

3. **Prompt Engineering:**
   - Provides tools for creating and managing prompts to guide the AI's responses effectively.

4. **Conversational Session History:**
   - Maintains conversation state to provide context-aware interactions.

5. **Localization:**
   - Supports multiple languages out of the box due to the LLM's training on diverse datasets.

6. **LLM Modularity:**
   - Flexibility to switch between different LLMs without altering your app code.

7. **Responsible AI:**
   - Built-in moderation features to filter inappropriate content in user inputs and bot outputs.

8. **Predictive Engine for Mapping Intents to Actions:**
   - Maps user intents to specific actions within your app.

9. **Action Planner:**
   - Generates and executes plans based on user input and available actions.

10. **Assistants API:**
    - Tools for building assistant-like capabilities within your Teams app.

11. **Prompt Management:**
    - Advanced management of prompts, including handling conversation history and context.

12. **Augmentation Modes:**
    - Supports functionalities like Retrieval Augmented Generation (RAG) to incorporate external data sources into AI responses.

---

### **Getting Started with the Teams AI Library:**

- **Installation:**
  ```bash
  npm install @microsoft/teams-ai
  ```

- **Prerequisites:**
  - Node.js version **18.x** (Support for Node.js 16 has ended)
  - Visual Studio Code with **Teams Toolkit** extension
  - Microsoft Teams account
  - OpenAI or Azure OpenAI API Key and Endpoint
  - Git
  - Recommended browser: Microsoft Edge or Google Chrome

---

### **Sample Projects and Code Snippets:**

#### **1. LightBot Sample:**

- **Description:**
  - A bot that controls lights (turning them on/off) through natural language commands.
  - Utilizes OpenAI GPT-3.5-turbo model for AI interactions.

- **Setup Steps:**
  1. **Clone the Repository:**
     ```bash
     git clone https://github.com/microsoft/teams-ai.git
     ```
  2. **Navigate to the JavaScript Folder:**
     ```bash
     cd teams-ai/js
     ```
  3. **Install Dependencies:**
     ```bash
     yarn install
     ```
  4. **Build Dependencies:**
     ```bash
     yarn build
     ```
  5. **Configure OpenAI Key:**
     - Create a `.env.local.user` file in the `env` folder.
     - Add your OpenAI key:
       ```
       SECRET_OPENAI_KEY=<your OpenAI key>
       ```
  6. **Run the Bot:**
     - Use Visual Studio Code and the Teams Toolkit extension.
     - Press **F5** to start debugging.

- **Key Code Snippets:**

  - **Defining Actions in `actions.json`:**
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

  - **Registering Action Handlers:**
    ```javascript
    app.ai.action('LightsOn', async (context, state) => {
      state.conversation.lightsOn = true;
      await context.sendActivity(`[lights on]`);
      return `the lights are now on`;
    });

    app.ai.action('LightsOff', async (context, state) => {
      state.conversation.lightsOn = false;
      await context.sendActivity(`[lights off]`);
      return `the lights are now off`;
    });

    interface PauseParameters {
      time: number;
    }
    app.ai.action('Pause', async (context, state, parameters: PauseParameters) => {
      await context.sendActivity(`[pausing for ${parameters.time / 1000} seconds]`);
      await new Promise((resolve) => setTimeout(resolve, parameters.time));
      return `done pausing`;
    });
    ```

#### **2. Basic Message Handling:**

- **Listening for Specific Messages:**
  ```javascript
  // Reset command to clear conversation state
  app.message('/reset', async (context, state) => {
    state.deleteConversationState();
    await context.sendActivity(`Ok, I've deleted the current conversation state.`);
  });
  ```

- **Echoing User Messages:**
  ```javascript
  // MUST be after other message handlers to act as a fallback
  app.activity(ActivityTypes.Message, async (context, state) => {
    // Increment count state
    let count = state.conversation.count ?? 0;
    state.conversation.count = ++count;
    // Echo back user's message
    await context.sendActivity(`[${count}] you said: ${context.activity.text}`);
  });
  ```

#### **3. Message Extensions:**

- **Handling Search Queries:**
  ```javascript
  app.messageExtensions.query('searchCmd', async (context, state, query) => {
    const searchQuery = query.parameters.queryText ?? '';
    const count = query.count ?? 10;
    const response = await axios.get(
      `http://registry.npmjs.com/-/v1/search?${new URLSearchParams({
        size: count.toString(),
        text: searchQuery
      }).toString()}`
    );

    // Format search results
    const results = [];
    response?.data?.objects?.forEach((obj) => {
      results.push(createNpmSearchResultCard(obj.package));
    });

    // Return results
    return {
      attachmentLayout: 'list',
      attachments: results,
      type: 'result'
    };
  });
  ```

- **Creating Search Result Cards:**
  ```javascript
  function createNpmSearchResultCard(pkg) {
    return CardFactory.heroCard(pkg.name, pkg.description, null, [
      {
        type: 'openUrl',
        title: 'View Package',
        value: pkg.links.npm
      }
    ]);
  }
  ```

#### **4. Adaptive Cards:**

- **Registering Action Handlers:**
  ```javascript
  // Listening for messages that trigger adaptive cards
  app.message(/static/i, async (context) => {
    const card = createStaticSearchCard();
    await context.sendActivity({ attachments: [card] });
  });

  app.message(/dynamic/i, async (context) => {
    const card = createDynamicSearchCard();
    await context.sendActivity({ attachments: [card] });
  });

  // Handle adaptive card submissions
  app.adaptiveCards.actionSubmit('StaticSubmit', async (context, state, data) => {
    await context.sendActivity(`Statically selected option is: ${data.choiceSelect}`);
  });

  app.adaptiveCards.actionSubmit('DynamicSubmit', async (context, state, data) => {
    await context.sendActivity(`Dynamically selected option is: ${data.choiceSelect}`);
  });
  ```

#### **5. Prompt Management:**

- **Configuring Prompts in `config.json`:**
  ```json
  {
    "completion": {
      "include_input": true,
      "include_history": true,
      "max_history_messages": 3,
      "max_tokens": 500,
      "temperature": 0.7,
      "top_p": 0.95,
      "presence_penalty": 0,
      "frequency_penalty": 0,
      "stop_sequences": [],
      "model": "gpt-3.5-turbo"
    }
  }
  ```

- **Initializing Prompt Manager:**
  ```javascript
  const prompts = new PromptManager({
    promptsFolder: path.join(__dirname, "../prompts"),
    max_history_messages: 3,
  });
  ```

#### **6. Integrating OpenAI Models:**

- **Setting Up OpenAI Model:**
  ```javascript
  const { OpenAIModel } = require('@microsoft/teams-ai');
  const model = new OpenAIModel({
    apiKey: process.env.SECRET_OPENAI_KEY,
    // For Azure OpenAI:
    // endpoint: process.env.SECRET_AZURE_OPENAI_ENDPOINT,
    // modelName: 'gpt-3.5-turbo'
  });
  ```

#### **7. Content Moderation:**

- **Using Built-in Content Safety Moderator:**
  ```javascript
  const { AzureContentSafetyModerator } = require('@microsoft/teams-ai');

  const moderator = new AzureContentSafetyModerator({
    apiKey: process.env.SECRET_AZURE_CONTENT_SAFETY_KEY,
    endpoint: process.env.SECRET_AZURE_CONTENT_SAFETY_ENDPOINT,
    blockedCategories: ['Hate', 'SelfHarm', 'Sexual', 'Violence'],
    disallowedSeverity: 'High',
  });

  const app = new Application({
    // ... other configurations
    ai: { planner },
    moderator,
  });
  ```

- **Handling Flagged Content:**
  ```javascript
  // Handle flagged user input
  app.ai.action(AI.FlaggedInputActionName, async (context) => {
    await context.sendActivity(`Sorry, your message contains inappropriate content.`);
    return AI.FlaggedInputActionName; // Stops further processing
  });

  // Handle flagged bot output
  app.ai.action(AI.FlaggedOutputActionName, async (context) => {
    await context.sendActivity(`I'm unable to provide a response to that.`);
    return AI.FlaggedOutputActionName; // Stops further processing
  });
  ```

---

### **Additional Tips and Best Practices:**

- **State Management:**
  - Use `MemoryStorage` for development. For production, consider a persistent storage option like Azure Cosmos DB.

- **Conversation Flow and Actions:**
  - Utilize the `ActionPlanner` to map user intents to actions.
  - Define all your actions in `actions.json` and implement corresponding handlers.

- **Error Handling:**
  - Implement robust error handling, especially around external API calls.

- **Testing and Debugging:**
  - Use the Teams Toolkit's debugging features in Visual Studio Code to test your bot.

- **Deployment Considerations:**
  - When ready, deploy your bot to Azure or another hosting service.
  - Ensure your bot complies with Microsoft Teams policies and guidelines.

- **Documentation and Learning Resources:**
  - Refer to the [Teams AI Library GitHub Repository](https://github.com/microsoft/teams-ai) for source code and additional samples.
  - Explore the [Getting Started Guide](https://github.com/microsoft/teams-ai/blob/main/getting-started/README.md) for step-by-step instructions.
  - Check out the [NPM Package](https://www.npmjs.com/package/@microsoft/teams-ai) for package details and updates.

- **Migration and Upgrades:**
  - If migrating from an existing bot, refer to the [Migration Guide](https://github.com/microsoft/teams-ai/blob/main/getting-started/MIGRATION/01.JS.md).

- **Sample Applications:**
  - Explore other sample bots like:
    - **Teams Chef Bot:** A conversational bot that provides cooking recipes.
    - **Math Tutor Assistant:** Uses the OpenAI Code Interpreter to assist with math problems.
    - **Food Ordering Assistant:** Demonstrates ordering processes within Teams.

---

By leveraging the features and code snippets provided by the Microsoft Teams AI Library for JavaScript, you can efficiently implement and enhance your Teams application with AI capabilities. The library abstracts much of the complexity involved in AI integration, allowing you to focus on building the specific business logic and user experiences for your project.

## Microsoft Teams JavaScript SDK

### Microsoft Teams JavaScript SDK - Useful Information and Code Snippets

#### Installation:

- **Using npm:**
  ```bash
  npm install --save @microsoft/teams-js
  ```

- **Using yarn:**
  ```bash
  yarn add @microsoft/teams-js
  ```

- **Using pnpm:**
  ```bash
  pnpm add @microsoft/teams-js
  ```

- **Via CDN:**
  ```html
  <script
    src="https://res.cdn.office.net/teams-js/2.28.0/js/MicrosoftTeams.min.js"
    integrity="sha384-gT2igbByugSUPXBgDA+rtfKk4JMSCfG+3DKSivyLqF2Riv4vTLqaC/tFpySw0eIM"
    crossorigin="anonymous"
  ></script>
  ```

#### Importing the SDK:

For module-based projects, import the required namespaces:
```javascript
import { app, authentication, dialog, teamsCore } from '@microsoft/teams-js';
```

#### Initialization:

Before using any SDK functions, initialize the SDK:
```javascript
app.initialize().then(() => {
  // SDK initialized successfully
}).catch((error) => {
  // Handle initialization error
});
```

Or using `async/await`:
```javascript
await app.initialize();
```

Check if the SDK is initialized:
```javascript
if (app.isInitialized()) {
  // Proceed with SDK-dependent code
}
```

#### Retrieving Context:

Get the current context of the app:
```javascript
app.getContext().then((context) => {
  // Use the context object
  const appHostName = context.app.host.name;
}).catch((error) => {
  // Handle error
});
```

Or using `async/await`:
```javascript
const context = await app.getContext();
const appHostName = context.app.host.name; // e.g., Teams, Outlook
```

#### Checking Capability Support:

Before using certain capabilities, check if they're supported in the current host:
```javascript
if (app.isSupported()) {
  // Use app capabilities
}

if (authentication.isSupported()) {
  // Proceed with authentication functionality
}
```

#### Handling Themes:

Register a handler for theme changes:
```javascript
app.registerOnThemeChangeHandler((theme) => {
  // Update UI based on the new theme
});
```

#### Opening Links:

To open links within the host:
```javascript
app.openLink(deepLinkUrl).then(() => {
  // Navigation initiated
}).catch((error) => {
  // Handle navigation error
});
```

#### Notifying App Status:

Notify the host that the app has loaded:
```javascript
app.notifyAppLoaded();
```

Notify that the app is ready for user interaction:
```javascript
app.notifySuccess();
```

#### Authentication:

##### Initiating Authentication Flow:

```javascript
authentication.authenticate({
  url: 'https://yourdomain.com/auth-start', // Start page of your auth flow
  successCallback: (result) => {
    // Handle successful authentication
  },
  failureCallback: (reason) => {
    // Handle authentication failure
  }
});
```

##### Handling Authentication in the Auth Page:

After the user signs in, notify the result back to Teams:

For success:
```javascript
authentication.notifySuccess(result); // 'result' can be a token or any success message
```

For failure:
```javascript
authentication.notifyFailure(errorMessage);
```

##### Getting an Auth Token Silently:

```javascript
authentication.getAuthToken().then((token) => {
  // Use the token
}).catch((error) => {
  // Handle token acquisition error
});
```

#### Migrating to TeamsJS SDK v2:

- The SDK now returns Promises instead of using callbacks.
- Update API calls accordingly.

For example, replace:
```javascript
microsoftTeams.getContext((context) => {
  // Use context
});
```
With:
```javascript
app.getContext().then((context) => {
  // Use context
});
```

Or using `async/await`:
```javascript
const context = await app.getContext();
```

- Some APIs have moved to new namespaces (e.g., `tasks` renamed to `dialog`).

#### Dialogs:

To open a dialog (formerly task modules):
```javascript
dialog.url.open({
  url: 'https://yourdomain.com/dialog-page',
  size: { width: 600, height: 400 },
  title: 'Dialog Title'
}).then((result) => {
  // Handle dialog result
}).catch((error) => {
  // Handle dialog error
});
```

#### Supporting Multiple Hosts (Teams, Outlook, Microsoft 365 App):

- **Update SDK Version:** Use TeamsJS SDK version 2.19.0 or later.
- **Update App Manifest:** Use app manifest version 1.13 or later.

#### Validating Host Environment:

Check the host environment to customize user experience:
```javascript
const context = await app.getContext();
switch (context.app.host.name) {
  case 'Teams':
    // Teams-specific code
    break;
  case 'Outlook':
    // Outlook-specific code
    break;
  case 'Office':
    // Office.com-specific code
    break;
}
```

#### Handling Cross-cloud Communication:

If your app needs to function in environments like Teams operated by 21Vianet:

During SDK initialization, specify valid message origins:
```javascript
app.initialize({
  validMessageOrigins: ['https://yourdomain.cn']
}).then(() => {
  // SDK initialized for specific cloud environment
});
```

#### Polyfill for Older Browsers:

For browsers that do not support Promises (e.g., IE11), include a polyfill:

```html
<script src="https://cdn.jsdelivr.net/npm/es6-promise/dist/es6-promise.auto.min.js"></script>
```

#### Developing with Teams Toolkit:

- **Teams Toolkit Extension:** Use the Teams Toolkit for Visual Studio Code to simplify development, provisioning, and deployment.
- **Creating a New Project:**
  ```bash
  teamsfx new
  ```
- **Provisioning Resources:**
  ```bash
  teamsfx provision
  ```
- **Deploying the App:**
  ```bash
  teamsfx deploy
  ```

#### Testing and Building:

- **Cloning the Repository:**
  ```bash
  git clone https://github.com/OfficeDev/microsoft-teams-library-js.git
  ```
- **Installing Dependencies:**
  ```bash
  pnpm install
  ```
- **Building the Project:**
  ```bash
  pnpm build
  ```
- **Running Unit Tests:**
  ```bash
  pnpm test
  ```
- **Generating Documentation:**
  ```bash
  pnpm run docs
  ```

#### Additional Resources:

- **Changelog:** For breaking changes and updates, refer to the [CHANGELOG.md](https://github.com/OfficeDev/microsoft-teams-library-js/blob/main/packages/teams-js/CHANGELOG.md).
- **Documentation:** Detailed documentation and API references are available at [Microsoft Teams JavaScript SDK Documentation](https://learn.microsoft.com/en-us/javascript/api/overview/msteams-client?view=msteams-client-js-latest).

#### Example: Silent Authentication with Azure AD

```javascript
import { authentication } from '@microsoft/teams-js';

// Attempt to silently get an auth token (SSO)
authentication.getAuthToken().then((token) => {
  // Use the token to access Microsoft Graph or other APIs
}).catch((error) => {
  // If silent auth fails, initiate interactive authentication
  authentication.authenticate({
    url: 'https://yourdomain.com/auth-start',
    successCallback: (result) => {
      // Handle successful authentication
    },
    failureCallback: (reason) => {
      // Handle authentication failure
    }
  });
});
```

#### Handling Theme Changes:

Update your app's theme dynamically based on user preferences:
```javascript
app.registerOnThemeChangeHandler((theme) => {
  // Apply the new theme (possible values: 'default', 'dark', 'contrast')
  applyTheme(theme);
});
```

#### Navigating Pages Within the App:

Use the `pages` namespace to navigate within your app:
```javascript
import { pages } from '@microsoft/teams-js';

pages.config.setValidityState(true); // For settings pages
pages.navigateToApp({ appId: 'your-app-id', pageId: 'destination-page' }).then(() => {
  // Navigation successful
}).catch((error) => {
  // Handle navigation error
});
```

#### Opening Dialogs with Adaptive Cards:

```javascript
dialog.adaptiveCard.open({
  card: adaptiveCardJson,
  size: { width: 400, height: 300 },
  title: 'Adaptive Card Dialog'
}).then((result) => {
  // Handle result from the dialog
}).catch((error) => {
  // Handle error
});
```

#### Notes on Authentication Flow:

- **Starting Point:** The authentication flow must start and end within domains specified in the `validDomains` array of your app manifest.
- **Redirects:** Use client-side redirects (e.g., `window.location.assign()`) to navigate to the identity provider's login page from your authentication start page.
- **Callback Handling:** In your authentication callback page, parse the response and call `authentication.notifySuccess()` or `authentication.notifyFailure()` accordingly.
- **Security:** Always validate identity information received during authentication before using it.

#### Handling Authentication in Teams Tabs:

1. **Initiate Authentication:**
   ```javascript
   authentication.authenticate({
     url: 'https://yourdomain.com/auth-start',
     width: 600,
     height: 535,
     successCallback: (result) => {
       // Authentication successful
     },
     failureCallback: (reason) => {
       // Authentication failed
     }
   });
   ```

2. **Auth Start Page:**
   - From your auth start page, redirect to the identity provider's login page.

3. **Auth Callback Page:**
   - After successful login, the identity provider redirects to your callback page.
   - In the callback page:
     ```javascript
     import { authentication } from '@microsoft/teams-js';

     // Parse URL hash or query parameters to get tokens or error messages
     const params = new URLSearchParams(window.location.hash.substring(1));

     if (params.has('access_token')) {
       const token = params.get('access_token');
       authentication.notifySuccess(token);
     } else if (params.has('error')) {
       const error = params.get('error');
       authentication.notifyFailure(error);
     }
     ```

#### Best Practices:

- **Version Compatibility:** Ensure your SDK version matches your app manifest requirements, especially when extending apps across multiple hosts.
- **Async/Await:** Leverage `async/await` for cleaner asynchronous code with the Promise-based SDK.
- **Error Handling:** Implement comprehensive error handling for all asynchronous operations.
- **Capability Checks:** Always check if a capability is supported before using it to ensure compatibility across different hosts.
- **Security:** Do not trust client-side context information; always validate and secure sensitive data.
- **User Experience:** Provide feedback to users during authentication processes and handle loading states appropriately.

This compilation of information and code snippets should assist in implementing a project using the Microsoft Teams JavaScript SDK, ensuring adherence to best practices and leveraging the SDK's features effectively.

## Microsoft Bot Framework SDK for Node.js

**Notes and Code Snippets for Implementing a Bot using Microsoft Bot Framework SDK for Node.js**

---

**Prerequisites:**

- **Node.js**: Install Node.js from [Node.js Download](https://nodejs.org/en/).
- **Git**: Install Git from [Git Download](https://git-scm.com/downloads).
- **Yarn** (optional but recommended for managing packages): Install Yarn from [Yarn Download](https://classic.yarnpkg.com/).
- **TypeScript** (if using TypeScript): Install TypeScript globally using `npm install -g typescript`.
- **Code Editor**: Use a code editor like [Visual Studio Code](https://code.visualstudio.com/).

---

**Setting Up a Basic Bot Application:**

1. **Initialize a New Node.js Project:**

   ```bash
   mkdir my-bot
   cd my-bot
   npm init -y
   ```

2. **Install Required Packages:**

   Install the core bot framework packages:

   ```bash
   npm install botbuilder
   npm install restify
   ```

   Additional packages for extended functionalities:

   ```bash
   npm install botbuilder-dialogs
   npm install botbuilder-ai        # For LUIS and AI integration
   npm install botbuilder-applicationinsights
   npm install botbuilder-azure     # For Azure integrations
   npm install botbuilder-testing   # For writing unit tests
   ```

---

**Creating the Bot Server:**

Set up a Restify server to host your bot:

```javascript
// index.js

const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Create server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\nBot server listening to ${server.url}`);
});

// Create adapter
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId || '',       // Microsoft App ID
    appPassword: process.env.MicrosoftAppPassword || ''  // Microsoft App Password
});

// Catch-all for errors
adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError]: ${error}`);
    await context.sendActivity('Oops. Something went wrong!');
};

// Listen for incoming requests
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route to main bot logic
        await bot.run(context);
    });
});
```

---

**Implementing the Bot Logic:**

Create an `EchoBot` class that handles incoming messages:

```javascript
// bot.js

const { ActivityHandler, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();

        // Handle message activity
        this.onMessage(async (context, next) => {
            const text = context.activity.text;

            // Echo back the user's message
            await context.sendActivity(`You said: "${text}"`);

            // By calling next() you ensure that the next BotHandler is run
            await next();
        });

        // Handle conversation updates (e.g., new members added)
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';

            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(welcomeText);
                }
            }

            // By calling next() you ensure that the next BotHandler is run
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
```

Update the server code to use the `EchoBot`:

```javascript
// index.js (continued)

const { EchoBot } = require('./bot');

const bot = new EchoBot();
```

---

**Using Dialogs for Complex Conversation Flow:**

Dialogs allow for multi-turn conversations:

```javascript
// bot.js (continued)

const { ActivityHandler, MessageFactory } = require('botbuilder');
const { DialogSet, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');

class MyBot extends ActivityHandler {
    constructor(conversationState, userState) {
        super();

        // Create dialog state property
        this.dialogState = conversationState.createProperty('dialogState');

        // Create a DialogSet
        this.dialogs = new DialogSet(this.dialogState);

        // Add dialogs
        this.dialogs.add(new TextPrompt('textPrompt'));
        this.dialogs.add(new WaterfallDialog('mainDialog', [
            this.askName.bind(this),
            this.displayName.bind(this)
        ]));

        // Handle messages
        this.onMessage(async (context, next) => {
            const dialogContext = await this.dialogs.createContext(context);
            const results = await dialogContext.continueDialog();
            if (results.status === 'empty') {
                await dialogContext.beginDialog('mainDialog');
            }
            await next();
        });
    }

    async askName(step) {
        // Prompt for the user's name
        return await step.prompt('textPrompt', `What's your name?`);
    }

    async displayName(step) {
        const name = step.result;
        await step.context.sendActivity(`Hello, ${name}! Nice to meet you.`);
        return await step.endDialog();
    }
}

module.exports.MyBot = MyBot;
```

---

**Managing State in the Bot:**

Use state management to store and access user and conversation data.

```javascript
// index.js (continued)

const { MemoryStorage, ConversationState, UserState } = require('botbuilder');
const { MyBot } = require('./bot');

// Create memory storage
const memoryStorage = new MemoryStorage();

// Create conversation and user state objects
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// Create the bot
const bot = new MyBot(conversationState, userState);

// Register state middleware
adapter.use(conversationState);
adapter.use(userState);
```

**Accessing and Setting State Properties:**

```javascript
// bot.js (continued)

class MyBot extends ActivityHandler {
    constructor(conversationState, userState) {
        super();

        // Save the state objects
        this.conversationState = conversationState;
        this.userState = userState;

        // Create property accessors
        this.userProfileAccessor = userState.createProperty('UserProfile');
        this.conversationDataAccessor = conversationState.createProperty('ConversationData');

        // ... rest of constructor ...
    }

    // ... rest of class ...

    async onTurn(context) {
        // Get state properties
        const userProfile = await this.userProfileAccessor.get(context, {});
        const conversationData = await this.conversationDataAccessor.get(context, {});

        // ... use state properties ...

        // Save state changes
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }
}
```

---

**Using Adaptive Cards:**

Send rich content using Adaptive Cards.

```javascript
const { CardFactory } = require('botbuilder');

const adaptiveCard = CardFactory.adaptiveCard({
    '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
    'type': 'AdaptiveCard',
    'version': '1.3',
    'body': [
        {
            'type': 'TextBlock',
            'text': 'Welcome to the Bot',
            'weight': 'Bolder',
            'size': 'Medium'
        },
        {
            'type': 'Image',
            'url': 'https://example.com/image.png',
            'size': 'Large'
        }
    ]
});

await context.sendActivity({ attachments: [adaptiveCard] });
```

---

**Integrating Language Understanding (LUIS):**

Use LUIS for natural language understanding.

```javascript
const { LuisRecognizer, QnAMaker } = require('botbuilder-ai');

// Setup LUIS recognizer
const luisApplication = {
    applicationId: process.env.LuisAppId,
    endpointKey: process.env.LuisAPIKey,
    endpoint: process.env.LuisAPIHostName
};

const luisRecognizer = new LuisRecognizer(luisApplication, {
    includeAllIntents: true,
    log: true,
    staging: false
}, true);

// In your bot's message handler
this.onMessage(async (context, next) => {
    const recognizerResult = await luisRecognizer.recognize(context);
    const topIntent = LuisRecognizer.topIntent(recognizerResult);

    // Handle intents
    switch (topIntent) {
        case 'IntentName':
            // Handle intent
            break;
        default:
            await context.sendActivity(`Sorry, I didn't understand that.`);
    }

    await next();
});
```

---

**Testing the Bot Locally:**

Use the Bot Framework Emulator to test your bot locally.

1. **Run Your Bot:**

   ```bash
   node index.js
   ```

2. **Open Bot Framework Emulator:**

   - Download from [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator).
   - Open the emulator and connect to `http://localhost:3978/api/messages`.

---

**Deploying the Bot to Azure:**

1. **Create an Azure Web App:**

   - Go to the [Azure Portal](https://portal.azure.com/), create a new **Web App**.

2. **Configure Deployment:**

   - Set up continuous deployment from GitHub or deploy manually.

3. **Set Environment Variables:**

   - In the Azure Web App settings, configure `MicrosoftAppId`, `MicrosoftAppPassword`, and other necessary environment variables.

4. **Update Message Endpoint:**

   - Ensure your bot's messaging endpoint is set to `https://<yourwebapp>.azurewebsites.net/api/messages`.

---

**Registering the Bot:**

1. **Go to Bot Framework Portal:**

   - Visit [Bot Framework Developer Portal](https://dev.botframework.com/).

2. **Register a New Bot:**

   - Provide the necessary information and the messaging endpoint.

3. **Obtain App ID and Password:**

   - After registration, you'll receive a `MicrosoftAppId` and `MicrosoftAppPassword`.

4. **Configure in Your Bot:**

   - Update your bot's configuration with the obtained App ID and password.

---

**Connecting the Bot to Microsoft Teams:**

1. **Modify Bot to Support Teams:**

   - Install `botbuilder-teams` package for Teams-specific functionality (if needed).

     ```bash
     npm install botbuilder-teams
     ```

2. **Handle Teams-Specific Activities:**

   - Teams supports all Bot Framework activities.

3. **Create a Teams App Manifest:**

   - Define your Teams app in a `manifest.json` file, specifying bot details.

4. **Upload the App to Teams:**

   - Upload the app package (including `manifest.json`) to Teams for testing.

---

**Samples and Additional Resources:**

- **BotBuilder Samples Repository:**

  - Explore various samples at [BotBuilder-Samples](https://github.com/microsoft/BotBuilder-Samples).

- **Echo Bot Sample:**

  - Basic bot that echoes user messages.
  - [JavaScript Echo Bot Sample](https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/javascript_nodejs/02.echo-bot).

- **Core Bot Sample:**

  - Demonstrates advanced features like dialogs, LUIS, and QnA Maker.
  - [JavaScript Core Bot Sample](https://github.com/microsoft/BotBuilder-Samples/blob/main/samples/javascript_nodejs/13.core-bot).

- **Adaptive Dialogs and Language Generation:**

  - Use adaptive dialogs for more flexible conversation flow.
  - [Language Generation Documentation](https://learn.microsoft.com/en-us/azure/bot-service/language-generation/overview?view=azure-bot-service-4.0).

---

**Security and Best Practices:**

- **Error Handling:**

  - Implement comprehensive error handling using `adapter.onTurnError`.

- **Secure Storage of Secrets:**

  - Use environment variables or Azure Key Vault to manage secrets like App IDs and passwords.

- **State Storage Providers:**

  - For production, use a persistent storage provider like Azure Blob Storage or Cosmos DB instead of `MemoryStorage`.

---

**Understanding Bot Activity Schema:**

- **Activity Types:**

  - `message`, `conversationUpdate`, `typing`, etc.

- **Accessing Activity Data:**

  ```javascript
  const activity = context.activity;
  const messageText = activity.text;
  const userId = activity.from.id;
  ```

---

**Using Middleware:**

- **Implement Middleware:**

  ```javascript
  adapter.use(async (context, next) => {
      // Middleware logic before the bot's logic runs
      await next();
      // Middleware logic after the bot's logic runs
  });
  ```

---

**Extending Functionality with NPM Packages:**

- **botbuilder-ai:** Adds AI capabilities like LUIS and QnA Maker.

- **botbuilder-dialogs:** Provides dialog system for managing conversations.

- **botbuilder-applicationinsights:** Integrates with Azure Application Insights for telemetry.

---

**Building Bots for Microsoft Teams:**

- **Specific Considerations:**

  - Handle Teams-specific events and data structures.

- **Teams-Specific Code Example:**

  ```javascript
  this.onMessage(async (context, next) => {
      const teamId = context.activity.channelData.team.id;
      await context.sendActivity(`This message was sent in team: ${teamId}`);
      await next();
  });
  ```

---

**Handling Dialogs and State Across Turns:**

- **Persisting Dialog State:**

  - Save state at the end of each turn.

    ```javascript
    await conversationState.saveChanges(context, false);
    await userState.saveChanges(context, false);
    ```

---

**Using Prompts and Waterfalls:**

- **Text Prompt Example:**

  ```javascript
  dialogs.add(new TextPrompt('textPrompt'));

  dialogs.add(new WaterfallDialog('greetingDialog', [
      async (step) => {
          return await step.prompt('textPrompt', 'What is your name?');
      },
      async (step) => {
          const name = step.result;
          await step.context.sendActivity(`Hello, ${name}!`);
          return await step.endDialog();
      }
  ]));
  ```

---

**Authenticating Users and Accessing Protected Resources:**

- **OAuth Prompt:**

  - Use `OAuthPrompt` for authentication flows.

- **Sample for Authentication:**

  - [OAuth Authentication Sample](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/18.bot-authentication).

---

**Testing and Debugging:**

- **Use Debugger in VS Code:**

  - Set breakpoints and debug the bot using VS Code.

- **Unit Testing:**

  - Use `botbuilder-testing` package for writing unit tests.

  ```javascript
  npm install botbuilder-testing
  ```

- **Sample Unit Test:**

  ```javascript
  const { TestAdapter } = require('botbuilder');
  const { EchoBot } = require('../bot');

  const bot = new EchoBot();
  const adapter = new TestAdapter(async (context) => {
      await bot.run(context);
  });

  // Test script
  adapter.test('hello', 'You said: "hello"');
  ```

---

**Useful Tips:**

- **Asynchronous Operations:**

  - Always use `await` with async functions to ensure proper execution order.

- **Logging:**

  - Implement logging to monitor bot activities and errors.

- **Documentation:**

  - Refer to the official documentation for detailed explanations and advanced topics:

    - [Bot Framework SDK for Node.js](https://learn.microsoft.com/en-us/azure/bot-service/nodejs/?view=azure-bot-service-4.0).

- **Community Support:**

  - Engage with the community on GitHub and Stack Overflow for assistance and sharing knowledge.

---

By utilizing these code snippets and guidelines, you can effectively implement a bot using the Microsoft Bot Framework SDK for Node.js, tailored to your project's requirements.

## Microsoft Graph JavaScript SDK

**Notes and Code Snippets for Implementing the Microsoft Graph JavaScript SDK**

To effectively implement the Microsoft Graph JavaScript SDK in your project, consider the following key points and code examples:

---

### **Installation**

Install the Microsoft Graph JavaScript SDK and necessary dependencies using npm:

```bash
npm install @microsoft/microsoft-graph-client
```

For TypeScript types (optional but recommended):

```bash
npm install @microsoft/microsoft-graph-types --save-dev
```

If you're working in environments that require a fetch polyfill (like Node.js versions below 18), install one of the following:

```bash
npm install isomorphic-fetch
# or
npm install cross-fetch
```

---

### **Importing the SDK**

In your JavaScript or TypeScript files, import the `Client` from the SDK:

```javascript
import { Client } from "@microsoft/microsoft-graph-client";

// If using TypeScript and need types for Graph entities
import "@microsoft/microsoft-graph-types";
```

---

### **Authentication Setup**

Before making requests, you need to authenticate your application. This usually involves registering an application in Azure Active Directory to obtain `clientId`, `tenantId`, and `clientSecret`.

#### **Using Client Credentials (App-Only Authentication)**

For server-side authentication, you can use the `ClientSecretCredential` from `@azure/identity` along with the SDK's `TokenCredentialAuthenticationProvider`:

```javascript
import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

const tenantId = "YOUR_TENANT_ID";
const clientId = "YOUR_CLIENT_ID";
const clientSecret = "YOUR_CLIENT_SECRET";

// Create a credential instance
const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

// Set the required scopes
const options = {
  scopes: ["https://graph.microsoft.com/.default"],
};

// Initialize the authentication provider
const authProvider = new TokenCredentialAuthenticationProvider(credential, options);

// Initialize the Graph client
const client = Client.initWithMiddleware({ authProvider });
```

#### **Using Device Code Authentication (User Authentication)**

For console applications where user interaction is required, you can use `DeviceCodeCredential`:

```javascript
import { DeviceCodeCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

const tenantId = "YOUR_TENANT_ID";
const clientId = "YOUR_CLIENT_ID";

const credential = new DeviceCodeCredential({
  clientId,
  tenantId,
  userPromptCallback: (deviceCodeInfo) => {
    console.log(deviceCodeInfo.message);
  },
});

const options = {
  scopes: ["user.read", "mail.read", "mail.send"],
};

const authProvider = new TokenCredentialAuthenticationProvider(credential, options);

const client = Client.initWithMiddleware({ authProvider });
```

---

### **Making Graph API Calls**

All requests start with `client.api(path)` and end with an action like `get()`, `post()`, `patch()`, or `delete()`.

#### **Get User Details**

```javascript
try {
  const userDetails = await client.api('/me').get();
  console.log(userDetails);
} catch (error) {
  console.error(error);
}
```

#### **Send an Email**

```javascript
const mail = {
  subject: "Microsoft Graph JavaScript Sample",
  toRecipients: [
    {
      emailAddress: {
        address: "recipient@example.com",
      },
    },
  ],
  body: {
    content: "<h1>Microsoft Graph JavaScript Sample</h1><p>This is a sample email sent using Microsoft Graph.</p>",
    contentType: "HTML",
  },
};

try {
  await client.api('/me/sendMail').post({ message: mail });
  console.log("Email sent successfully.");
} catch (error) {
  console.error(error);
}
```

#### **Create a Planner Task**

```javascript
const plannerTask = {
  planId: 'YOUR_PLAN_ID',
  bucketId: 'YOUR_BUCKET_ID',
  title: 'New Task Title',
  assignments: {
    'USER_ID': {
      '@odata.type': '#microsoft.graph.plannerAssignment',
      orderHint: ' !',
    },
  },
};

try {
  const newTask = await client.api('/planner/tasks').post(plannerTask);
  console.log('Planner task created:', newTask);
} catch (error) {
  console.error(error);
}
```

*Replace `'YOUR_PLAN_ID'`, `'YOUR_BUCKET_ID'`, and `'USER_ID'` with actual values from your Planner setup.*

---

### **Uploading Large Files**

The SDK provides the `LargeFileUploadTask` class to handle large file uploads efficiently.

#### **Uploading a File Stream (Node.js)**

```javascript
import { LargeFileUploadTask, StreamUpload } from "@microsoft/microsoft-graph-client";
import * as fs from "fs";

const fileName = "largefile.zip";
const filePath = `./path/to/${fileName}`;
const fileSize = fs.statSync(filePath).size;
const fileStream = fs.createReadStream(filePath);

const fileObject = new StreamUpload(fileStream, fileName, fileSize);

// Create an upload session (example for OneDrive)
const uploadSession = await client.api('/me/drive/root:/' + fileName + ':/createUploadSession').post({});

// Specify upload options
const options = {
  rangeSize: 1024 * 1024, // 1 MB chunks
};

const uploadTask = new LargeFileUploadTask(client, fileObject, uploadSession, options);

try {
  const uploadResult = await uploadTask.upload();
  console.log('File uploaded successfully:', uploadResult);
} catch (err) {
  console.error(err);
}
```

---

### **Handling Paging and Batching**

The SDK simplifies common tasks like paging through collections and batching multiple requests.

#### **Paging Through a Collection**

```javascript
let messages = await client.api('/me/messages').top(10).get();
console.log(messages);

// Check if more pages are available
while (messages['@odata.nextLink']) {
  messages = await client.api(messages['@odata.nextLink']).get();
  console.log(messages);
}
```

#### **Batching Requests**

```javascript
const batchRequest = {
  requests: [
    {
      id: "1",
      method: "GET",
      url: "/me",
    },
    {
      id: "2",
      method: "GET",
      url: "/me/messages?$top=5",
    },
  ],
};

try {
  const batchResponse = await client.api('/$batch').post(batchRequest);
  console.log(batchResponse);
} catch (error) {
  console.error(error);
}
```

---

### **Version Requirements and Notes**

- **Node.js Version**: The SDK requires Node.js **12 LTS or higher**.
- **Node.js 18**: If using Node.js 18, disable the experimental `fetch` feature by running Node with the flag `--no-experimental-fetch`.
- **TypeScript**: The SDK is implemented using TypeScript 4.x, ensuring robust type definitions.
- **Authentication Flows**: The SDK supports multiple authentication flows, including:

  - Device Code Authentication
  - Authorization Code Flow with PKCE (using `@azure/msal-browser` for SPA apps)
  - Client Credentials Flow (for app-only authentication)

---

### **Additional Resources**

- **Documentation and Samples**: Explore the following resources for more detailed examples and documentation:

  - [Microsoft Graph JavaScript SDK Documentation](https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs)
  - [Calling Pattern](https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/CallingPattern.md)
  - [Actions](https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/Actions.md)
  - [Query Parameters](https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/QueryParameters.md)

- **Sample Projects**: Review sample projects to see the SDK in action:

  - [Microsoft Graph Sample Node.js Express App](https://github.com/microsoftgraph/msgraph-sample-nodeexpressapp)
  - [JavaScript Tutorial for Microsoft Graph](https://learn.microsoft.com/en-us/graph/tutorials/javascript)

---

### **Best Practices**

- **Single Client Instance**: Use a single `Client` instance throughout the application's lifecycle to optimize performance.
- **Error Handling**: Implement robust error handling around API calls to gracefully handle exceptions and API errors.
- **Token Caching**: Cache authentication tokens when possible to reduce the number of authentication requests.
- **Scoping Permissions**: Request the minimal scopes necessary for your application to enhance security.

---

By incorporating these code snippets and adhering to the guidelines provided, you'll be well-equipped to implement the Microsoft Graph JavaScript SDK in your project effectively.

## Express.js

**Express.js Notes and Useful Code Snippets for Project Implementation**

**Introduction to Express.js**
- Express.js is a minimal and flexible Node.js web application framework.
- It provides robust features for building web and mobile applications.
- Ideal for creating APIs and handling HTTP requests and responses.

**Installation**
- Ensure Node.js (version 18 or higher) is installed.
- Install Express globally or locally using npm:
  ```bash
  npm install express --save
  ```

**Basic App Setup**
- Create a basic Express application:
  ```javascript
  const express = require('express');
  const app = express();
  const port = 3000;

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  ```
- Start the server:
  ```bash
  node app.js
  ```

**Routing**
- Define routes to determine how your application responds to client requests.
- Basic route handling methods:
  - `app.get()`: Handle GET requests.
  - `app.post()`: Handle POST requests.
  - `app.put()`: Handle PUT requests.
  - `app.delete()`: Handle DELETE requests.
- Example of CRUD operations:

  ```javascript
  // Create (POST)
  app.post('/items', (req, res) => {
    // Code to create a new item
  });

  // Read all items (GET)
  app.get('/items', (req, res) => {
    // Code to retrieve all items
  });

  // Read an item by ID (GET)
  app.get('/items/:id', (req, res) => {
    // Code to retrieve an item by ID
  });

  // Update an item by ID (PUT)
  app.put('/items/:id', (req, res) => {
    // Code to update an item by ID
  });

  // Delete an item by ID (DELETE)
  app.delete('/items/:id', (req, res) => {
    // Code to delete an item by ID
  });
  ```

**Middleware**
- Functions that have access to the request (`req`) and response (`res`) objects, and the `next` middleware function.
- Used for tasks such as logging, error handling, parsing, authentication, etc.
- **Built-in Middleware**:
  - `express.json()`: Parses incoming requests with JSON payloads.
    ```javascript
    app.use(express.json());
    ```
  - `express.urlencoded()`: Parses incoming requests with URL-encoded payloads.
    ```javascript
    app.use(express.urlencoded({ extended: true }));
    ```
  - `express.static()`: Serves static files from a specified directory.
    ```javascript
    app.use(express.static('public'));
    ```
- **Third-party Middleware**:
  - **Cookie Parser**:
    - Install: `npm install cookie-parser`
    - Use:
      ```javascript
      const cookieParser = require('cookie-parser');
      app.use(cookieParser());
      ```
  - **Express Session**:
    - Install: `npm install express-session`
    - Use:
      ```javascript
      const session = require('express-session');
      app.use(session({
        secret: 'your secret key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
      }));
      ```
  - **Helmet** (security best practices):
    - Install: `npm install helmet`
    - Use:
      ```javascript
      const helmet = require('helmet');
      app.use(helmet());
      ```
  - **Rate Limiter**:
    - Install: `npm install express-rate-limit`
    - Use:
      ```javascript
      const rateLimit = require('express-rate-limit');
      const limiter = rateLimit({
        windowMs: 1 * 60 * 1000, // 1 minute
        max: 20 // limit each IP to 20 requests per windowMs
      });
      app.use(limiter);
      ```
- **Custom Middleware**:
  - Create functions to perform specific tasks.
  - Must call `next()` to pass control to the next middleware function.
  - Example of a logging middleware:
    ```javascript
    app.use((req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} request for '${req.url}'`);
      next();
    });
    ```

**Handling Requests and Responses**
- Access request data:
  - Query parameters: `req.query`
  - Route parameters: `req.params`
  - Body data: `req.body` (requires parsing middleware)
- Send responses:
  - `res.send()`: Sends a response of various types.
  - `res.json()`: Sends a JSON response.
  - `res.status()`: Sets the HTTP status code.
  - Example:
    ```javascript
    app.get('/user/:id', (req, res) => {
      const userId = req.params.id;
      res.status(200).json({ userId });
    });
    ```

**Error Handling**
- Error-handling middleware functions have four arguments: `(err, req, res, next)`.
- Example of an error-handling middleware:
  ```javascript
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  ```
- Ensure this middleware is defined after all other app.use() and routes calls.

**Serving Static Files**
- Use `express.static` to serve static assets like HTML, CSS, and images.
  ```javascript
  app.use(express.static('public'));
  ```
  - Access files in the `public` directory via `http://yourdomain.com/filename.ext`.

**Session and Cookie Management**
- **Cookies**:
  - Setting a cookie:
    ```javascript
    app.get('/set-cookie', (req, res) => {
      res.cookie('username', 'john');
      res.send('Cookie has been set');
    });
    ```
  - Reading a cookie:
    ```javascript
    app.get('/get-cookie', (req, res) => {
      const username = req.cookies.username;
      res.send(`Username is ${username}`);
    });
    ```
- **Sessions**:
  - Setting session data:
    ```javascript
    app.get('/set-session', (req, res) => {
      req.session.username = 'john';
      res.send('Session data has been set');
    });
    ```
  - Accessing session data:
    ```javascript
    app.get('/get-session', (req, res) => {
      const username = req.session.username;
      res.send(`Username from session is ${username}`);
    });
    ```

**Security Considerations**
- **Helmet**: Helps secure your app by setting various HTTP headers.
  ```javascript
  const helmet = require('helmet');
  app.use(helmet());
  ```
- **Rate Limiting**: Prevents brute-force attacks.
  ```javascript
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20
  });
  app.use(limiter);
  ```
- **Environment Variables**: Store sensitive information securely.
  - Use environment variables for configurations like database URIs.
  - Example of using an environment variable:
    ```javascript
    const dbURI = process.env.DB_URI;
    ```
- **Set NODE_ENV to 'production'** to enable production best practices.

**Deployment Considerations**
- **Prepare for Deployment**:
  - Remove stack traces from error pages.
  - Use environment variables for configuration.
  - Ensure `NODE_ENV` is set to 'production'.
- **Process Management**:
  - Use a process manager like PM2 to manage your application in production.
- **Logging**:
  - Implement logging (e.g., using `morgan` or `winston`).
- **Static Asset Optimization**:
  - Use gzip compression:
    ```javascript
    const compression = require('compression');
    app.use(compression());
    ```

**Useful Code Snippets**
- **Parsing JSON and URL-encoded Data**:
  ```javascript
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  ```
- **Defining Routes Using Router Middleware**:
  ```javascript
  const express = require('express');
  const router = express.Router();

  router.get('/path', (req, res) => {
    res.send('Response from /path');
  });

  module.exports = router;

  // In your main app file
  const myRouter = require('./path/to/router');
  app.use('/myroute', myRouter);
  ```
- **Handling 404 Errors**:
  ```javascript
  app.use((req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist.");
  });
  ```

**Best Practices**
- Organize your code using modular routers and controllers.
- Keep middleware functions focused and single-purpose.
- Be mindful of middleware execution order.
- Validate and sanitize all user inputs.
- Use HTTPS in production environments.
- Regularly update dependencies to address security vulnerabilities.

**Conclusion**
- Express.js provides a powerful yet simple way to build web applications and APIs.
- Utilize middleware, routing, and error handling to create robust applications.
- Always consider security and performance when deploying your application.

By leveraging these notes and code snippets, you can effectively implement your Express.js project with best practices in mind.

## Passport.js and Passport-Azure-AD

When implementing authentication with Azure Active Directory (Azure AD) in your Node.js project using Passport.js, the following information and code snippets will be helpful:

---

### **Important Note: Deprecation of `passport-azure-ad`**

- **`passport-azure-ad` is deprecated** and no longer supported.
- **Recommendation**: Use the Microsoft Authentication Library for Node.js (`msal-node`) for authentication against Azure AD in new projects.

---

### **Using `passport-azure-ad` (If Legacy Support is Needed)**

#### **1. Choosing a Strategy**

- **`OIDCStrategy`**: Use for web application login (interactive user authentication).
- **`BearerStrategy`**: Use to protect APIs by validating access tokens (token-based authentication).

#### **2. Configuring `OIDCStrategy`**

```javascript
const passport = require('passport');
const { OIDCStrategy } = require('passport-azure-ad');

const oidcOptions = {
  identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
  clientID: clientID,
  responseType: 'code id_token',
  responseMode: 'form_post',
  redirectUrl: 'https://yourapp.com/auth/openid/return',
  clientSecret: clientSecret,
  validateIssuer: true,
  issuer: null,
  passReqToCallback: false,
  scope: ['profile', 'offline_access', 'email'],
  loggingLevel: 'info',
};

passport.use(new OIDCStrategy(oidcOptions, (iss, sub, profile, accessToken, refreshToken, done) => {
  if (!profile) {
    return done(new Error('No profile found'), null);
  }
  // Handle user profile and tokens
  return done(null, profile);
}));
```

#### **3. Setting Up Routes for OIDC Authentication**

```javascript
const express = require('express');
const app = express();

// Initialize passport and session
app.use(require('express-session')({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user (for session management)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Login route
app.get('/login', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }));

// Callback route
app.post('/auth/openid/return',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
```

#### **4. Configuring `BearerStrategy` for API Protection**

```javascript
const { BearerStrategy } = require('passport-azure-ad');

const bearerOptions = {
  identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
  clientID: clientID,
  audience: clientID, // Optional if same as clientID
  validateIssuer: true,
  loggingLevel: 'info',
  passReqToCallback: false,
  scope: ['api.scope'],
};

passport.use(new BearerStrategy(bearerOptions, (token, done) => {
  // The token contains user information
  return done(null, token);
}));

// Protecting API routes
app.get('/api/protected',
  passport.authenticate('oauth-bearer', { session: false }),
  (req, res) => {
    res.json({ message: `Hello, ${req.user.name}` });
  }
);
```

---

### **Using `passport-azure-ad-oauth2`**

#### **1. Installation**

```bash
npm install passport-azure-ad-oauth2
```

#### **2. Configuring the Strategy**

```javascript
const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy;
const jwt = require('jsonwebtoken');

passport.use(new AzureAdOAuth2Strategy({
    clientID: '{YOUR_CLIENT_ID}',
    clientSecret: '{YOUR_CLIENT_SECRET}',
    callbackURL: 'https://yourapp.com/auth/azureadoauth2/callback',
    resource: '00000002-0000-0000-c000-000000000000', // Microsoft Graph API or other
    tenant: 'yourtenant.onmicrosoft.com',
  },
  (accessToken, refreshToken, params, profile, done) => {
    const decodedIdToken = jwt.decode(params.id_token);
    User.findOrCreate({ id: decodedIdToken.oid }, (err, user) => {
      done(err, user);
    });
  }
));
```

#### **3. Setting Up Authentication Routes**

```javascript
// Authentication request
app.get('/auth/azureadoauth2',
  passport.authenticate('azure_ad_oauth2'));

// Callback route
app.get('/auth/azureadoauth2/callback',
  passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/');
  }
);
```

---

### **Implementing Azure AD Authentication in NestJS**

#### **1. Setting Up the Strategy**

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

@Injectable()
export class AzureADStrategy extends PassportStrategy(BearerStrategy, 'azure-ad') {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${process.env.TENANT_ID}/v2.0/.well-known/openid-configuration`,
      clientID: process.env.CLIENT_ID,
    });
  }

  async validate(token: any) {
    // Here you can add additional validation or user fetching logic
    return token;
  }
}
```

#### **2. Protecting Routes with Guards**

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class ApiController {
  @UseGuards(AuthGuard('azure-ad'))
  @Get('protected')
  getProtectedResource() {
    return 'This is a protected resource';
  }
}
```

---

### **Important Configuration Options**

- **`identityMetadata`**: URL where the OpenID Connect metadata is located. For Azure AD v2.0, it's of the form `https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration`.
- **`clientID`**: The Application (client) ID from the Azure AD app registration.
- **`clientSecret`**: The client secret from the Azure AD app registration (required for web apps with confidential clients).
- **`responseType`**: Determines the type of response returned. Common values are `'id_token'`, `'code'`, or `'code id_token'`.
- **`responseMode`**: The method that should be used to send the resulting token back to your app. Common values are `'form_post'` or `'query'`.
- **`redirectUrl`**: The callback URL where your app receives responses from Azure AD.
- **`allowHttpForRedirectUrl`**: Set to `true` only for development purposes. In production, always use `https` to protect tokens.
- **`scope`**: An array of scopes that you want the user to consent to.
- **`validateIssuer`**: Set to `true` to validate the issuer of the tokens.

---

### **Session Management**

- **Initialize Passport and Session Middleware**:

  ```javascript
  app.use(require('express-session')({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  ```

- **Serialize and Deserialize User**:

  ```javascript
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  ```

---

### **Handling Authentication Flow**

- **Login Endpoint**:

  ```javascript
  app.get('/login',
    passport.authenticate('azuread-openidconnect', { failureRedirect: '/' })
  );
  ```

- **Logout Endpoint**:

  ```javascript
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('https://login.microsoftonline.com/common/oauth2/v2.0/logout' +
      '?post_logout_redirect_uri=' + encodeURIComponent('https://yourapp.com'));
  });
  ```

- **Authentication Callback Endpoint**:

  ```javascript
  app.post('/auth/openid/return',
    passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
    (req, res) => {
      // Successful authentication
      res.redirect('/');
    }
  );
  ```

---

### **Best Practices**

- **Use Secure HTTP (HTTPS)**: Always ensure that your redirect URLs and endpoints are secured with HTTPS in production environments.
- **Store Secrets Securely**: Use environment variables or a secure key vault to store client IDs and client secrets.
- **Handle Errors Gracefully**: Implement error handling middleware to catch and respond to authentication errors.
- **Validate Tokens**: Ensure tokens are properly validated, including issuer, audience, and expiration checks.
- **Stay Updated**: Regularly check for updates or deprecation notices for the libraries used.

---

### **Transitioning to `msal-node`**

Given the deprecation of `passport-azure-ad`, it's advisable to use `msal-node` for authentication with Azure AD:

- **Installation**:

  ```bash
  npm install @azure/msal-node @azure/msal-express-wrapper
  ```

- **Basic Usage**:

  ```javascript
  const msal = require('@azure/msal-node');
  const msalExpress = require('@azure/msal-express-wrapper');

  const config = {
    auth: {
      clientId: 'YOUR_CLIENT_ID',
      authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
    },
    system: {
      loggerOptions: {
        loggerCallback(loglevel, message, containsPii) {
          console.log(message);
        },
        piiLoggingEnabled: false,
      },
    },
  };

  const cca = new msal.ConfidentialClientApplication(config);

  // Use msalExpress middleware to protect routes
  ```

- **Documentation**: Refer to the [MSAL Node documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-node) for detailed guidance on implementing authentication flows.

---

### **Additional Resources**

- **Sample Projects**: Look for updated sample projects using `msal-node` with Express.js.
- **Azure AD Documentation**: The [Microsoft identity platform documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/) provides in-depth information on integrating authentication.
- **Community Support**: Check forums like Stack Overflow (use tags like `msal`, `azure-active-directory`, `node.js`) for community support and examples.

---

By incorporating the above information and adapting the code snippets to your project's specific requirements, you can effectively implement Azure AD authentication using Passport.js or transition to the recommended `msal-node` library for future-proofing your application.