# 4. Tutorials and Examples

## Introduction

Welcome to the Tutorials and Examples section! Here, you'll find hands-on guides to help you develop applications using the Teams SDK for JavaScript. These tutorials are designed to provide practical experience with the codebase, covering essential features and capabilities through step-by-step instructions.

---

## Tutorial 1: Building a Teams Application

### Objective

Learn how to develop a basic Teams application with messaging and AI features using the Teams SDK.

### Overview

- Setting up your development environment
- Initializing the application
- Incorporating AI capabilities
- Handling user messages

### Steps

#### 1. Initialize the Application

Create a new instance of the `App` class with the necessary credentials. Incorporate the `HttpPlugin` for HTTP communication.

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

#### 2. Set Up the OpenAI Chat Model

Initialize the `OpenAIChatModel` with your OpenAI API key. Specify the model (e.g., `gpt-4`) and any configuration options.

```typescript
import { OpenAIChatModel } from '@teams.sdk/openai/chat';

const chatModel = new OpenAIChatModel({
  model: 'gpt-4',
  apiKey: 'your-openai-api-key',
});
```

#### 3. Create a ChatPrompt Instance

Set up a `ChatPrompt` with instructions for the AI assistant. Define the behavior and response style of the AI.

```typescript
import { ChatPrompt } from '@teams.sdk/ai/prompts/chat';

const chatPrompt = new ChatPrompt({
  model: chatModel,
  instructions: 'You are a helpful assistant.',
});
```

#### 4. Handle Incoming Messages

Use middleware to process user messages. Generate AI responses using the `ChatPrompt` instance. Send AI-generated replies back to the user.

```typescript
app.use(async (ctx, next) => {
  if (ctx.activity.type === 'message') {
    const userMessage = ctx.activity.text;
    const aiResponse = await chatPrompt.chat(userMessage);

    await ctx.reply({
      type: 'message',
      text: aiResponse,
    });
  }
  await next();
});
```

#### 5. Start the Application

Run the app locally and test the messaging functionality within Teams.

```typescript
app.start().then(() => {
  console.log('Teams application with AI features is running...');
});
```

### Expected Outcome

By the end of this tutorial, you will have a functioning Teams application that responds to user messages with AI-generated replies.

---

## Tutorial 2: Creating Custom Adaptive Cards

### Objective

Learn how to design and implement custom Adaptive Cards to enhance user interaction within your Teams application.

### Overview

- Understanding Adaptive Card components
- Designing card elements
- Rendering the card in your application

### Steps

#### 1. Design Card Elements

Create text blocks for titles and messages. Include images and media elements. Add action sets with interactive buttons.

```typescript
import { Card, TextBlock, Image, ActionSet, SubmitAction } from '@teams.sdk/cards';

// Create a TextBlock element
const textBlock = TextBlock('Welcome to Custom Adaptive Cards!', {
  size: 'large',
  weight: 'bolder',
  color: 'accent',
  wrap: true,
});

// Create an Image element
const image = {
  type: 'Image',
  url: 'https://example.com/image.png',
  altText: 'Sample Image',
  size: 'medium',
};

// Create an ActionSet with a SubmitAction
const actionSet = ActionSet([
  SubmitAction({
    title: 'Submit',
    data: { action: 'submitForm' },
  }),
]);
```

#### 2. Construct the Adaptive Card

Assemble the elements into a cohesive card structure. Define the card schema and version.

```typescript
// Create the Adaptive Card
const adaptiveCard = Card([textBlock, image, actionSet], {
  version: '1.6',
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
});

console.log(JSON.stringify(adaptiveCard, null, 2));
```

#### 3. Render the Card

Integrate the card into your Teams application. Send the card as part of a message or task module.

```typescript
// In your message handling middleware
app.use(async (ctx, next) => {
  if (ctx.activity.type === 'message') {
    await ctx.reply({
      type: 'message',
      attachments: [
        {
          contentType: 'application/vnd.microsoft.card.adaptive',
          content: adaptiveCard,
        },
      ],
    });
  }
  await next();
});
```

#### 4. Test the Adaptive Card

Run your application and ensure that the Adaptive Card is displayed correctly within Teams.

[Placeholder: Instructions for running and testing the application]

### Expected Outcome

You will create a custom Adaptive Card that can be displayed within Teams, providing users with rich, interactive content.

---

## Tutorial 3: Implementing Conversational AI

### Objective

Add AI-driven interactions to your Teams application using the AI package, enhancing the user experience with conversational capabilities.

### Overview

- Setting up the AI components
- Handling user input
- Generating AI responses

### Steps

#### 1. Set Up the Application

Initialize the `App` with required credentials and plugins. Ensure the `HttpPlugin` is included for handling HTTP requests.

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

#### 2. Configure the OpenAI Model

Initialize the `OpenAIChatModel` with your OpenAI API key. Configure model parameters such as temperature and model type.

```typescript
import { OpenAIChatModel } from '@teams.sdk/openai/chat';

const chatModel = new OpenAIChatModel({
  model: 'gpt-4',
  apiKey: 'your-openai-api-key',
  temperature: 0.7,
});
```

#### 3. Create a ChatPrompt

Define a `ChatPrompt` with specific instructions. Customize the AI assistant's behavior.

```typescript
import { ChatPrompt } from '@teams.sdk/ai/prompts/chat';

const chatPrompt = new ChatPrompt({
  model: chatModel,
  instructions: 'You are a conversational AI assistant.',
});
```

#### 4. Implement Middleware for AI Responses

Process incoming messages in the middleware. Use the `ChatPrompt` to generate AI responses. Reply to the user with the AI-generated message.

```typescript
app.use(async (ctx, next) => {
  if (ctx.activity.type === 'message') {
    const userMessage = ctx.activity.text;
    const aiResponse = await chatPrompt.chat(userMessage);

    await ctx.reply({
      type: 'message',
      text: aiResponse,
    });
  }
  await next();
});
```

#### 5. Test the Conversational AI

Run your application. Interact with the AI assistant in Teams.

```typescript
app.start().then(() => {
  console.log('Conversational AI application is running...');
});
```

### Expected Outcome

Your application will engage users with dynamic, AI-generated conversations, providing personalized responses to user input.

---

## Tutorial 4: Integrating OpenAI Services

### Objective

Incorporate OpenAI models into your Teams application for advanced language processing and enhanced interaction capabilities.

### Overview

- Integrating OpenAI services
- Managing API keys and configurations
- Handling user messages with OpenAI

### Steps

#### 1. Initialize the App with HTTP Plugin

Set up the `App` class including the `HttpPlugin` for communication. Provide necessary credentials for authentication.

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

#### 2. Set Up the OpenAIChatModel

Initialize the `OpenAIChatModel` with your API key. Specify model parameters and settings.

```typescript
import { OpenAIChatModel } from '@teams.sdk/openai/chat';

const chatModel = new OpenAIChatModel({
  model: 'gpt-4',
  apiKey: 'your-openai-api-key',
  temperature: 0.7,
});
```

#### 3. Implement Message Processing Middleware

Handle user messages within middleware. Use the OpenAI model to generate responses based on user input.

```typescript
app.use(async (ctx, next) => {
  if (ctx.activity.type === 'message') {
    const userMessage = ctx.activity.text;
    const aiResponse = await chatModel.chat({
      input: {
        role: 'user',
        content: userMessage,
      },
    });

    await ctx.reply({
      type: 'message',
      text: aiResponse.content,
    });
  }
  await next();
});
```

#### 4. Run and Test the Application

Start the application. Test the OpenAI integration by sending messages in Teams.

```typescript
app.start().then(() => {
  console.log('Application with OpenAI integration is running...');
});
```

#### [Placeholder: Instructions for testing the app]

### Expected Outcome

You'll have a Teams application that leverages OpenAI's powerful language models to provide sophisticated interactions with users.

---

## Next Steps

- **Proceed to Advanced Topics**

  Dive deeper into the Teams SDK by exploring [5. Advanced Topics](#5-advanced-topics), where you will learn about extending the framework and handling complex scenarios.

- **Review the Packages Reference**

  Familiarize yourself with the detailed documentation of each package in [3. Packages Reference](#3-packages-reference) to understand the full capabilities of the SDK.

- **Consult the API Reference**

  For comprehensive details on classes, interfaces, and methods, visit [6. API Reference](#6-api-reference).

- **Enhance Your Skills**

  - Check the [7. Appendices](#7-appendices) for additional resources and migration guides.
  - Visit [8. FAQs and Troubleshooting](#8-faqs-and-troubleshooting) for solutions to common issues.

---