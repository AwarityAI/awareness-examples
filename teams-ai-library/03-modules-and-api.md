# Modules and API Reference

## 1. Introduction

### Overview of Modules and API Reference

Welcome to the **Modules and API Reference** for the Teams AI library. This section provides a comprehensive overview of the various modules, classes, interfaces, and methods that comprise the library. It is designed to help developers understand the structure and functionality of the library's components, enabling you to effectively build and enhance your Microsoft Teams applications with AI capabilities.

The Teams AI library extends the Microsoft Bot Framework SDK by introducing advanced AI features that simplify the development of intelligent bots and applications within Microsoft Teams and Microsoft 365. By leveraging this library, you can create bots that:

- Interact naturally with users through conversational AI.
- Handle complex tasks and workflows.
- Integrate seamlessly with Teams features like adaptive cards, message extensions, and meeting events.

### Purpose of the Document

The purpose of this document is to serve as a detailed reference guide for developers working with the Teams AI library. It aims to:

- **Provide Detailed Explanations**: Offer in-depth information about each module and component within the library, including their purposes, functionalities, and how they interact with other parts of the system.

- **Facilitate Effective Development**: Help you quickly find the information needed to implement specific features or troubleshoot issues, thereby streamlining the development process.

- **Enhance Understanding of the Library Architecture**: Enable you to gain a comprehensive understanding of the library's architecture, allowing for better design decisions when building bots and applications.

- **Support Developers of All Levels**: Cater to both new and experienced developers by starting with foundational concepts and progressing to more advanced topics and functionalities.

In this **Modules and API Reference**, you will find:

- **Module Overviews**: Summaries of each module's role and how it contributes to the overall functionality of the library.

- **Class and Interface Descriptions**: Detailed information about key classes and interfaces, including their methods, properties, and usage scenarios.

- **Code Examples**: Practical examples demonstrating how to utilize various components in real-world applications.

- **Implementation Guidelines**: Best practices and recommendations for effectively using the library's features.

We encourage you to use this reference in conjunction with other sections of the documentation, such as the tutorials and samples, to gain both theoretical knowledge and practical experience. Whether you're just getting started or looking to deepen your understanding of specific components, this document is designed to assist you in making the most of the Teams AI library.

---

By thoroughly exploring the modules and APIs described in the following sections, you'll be well-equipped to develop powerful, intelligent bots that enhance user experiences within Microsoft Teams.

## 2. Application Framework

### 2.1. `Application` Class

#### Purpose and Functionality

The `Application` class is the core component of the Teams AI library's Application Framework. It is designed to simplify the creation, configuration, and management of a bot application within Microsoft Teams and Microsoft 365 environments. By leveraging the `Application` class, developers can:

- **Handle Incoming Activities**: Manage and process incoming messages and events from users.
- **Route Messages to Handlers**: Direct activities to appropriate handlers based on their type or content.
- **Manage Application State**: Maintain conversation and user state across interactions.
- **Configure Application Behavior**: Set up middleware, AI options, storage, and other configurations.

This class extends the capabilities of the Microsoft Bot Framework SDK by integrating advanced AI features, making it easier to build intelligent and responsive bots.

#### Key Properties and Methods

**Properties:**

- **`_adapter`**: Manages communication between the bot and the Microsoft Teams platform.
- **`_options`**: Holds configuration options for the application, such as storage and AI settings.
- **`_routes`**: Stores routing information for different activity types and message patterns.
- **`_invokeRoutes`**: Handles invoke activities for message extensions, task modules, etc.
- **`_typingTimer`**: Manages typing indicators to enhance user experience.
- **`_beforeTurn` / `_afterTurn`**: Middleware hooks executed before and after each turn.

**Methods:**

- **`run(context)`**: The main entry point that processes incoming activities.
- **`activity(type, handler)`**: Registers a handler for a specific activity type (e.g., message, conversationUpdate).
- **`message(handler)`**: Registers a handler specifically for message activities.
- **`conversationUpdate(handler)`**: Registers a handler for conversation update events.
- **`sendProactiveActivity(conversationReference, logic)`**: Sends proactive messages to users outside the context of an incoming message.
- **`defaultAction(handler)`**: Registers a default action handler that can be overridden.
- **`doAction(actionName, handler)`**: Registers a handler for a specific custom action.

#### Configuration and Setup

To create and configure an `Application` instance, you initialize it with the desired options and set up handlers for the activities your bot will process.

##### Code Example: Creating and Configuring an Application Instance

```javascript
const { Application } = require('teams-ai');
const { MemoryStorage } = require('botbuilder');

// Create a new Application instance with configuration options
const app = new Application({
  storage: new MemoryStorage(), // Configure storage for state management
  aiOptions: {
    // AI configuration options (e.g., model selection)
  },
  removeRecipientMention: true, // Optional configuration to clean up messages
});

// Register a message activity handler
app.message(async (context, next) => {
  await context.sendActivity('Hello, Teams user!');
  await next();
});

// Start the application (omitting server setup for brevity)
```

#### Handling Incoming Activities

The `Application` class processes incoming activities by matching them with registered handlers. When the bot receives an activity, it uses the `run` method to route the activity to the appropriate handler based on its type.

##### Code Example: Processing Messages and Activities

```javascript
// Handle all message activities
app.message(async (context, next) => {
  const userMessage = context.activity.text;
  await context.sendActivity(`You said: ${userMessage}`);
  await next();
});

// Handle conversation update activities (e.g., when a user joins the conversation)
app.conversationUpdate(async (context, next) => {
  if (context.activity.membersAdded) {
    for (const member of context.activity.membersAdded) {
      if (member.id !== context.activity.recipient.id) {
        await context.sendActivity('Welcome to the conversation!');
      }
    }
  }
  await next();
});

// Inside your server or adapter setup
adapter.processActivity(async (context) => {
  await app.run(context);
});
```

#### Routing and Processing Messages

The `Application` class allows for sophisticated routing of messages to handlers based on patterns or conditions. This enables developers to structure their bots to respond appropriately to different user inputs.

##### Code Example: Setting Up Message Handlers

```javascript
// Route messages containing certain keywords to specific handlers
app.message([
  {
    pattern: /help/i,
    handler: async (context, next) => {
      await context.sendActivity('How can I assist you today?');
      await next();
    },
  },
  {
    pattern: /weather/i,
    handler: async (context, next) => {
      await context.sendActivity('The weather is sunny with a chance of rain.');
      await next();
    },
  },
]);

// Default message handler for unmatched patterns
app.message(async (context, next) => {
  await context.sendActivity("I'm sorry, I didn't understand that.");
  await next();
});
```

In this example:

- **Pattern Matching**: Messages containing "help" or "weather" trigger specific handlers.
- **Default Handler**: A fallback handler responds when no patterns match.

### 2.2. `ApplicationBuilder` Class

#### Simplifying Application Creation

The `ApplicationBuilder` class provides a fluent interface to construct and configure an `Application` instance. It streamlines the setup process by allowing chaining of configuration methods, enhancing code readability and maintainability.

Using `ApplicationBuilder`, you can:

- **Configure Storage**: Set up where the bot's state information is stored.
- **Set AI Options**: Define AI-related configurations like model choices.
- **Add Authentication**: Integrate authentication mechanisms seamlessly.
- **Customize Behaviors**: Adjust settings like typing indicators and message handling.

#### Configuration Options

Key methods offered by `ApplicationBuilder` include:

- **`withStorage(storage)`**: Specifies the storage provider for state management.
- **`withAIOptions(aiOptions)`**: Sets AI configurations.
- **`withAuthentication(authOptions)`**: Adds authentication settings.
- **`withAdaptiveCardOptions(cardOptions)`**: Configures adaptive card behaviors.
- **`setRemoveRecipientMention(flag)`**: Determines if bot mentions are removed from messages.
- **`setStartTypingTimer(duration)`**: Configures typing indicator delays.
- **`withTurnStateFactory(factory)`**: Provides a custom factory for turn state.

##### Code Example: Building an Application with ApplicationBuilder

```javascript
const { ApplicationBuilder } = require('teams-ai');
const { MemoryStorage } = require('botbuilder');

const app = new ApplicationBuilder()
  .withStorage(new MemoryStorage()) // Set up storage
  .withAIOptions({
    // AI options, such as OpenAI or Azure OpenAI configurations
  })
  .withAuthentication({
    // Authentication configurations, e.g., OAuth settings
  })
  .setRemoveRecipientMention(true) // Remove bot mentions from incoming messages
  .build(); // Build and retrieve the Application instance

// Register message handlers as usual
app.message(async (context, next) => {
  await context.sendActivity('Welcome to the bot built with ApplicationBuilder!');
  await next();
});

// Adapter and server setup to run the bot
// (adapter setup code would go here)
adapter.processActivity(async (context) => {
  await app.run(context);
});
```

In this example:

- **Fluent Configuration**: Methods are chained to set up the application in a clear and concise way.
- **Modular Setup**: Each aspect of the application (storage, AI, authentication) is configured separately, improving modularity.
- **Build Method**: The `build()` method finalizes the configuration and returns an `Application` instance ready to use.

---

By utilizing the `Application` and `ApplicationBuilder` classes, developers can efficiently create robust bot applications with the Teams AI library, customizing behaviors and integrating advanced AI features with ease.

## 3. Adaptive Cards

### 3.1. Working with Adaptive Cards

#### Overview of Adaptive Cards

Adaptive Cards are a platform-agnostic method of presenting rich, interactive, and highly engaging content within Microsoft Teams and other applications. They allow developers to create visually appealing interfaces that can display information and collect user input in a structured format. By leveraging Adaptive Cards, you can enhance user interactions with your bot by providing a more dynamic and responsive experience.

Key features of Adaptive Cards include:

- **Rich Content Presentation**: Display text, images, media, and more in a flexible layout.
- **Interactive Elements**: Incorporate inputs, buttons, and actions to gather user responses.
- **Consistent User Experience**: Ensure that cards render appropriately across different devices and platforms.
- **Easy Integration**: Utilize JSON schemas to define cards, making them straightforward to implement and modify.

#### The `AdaptiveCards` Class

The `AdaptiveCards` class is a key component of the Teams AI library, designed to streamline the handling of Adaptive Cards within your bot applications. It provides a fluent and intuitive interface for:

- **Creating and Sending Cards**: Simplify the process of constructing and dispatching Adaptive Cards to users.
- **Registering Action Handlers**: Define how your bot responds to user interactions with the card, such as button clicks or form submissions.
- **Managing Card Responses**: Handle the data returned from user interactions and implement appropriate logic within your bot.

By integrating the `AdaptiveCards` class with your `Application` instance, you can leverage the application's routing and state management features, allowing your bot to access user and conversation data, call other services or APIs, and maintain consistency across different parts of the application.

### 3.2. Handling Card Actions and Submissions

#### Registering Action Handlers

To make your Adaptive Cards interactive, you need to handle user actions such as button clicks or form submissions. The `AdaptiveCards` class enables you to register action handlers for specific verbs (action identifiers), ensuring that your bot reacts appropriately to user inputs.

**Example: Handling Adaptive Card Actions**

```javascript
// Import the AdaptiveCards class
const { AdaptiveCards } = require('teams-ai');

// Assume 'app' is your Application instance
const adaptiveCards = new AdaptiveCards(app);

// Register an action handler for the verb 'submitOrder'
adaptiveCards.action('submitOrder', async (context, actionData) => {
  // Extract data submitted by the user from the 'actionData' parameter
  const orderDetails = actionData;

  // Implement your logic to process the order
  await processOrder(orderDetails);

  // Send a confirmation message to the user
  await context.sendActivity('Thank you! Your order has been submitted successfully.');
});
```

In this example:

- **Action Registration**: The `action` method registers a handler for the `submitOrder` verb.
- **Data Handling**: The `actionData` parameter contains the data submitted by the user through the Adaptive Card.
- **Response**: The bot processes the data and sends a confirmation message.

#### Designing Adaptive Card Templates

Creating Adaptive Card templates involves defining the card's structure, layout, and content using JSON. Templates can include a variety of elements such as text blocks, images, input fields, and action buttons. Designing reusable templates ensures consistency and efficiency in your bot's user interface.

**Example: Creating Adaptive Card Templates**

`orderCard.json` (Adaptive Card Template):

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "body": [
    {
      "type": "TextBlock",
      "text": "Place Your Order",
      "weight": "Bolder",
      "size": "Medium"
    },
    {
      "type": "Input.Text",
      "id": "productName",
      "placeholder": "Enter the product name",
      "label": "Product Name"
    },
    {
      "type": "Input.Number",
      "id": "quantity",
      "placeholder": "Enter the quantity",
      "min": 1,
      "label": "Quantity"
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Submit Order",
      "data": {
        "verb": "submitOrder"
      }
    }
  ]
}
```

**Sending the Adaptive Card in Your Bot:**

```javascript
// Load the Adaptive Card template
const orderCard = require('./orderCard.json');

// Send the Adaptive Card to the user
await context.sendActivity({
  attachments: [
    {
      contentType: 'application/vnd.microsoft.card.adaptive',
      content: orderCard
    }
  ]
});
```

In this example:

- **Template Definition**: The JSON template defines the layout and elements of the Adaptive Card, including input fields and an action button.
- **Verb Association**: The `Action.Submit` button includes a `data` object with a `verb`, which is used to match the action handler registered earlier.
- **Sending the Card**: The card is sent as an attachment in a message activity.

**Processing User Submissions:**

When the user fills out the form and clicks the "Submit Order" button, the bot receives the submission and invokes the corresponding action handler based on the `verb`.

```javascript
// Action handler registered earlier
adaptiveCards.action('submitOrder', async (context, actionData) => {
  // Access the submitted data
  const productName = actionData.productName;
  const quantity = actionData.quantity;

  // Process the order
  await processOrder({ productName, quantity });

  // Respond to the user
  await context.sendActivity(`Order received for ${quantity} units of ${productName}.`);
});
```

**Key Points:**

- **Data Binding**: Input elements in the card collect user data, which is sent back to the bot upon submission.
- **Action Matching**: The bot uses the `verb` to determine which action handler to invoke.
- **User Feedback**: Provide immediate feedback or next steps to enhance the user experience.

---

By effectively utilizing the `AdaptiveCards` class and designing interactive card templates, you can significantly improve the user interface and engagement level of your bot. Adaptive Cards empower your application to present complex information clearly and interact with users seamlessly, making your bot more dynamic and user-friendly.

## 4. Message Extensions

### 4.1. Extending Functionality with Message Extensions

#### Overview of Message Extensions

Message Extensions are a powerful feature in Microsoft Teams that allow developers to extend the capabilities of their bots beyond standard messaging. They enable bots to interact with users through additional interfaces directly within the Teams client, enhancing user engagement and productivity. With Message Extensions, users can:

- **Search for information**: Quickly access data or content provided by your bot without leaving the Teams interface.
- **Perform actions**: Trigger specific workflows or tasks directly from a message.
- **Insert rich content**: Add interactive cards or formatted information into the conversation.

By integrating Message Extensions into your bot, you can provide users with seamless access to your application's features, improving the overall user experience.

#### The `MessageExtensions` Class

The `MessageExtensions` class is a key component of the Teams AI library designed to facilitate the development of Message Extensions within Teams applications. It provides a structured and intuitive interface for:

- **Registering Handlers**: Define how your bot responds to various invoke activities related to Message Extensions.
- **Implementing Search Commands**: Handle user queries and return dynamic search results.
- **Implementing Action Commands**: Process user actions initiated through the Teams interface.
- **Handling Invoke Activities**: Respond to specific user interactions, such as submitting data or fetching tasks.

By leveraging the `MessageExtensions` class, developers can enhance their bots with rich, interactive features, enabling users to interact with the bot's functionality directly from the Teams message compose box or command box.

### 4.2. Implementing Search and Action Commands

#### Handling Search Commands

Search Commands in Message Extensions allow users to query information from your bot without leaving the Teams conversation. When a user performs a search using your bot's Message Extension, your bot can process the query and return relevant results in real-time.

**Example: Implementing a Search Command in a Message Extension**

```javascript
// Import the MessageExtensions class
const { MessageExtensions } = require('teams-ai');

// Assume 'app' is your Application instance
const messageExtensions = new MessageExtensions(app);

// Register a search handler for the command 'searchItems'
messageExtensions.query('searchItems', async (context, query) => {
  // Extract the search text from the query parameters
  const searchText = query.parameters[0]?.value || '';

  // Implement your logic to search for items matching the query
  const items = await searchDatabaseForItems(searchText);

  // Format the search results into attachments
  const attachments = items.map(item => ({
    contentType: 'application/vnd.microsoft.card.thumbnail',
    content: {
      title: item.name,
      subtitle: item.category,
      text: item.description,
      images: [
        {
          url: item.imageUrl
        }
      ]
    }
  }));

  // Return the search results to Teams
  return {
    composeExtension: {
      type: 'result',
      attachmentLayout: 'list',
      attachments: attachments
    }
  };
});
```

In this example:

- **Query Registration**: The `query` method registers a handler for the `searchItems` command.
- **Processing the Search Query**: The handler extracts the user's search text from the query parameters.
- **Generating Results**: The bot searches a database or data source for items that match the search text.
- **Formatting Results**: The search results are formatted as a list of thumbnail cards.
- **Returning Results**: The handler returns the formatted results, which Teams displays to the user.

#### Handling Action Commands

Action Commands allow users to initiate specific tasks or workflows directly from the Teams interface. When a user selects an action command, your bot can present a dialog (task module) or process the action and return a response.

**Example: Implementing an Action Command in a Message Extension**

```javascript
// Register a fetchTask handler for the command 'createItem'
messageExtensions.fetchTask('createItem', async (context, action) => {
  // Return a task module response with an Adaptive Card for item creation
  return {
    task: {
      type: 'continue',
      value: {
        title: 'Create New Item',
        card: createItemAdaptiveCard, // Your Adaptive Card JSON
        width: 'medium',
        height: 'medium'
      }
    }
  };
});

// Register a submitAction handler to process the submitted data
messageExtensions.submitAction('createItem', async (context, actionData) => {
  // Extract data submitted by the user
  const newItem = actionData;

  // Implement your logic to create the new item
  await saveNewItemToDatabase(newItem);

  // Send a confirmation message to the user
  await context.sendActivity('New item created successfully.');

  // Optionally, return a message to close the task module
  return {
    task: {
      type: 'message',
      value: 'Item creation completed.'
    }
  };
});
```

In this example:

- **Fetch Task Module**: The `fetchTask` method registers a handler that returns a task module containing an Adaptive Card when the user selects the `createItem` action command.
- **Adaptive Card for Data Collection**: The task module displays an Adaptive Card that collects input from the user.
- **Processing Submissions**: The `submitAction` method processes the data submitted from the Adaptive Card.
- **Creating the Item**: The bot performs the necessary action, such as saving the new item to a database.
- **User Feedback**: The bot sends a confirmation message and closes the task module.

### 4.3. Handling Invoke Activities

#### Responding to Invoke Activities

Invoke Activities are special types of messages sent from the Teams client to the bot when a user interacts with Message Extensions or Adaptive Cards. Handling Invoke Activities allows your bot to respond to user interactions, process data submissions, and provide dynamic content.

**Example: Processing Invoke Activities**

```javascript
// Register a handler for link unfurling (e.g., when a user pastes a link)
messageExtensions.queryLink(async (context, query) => {
  const url = query.url;

  // Implement your logic to generate a preview for the URL
  const previewCard = await generateLinkPreviewCard(url);

  // Return the preview card to Teams
  return {
    composeExtension: {
      type: 'result',
      attachmentLayout: 'list',
      attachments: [previewCard]
    }
  };
});
```

In this example:

- **Link Unfurling**: The `queryLink` method handles invoke activities when a user pastes a URL into the compose message area.
- **Generating a Preview**: The bot generates a preview (e.g., a card with a summary or image) for the pasted link.
- **Returning the Preview**: The bot returns the preview card, which Teams displays inline in the conversation.

**Key Points:**

- **Invoke Activity Handling**: The `MessageExtensions` class provides methods to handle different types of invoke activities, such as queries, fetch tasks, and submit actions.
- **Custom Logic Implementation**: Developers can implement custom logic within these handlers to perform actions based on user input.
- **Dynamic Responses**: The bot can return various types of responses, including messages, Adaptive Cards, or task modules, enhancing the interactivity of the application.

---

By utilizing the `MessageExtensions` class to implement search and action commands and handle invoke activities, you can greatly enhance the capabilities of your bot within Microsoft Teams. This allows users to interact with your application's features more effectively and efficiently, providing a richer and more engaging experience.

## 5. Meetings and Events

### 5.1. Handling Teams Meeting Events

#### Overview of Teams Meeting Events

Microsoft Teams meetings generate various events that can be leveraged by your bot to enhance user experience and interaction. These events include when a meeting starts or ends, and when participants join or leave a meeting. By handling these events, your bot can perform actions such as sending notifications, welcoming participants, logging attendance, or triggering workflows based on meeting activities.

The Teams AI library provides the `Meetings` class to simplify the handling of these meeting events within your application. This class offers methods to register handlers for specific meeting-related events, ensuring that your bot responds appropriately to changes in the meeting state.

#### Start and End Events

- **Meeting Start Events**: Triggered when a Teams meeting begins. Your bot can use this event to perform initialization tasks, send welcome messages to the meeting chat, or prepare resources needed during the meeting.
- **Meeting End Events**: Triggered when a Teams meeting concludes. Your bot can handle this event to perform cleanup operations, summarize meeting discussions, or prompt for post-meeting feedback.

#### Participant Join and Leave Events

- **Participant Join Events**: Occur when one or more participants join an ongoing Teams meeting. Your bot can welcome new participants, provide them with meeting agendas, or share relevant documents.
- **Participant Leave Events**: Occur when participants leave the meeting. Your bot can log these events, adjust resources accordingly, or notify remaining participants.

#### The `Meetings` Class and Its Methods

The `Meetings` class is a component within the Teams AI library designed specifically to manage Teams meeting events. It provides a structured and efficient way to register handlers for different meeting events, allowing your application to react to changes in the meeting environment.

**Key Methods of the `Meetings` Class**:

1. **`start(handler)`**: Registers a handler to be executed when a meeting starts.

   ```javascript
   meetings.start(async (context) => {
     // Your logic when the meeting starts
   });
   ```

2. **`end(handler)`**: Registers a handler for when a meeting ends.

   ```javascript
   meetings.end(async (context) => {
     // Your logic when the meeting ends
   });
   ```

3. **`participantsJoin(handler)`**: Registers a handler for when participants join the meeting.

   ```javascript
   meetings.participantsJoin(async (context, membersAdded) => {
     // Your logic when participants join
   });
   ```

4. **`participantsLeave(handler)`**: Registers a handler for when participants leave the meeting.

   ```javascript
   meetings.participantsLeave(async (context, membersRemoved) => {
     // Your logic when participants leave
   });
   ```

Each method allows you to define an asynchronous handler function that will be called when the specific event occurs. The handlers receive contextual information, such as the activity context and the list of participants who joined or left, enabling you to tailor your bot's responses.

#### Code Example: Managing Meeting Events in Your Application

The following example demonstrates how to use the `Meetings` class to handle Teams meeting events within your application.

```javascript
// Import the necessary classes from the Teams AI library
const { Application, Meetings } = require('teams-ai');
const { MemoryStorage } = require('botbuilder');

// Create an instance of your Application with required configurations
const app = new Application({
  storage: new MemoryStorage(), // Configure storage for state management
  // Other configuration options...
});

// Create an instance of the Meetings class, passing the application instance
const meetings = new Meetings(app);

// Handle meeting start events
meetings.start(async (context) => {
  await context.sendActivity('Welcome everyone! The meeting has just started.');
});

// Handle meeting end events
meetings.end(async (context) => {
  await context.sendActivity('Thank you for attending. The meeting has now ended.');
});

// Handle participants joining the meeting
meetings.participantsJoin(async (context, membersAdded) => {
  for (const member of membersAdded) {
    if (member.id !== context.activity.recipient.id) {
      await context.sendActivity(`Hello ${member.name}, welcome to the meeting!`);
    }
  }
});

// Handle participants leaving the meeting
meetings.participantsLeave(async (context, membersRemoved) => {
  for (const member of membersRemoved) {
    await context.sendActivity(`${member.name} has left the meeting.`);
  }
});

// Set up your adapter and server (omitted for brevity)
// ...

// Process incoming activities using the Application instance
adapter.processActivity(async (context) => {
  await app.run(context);
});
```

In this example:

- **Instantiation**: An `Application` instance is created with necessary configurations, and a `Meetings` instance is created using the application.
- **Registering Handlers**:
  - **Meeting Start**: When the meeting starts, the bot sends a welcome message to all participants.
  - **Meeting End**: Upon meeting conclusion, the bot thanks participants.
  - **Participants Join**: The bot welcomes each participant who joins during the meeting.
  - **Participants Leave**: The bot notifies when a participant leaves the meeting.
- **Contextual Responses**: The bot uses the `context` object to send messages to the meeting chat, accessing participant information to personalize responses.
- **Event Handling Logic**: Custom logic can be implemented within each handler to perform actions like logging attendance, updating databases, or triggering other workflows.

**Key Points to Consider**:

- **Selective Responses**: In the participant join handler, the bot checks if the member's ID is different from the bot's ID to avoid self-referencing.
- **Integration with Application**: The `Meetings` class leverages the `Application` class's routing capabilities to ensure that meeting events are handled appropriately.
- **Teams Channel Specificity**: The handlers are designed to respond only when activities originate from the Teams channel, ensuring accurate event handling.

---

By effectively utilizing the `Meetings` class and its methods, you can enhance your bot's interaction within Teams meetings, providing timely information and responses that improve the meeting experience for all participants. Whether it's welcoming attendees, sharing important updates, or performing post-meeting actions, handling meeting events allows your bot to be an integral part of the team's collaboration process.

## 6. Utilities and Helpers

### 6.1. The `Utilities` Class

#### Common Helper Functions

The `Utilities` class provides a collection of helper functions designed to assist developers in various tasks within the Teams AI library. These functions simplify common operations such as data manipulation, formatting, and parsing, making it easier to build robust and efficient bot applications.

Key features of the `Utilities` class include:

- **Data Conversion**: Methods to convert values of different types into string representations.
- **Text Manipulation**: Functions to truncate text appropriately, ensuring readability without cutting off words.
- **Citation Formatting**: Utilities to format and extract citations from text, useful when the bot references external sources.

#### Formatting and Parsing Utilities

The `Utilities` class offers several methods that help in formatting and parsing data. Some of the commonly used methods are:

- **`toString(value: any, asJson?: boolean): string`**: Converts a value to its string representation. If `asJson` is `true`, the value is converted to a JSON string with indentation for readability.

  ```javascript
  Utilities.toString(123);            // Returns "123"
  Utilities.toString({ a: 1 }, true); // Returns formatted JSON string of the object
  ```

- **`snippet(text: string, maxLen: number): string`**: Truncates a given text to a specified maximum length without cutting off words in the middle. Useful for creating summaries or previews.

  ```javascript
  const longText = "This is a very long piece of text that needs to be shortened.";
  Utilities.snippet(longText, 30); // Returns a truncated version without splitting words
  ```

- **`formatCitation(id: number): string`**: Formats a citation reference based on an identifier, typically used when the bot needs to reference sources or footnotes.

  ```javascript
  Utilities.formatCitation(5); // Returns "[5]"
  ```

- **`extractCitations(text: string): number[]`**: Extracts citation identifiers from a given text. This is helpful when parsing user messages or bot responses that include citations.

  ```javascript
  const citations = Utilities.extractCitations("Refer to sources [1], [2], and [5].");
  // Returns [1, 2, 5]
  ```

##### Code Example: Using Utility Functions

Below is an example demonstrating how to use some of the utility functions provided by the `Utilities` class in your bot application.

```javascript
const { Utilities } = require('teams-ai');

// Inside your message handler
app.message(async (context, next) => {
  const userMessage = context.activity.text;

  // Convert the user message to uppercase using a custom function
  const upperCaseMessage = userMessage.toUpperCase();

  // Truncate the message to a maximum length of 50 characters
  const snippet = Utilities.snippet(upperCaseMessage, 50);

  // Send the processed message back to the user
  await context.sendActivity(`You said: ${snippet}`);

  // Convert an object to a JSON string for logging
  const activityJson = Utilities.toString(context.activity, true);
  console.log(`Activity JSON: ${activityJson}`);

  await next();
});
```

In this example:

- **Text Manipulation**: The user's message is converted to uppercase and then truncated to ensure it doesn't exceed a specified length.
- **Logging**: The `toString` method with `asJson` set to `true` is used to create a formatted JSON string of the activity for logging purposes.
- **Utility Integration**: The `Utilities` class functions are seamlessly integrated into the message handling logic to simplify operations.

### 6.2. Streaming Responses

#### The `StreamingResponse` Class

The `StreamingResponse` class is designed to facilitate streaming responses to clients, enabling real-time data delivery and interaction within the Teams environment. This class allows developers to send a series of updates to the user within a single conversational turn, enhancing the interactivity and responsiveness of the bot.

Key features of the `StreamingResponse` class include:

- **Real-Time Updates**: Send incremental messages or data chunks to the user as they become available.
- **Improved User Experience**: Provide immediate feedback and keep the user engaged during long-running operations.
- **Flexible Message Queueing**: Queue informative updates and control the flow of messages being sent to the client.

Methods provided by the `StreamingResponse` class:

- **`queueInformativeUpdate(text: string)`**: Queues an informative message to be sent to the user. This can be used to notify the user about the progress of an operation.

  ```javascript
  streamingResponse.queueInformativeUpdate('Processing your request...');
  ```

- **`endStream()`**: Signals the end of the streaming response and sends any remaining messages in the queue.

  ```javascript
  streamingResponse.endStream();
  ```

##### Code Example: Sending Streaming Responses to Clients

Below is an example illustrating how to use the `StreamingResponse` class to send streaming responses within your bot application.

```javascript
const { StreamingResponse } = require('teams-ai');

// Inside your message handler
app.message(async (context, next) => {
  // Create a new streaming response instance
  const streamingResponse = new StreamingResponse(context);

  // Start a long-running operation asynchronously
  performLongRunningOperation(streamingResponse);

  await next();
});

// Function to simulate a long-running operation with streaming updates
async function performLongRunningOperation(streamingResponse) {
  // Queue an initial informative message
  streamingResponse.queueInformativeUpdate('Starting the operation...');

  // Simulate operation steps with delays
  await delay(2000); // Wait for 2 seconds
  streamingResponse.queueInformativeUpdate('Step 1 completed.');

  await delay(3000); // Wait for 3 seconds
  streamingResponse.queueInformativeUpdate('Step 2 completed.');

  await delay(1000); // Wait for 1 second
  streamingResponse.queueInformativeUpdate('Finalizing...');

  // Signal the end of the streaming response
  streamingResponse.endStream();
}

// Helper function to simulate a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

In this example:

- **Creating a Streaming Response**: An instance of `StreamingResponse` is created using the conversation context.
- **Queueing Updates**: Informative updates are queued at various stages of the long-running operation.
- **Asynchronous Processing**: The operation runs asynchronously, allowing the bot to send updates without blocking other processes.
- **Ending the Stream**: After all updates have been sent, `endStream` is called to finalize the streaming response.
- **Enhanced User Experience**: The user receives timely updates about the progress of their request, improving engagement and satisfaction.

**Key Points:**

- **Non-Blocking Operations**: Streaming responses enable your bot to handle long-running tasks without making the user wait for a single final response.
- **User Feedback**: Providing progress updates keeps the user informed and reduces uncertainty during processing delays.
- **Flexibility**: The `StreamingResponse` class can be integrated into various scenarios where real-time updates are beneficial.

---

By leveraging the `Utilities` and `StreamingResponse` classes, developers can enhance their bot applications with helpful functions and real-time interaction capabilities, resulting in more efficient code and a better user experience.

## 7. Authentication Modules

### 7.1. Overview of Authentication Classes

Authentication is a crucial aspect of bot development, ensuring secure access to bot functionalities and user data. The Teams AI library provides a set of authentication classes designed to facilitate various authentication mechanisms tailored to different contexts within Teams bots and applications. These classes handle the complexities of authentication, including token management, user sign-in flows, and integration with Teams-specific features.

The key authentication classes available in the Teams AI library are:

- **`OAuthBotAuthentication`**: Manages OAuth authentication flows for bots, facilitating user authentication via OAuth protocols. It handles prompting users to sign in and managing the token exchange process, ensuring secure and seamless user authentication.

- **`OAuthMessageExtensionAuthentication`**: Specifically designed to handle OAuth authentication for message extensions within Teams applications. It ensures that any actions taken via the message extension are performed by authenticated users.

- **`TeamsSsoBotAuthentication`**: Provides support for Single Sign-On (SSO) authentication in Teams, allowing users to authenticate seamlessly without needing to re-enter credentials. It leverages the user's existing Teams credentials to enable SSO for bots.

- **`AdaptiveCardAuthenticationBase`**: Serves as a base class for implementing authentication mechanisms in Adaptive Cards. It provides the foundational structure and methods needed to implement authentication flows when users interact with Adaptive Cards.

These classes work together to provide flexible and secure authentication solutions, enabling developers to build bots that require authenticated access to resources and personalized user experiences.

### 7.2. Implementing Authentication

#### Managing User Sign-In Flows

Implementing authentication in your bot involves managing user sign-in flows to ensure secure access to bot functionalities and data. The Teams AI library's authentication classes simplify this process by providing methods and interfaces to handle authentication seamlessly.

Below is an example of setting up OAuth authentication using the `OAuthBotAuthentication` class.

##### Code Example: Setting Up OAuth Authentication

```javascript
const { Application } = require('teams-ai');
const { MemoryStorage } = require('botbuilder');
const { OAuthBotAuthentication } = require('teams-ai');

// Create an instance of OAuthBotAuthentication with your OAuth settings
const oauthSettings = {
  connectionName: 'YourConnectionName', // The name of your OAuth connection
  scopes: ['User.Read'], // The scopes required for your bot
};

const authentication = new OAuthBotAuthentication(oauthSettings);

// Create the Application instance with authentication and storage configurations
const app = new Application({
  storage: new MemoryStorage(),
  authentication: authentication,
});

// Handle message activities
app.message(async (context, next) => {
  // Attempt to get the user token or start the sign-in process
  const tokenResponse = await app.getTokenOrStartSignIn(context);

  if (tokenResponse) {
    // User is authenticated, proceed with bot logic
    await context.sendActivity('You are now signed in!');
    // Implement your bot's functionality here, utilizing the user token
  } else {
    // Sign-in process has been initiated, no further action needed at this time
  }

  await next();
});

// Your adapter and server setup would go here
```

In this example:

- **OAuthBotAuthentication Initialization**: An instance of `OAuthBotAuthentication` is created with your specific OAuth configuration, including the connection name and scopes required.

- **Application Configuration**: The `Application` instance is created, incorporating the authentication instance and storage configuration.

- **Managing Sign-In Flow**: In the message handler, the `getTokenOrStartSignIn` method is used to attempt to retrieve a valid user token. If the user is not authenticated, the bot initiates the sign-in process.

- **Authenticated Logic**: Once the user is authenticated and a token is obtained, the bot can proceed with its functionality, utilizing the user's authenticated context.

---

By integrating the authentication classes provided by the Teams AI library, developers can efficiently implement secure authentication mechanisms in their bots, enhancing security and providing personalized experiences to users.

## 8. Embeddings and Models

### 8.1. Using Embeddings for Advanced AI Features

#### The `EmbeddingsModel` Interface

The `EmbeddingsModel` interface in the Teams AI library defines a standard for working with text embeddings—numerical representations of text that capture semantic meaning and relationships. Embeddings are essential for advanced AI features such as:

- **Semantic Search**: Finding relevant information based on the meaning of queries and documents.
- **Similarity Comparison**: Measuring how similar two pieces of text are in context and content.
- **Clustering and Classification**: Grouping similar texts together or categorizing them based on content.

By implementing the `EmbeddingsModel` interface, you can integrate various embedding models into your application, allowing you to harness powerful AI capabilities regardless of the underlying model provider.

#### The `OpenAIEmbeddings` Class

The `OpenAIEmbeddings` class is a concrete implementation of the `EmbeddingsModel` interface that utilizes OpenAI's embedding models. With `OpenAIEmbeddings`, you can generate high-quality embeddings for your text data, leveraging OpenAI's advanced language models.

**Key Features:**

- **Easy Integration**: Seamlessly integrate OpenAI's embeddings into your Teams application.
- **High-Quality Representations**: Generate embeddings that capture nuanced semantic relationships.
- **Customizable Parameters**: Configure model options such as the specific OpenAI embedding model to use.

**Example Usage:**

```javascript
const { OpenAIEmbeddings } = require('teams-ai');

// Initialize the OpenAIEmbeddings with your API key and desired model
const embeddingsModel = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
  model: 'text-embedding-ada-002',    // Specify the OpenAI embedding model
});

// Generate embeddings for a piece of text
const text = 'How to improve team collaboration within projects';
const embedding = await embeddingsModel.getEmbedding(text);

// Use the embedding for semantic search, similarity comparison, etc.
```

### 8.2. Models and Model Clients

#### `OpenAIModel`

The `OpenAIModel` class enables integration with OpenAI's language models for tasks like text completion, conversation generation, and more. It allows your application to generate AI-driven responses using OpenAI's GPT models.

**Key Features:**

- **Text Generation**: Produce coherent and contextually relevant text based on prompts.
- **Configurable Parameters**: Adjust settings such as temperature, max tokens, and model choice to fine-tune responses.
- **Seamless Integration**: Works with other components of the Teams AI library for a unified development experience.

**Example Usage:**

```javascript
const { OpenAIModel } = require('teams-ai');

const openAIModel = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4',          // Use the desired OpenAI model
  temperature: 0.7,
  maxTokens: 500,
});

// Generate a completion based on a prompt
const prompt = 'Explain the benefits of AI in education.';
const response = await openAIModel.complete(prompt);

// Use the response in your application
console.log(response);
```

#### `LlamaModel`

The `LlamaModel` class interfaces with Meta's Llama language models, providing an alternative to OpenAI's models for natural language processing tasks.

**Key Features:**

- **Alternative AI Provider**: Utilize Meta's Llama models for your AI needs.
- **Flexibility**: Choose models that best suit your application's requirements and constraints.

**Note:** Ensure you have access to Meta's Llama models and comply with their usage policies when integrating them into your application.

#### `TestModel` for Testing Purposes

The `TestModel` class is designed for testing and development, allowing you to simulate AI model interactions without relying on external services. It is particularly useful for:

- **Unit Testing**: Validate your application's logic in a controlled environment.
- **Development**: Work on your bot's features without incurring costs or requiring network access.

**Example Usage:**

```javascript
const { TestModel } = require('teams-ai');

const testModel = new TestModel({
  // Define how the test model should respond
  predefinedResponses: {
    'Hello!': 'Hi there!',
    'What is the capital of France?': 'The capital of France is Paris.',
  },
});

// Use the test model in your application during testing
```

### 8.3. Integrating Models into Your Application

Integrating AI models into your Teams application enhances its capabilities, allowing it to provide intelligent, context-aware responses to users. Here's how you can integrate the `OpenAIModel` into your bot.

#### Code Example: Using `OpenAIModel` with the Teams AI Library

```javascript
const { Application } = require('teams-ai');
const { MemoryStorage } = require('botbuilder');
const { OpenAIModel } = require('teams-ai');

// Initialize the OpenAIModel with your OpenAI API key and settings
const openAIModel = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-3.5-turbo', // Specify the OpenAI GPT model
  temperature: 0.7,
  maxTokens: 500,
});

// Create an instance of the Application with the OpenAIModel
const app = new Application({
  storage: new MemoryStorage(),
  aiOptions: {
    model: openAIModel,
  },
});

// Handle message activities using the AI model
app.message(async (context, next) => {
  const userMessage = context.activity.text;

  // Generate a response from the AI model
  const aiResponse = await openAIModel.complete(userMessage);

  // Send the AI-generated response back to the user
  await context.sendActivity(aiResponse);

  await next();
});

// Adapter and server setup (omitted for brevity)
// ...
```

**Explanation:**

- **Initialize the Model**: Create an instance of `OpenAIModel` with your API key and desired settings.
- **Configure the Application**: Pass the model instance to your application's AI options.
- **Handle Messages**: In your message handler, use the model to generate responses based on user input.
- **Respond to Users**: Send the AI-generated text back to the user, creating a conversational experience.

**Considerations:**

- **API Keys**: Securely manage your API keys and do not hardcode them in your source code.
- **Usage Limits**: Be mindful of API usage limits and costs associated with external AI services.
- **User Experience**: Ensure that AI-generated responses align with your application's purpose and provide value to users.

---

By integrating embeddings and AI models like `OpenAIModel` into your Teams application, you can deliver rich, intelligent experiences that engage users and meet complex interaction needs. Whether you're implementing semantic search, natural language understanding, or dynamic conversation generation, the Teams AI library provides the tools necessary to bring advanced AI capabilities to your bot.

## 9. Conclusion

### 9.1. Summary of Key Points

In this **Modules and API Reference** document, we have comprehensively explored the key components and functionalities of the Teams AI library, designed to simplify and enhance the development of intelligent bots and applications within Microsoft Teams and Microsoft 365 environments. The Teams AI library extends the Microsoft Bot Framework SDK by introducing advanced AI features, enabling developers to create bots that:

- **Interact Naturally with Users**: Utilize conversational AI to engage users in meaningful and context-aware dialogues.
- **Handle Complex Tasks and Workflows**: Implement sophisticated logic to manage tasks, processes, and user interactions efficiently.
- **Integrate Seamlessly with Teams Features**: Leverage capabilities such as Adaptive Cards, Message Extensions, and Meeting Events to enrich user experiences.

**Key Components Covered:**

- **Application Framework**: The `Application` and `ApplicationBuilder` classes provide a structured and flexible way to set up bot applications, manage incoming activities, and route messages to appropriate handlers. This framework simplifies configuration and enhances scalability and maintainability.

- **Adaptive Cards**: The `AdaptiveCards` class streamlines the creation and handling of Adaptive Cards, allowing developers to present rich, interactive content and collect user input in a visually appealing way.

- **Message Extensions**: The `MessageExtensions` class facilitates the development of message extensions, enabling bots to offer additional functionality such as search and action commands directly within the Teams interface.

- **Meetings and Events**: The `Meetings` class provides a structured approach to handling Teams meeting events, allowing bots to respond to meeting lifecycle events and participant activities, thereby enhancing collaboration during meetings.

- **Utilities and Helpers**: The `Utilities` class offers helpful functions for data manipulation, formatting, and parsing, while the `StreamingResponse` class enables real-time data delivery through streaming responses, improving user engagement during long-running operations.

- **Authentication Modules**: Authentication classes such as `OAuthBotAuthentication` and `TeamsSsoBotAuthentication` provide secure and flexible authentication mechanisms tailored to different contexts, ensuring secure access to bot functionalities and enhancing user satisfaction.

- **Embeddings and Models**: Interfaces and classes like `EmbeddingsModel` and `OpenAIModel` facilitate the integration of advanced AI models and embeddings into applications, empowering bots with capabilities like text completion, semantic search, and natural language understanding.

Throughout the document, we emphasized:

- **Simplifying Development**: By leveraging the structured components of the Teams AI library, developers can reduce complexity and focus on building rich features that enhance user experiences.

- **Enhancing User Interaction**: Utilizing features like Adaptive Cards and Message Extensions allows developers to create more engaging and interactive bots that meet users' needs effectively.

- **Integrating Advanced AI**: Incorporating AI models and embeddings enables bots to deliver intelligent, contextually relevant responses, meeting complex interaction requirements.

- **Ensuring Security and Scalability**: Implementing proper authentication and state management practices ensures bots are secure, reliable, and scalable across various scenarios.

### 9.2. Next Steps and Further Resources

With a solid understanding of the Teams AI library's modules and APIs, you are now well-equipped to develop or enhance your own Teams applications and bots. Here are some suggested next steps:

- **Explore Tutorials and Samples**: Dive into practical examples and tutorials provided in the documentation to see how the concepts are applied in real-world scenarios. Hands-on experience will deepen your understanding and help you implement features more effectively.

- **Leverage Community Resources**: Engage with the developer community through forums and discussions. Sharing knowledge and seeking advice can accelerate your development process and assist in overcoming challenges.

- **Contribute to the Teams AI Library**: Consider contributing to the library by submitting issues, feature requests, or code contributions. Collaboration helps improve the tools available to all developers and fosters a supportive community.

- **Stay Updated**: Keep an eye on the library's change log and version history to stay informed about updates and new features that can enhance your applications.

- **Review Best Practices**: Revisit best practices and security considerations to ensure your bot adheres to recommended development patterns and maintains high standards of quality and security.

**Further Resources:**

- **Official Teams AI Library Documentation**: Refer to the official documentation for in-depth guides, API references, and additional resources.

- **Microsoft Teams Developer Documentation**: Explore Microsoft's resources for developing applications and bots within Teams to gain broader insights and tools.

- **Bot Framework SDK Documentation**: Familiarize yourself with the Microsoft Bot Framework SDK, as the Teams AI library builds upon and extends its capabilities.

By harnessing the power of the Teams AI library and applying the knowledge gained from this document, you can create powerful, intelligent bots that significantly enhance collaboration and productivity within Microsoft Teams. We look forward to seeing the innovative solutions you develop and encourage you to contribute to the growing community of Teams developers.