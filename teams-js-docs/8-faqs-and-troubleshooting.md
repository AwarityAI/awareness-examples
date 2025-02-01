# 8. FAQs and Troubleshooting

## Introduction

Welcome to the FAQs and Troubleshooting section! This chapter aims to address common questions, issues, and pitfalls that developers may encounter when working with the Teams SDK. You'll find solutions to frequent problems, debugging techniques, and best practices to ensure a smooth development experience.

---

## 8.1 Frequently Asked Questions

### Q: How do I set up the required environment variables?

- **A:** Ensure that all necessary environment variables such as `CLIENT_ID`, `CLIENT_SECRET`, and `TENANT_ID` are correctly set before running your application.

### Q: Why is my bot not responding to messages?

- **A:** There could be multiple reasons. Verify that your bot is correctly authenticated, the middleware is properly invoked, and the application is started.

### Q: I'm getting authentication errors. How can I resolve invalid bot token issues?

- **A:** Invalid or expired bot tokens can prevent your bot from functioning correctly. Verify your client credentials and ensure they are correct.

### Q: How do I ensure my middleware is being executed?

- **A:** If middleware is not executed, your bot may not process activities. Ensure the middleware is registered before starting the app.

### Q: My bot is not processing any activities. What could be wrong?

- **A:** Your bot will not process activities if the app is not started. Ensure the `app.start()` method is called after configuration.

### Q: Why are my Adaptive Cards not rendering correctly?

- **A:** Adaptive Cards missing required properties may fail to render. Add required properties like `$schema` and ensure the schema version is correctly specified.

### Q: I'm experiencing authentication failures during sign-in. How can I fix sign-in URL issues?

- **A:** Incorrect generation of sign-in URLs leads to authentication failures. Verify the connection name and user ID are correct when generating the sign-in URL.

---

## 8.2 Common Issues

In this section, we'll explore some common issues that developers may encounter while working with the Teams SDK and provide solutions to resolve them.

### 8.2.1 Missing Required Environment Variables

**Issue:**

When environment variables such as `CLIENT_ID`, `CLIENT_SECRET`, and `TENANT_ID` are not set, you may encounter authentication errors that prevent your application from functioning correctly.

**Solution:**

- Ensure that all necessary environment variables are correctly set before running your application.

**Code Sample:**

```typescript
// Problem: Environment variables are not set, causing authentication errors.
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.TENANT_ID) {
  throw new Error('Missing required environment variables: CLIENT_ID, CLIENT_SECRET, TENANT_ID');
}

// Fix: Set the environment variables before running the application.
process.env.CLIENT_ID = 'your-client-id';
process.env.CLIENT_SECRET = 'your-client-secret';
process.env.TENANT_ID = 'your-tenant-id';

// Now you can initialize your app with the correct configuration.
import { App } from '@teams-sdk/apps';

const app = new App({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  tenantId: process.env.TENANT_ID,
});

app.start().then(() => {
  console.log('App started successfully with required environment variables.');
});
```

### 8.2.2 Invalid Bot Token

**Issue:**

Invalid or expired bot tokens can prevent your bot from functioning correctly. This often occurs when client credentials are incorrect or tokens have expired.

**Solution:**

- Verify your client credentials and ensure they are correct.
- Refresh tokens regularly to prevent expiration issues.

**Code Sample:**

```typescript
// Problem: Bot token is invalid or expired.
import { BotClient } from '@teams.sdk/api/clients/bot';

const botClient = new BotClient({
  clientId: 'incorrect-client-id',
  clientSecret: 'incorrect-client-secret',
  tenantId: 'incorrect-tenant-id',
});

botClient.token.get().catch((error) => {
  console.error('Failed to fetch bot token:', error.message);
});

// Fix: Verify client credentials and ensure they are correct.
const validBotClient = new BotClient({
  clientId: 'your-correct-client-id',
  clientSecret: 'your-correct-client-secret',
  tenantId: 'your-correct-tenant-id',
});

validBotClient.token.get().then((token) => {
  console.log('Bot token fetched successfully:', token.access_token);
}).catch((error) => {
  console.error('Error fetching bot token with correct credentials:', error.message);
});
```

### 8.2.3 Middleware Not Invoked

**Issue:**

If middleware is not executed, your bot may not process activities. This can happen if the middleware is not registered properly before the application starts.

**Solution:**

- Ensure the middleware is registered before starting the app.

**Code Sample:**

```typescript
// Problem: Middleware is not being executed.
import { App } from '@teams.sdk/apps';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

// Middleware is registered after app starts, which is incorrect.
app.start().then(() => {
  console.log('App started, but middleware might not work as expected.');
});

app.use(async (ctx, next) => {
  console.log('Middleware invoked');
  await next();
});

// Fix: Register middleware before starting the app.
const correctApp = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

correctApp.use(async (ctx, next) => {
  console.log('Middleware invoked');
  await next();
});

correctApp.start().then(() => {
  console.log('App started successfully with middleware.');
});
```

---

## 8.3 Debugging Techniques

Debugging is a crucial part of the development process. In this section, we'll discuss various techniques to help you identify and resolve issues in your application.

### 8.3.1 Logging Activities

**Use a logger to debug incoming activities.**

Implementing logging in your application allows you to monitor incoming activities, outgoing messages, and application flow, which helps in diagnosing issues.

**Code Sample:**

```typescript
import { App } from '@teams.sdk/apps';
import { ConsoleLogger } from '@teams.sdk/common/logging';

const logger = new ConsoleLogger('ActivityLogger');

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

app.use(async (ctx, next) => {
  logger.info('Received activity:', ctx.activity);
  await next();
});

app.start().then(() => {
  logger.info('App is running...');
});
```

In this example, we create a `ConsoleLogger` instance to log incoming activities. By placing the logging middleware early in the middleware stack, you ensure all activities are logged.

### 8.3.2 Inspecting API Responses

**Log API responses for debugging purposes.**

When your application makes API calls, logging the responses can help you understand if the data returned is as expected or if errors are occurring.

**Code Sample:**

```typescript
import { BotClient } from '@teams.sdk/api/clients/bot';

const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

botClient.token.get().then((token) => {
  console.log('API Response:', token);
}).catch((error) => {
  console.error('API Error:', error.response?.data || error.message);
});
```

In this code, we log the successful API response or catch and log any errors that occur during the API call.

### 8.3.3 Using the Console Plugin for Testing

**Simulate user interactions using the Console Plugin.**

The Console Plugin allows you to test your bot in a console environment, which is useful for development and debugging without deploying to Teams.

**Code Sample:**

```typescript
import { App } from '@teams.sdk/apps';
import { ConsolePlugin } from '@teams.sdk/dev';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new ConsolePlugin()],
});

app.use(async (ctx, next) => {
  if (ctx.activity.type === 'message') {
    console.log('User message:', ctx.activity.text);
    await ctx.reply({
      type: 'message',
      text: `You said: ${ctx.activity.text}`,
    });
  }
  await next();
});

app.start().then(() => {
  console.log('App is running in console mode. Type messages to interact.');
});
```

This example demonstrates how to use the `ConsolePlugin` to simulate message exchanges with your bot in the console.

### 8.3.4 Centralized Error Handling

**Implement centralized error handling to catch and log errors.**

Centralized error handling ensures that exceptions are caught and handled appropriately, preventing your application from crashing unexpectedly.

**Code Sample:**

```typescript
import { App } from '@teams.sdk/apps';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error('Error occurred:', error.message);
    await ctx.reply({
      type: 'message',
      text: 'An error occurred. Please try again later.',
    });
  }
});

app.use(async (ctx, next) => {
  // Your bot's logic here.
  await next();
});

app.start().then(() => {
  console.log('App is running with centralized error handling.');
});
```

Here, the first middleware catches any errors that occur in subsequent middleware or handlers, logs the error, and sends a friendly message back to the user.

---

## 8.4 Common Pitfalls

Understanding common pitfalls can help you avoid them in your development process. Below are some frequent mistakes and how to resolve them.

### 8.4.1 Forgetting to Start the App

**Issue:**

Your bot will not process activities if the app is not started. This commonly happens when developers forget to call the `start()` method after configuring the app.

**Solution:**

- Ensure the `app.start()` method is called after configuration.

**Code Sample:**

```typescript
// Problem: The app is not started, so it does not process activities.
import { App } from '@teams.sdk/apps';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

// Your bot's middleware and handlers
app.use(async (ctx, next) => {
  // Bot logic here
  await next();
});

// Missing app.start(), so the app won't process any activities.

// Fix: Ensure the app is started after configuration.
app.start().then(() => {
  console.log('App is running...');
});
```

By calling `app.start()`, you initialize the application and allow it to begin processing incoming activities.

### 8.4.2 Incorrect Adaptive Card Schema

**Issue:**

Invalid Adaptive Card schemas can cause rendering issues. Common mistakes include missing required properties like `$schema` or `version`, or using incorrect property values.

**Solution:**

- Ensure all required properties are included in your Adaptive Card, such as `$schema` and `version`.
- Validate your card schema using the [Adaptive Cards Designer](https://adaptivecards.io/designer/) or similar tools.

**Code Sample:**

```typescript
// Problem: Adaptive Card schema is invalid due to missing properties.
import { Card } from '@teams.sdk/cards';

const invalidCard = {
  type: 'AdaptiveCard',
  body: [
    {
      type: 'TextBlock',
      text: 'Hello, World!',
      size: 'large',
    },
  ],
  // Missing $schema and version properties.
};

// Fix: Add required properties like $schema and version.
const validCard = Card(
  [
    {
      type: 'TextBlock',
      text: 'Hello, World!',
      size: 'large',
    },
  ],
  {
    version: '1.3',
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
  }
);

console.log('Valid Adaptive Card:', JSON.stringify(validCard, null, 2));
```

By ensuring the required properties are included, your Adaptive Card will render correctly.

---

## 8.5 Handling API Errors

Properly handling API errors can improve the reliability and user experience of your application.

### 8.5.1 Retrying Failed Requests

**Implement retries for transient failures in API requests.**

Transient errors, such as network timeouts or temporary service unavailability, can often be resolved by retrying the request.

**Code Sample:**

```typescript
import { BotClient } from '@teams.sdk/api/clients/bot';

const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

async function fetchBotTokenWithRetry(retries: number = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const token = await botClient.token.get();
      console.log('Bot token fetched successfully:', token.access_token);
      return token;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      if (attempt === retries) {
        throw new Error('All retry attempts failed.');
      }
      // Optionally implement a delay before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
}

fetchBotTokenWithRetry().catch((error) => {
  console.error('Failed to fetch bot token after retries:', error.message);
});
```

This function attempts to fetch the bot token up to a specified number of retries, handling transient errors gracefully.

### 8.5.2 Handling HTTP Errors

**Log detailed HTTP error information for better diagnostics.**

When API calls fail, logging the detailed error response can help identify the cause of the failure.

**Code Sample:**

```typescript
import { BotClient } from '@teams.sdk/api/clients/bot';

const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

botClient.token.get().then((token) => {
  console.log('Bot token:', token.access_token);
}).catch((error) => {
  const httpError = error.response?.data?.error;
  if (httpError) {
    console.error('HTTP Error Code:', httpError.code);
    console.error('HTTP Error Message:', httpError.message);
    console.error('HTTP Error Details:', httpError.innerHttpError);
  } else {
    console.error('An unexpected error occurred:', error.message);
  }
});
```

By inspecting and logging the error response, you can gain insight into authentication issues, invalid parameters, or service errors.

---

## 8.6 Resolving Authentication Issues

Authentication issues can disrupt your application's functionality. This section provides solutions to common authentication problems.

### 8.6.1 Invalid Sign-In URL

**Issue:**

Incorrect generation of sign-in URLs leads to authentication failures during the OAuth flow.

**Solution:**

- Verify the connection name and user ID are correct when generating the sign-in URL.
- Ensure the OAuth connection is properly configured in your bot framework settings.

**Code Sample:**

```typescript
import { BotClient } from '@teams.sdk/api/clients/bot';

const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

// Problem: Incorrect connection name or user ID.
botClient.signIn.getSignInUrl({
  state: 'some-state',
  userId: 'incorrect-user-id',
  connectionName: 'incorrect-connection-name',
}).then((response) => {
  console.log('Sign-in URL:', response.signInLink);
}).catch((error) => {
  console.error('Failed to generate sign-in URL:', error.message);
});

// Fix: Verify the connection name and user ID are correct.
botClient.signIn.getSignInUrl({
  state: 'some-state',
  userId: 'correct-user-id',
  connectionName: 'correct-connection-name',
}).then((response) => {
  console.log('Valid Sign-in URL:', response.signInLink);
}).catch((error) => {
  console.error('Error generating sign-in URL:', error.message);
});
```

### 8.6.2 Token Exchange Failure

**Issue:**

Token exchange fails during the OAuth flow due to invalid parameters, such as an incorrect token or URI.

**Solution:**

- Ensure the token and URI provided are valid and match the expected format.
- Verify that the user is authenticated and the token exchange requirements are met.

**Code Sample:**

```typescript
import { BotClient } from '@teams.sdk/api/clients/bot';

const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
});

// Problem: Invalid token or URI during token exchange.
botClient.token.exchangeUserToken({
  userId: 'user-id',
  connectionName: 'connection-name',
  channelId: 'msteams',
  exchangeRequest: {
    uri: 'invalid-uri',
    token: 'invalid-token',
  },
}).then((response) => {
  console.log('Token exchanged successfully:', response.token);
}).catch((error) => {
  console.error('Token exchange failed:', error.message);
});

// Fix: Ensure the token and URI are valid.
botClient.token.exchangeUserToken({
  userId: 'user-id',
  connectionName: 'connection-name',
  channelId: 'msteams',
  exchangeRequest: {
    uri: 'valid-uri',
    token: 'valid-token',
  },
}).then((response) => {
  console.log('Token exchanged successfully:', response.token);
}).catch((error) => {
  console.error('Error during token exchange:', error.message);
});
```

---

## 8.7 Verifying Configuration

Proper configuration is essential for your application to function correctly. Here are steps to ensure your setup is correct.

### 8.7.1 Checking Environment Variables

**Verify all required environment variables are set.**

Missing environment variables can lead to unexpected behavior or errors.

**Code Sample:**

```typescript
// Verify that required environment variables are set.
const requiredEnvVars = ['CLIENT_ID', 'CLIENT_SECRET', 'TENANT_ID'];
let allEnvVarsSet = true;

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing environment variable: ${envVar}`);
    allEnvVarsSet = false;
  }
});

if (!allEnvVarsSet) {
  throw new Error('One or more required environment variables are missing.');
}

// Proceed with application initialization.
import { App } from '@teams.sdk/apps';

const app = new App({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  tenantId: process.env.TENANT_ID!,
});

app.start().then(() => {
  console.log('App started successfully with all environment variables set.');
});
```

### 8.7.2 Validating Plugin Configuration

**Ensure plugins are configured correctly in your application.**

Incorrect plugin configuration can prevent plugins from loading or functioning properly.

**Code Sample:**

```typescript
import { App } from '@teams.sdk/apps';
import { HttpPlugin } from '@teams.sdk/apps/plugins/http';

// Problem: Plugins are not configured correctly.
const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  // Plugins are misconfigured or missing necessary options.
  plugins: [new HttpPlugin()],
});

// Fix: Verify plugin initialization and dependencies.
const validApp = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [
    new HttpPlugin({
      port: 3000, // Ensure required options are provided.
    }),
  ],
});

validApp.start().then(() => {
  console.log('App started successfully with plugins.');
}).catch((error) => {
  console.error('Failed to start app:', error.message);
});
```

---

## 8.8 Handling Adaptive Card Errors

Adaptive Cards are a powerful way to display rich content in Teams. Properly handling errors related to Adaptive Cards ensures a smooth user experience.

### 8.8.1 Missing Required Properties

**Issue:**

Adaptive Cards missing required properties like `$schema` and `version` may fail to render.

**Solution:**

- Add required properties such as `$schema` and `version` to your Adaptive Card JSON.
- Use the appropriate schema URL and version number.

**Code Sample:**

```typescript
import { Card } from '@teams.sdk/cards';

// Problem: Adaptive Card is missing required properties.
const invalidCard = {
  type: 'AdaptiveCard',
  body: [
    {
      type: 'TextBlock',
      text: 'Welcome to Contoso Bot!',
    },
  ],
  // Missing $schema and version.
};

// Attempting to send the invalid card.
try {
  // Send the card logic
} catch (error) {
  console.error('Failed to send Adaptive Card:', error.message);
}

// Fix: Add required properties.
const validCard = Card(
  [
    {
      type: 'TextBlock',
      text: 'Welcome to Contoso Bot!',
    },
  ],
  {
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.3',
  }
);

// Now you can send the valid card.
```

### 8.8.2 Invalid Action Type

**Issue:**

Using invalid action types in Adaptive Cards can cause errors or unexpected behavior.

**Solution:**

- Use valid action types supported by Adaptive Cards, such as `Action.OpenUrl`, `Action.Submit`, and `Action.ShowCard`.

**Code Sample:**

```typescript
import { Card, SubmitAction } from '@teams.sdk/cards';

// Problem: Invalid action type is used in the card.
const invalidAction = {
  type: 'Action.InvalidType', // Invalid action type.
  title: 'Click Me',
  data: { action: 'invalidAction' },
};

const invalidCard = Card(
  [
    {
      type: 'TextBlock',
      text: 'Click the button below.',
    },
  ],
  {
    actions: [invalidAction],
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.3',
  }
);

// Fix: Use a valid action type.
const validAction = SubmitAction({
  title: 'Click Me',
  data: { action: 'submitForm' },
});

const validCard = Card(
  [
    {
      type: 'TextBlock',
      text: 'Click the button below.',
    },
  ],
  {
    actions: [validAction],
    $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.3',
  }
);

// Now you can send the valid card with the correct action type.
```

---

## Next Steps

- **Proceed to [9. Community and Support](#9-community-and-support)**

   Engage with the community, ask questions, and find additional support.

- **Return to [1. Introduction](#1-introduction)**

   Review the fundamentals covered in the Introduction.

- **Explore [4. Tutorials and Examples](#4-tutorials-and-examples)**

   Practice building applications with step-by-step guides.

- **Consult the [6. API Reference](#6-api-reference)**

   Dive deeper into the API documentation for detailed information.

---
