# 5. Advanced Topics

## Introduction

Welcome to the Advanced Topics section of the Teams SDK documentation! In this chapter, we'll explore sophisticated features and techniques that enable you to extend and customize your Teams applications beyond the basics. Whether you're looking to handle custom activities, create custom plugins, implement advanced authentication flows, or establish robust error handling, this section provides the guidance you need.

By mastering these advanced topics, you can:

- **Handle Custom Activities**: Define and process bespoke messages that go beyond predefined activity types.
- **Extend the Framework**: Develop custom plugins to add new features or integrate with external systems.
- **Implement Secure Authentication**: Set up secure OAuth flows and manage tokens safely.
- **Establish Centralized Error Handling**: Implement global error handlers to simplify debugging and enhance reliability.

Let's dive into these topics to unlock the full potential of the Teams SDK.

## 5.1 Custom Activities and Handlers

### Overview

Custom activities enable your application to process bespoke messages that go beyond the predefined activity types. By defining your own activity structures and handlers, you can create rich and specialized interactions within your Teams application.

### Defining Custom Activities

To define a custom activity:

- **Create a Custom Activity Interface**:
  - Extend the base `ActivityBase` interface from the Teams SDK.
  - Specify a unique `type` for your custom activity.
  - Add any custom properties your activity requires.

**Example: Defining a Custom Activity Interface**

```typescript
import { ActivityBase } from '@teams.sdk/api/activities/base';

interface CustomActivity extends ActivityBase {
  readonly type: 'customActivity';
  customProperty: string;
}
```

In this example, `CustomActivity` extends the base `ActivityBase` and introduces a new `type` called `'customActivity'` along with a `customProperty`.

### Implementing Custom Handlers

To handle custom activities:

- **Use Middleware to Intercept Custom Activities**:
  - Implement middleware that checks for your custom activity `type`.
  - Process the activity according to your application's logic.
  - Send responses or perform actions as needed.

**Example: Handling Custom Activities in Middleware**

```typescript
import { App } from '@teams.sdk/apps';
import { HttpPlugin } from '@teams.sdk/apps/plugins/http';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new HttpPlugin()],
});

// Middleware to handle custom activities
app.use(async (ctx, next) => {
  const activity = ctx.activity as CustomActivity;

  if (activity.type === 'customActivity') {
    console.log('Custom activity received:', activity.customProperty);
    await ctx.reply({
      type: 'message',
      text: `Custom activity processed: ${activity.customProperty}`,
    });
  } else {
    // Continue to the next middleware if activity type does not match
    await next();
  }
});

app.start().then(() => {
  console.log('App is running with custom activity handler...');
});
```

In this code:

- **Middleware Checks Activity Type**: The middleware casts the incoming activity to `CustomActivity` and checks if the `type` matches `'customActivity'`.
- **Process the Custom Activity**: If it matches, it processes the activity—here, it logs the `customProperty` and replies with a confirmation message.
- **Call Next Middleware**: If the activity does not match, it calls `await next()` to pass control to the next middleware in the stack.

---

## 5.2 Extending the Framework with Custom Plugins

### Overview

Plugins allow you to extend the functionality of the Teams SDK by adding new features or integrating with external systems. Creating custom plugins enables modular development and enhances the scalability of your application.

### Creating a Custom Plugin

To create a custom plugin:

- **Implement the Plugin Interface**:
  - Create a class that implements the `Plugin` interface from the Teams SDK.
  - Define required properties such as `name` and `version`.
  - Implement the `register` method to initialize your plugin with the application.
  - Implement the `start` method if your plugin needs to perform actions when the application starts.

- **Handle Custom Events**:
  - Extend `EventEmitter` if your plugin needs to emit or handle custom events.
  - Define a custom events interface that extends `PluginEvents`.

**Example: Creating a Custom Plugin**

```typescript
import { App, Plugin, PluginEvents } from '@teams.sdk/apps';
import { EventEmitter } from '@teams.sdk/common/events';

interface CustomPluginEvents extends PluginEvents {
  customEvent: { message: string };
}

class CustomPlugin extends EventEmitter<CustomPluginEvents> implements Plugin {
  readonly name = 'customPlugin';
  readonly version = '1.0.0';

  register(app: App) {
    console.log('Custom plugin registered');
    this.emit('customEvent', { message: 'Custom plugin initialized' });
  }

  async start() {
    console.log('Custom plugin started');
  }
}
```

In this example:

- **Defining Custom Events**:
  - The `CustomPlugin` class extends `EventEmitter` with a custom event interface `CustomPluginEvents`.
  - This allows the plugin to emit and listen to custom events.

- **Implementing the Plugin Methods**:
  - The `register` method is called when the plugin is registered with the application.
    - It logs a message and emits a custom event.
  - The `start` method performs any initialization needed when the application starts.

### Registering and Using Plugins

To use your custom plugin in your application:

- **Register the Plugin with the App**:
  - Include your custom plugin in the `plugins` array when initializing the `App`.

**Example: Registering the Custom Plugin**

```typescript
const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new CustomPlugin()],
});

app.start().then(() => {
  console.log('App is running with custom plugin...');
});
```

In this code:

- **Application Initialization**:
  - The `App` is initialized with your custom plugin included in the `plugins` array.

- **Starting the Application**:
  - The `start` method is called to run the application, and the plugin's `start` method will be invoked.

- **Using Plugin Features**:
  - You can access plugin functionalities through the app instance or by listening to custom events emitted by the plugin.

### Benefits of Using Plugins

- **Modularity**: Separate concerns by encapsulating functionality within plugins.
- **Reusability**: Share plugins across multiple applications or projects.
- **Extensibility**: Easily add new features without modifying the core application code.

---

## 5.3 Authentication and Security

### Overview

Secure authentication is crucial for protecting user data and ensuring that only authorized users can access certain features within your Teams application. Implementing OAuth authentication allows users to securely sign in using external providers, such as Microsoft Accounts or other identity providers. This enhances the security of your application and provides a seamless user experience.

### Implementing OAuth Authentication

To implement OAuth authentication in your Teams application:

- **Set Up OAuth Credentials**:
  - Register your application with the OAuth provider (e.g., Azure Active Directory).
  - Obtain the necessary credentials, such as the client ID and client secret.
  - Configure redirect URLs and permissions (scopes) required by your application.

- **Initiate OAuth Sign-In Flow**:
  - Implement middleware to trigger the sign-in process when required.
  - Use the Teams SDK to generate a sign-in URL that initiates the OAuth flow.

- **Exchange and Validate Tokens**:
  - Handle the token exchange securely upon successful authentication.
  - Validate received tokens before granting access to protected resources.
  - Store tokens securely and manage their lifecycle appropriately.

**Example: Implementing OAuth Authentication**

```typescript
import { App } from '@teams.sdk/apps';
import { HttpPlugin } from '@teams.sdk/apps/plugins/http';
import { BotClient } from '@teams.sdk/api/clients/bot';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new HttpPlugin()],
});

const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

// Middleware to initiate OAuth sign-in
app.use(async (ctx, next) => {
  if (ctx.activity.type === 'message' && ctx.activity.text === 'login') {
    const signInUrl = await botClient.signIn.getSignInUrl({
      state: 'custom-state',
      connectionName: 'your-connection-name',
    });

    await ctx.reply({
      type: 'message',
      text: `Please sign in using the following link: ${signInUrl}`,
    });
  } else {
    await next();
  }
});

// Middleware to handle OAuth token exchange
app.use(async (ctx, next) => {
  if (ctx.activity.type === 'invoke' && ctx.activity.name === 'signin/tokenExchange') {
    const tokenExchangeActivity = ctx.activity;
    console.log('Token exchange activity received:', tokenExchangeActivity);

    // Validate and store the token as needed
    // ...

    await ctx.reply({
      type: 'message',
      text: 'Token exchange successful!',
    });
  } else {
    await next();
  }
});

app.start().then(() => {
  console.log('App is running with OAuth authentication...');
});
```

In this example:

- **Initiate OAuth Sign-In Flow**:
  - When the user sends a message with the text `'login'`, the middleware invokes `botClient.signIn.getSignInUrl` to generate a sign-in URL.
  - The application replies with a message containing the sign-in link.

- **Handle Token Exchange**:
  - When the OAuth flow is complete, Teams sends an `invoke` activity with the name `'signin/tokenExchange'`.
  - The middleware checks for this activity and processes the token exchange accordingly.
  - Upon successful token exchange, the application confirms with a reply.

### Secure Token Management

To ensure the security of tokens:

- **Store Tokens Securely**:
  - Avoid exposing tokens in logs or error messages.
  - Use secure storage mechanisms, such as encrypted databases or secure storage services.

- **Refresh Tokens Appropriately**:
  - Implement logic to handle token expiration and renewal.
  - Use refresh tokens if provided by the OAuth provider to obtain new access tokens without requiring the user to re-authenticate.

- **Validate Tokens**:
  - Always validate tokens to ensure they are valid and have not been tampered with.
  - Check token signatures, expiration, and scopes.

### Best Practices

- **Use HTTPS**:
  - Ensure all connections use HTTPS to prevent token interception.
  
- **Least Privilege Principle**:
  - Request only the minimum permissions (scopes) necessary for your application to function.

- **Monitor and Log Access**:
  - Implement monitoring to detect unauthorized access attempts.
  - Log authentication events securely for audit purposes.

---

## 5.4 Centralized Error Handling

### Overview

Centralized error handling simplifies debugging and enhances the reliability of your application by ensuring that all errors are caught and managed in a consistent manner. By implementing a global error handler, you can maintain consistent error responses, log errors effectively, and prevent unhandled exceptions from crashing your application.

### Implementing Global Error Handlers

To implement centralized error handling:

- **Use Middleware for Error Capturing**:
  - Wrap your middleware functions in `try-catch` blocks.
  - Catch any errors that occur during the execution of middleware or request handling.
  - Forward errors to a centralized error handler or handle them directly within the middleware.

- **Log Errors Effectively**:
  - Use the logging module provided by the Teams SDK or a third-party logging library.
  - Record errors with relevant context information to aid in debugging.
  - Ensure sensitive information is not logged.

**Example: Centralized Error Handling**

```typescript
import { App } from '@teams.sdk/apps';
import { HttpPlugin } from '@teams.sdk/apps/plugins/http';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new HttpPlugin()],
});

// Middleware for centralized error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // Log the error with context
    ctx.log.error('An error occurred:', {
      error: error.message,
      activityId: ctx.activity.id,
      userId: ctx.activity.from.id,
    });

    // Send a user-friendly error message
    await ctx.reply({
      type: 'message',
      text: 'An unexpected error occurred. Please try again later.',
    });
  }
});

// Example middleware to simulate an error
app.use(async (ctx, next) => {
  if (ctx.activity.type === 'message' && ctx.activity.text === 'error') {
    throw new Error('Simulated error');
  } else {
    await ctx.reply({
      type: 'message',
      text: `You said: ${ctx.activity.text}`,
    });
  }

  await next();
});

app.start().then(() => {
  console.log('App is running with centralized error handling...');
});
```

In this example:

- **Error Capturing Middleware**:
  - The first middleware function wraps `await next()` in a `try-catch` block.
  - If any middleware downstream throws an error, it is caught here.
  - The error is logged using the app's logger (`ctx.log.error`).
  - A user-friendly message is sent back to the user.

- **Simulated Error Middleware**:
  - If the user sends a message with the text `'error'`, an error is thrown to simulate an unexpected issue.
  - Otherwise, the bot echoes back the user's message.

### Best Practices

To enhance your error handling strategy:

- **Provide User Feedback**:
  - Send user-friendly messages when errors occur.
  - Avoid exposing technical details or stack traces to end-users.
  - Inform users that the issue is being addressed and suggest next steps if applicable.

- **Monitor and Alert**:
  - Set up monitoring to detect and alert on unexpected errors.
  - Use logging tools and dashboards to track error rates and identify patterns.

- **Avoid Logging Sensitive Information**:
  - When logging errors, ensure that sensitive data (e.g., personal user information, tokens) is not recorded.
  - Sanitize logs to prevent accidental exposure of confidential information.

- **Fail Gracefully**:
  - Design your application to handle failures without crashing.
  - Implement fallback mechanisms or default responses in case of errors.

- **Test Error Handling**:
  - Regularly test your error handling logic to ensure it works as expected.
  - Simulate different error scenarios and verify that your application responds appropriately.

---

## Next Steps

Congratulations on mastering these advanced topics! By implementing custom activities, creating plugins, handling authentication securely, and establishing centralized error handling, you're well-equipped to build robust and scalable Teams applications.

- **Proceed to 6. API Reference**

  Dive into detailed information about all classes, interfaces, and methods in the [6. API Reference](#6-api-reference).

- **Review 3. Packages Reference**

  Revisit the [3. Packages Reference](#3-packages-reference) for an in-depth look at each package in the SDK.

- **Check 7. Appendices**

  Find additional resources, migration guides, and contribution guidelines in the [7. Appendices](#7-appendices).

- **Refer to 8. FAQs and Troubleshooting**

  Look up solutions to common issues and frequently asked questions in [8. FAQs and Troubleshooting](#8-faqs-and-troubleshooting).

---
