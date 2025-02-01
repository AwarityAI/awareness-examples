# 3.1 API Package

## Overview

### Purpose of the API Package

The API package is a fundamental component of the SDK that provides interfaces and clients to interact with Microsoft Teams services. It serves as a bridge between your application and Teams, enabling you to handle activities, manage conversations, authenticate users, and more.

Key functionalities of the API package include:

- **Handling Activities**: Receive and process various activity types such as messages, events, and invokes.
- **User Authentication**: Manage user sign-in flows and token retrieval.
- **Bot Interaction**: Send messages, cards, and attachments using bot clients.
- **Conversation Management**: Create and manage conversations, threads, and channels.
- **Meeting and Team Data Access**: Retrieve meeting details, participant information, and team metadata.

[Placeholder for an image illustrating the API package's role in the SDK.]

### Integration with Other Packages

The API package is designed to work seamlessly with other packages in the SDK:

- **Cards Package**: Utilize the API package's models and clients to send rich cards created with the Cards package.
- **AI and OpenAI Packages**: Incorporate AI capabilities into your bot by leveraging the API package to handle messaging and activity flows.
- **Apps Package**: Build comprehensive Teams applications by combining the API package's backend services with frontend components.

By integrating the API package with other components, developers can create robust and interactive Teams applications that leverage a wide array of Microsoft Teams features.

[Placeholder for a diagram showing the interaction between the API package and other SDK packages.]

---

## Activities

### Activity Types and Interfaces

In the Microsoft Teams SDK, **activities** are the fundamental means of communication between your bot and Teams clients. An activity represents an interaction such as a message, event, or command. Understanding the different activity types and their interfaces is crucial for building responsive and interactive bots.

**Key Activity Types:**

- **MessageActivity**: Represents user messages or bot responses.
- **EventActivity**: Used for system events like typing indicators, read receipts, or meeting events.
- **InvokeActivity**: Handles interactive requests such as task modules, messaging extension commands, or adaptive card actions.
- **ConversationUpdateActivity**: Signals changes in a conversation, such as members being added or removed.
- **TypingActivity**: Indicates that a user or bot is typing.
- **HandoffActivity**: Used when transferring a conversation to another bot or human agent.
- **CommandActivity**: Represents a command issued by the user, often from a message extension or command box.

**Activity Interfaces:**

Each activity type implements a specific interface extending from a base `Activity` interface. These interfaces define the structure and properties associated with the activity.

- **ActivityBase**: The base interface containing common properties like `type`, `id`, `timestamp`, `channelId`, `from`, `conversation`, etc.
- **MessageSendActivity**: Extends `ActivityBase` for message activities, adding properties like `text`, `attachments`, `inputHint`, and `suggestedActions`.
- **EventActivity**: Includes a `name` and `value` to represent the specific event data.
- **InvokeActivity**: Contains a `name` and `value`, used for actions like adaptive card submissions or messaging extension commands.

**Understanding Activity Properties:**

- **`type`**: Specifies the activity type (e.g., `message`, `event`).
- **`id`**: A unique identifier for the activity.
- **`timestamp`**: The time the activity was generated.
- **`channelId`**: Identifier for the channel or medium of communication.
- **`from`** and **`recipient`**: Details about the sender and receiver.
- **`conversation`**: Information about the conversation context.
- **`text`**: The message content (for message activities).
- **`attachments`**: Any media or rich content attached to the activity.

**Best Practices:**

- **Activity Validation**: Always validate the activity type and required properties before processing.
- **Extensibility**: Utilize the extensible nature of activity interfaces to handle custom scenarios.
- **Security**: Be cautious with data in activities, especially user-generated content.

### Activity Handling

Handling activities involves processing incoming activities and generating appropriate responses. Your bot should be capable of managing different activity types to provide a seamless user experience.

**Processing Incoming Activities:**

1. **Receive Activity**: The bot receives an activity from the Teams client.
2. **Identify Activity Type**: Inspect the `type` property to determine how to process the activity.
3. **Process Activity**: Based on the activity type, execute the corresponding logic (e.g., send a reply, handle an event).
4. **Generate Response**: Create and send a response activity if necessary.

**Implementing Middleware:**

Middleware functions allow you to process activities before they reach your bot's core logic. This is useful for:

- **Logging**: Record activity details for monitoring and debugging.
- **Authentication**: Verify user identity and permissions.
- **Transformation**: Modify activity data (e.g., normalize text).

**Routing Mechanisms:**

Routing directs activities to appropriate handlers based on criteria like activity type or conversation context.

- **Type-Based Routing**: Assign handlers for specific activity types.
- **Contextual Routing**: Use conversation or user data to determine the handler.
- **Command Patterns**: Parse message text to execute commands.

**Example: Handling Activities**

```typescript
import { App } from '@teams.sdk/apps';
import { HttpPlugin } from '@teams.sdk/apps/plugins/http';

const app = new App({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tenantId: 'your-tenant-id',
  plugins: [new HttpPlugin()],
});

app.use(async (ctx, next) => {
  const activity = ctx.activity;

  if (activity.type === 'message') {
    console.log('Message received:', activity.text);
    await ctx.reply({
      type: 'message',
      text: `You said: ${activity.text}`,
    });
  } else if (activity.type === 'event') {
    console.log('Event received:', activity.name);
  } else if (activity.type === 'invoke') {
    console.log('Invoke activity received:', activity.name);
  }

  await next();
});

app.start().then(() => {
  console.log('App is running...');
});
```

[Placeholder for an image or diagram illustrating activity flow in a Teams bot.]

---

## Clients

### Bot Client

The `BotClient` is a key component for interacting with the Bot Framework and Microsoft Teams services. It provides methods to authenticate your bot, send messages, manage tokens, and handle sign-in flows.

**Key Features of BotClient:**

- **Authentication**: Obtain tokens for your bot to interact securely with Teams APIs.
- **Messaging**: Send proactive messages, replies, and rich content to users or channels.
- **Sign-In Flows**: Initiate and manage user sign-in processes within Teams.

**Using BotClient:**

To utilize the `BotClient`, you need to instantiate it with the appropriate credentials:

```typescript
import { BotClient } from '@teams.sdk/api';

const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

```

**Fetching a Bot Token:**

Before sending messages or performing actions, your bot needs to authenticate and obtain a token:

```typescript
botClient.token.get({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
}).then((tokenResponse) => {
  const botToken = tokenResponse.access_token;
  console.log('Bot Token:', botToken);
});
```

**Sending Messages:**

Once authenticated, you can send messages using the `botClient`. For example, to send a simple text message:

```typescript
const conversationId = 'your-conversation-id';
const activity = {
  type: 'message',
  text: 'Hello, World!',
};

botClient.conversations.activities(conversationId).create(activity).then((response) => {
  console.log('Message sent:', response.id);
});
```

**Handling Bot Sign-In Flows:**

Initiate a sign-in flow to authenticate users:

```typescript
botClient.signIn.getSignInUrl({
  state: 'your-state',
}).then((response) => {
  console.log('Sign-in URL:', response.signInLink);
});
```

**Example: Bot Client Usage**

```typescript
import { BotClient } from '@teams.sdk/api';

const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

// Fetch bot token
botClient.token.get().then((tokenResponse) => {
  const botToken = tokenResponse.access_token;

  // Send a message
  const conversationId = 'your-conversation-id';
  const activity = {
    type: 'message',
    text: 'Hello from BotClient!',
  };

  botClient.conversations.activities(conversationId).create(activity).then((response) => {
    console.log('Message sent:', response.id);
  });
});
```

[Placeholder for an image illustrating the BotClient's role in bot communication.]

### User Client

The `UserClient` is used to manage user authentication and tokens. It allows your application to implement user sign-in flows and retrieve tokens needed for accessing protected resources.

**Key Features of UserClient:**

- **Token Management**: Retrieve and manage user tokens for authenticated sessions.
- **Sign-In Flows**: Initiate user sign-in processes and handle token exchanges.
- **Secure Authentication**: Implement best practices for secure user authentication within Teams.

**Implementing User Sign-In Flows:**

To start a sign-in flow for a user:

```typescript
import { UserClient } from '@teams.sdk/api';

const userClient = new UserClient();

userClient.token.getUserToken({
  userId: 'user-id',
  connectionName: 'your-connection-name',
}).then((tokenResponse) => {
  if (tokenResponse.token) {
    console.log('User Token:', tokenResponse.token);
  } else {
    // Initiate sign-in flow
    botClient.signIn.getSignInUrl({
      userId: 'user-id',
      connectionName: 'your-connection-name',
    }).then((response) => {
      console.log('Please sign in using this link:', response.signInLink);
    });
  }
});
```

**Best Practices for Secure Authentication:**

- **Token Confidentiality**: Never expose tokens in logs or error messages.
- **Token Storage**: Store tokens securely and avoid persisting them unnecessarily.
- **Validation**: Validate tokens and handle expiration appropriately.

**Example: User Authentication**

```typescript
import { BotClient } from '@teams.sdk/api';

const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

// Retrieve user token
botClient.token.getUserToken({
  userId: 'user-id',
  connectionName: 'your-connection-name',
}).then((tokenResponse) => {
  if (tokenResponse.token) {
    // Use the token to access resources
    console.log('User Token:', tokenResponse.token);
  } else {
    // Initiate sign-in
    botClient.signIn.getSignInUrl({
      userId: 'user-id',
      connectionName: 'your-connection-name',
    }).then((response) => {
      // Direct the user to the sign-in URL
      console.log('Sign-in URL:', response.signInLink);
    });
  }
});
```

[Placeholder for a diagram showing the user authentication flow.]

### Conversation Client

The `ConversationClient` allows you to create and manage conversations within Teams. You can send messages, update activities, and handle conversation resources.

**Creating a New Conversation:**

```typescript
import { ConversationClient } from '@teams.sdk/api';

const conversationClient = new ConversationClient();

conversationClient.create({
  bot: { id: 'bot-id', name: 'Bot Name' },
  members: [{ id: 'user-id', name: 'User Name' }],
}).then((conversation) => {
  console.log('New Conversation ID:', conversation.id);

  // Send a message in the new conversation
  conversationClient.activities(conversation.id).create({
    type: 'message',
    text: 'Welcome to the conversation!',
  }).then((response) => {
    console.log('Message sent:', response.id);
  });
});
```

**Managing Activities in a Conversation:**

You can update or delete messages within a conversation:

```typescript
const conversationId = 'your-conversation-id';
const activityId = 'activity-to-update-or-delete';

// Update an activity
conversationClient.activities(conversationId).update(activityId, {
  type: 'message',
  text: 'Updated message text.',
}).then(() => {
  console.log('Activity updated.');
});

// Delete an activity
conversationClient.activities(conversationId).delete(activityId).then(() => {
  console.log('Activity deleted.');
});
```

**Handling Conversation References:**

Conversation references are crucial for resuming conversations or sending proactive messages. Always store conversation IDs and necessary details securely.

**Example: Conversation Management**

```typescript
import { ConversationClient } from '@teams.sdk/api';

const conversationClient = new ConversationClient();

// Create a conversation
conversationClient.create({
  bot: { id: 'bot-id', name: 'Bot' },
  members: [{ id: 'user-id', name: 'User' }],
}).then((conversation) => {
  console.log('Conversation created:', conversation.id);

  // Send a message
  conversationClient.activities(conversation.id).create({
    type: 'message',
    text: 'Hello, welcome!',
  }).then((response) => {
    console.log('Message sent:', response.id);
  });
});
```

[Placeholder for an image depicting conversation flow and management.]

### Meeting Client

The `MeetingClient` provides methods to access Teams meeting details and participant information, enabling enhanced meeting experiences within your application.

**Accessing Meeting Details:**

```typescript
import { MeetingClient } from '@teams.sdk/api';

const meetingClient = new MeetingClient();

meetingClient.getById('meeting-id').then((meetingInfo) => {
  console.log('Meeting Info:', meetingInfo);
});
```

**Retrieving Participant Information:**

```typescript
meetingClient.getParticipant('meeting-id', 'participant-id').then((participant) => {
  console.log('Participant Info:', participant);
});
```

**Utilizing Meeting APIs:**

- **Start/End Events**: Handle meeting start and end events to trigger actions.
- **Participant Events**: React to participants joining or leaving the meeting.
- **Meeting-Specific Data**: Access meeting context, roster, and other metadata.

[Placeholder for code samples demonstrating meeting event handling.]

### Team Client

The `TeamClient` is used for interacting with team-related data, such as team details and channel information.

**Retrieving Team Details:**

```typescript
import { TeamClient } from '@teams.sdk/api';

const teamClient = new TeamClient();

teamClient.getById('team-id').then((teamDetails) => {
  console.log('Team Details:', teamDetails);
});
```

**Managing Team Channels:**

```typescript
teamClient.getConversations('team-id').then((channels) => {
  console.log('Team Channels:', channels);
});
```

**Operations on Teams and Channels:**

- **Listing Members**: Get a list of team members.
- **Creating Channels**: Programmatically create new channels within a team.
- **Updating Team Settings**: Modify team properties and settings.

[Placeholder for an illustration of team and channel hierarchy.]

---

## Models

### Attachment Models

Attachments enrich your bot's messages by including additional content such as files, images, or interactive cards. The API package provides models to handle various types of attachments, enabling you to create engaging and interactive experiences for your users.

**Types of Attachments:**

- **File Attachments**: Share documents, PDFs, or other file types directly within a conversation.
- **Image Attachments**: Embed images to enhance visual communication.
- **Card Attachments**: Use rich cards (e.g., Adaptive Cards, Hero Cards) to present interactive content.

**Attachment Interfaces:**

- **Attachment**: The base interface for all attachments, containing properties like `contentType`, `contentUrl`, `content`, `name`, and `thumbnailUrl`.
- **CardAttachment**: Extends `Attachment` for card-specific attachments, allowing you to specify the card type and content.

**Working with Attachments:**

To include an attachment in a message, add it to the `attachments` array of the activity.

**Example: Sending a Message with an Attachment**

```typescript
import { BotClient } from '@teams.sdk/api/clients/bot';

const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

// Example: Sending a message with an attachment
const attachment = {
  contentType: 'application/vnd.microsoft.card.thumbnail',
  content: {
    title: 'Sample Thumbnail Card',
    text: 'This is a sample card with an image.',
    images: [{ url: 'https://example.com/image.png' }],
  },
};

botClient.activities.create({
  type: 'message',
  text: 'Here is a card:',
  attachments: [attachment],
}).then((response) => {
  console.log('Message with attachment sent:', response.id);
});
```

**Usage Scenarios:**

- **File Sharing**: Enable users to download resources or provide documents.
- **Rich Interaction**: Use cards to collect user input or display information in an organized manner.
- **Media Inclusion**: Enhance messages with images or media content.

[Placeholder for a visual representation of attachment types in a Teams chat.]

### Card Models

Cards allow you to present information in a visually appealing and interactive format. The API package supports various card types to cater to different scenarios.

**Card Types and Their Usage:**

- **Adaptive Cards**: Highly customizable cards defined using JSON schema; ideal for rich and complex interactions.
- **Hero Cards**: Feature a large image, one or more buttons, and text; suitable for highlighting a single item.
- **Thumbnail Cards**: Similar to Hero Cards but with a smaller image; used for lists or summaries.
- **Signin Cards**: Facilitate user authentication by providing a sign-in button.
- **OAuth Cards**: Specifically designed to handle OAuth authentication flows.

**Implementing Cards:**

Cards are implemented as attachments with specific `contentType` values, and their content conforms to the card schema.

**Example: Sending an Adaptive Card**

```typescript
import { BotClient } from '@teams.sdk/api/clients/bot';
import { Card } from '@teams.sdk/cards';

const botClient = new BotClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

const adaptiveCard: Card = {
  type: 'AdaptiveCard',
  version: '1.4',
  body: [
    {
      type: 'TextBlock',
      text: 'Welcome to Adaptive Cards!',
      weight: 'Bolder',
      size: 'Medium',
    },
    // Additional elements...
  ],
  actions: [
    {
      type: 'Action.OpenUrl',
      title: 'Learn More',
      url: 'https://adaptivecards.io/',
    },
  ],
};

botClient.activities.create({
  type: 'message',
  attachments: [
    {
      contentType: 'application/vnd.microsoft.card.adaptive',
      content: adaptiveCard,
    },
  ],
}).then((response) => {
  console.log('Message with Adaptive Card sent:', response.id);
});
```

**Customizing Cards:**

- **Layout**: Define the arrangement of elements to fit your content.
- **Interactivity**: Add actions like buttons or inputs to engage users.
- **Styling**: Use card properties to match your branding or theme.

[Placeholder for images of different card types.]

### Conversation Models

Conversation models represent the context of interactions in Teams, including participants and conversation IDs.

**Key Interfaces:**

- **ConversationAccount**: Contains details about the conversation, such as `id`, `name`, and `isGroup`.
- **ConversationReference**: Holds information to reference a specific point in a conversation, essential for sending proactive messages.

**Managing Conversations:**

- **Starting Conversations**: Use the `ConversationClient` to create new conversations or channels.
- **Storing References**: Save `ConversationReference` objects to continue conversations later.

**Example: Saving and Using a Conversation Reference**

```typescript
function handleIncomingMessage(context) {
  const conversationRef = context.conversation;
  // Save conversationRef to database or memory
}

// Later, to send a proactive message
function sendProactiveMessage(conversationRef) {
  botClient.activities(conversationRef.conversation.id).create({
    type: 'message',
    text: 'Hello again!',
  });
}
```

**Use Cases:**

- **Notifications**: Send updates to users without them initiating the conversation.
- **Context Preservation**: Maintain conversation state across sessions.

### Message Models

Messages are the primary means of communication in Teams. Message models define the structure and properties of a message.

**Components of a Message:**

- **Text**: The main content of the message.
- **Attachments**: Files or cards included with the message.
- **Mentions**: References to users, channels, or bots.
- **Reactions**: User reactions to a message (e.g., likes).

**Handling Mentions:**

Mentions allow you to grab a user's attention or reference them in messages.

**Example: Including a Mention in a Message**

```typescript
const mention = {
  type: 'mention',
  text: `<at>John Doe</at>`,
  mentioned: {
    id: 'user-id',
    name: 'John Doe',
  },
};

botClient.activities.create({
  type: 'message',
  text: `Hello ${mention.text}!`,
  entities: [mention],
});
```

**Formatting Text:**

- **Markdown Support**: Use markdown to format text (bold, italic, links).
- **Emojis**: Include emojis to add expression to messages.

**Best Practices:**

- **Clarity**: Keep messages concise and clear.
- **Accessibility**: Ensure text is readable and accessible to all users.

### Meeting Models

Meeting models provide information and context about Teams meetings, useful for bots interacting within meeting environments.

**Key Interfaces:**

- **MeetingInfo**: Contains details like `id`, `details`, `organizer`, and `conversation`.
- **MeetingParticipant**: Represents a participant with properties like `user` and `meeting`.

**Accessing Meeting Data:**

- **Meeting Details**: Retrieve information about a meeting's schedule, join URL, and title.
- **Participant Information**: Get details about users attending the meeting.

**Example: Retrieving Meeting Details**

```typescript
const meetingClient = new MeetingClient();

meetingClient.getById('meeting-id').then((meetingInfo) => {
  console.log('Meeting Title:', meetingInfo.details.title);
});
```

**Use Cases:**

- **Meeting Bots**: Create bots that provide services within a meeting, like note-taking or Q&A.
- **Event Handling**: Respond to meeting lifecycle events (start, end).

### Token Models

Token models are essential for managing authentication and authorization in your bot.

**Common Token Types:**

- **User Tokens**: Represent user authentication and are used to access user-specific data.
- **Bot Tokens**: Authenticate your bot with the Teams platform.

**Interfaces for Token Management:**

- **TokenResponse**: Contains the token and related metadata.
- **SignInUrlResponse**: Provides a URL for users to sign in and authorize your app.

**Implementing Authentication Flows:**

**Example: Retrieving a User Token**

```typescript
botClient.token.getUserToken({
  userId: 'user-id',
  connectionName: 'connection-name',
}).then((tokenResponse) => {
  if (tokenResponse.token) {
    // Use the token to access protected resources
  } else {
    // Initiate sign-in flow
  }
});
```

**Best Practices:**

- **Secure Storage**: Safely store tokens and sensitive data.
- **Token Refresh**: Handle token expiration and refresh logic.
- **Least Privilege**: Request only the permissions needed for your bot's functionality.

---

## Next Steps

Now that you have an understanding of the API package and its capabilities, consider exploring the following areas to enhance your Teams application development:

### Explore Other Packages

- **[3.2 Cards Package](#32-cards-package)**: Dive deeper into creating and customizing rich cards to deliver engaging user experiences.
- **[3.3 AI Package](#33-ai-package)**: Integrate AI capabilities like natural language processing into your bot.
- **[3.4 OpenAI Package](#34-openai-package)**: Leverage advanced AI models for sophisticated functionalities.
- **[3.5 Apps Package](#35-apps-package)**: Learn about building comprehensive Teams apps with frontend and backend components.
- **[3.6 Common Package](#36-common-package)**: Utilize shared utilities and helper functions across your projects.

### Hands-On Practice

- Visit **[4. Tutorials and Examples](#4-tutorials-and-examples)** to work through practical guides and sample projects.
- Experiment with building bots that utilize different activity types and models.

### Deepen Your Understanding

- Explore advanced topics in **[5. Advanced Topics](#5-advanced-topics)**, including optimization, security, and compliance.
- Join the developer community to share insights and get support.

### API Specifications

- Refer to the **[6. API Reference](#6-api-reference)** for detailed documentation on classes, interfaces, and methods.
- Use the API reference as a toolkit to resolve specific implementation questions.

---