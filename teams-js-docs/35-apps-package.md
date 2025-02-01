# 3.5 Apps Package

## Overview

The Apps Package provides a comprehensive framework for building applications that interact with Microsoft Teams. It simplifies the development process by offering tools and abstractions for handling messages, activities, events, and more within the Teams environment. By leveraging the Apps Package, developers can quickly create bots, messaging extensions, and other Teams applications with minimal setup.

### Purpose

The primary purpose of the Apps Package is to streamline the creation of Teams applications by handling the complexities of the Teams API and providing a consistent and intuitive interface for developers. It abstracts away the underlying protocols and data exchange mechanisms, allowing developers to focus on implementing business logic and user interactions.

### Key Features and Capabilities

- **Application Framework**: Offers a robust framework for building Teams applications, including bots and messaging extensions.

- **Activity Processing**: Simplifies handling different types of activities, such as messages, events, and commands, by providing a unified processing pipeline.

- **Middleware Support**: Enables the use of middleware functions to intercept and modify activities, facilitating features like authentication, logging, and message transformation.

- **Plugin Architecture**: Supports extensibility through plugins, allowing developers to add functionality like HTTP and console interactions.

- **Event Handling**: Provides mechanisms to subscribe to and handle various events, such as application start, errors, and user sign-ins.

- **Utilities and Helpers**: Includes utility functions and common patterns to assist with tasks like sending messages, replying to activities, and managing conversations.

[Placeholder for diagrams illustrating the architecture of the Apps Package]

---

## Application Framework

The Apps Package provides a robust framework for building Microsoft Teams applications. It abstracts the complexities involved in handling incoming and outgoing activities, allowing developers to focus on implementing business logic rather than dealing with low-level protocol details.

By utilizing this framework, developers can create bots, messaging extensions, and other types of Teams applications efficiently. The framework handles activity routing, middleware processing, and supports plugins to extend functionality.

### Building Apps with the Framework

The core of the Apps Package is the `App` class, which orchestrates the reception and sending of activities. Developers can create an instance of `App` and configure it with necessary credentials, middleware, and plugins.

Here's an example of how to initialize an application using the Apps Package:

```typescript
import { App } from '@teams.sdk/apps';
import { HttpPlugin } from '@teams.sdk/apps/plugins/http';

// Initialize the App
const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new HttpPlugin()],
});

// Start the App
app.start().then(() => {
  console.log('App is running...');
});
```

In this example:

- **Credentials**: `clientId`, `clientSecret`, and `tenantId` are used for authentication with the Teams API.
- **Plugins**: The `HttpPlugin` is added to handle HTTP interactions.

The `App` class handles incoming activities and provides methods for sending responses. Developers can define custom activity handlers and middleware to process these activities according to their application's needs.

[Placeholder for diagrams illustrating the flow of activities through the application framework]

---

## Initialization and Configuration

Setting up an application instance using the Apps Package involves providing necessary configurations such as credentials and plugins. The `App` class requires authentication details to interact with the Teams API securely.

### Setting Up an Application Instance

To initialize an application, create a new instance of the `App` class and pass in the required options:

```typescript
import { App } from '@teams.sdk/apps';
import { HttpPlugin } from '@teams.sdk/apps/plugins/http';

// Initialize the App
const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new HttpPlugin()],
});

// Start the App
app.start().then(() => {
  console.log('App is running...');
});
```

In the code above, you:

- **Import Necessary Modules**: Import `App` from the Apps Package and any plugins you wish to use.
- **Provide Credentials**: Pass in the `clientId`, `clientSecret`, and `tenantId` obtained from your Azure Active Directory application registration.
- **Configure Plugins**: Add plugins like `HttpPlugin` to extend the application's capabilities.
- **Start the Application**: Call `app.start()` to begin listening for incoming activities.

### Configuration Options

The `AppOptions` interface allows you to customize various aspects of your application:

- **http**: Configure HTTP client options for making API requests.
- **logger**: Provide a custom logger instance for logging activities and errors.
- **storage**: Use a custom storage mechanism for persisting data.
- **plugins**: Add plugins to enhance functionality.

Example of using additional configuration options:

```typescript
import { App } from '@teams.sdk/apps';
import { HttpPlugin } from '@teams.sdk/apps/plugins/http';
import { ConsoleLogger } from '@teams.sdk/common/logging';
import { LocalStorage } from '@teams.sdk/common/storage';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  logger: new ConsoleLogger('my-app'),
  storage: new LocalStorage(),
  plugins: [new HttpPlugin()],
});

app.start().then(() => {
  console.log('App is running...');
});
```

### Environment Variables

Credentials and other sensitive information can be stored as environment variables to enhance security:

```typescript
const app = new App({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  tenantId: process.env.TENANT_ID,
  plugins: [new HttpPlugin()],
});
```

[Placeholder for diagrams showing configuration flow]

---

## Activity Processing

Activities are the core communication mechanism in Microsoft Teams. They include messages, events, and commands. The Apps Package simplifies activity processing by providing a unified pipeline to handle different activity types.

### Handling Different Types of Activities

The `App` class allows you to handle various activity types by checking the `activity.type` property and implementing the corresponding logic.

Example of handling message activities:

```typescript
app.use(async (ctx, next) => {
  if (ctx.activity.type === 'message') {
    console.log('Received message:', ctx.activity.text);
    await ctx.reply({
      type: 'message',
      text: `You said: ${ctx.activity.text}`,
    });
  }
  await next();
});
```

### Implementing Custom Activity Handlers

You can create custom handlers for specific activity types or actions by using middleware functions:

```typescript
app.use(async (ctx, next) => {
  if (ctx.activity.type === 'conversationUpdate') {
    console.log('Conversation updated:', ctx.activity);
    // Implement your logic here
  }
  await next();
});
```

[Placeholder for code sample: Implementing Activity Processing]

---

## Middleware and Routing

Middleware functions in the Apps Package allow you to intercept and process activities as they pass through the application pipeline. They enable you to implement features like authentication, logging, validation, and message transformation.

### Using Middleware for Processing Activities

Middleware functions are added to the application using the `app.use()` method. Each middleware receives a `MiddlewareContext` object and a `next` function to call the next middleware in the pipeline.

Example of adding middleware:

```typescript
app.use(async (ctx, next) => {
  console.log('Activity received:', ctx.activity.type);
  await next();
});
```

In this example, the middleware logs every activity's type before passing control to the next middleware function.

### Defining Routes and Handling Events

You can define handlers for specific activity types or events by checking properties in the context. This allows you to organize your application's logic based on the activity's characteristics.

Example of handling message updates:

```typescript
app.use(async (ctx, next) => {
  if (ctx.activity.type === 'messageUpdate') {
    console.log('Message updated:', ctx.activity);
    // Handle the message update
  }
  await next();
});
```

[Placeholder for code sample: Using Middleware]

---

## Plugins

Plugins extend the functionality of your application by adding features such as handling HTTP requests or interacting via the console. The Apps Package supports a plugin architecture that allows you to integrate these extensions seamlessly.

### HTTP Plugin

The `HttpPlugin` enables your application to receive and send activities over HTTP, which is essential for interacting with the Teams platform.

#### Receiving and Sending Activities over HTTP

To use the `HttpPlugin`, import it and include it in your application's plugins:

```typescript
import { App } from '@teams.sdk/apps';
import { HttpPlugin } from '@teams.sdk/apps/plugins/http';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new HttpPlugin()],
});

// Start the App with the HTTP plugin
app.start(3000).then(() => {
  console.log('App is running on port 3000...');
});
```

The `start()` method accepts a port number, and the application will listen for incoming HTTP requests on that port.

[Placeholder for code sample: HTTP Plugin]

### Console Plugin

The `ConsolePlugin` allows you to interact with your application through the console, which is useful for testing and development.

#### Interacting with the Application via the Console

To use the `ConsolePlugin`, import it and include it in your application's plugins:

```typescript
import { App } from '@teams.sdk/apps';
import { ConsolePlugin } from '@teams.sdk/dev/console/plugin';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new ConsolePlugin()],
});

// Start the App with the Console plugin
app.start().then(() => {
  console.log('App is running in console mode...');
});
```

With the `ConsolePlugin`, you can send messages and receive responses directly in your terminal.

[Placeholder for code sample: Console Plugin]

---

## Events and Handlers

The Apps Package provides an event system that allows you to subscribe to and handle various events during the application's lifecycle, such as `start`, `error`, and `signin`.

### Subscribing to Events

You can use the `app.on()` method to listen for events:

```typescript
app.on('start', (log) => {
  log.info('Application has started.');
});

app.on('error', ({ err, log }) => {
  log.error('An error occurred:', err);
});

app.on('signin', ({ activity, log }) => {
  log.info(`${activity.from.name} has signed in.`);
});
```

---

## Utilities

The Apps Package includes utility functions and patterns to assist with common tasks.

### Helper Functions

- **send**: Send an activity to the conversation.
- **reply**: Reply to the inbound activity.
- **signin**: Trigger a user sign-in flow.
- **withMention**: Add a mention to an activity.
- **withAIContentLabel**: Add an "AI-generated content" label to an activity.

Example of using utilities:

```typescript
app.use(async (ctx, next) => {
  if (ctx.activity.type === 'message') {
    // Reply with a mention
    const reply = ctx.withMention(
      {
        type: 'message',
        text: `Hello ${ctx.activity.from.name}!`,
      },
      ctx.activity.from
    );

    await ctx.reply(reply);
  }
  await next();
});
```

---

## Next Steps

- **Explore Other Packages**
  - Proceed to [3.6 Common Package](#36-common-package) to learn about shared utilities.

- **Hands-On Practice**
  - Proceed to [4. Tutorials and Examples](#4-tutorials-and-examples) for practical implementations.

- **Deepen Your Understanding**
  - Delve into advanced concepts in [5. Advanced Topics](#5-advanced-topics).

---