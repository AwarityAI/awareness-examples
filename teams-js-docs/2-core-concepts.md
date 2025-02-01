# 2. Core Concepts

## Architecture Overview

### Overview of the Architecture

The Teams SDK for JavaScript is designed with a modular architecture, promoting flexibility and scalability in building applications for Microsoft Teams. Each package within the SDK targets specific functionality, allowing developers to include only the components necessary for their application.

At the core of this architecture lies the `@teams.sdk/apps` package, which serves as the foundational framework for initializing and running bots or applications. It manages middleware, plugins, and event handling, orchestrating the flow of data and control throughout the application.

Other key packages interact seamlessly with the core to provide additional capabilities:

- **`@teams.sdk/api`**: Contains clients and models for interacting with Teams and Bot Framework APIs. It provides interfaces for activities, conversations, meetings, and more, enabling robust communication with Teams services.

- **`@teams.sdk/cards`**: Offers tools for constructing and customizing Adaptive Cards. It includes components, actions, inputs, and containers for creating rich, interactive card experiences within Teams.

- **`@teams.sdk/ai`**: Integrates AI features such as language understanding and response generation. It provides prompts, models, and templates for building conversational AI functionalities.

- **`@teams.sdk/openai`**: Facilitates integration with OpenAI services, enabling advanced AI capabilities like GPT-based conversational models within the Teams environment.

Supporting packages like `@teams.sdk/common` and `@teams.sdk/dev` provide shared utilities and development tools to enhance the overall development workflow.

The interaction between these packages is orchestrated through a well-defined flow of data and control. When an activity, such as a message from a user, is received, the `App` instance processes it through middleware functions, plugins, and eventually, the appropriate handlers. Clients from the `@teams.sdk/api` package may be used to perform API calls to Teams services, while `@teams.sdk/cards` can be utilized to construct dynamic responses.

[Placeholder: Architecture Diagram]

### Application Initialization

Initializing an application using the Teams SDK begins with setting up an instance of the `App` class from the `@teams.sdk/apps` package. This instance serves as the foundation of your bot or application, handling configurations, middleware, and plugins.

**Setting up the `App` Instance**

To create a new `App` instance, you need to provide the necessary credentials such as the client ID, client secret, and tenant ID associated with your Azure application registration. Here's how you can initialize the `App`:

```typescript
import { App } from '@teams.sdk/apps';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});
```

**Incorporating Plugins**

Plugins enhance the functionality of your application by adding capabilities like HTTP handling, development tools, or console interactions. To include plugins, pass them in the `plugins` array when initializing the `App` instance. For example, to add the `HttpPlugin` for handling HTTP requests:

```typescript
import { HttpPlugin } from '@teams.sdk/apps/plugins/http';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new HttpPlugin()],
});
```

By incorporating plugins, you extend your application's capabilities, enabling it to process activities, manage middleware, and interact with external services more effectively.

[Placeholder for code sample: Understanding the Architecture]

### Client Interaction

Clients provided by the `@teams.sdk/api` package play a crucial role in interacting with Teams services. They abstract the complexities of API calls, authentication, and data handling, offering a straightforward interface to perform actions such as sending messages, creating conversations, or managing user tokens.

**Utilizing Clients like `BotClient` and `ConversationClient`**

- **`BotClient`**: Used to interact with bot-specific endpoints, such as obtaining bot tokens or managing sign-in processes.
  
- **`ConversationClient`**: Facilitates interactions within conversations, allowing you to create new conversations, send messages, or retrieve conversation details.

Here's how you can utilize these clients in your application:

```typescript
import { BotClient } from '@teams.sdk/api/clients/bot';
import { ConversationClient } from '@teams.sdk/api/clients/conversation';

// Initialize the BotClient
const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

// Obtain a bot token
botClient.token.get({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
}).then((token) => {
  console.log('Bot Token:', token.access_token);
});

// Initialize the ConversationClient
const conversationClient = new ConversationClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

// Create a new conversation
conversationClient.create({
  bot: { id: 'bot-id', name: 'Bot Name' },
  members: [{ id: 'user-id', name: 'User Name' }],
}).then((conversation) => {
  console.log('New Conversation ID:', conversation.id);
});
```

**Managing Authentication Tokens and Service Requests**

Managing authentication tokens is essential for secure communication with Teams services. Clients handle token acquisition and refresh processes, ensuring that API calls are authenticated properly.

- **Authentication Tokens**: When initializing clients, you need to provide credentials that the clients use to authenticate requests. The clients can manage tokens internally, or you can manually handle token retrieval and set them in the client's configuration.

- **Service Requests**: Clients provide methods that correspond to specific API endpoints. For example, `ConversationClient` has methods like `create`, `get`, and `members` to manage conversations.

By leveraging these clients, you can simplify the process of interacting with Teams services, focusing on your application's logic rather than the underlying API details.

[Placeholder for code sample: Understanding the Architecture]

---

## Key Terminology

### Important Concepts

- **Activity**: An activity represents a communication exchange between the bot and users or channels in Microsoft Teams. Activities can be messages, events, commands, or any other interaction defined within the Bot Framework. They are the fundamental units of communication that your bot processes.

- **Middleware**: Middleware functions act as a pipeline through which activities pass before reaching your bot's core logic. They can perform tasks such as logging, authentication checks, or modifying activities. Middleware enables developers to separate concerns and create reusable, modular components.

- **Adapter**: Adapters handle the communication between the bot and the Teams channel, abstracting away channel-specific details. They allow your bot to interact with different channels in a consistent manner without needing to manage the underlying protocols.

- **Client**: Clients, such as `BotClient` or `ConversationClient`, provide interfaces to interact with specific Teams services. They manage API calls, handle authentication tokens, and facilitate actions like sending messages or retrieving conversation details.

- **Plugin**: Plugins are extensions that add or modify functionality within the `App`. They can introduce new features, handle specific types of activities, or integrate external services. Plugins enhance your bot's capabilities without altering the core codebase.

- **Token**: Tokens are credentials used for authenticating API requests to Teams services. They ensure secure communication by verifying the identity of the bot and authorizing access to resources.

### Activities and Middleware

Activities are at the heart of communication in a Teams bot. When a user sends a message or interacts with your bot, an activity is generated. The `App` instance processes these activities through middleware functions before they reach your bot's main logic.

**How Activities are Received and Processed**

When your bot receives an activity, it undergoes the following process:

1. **Reception**: The activity is received by the `App` instance, typically through an HTTP endpoint when using the `HttpPlugin`.

2. **Middleware Pipeline**: The activity passes through a series of middleware functions. Each middleware has the opportunity to inspect or modify the activity, perform actions, or halt further processing.

3. **Handler Execution**: After passing through the middleware pipeline, the activity reaches the designated handler that corresponds to its type (e.g., message handler for message activities).

4. **Response**: The bot generates a response, which can also pass through middleware before being sent back to the user.

**Implementing Middleware to Handle Activities**

Middleware functions are essential for processing activities efficiently. They are defined using the `app.use` method and have access to the activity context and a `next` function to pass control to the subsequent middleware.

Here's an example of middleware that handles incoming message activities:

```typescript
import { App } from '@teams.sdk/apps';

const app = new App({
  // Initialization options
});

app.use(async (ctx, next) => {
  if (ctx.activity.type === 'message') {
    console.log('Received message:', ctx.activity.text);

    // Reply to the message
    await ctx.reply({
      type: 'message',
      text: `You said: ${ctx.activity.text}`,
    });
  }

  // Proceed to the next middleware or handler
  await next();
});
```

In this example:

- The middleware checks if the activity type is a message.
- It logs the content of the received message.
- It sends a reply back to the user echoing their message.
- It calls `await next()` to continue the middleware pipeline.

### Adapters and Plugins

**The Role of Adapters**

Adapters abstract the specifics of communication channels, allowing your bot to interact with Teams or other channels seamlessly. While the Teams SDK for JavaScript primarily targets Microsoft Teams, adapters can be customized or extended to support additional channels or protocols if needed.

Adapters handle tasks such as:

- Encoding and decoding messages according to the channel's requirements.
- Managing authentication and security protocols.
- Handling retries and error recovery for message delivery.

**Using Plugins to Enhance Functionality**

Plugins extend your bot's capabilities by adding new features or modifying existing behaviors. They can be easily integrated into your application during initialization.

For example, to add HTTP handling capabilities, you can include the `HttpPlugin`:

```typescript
import { App } from '@teams.sdk/apps';
import { HttpPlugin } from '@teams.sdk/apps/plugins/http';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new HttpPlugin()],
});
```

Other plugins, such as those provided by `@teams.sdk/dev`, offer development tools like console interactions and debugging utilities. By leveraging plugins, you can:

- **Integrate External Services**: Connect your bot with external APIs or databases.
- **Add New Handlers**: Support additional activity types or custom events.
- **Enhance Development Workflow**: Utilize tools that simplify testing and debugging.

By understanding and utilizing activities, middleware, adapters, and plugins, you can build robust and flexible bots that provide rich interactions within Microsoft Teams.

---

## Package Structure

### Modular Codebase Organization

The Teams SDK for JavaScript is organized into multiple packages, each targeting specific functionalities within the SDK. This modular design promotes flexibility and scalability, allowing developers to include only the components necessary for their application. By decoupling functionalities into separate packages, the SDK facilitates easier maintenance, upgrades, and customization.

Each package focuses on a specific aspect of Teams development, and they can be combined to build comprehensive applications. This approach ensures that your application remains lean and efficient, without unnecessary dependencies.

### Overview of Main Packages

Below is an overview of the primary packages within the Teams SDK:

- **`@teams.sdk/apps`**
  - **Description**: Serves as the core application framework for initializing and running your bot or Teams application.
  - **Key Features**:
    - Manages middleware, allowing you to process activities and implement custom logic.
    - Handles plugins, enabling you to extend the application's capabilities.
    - Manages event handling, coordinating the flow of activities and responses.

- **`@teams.sdk/api`**
  - **Description**: Provides clients and models for interacting with Teams and Bot Framework APIs.
  - **Key Features**:
    - Offers interfaces for activities, conversations, meetings, and other Teams services.
    - Facilitates API calls with proper authentication and data handling.
    - Simplifies communication with Teams services through abstraction of API endpoints.

- **`@teams.sdk/cards`**
  - **Description**: Contains tools for constructing and customizing Adaptive Cards.
  - **Key Features**:
    - Provides components, actions, inputs, and containers to build rich card experiences.
    - Enables dynamic and interactive content within Teams messages.
    - Supports Adaptive Card schema for consistent rendering across clients.

- **`@teams.sdk/ai`**
  - **Description**: Integrates AI features such as language understanding and response generation.
  - **Key Features**:
    - Includes prompts, models, and templates for building conversational AI capabilities.
    - Supports natural language processing and dialog management.
    - Facilitates the creation of intelligent bots that can understand and respond to user input effectively.

- **`@teams.sdk/openai`**
  - **Description**: Facilitates integration with OpenAI services.
  - **Key Features**:
    - Enables advanced AI capabilities like GPT-based conversational models within Teams.
    - Allows you to generate dynamic content, perform language translations, or implement sophisticated conversational flows.
    - Simplifies the integration of OpenAI APIs into your Teams application.

### Supporting Packages

In addition to the main packages, the SDK includes supporting packages that provide utilities and tools to enhance development:

- **`@teams.sdk/common`**
  - **Description**: Contains shared utilities, interfaces, and base classes used across other packages.
  - **Key Features**:
    - Provides logging mechanisms, storage solutions, and event management functionalities.
    - Offers common types and interfaces to ensure consistency throughout the SDK.
    - Serves as the foundation upon which other packages build their functionalities.

- **`@teams.sdk/dev`**
  - **Description**: Offers development tools and plugins to enhance the development workflow.
  - **Key Features**:
    - Includes console interactions, enabling you to test and debug your bot directly from the command line.
    - Provides debugging utilities to simplify troubleshooting.
    - Enhances the development experience by offering tools tailored for building and testing Teams applications.

- **`@teams.sdk/botbuilder`**
  - **Description**: Integrates with the Microsoft Bot Framework.
  - **Key Features**:
    - Provides adapters and middleware for compatibility with existing Bot Framework bots.
    - Allows you to leverage the extensive features of the Bot Framework within your Teams application.
    - Facilitates migration or integration of bots built with the Bot Framework into the Teams environment.

[Placeholder: Diagram of Package Interactions]

This modular package structure allows you to pick and choose the components necessary for your application, ensuring that you only include the dependencies that are relevant to your project's needs.

---

## Next Steps

With a solid understanding of the core concepts and architecture of the Teams SDK for JavaScript, you're now ready to advance your development journey. Here are the recommended next steps:

- **Explore Packages in Detail**

  Proceed to [3. Packages Reference](#3-packages-reference) for comprehensive documentation of each package. This section provides detailed information on the classes, methods, and interfaces available, enabling you to leverage the full power of the SDK.

- **Hands-On Practice**

  Follow practical guides in [4. Tutorials and Examples](#4-tutorials-and-examples) to build more complex applications. These tutorials offer step-by-step instructions and code samples to help you implement common scenarios and features.

- **Deepen Your Understanding**

  Delve into [5. Advanced Topics](#5-advanced-topics) to learn about extending the framework and handling advanced scenarios. This includes custom middleware, advanced authentication flows, and integration with other Microsoft services.

- **API Specifications**

  Consult the [6. API Reference](#6-api-reference) for detailed information on classes, interfaces, and methods. The API reference serves as a comprehensive guide to the SDK's capabilities and how to use them.

- **Review Introduction**

  If you haven't already, visit [1. Introduction](#1-introduction) for setup instructions and a quick start guide. This section helps you get started with installing the SDK, setting up your development environment, and creating your first bot.

---
