# Local Corpus Thoughts

## 
The `Application` class and the `ApplicationBuilder` class are central components designed to simplify the creation, configuration, and management of a bot application within the Teams AI framework. They provide a structured way to set up the application's behavior, handle incoming activities, and route messages to the appropriate handlers.

### ApplicationBuilder Class

**Purpose**:
The `ApplicationBuilder` class serves as a fluent builder for creating and configuring an `Application` instance. It allows developers to specify various settings and components in a chained manner, promoting readability and ease of setup.

**Properties**:
- `_options`: A private property that holds partial configuration options (`ApplicationOptions<TState>`) for the application. It accumulates settings provided through the builder methods.

**Key Methods**:
1. **withStorage(storage: Storage): this**
   - Configures the storage system for managing the bot's state.
   - Example usage: `.withStorage(myStorageInstance)`

2. **withAIOptions(aiOptions: AIOptions<TState>): this**
   - Sets up the AI system for processing incoming messages, including models, planners, and other AI-related options.
   - Example usage: `.withAIOptions({ model: myAIModel, planner: myPlanner })`

3. **withAdaptiveCardOptions(adaptiveCardOptions: AdaptiveCardsOptions): this**
   - Configures the processing of Adaptive Card requests.
   - Example usage: `.withAdaptiveCardOptions({ ignoreUnknownActions: true })`

4. **withTaskModuleOptions(taskModuleOptions: TaskModulesOptions): this**
   - Sets up the handling of Task Module requests.
   - Example usage: `.withTaskModuleOptions({ ... })`

5. **withAuthentication(adapter: TeamsAdapter, authenticationOptions: AuthenticationOptions): this**
   - Configures user authentication settings, integrating with identity providers and managing user sign-in flows.
   - Example usage: `.withAuthentication(myAdapter, { connectionName: 'myConnection' })`

6. **withLongRunningMessages(adapter: TeamsAdapter, botAppId: string): this**
   - Enables the application to handle long-running messages.
   - Throws an error if `botAppId` is not provided.
   - Example usage: `.withLongRunningMessages(myAdapter, 'botAppId123')`

7. **setRemoveRecipientMention(removeRecipientMention: boolean): this**
   - Determines whether mentions of the bot's name should be removed from incoming messages.
   - Default is `true`.
   - Example usage: `.setRemoveRecipientMention(false)`

8. **setStartTypingTimer(startTypingTimer: boolean): this**
   - Configures whether the bot sends a typing indicator when a message is received.
   - Default is `true`.
   - Example usage: `.setStartTypingTimer(false)`

9. **withTurnStateFactory(turnStateFactory: () => TState): this**
   - Sets a custom factory for creating the turn state, which holds data specific to the current turn of conversation.
   - Example usage: `.withTurnStateFactory(() => new MyTurnState())`

10. **build(): Application<TState>**
    - Constructs and returns a new `Application` instance using the accumulated configuration options.
    - Example usage: `const app = builder.build()`

### Application Class

**Purpose**:
The `Application` class is the core of the bot application. It manages the routing of incoming activities to the appropriate handlers, handles the application's configuration, and processes messages according to the defined logic.

**Properties**:
- `_adapter`: Manages the bot's connection to the communication channel (e.g., Teams).
- `_options`: Contains the application's configuration, including AI options, storage, authentication, and more.
- `_routes`: Holds the mapping of activity types to their corresponding handlers.
- `_invokeRoutes`: Manages the handlers for invoke activities.
- `_typingTimer`: Manages the typing indicator timer.
- `_beforeTurn`: An array of handlers to execute before each turn.
- `_afterTurn`: An array of handlers to execute after each turn.
- `_conversations`: Tracks ongoing conversations to manage state and context.

**Key Methods for Configuration and Setup**:

1. **activity(type: string, handler: ActivityHandler<TState>): this**
   - Registers a handler for a specific activity type.
   - Example usage: `app.activity('message', myMessageHandler)`

2. **message(keyword: string, handler: ActivityHandler<TState>): this**
   - Sets up a handler for messages containing a specific keyword or matching a pattern.
   - Example usage: `app.message('help', myHelpHandler)`

3. **conversationUpdate(event: string, handler: ActivityHandler<TState>): this**
   - Handles conversation update events like members being added or removed.
   - Example usage: `app.conversationUpdate('membersAdded', myMembersAddedHandler)`

4. **withAIOptions(aiOptions: AIOptions<TState>): this**
   - Configures AI-related settings directly (alternative to using `ApplicationBuilder`).

5. **withStorage(storage: Storage): this**
   - Sets up the storage mechanism for the application.

**Key Methods for Handling Incoming Activities**:

1. **run(context: TurnContext): Promise<void>**
   - Dispatches an incoming activity to the registered handler based on the activity type.
   - Manages the execution sequence, including before and after turn handlers.
   - Example usage: `await app.run(turnContext)`

2. **sendProactiveActivity(conversationReference: Partial<ConversationReference>, activity: Partial<Activity> | string): Promise<void>**
   - Sends a proactive message to an existing conversation.
   - Example usage: `await app.sendProactiveActivity(conversationRef, 'Hello!')`

3. **continueConversationAsync(conversationReference: Partial<ConversationReference>, logic: (context: TurnContext) => Promise<void>): Promise<void>**
   - Initiates a proactive conversation and executes the provided logic.
   - Example usage: `await app.continueConversationAsync(conversationRef, async (context) => { /* ... */ })`

4. **fileConsentAccept(handler: ActivityHandler<TState>): this**
   - Registers a handler for when a user accepts a file consent card.
   - Example usage: `app.fileConsentAccept(myFileAcceptHandler)`

5. **fileConsentDecline(handler: ActivityHandler<TState>): this**
   - Handles the event when a user declines a file consent card.
   - Example usage: `app.fileConsentDecline(myFileDeclineHandler)`

6. **messageReactions(handler: ActivityHandler<TState>): this**
   - Sets up a handler for message reactions like likes or emojis.
   - Example usage: `app.messageReactions(myReactionHandler)`

7. **feedbackLoop(handler: ActivityHandler<TState>): this**
   - Registers a handler to manage feedback loops when a user interacts with AI responses.
   - Example usage: `app.feedbackLoop(myFeedbackHandler)`

8. **handoff(handler: ActivityHandler<TState>): this**
   - Handles the handoff of conversations, useful when transferring between bots or services.
   - Example usage: `app.handoff(myHandoffHandler)`

**Utility Methods**:

1. **turn(event: 'beforeTurn' | 'afterTurn', handler: ActivityHandler<TState>): this**
   - Registers handlers to execute before or after the main turn logic.
   - Example usage: `app.turn('beforeTurn', myBeforeTurnHandler)`

2. **getTokenOrStartSignIn(context: TurnContext, connectionName: string, signInResource: any): Promise<string>**
   - Manages user authentication, retrieving an access token or starting the sign-in process.
   - Example usage: `const token = await app.getTokenOrStartSignIn(context, 'myConnection', signInResource)`

3. **stopTypingTimer(context: TurnContext): void**
   - Manually stops the typing indicator timer if it's running.
   - Example usage: `app.stopTypingTimer(context)`

**Internal Methods and Properties**:
- **callEventHandlers(context: TurnContext, state: TState, handlers: ActivityHandler<TState>[]): Promise<boolean>**
  - Calls event handlers in sequence and manages their execution flow.
- **startLongRunningCall(context: TurnContext, state: TState, handler: ActivityHandler<TState>): Promise<void>**
  - Handles messages that may require longer processing times.
- **registerConversation(context: TurnContext): void**
  - Registers a conversation to manage its state across turns.
- **unregisterConversation(context: TurnContext): void**
  - Unregisters a conversation when it's no longer active.

**Usage Example**:

```typescript
const app = new ApplicationBuilder()
  .withStorage(new MemoryStorage())
  .withAIOptions({ model: myAIModel })
  .setRemoveRecipientMention(true)
  .build();

app.message('hello', async (context, state) => {
  await context.sendActivity('Hello! How can I assist you today?');
});

app.activity('conversationUpdate', async (context, state) => {
  // Handle new members added to the conversation
});

adapter.processActivity(req, res, async (context) => {
  await app.run(context);
});
```

**Error Handling**:
- The `Application` class may throw exceptions if required configurations are missing or invalid. For example, if `botAppId` is not provided when enabling long-running messages, an error is thrown.

**Integration with Authentication**:
- The `Application` class can be configured with authentication settings to manage user sign-in flows. Methods like `getTokenOrStartSignIn` help in obtaining user tokens and handling sign-in requests.

**Handling Message Reactions and Feedback**:
- The bot can respond to message reactions (e.g., likes, emojis) and feedback from users. Handlers for these events allow the bot to be more interactive and responsive to user actions.

### Conclusion

The `Application` and `ApplicationBuilder` classes work together to provide a flexible and powerful way to set up a bot application within the Teams AI framework. By using the builder pattern, developers can easily configure various aspects of the application, such as AI models, storage, authentication, and activity handling, while the `Application` class provides the core functionality for processing incoming activities and routing messages to the appropriate handlers. This design promotes clean code, scalability, and maintainability in bot development.

##

The `AdaptiveCards` class is a key component designed to streamline the handling of adaptive cards within applications, particularly those built using the Teams AI library. Adaptive cards are rich, interactive UI elements that can present information and collect user input in a structured and visually appealing way.

**Purpose and Functionality:**

The primary goal of the `AdaptiveCards` class is to provide a fluent and intuitive interface for registering handlers related to adaptive card actions, submissions, and queries. It simplifies the process of managing how an application responds to user interactions with adaptive cards by abstracting the underlying complexities.

**Constructor:**

```typescript
class AdaptiveCards<TState extends TurnState> {
  constructor(private readonly app: Application<TState>) {}
}
```

- The constructor accepts an instance of `Application<TState>`, which represents the application's state management and routing system. This integration allows the `AdaptiveCards` class to register handlers directly within the application's routing framework.

**Key Methods:**

1. **actionExecute(verb, handler):**

   - **Purpose:** Registers a handler for `Action.Execute` events initiated by adaptive cards.
   - **Parameters:**
     - `verb`: Specifies the action verb to match. It can be a string, an array of strings, a regular expression, or a function that determines a match.
     - `handler`: An asynchronous function that processes the action when the specified verb is triggered.
   - **Usage Example:**

     ```typescript
     adaptiveCards.actionExecute('approveRequest', async (context, state) => {
       // Logic to handle approval request
       return {
         type: 'AdaptiveCard',
         // ...card content
       };
     });
     ```

2. **actionSubmit(verb, handler):**

   - **Purpose:** Registers a handler for `Action.Submit` events from adaptive cards.
   - **Parameters:**
     - `verb`: Similar to `actionExecute`, it specifies the verb or pattern to match for submissions.
     - `handler`: An asynchronous function that processes the submission data.
   - **Usage Example:**

     ```typescript
     adaptiveCards.actionSubmit('submitForm', async (context, state) => {
       const formData = context.activity.value;
       // Process the submitted form data
     });
     ```

3. **search(dataset, handler):**

   - **Purpose:** Adds a handler for `Data.Query` requests in adaptive cards, enabling dynamic search functionality within input controls like `Input.ChoiceSet`.
   - **Parameters:**
     - `dataset`: Identifies the dataset being queried, which can be a string or regular expression.
     - `handler`: An asynchronous function that handles the search query and returns matching results.
   - **Usage Example:**

     ```typescript
     adaptiveCards.search('productSearch', async (context, state, query) => {
       const results = await searchProducts(query);
       return results.map(item => ({
         title: item.name,
         value: item.id,
       }));
     });
     ```

**Handling Actions and Submissions:**

- The `AdaptiveCards` class uses private helper functions like `createActionExecuteSelector` and `createActionSubmitSelector` to determine if incoming activities match registered verbs. These selectors ensure that handlers are invoked only when appropriate actions occur.
- When an action is received, the class verifies the activity type and extracts the necessary data, such as the `verb` and any associated `data`. Handlers then use this information to perform application-specific logic.

**Response Management:**

- The class can handle different types of responses based on the handler's return value:

  - **Adaptive Cards:** If the handler returns an adaptive card object, it can be sent back to the user or replace an existing card.
  - **Messages:** Handlers can also return text messages to be sent to the user.
  - **No Response:** If the handler doesn't return a value, no response is sent.

- The presentation of response cards is controlled by the `AdaptiveCardActionExecuteResponseType` enum, which includes options like:

  - `REPLACE_FOR_INTERACTOR`: Replaces the card only for the user who interacted.
  - `REPLACE_FOR_ALL`: Replaces the card for all users in the conversation.
  - `NEW_MESSAGE_FOR_ALL`: Sends the response as a new message to all users.

**AdaptiveCardsOptions Interface:**

- Developers can customize the behavior of adaptive card handling using the `AdaptiveCardsOptions` interface. Important properties include:

  - `actionSubmitFilter`: Determines which `Action.Submit` handler to invoke based on specific criteria.
  - `actionExecuteResponseType`: Specifies how the response from an `Action.Execute` should be presented.

**Designing Adaptive Card Templates:**

- While the `AdaptiveCards` class focuses on handling the logic behind adaptive cards, designing the card templates themselves involves defining the JSON structure that represents the card's layout and content.
- Developers can create functions or utilize tools to generate adaptive card templates, which can then be sent to users through the bot framework.
- Example functions for creating card templates might include:

  ```typescript
  function createApprovalCard(requestDetails) {
    return {
      type: 'AdaptiveCard',
      body: [
        // ...card elements
      ],
      actions: [
        {
          type: 'Action.Execute',
          title: 'Approve',
          verb: 'approveRequest',
        },
        {
          type: 'Action.Execute',
          title: 'Reject',
          verb: 'rejectRequest',
        },
      ],
    };
  }
  ```

**Integration with the Application:**

- By integrating the `AdaptiveCards` class with the main `Application` instance, developers can leverage the application's routing and state management features.
- Handlers registered through `AdaptiveCards` have access to the `TurnContext` and application state (`TurnState`), allowing them to:

  - Access user and conversation data.
  - Call other services or APIs as needed.
  - Maintain consistency across different parts of the application.

**Example in a Bot Application:**

In a bot scenario, the `AdaptiveCards` class is used to handle interactions with users:

- **Listening for Dynamic Searches:**

  ```typescript
  adaptiveCards.search('npmSearch', async (context, state, query) => {
    const packages = await searchNpmRegistry(query);
    return packages.map(pkg => ({
      title: pkg.name,
      value: pkg.name,
    }));
  });
  ```

- **Handling Submissions:**

  ```typescript
  adaptiveCards.actionSubmit('addPackage', async (context, state) => {
    const selectedPackage = context.activity.value.data;
    // Logic to add the package to a list or perform other actions
  });
  ```

**Benefits:**

- **Simplifies Development:** Provides a straightforward way to manage adaptive card interactions without dealing with the low-level details.
- **Enhances Maintainability:** Centralizes the handling of adaptive card actions, making the codebase easier to maintain and extend.
- **Improves User Experience:** Enables the creation of rich, interactive cards that can respond dynamically to user input.

**Conclusion:**

The `AdaptiveCards` class is an essential tool for developers working with adaptive cards in applications. By offering methods to register handlers for actions, submissions, and searches, it facilitates responsive and interactive user interfaces. Additionally, it seamlessly integrates with the application's routing and state management, ensuring a cohesive development experience.

Through its flexible design and powerful features, the `AdaptiveCards` class empowers developers to build applications that provide engaging and dynamic interactions with users, leveraging the full potential of adaptive cards.

##

The `MessageExtensions` class is an integral part of the Microsoft Teams AI SDK, designed to facilitate the development of message extensions within Teams applications. It provides a structured and fluent interface for registering handlers that respond to various invoke activities related to message extensions, allowing developers to seamlessly implement search and action commands.

## Overview

- **Purpose**: Enables the extension of Teams applications by handling message extension activities.
- **Instantiation**: The class is instantiated as part of the `Application` class.
- **Construction**: Takes an instance of `Application<TState>` in its constructor to register handlers within the application context.

## Key Methods and Functionalities

### 1. `anonymousQueryLink(handler)`

- **Description**: Registers a handler for anonymous link unfurling.
- **Usage**: Triggered when a user pastes a link into the compose box, which needs to be unfurled without user context.
- **Handler Parameters**:
  - `context`: The current turn context.
  - `state`: The application's state.
  - `query`: Contains the URL to be unfurled.

### 2. `botMessagePreviewEdit(commandId, handler)`

- **Description**: Registers a handler for the 'edit' action on a message preview.
- **Usage**: Triggered when a user opts to edit a message generated by a message extension before sending.
- **Handler Parameters**:
  - `context`
  - `state`
  - `previewDetails`: Contains details of the message to be edited.

### 3. `botMessagePreviewSend(commandId, handler)`

- **Description**: Registers a handler for the 'send' action on a message preview.
- **Usage**: Triggered when a user sends a message after previewing it.
- **Handler Parameters**:
  - `context`
  - `state`
  - `previewDetails`

### 4. `fetchTask(commandId, handler)`

- **Description**: Registers a handler for fetching a task module in an action-based message extension.
- **Usage**: Triggered when a user initiates an action that requires additional user input.
- **Handler Parameters**:
  - `context`
  - `state`
  - `action`: Contains command info and data payload.

### 5. `submitAction(commandId, handler)`

- **Description**: Registers a handler for submitting data from an action-based message extension.
- **Usage**: Triggered when a user submits data from a task module.
- **Handler Parameters**:
  - `context`
  - `state`
  - `action`: Contains submitted data.
- **Response Handling**: Can return messages, Adaptive Cards, or task modules based on the submitted data.

### 6. `query(commandId, handler)`

- **Description**: Registers a handler for search-based message extensions.
- **Usage**: Triggered when a user performs a search within the message extension.
- **Handler Parameters**:
  - `context`
  - `state`
  - `query`: Contains search parameters.

### 7. `queryLink(handler)`

- **Description**: Registers a handler for link unfurling in message extensions.
- **Usage**: Triggered when a user sends a message containing a link that the extension can process.
- **Handler Parameters**:
  - `context`
  - `state`
  - `query`: Contains the URL to be processed.

### 8. `selectItem(handler)`

- **Description**: Registers a handler for item selection in search-based message extensions.
- **Usage**: Triggered when a user selects an item from search results.
- **Handler Parameters**:
  - `context`
  - `state`
  - `item`: The selected item's data.

### 9. `queryUrlSetting(handler)`

- **Description**: Registers a handler to fetch configuration settings URL for a message extension.
- **Usage**: Triggered when the extension needs to display a settings page.
- **Handler Parameters**:
  - `context`
  - `state`
  - `query`: Request details for the settings URL.

### 10. `configureSettings(handler)`

- **Description**: Registers a handler for applying settings to a message extension.
- **Usage**: Triggered when a user submits settings from the configuration page.
- **Handler Parameters**:
  - `context`
  - `state`
  - `config`: Submitted configuration data.

### 11. `handleOnButtonClicked(handler)`

- **Description**: Registers a handler for button clicks within message extension cards.
- **Usage**: Triggered when a user interacts with a button in an Adaptive Card returned by the message extension.
- **Handler Parameters**:
  - `context`
  - `state`
  - `buttonData`: Data associated with the button click.

## Handling Invoke Activities

The `MessageExtensions` class handles invoke activities by:

- **Activity Type Check**: Ensures that the incoming activity is of the `invoke` type.
- **Invoke Name Matching**: Uses the `MessageExtensionsInvokeNames` enum to match the specific invoke activity name.
- **Command ID Mapping**: Maintains mappings between command IDs and their respective handlers.

### Invoke Activity Names

Some of the invoke activity names defined in `MessageExtensionsInvokeNames` include:

- `ANONYMOUS_QUERY_LINK_INVOKE`: For anonymous link unfurling.
- `FETCH_TASK_INVOKE`: For fetching task modules.
- `QUERY_INVOKE`: For handling search queries.
- `QUERY_LINK_INVOKE`: For link unfurling.
- `SUBMIT_ACTION_INVOKE`: For submitting data from task modules.
- `QUERY_SETTING_URL_INVOKE`: For fetching settings URLs.
- `SETTING_INVOKE`: For applying configurations.
- `ON_CARD_BUTTON_CLICKED_INVOKE`: For button clicks within cards.

## Internal Mechanisms

### Command Registration

- **Fluent Interface**: Allows chaining of method calls for registering handlers.
- **Command IDs**: Used to differentiate between multiple commands of the same type.

### Response Handling

- **Private Methods**: Such as `returnSubmitActionResponse` to format and send responses appropriately.
- **Response Types**: Can handle multiple types of responses including messages, Adaptive Cards, and task modules.

### Utility Functions

- **`createTaskSelector`**: Helps create route selectors for task module commands.
- **`matchesPreviewAction`**: Checks if the bot message preview action matches a specified action.

## Extending Functionality with Message Extensions

The class allows developers to:

- **Implement Custom Logic**: By registering handlers for various invoke activities.
- **Enhance User Interaction**: Through actions like link unfurling, search results, and task modules.
- **Provide Dynamic Content**: By responding to user inputs and interactions in real-time.

## Implementing Search and Action Commands

### Search Commands

- **Methods Involved**: `query` and `selectItem`.
- **Process**:
  1. User performs a search using the message extension.
  2. `query` handler processes the query and returns search results.
  3. If the user selects an item, the `selectItem` handler processes the selection.

### Action Commands

- **Methods Involved**: `fetchTask` and `submitAction`.
- **Process**:
  1. User initiates an action that requires additional input.
  2. `fetchTask` handler returns a task module for user input.
  3. User submits the form in the task module.
  4. `submitAction` handler processes the data and performs the necessary action.

## Example Usage

### Registering a Search Command Handler

```javascript
messageExtensions.query('searchCommand', async (context, state, query) => {
  // Process the search query
  const results = await searchDatabase(query.parameters);
  // Return results as attachments
  return {
    composeExtension: {
      type: 'result',
      attachmentLayout: 'list',
      attachments: results
    }
  };
});
```

### Registering an Action Command Handler

```javascript
messageExtensions.fetchTask('createTask', async (context, state, action) => {
  // Return a task module for user input
  return {
    task: {
      type: 'continue',
      value: {
        title: 'Create New Task',
        height: 'small',
        width: 'medium',
        url: 'https://yourapp.com/taskModule'
      }
    }
  };
});

messageExtensions.submitAction('createTask', async (context, state, action) => {
  // Process submitted data
  const taskData = action.data;
  await createNewTask(taskData);
  // Return a message or card to confirm creation
  return {
    composeExtension: {
      type: 'result',
      attachmentLayout: 'list',
      attachments: [confirmationCard]
    }
  };
});
```

## Conclusion

The `MessageExtensions` class provides a robust framework for handling message extensions in Microsoft Teams applications. By offering a variety of methods to register handlers for different invoke activities, it allows developers to enhance their applications with rich interactive features, such as:

- **Search-Based Extensions**: Enable users to search external systems directly from Teams.
- **Action-Based Extensions**: Allow users to perform actions that might involve workflows or integrations.
- **Link Unfurling**: Automatically provide previews of links shared within Teams.

By carefully handling invoke activities and managing responses, the `MessageExtensions` class ensures that Teams applications can offer sophisticated user experiences that are both responsive and contextually relevant.

##

The `Meetings` class is a component within the Teams AI framework designed to handle various Teams meeting events, such as when a meeting starts or ends, and when participants join or leave a meeting. It provides a structured way to register handlers for these events, ensuring that your application can respond appropriately to meeting-related activities.

**Properties:**

- **`_app`**: A private, readonly property that holds an instance of the `Application<TState>` class. This instance is passed to the `Meetings` class via its constructor and is used to add routes for handling meeting events.

**Methods:**

1. **`start(handler)`**:

   - **Purpose**: Handles meeting start events.
   - **Parameters**: Accepts a `handler` function that will be called when a meeting start event occurs.
   - **Functionality**:
     - Defines a selector function that checks if the incoming activity meets the following criteria:
       - `activity.type` is `Event`.
       - `activity.channelId` is `msteams`.
       - `activity.name` is `application/vnd.microsoft.meetingStart`.
     - When the criteria are met, the handler function is invoked with the meeting details, which may include properties like `meetingType`, `startTime`, and `endTime`.

2. **`end(handler)`**:

   - **Purpose**: Handles meeting end events.
   - **Parameters**: Accepts a `handler` function that will be called when a meeting end event occurs.
   - **Functionality**:
     - Similar to the `start` method, but the selector checks for `activity.name` as `application/vnd.microsoft.meetingEnd`.
     - Invokes the handler when a meeting end event is received.

3. **`participantsJoin(handler)`**:

   - **Purpose**: Handles events when participants join a meeting.
   - **Parameters**: Accepts a `handler` function that will be called when participants join.
   - **Functionality**:
     - Uses a selector to check:
       - `activity.type` is `Event`.
       - `activity.channelId` is `msteams`.
       - `activity.name` is `application/vnd.microsoft.meetingParticipantsJoin`.
     - Invokes the handler with details about the participants who joined.

4. **`participantsLeave(handler)`**:

   - **Purpose**: Handles events when participants leave a meeting.
   - **Parameters**: Accepts a `handler` function that will be called when participants leave.
   - **Functionality**:
     - Uses a selector similar to `participantsJoin`, but checks for `activity.name` as `application/vnd.microsoft.meetingParticipantsLeave`.
     - Invokes the handler with details about the participants who left.

**Implementation Details:**

- Each method adds a route to the application using the `_app.addRoute` method. This method associates the selector (which defines the conditions under which the handler should be invoked) with a wrapper function that calls the provided handler.
- The selectors ensure that handlers are only invoked when the incoming activity matches the specific event type and originates from the Teams channel (`msteams`).
- By structuring event handling in this way, the `Meetings` class ensures that your application responds accurately to meeting events without interfering with other types of activities.

**Usage Example:**

To use the `Meetings` class, you would create an instance by passing your application instance to it and then register handlers for the events you're interested in:

```javascript
const meetings = new Meetings(app);

meetings.start(async (context, meeting) => {
  // Handle meeting start event
});

meetings.end(async (context, meeting) => {
  // Handle meeting end event
});

meetings.participantsJoin(async (context, participants) => {
  // Handle participants joining
});

meetings.participantsLeave(async (context, participants) => {
  // Handle participants leaving
});
```

**Summary:**

The `Meetings` class provides a convenient and organized way to handle Teams meeting events within your application. By offering methods to register handlers for meeting start, end, participant join, and participant leave events, it enables developers to implement custom logic that responds to meeting dynamics in real-time.

##

The `Utilities` class provides a collection of helper functions designed to manipulate and format data, particularly text and objects. This class includes methods for converting values to strings, clipping text without cutting off words, formatting citation references, and extracting citations from text.

### Methods and Properties

1. **`toString(value: any, asJson?: boolean): string`**

   - **Description**: Converts various types of values into their string representation.
   - **Features**:
     - Handles different data types such as numbers, strings, booleans, objects, arrays, dates, `undefined`, and `null`.
     - When converting objects:
       - If the object is simple, it converts it to YAML format.
       - If the object is complex or deeply nested, it converts it to JSON format.
       - Optionally forces conversion to JSON if `asJson` parameter is set to `true`.
     - Ensures that the string representation is concise by choosing the shorter format between JSON and YAML.

2. **`snippet(text: string, maxLen: number): string`**

   - **Description**: Truncates a given text to a specified maximum length without cutting off words in the middle.
   - **Features**:
     - Clips the text at the last complete word within the `maxLen` limit.
     - Appends an ellipsis (`...`) to indicate that the text has been truncated.
     - Prevents abrupt or awkward cutting of words, ensuring readability.

3. **`formatCitationsResponse(response: string): string`**

   - **Description**: Formats citation tags within a text to a simplified numeric format.
   - **Features**:
     - Converts citation tags from formats like `[doc123]`, `[docs456]`, or `[doc(s)789]` to a standardized format `[123]`, `[456]`, or `[789]`.
     - Simplifies the citation references for consistency and easier processing.
     - Useful when working with generated text that includes citations from various documents.

4. **`getUsedCitations(text: string, citations: ClientCitation[]): ClientCitation[] | undefined`**

   - **Description**: Extracts and returns the list of citations that are actually referenced in the provided text.
   - **Features**:
     - Scans the text using regular expressions to find citation patterns like `[1]`, `[2]`, etc.
     - Removes duplicate citation references to ensure each citation is listed only once.
     - Matches the extracted citation numbers with the provided list of `ClientCitation` objects.
     - Returns an array of `ClientCitation` instances that correspond to the citations used in the text.
     - Returns `undefined` if no citations are found in the text.

### Common Helper Functions

- **Data Conversion**:
  - The `toString` method helps in converting different data types into strings, handling complexities such as dates and nested objects.
  - Automatically decides between JSON and YAML formats for objects to provide the shortest and most readable representation.

- **Text Manipulation**:
  - The `snippet` method is useful for creating previews or summaries of text content without breaking words, which enhances user experience.
  - By adding an ellipsis, it clearly indicates that the text has been truncated.

- **Citation Formatting and Parsing**:
  - The `formatCitationsResponse` method standardizes citation tags, which is particularly helpful when processing text from language models or documents with inconsistent citation formats.
  - The `getUsedCitations` method aids in identifying which citations are relevant to a particular piece of text, facilitating tasks like generating reference lists or verifying sources.

### Formatting and Parsing Utilities

- **String Representation**:
  - Efficiently converts various values to strings for logging, display, or serialization purposes.
  - Handles edge cases such as `undefined` or `null` values gracefully.

- **Text Clipping**:
  - Provides a user-friendly way to shorten text without losing word integrity.
  - Prevents partial words, which can cause confusion or misinterpretation.

- **Citation Handling**:
  - Simplifies complex citation references, making them easier to read and process.
  - Ensures that extracted citations correspond accurately to their references in the text.

The `Utilities` class plays a crucial role in applications that require robust handling of data conversion, text processing, and citation management. Its methods are designed to be versatile and efficient, catering to a wide range of input types and scenarios.

##

The `StreamingResponse` class is a helper designed to facilitate streaming responses in a conversational application. It allows developers to send a series of updates to the client within a single response, enabling a more interactive and real-time communication experience.

### Purpose and Usage

The primary purpose of the `StreamingResponse` class is to handle scenarios where a response to a user cannot be provided instantly and needs to be delivered in parts. This is common in applications that perform time-consuming operations or generate content incrementally. By streaming updates, the application can keep the user informed and engaged throughout the process.

The typical sequence of using the `StreamingResponse` class involves:

1. **Queueing Informative Updates**: Sending initial messages to inform the user that the process has started.
2. **Queueing Text Chunks**: Sending portions of the final message as they become available.
3. **Ending the Stream**: Sending the final message to conclude the interaction.

### Properties

- **_context**: Holds the context for the current conversation turn with the user, typically used to interact with the messaging platform.
- **_nextSequence**: An internal counter initialized to `1`, used to track the order of updates sent to the client.
- **_streamId**: Stores the unique identifier of the current streaming response, useful for maintaining state across multiple updates.
- **_message**: Accumulates the full text of the message being streamed, allowing for reconstruction of the complete message at any time.
- **_attachments**: An array that can hold any attachments (like images or files) to be sent with the final message.
- **_ended**: A boolean flag indicating whether the streaming has concluded. It prevents further updates once the stream has ended.
- **_queue**: An internal queue of activities to be sent to the client. It stores functions that create partial activities for deferred execution.

### Methods

- **queueInformativeUpdate(text: string)**: Queues an informative message to be sent to the user. This is typically used to notify the user that a long-running process has begun or to provide status updates.

- **queueTextChunk(text: string)**: Queues a chunk of text to be sent as part of the streaming response. Each chunk is sent in sequence, creating the effect of streaming text to the user.

- **endStream()**: Signals the end of the streaming response. This method sends the final message, incorporating all accumulated text and any attachments set previously. After calling `endStream()`, no further updates can be queued.

- **setAttachments(attachments: Attachment[])**: Sets the attachments to be included with the final message sent when `endStream()` is called.

- **getMessage()**: Retrieves the most recently streamed message text. This can be useful for logging or auditing purposes.

- **Private Methods**:
  - **queueNextChunk()**: Internally used to queue the next piece of text to be sent to the client.
  - **queueActivity(factory: () => Partial<Activity>)**: Queues an activity (message) to be sent. The factory function generates the activity when it's dequeued.
  - **drainQueue()**: Processes the queued activities and sends them to the client sequentially.
  - **sendActivity(activity: Partial<Activity>)**: Sends a single activity to the client and records the `streamId` if one is returned.

### Error Handling

The `StreamingResponse` class includes checks to prevent improper usage:

- If an attempt is made to queue updates or text chunks after the stream has ended (i.e., after `endStream()` has been called), the class will throw an error with the message: "The stream has already ended." This ensures that the streaming sequence remains logical and that no extraneous messages are sent to the user.

### Example Usage

Below is a high-level example of how the `StreamingResponse` class might be used in an application:

```javascript
// Assume 'context' is the current turn context from the bot framework
const streamingResponse = new StreamingResponse(context);

// Start by sending an informative update
streamingResponse.queueInformativeUpdate("Processing your request...");

// Queue chunks of text as they become available
streamingResponse.queueTextChunk("Here is the first part of the information you requested. ");
streamingResponse.queueTextChunk("Adding more details as we process further. ");

// Optionally, set attachments to include with the final message
streamingResponse.setAttachments([/* array of attachment objects */]);

// End the stream by sending the final message
await streamingResponse.endStream();
```

In this example, the user receives updates that keep them engaged while the application processes their request. The user first receives an informative message, then incremental updates, and finally the complete message with any attachments.

### Conclusion

The `StreamingResponse` class is a useful tool for applications that need to provide users with real-time updates during long-running operations. By managing the sequence of messages and handling the complexities of streaming responses, it enhances user experience and keeps the interaction smooth and responsive.

##

The authentication classes—`OAuthBotAuthentication`, `OAuthMessageExtensionAuthentication`, `TeamsSsoBotAuthentication`, and `AdaptiveCardAuthenticationBase`—are designed to handle various authentication scenarios within Microsoft Teams bots and applications. Each class caters to specific contexts and provides methods and properties essential for implementing secure authentication flows.

---

### **`OAuthBotAuthentication`**

**Overview:**

`OAuthBotAuthentication` is responsible for handling OAuth authentication flows in the context of Teams bots. It facilitates user authentication via OAuth protocols, prompting users to sign in and managing the token exchange process.

**Key Methods and Properties:**

- **Constructor:**
  - Initializes with parameters:
    - **Application Object:** The bot application instance.
    - **OAuth Settings:** Configuration details for OAuth.
    - **Setting Name:** Identifier for specific settings.
    - **Optional Storage Object:** For storing state data.

- **`runDialog()`:**
  - Initiates or continues the OAuth authentication dialog.
  - Creates a dialog context, continues existing dialogs, or starts a new one with an OAuth prompt.
  - Manages the user interaction needed for authentication.

- **`continueDialog()`:**
  - Continues an existing OAuth authentication dialog.
  - Uses the dialog context to maintain state across turns in the conversation.

- **`createDialogContext()`:**
  - Generates a new `DialogContext` for managing dialog state.
  - Utilizes the turn context, state, and dialog state property.

- **`createOAuthCard()`:**
  - Creates an `OAuthCard` to be presented to the user.
  - Incorporates sign-in resources and OAuth settings to facilitate user sign-in.

**Authentication Mechanism:**

- **OAuth Flow:** Engages users in an OAuth sign-in process, presenting an `OAuthCard` that users can interact with to authenticate.
- **Token Exchange Middleware:** Utilizes middleware (`FilteredTeamsSSOTokenExchangeMiddleware`) to handle token exchange events, ensuring only relevant tokens are processed.

---

### **`OAuthMessageExtensionAuthentication`**

**Overview:**

`OAuthMessageExtensionAuthentication` handles authentication for message extensions within Teams. It's designed for scenarios where a message extension requires user authentication before performing actions.

**Key Methods and Properties:**

- **`authenticate()`:**
  - Manages the authentication process when a user interacts with a message extension.
  - Ensures that any actions taken via the message extension are performed by authenticated users.

**Authentication Mechanism:**

- **Message Extension Context:** Integrates OAuth authentication specifically for message extensions, prompting users to sign in if they attempt to use an extension requiring authentication.
- **Inheritance:** Extends `MessageExtensionAuthenticationBase`, allowing for shared functionality across different message extension authentication scenarios.

---

### **`TeamsSsoBotAuthentication`**

**Overview:**

`TeamsSsoBotAuthentication` provides authentication using Teams Single Sign-On (SSO) for bots. It enables seamless authentication by leveraging the user's existing Teams credentials, reducing friction in the user experience.

**Key Methods and Properties:**

- **Constructor:**
  - Parameters include:
    - **Application Object**
    - **Teams SSO Settings (`TeamsSsoSettings`):** Contains scopes and MSAL (Microsoft Authentication Library) configuration.
    - **Setting Name**
    - **MSAL Object**
    - **Optional Storage Object**

- **`runDialog()`:**
  - Starts or continues the SSO authentication dialog.
  - Manages the flow required to authenticate a user via Teams SSO.

- **`continueDialog()`:**
  - Continues an existing SSO dialog, maintaining the authentication process across conversation turns.

- **`tokenExchangeRouteSelector()`:**
  - Determines if an incoming token exchange activity should be processed.
  - Validates the token exchange ID against a regular expression to ensure it's appropriate for processing.

- **`createSsoDialogContext()`:**
  - Establishes the context for the SSO dialog.
  - Adds the SSO prompt and orchestrates the steps involved in the token exchange process.

- **`shouldDedup()`:**
  - Checks whether response deduplication is necessary to avoid conflicts during storage operations.
  - Helps manage idempotency in token exchange responses.

- **`getStorageKey()`:**
  - Retrieves the key used for storing token exchange state.
  - Ensures that token exchange activities are correctly tracked and managed.

**Authentication Mechanism:**

- **Teams SSO Integration:** Automatically authenticates users who are already signed into Teams, streamlining the process without requiring additional credentials.
- **Token Management:** Handles token exchange securely, validating and storing tokens as needed.
- **Dialog Management:** Uses dialogs to manage the flow of authentication conversations, ensuring that users are guided through necessary steps.

---

### **`AdaptiveCardAuthenticationBase`**

**Overview:**

`AdaptiveCardAuthenticationBase` serves as a foundation for authentication mechanisms involving Adaptive Cards. It provides the basic structure and methods needed to implement authentication flows when users interact with Adaptive Cards.

**Key Methods and Properties:**

- **`authenticate()`:**
  - Manages the authentication process for activities related to Adaptive Cards.
  - Ensures that users are authenticated before certain actions within an Adaptive Card are processed.

- **`isValidActivity()`:**
  - Checks if the incoming activity is valid for authentication (e.g., correct type and name).
  - Validates that the activity is appropriate for triggering authentication logic.

**Authentication Mechanism:**

- **Adaptive Card Context:** Enables authentication flows in scenarios where users interact with Adaptive Cards that require authentication, such as submitting card actions that need verified user identity.
- **Extensibility:** As a base class, it allows for specific implementations to extend and provide additional functionality as needed for different authentication scenarios involving Adaptive Cards.

---

### **Supporting Components**

**`OAuthAdaptiveCardAuthentication`**

- **Purpose:**
  - Specializes in handling OAuth authentication within Adaptive Cards.
  - Extends the capabilities of `AdaptiveCardAuthenticationBase`.

- **Key Methods:**
  - **`handleSsoTokenExchange()`:**
    - Performs token exchange when an activity contains an authentication token.
    - Allows the bot to obtain a valid user token seamlessly.
  - **`authenticate()`:**
    - Manages the authentication flow, deciding whether to prompt the user to sign in or proceed with available tokens.

**`UserTokenAccess`**

- **Role:**
  - Manages user tokens during the authentication process.
  - Handles retrieval, exchange, and storage of tokens securely.

**`TurnState`**

- **Functionality:**
  - Maintains state information throughout the authentication process.
  - Keeps track of user inputs, outputs, and other relevant data across conversation turns.

---

### **Authentication Mechanism Overview**

These classes collectively provide a robust framework for handling authentication in Teams bots and applications across different scenarios:

- **OAuth Authentication:**
  - Facilitates standard OAuth flows where users are prompted to sign in.
  - Manages token exchanges and ensures secure handling of user credentials.

- **Teams Single Sign-On (SSO):**
  - Leverages existing user sessions in Teams to authenticate without additional prompts.
  - Enhances user experience by reducing friction.

- **Adaptive Card Authentication:**
  - Integrates authentication into Adaptive Card interactions.
  - Ensures that actions taken within cards are performed by authenticated users.

- **Token Management and Storage:**
  - Utilizes secure methods for handling tokens, including validation and storage.
  - Ensures compliance with security best practices.

- **Dialog and State Management:**
  - Employs dialogs to manage multi-turn conversations required during authentication.
  - Maintains state to keep track of where users are in the authentication process.

- **Middleware Integration:**
  - Incorporates middleware to handle token exchange events.
  - Filters and processes only relevant authentication activities.

---

### **Conclusion**

The authentication classes are designed to provide flexible and secure authentication mechanisms tailored to various contexts within Teams bots and applications. By offering specialized classes for OAuth flows, Teams SSO, and Adaptive Card interactions, developers can implement seamless authentication experiences that enhance security and user satisfaction. These classes work together to manage the complexities of authentication, including token handling, dialog management, and integration with Teams-specific features, enabling robust and user-friendly authentication solutions.

##

The AI library provides various interfaces and classes to handle models and embeddings, facilitating the creation, testing, and deployment of AI functionalities within applications.

**`TestModel` Class:**

The `TestModel` class is a key component designed for testing the prompt completion system in the AI library. It implements the `PromptCompletionModel` interface, allowing developers to simulate model responses during testing without relying on external AI services.

- **Constructor:**
  - The constructor accepts optional parameters with default values:
    - `status`: Indicates the status of the prompt response (e.g., success or failure).
    - `response`: A message object representing the simulated response to a prompt.
    - `error`: An optional error object to simulate error scenarios.

- **Properties:**
  - `status`: Represents the status of the prompt response. This property allows the simulation of different response states, such as success or various error conditions.
  - `response`: Contains the simulated response message to the prompt. This allows developers to define expected outputs for testing purposes.
  - `error`: An optional property that, if set, represents an error to return when the prompt is completed. This is useful for testing error handling in the application.

- **Methods:**
  - `completePrompt(context, memory, functions, tokenizer, template)`: This method simulates the completion of a prompt. It accepts the following parameters:
    - `context`: The context in which the prompt is being completed.
    - `memory`: Memory storage that may influence or be influenced by the prompt completion.
    - `functions`: A set of functions that may be invoked during prompt processing.
    - `tokenizer`: A tokenizer used to process the prompt and responses.
    - `template`: The prompt template to be completed.
  - The method returns a `Promise<PromptResponse<string>>`, which includes:
    - The `status` indicating the success or failure of the prompt completion.
    - The `response` message if the prompt is completed successfully.
    - The `error` if an error occurred during prompt completion.
  - If an `error` is defined in the instance, `completePrompt` will return the error; otherwise, it returns the response message along with the status.

**Usage:**

The `TestModel` is instrumental for developers when writing unit tests for their AI applications. By allowing the simulation of both successful and erroneous responses, developers can thoroughly test how their application logic handles various scenarios without making actual calls to AI services. This leads to faster development cycles and more reliable code, as potential issues can be identified and resolved during the testing phase.

**Example Scenario:**

A developer is building a chatbot using the AI library and wants to ensure that the bot correctly handles both valid responses and error conditions from the AI model. Using the `TestModel`, the developer can:

- Define a successful response scenario by setting the `status` to success and providing an appropriate `response` message.
- Simulate an error condition by setting the `error` property to a specific error object.

By invoking `completePrompt` with these configurations, the developer can verify that the chatbot appropriately processes successful responses and gracefully handles errors, such as by providing user feedback or attempting recovery.

---

The `TestModel` serves as a valuable tool within the AI library for testing and development purposes, ensuring that applications behave as expected across a range of possible outcomes.

##

The `Tokenizer` interface defines the structure for classes that handle the conversion of text to tokens and vice versa, which is essential for preparing text data for AI models. Both the `GPTTokenizer` and `GPT3Tokenizer` classes implement this interface, providing methods for encoding strings into tokens (arrays of numbers) and decoding tokens back into strings.

**`Tokenizer` Interface:**
- Serves as a contract for tokenization classes.
- Requires the implementation of at least two methods:
  - `encode(text: string): number[]` - Converts a string into an array of numerical tokens.
  - `decode(tokens: number[]): string` - Converts an array of numerical tokens back into a string.

**`GPT3Tokenizer` Class:**
- Implements the `Tokenizer` interface.
- Methods:
  - `encode(text: string): number[]`:
    - Uses the `encode` function from the `gpt-tokenizer` library.
    - Transforms input text into an array of tokens suitable for GPT-3 models.
  - `decode(tokens: number[]): string`:
    - Uses the `decode` function from the `gpt-tokenizer` library.
    - Transforms an array of tokens back into readable text.
- Purpose:
  - Designed specifically for tokenizing text using GPT-3's encoding schemes.
  - Facilitates the conversion of text into a format that GPT-3 models can process.

**Usage Example:**
```typescript
const tokenizer = new GPT3Tokenizer();
const tokens = tokenizer.encode('Hello World'); // Encodes to an array of numbers
console.log(tokens.length); // Outputs: 2
const text = tokenizer.decode(tokens); // Decodes back to 'Hello World'
console.log(text); // Outputs: 'Hello World'
```

**`GPTTokenizer` Class:**
- Implements the `Tokenizer` interface.
- Methods:
  - `encode(text: string): number[]`:
    - Uses GPT's `cl100k_base` encoding for tokenization.
    - Converts input text into an array of tokens compatible with GPT-4 and other models using this encoding.
  - `decode(tokens: number[]): string`:
    - Converts an array of tokens back into text using the same encoding.
- Purpose:
  - Provides tokenization compatible with GPT's newer models that utilize the `cl100k_base` encoding.
  - Ensures that text is properly tokenized for AI models that require this specific encoding.

**Usage Example:**
```typescript
const tokenizer = new GPTTokenizer();
const tokens = tokenizer.encode('Hello World'); // Encodes using cl100k_base encoding
console.log(tokens.length); // Outputs: 2
const text = tokenizer.decode(tokens); // Decodes back to 'Hello World'
console.log(text); // Outputs: 'Hello World'
```

**Integration in AI Models:**
- **Tokenization Process:**
  - **Encoding:** Converts human-readable text into numerical tokens that AI models can process.
  - **Decoding:** Transforms the numerical tokens generated by AI models back into human-readable text.
- By implementing the `Tokenizer` interface, both `GPTTokenizer` and `GPT3Tokenizer` can be seamlessly integrated into AI pipelines, allowing for flexible switching between different encoding methods depending on the model requirements.
- Tokenization is a crucial step in preparing input data for AI models, ensuring that the text is formatted correctly and that the model interprets the input as intended.

**Key Points:**
- **Flexibility:** Developers can choose the appropriate tokenizer based on the model they are working with (e.g., GPT-3 vs. GPT-4).
- **Consistency:** Implementing a common interface (`Tokenizer`) allows for consistent usage patterns and easier maintenance.
- **Compatibility:** Using the correct tokenizer ensures compatibility with the underlying AI model's expected input format.

In summary, the `Tokenizer` interface and its implementations in `GPTTokenizer` and `GPT3Tokenizer` provide essential tools for text preprocessing in AI applications. They handle the conversion between text and token arrays using specific encoding schemes required by different GPT models, facilitating effective communication with the AI systems.

##

The built-in moderators—`OpenAIModerator`, `AzureContentSafetyModerator`, and `DefaultModerator`—are integral components designed to enhance content safety and moderation within the system. They serve to review and filter both user inputs and model outputs to ensure compliance with safety guidelines and to prevent the dissemination of inappropriate or harmful content.

---

**1. OpenAIModerator**

- **Purpose**: Leverages OpenAI's moderation API to assess and filter content for safety violations.
- **Configuration**:
  - **Moderation Scope**: Can be configured to moderate user inputs, model outputs, or both.
  - **Options**: Includes settings such as `apiKey`, `moderate` (specifying input/output/both), `endpoint`, `organization`, `apiVersion`, and `model`.
- **Key Methods**:
  - **`reviewInput`**:
    - **Function**: Reviews incoming user messages.
    - **Behavior**: Analyzes the content for safety violations using the OpenAI moderation API.
    - **Outcome**: Returns a plan if the input is flagged, which may include actions like generating a warning message or altering the content flow.
  - **`reviewOutput`**:
    - **Function**: Evaluates the model's generated outputs, particularly `SAY` and `DO` commands intended for the user.
    - **Behavior**: Checks for compliance with content policies.
    - **Outcome**: May modify or replace the original plan if content is deemed inappropriate.
- **Internal Operations**:
  - **`createModeration`**: Sends content to the OpenAI moderation endpoint and processes the response to determine if it violates any safety guidelines.
- **Integration Example**:
  - When the `OPENAI_KEY` environment variable is set, `OpenAIModerator` is initialized with the provided API key and set to moderate both inputs and outputs.

---

**2. AzureContentSafetyModerator**

- **Purpose**: Utilizes Azure's Content Safety services to moderate content based on specified categories and severity levels.
- **Configuration**:
  - **Moderation Scope**: Can be set to review input, output, or both.
  - **Options**: Requires `apiKey`, `endpoint`, `apiVersion`, and optionally `organization` and `model`. It also accepts `categories` with corresponding severity levels for nuanced moderation.
- **Key Methods**:
  - **`createModeration`**:
    - **Function**: Sends content to Azure's Content Safety API to assess for violations.
    - **Behavior**: Evaluates content against categories like Hate, Self-Harm, Sexual, and Violence.
    - **Outcome**: Returns results indicating whether the content is flagged and provides severity scores.
  - **`reviewInput`**:
    - **Function**: Analyzes incoming user inputs.
    - **Behavior**: Checks if content violates any specified moderation categories.
    - **Outcome**: Returns a plan to handle flagged content appropriately if violations are detected.
  - **`reviewOutput`**:
    - **Function**: Reviews outputs generated by the model.
    - **Behavior**: Similar to `reviewInput`, it examines the content for compliance.
    - **Outcome**: Determines if any action is needed to address potential violations in the model's response.
- **Internal Operations**:
  - **HTTP Requests**: Utilizes `axios` to make HTTP POST requests to Azure's moderation endpoint, processing the response to guide moderation decisions.
- **Integration Example**:
  - If `OPENAI_KEY` is not set but `AZURE_CONTENT_SAFETY_KEY` and `AZURE_CONTENT_SAFETY_ENDPOINT` are provided, `AzureContentSafetyModerator` is initialized with the necessary credentials and configured categories with severity levels set to high.

---

**3. DefaultModerator**

- **Purpose**: Acts as a fallback moderator that approves all content without performing any actual moderation checks.
- **Behavior**:
  - **Pass-Through**: Allows all user inputs and model outputs to proceed unaltered.
  - **No Content Filtering**: Does not enforce any content safety policies on the data it processes.
- **Key Methods**:
  - **`reviewInput`**:
    - **Function**: Receives user input.
    - **Behavior**: Automatically approves the input by returning `undefined`.
  - **`reviewOutput`**:
    - **Function**: Processes the model's output plan.
    - **Behavior**: Returns the plan as-is, without any modifications or checks.
- **Use Cases**:
  - **Development and Testing**: Useful during development phases when content moderation is not a concern, allowing for unfettered testing of functionality.
  - **No Moderation Required**: Suitable for applications where content safety is managed elsewhere or is deemed unnecessary.

---

**Usage in Content Safety and Moderation**:

- **Integration in Applications**:
  - The moderators are integrated into applications to automatically manage content safety.
  - Developers can choose which moderator to implement based on their environment and requirements.
- **Dynamic Moderator Selection**:
  - The system can select between `OpenAIModerator` and `AzureContentSafetyModerator` depending on the available environment variables and credentials.
  - For example, an application may use `OpenAIModerator` when an OpenAI API key is available, and default to `AzureContentSafetyModerator` when Azure credentials are provided.
- **Handling Flagged Content**:
  - When content is flagged, moderators return plans that the application can execute to handle the violation.
  - Typical responses include notifying the user about the violation, suppressing the inappropriate content, or providing alternative safe content.
- **Customization**:
  - **Categories and Severity**: Especially with `AzureContentSafetyModerator`, developers can specify which categories to monitor and set the severity levels that trigger moderation.
  - **Flexibility**: Both `OpenAIModerator` and `AzureContentSafetyModerator` offer configurable options to tailor the moderation to the application's needs.

---

By employing these moderators, applications enhance user safety by filtering out harmful content and ensuring that both user inputs and AI-generated outputs adhere to defined content policies. The moderators work by analyzing content in real-time and providing mechanisms to handle any violations appropriately, thereby maintaining a safe and respectful environment for all users.

##

The `Action` interface in the Teams AI library is a crucial component for defining and handling actions within a bot application. Actions represent discrete operations or commands that the bot can perform in response to user input or other triggers.

**Properties of the `Action` Interface:**

1. **Name (`name`):**
   - A unique identifier for the action.
   - Must consist of alphanumeric characters (a-z, A-Z, 0-9), underscores, or dashes.
   - Maximum length of 64 characters.
   - Example: `"LightsOn"`, `"SendCard"`, `"Pause"`.

2. **Description (`description`):**
   - An optional text that describes what the action does.
   - Helps in documenting the purpose and usage of the action.
   - Example: `"Turns on the lights."`, `"Sends an adaptive card to the user."`.

3. **Parameters (`parameters`):**
   - An optional JSON Schema object that defines the parameters accepted by the action.
   - Specifies required and optional parameters, their types, default values, and descriptions.
   - Example for the `"Pause"` action:
     ```json
     {
       "type": "object",
       "properties": {
         "time": {
           "type": "number",
           "description": "Amount of time to delay in milliseconds."
         }
       },
       "required": ["time"]
     }
     ```

**Defining Actions:**

Actions are typically defined in a JSON configuration file (e.g., `actions.json`) within the bot project. Each action is specified with its name, description, and parameters. This configuration informs the bot and the language model about the available actions and how to invoke them.

Example of defining actions in `actions.json`:

```json
{
  "LightsOn": {
    "description": "Turns on the lights.",
    "parameters": {
      "type": "object",
      "properties": {},
      "required": []
    }
  },
  "SendCard": {
    "description": "Sends an adaptive card to the user.",
    "parameters": {
      "type": "object",
      "properties": {
        "card": {
          "type": "object",
          "description": "An adaptive card to send to the user."
        }
      },
      "required": ["card"]
    }
  }
}
```

**Handling Actions:**

To handle actions in the bot application, developers register action handlers using the `action` method provided by the AI-related classes (e.g., `AI` class or `Application` class). An action handler is a function that executes when the corresponding action is invoked.

**Registering Action Handlers:**

The `action` method is used to register an action handler. It takes two primary arguments:

1. **Action Name (`name`):**
   - The name of the action to handle.
   - Can be a single action name or an array of action names.

2. **Handler Function (`handler`):**
   - An asynchronous function that defines the behavior when the action is invoked.
   - Follows the `ActionHandler` type signature.

**`ActionHandler` Function Signature:**

```typescript
type ActionHandler<TState, TData> = (
  context: TurnContext,
  state: TState,
  data: TData,
  action?: string
) => Promise<string>;
```

- **`context`**: Provides information about the current turn of the conversation.
- **`state`**: Represents the current state of the conversation or user.
- **`data`**: The parameters passed to the action, as defined in the action's parameters schema.
- **`action`**: (Optional) The name of the action being invoked.

**Example of Registering an Action Handler:**

```typescript
app.ai.action('LightsOn', async (context, state) => {
  // Logic to turn on the lights
  // Update state or perform operations as needed
  return 'The lights have been turned on.';
});
```

In this example:

- The action handler for `"LightsOn"` is registered.
- When the `"LightsOn"` action is invoked, the handler turns on the lights and returns a confirmation message.

**Executing Actions:**

When the bot determines that an action should be executed (e.g., through user input or an AI planner's decision), it performs the following steps:

1. **Lookup Handler:**
   - Retrieves the handler function associated with the action name from an internal actions map (`_actions`).

2. **Invoke Handler:**
   - Calls the handler function with the appropriate `context`, `state`, and `data` parameters.

3. **Handle Response:**
   - The handler function executes the action's logic and returns a response string.
   - The bot sends this response back to the user.

**Allowing Overrides:**

The `ActionEntry` interface includes an `allowOverrides` boolean property. When registering an action handler, you can specify whether the action can be overridden by subsequent registrations:

```typescript
app.ai.action('LightsOn', handlerFunction, { allowOverrides: false });
```

- If `allowOverrides` is set to `false`, attempting to register another handler for `"LightsOn"` will throw an error.
- This ensures that critical actions are not inadvertently overridden.

**Default Actions:**

The `defaultAction` method allows you to register a default handler for an action that can be overridden later if needed:

```typescript
app.ai.defaultAction('DefaultResponse', async (context, state) => {
  return 'This is a default response.';
});
```

**Action Execution Flow:**

1. **Planning:**
   - The bot (or associated AI planner) decides which action needs to be executed based on user input or conversation context.

2. **Action Invocation:**
   - The bot invokes the `doAction` method with the action name and parameters.

3. **Handler Execution:**
   - The corresponding handler function is executed.

4. **Response Generation:**
   - The handler performs its logic and returns a response string.

5. **User Feedback:**
   - The bot sends the response back to the user, completing the action cycle.

**Summary:**

- The `Action` interface defines how actions are structured, including their names, descriptions, and parameters.
- Actions are registered with handler functions that execute the desired behavior when invoked.
- Handler functions receive the conversation context, state, and action data to perform their tasks.
- The bot uses these mechanisms to perform complex operations and interact with users dynamically.

This structured approach to defining and handling actions allows developers to build robust bot applications that can perform a wide range of tasks in response to user interactions.

##

The built-in actions are predefined functions within the AI system that handle specific scenarios during task execution. They contribute to the system's robustness by managing various events, errors, and user interactions. Here's a breakdown of each action and its usage:

1. **`sayCommand`**:
   - **Purpose**: Sends messages to the user within a messaging platform like Microsoft Teams.
   - **Usage**: Processes the content to be sent, formats it appropriately (e.g., replacing newline characters with `<br>` for proper display), and constructs a message activity. It can handle plain text messages, include citations, and send Adaptive Cards if available.
   - **Additional Features**: Can include `channelData` and `entities` for enriched messaging, and handles feedback loops by enabling or disabling UI components based on parameters.

2. **`doCommand`**:
   - **Purpose**: Executes specified actions by invoking associated handlers.
   - **Usage**: Called with the current context, state, optional parameters, and the action name. It allows the AI system to perform custom or extended functionality defined by developers.

3. **`unknown`**:
   - **Purpose**: Handles cases where the AI system encounters an unrecognized action.
   - **Usage**: Default behavior is to log an error indicating the unknown action. It may return a command like `StopCommandName` to halt further execution, ensuring that undefined actions don't cause unexpected behavior.

4. **`flaggedInput`**:
   - **Purpose**: Manages situations where user input is flagged by content moderation systems for containing inappropriate or disallowed content.
   - **Usage**: When invoked, it logs an error message and typically stops processing the input. This prevents the system from responding to or propagating harmful content.

5. **`flaggedOutput`**:
   - **Purpose**: Addresses cases where the AI's generated output is flagged by moderation systems.
   - **Usage**: Similar to `flaggedInput`, it logs an error and stops the output from being sent to the user. This ensures that the AI does not disseminate inappropriate content.

6. **`tooManySteps`**:
   - **Purpose**: Prevents the AI system from running excessively long or potentially infinite processes.
   - **Usage**: Checks if the number of executed steps exceeds a configured maximum or if the execution time surpasses a limit. If so, it throws an error indicating the limit has been exceeded, which helps maintain performance and resource management.

7. **`httpError`**:
   - **Purpose**: Handles HTTP errors that occur during API calls or web requests within the AI system.
   - **Usage**: Triggered when a response has a status code of 400 or higher. It logs the error and can inform the user that an issue occurred, often suggesting to try again later. This aids in graceful degradation and user communication during network issues.

These actions are integral to the AI system's ability to manage workflows effectively, handle errors gracefully, and maintain compliance with content policies. They allow developers to define custom behaviors for various scenarios and ensure that the system responds appropriately to both expected and unexpected events.

##

The `Planner` interface is a critical component in the AI system responsible for generating actionable plans based on user input and the current state of the conversation. It defines how the AI begins and continues tasks, ensuring a coherent and goal-oriented interaction with the user.

**Details of the `Planner` Interface:**

- **Purpose:** The primary role of the `Planner` interface is to create a sequence of steps, or a plan, that the AI system will execute to fulfill the user's requests. This planning mechanism allows the AI to decide on the appropriate actions or responses in a structured manner.

- **Methods and Properties:**

  1. **`beginTask(context, state, ai)`**
     - **Description:** Invoked when the AI system is ready to start a new task.
     - **Parameters:**
       - `context`: The current conversation context.
       - `state`: The state object that holds temporary and persistent data.
       - `ai`: The AI instance providing necessary capabilities.
     - **Functionality:** Generates a `Plan` based on the user's input found in `state.temp.input`. It analyzes the input and determines the initial set of actions or responses required to address the user's request.
     - **Returns:** A promise that resolves to a `Plan` object.

  2. **`continueTask(context, state, ai)`**
     - **Description:** Called when the AI system has completed the previous plan's execution and needs to proceed with the current task.
     - **Parameters:**
       - Same as `beginTask`.
     - **Functionality:** Takes into account the output from the last plan step (also in `state.temp.input`) and decides on the next set of actions or responses to continue effectively towards task completion.
     - **Returns:** A promise that resolves to a new or updated `Plan` object.

- **`Plan` Object:**

  - **Structure:** Consists of an array of `PredictedCommand` objects.
  - **Purpose:** Represents the sequence of commands the AI will execute.
  - **`PredictedCommand` Types:**
    - **`DO` Commands:** Actions the AI should perform, such as calling an external API, executing a function, or any operation that doesn't directly involve communicating with the user.
    - **`SAY` Commands:** Messages or responses that the AI should present to the user, facilitating the conversational aspect of the interaction.

**Functionality of Planners:**

Planners are designed to interpret user inputs and the current state to formulate a coherent strategy for task completion. They enable the AI to:

- Break down complex tasks into manageable steps.
- Decide between performing actions or communicating with the user.
- Manage the flow of conversation and maintain context across multiple turns.
- Ensure that the AI's actions align with the user's goals and the application's capabilities.

**Built-in Planners:**

1. **`AssistantsPlanner`:**

   - **Description:** An advanced planner tailored for use with assistants in the Azure OpenAI framework.
   - **Functionality:**
     - Extends the basic planning capabilities to handle more sophisticated conversational scenarios.
     - Manages the initiation and continuation of tasks with an assistant, leveraging methods like `beginTask` and `continueTask`.
     - Handles actions and maintains conversation state, ensuring a smooth and context-aware user experience.
   - **Integration with AI Capabilities:**
     - Works closely with the `AI` class to generate intelligent responses.
     - Utilizes types like `RequiredAction` and `RequiredFunctionToolCall` to define necessary actions during the planning process, such as invoking tools or functions.

2. **`ActionPlanner`:**

   - **Description:** While specific details are not provided, based on naming conventions, the `ActionPlanner` is likely responsible for handling plans that involve executing actions.
   - **Functionality:**
     - Manages the execution of `DO` commands within plans.
     - Coordinates with other components to perform actions requested by the user or required to fulfill the task.

3. **`LLMClient`:**

   - **Description:** Presumably acts as a planner that interfaces directly with Language Model (LLM) clients.
   - **Functionality:**
     - Communicates with underlying language models to generate plans or interpret user inputs.
     - Facilitates advanced natural language understanding and generation capabilities, enhancing the AI's conversational proficiency.

**Conclusion:**

Planners play a vital role in orchestrating the AI's behavior, ensuring that it can understand user intents and respond appropriately through a combination of actions and messages. The `Planner` interface provides a standardized way to implement this logic, while built-in planners like `AssistantsPlanner`, `ActionPlanner`, and `LLMClient` offer specialized functionalities tailored to different aspects of AI interaction and task management.

##

Developers can create custom planners by implementing the `Planner` interface or extending existing planner classes provided by the AI framework, such as the `ActionPlanner` or `AssistantsPlanner`. Custom planners allow developers to define specific planning behaviors tailored to their application's needs, managing how the AI system interprets user input and generates responses or actions.

**Steps to Create Custom Planners:**

1. **Implement the Planner Interface:**
   - **Define Required Methods:** Create a class that implements the `Planner` interface, which requires the implementation of two main methods:
     - `beginTask<TState>(state: TurnState)` - Called when starting a new task. It should generate a plan based on the user's input available in `state.temp.input`.
     - `continueTask<TState>(state: TurnState)` - Called when continuing an existing task. It should generate a plan based on the latest actions or outputs, with context maintained in `state.temp.input`.
   - **Handle User Input and State:** Use the application state and user input to generate contextually appropriate plans.

2. **Extend Existing Planner Classes:**
   - **Use Classes Like ActionPlanner:** Extend classes like `ActionPlanner` that provide foundational functionalities, including integration with Large Language Models (LLMs), validation mechanisms, and error handling.
   - **Override Methods as Needed:** Customize methods such as `beginTask`, `continueTask`, and others to modify or enhance planning behaviors.

3. **Configure Planner Options:**
   - **Set Up Models and Prompts:** Configure the planner with appropriate models (e.g., OpenAI, Llama) and manage prompts using a `PromptManager`.
   - **Define Planner Behavior:** Use options interfaces like `ActionPlannerOptions` to specify behaviors, such as repair attempts, polling intervals, and state management.

4. **Integrate with AI System:**
   - **Manage Plans and Commands:** Ensure that your planner generates plans consisting of commands that the AI system can execute. Commands typically include:
     - **DO:** Actions for the system to perform.
     - **SAY:** Responses for the system to communicate to the user.
   - **Utilize Application State:** Leverage the turn state to maintain context across interactions.

**Best Practices for Implementing Custom Planners:**

1. **Understand the Planner Structure:**
   - Recognize that a planner generates a sequence of actions (the plan) based on user input and system state.
   - Ensure plans are well-structured and commands are clearly defined.

2. **Manage Prompts Effectively:**
   - Use a `PromptManager` to organize and maintain your prompts.
   - Ensure prompts are clear and guide the AI model to produce desired outputs.

3. **Leverage Built-In Features:**
   - Utilize existing validation and repair mechanisms to handle errors and ensure the AI's responses meet expected formats.
   - Incorporate augmentations or semantic functions to enhance the planner's capabilities.

4. **Handle Errors Gracefully:**
   - Implement robust error handling within `beginTask` and `continueTask`.
   - Provide descriptive error messages and consider retry mechanisms for failed plans.

5. **Maintain Context with State Management:**
   - Use `state.temp.input` to pass user input and maintain conversational context.
   - Ensure the planner responds appropriately to the current state and history.

6. **Customize Planner Behavior:**
   - Adjust methods like `submitUserInput` or `generatePlanFromMessages` to fit specific application logic.
   - Create mock clients for testing custom behaviors without relying on live services.

7. **Test Thoroughly:**
   - Write unit tests to verify the planner's functionality under different scenarios.
   - Use testing tools and frameworks to simulate planner interactions and validate outputs.

8. **Optimize Performance:**
   - Configure settings like `polling_interval` to balance responsiveness and resource utilization.
   - Monitor planner performance and make adjustments as needed.

9. **Document Clearly:**
   - Provide documentation and comments within the code to explain the planner's logic and configurations.
   - Maintain readability for future maintenance and collaboration.

10. **Follow Clean Code Practices:**
    - Keep the code organized, modular, and adherent to coding standards.
    - Refactor when necessary to improve clarity and efficiency.

**Example Implementation Overview:**

```typescript
class CustomPlanner<TurnState> implements Planner<TurnState> {
  async beginTask(state: TurnState): Promise<Plan> {
    // Interpret user input from state.temp.input
    // Generate and return a plan with appropriate commands
  }

  async continueTask(state: TurnState): Promise<Plan> {
    // Continue the task based on the latest output
    // Update and return the next steps in the plan
  }
}
```

**Key Considerations:**

- **State Awareness:** Planners must be aware of the conversation state and context to produce relevant and coherent plans.
- **Action Definitions:** Clearly define the actions and commands your planner can generate, and handle each appropriately.
- **User Input Handling:** Ensure that user inputs are accurately captured and utilized in plan generation.
- **Integration with AI Models:** If using LLMs, manage the prompts and model responses carefully to maintain control over the planner's outputs.
- **Compliance and Safety:** Incorporate moderation and validation to prevent inappropriate content or unintended actions.

By following these guidelines, developers can create effective custom planners that enhance the functionality of their AI applications, providing tailored experiences that meet specific user and business needs.

##

Prompts and prompt templates are fundamental in designing conversational AI systems, as they define how the system interacts with users by formulating questions, instructions, or responses. In the context of AI applications, several components work together to create, manage, and render these prompts effectively. Below is an overview of these components and how they contribute to designing and using prompt templates.

### **PromptManager**

The **`PromptManager`** is a core component responsible for managing prompts and their associated data sources and functions. It performs several critical functions:

- **Loading Prompts**: It reads prompt templates from a designated filesystem. Each prompt is typically stored in a separate folder containing essential files like `config.json` (for configuration settings), `skprompt.txt` (the prompt text), and optionally `actions.json` (defining actions associated with the prompt).

- **Caching**: To improve efficiency, the `PromptManager` caches loaded prompts, reducing filesystem reads and enhancing performance during prompt retrieval.

- **Managing Prompts**: It provides methods to add new prompts (`addPrompt`), retrieve existing prompts (`getPrompt`), and check for the existence of prompts (`hasPrompt`).

- **Handling Augmentations**: The `PromptManager` can process different augmentation types (e.g., tools, sequences) to enrich prompts with additional data or functionality. It ensures that required data sources for augmentations are available and can migrate old prompt schemas to maintain compatibility.

By centralizing prompt management, the `PromptManager` simplifies the process of handling complex conversational flows and maintaining organized prompt templates.

### **PromptTemplate**

A **`PromptTemplate`** defines the structure and content of a prompt. It includes:

- **Name**: A unique identifier for the prompt.

- **Prompt Content**: The main body of the prompt, which can include static text, dynamic content through variables, or function calls.

- **Configuration (`config`)**: Settings that dictate how the prompt should be processed and rendered. This includes completion parameters and augmentation configurations.

- **Actions**: Optional actions that can be taken in response to the prompt, defined in an `actions.json` file.

The `PromptTemplate` provides methods like `renderAsMessages` and `renderAsText` to generate the prompt in different formats, catering to various rendering requirements.

### **PromptTemplateConfig**

The **`PromptTemplateConfig`** is a configuration object within a `PromptTemplate` that specifies how the prompt should behave. Key properties include:

- **Schema**: Indicates the version of the prompt schema (e.g., `'1'` or `'1.1'`), ensuring the template adheres to expected structures.

- **Type**: Specifies the type of prompt, which is typically `'completion'` for generating responses.

- **Completion**: An object containing parameters that influence the prompt completion process, such as:
  - `max_tokens`: The maximum number of tokens to generate.
  - `temperature`: Controls the randomness of the output.
  - `frequency_penalty` and `presence_penalty`: Parameters that reduce repetition.

- **Augmentation**: Optional settings that determine if and how the prompt should be enriched with additional data sources.

By encapsulating these settings, the `PromptTemplateConfig` allows for precise control over prompt generation and customization to meet specific application needs.

### **PromptSection**

A **`PromptSection`** is an interface representing a segment of a prompt. It allows for modular construction of prompts by dividing them into manageable sections. Key features include:

- **Required Flag**: Indicates whether the section is mandatory for the prompt.

- **Token Limit (`tokens`)**: Specifies the desired token budget for the section, aiding in managing the total length of prompts.

- **Rendering Methods**:
  - `renderAsText()`: Produces the section as a plain text string.
  - `renderAsMessages()`: Generates the section as an array of message objects, which can include roles and content suitable for chat-based AI interactions.

By using `PromptSection`s, developers can build prompts that are flexible and maintainable, with the ability to reuse and rearrange sections as needed.

### **TemplateSection**

The **`TemplateSection`** is a specialized type of `PromptSection` that supports template syntax for dynamic content generation. Its features include:

- **Template Syntax**:
  - **Variable Interpolation**: Using `{{$variableName}}` to include values from memory or context.
  - **Function Calls**: Invoking functions with `{{functionName}}` or `{{functionName arg1 arg2}}` to generate content dynamically.

- **Dynamic Content**: Enables the prompt to adapt based on user input, external data sources, or computation results.

- **Rendering**: Processes the template by replacing variables and executing functions to produce the final prompt content.

The `TemplateSection` is particularly powerful for creating prompts that need to be context-aware or personalized, enhancing the user experience through tailored interactions.

### **TextSection**

A **`TextSection`** represents a simple section of static text within a prompt. Its characteristics include:

- **Text Content (`text`)**: The actual text to be included in the prompt.

- **Role**: Specifies the role of the message (e.g., `'user'`, `'system'`), which can influence how the AI processes the message.

- **Optional Parameters**:
  - `tokens`: Sets a token limit for the section.
  - `required`: Indicates if the section must be included.
  - `separator`: Defines a separator string when rendering multiple sections.

- **Rendering Methods**: Similar to `PromptSection`, it can render as text or messages.

The `TextSection` is ideal for incorporating fixed instructions or information within a prompt, ensuring essential content is always present.

### **GroupSection**

The **`GroupSection`** allows multiple `PromptSection`s to be combined and rendered as a single message. Features include:

- **Section Grouping**: Holds a list of sections that are conceptually related and should be processed together.

- **Role Assignment**: Applies a common role to all grouped sections when rendering.

- **Sizing Strategy**: Determines how to allocate tokens among the grouped sections, which can be important for fitting content within model limits.

- **Rendering**:
  - Manages the collective rendering of its child sections.
  - Utilizes a layout engine to handle token limits and ensure required content is included.

By using `GroupSection`, complex prompts can be organized hierarchically, enhancing readability and maintainability.

### **Designing and Using Prompt Templates**

Creating effective prompt templates involves orchestrating the above components to produce coherent and contextually appropriate prompts. The typical workflow includes:

1. **Defining Prompt Templates**:
   - Use `PromptTemplate` to outline the structure of the prompt.
   - Configure behavior and parameters through `PromptTemplateConfig`.

2. **Constructing Prompt Sections**:
   - Break down the prompt into logical sections using `PromptSection` and its subclasses.
   - Incorporate dynamic content with `TemplateSection` for variables and function calls.
   - Include static instructions or information using `TextSection`.
   - Organize related sections with `GroupSection` to manage complex prompts.

3. **Managing Prompts**:
   - Utilize `PromptManager` to add, retrieve, and manage prompt templates.
   - Load prompts from the filesystem or other storage, ensuring they are easily maintainable and version-controlled.

4. **Rendering Prompts**:
   - Call rendering methods to generate the final prompt content.
   - Ensure token limits are respected to comply with model constraints.
   - Handle required and optional sections appropriately.

5. **Augmenting Prompts**:
   - Apply augmentations through `PromptTemplateConfig` to enrich prompts with additional data sources or functionality.
   - Use augmentations to provide context, examples, or other supportive content that can enhance AI responses.

6. **Testing and Validation**:
   - Test prompts thoroughly to ensure variables and functions are correctly processed.
   - Validate that the prompts produce the expected AI behavior and adhere to application requirements.

By carefully designing prompt templates using these components, developers can create robust conversational experiences that are both dynamic and reliable. The modular approach allows for easy updates and customization, facilitating ongoing improvements and adaptations to changing user needs or system capabilities.

---

This comprehensive framework enables the creation of sophisticated prompts that guide AI models effectively, ensuring that user interactions are handled in a nuanced and contextually appropriate manner.

##

Developers manage prompts effectively by adopting structured, organized, and flexible approaches that enhance consistency, maintainability, and scalability in AI applications. Here are the key strategies and recommended patterns for prompt management:

1. **Use of a Prompt Manager**: Developers utilize a dedicated `PromptManager` to handle prompts systematically. This manager allows for adding, retrieving, and checking the existence of prompts and data sources. By organizing prompts into dedicated folders separate from the main codebase, prompts become easily accessible and maintainable. This structure facilitates efficient updates and scalability.

2. **Structured Prompt Templates**: Prompts are defined using structured templates, such as `PromptTemplate`, which include the prompt text and configuration settings like token limits, temperature, and roles. Templates support dynamic content through functions and variable interpolation (e.g., `{{functionName}}`, `{{$variable}}`), allowing prompts to adapt to different contexts and user inputs. This approach promotes reusability and consistency across the application.

3. **Modular Prompt Sections**: Breaking down prompts into modular sections—mandatory or optional—enables developers to manage different parts of the prompt effectively. Classes like `PromptSection`, `GroupSection`, and `TextSection` help organize prompts into manageable components. Each section can have a specified token budget, ensuring the overall prompt stays within model constraints.

4. **Flexible Rendering Methods**: Prompts can be rendered in multiple formats using methods like `renderAsText` and `renderAsMessages`. This flexibility allows developers to choose the format that best suits the application's needs, whether it's for display purposes or processing by the AI model.

5. **Token Budget Management**: Developers specify token budgets for prompts and sections to control the length and complexity of prompts. By managing token limits, they ensure that prompts remain within the allowable size for the AI model, which is crucial for performance and cost efficiency.

6. **Augmentations for Enhanced Functionality**: Augmentations automatically add context or functionality to prompts, reducing the need for manual prompt engineering. For example, an `ActionAugmentationSection` can render a list of available actions, while a `MonologueAugmentation` can support inner monologue prompts for chain-of-thought reasoning. This extensibility allows prompts to be more dynamic and context-aware.

7. **Validation and Error Handling**: Implementing validation mechanisms ensures that prompts are correctly formatted and that responses meet expected formats. Error handling is crucial for maintaining the integrity of the prompt management system. Developers handle errors gracefully by providing feedback, attempting to repair invalid responses, and enforcing schemas for structured responses.

8. **Testing with Test Models and Frameworks**: Utilizing test models, stubs, and mocks allows developers to simulate prompt behaviors and validate their functionality under various scenarios. Testing frameworks help ensure that prompt management logic is robust and behaves as expected, leading to more reliable applications.

9. **Integration with Action Planners**: Combining prompt management with action planning components, like the `ActionPlanner`, integrates prompts seamlessly with AI models and user inputs. This approach streamlines the response generation process and enhances the application's ability to handle complex interactions.

10. **Code Quality Practices**: Incorporating code quality tools such as TypeScript for type safety, `eslint`, and `prettier` for consistent formatting, helps maintain high standards in prompt management code. Including prompts in the build process (e.g., copying prompt files during build) ensures that they are up-to-date and synchronized with the application's codebase.

11. **Environment Configuration Management**: Using environment variables (managed with tools like `dotenv`) allows developers to manage configurations, including prompt settings or API keys, based on different deployment environments (development, testing, production). This flexibility aids in adapting prompts to various contexts without hardcoding sensitive information.

12. **Logging and Performance Analysis**: Implementing logging mechanisms to record prompts and responses assists developers in monitoring performance and analyzing how prompts are utilized. This data-driven approach enables iterative improvements and optimization of prompts for better user engagement and efficiency.

13. **Dynamic Prompt Loading and Caching**: Prompts can be loaded dynamically and cached to improve performance. By caching prompt templates, applications reduce redundant loading and ensure quick access to frequently used prompts.

14. **Error Handling and Graceful Degradation**: Developers ensure that applications handle missing or invalid prompts gracefully. This includes providing default prompts, handling exceptions without crashing, and informing users appropriately when issues arise.

15. **Documentation and Clear Naming Conventions**: Maintaining clear documentation for prompts, including their purpose and usage, helps in team collaboration and future maintenance. Using descriptive names for prompts and actions enhances readability and understanding of the codebase.

By following these recommended patterns, developers can manage prompts effectively, resulting in AI applications that are more:

- **Consistent**: Structured templates and modular sections ensure uniformity across prompts.
- **Maintainable**: Organized prompt directories and code quality practices make it easier to update and scale the application.
- **Flexible**: Dynamic content generation and augmentations allow prompts to adapt to different contexts and user needs.
- **Robust**: Validation, error handling, and testing lead to reliable prompt management that can handle various scenarios gracefully.
- **Efficient**: Token budgeting, caching, and performance analysis help optimize resource usage and improve response times.

Effective prompt management is essential for creating engaging and functional AI applications. By employing these strategies, developers can enhance the user experience, streamline development processes, and build scalable solutions that meet the evolving demands of conversational AI.

##

**TurnState**

`TurnState` is a class designed to manage the state of a conversation during a single turn in a bot framework application. It encapsulates three primary state scopes:

1. **Conversation State (`conversation`)**: This scope stores data that is shared across all turns within the same conversation. It typically includes information that needs to persist throughout the entire conversation with the user.

2. **User State (`user`)**: This scope holds data specific to an individual user, regardless of the conversation they are in. It allows the bot to maintain information about the user across multiple conversations or sessions.

3. **Temporary State (`temp`)**: This scope is used to store transient data that is relevant only within the current turn. It includes items like the user's current input, downloaded files, the last output produced by the bot, action outputs, authentication tokens, and flags for managing specific flow controls.

**Properties of TurnState:**

- `conversation`: Represents the conversation-specific state. It can be accessed and modified during the conversation.
- `user`: Represents the user-specific state. It helps maintain continuity for the user across different conversations.
- `temp`: Represents temporary state data used within the current turn.

**Methods of TurnState:**

- `load(context)`: Loads the state from the storage provider into the `TurnState` instance based on the current turn context.
- `save(context)`: Persists any changes made to the state back to the storage provider.
- `deleteConversationState()`: Deletes the conversation state from the `TurnState`, effectively resetting any data stored in that scope.
- `deleteUserState()`: Deletes the user state, removing any persisted user-specific data.
- `deleteTempState()`: Clears the temporary state data. Since `temp` is transient by nature, this typically resets the temporary data for the next turn.
- `hasValue(path)`: Checks if a value exists at the specified path within the state.
- `getValue(path)`: Retrieves the value at the specified path from the state.
- `setValue(path, value)`: Assigns a value to the specified path within the state.
- `deleteValue(path)`: Removes the value at the specified path from the state.

**Usage of TurnState in Managing State:**

`TurnState` is essential for managing the flow of a conversation in a bot. By organizing data into conversation, user, and temporary scopes, it ensures that relevant information is accessible where needed:

- **Conversation State**: Used to keep track of conversation progress, store conversation-specific variables, and manage context that should persist for the duration of the conversation.
- **User State**: Allows the bot to personalize interactions based on user history, preferences, or past interactions.
- **Temporary State**: Serves as transient storage for data that is only relevant within the current turn, such as inputs or intermediate computations.

By leveraging the storage provider (e.g., `MemoryStorage`), `TurnState` can persist data across turns and sessions, enabling a seamless conversational experience.

---

**MemoryFork**

`MemoryFork` is a class that implements a `Memory` interface, acting as a forked (or branched) version of an existing memory state. It allows modifications to the state without affecting the original memory, enabling scenarios like hypothetical state changes, rollbacks, or isolated testing environments.

**Purpose of MemoryFork:**

- **Isolation of State Changes**: Changes made in the forked memory do not impact the original memory, allowing for safe experimentation or processing.
- **Access to Original State**: If a value is not found in the forked memory, `MemoryFork` can retrieve it from the original memory, ensuring consistency and completeness.

**Methods of MemoryFork:**

- `setValue(path, value)`: Assigns a value to a specified path in the forked memory. This change is isolated to the forked memory and does not affect the original memory.
- `getValue(path)`: Retrieves a value from the specified path. It first checks the forked memory; if the value is not found, it then checks the original memory.
- `hasValue(path)`: Determines if a value exists at the specified path. It checks both the forked memory and the original memory.
- `deleteValue(path)`: Removes a value from the specified path in the forked memory.

**Private Methods:**

- `getScopeAndName(path)`: A helper method that parses the provided path to determine the scope and name of the value being accessed or modified. This is critical for correctly navigating the memory structure.

**Usage of MemoryFork in Managing State:**

`MemoryFork` is useful in scenarios where you need to:

- **Simulate State Changes**: Test how certain changes would affect the state without committing those changes to the main memory.
- **Concurrent Operations**: Handle operations that require isolated state changes, ensuring that concurrent processes do not interfere with each other's data.
- **Undo/Redo Functionality**: Implement features where state changes can be reversed, since the original memory remains unaltered.

By using `MemoryFork`, developers can create a sandboxed environment for state management, allowing for safer and more controlled manipulation of conversation and user state.

---

**Integration of TurnState and MemoryFork:**

While `TurnState` manages the overarching state scopes for conversation, user, and temporary data, `MemoryFork` provides a means to manipulate these states in isolation. Together, they offer a robust framework for state management in conversational bots:

- **State Management**: `TurnState` provides structured access to different levels of state, ensuring that data is organized and accessible as needed.
- **Isolated Modifications**: `MemoryFork` allows for changes to be made in a controlled environment, which can then be merged back or discarded, depending on the outcome of certain operations or validations.

---

**Practical Example:**

In a bot application:

- The bot receives a user's message.
- A `TurnState` instance is created for the turn, loading the conversation, user, and temporary states.
- The bot needs to process an action that might change the state but wants to ensure that if the action fails, the state remains unchanged.
- A `MemoryFork` is created from the current state.
- The bot performs the action using the forked memory, making any necessary state changes.
- If the action succeeds, the changes from the forked memory are merged back into the main `TurnState`.
- If the action fails, the `TurnState` remains unaffected because the changes were isolated in the `MemoryFork`.

This approach ensures that the bot can manage complex interactions while maintaining the integrity and consistency of the conversation and user states.

##

Developers can access and modify state within bot handlers by utilizing the state management facilities provided by the bot framework, such as the `TurnState`, `TurnContext`, and `Memory` interfaces. Here's how they can do it and the key considerations for effective state management in bots:

### Accessing and Modifying State:

1. **Using the `state` Parameter in Handlers**:
   Many handlers receive a `state` parameter that represents the current turn's state. Developers can access conversation, user, and temporary state scopes through this parameter. For example:
   ```javascript
   app.message('/reset', async (context, state) => {
       state.deleteConversationState(); // Modifies the conversation state
   });
   ```

2. **Accessing State Properties Directly**:
   Developers can read from and write to specific properties within the state:
   ```javascript
   // Accessing conversation state
   const lightsOn = state.conversation.lightsOn;

   // Modifying conversation state
   state.conversation.lightsOn = true;
   ```

3. **Using State Management Classes**:
   Classes like `TurnState` and `TurnStateProperty` provide methods to get, set, and delete state properties:
   ```javascript
   const property = new TurnStateProperty(state, 'conversation', 'propertyName');
   property.set('newValue');
   const value = property.get();
   ```

4. **Initializing and Loading State**:
   Before accessing the state, it's essential to ensure that it's loaded:
   ```javascript
   await state.load(context);
   ```

5. **Saving State Changes**:
   After modifying the state, changes should be saved to persist them:
   ```javascript
   await state.saveChanges(context);
   ```

### Considerations for State Management:

1. **State Scopes and Lifecycles**:
   - **Conversation State**: Persists for the duration of a conversation. Ideal for storing information that should be available throughout a specific conversation.
   - **User State**: Persists across all conversations with a user. Suitable for storing user preferences or authentication tokens.
   - **Temporary State (`temp`)**: Lives only for a single turn. Useful for transient data that doesn't need to persist.

2. **State Initialization**:
   - Always ensure that the state is properly initialized before accessing or modifying it.
   - Attempting to access the state before it's loaded can lead to errors.

3. **Concurrency and Thread Safety**:
   - Bots may handle multiple conversations simultaneously. Developers should ensure that state modifications are thread-safe.
   - Avoid global variables for state storage unless properly managed, as they can lead to shared state across conversations unintentionally.

4. **Persistence and Storage Providers**:
   - **In-Memory Storage**: Suitable for testing but not for production since it doesn't persist across restarts.
   - **Persistent Storage**: Use providers like Cosmos DB, Azure Blob Storage, or custom implementations for production bots to maintain state across sessions and restarts.

5. **Error Handling**:
   - Implement robust error handling to prevent state corruption.
   - Use try-catch blocks around state access and modification code.

6. **Validation and Existence Checks**:
   - Before accessing state properties, validate their existence to prevent undefined errors.
   - Initialize state properties if they don't exist:
     ```javascript
     if (!state.conversation.lists) {
         state.conversation.lists = {};
     }
     ```

7. **State Cleanup and Lifecycle Management**:
   - Remove or reset state when it's no longer needed to prevent stale data.
   - For example, clear the conversation state when a game ends or a session expires.

8. **Serialization Considerations**:
   - Ensure that any objects stored in the state are serializable, especially when using persistent storage.
   - Avoid storing functions or complex objects that can't be serialized.

9. **Security and Sensitive Data**:
   - Be cautious when storing sensitive information like authentication tokens.
   - Use secure storage mechanisms and consider encrypting sensitive data.

10. **Testing and Debugging**:
    - Use testing utilities to simulate stateful interactions and verify that state management works as expected.
    - Mock or stub state where necessary to isolate tests.

11. **Middleware and State Access**:
    - Middleware components can also access and modify state. Ensure that changes made in middleware are compatible with handlers.
    - Be mindful of the order in which middleware processes the state.

12. **Avoiding Side Effects**:
    - Handlers should aim to modify state in predictable ways.
    - Document any state changes within handlers to maintain clarity.

13. **Performance Considerations**:
    - Minimize the size of the state to improve performance, especially when using external storage providers.
    - Be cautious with large conversation histories or data that can bloat the state.

14. **State Versioning and Schema Changes**:
    - Plan for state schema evolution. If the shape of the state changes, implement migration strategies.

### Examples of State Management in Bots:

- **Tracking Conversation Progress**:
  Use conversation state to keep track of where a user is in a multi-turn dialog.
  ```javascript
  state.conversation.step = 'awaiting_email';
  ```

- **Storing User Preferences**:
  Use user state to remember choices or settings.
  ```javascript
  state.user.languagePreference = 'en-US';
  ```

- **Temporary Data Storage**:
  Use temporary state for data that only needs to exist within the current turn.
  ```javascript
  state.temp.responseTime = Date.now();
  ```

- **Authentication Tokens**:
  Manage authentication tokens within the state, ensuring they are securely stored and invalidated when necessary.

### Best Practices:

- **Consistent State Access Patterns**:
  Use consistent methods for accessing and modifying state to improve code readability and maintainability.

- **Encapsulation**:
  Encapsulate state access in functions or classes when possible to reduce direct manipulation of the state throughout the codebase.

- **Documentation**:
  Clearly document the structure of the state and any conventions used in state management.

- **Monitoring and Logging**:
  Implement logging around state changes to aid in debugging and monitoring.

By carefully managing state within handlers and considering these factors, developers can create bots that are reliable, scalable, and provide a smooth user experience. Proper state management ensures that the bot can maintain context, handle complex interactions, and behave predictably across various scenarios.

##

In the Teams AI Library, **augmentations** are features that enhance the capabilities of AI models by integrating additional functionalities or data sources into prompt templates. They allow for more sophisticated interactions by enabling the AI to perform actions, reason through inner monologues, execute sequences of commands, or handle default responses appropriately. The built-in augmentations include `ToolsAugmentation`, `MonologueAugmentation`, `SequenceAugmentation`, and `DefaultAugmentation`. Each of these augmentations has specific methods and properties that contribute to enhancing AI capabilities in different ways.

### ToolsAugmentation

**Overview:**
The `ToolsAugmentation` class is designed to enable server-side action or tool calling, analogous to OpenAI's 'tools' functionality. It allows the AI model to specify which action(s) to call based on definitions provided in an `actions.json` file.

**Key Methods and Properties:**

- **`createPromptSection()`**: Returns an optional prompt section for the augmentation. This section can include information about available tools or actions that the AI can utilize.

- **`validateResponse(response, tokenizer)`**: Validates the AI's response to a prompt. It checks if the response properly specifies the actions to be called, conforming to the expected structure defined for tool usage.

- **`createPlanFromResponse(response)`**: Creates a plan based on the validated response. This plan includes a list of commands that the AI should execute, such as `PredictedDoCommand` for action calls or `PredictedSayCommand` for generating replies.

**Enhancement to AI Capabilities:**
By integrating `ToolsAugmentation`, the AI model can extend its functionality beyond simple text generation. It can interact with predefined tools or actions, allowing it to perform tasks like querying databases, sending emails, or any other actions defined in `actions.json`. This makes the AI more versatile and able to handle complex tasks that require interaction with external systems.

---

### MonologueAugmentation

**Overview:**
The `MonologueAugmentation` class adds support for an inner monologue to the prompt, aiding the AI in performing chain-of-thought reasoning across multiple turns of conversation. It enables the AI to maintain a reasoning process that is not directly shared with the user but influences its responses.

**Key Methods and Properties:**

- **`createPromptSection()`**: Adds a section to the prompt that guides the AI to generate an inner monologue. This includes the AI's thoughts, reasoning, and planning steps.

- **`validateResponse(response, tokenizer)`**: Validates the AI's response to ensure it includes the necessary monologue elements, such as current thought, reasoning, plan, and the next action with optional parameters. It uses a JSON schema (`InnerMonologueSchema`) to enforce the correct structure.

- **`createPlanFromResponse(response)`**: Constructs a plan from the validated response. This plan considers the AI's internal reasoning and determines the next actions to perform.

- **`InnerMonologue` Interface**: Defines the structure of the inner monologue, including properties like `thoughts` (current thought, reasoning, plan) and `action` (name and parameters).

**Enhancement to AI Capabilities:**
With `MonologueAugmentation`, the AI can engage in deeper reasoning processes, enabling more coherent and contextually appropriate responses. The inner monologue allows the AI to plan ahead, reason through complex situations, and decide on the best course of action, leading to improved problem-solving abilities and conversational flow.

---

### SequenceAugmentation

**Overview:**
The `SequenceAugmentation` class allows the AI model to return a sequence of actions to perform, structuring responses into a defined plan format. This is particularly useful for complex tasks that require multiple steps or interactions.

**Key Methods and Properties:**

- **`createPromptSection()`**: Creates a prompt section that instructs the AI to produce a sequence of commands. These commands can be either `DO` (perform an action) or `SAY` (generate a response).

- **`validateResponse(response, tokenizer)`**: Validates the AI's response against the `PlanSchema`. It ensures that the response is a well-structured plan comprising an array of commands with the necessary details.

- **`createPlanFromResponse(response)`**: Generates a plan from the validated response. Each command in the plan is properly formatted and includes necessary information for execution.

- **`PlanSchema`**: Defines the required structure for a plan, including the type and an array of commands. Each command must specify its type (`DO` or `SAY`), with `DO` commands including action names and parameters, and `SAY` commands including the response text.

**Enhancement to AI Capabilities:**
`SequenceAugmentation` enables the AI to handle multi-step tasks by planning and executing a series of actions. This structured approach allows the AI to manage complex interactions, automate workflows, and provide step-by-step assistance, significantly extending its utility in conversational applications.

---

### DefaultAugmentation

**Overview:**
The `DefaultAugmentation` class serves as a basic augmentation that does not add additional functionality to the prompt. It is designed to handle straightforward interactions where the AI simply needs to generate a response without invoking any special actions or tools.

**Key Methods and Properties:**

- **`createPromptSection()`**: Typically returns `undefined` or an empty prompt section, as no extra augmentation is needed.

- **`validateResponse(response, tokenizer)`**: Validates the AI's response to ensure it contains valid content suitable for a direct reply to the user.

- **`createPlanFromResponse(response)`**: Creates a plan that includes a single `SAY` command containing the AI's response. This command is used to relay the response back to the user.

**Enhancement to AI Capabilities:**
While it doesn't enhance the AI's capabilities beyond basic response generation, `DefaultAugmentation` provides a standardized way to handle simple interactions. It ensures consistency in how responses are processed and delivered, serving as a foundation upon which other, more complex augmentations can build.

---

### Integration with PromptManager

The `PromptManager` class is responsible for managing prompt templates and integrating augmentations into them. It includes methods like `appendAugmentations` and `updateConfig`:

- **`appendAugmentations(promptTemplate)`**: Checks for augmentations specified in the prompt template and appends the appropriate augmentation sections to the prompt. It ensures that augmentations like `MonologueAugmentation`, `SequenceAugmentation`, or `ToolsAugmentation` are correctly integrated based on the configuration.

- **`updateConfig(config)`**: Sets default values for the prompt configuration, including settings relevant to augmentations. This helps in managing how augmentations influence the prompt rendering process.

**Overall Enhancement to AI Capabilities:**
By utilizing augmentations, the Teams AI Library allows developers to create more dynamic and capable AI models. Augmentations enable the AI to:

- Interact with external tools and actions (`ToolsAugmentation`).
- Engage in internal reasoning processes (`MonologueAugmentation`).
- Execute complex sequences of commands (`SequenceAugmentation`).
- Handle responses in a standardized way (`DefaultAugmentation`).

These features collectively enhance the AI's ability to understand user inputs, perform intricate tasks, and deliver more meaningful and context-aware responses. Augmentations provide a flexible framework for extending the AI's functionality, making it adaptable to a wide range of conversational scenarios and applications.

##

Developers can implement custom augmentations in the Teams AI library by creating classes that adhere to the `Augmentation` interface. This interface requires the implementation of specific methods such as `createPromptSection` and `createPlanFromResponse`, which are essential for integrating the augmentation into the conversational flow.

**Steps to Implement Custom Augmentations:**

1. **Create an Augmentation Class:**
   - Develop a new class that implements the `Augmentation` interface. This involves defining the required methods:
     - `createPromptSection`: This method allows you to create an optional prompt section that enhances user interaction. It should return a prompt section that can be appended to existing prompts.
     - `createPlanFromResponse`: This method processes the validated response, accesses conversation context and state through the `Memory` interface, and creates a plan for the bot's next actions.

2. **Extend Existing Augmentation Classes (Optional):**
   - You may choose to extend existing augmentation classes such as `MonologueAugmentation`, `SequenceAugmentation`, or `ToolsAugmentation`. This can simplify the process by building upon established functionalities and patterns within the library.

3. **Define Custom Actions and Data Structures:**
   - If your augmentation requires specific actions, define them as `ChatCompletionAction` objects. Ensure that each action has a unique name and properly defined parameters.
   - Create any necessary data structures and validation schemas to maintain data integrity and support the augmentation's functionality.

4. **Integrate with Prompt Templates:**
   - Specify your custom augmentation in the `PromptTemplate` by setting the `augmentation` property. This links your augmentation to the prompt configuration, allowing it to be included in the conversation flow.
   - Ensure that any required data sources or functions are added to the `PromptManager` using methods like `addDataSource` and `addFunction`. Avoid naming conflicts by ensuring unique names for each.

5. **Configure the Augmentation:**
   - Update configuration files, such as `config.json`, to properly reference your custom augmentation. This ensures that the AI model and the application recognize and utilize your augmentation correctly.
   - Define any necessary parameters and ensure they are accurately reflected in the configuration files and prompt templates.

6. **Ensure Compatibility with Planners:**
   - If using the `ActionPlanner` or other planners, verify that your augmentation interacts correctly with their methods. Your augmentation should be able to generate plans from responses and handle validation as expected by the planner.
   - Test how your augmentation affects multi-step plans and other advanced features supported by the planner.

7. **Implement Validation Logic:**
   - Include robust validation in your augmentation's `validateResponse` method. This ensures that responses conform to expected formats and that the bot behaves reliably.
   - Handle both successful responses and error scenarios gracefully, providing meaningful feedback or corrective actions when needed.

8. **Test Thoroughly:**
   - Develop unit tests similar to those found in the library's test suites (e.g., `.spec.ts` files). Testing should cover all aspects of your augmentation, including prompt rendering, response validation, and plan creation.
   - Confirm that your augmentation does not negatively impact other functionalities within the library.

9. **Handle Limitations and Conflicts:**
   - Be aware of any limitations, such as compatibility issues with other augmentation types. Some augmentations may not be compatible when used together, so design your augmentation to avoid conflicts.
   - Ensure that your augmentation adheres to the library's guidelines to maintain consistency and reliability.

**Guidelines for Integrating Custom Augmentations:**

- **Follow the Augmentation Interface:**
  - Ensure your augmentation implements all required methods and adheres to the expected interfaces. This compliance guarantees compatibility with the Teams AI library's architecture.

- **Unique Naming:**
  - Use unique names for your augmentation, actions, data sources, and functions to prevent collisions with existing components. This practice avoids unexpected behavior and maintainability issues.

- **Proper Configuration:**
  - Accurately reference your augmentation in all relevant configuration files and prompt templates. Misconfigurations can lead to your augmentation not being recognized or utilized correctly.

- **State Management:**
  - Properly manage the conversation state and context within your augmentation. Utilize the provided `Memory` interface for accessing and modifying state variables as needed.

- **Error Handling:**
  - Implement comprehensive error handling within your augmentation. Validate inputs, handle exceptions gracefully, and provide informative error messages to facilitate debugging and improve user experience.

- **Compatibility Testing:**
  - Test your augmentation in conjunction with other components of the Teams AI library to ensure compatibility. Verify that it interacts correctly with planners, prompt managers, and existing augmentations.

- **Documentation:**
  - Document your augmentation thoroughly, including its purpose, usage instructions, and any configuration requirements. Clear documentation aids in maintenance and assists other developers who may work with your augmentation.

- **Adhere to Best Practices:**
  - Follow coding standards and patterns established in the Teams AI library. Consistency in code style and structure enhances readability and maintainability.
  - Incorporate security best practices, especially when handling user input and external integrations.

**Example Integration Steps:**

1. **Define Actions in `actions.json`:**
   - Specify any custom actions your augmentation requires, providing detailed descriptions and parameter definitions.

2. **Update Prompt Templates:**
   - Incorporate your augmentation into the prompt templates by referencing it in the `augmentation` property. Customize the prompts to guide the AI's behavior in conjunction with your augmentation.

3. **Customize the Application Class:**
   - Utilize the `Application` class to register routes and handlers that support your augmentation. Implement custom logic for handling specific activities or events as needed.

4. **Configure Environment Variables:**
   - If your augmentation interacts with external services or requires specific configurations, ensure that all necessary environment variables are set and managed securely.

5. **Implement Handlers for Specific Events:**
   - Register handlers for events or activities that trigger your augmentation's logic. Use methods like `activity`, `message`, or `turn` to integrate your augmentation into the application's event handling flow.

By following these steps and guidelines, developers can effectively implement custom augmentations in the Teams AI library, enhancing the capabilities of their bots and applications while maintaining compatibility and reliability within the framework.

# Web Related Thoughts

- The `Application` class is part of the Application Framework module and is responsible for configuration and setup, handling incoming activities, and routing and processing messages.
- The `ApplicationBuilder` class simplifies application creation within the Application Framework module.
- The `AdaptiveCards` class is used for working with adaptive cards in the Adaptive Cards module, which includes handling card actions and submissions and designing adaptive card templates.
- The `MessageExtensions` class extends functionality with message extensions, allowing for the implementation of search and action commands and handling invoke activities in the Message Extensions module.
- The `Meetings` class is used to handle Teams meeting events, including start and end events, as well as participant join and leave events in the Meetings and Events module.
- The `Utilities` class provides common helper functions and includes formatting and parsing utilities in the Utilities and Helpers module.
- The `StreamingResponse` class is part of the Utilities and Helpers module and is used for streaming responses.
- The authentication classes and interfaces include `OAuthBotAuthentication`, `OAuthMessageExtensionAuthentication`, `TeamsSsoBotAuthentication`, and `AdaptiveCardAuthenticationBase`, which are detailed in the Authentication Modules section.
- The `EmbeddingsModel` interface and classes like `OpenAIModel`, `LlamaModel`, and `TestModel` are part of the Embeddings and Models module, which focuses on using embeddings for advanced AI features.
