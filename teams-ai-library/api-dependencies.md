## Research Type Dependencies

The goal of this research is to list all of the projects type Dependencies.

Last Updated: 2024-11-20T03:30:15.146Z

### Explore Type Dependencies for the TestModel class

### TestModel Class

**Description**:  
The `TestModel` class is a `PromptCompletionModel` used for testing the prompt completion system. It simulates various responses, including success, error, rate-limited, and streaming text chunks. The class is designed to interact with components like `TurnContext`, `Memory`, `PromptFunctions`, and `Tokenizer`, making it useful for testing prompt-based interactions in a controlled environment.

---

### Public Properties:
- **status**: `PromptResponseStatus`  
  The status of the prompt response (e.g., success, error, rate-limited).
  
- **response**: `Message<string>`  
  The response message to the prompt, containing a role and content.
  
- **error?**: `Error`  
  An optional error object that can be returned as part of the response.

- **events**: `PromptCompletionModelEmitter`  
  An event emitter that handles event-driven functionality for the model.

---

### Public Methods:
- **constructor**(handler: `(model: TestModel, context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, template: PromptTemplate) => Promise<PromptResponse<string>>`)  
  Initializes a new instance of the `TestModel` class with a custom handler for prompt completion.

- **completePrompt**(context: `TurnContext`, memory: `Memory`, functions: `PromptFunctions`, tokenizer: `Tokenizer`, template: `PromptTemplate`): `Promise<PromptResponse<string>>`  
  Completes a prompt using the provided context, memory, functions, tokenizer, and template.

- **static createTestModel**(handler: `(model: TestModel, context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, template: PromptTemplate) => Promise<PromptResponse<string>>`): `TestModel`  
  Creates a new `TestModel` instance with a custom handler for testing.

- **static returnResponse**(response: `PromptResponse<string>`, delay: `number` = 0): `TestModel`  
  Returns a `TestModel` that simulates a response with an optional delay.

- **static returnContent**(content: `string`, delay: `number` = 0): `TestModel`  
  Returns a `TestModel` that simulates a response with the specified content and an optional delay.

- **static returnError**(error: `Error`, delay: `number` = 0): `TestModel`  
  Returns a `TestModel` that simulates an error response with an optional delay.

- **static returnRateLimited**(error: `Error`, delay: `number` = 0): `TestModel`  
  Returns a `TestModel` that simulates a rate-limited error response with an optional delay.

- **static streamTextChunks**(chunks: `string[]`, delay: `number` = 0): `TestModel`  
  Returns a `TestModel` that simulates streaming text chunks with an optional delay.

---

### Type Dependencies:
- **TurnContext**
- **Memory**
- **PromptFunctions**
- **PromptTemplate**
- **PromptResponse**
- **PromptResponseStatus**
- **Message**
- **Tokenizer**
- **PromptCompletionModelEmitter**
- **StreamingResponse**

### Explore Type Dependencies for the TestAdapter class

**Class Name**: `TestAdapter`

**Description**: The `TestAdapter` class is a testing utility used to simulate interactions with a bot. It is commonly used in unit tests to mock the behavior of a bot adapter, allowing developers to test bot logic without needing a live environment.

### Public Methods:
1. **sendActivity(activity: Partial<Activity>): Promise<void>**
   - Sends an activity to the bot for processing.

2. **receiveActivity(activity: Partial<Activity>): Promise<void>**
   - Simulates receiving an activity from the user.

3. **processActivity(activity: Partial<Activity>, logic: (context: TurnContext) => Promise<void>): Promise<void>**
   - Processes an activity and invokes the provided logic function with the `TurnContext`.

4. **continueConversation(reference: Partial<ConversationReference>, logic: (context: TurnContext) => Promise<void>): Promise<void>**
   - Continues a conversation using a conversation reference and invokes the provided logic function.

5. **sendActivities(activities: Partial<Activity>[]): Promise<void>**
   - Sends multiple activities to the bot for processing.

6. **updateActivity(activity: Partial<Activity>): Promise<void>**
   - Updates an existing activity.

7. **deleteActivity(reference: Partial<ConversationReference>): Promise<void>**
   - Deletes an activity using a conversation reference.

### Public Properties:
- **conversationReference: Partial<ConversationReference>**
  - Stores the conversation reference for the current conversation.

- **activityBuffer: Activity[]**
  - A buffer that holds activities sent by the bot during the test.

### Type Dependencies:
- `Activity`
- `TurnContext`
- `ConversationReference`
- `Partial<T>`
- `Promise<void>`



### Explore Type Dependencies for the TestPromptManager class

### Class: `TestPromptManager`

**Description**:  
The `TestPromptManager` is a specialized prompt manager designed for testing purposes. It extends the functionality of the `PromptManager` class, allowing for the addition, retrieval, and management of data sources, functions, and prompts. It is primarily used in unit tests to simulate and validate prompt management behavior.

---

### Public Methods:

1. **constructor(options: Partial<TestPromptManagerOptions> = {})**  
   Creates a new `TestPromptManager` instance with optional configuration options.
   
2. **addDataSource(dataSource: DataSource): void**  
   Registers a new data source with the prompt manager.
   
3. **getDataSource(name: string): DataSource**  
   Retrieves a data source by its name.
   
4. **hasDataSource(name: string): boolean**  
   Checks if a data source with the given name exists.
   
5. **addFunction(name: string, fn: Function): void**  
   Registers a new function with the prompt manager.
   
6. **getFunction(name: string): Function**  
   Retrieves a function by its name.
   
7. **hasFunction(name: string): boolean**  
   Checks if a function with the given name exists.
   
8. **addPrompt(prompt: PromptTemplate): void**  
   Registers a new prompt template with the prompt manager.
   
9. **getPrompt(name: string): Promise<PromptTemplate>**  
   Retrieves a prompt template by its name.
   
10. **hasPrompt(name: string): Promise<boolean>**  
    Checks if a prompt template with the given name exists.

---

### Public Properties:

1. **options: ConfiguredPromptManagerOptions**  
   Configuration options for the prompt manager.

2. **prompts?: PromptTemplate[]**  
   Optional list of prompts to pre-load.

---

### Type Dependencies:

1. **PromptManager**  
   The base class that `TestPromptManager` extends.

2. **PromptManagerOptions**  
   Interface for configuring the prompt manager.

3. **ConfiguredPromptManagerOptions**  
   Interface for the configured options of the prompt manager.

4. **DataSource**  
   Interface representing a data source.

5. **PromptTemplate**  
   Interface representing a prompt template.

6. **PromptFunction**  
   Type representing a function used in prompt templates.

7. **TurnContext**  
   Class representing the context of a turn in a conversation.

8. **Memory**  
   Class representing memory used in prompts.

9. **Tokenizer**  
   Class used for tokenizing input in prompts.

10. **PromptSection**  
    Class representing a section of a prompt.

11. **GroupSection**  
    Class representing a group of sections in a prompt.

12. **ActionOutputMessage**  
    Class representing an action output message in a prompt.



### Explore Type Dependencies for the GPTTokenizer class

**Class: GPTTokenizer**

**Description:**
The `GPTTokenizer` class is responsible for encoding and decoding text into token arrays and vice versa. It implements the `Tokenizer` interface and utilizes the `encode` and `decode` functions from the `gpt-tokenizer` module. This class is commonly used in various components of the library to handle tokenization tasks, such as in the `BinaryClassifier` and other modules.

**Public Methods:**
1. `public encode(text: string): Promise<number[]>`
   - Encodes a given string into an array of numbers (tokens).
   - **Parameters:**
     - `text: string` - The input text to be tokenized.
   - **Returns:** 
     - `Promise<number[]>` - A promise that resolves to an array of token numbers.

2. `public decode(tokens: number[]): Promise<string>`
   - Decodes an array of token numbers back into a string.
   - **Parameters:**
     - `tokens: number[]` - The array of token numbers to be decoded.
   - **Returns:** 
     - `Promise<string>` - A promise that resolves to the decoded string.

**Public & Protected Properties:**
- The `GPTTokenizer` class does not have any public or protected properties listed.

**Type Dependencies:**
1. **Tokenizer** - Interface implemented by the `GPTTokenizer` class.
2. **encode** - Function from the `gpt-tokenizer` module.
3. **decode** - Function from the `gpt-tokenizer` module.

### Explore Type Dependencies for the TestTurnState class

### Class: `TestTurnState`

#### Description:
`TestTurnState` is a test version of the `TurnState` class, designed specifically for use in unit tests. It extends the functionality of `TurnState` and provides a controlled environment for testing conversation, user, and temporary state management. The constructor is private, meaning instances of `TestTurnState` cannot be created directly outside the class. Instead, a static `create` method is provided to instantiate the class.

---

#### Public Methods:
- **`create(context: TurnContext, testState?: { user?: Record<string, any>; conversation?: Record<string, any>; temp?: Record<string, any> }): Promise<TestTurnState>`**  
  Creates a new instance of `TestTurnState` with optional test state for user, conversation, and temporary data.

---

#### Public Properties:
- **`user: Record<string, any>`**  
  Represents the user state, inherited from `TurnState`.
  
- **`conversation: Record<string, any>`**  
  Represents the conversation state, inherited from `TurnState`.
  
- **`temp: any`**  
  Represents the temporary state, inherited from `TurnState`.

---

#### Type Dependencies:
- **`TurnState`**  
  The base class that `TestTurnState` extends, providing core state management functionality.
  
- **`TurnContext`**  
  Used as a parameter in the `create` method to represent the context of the current turn in a conversation.
  
- **`MemoryStorage`**  
  Utilized within the `create` method for managing state storage during tests.



### Explore Type Dependencies for the Prompt class

### Prompt Class Definition

**Class Name:** `Prompt`

**Description:**  
The `Prompt` class is designed to manage and render a collection of prompt sections, allowing for the creation of complex prompt hierarchies. It supports rendering prompts as either text or messages, with options for token limits, required sections, and customizable separators between sections. The class extends the `LayoutEngine` and is used to structure and format prompts in a flexible and compositional manner.

---

#### Public Properties:
- **sections: `PromptSection[]`**  
  An array of sections that make up the prompt. Each section is responsible for rendering a part of the prompt.

- **tokens: `number`**  
  The maximum number of tokens allowed for the prompt. Defaults to `-1` (auto).

- **required: `boolean`**  
  Indicates whether the prompt is required. Defaults to `true`.

- **separator: `string`**  
  The string used to separate sections when rendering as text. Defaults to `\n\n`.

---

#### Public Methods:
- **constructor(sections: `PromptSection[]`, tokens?: `number`, required?: `boolean`, separator?: `string`)**  
  Initializes a new instance of the `Prompt` class with the provided sections, token limit, required flag, and separator.

- **renderAsMessages(context: `TurnContext`, memory: `Memory`, functions: `PromptFunctions`, tokenizer: `Tokenizer`, maxTokens: `number`): `Promise<RenderedPromptSection<Message[]>>`**  
  Renders the prompt as an array of messages, considering the provided context, memory, functions, tokenizer, and token limit.

- **renderAsText(context: `TurnContext`, memory: `Memory`, functions: `PromptFunctions`, tokenizer: `Tokenizer`, maxTokens: `number`): `Promise<RenderedPromptSection<string>>`**  
  Renders the prompt as a string, considering the provided context, memory, functions, tokenizer, and token limit.

---

#### Type Dependencies:
- **PromptSection**  
  Represents a section of the prompt. Used in the `sections` property.

- **TurnContext**  
  Provides context for the current turn of conversation, used in rendering methods.

- **Memory**  
  Represents the memory state, used in rendering methods.

- **PromptFunctions**  
  A collection of functions that can be invoked from within a prompt template.

- **Tokenizer**  
  Used to manage tokenization of the prompt content.

- **RenderedPromptSection<T>**  
  Represents the result of rendering a prompt section, including the output, length, and token count.

- **Message**  
  Represents a message object, used when rendering the prompt as messages.

---

This class provides a flexible way to manage and render prompts, supporting both text and message formats, with token management and customizable behavior for required sections and separators.

### Explore Type Dependencies for the UserMessage class

### UserMessage Class Definition

**Class Name:** `UserMessage`

**Description:**  
The `UserMessage` class extends the `TemplateSection` class and is used to create user-specific message templates. It allows for rendering user messages with customizable templates, token limits, and prefixes. The class also supports rendering messages as text or structured messages, making it suitable for conversational AI systems.

---

#### Public & Protected Methods

- **Constructor:**
  ```typescript
  public constructor(template: string, tokens: number = -1, userPrefix: string = 'user: ')
  ```
  Initializes a new instance of the `UserMessage` class with a message template, an optional token limit, and an optional user prefix.

- **renderAsMessages:**
  ```typescript
  public async renderAsMessages(
    context: TurnContext, 
    memory: Memory, 
    functions: PromptFunctions, 
    tokenizer: Tokenizer, 
    maxTokens: number
  ): Promise<RenderedPromptSection<Message<any>[]>>
  ```
  Renders the user message as an array of structured messages based on the provided context, memory, functions, and tokenizer.

- **renderAsText:**
  ```typescript
  public async renderAsText(
    context: TurnContext, 
    memory: Memory, 
    functions: PromptFunctions, 
    tokenizer: Tokenizer, 
    maxTokens: number
  ): Promise<string>
  ```
  Renders the user message as a plain text string based on the provided context, memory, functions, and tokenizer.

---

#### Public & Protected Properties

- **template:** `string`  
  The message template used to generate the user message.

- **tokens:** `number`  
  The number of tokens allocated for the message. Defaults to `-1` if not specified.

- **required:** `boolean`  
  Indicates whether the message is required. Defaults to `true`.

- **separator:** `string`  
  The separator used between message sections. Defaults to `'\n'`.

- **textPrefix:** `string`  
  The prefix added to the message text. Defaults to `'user: '`.

---

#### Type Dependencies

- **TemplateSection** - The base class that `UserMessage` extends.
- **TurnContext** - Used in the `renderAsMessages` and `renderAsText` methods to provide context for the message rendering.
- **Memory** - Used in the `renderAsMessages` and `renderAsText` methods to access memory during message rendering.
- **PromptFunctions** - Used in the `renderAsMessages` and `renderAsText` methods to handle prompt-related functions.
- **Tokenizer** - Used in the `renderAsMessages` and `renderAsText` methods to tokenize the message content.
- **Message** - Represents the structure of the messages returned by the `renderAsMessages` method.
- **RenderedPromptSection** - The return type of the `renderAsMessages` method, representing a section of rendered messages.

### Explore Type Dependencies for the AdaptiveCards class

**Class: AdaptiveCards**

**Description:**
The `AdaptiveCards` class is designed to handle the registration and management of handlers related to Adaptive Cards in Microsoft Teams. It enables the application to process events triggered by Adaptive Card actions, such as `Action.Execute` and `Action.Submit`, and supports search functionalities for `Input.ChoiceSet` queries.

---

### **Public Methods:**

1. **constructor(app: Application<TState>)**
   - Creates a new instance of the `AdaptiveCards` class.
   - **Parameters:**
     - `app: Application<TState>` - The application instance used to register handlers.

2. **actionExecute<TData = Record<string, any>>(verb: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[], handler: (context: TurnContext, state: TState, data: TData) => Promise<AdaptiveCard | string>): Application<TState>**
   - Adds a route for handling `Action.Execute` events from Adaptive Cards.
   - **Parameters:**
     - `verb: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[]` - The action verb or route to match.
     - `handler: (context: TurnContext, state: TState, data: TData) => Promise<AdaptiveCard | string>` - The handler function to process the action.
   - **Returns:** `Application<TState>` - The application instance for chaining.

3. **actionSubmit<TData = Record<string, any>>(verb: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[], handler: (context: TurnContext, state: TState, data: TData) => Promise<void>): Application<TState>**
   - Adds a route for handling `Action.Submit` events from Adaptive Cards.
   - **Parameters:**
     - `verb: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[]` - The action verb or route to match.
     - `handler: (context: TurnContext, state: TState, data: TData) => Promise<void>` - The handler function to process the submission.
   - **Returns:** `Application<TState>` - The application instance for chaining.

4. **search(dataset: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[], handler: (context: TurnContext, state: TState, query: Query<AdaptiveCardsSearchParams>) => Promise<AdaptiveCardSearchResult[]>): Application<TState>**
   - Adds a route for handling `Data.Query` requests for `Input.ChoiceSet` in Adaptive Cards.
   - **Parameters:**
     - `dataset: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[]` - The dataset or route to match.
     - `handler: (context: TurnContext, state: TState, query: Query<AdaptiveCardsSearchParams>) => Promise<AdaptiveCardSearchResult[]>` - The handler function to process the search query.
   - **Returns:** `Application<TState>` - The application instance for chaining.

---

### **Protected Properties:**

1. **_app: Application<TState>**
   - Holds the instance of the `Application` class used to register handlers.
   - **Type:** `Application<TState>`

---

### **Type Dependencies:**

- **Application<TState>** - Represents the application instance used for registering handlers.
- **TurnContext** - Provides context for the current turn of conversation.
- **AdaptiveCard** - Represents an Adaptive Card object.
- **AdaptiveCardsSearchParams** - Defines the parameters for searching Adaptive Cards.
- **AdaptiveCardSearchResult** - Represents the result of an Adaptive Card search.
- **Query<T>** - Represents a query object used in search operations.
- **RouteSelector** - Defines a route selector for matching actions.
- **AdaptiveCardActionExecuteResponseType** - Enum representing response types for `Action.Execute`.
- **AdaptiveCardInvokeResponseType** - Enum representing response types for invoking Adaptive Cards.
- **ACTION_INVOKE_NAME** - Constant representing the action invoke name.
- **ACTION_EXECUTE_TYPE** - Constant representing the action execute type.
- **DEFAULT_ACTION_SUBMIT_FILTER** - Constant representing the default filter for action submissions.
- **SEARCH_INVOKE_NAME** - Constant representing the search invoke name.



### Explore Type Dependencies for the JSONResponseValidator class

### Class: `JSONResponseValidator`

#### Description:
The `JSONResponseValidator` class is responsible for validating JSON responses, particularly in the context of chat completions. It ensures that the JSON returned by a model conforms to a specified schema and provides feedback in case of errors or missing data. The class can also validate the response against a JSON schema if provided.

---

#### Public & Protected Methods:

1. **constructor**
   ```typescript
   public constructor(schema?: Schema, missingJsonFeedback?: string, errorFeedback?: string)
   ```
   - Initializes a new instance of the `JSONResponseValidator` class, optionally accepting a schema for validation, along with feedback messages for missing JSON or errors.

2. **validateResponse**
   ```typescript
   public async validateResponse(
       context: TurnContext,
       memory: Memory,
       tokenizer: Tokenizer,
       response: PromptResponse<string>,
       remaining_attempts: number
   ): Promise<Validation<TValue>>
   ```
   - Validates a JSON response based on the provided context, memory, tokenizer, and response message. Returns a promise that resolves to a `Validation` object indicating the validation result.

3. **getErrorFix**
   ```typescript
   private getErrorFix(error: ValidationError): string
   ```
   - A private method that generates a fix or feedback message based on the validation error encountered.

---

#### Public & Protected Properties:

1. **errorFeedback**: `string`
   - Feedback message to be used when an error occurs during validation.

2. **missingJsonFeedback**: `string`
   - Feedback message to be used when the expected JSON is missing.

3. **schema?**: `Schema`
   - Optional schema used to validate the structure of the JSON response.

---

#### Type Dependencies:

1. **TurnContext** - Used to represent the context of a turn in a conversation.
2. **Memory** - Represents the memory state during the conversation.
3. **Tokenizer** - Used to tokenize the response for validation.
4. **PromptResponse** - Represents the response from a prompt, which is validated by the class.
5. **Validation** - Represents the result of the validation process.
6. **Schema** - Defines the structure of the JSON schema used for validation.
7. **ValidationError** - Represents an error encountered during the validation process.

### Explore Type Dependencies for the BotAuthenticationBase class

### Class: `BotAuthenticationBase`

#### Description:
`BotAuthenticationBase` is an abstract base class designed to handle authentication processes for Teams conversational bots. It provides foundational methods and properties for managing user authentication flows, including handling sign-in activities, managing authentication state, and supporting token exchange. This class is intended to be extended by specific authentication implementations.

---

### Public & Protected Methods:

1. **constructor(app: Application<TState>, settingName: string, storage?: Storage)**
   - Initializes a new instance of the `BotAuthenticationBase` class.

2. **authenticate(context: TurnContext, state: TState): Promise<string | undefined>**
   - Authenticates the user and returns the authentication token or `undefined` if authentication fails.

3. **isValidActivity(context: TurnContext): boolean**
   - Checks if the activity is a valid message activity.

4. **onUserSignInSuccess(handler: (context: TurnContext, state: TState) => Promise<void>): void**
   - Sets a handler function to be called when the user successfully signs in.

5. **onUserSignInFailure(handler: (context: TurnContext, state: TState, error: AuthError) => Promise<void>): void**
   - Sets a handler function to be called when the user sign-in flow fails.

6. **handleSignInActivity(context: TurnContext, state: TState): Promise<void>**
   - Handles the sign-in/verifyState activity and calls the appropriate success or failure handlers.

7. **deleteAuthFlowState(context: TurnContext, state: TState): void**
   - Deletes the user authentication state and user dialog state from the turn state.

8. **getUserAuthStatePropertyName(context: TurnContext): string**
   - Gets the property name for storing user authentication state.

9. **getUserDialogStatePropertyName(context: TurnContext): string**
   - Gets the property name for storing user dialog state.

10. **runDialog(context: TurnContext, state: TState, dialogStateProperty: string): Promise<DialogTurnResult<TokenResponse>>**
    - Abstract method to run or continue the authentication dialog.

11. **continueDialog(context: TurnContext, state: TState, dialogStateProperty: string): Promise<DialogTurnResult<TokenResponse>>**
    - Abstract method to continue the authentication dialog.

12. **verifyStateRouteSelector(context: TurnContext): Promise<boolean>**
    - Checks if the activity is a valid invoke activity for verifying state.

13. **tokenExchangeRouteSelector(context: TurnContext): Promise<boolean>**
    - Checks if the activity is a valid invoke activity for token exchange.

---

### Public & Protected Properties:

1. **_storage: Storage**
   - The storage used to save states.

2. **_settingName: string**
   - The name of the setting for authentication.

3. **_userSignInSuccessHandler?: (context: TurnContext, state: TState) => Promise<void>**
   - Optional handler function for successful user sign-in.

4. **_userSignInFailureHandler?: (context: TurnContext, state: TState, error: AuthError) => Promise<void>**
   - Optional handler function for failed user sign-in.

---

### Type Dependencies:

1. **Application<TState>**
   - Represents the application instance used for routing and handling authentication.

2. **TurnState**
   - Represents the state of the turn, which includes conversation and user state.

3. **TurnContext**
   - Represents the context for the current turn of the conversation.

4. **AuthError**
   - Represents an error that occurs during authentication.

5. **DialogTurnResult<TokenResponse>**
   - Represents the result of a dialog turn that includes a token response.

6. **Storage**
   - Represents the storage interface used for saving state.

7. **TokenResponse**
   - Represents the response containing the authentication token.

### Explore Type Dependencies for the MessageExtensionAuthenticationBase class

**Class Name**: `MessageExtensionAuthenticationBase`

**Description**:  
The `MessageExtensionAuthenticationBase` class is an abstract class designed to handle authentication for Microsoft Teams Message Extensions. It provides methods for authenticating users, handling token exchanges, and managing sign-in processes within the context of Teams message extensions. This class is intended to be extended by other classes that implement specific authentication flows, such as OAuth or Single Sign-On (SSO).

### Public Properties:
- `title: string`  
  A string representing the title of the authentication process.
  
- `text: string`  
  A string representing the text description or message related to the authentication process.

### Public Methods:
- `constructor(title?: string, text?: string)`  
  Initializes a new instance of the `MessageExtensionAuthenticationBase` class with optional title and text parameters.

- `async authenticate(context: TurnContext): Promise<string | undefined>`  
  Authenticates the user based on the provided `TurnContext`. Returns a promise that resolves to a string (e.g., a token) or `undefined` if authentication fails.

- `isValidActivity(context: TurnContext): boolean`  
  Checks if the activity in the provided `TurnContext` is valid for authentication purposes. Returns a boolean indicating the validity of the activity.

### Protected Methods:
- `abstract handleSsoTokenExchange(context: TurnContext): Promise<TokenResponse | undefined>`  
  Handles the exchange of an SSO token. This method must be implemented by derived classes. Returns a promise that resolves to a `TokenResponse` or `undefined`.

- `abstract handleUserSignIn(context: TurnContext, magicCode: string): Promise<TokenResponse | undefined>`  
  Handles the user sign-in process using a magic code. This method must be implemented by derived classes. Returns a promise that resolves to a `TokenResponse` or `undefined`.

- `abstract getSignInLink(context: TurnContext): Promise<string | undefined>`  
  Retrieves the sign-in link for the user. This method must be implemented by derived classes. Returns a promise that resolves to a string (the sign-in link) or `undefined`.

- `abstract isSsoSignIn(context: TurnContext): boolean`  
  Determines if the current activity is an SSO sign-in. This method must be implemented by derived classes. Returns a boolean indicating whether the activity is an SSO sign-in.

### Type Dependencies:
- `TurnContext`  
  Represents the context of a turn in a conversation, used for accessing activity and state information.

- `TokenResponse`  
  Represents the response from a token exchange, typically containing the token and related metadata.

- `ActivityTypes`  
  Enum representing different types of activities in a conversation, such as message, event, or invoke.

- `CardAction`  
  Represents an action that can be performed on a card, such as a button click.

- `InvokeResponse`  
  Represents the response to an invoke activity, typically used in message extensions.

- `MessageExtensionsInvokeNames`  
  Enum representing the names of invoke activities specific to message extensions.

### Explore Type Dependencies for the Application class

**Class Name**: `Application`

**Description**:  
The `Application` class is a top-level class in the Teams AI library designed to manage the bot's conversation flow, including handling events, managing state, and facilitating user authentication. It provides methods to register event handlers, manage conversation states, and interact with various Teams-specific features such as adaptive cards, message extensions, and task modules. The class supports a fluent interface for configuring and handling different aspects of the bot's behavior, including AI integration, authentication, and routing.

---

### **Public Methods**:

1. **constructor(options?: Partial<ApplicationOptions<TState>>)**  
   Initializes a new instance of the `Application` class with optional configuration settings.

2. **run(context: TurnContext, interruptConversation?: boolean): Promise<boolean>**  
   Runs the application logic for the given context.

3. **error(handler: (context: TurnContext, error: Error) => Promise<void>): this**  
   Sets the bot's error handler.

4. **addRoute(selector: RouteSelector, handler: RouteHandler<TState>, isInvokeRoute?: boolean): this**  
   Adds a new route to the application.

5. **activity(type: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[], handler: (context: TurnContext, state: TState) => Promise<void>): this**  
   Registers a handler for specific activity types.

6. **conversationUpdate(event: ConversationUpdateEvents, handler: (context: TurnContext, state: TState) => Promise<void>): this**  
   Registers a handler for conversation update events.

7. **messageEventUpdate(event: TeamsMessageEvents, handler: (context: TurnContext, state: TState) => Promise<void>): this**  
   Registers a handler for message event updates.

8. **message(keyword: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[], handler: (context: TurnContext, state: TState) => Promise<void>): this**  
   Registers a message handler for specific keywords or patterns.

9. **messageReactions(event: MessageReactionEvents, handler: (context: TurnContext, state: TState) => Promise<void>): this**  
   Registers a handler for message reaction events.

10. **fileConsentAccept(handler: (context: TurnContext, state: TState, fileConsentResponse: FileConsentCardResponse) => Promise<void>): this**  
    Registers a handler for file consent acceptance.

11. **fileConsentDecline(handler: (context: TurnContext, state: TState, fileConsentResponse: FileConsentCardResponse) => Promise<void>): this**  
    Registers a handler for file consent decline.

12. **O365ConnectorCardAction(handler: (context: TurnContext, state: TState, query: O365ConnectorCardActionQuery) => Promise<void>): this**  
    Registers a handler for O365 Connector Card actions.

13. **handoff(handler: (context: TurnContext, state: TState, continuation: string) => Promise<void>): this**  
    Registers a handler for handoff events.

14. **feedbackLoop(handler: (context: TurnContext, state: TState, feedbackLoopData: FeedbackLoopData) => Promise<void>): this**  
    Registers a handler for feedback loop events.

15. **sendProactiveActivity(context: TurnContext, activityOrText: string | Partial<Activity>, speak?: string, inputHint?: string): Promise<ResourceResponse | undefined>**  
    Sends a proactive activity to the user.

16. **submitAction<TData extends Record<string, any>>(commandId: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[], handler: (context: TurnContext, state: TState, data: TData) => Promise<MessagingExtensionResult | TaskModuleTaskInfo | string | null | undefined>): Application<TState>**  
    Registers a handler for submit actions in message extensions.

17. **queryUrlSetting(handler: (context: TurnContext, state: TState) => Promise<MessagingExtensionResult>): Application<TState>**  
    Registers a handler for querying URL settings in message extensions.

18. **configureSettings<TData extends Record<string, any>>(handler: (context: TurnContext, state: TState, settings: TData) => Promise<void>): Application<TState>**  
    Configures settings for the application.

19. **handleOnButtonClicked<TData extends Record<string, any>>(handler: (context: TurnContext, state: TState, data: TData) => Promise<void>): Application<TState>**  
    Registers a handler for button click events in message extensions.

---

### **Protected Methods**:

1. **continueConversationAsync(context: TurnContext | Partial<ConversationReference> | Partial<Activity>, logic: (context: TurnContext) => Promise<void>): Promise<void>**  
   Continues a conversation asynchronously.

2. **callEventHandlers(context: TurnContext, state: TState, handlers: Array<(context: TurnContext, state: TState) => Promise<void>>): Promise<boolean>**  
   Calls the registered event handlers.

3. **startLongRunningCall(turnContext: TurnContext, interruptConversation: boolean, logic: (context: TurnContext) => Promise<void>): Promise<boolean>**  
   Starts a long-running call.

4. **startTypingTimer(context: TurnContext): void**  
   Starts a typing indicator timer.

5. **stopTypingTimer(): void**  
   Stops the typing indicator timer.

---

### **Public Properties**:

1. **adapter**: `BotAdapter`  
   The bot's adapter that is configured for the application.

2. **ai**: `AI<TState>`  
   Fluent interface for accessing AI-specific features, available if the application was configured with AI options.

3. **authentication**: `AuthenticationManager<TState>`  
   Fluent interface for accessing authentication-specific features, available if the application was configured with authentication options.

4. **adaptiveCards**: `AdaptiveCards<TState>`  
   Fluent interface for accessing Adaptive Card-specific features.

5. **messageExtensions**: `MessageExtensions<TState>`  
   Fluent interface for accessing message extension-specific features.

6. **meetings**: `Meetings<TState>`  
   Fluent interface for accessing meetings-specific features.

7. **options**: `ApplicationOptions<TState>`  
   The application's configured options.

8. **taskModules**: `TaskModules<TState>`  
   Fluent interface for accessing task module-specific features.

---

### **Protected Properties**:

1. **_adapter**: `Adapter`  
   The adapter used for communication with the bot framework.

2. **_options**: `ApplicationOptions<TState>`  
   The configuration options for the application.

3. **_routes**: `Array<Route>`  
   The list of routes registered in the application.

4. **_invokeRoutes**: `Array<Route>`  
   The list of invoke routes registered in the application.

5. **_beforeTurn**: `Array<(context: TurnContext, state: TState) => Promise<void>>`  
   Handlers to be called before each turn.

6. **_afterTurn**: `Array<(context: TurnContext, state: TState) => Promise<void>>`  
   Handlers to be called after each turn.

7. **_typingTimer**: `NodeJS.Timeout | undefined`  
   Timer for managing typing indicators.

8. **_longRunningCall**: `boolean`  
   Indicates whether a long-running call is in progress.

---

### **Type Dependencies**:

1. `TurnContext`
2. `TState`
3. `RouteSelector`
4. `RouteHandler<TState>`
5. `ApplicationOptions<TState>`
6. `AdaptiveCards<TState>`
7. `AI<TState>`
8. `AuthenticationManager<TState>`
9. `MessageExtensions<TState>`
10. `Meetings<TState>`
11. `TaskModules<TState>`
12. `BotAdapter`
13. `ConversationUpdateEvents`
14. `TeamsMessageEvents`
15. `MessageReactionEvents`
16. `FileConsentCardResponse`
17. `O365ConnectorCardActionQuery`
18. `FeedbackLoopData`
19. `ResourceResponse`
20. `Activity`
21. `Adapter`
22. `Route`

### Explore Type Dependencies for the AuthError class

### AuthError Class

**Description**: The `AuthError` class represents an error that occurs during the authentication process. It encapsulates an error message and a specific reason for the error, which helps in identifying the cause of the authentication failure.

### Public Methods

- **constructor**: 
  ```typescript
  constructor(message?: string, reason: AuthErrorReason = 'other')
  ```
  Creates a new instance of the `AuthError` class with an optional error message and a reason for the error.

### Public Properties

- **cause**: `AuthErrorReason`  
  The cause of the authentication error, which provides more context on why the error occurred.

### Type Dependencies

- **AuthErrorReason**: A type that defines the possible reasons for an authentication error. It can be one of the following values:
  - `'invalidActivity'`
  - `'completionWithoutToken'`
  - `'other'`

### Explore Type Dependencies for the Authentication class

### Class: `Authentication<TState extends TurnState>`

#### Description:
The `Authentication` class is responsible for managing user authentication processes within the Teams AI library. It handles user sign-in, sign-out, and token management, and supports various authentication settings such as OAuth and Teams Single Sign-On (SSO). The class also provides mechanisms to handle success and failure during the sign-in process.

---

### Public Properties:
1. **settings**: `OAuthSettings | TeamsSsoSettings`
   - The authentication settings used for OAuth or Teams SSO.

2. **_name**: `string`
   - The name of the connection used for authentication.

---

### Public Methods:
1. **constructor**(app: `Application`, name: `string`, settings: `OAuthSettings | TeamsSsoSettings`, storage?: `Storage`, messageExtensionsAuth?: `MessageExtensionAuthenticationBase`, botAuth?: `BotAuthenticationBase<TState>`, adaptiveCardAuth?: `AdaptiveCardAuthenticationBase`)
   - Initializes a new instance of the `Authentication` class with the provided settings and optional storage and authentication mechanisms.

2. **signInUser**(context: `TurnContext`, state: `TState`): `Promise<string | undefined>`
   - Signs in a user and returns the authentication token or `undefined` if the user is still in the process of logging in.

3. **signOutUser**(context: `TurnContext`, state: `TState`): `Promise<void>`
   - Signs out the user from the current session.

4. **isUserSignedIn**(context: `TurnContext`): `Promise<string | undefined>`
   - Checks if the user is signed in and returns the authentication token if they are.

5. **onUserSignInSuccess**(handler: (context: `TurnContext`, state: `TState`) => `Promise<void>`): `void`
   - Registers a handler function to be called when the user successfully signs in.

6. **onUserSignInFailure**(handler: (context: `TurnContext`, state: `TState`, error: `AuthError`) => `Promise<void>`): `void`
   - Registers a handler function to be called when the user sign-in process fails.

---

### Type Dependencies:
1. **TurnState**
   - Represents the state of the current turn in the bot framework.

2. **Application**
   - Represents the application instance used in the constructor.

3. **Storage**
   - Optional storage used to persist authentication states.

4. **TurnContext**
   - Represents the context of the current turn, used in various methods for managing user sessions.

5. **OAuthSettings**
   - Represents the settings for OAuth-based authentication.

6. **TeamsSsoSettings**
   - Represents the settings for Teams Single Sign-On (SSO) authentication.

7. **MessageExtensionAuthenticationBase**
   - Base class for handling authentication in message extensions.

8. **BotAuthenticationBase**
   - Base class for handling bot-related authentication.

9. **AdaptiveCardAuthenticationBase**
   - Base class for handling authentication via adaptive cards.

10. **AuthError**
    - Represents errors that occur during the authentication process.

### Explore Type Dependencies for the AuthenticationManager class

### Class: `AuthenticationManager`

#### Description:
The `AuthenticationManager` class is responsible for managing authentication settings and processes within the application. It allows for the retrieval and management of different authentication settings and provides methods for signing users in and out. This class interacts with various authentication mechanisms and manages the state of user authentication during a conversation turn.

---

### Public & Protected Methods:

1. **`constructor(app: Application, options: AuthenticationOptions): AuthenticationManager<TurnState>`**
   - Initializes the `AuthenticationManager` with the provided application and authentication options.

2. **`get(settingName: string): Authentication<TurnState>`**
   - Retrieves the authentication setting by its name.

3. **`signUserIn(context: TurnContext, state: TurnState, settingName?: string): Promise<{ status: string; error?: Error; cause?: string; }>`**
   - Signs the user in using the specified authentication setting. Returns a promise with the status of the sign-in process, and optionally an error or cause if the sign-in fails.

4. **`signOutUser(context: TurnContext, state: TurnState, settingName?: string): Promise<void>`**
   - Signs the user out using the specified authentication setting. Returns a promise that resolves when the sign-out process is complete.

---

### Public & Protected Properties:

1. **`default: string`**
   - The default setting name used by the manager.

2. **`settings: { [key: string]: AuthenticationOptions }`**
   - A dictionary of authentication settings provided to the manager, where the key is the setting name and the value is the corresponding `AuthenticationOptions`.

---

### Type Dependencies:

1. **`Application`** - Represents the application that the `AuthenticationManager` interacts with.
2. **`AuthenticationOptions`** - Defines the options that configure the authentication settings.
3. **`TurnContext`** - Provides the context for the current turn of the conversation.
4. **`TurnState`** - Holds temporary data for the current turn of the conversation.
5. **`Authentication<TurnState>`** - Handles the actual authentication logic for a given setting.
6. **`Error`** - Represents an error that may occur during the sign-in or sign-out process.

### Explore Type Dependencies for the TurnState class

### TurnState Class Definition

**Class Name:** TurnState

**Description:**  
The `TurnState` class is responsible for managing the state during a turn in a bot framework. It provides access to conversation, user, and temporary state data, allowing for the storage, retrieval, and deletion of state information associated with the current turn context. The class also supports loading and saving state from storage, as well as managing state scopes.

---

#### Public Properties:
- **conversation**: `TConversationState`  
  Accessor for the conversation-specific state.
  
- **temp**: `TTempState`  
  Accessor for the temporary state, which holds transient data for the current turn.
  
- **user**: `TUserState`  
  Accessor for the user-specific state.
  
- **isLoaded**: `boolean`  
  Indicates whether the turn state has been successfully loaded.

---

#### Protected Properties:
- **storage**: `Storage`  
  The storage mechanism used to persist state data.

---

#### Public Methods:
- **load(context: TurnContext, storage?: Storage): Promise<boolean>**  
  Loads all state scopes (conversation, user, and temporary) for the current turn from the provided context and storage.

- **save(context: TurnContext, storage?: Storage): Promise<void>**  
  Saves all state scopes for the current turn to the provided context and storage.

- **deleteConversationState(): void**  
  Deletes the conversation-specific state from storage.

- **deleteTempState(): void**  
  Deletes the temporary state.

- **deleteUserState(): void**  
  Deletes the user-specific state from storage.

- **getScope(scope: string): TurnStateEntry | undefined**  
  Retrieves a state scope by its name.

- **deleteValue(path: string): void**  
  Deletes a value from the state memory at the specified path.

- **hasValue(path: string): boolean**  
  Checks if a value exists in the state memory at the specified path.

- **getValue<TValue = unknown>(path: string): TValue**  
  Retrieves a value from the state memory at the specified path.

- **setValue(path: string, value: unknown): void**  
  Sets a value in the state memory at the specified path.

---

#### Protected Methods:
- **onComputeStorageKeys(context: TurnContext): Promise<Record<string, string>>**  
  Computes the storage keys for the state scopes being persisted based on the current turn context.

---

#### Type Dependencies:
- **TurnContext**  
  Represents the context of the current turn of conversation, used in the `load` and `save` methods.

- **Storage**  
  Used for managing the persistence of state data in the `load` and `save` methods.

- **TurnStateEntry**  
  Represents an individual state scope, used in the `getScope` method.

- **TConversationState**  
  The type representing the conversation-specific state.

- **TTempState**  
  The type representing the temporary state.

- **TUserState**  
  The type representing the user-specific state.

- **DefaultConversationState**  
  Default type for conversation state.

- **DefaultUserState**  
  Default type for user state.

- **DefaultTempState**  
  Default type for temporary state.

### Explore Type Dependencies for the Activity class

### Class: `Activity`

#### Description:
The `Activity` class represents an activity in a bot conversation, typically used to handle various types of interactions such as messages, events, and commands. It is part of the bot framework and is located in the file `packages\teams-ai\src\Activity.ts`. The class interacts with other components like `TurnContext`, `TurnState`, and `ReadReceiptInfo` to manage the flow of conversation and user interactions.

#### Public & Protected Methods:
1. **stopTypingTimer(): void**  
   Manually stops the typing indicator timer.

2. **turn(event: TurnEvents | TurnEvents[], handler: (context: TurnContext, state: TState) => Promise<boolean>): this**  
   Registers a handler for a specific turn event or multiple events.

3. **teamsReadReceipt(handler: (context: TurnContext, state: TState, readReceiptInfo: ReadReceiptInfo) => Promise<void>): this**  
   Adds a handler for the Teams' read receipt event.

4. **getTokenOrStartSignIn(context: TurnContext, state: TState, settingName: string): Promise<string | undefined>**  
   Retrieves the user's access token if they are signed in, or initiates the sign-in process if they are not.

#### Public & Protected Properties:
1. **_typingTimer**: (type not specified)  
   Internal property used to manage the typing indicator timer.

2. **_beforeTurn**: (type not specified)  
   Internal property for managing actions before a turn event.

3. **_afterTurn**: (type not specified)  
   Internal property for managing actions after a turn event.

4. **_conversations**: (type not specified)  
   Internal property related to conversation management.

5. **_options**: (type not specified)  
   Internal property for storing configuration options.

6. **authentication**: (type not specified)  
   Property related to managing authentication within the activity.

#### Type Dependencies:
- **TurnContext**  
  Represents the context of the current turn in the conversation.

- **TurnState**  
  Represents the state of the conversation during a turn.

- **ReadReceiptInfo**  
  Contains information about read receipts in Microsoft Teams.

- **TurnEvents**  
  Represents events that occur during a turn in the conversation.



### Explore Type Dependencies for the TurnContext class

### TurnContext Class

**Class Name**: `TurnContext`

**Description**:  
The `TurnContext` class represents the context of a single turn of conversation with a user. It provides access to the incoming activity, the state for the current turn, and methods to send messages or respond to the user. It is a core component in managing the flow of conversation in a bot framework, allowing developers to handle user interactions, manage state, and send responses.

---

### Public & Protected Methods

1. **activity(type: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[], handler: (context: TurnContext, state: TState) => Promise<void>): this**  
   Registers a handler for a specific activity type or pattern.

2. **conversationUpdate(event: ConversationUpdateEvents, handler: (context: TurnContext, state: TState) => Promise<void>): this**  
   Registers a handler for conversation update events.

3. **messageEventUpdate(event: TeamsMessageEvents, handler: (context: TurnContext, state: TState) => Promise<void>): this**  
   Registers a handler for message event updates.

4. **sendActivity(activity: Activity | string): Promise<void>**  
   Sends an activity or message to the user.

5. **respondToActivity(activityId: string, activity: Partial<Activity>): Promise<void>**  
   Responds to a specific activity by its ID.

6. **continueConversationAsync(context: TurnContext, logic: (context: TurnContext) => Promise<void>): Promise<void>**  
   (Private) Continues a conversation asynchronously using the provided logic.

7. **continueConversationAsync(conversationReference: Partial<ConversationReference>, logic: (context: TurnContext) => Promise<void>): Promise<void>**  
   (Private) Continues a conversation asynchronously using a conversation reference.

8. **continueConversationAsync(activity: Partial<Activity>, logic: (context: TurnContext) => Promise<void>): Promise<void>**  
   (Private) Continues a conversation asynchronously using a partial activity.

9. **run(turnContext: TurnContext, interruptConversation: boolean = false): Promise<boolean>**  
   Runs the conversation logic for the current turn.

10. **sendProactiveActivity(context: TurnContext, activityOrText: string | Partial<Activity>, speak?: string, inputHint?: string): Promise<ResourceResponse | undefined>**  
    Sends a proactive activity to the user.

11. **startTypingTimer(context: TurnContext): void**  
    Starts a typing indicator timer for the user.

---

### Public & Protected Properties

1. **activity**: `Activity`  
   Represents the incoming activity for the current turn.

2. **turnState**: `TurnState`  
   Represents the state for the current turn of conversation.

3. **_adapter**: `AdapterType`  
   (Protected) The adapter used for the current turn.

4. **_options**: `ApplicationOptions`  
   (Protected) Options for the current application.

5. **_routes**: `Route[]`  
   (Protected) Routes for handling activities.

6. **_invokeRoutes**: `Route[]`  
   (Protected) Routes for handling invoke activities.

7. **_beforeTurn**: `EventHandler[]`  
   (Protected) Handlers to be executed before the turn starts.

8. **_afterTurn**: `EventHandler[]`  
   (Protected) Handlers to be executed after the turn ends.

9. **_typingTimer**: `NodeJS.Timeout | null`  
   (Protected) Timer for managing typing indicators.

---

### Type Dependencies

- **Activity**  
  Represents the activity being processed in the current turn.

- **TurnState**  
  Represents the state for the current turn of conversation.

- **ConversationReference**  
  Used to reference a specific conversation.

- **ResourceResponse**  
  Represents the response from sending an activity.

- **Route**  
  Defines a route for handling specific activities.

- **ApplicationOptions**  
  Configuration options for the application.

- **AdapterType**  
  The type of adapter used for the current turn.

- **EventHandler**  
  Represents a handler for events before or after a turn.

- **TState**  
  Represents the state type for the current turn.

- **TeamsMessageEvents**  
  Represents events related to Teams messages.

- **ConversationUpdateEvents**  
  Represents events related to conversation updates.

### Explore Type Dependencies for the OAuthPromptMessageExtensionAuthentication class

### Class: `OAuthPromptMessageExtensionAuthentication`

#### Description:
The `OAuthPromptMessageExtensionAuthentication` class is responsible for handling OAuth authentication specifically for message extensions in a bot application. It manages the Single Sign-On (SSO) token exchange and user sign-in processes for Teams message extensions, ensuring that users are authenticated before interacting with the bot.

#### Public Methods:
1. **constructor(settings: OAuthPromptSettings)**
   - Initializes a new instance of the `OAuthPromptMessageExtensionAuthentication` class with the provided OAuth settings.
   - **Parameters**: 
     - `settings: OAuthPromptSettings` - The OAuth settings used for authentication.

2. **async authenticate(context: TurnContext): Promise<string | undefined>**
   - Authenticates the user based on the provided context.
   - **Parameters**: 
     - `context: TurnContext` - The context of the current turn in the bot.
   - **Returns**: A promise that resolves to a string (the authentication token) or `undefined` if authentication fails.

3. **async handleSsoTokenExchange(context: TurnContext): Promise<TokenResponse | undefined>**
   - Handles the SSO token exchange process.
   - **Parameters**: 
     - `context: TurnContext` - The context of the current turn in the bot.
   - **Returns**: A promise that resolves to a `TokenResponse` or `undefined` if the token exchange fails.

4. **async handleUserSignIn(context: TurnContext, magicCode: string): Promise<TokenResponse | undefined>**
   - Handles the sign-in or verify state activity for the user.
   - **Parameters**: 
     - `context: TurnContext` - The context of the current turn in the bot.
     - `magicCode: string` - The magic code used for user sign-in.
   - **Returns**: A promise that resolves to a `TokenResponse` or `undefined` if sign-in fails.

5. **async getSignInLink(context: TurnContext): Promise<string | undefined>**
   - Retrieves the sign-in link for the user.
   - **Parameters**: 
     - `context: TurnContext` - The context of the current turn in the bot.
   - **Returns**: A promise that resolves to a string (the sign-in link) or `undefined` if the link cannot be generated.

6. **isSsoSignIn(context: TurnContext): boolean**
   - Determines if the current activity is a sign-in request for SSO.
   - **Parameters**: 
     - `context: TurnContext` - The context of the current turn in the bot.
   - **Returns**: A boolean indicating whether the activity is an SSO sign-in request.

7. **isValidActivity(context: TurnContext): boolean**
   - Checks if the provided activity context is valid for authentication.
   - **Parameters**: 
     - `context: TurnContext` - The context of the current turn in the bot.
   - **Returns**: A boolean indicating whether the activity is valid for authentication.

#### Protected Properties:
1. **settings: OAuthPromptSettings**
   - The OAuth settings used for authentication.
   - **Type**: `OAuthPromptSettings`

2. **tokenResponse: TokenResponse | undefined**
   - Stores the token response after a successful authentication or token exchange.
   - **Type**: `TokenResponse | undefined`

#### Type Dependencies:
1. **OAuthPromptSettings** - Used for configuring OAuth settings.
2. **TurnContext** - Represents the context of the current turn in the bot.
3. **TokenResponse** - Represents the response from a token exchange or sign-in process.
4. **UserTokenAccess** - Used for accessing user tokens during the authentication process.
5. **MessageExtensionAuthenticationBase** - The base class that provides common authentication functionality for message extensions.
6. **OAuthSettings** - Represents the settings required for OAuth authentication.
7. **MessageExtensionsInvokeNames** - Used to identify specific message extension invoke names during authentication.

### Explore Type Dependencies for the OAuthBotAuthentication class

### Class Definition: `OAuthBotAuthentication`

**Description**:  
The `OAuthBotAuthentication` class is responsible for handling OAuth-based authentication for bots in the Microsoft Teams environment. It manages the authentication flow, including token exchange, sign-in activities, and state management, allowing bots to authenticate users and handle OAuth prompts.

---

### Public & Protected Methods:

1. **`constructor(app: Application<TState>, oauthSettings: OAuthSettings, settingName: string, storage?: Storage)`**  
   Initializes a new instance of the `OAuthBotAuthentication` class.

2. **`authenticate(context: TurnContext, state: TState): Promise<string | undefined>`**  
   Authenticates the user and returns a token if successful.

3. **`deleteAuthFlowState(context: TurnContext, state: TState): Promise<void>`**  
   Deletes the authentication flow state for the user.

4. **`isValidActivity(context: TurnContext): boolean`**  
   Checks if the incoming activity is valid for initiating authentication.

5. **`onUserSignInSuccess(handler: (context: TurnContext, state: TState) => Promise<void>): void`**  
   Sets a handler function to be called when the user successfully signs in.

6. **`onUserSignInFailure(handler: (context: TurnContext, state: TState, error: AuthError) => Promise<void>): void`**  
   Sets a handler function to be called when the user sign-in fails.

7. **`runDialog(context: TurnContext, state: TState, dialogStateProperty: string): Promise<DialogTurnResult<TokenResponse>>`**  
   Runs or continues the OAuthPrompt dialog and returns the result.

8. **`continueDialog(context: TurnContext, state: TState, dialogStateProperty: string): Promise<DialogTurnResult<TokenResponse>>`**  
   Continues the OAuthPrompt dialog and returns the result.

9. **`createDialogContext(context: TurnContext, state: TState, dialogStateProperty: string): Promise<DialogContext>`**  
   Creates a new DialogContext for OAuthPrompt.

10. **`createOAuthCard(context: TurnContext): Promise<Attachment>`**  
    Creates an OAuthCard that will be sent to the user.

---

### Public & Protected Properties:

1. **`settings: OAuthSettings`**  
   The settings for OAuth authentication.

2. **`name: string`**  
   The name of the OAuth connection.

3. **`_app: Application<TState>`**  
   The application instance associated with the bot.

4. **`_storage: Storage`**  
   A storage instance for managing state.

5. **`_tokenExchangeUri?: string`**  
   Optional URI for token exchange.

6. **`_enableSso?: boolean`**  
   Optional flag to enable Single Sign-On (SSO).

7. **`_oauthPrompt: OAuthPrompt`**  
   The OAuthPrompt instance used for handling OAuth dialogs.

---

### Type Dependencies:

1. **`Application<TState>`**
2. **`OAuthSettings`**
3. **`Storage`**
4. **`TurnContext`**
5. **`TState`**
6. **`DialogContext`**
7. **`DialogSet`**
8. **`DialogState`**
9. **`DialogTurnResult<TokenResponse>`**
10. **`TokenResponse`**
11. **`Attachment`**
12. **`OAuthPrompt`**
13. **`AuthError`**
14. **`TurnState`**
15. **`TurnStateProperty`**
16. **`FilteredTeamsSSOTokenExchangeMiddleware`**
17. **`getSignInResource`**

### Explore Type Dependencies for the OAuthAdaptiveCardAuthentication class

**Class Name**: `OAuthAdaptiveCardAuthentication`

**Description**:  
The `OAuthAdaptiveCardAuthentication` class is responsible for handling OAuth authentication specifically for adaptive cards in a bot framework context. It extends the `AdaptiveCardAuthenticationBase` class and provides methods for managing OAuth authentication flows, including token exchange and user sign-in, within Microsoft Teams or similar environments.

---

### Public & Protected Methods:

1. **Constructor**:
   ```typescript
   constructor(settings: OAuthSettings)
   ```
   - Initializes the class with OAuth settings.

2. **authenticate** (Public):
   ```typescript
   public authenticate(context: TurnContext): Promise<string | undefined>
   ```
   - Authenticates the user based on the provided `TurnContext`.

3. **handleSsoTokenExchange** (Protected):
   ```typescript
   protected handleSsoTokenExchange(context: TurnContext): Promise<TokenResponse | undefined>
   ```
   - Handles the exchange of an SSO token for an OAuth token.

4. **isValidActivity** (Public):
   ```typescript
   public isValidActivity(context: TurnContext): boolean
   ```
   - Validates if the activity in the `TurnContext` is appropriate for OAuth authentication.

5. **handleUserSignIn** (Inherited from `AdaptiveCardAuthenticationBase`):
   ```typescript
   public handleUserSignIn(context: TurnContext, magicCode: string): Promise<TokenResponse | undefined>
   ```
   - Handles user sign-in using a magic code.

6. **getLoginRequest** (Inherited from `AdaptiveCardAuthenticationBase`):
   ```typescript
   public getLoginRequest(context: TurnContext): Promise<AdaptiveCardLoginRequest>
   ```
   - Retrieves the login request for the adaptive card.

---

### Public & Protected Properties:

1. **settings** (Public):
   ```typescript
   public settings: OAuthSettings
   ```
   - The OAuth settings used for authentication.

2. **tokenExchangeUri** (Public):
   ```typescript
   public tokenExchangeUri: string | undefined
   ```
   - The URI used for token exchange.

3. **enableSso** (Public):
   ```typescript
   public enableSso: boolean
   ```
   - Indicates whether SSO (Single Sign-On) is enabled.

4. **connectionName** (Public):
   ```typescript
   public connectionName: string
   ```
   - The name of the OAuth connection.

5. **title** (Public):
   ```typescript
   public title: string
   ```
   - The title associated with the authentication process.

---

### Type Dependencies:

- `TurnContext` (from 'botbuilder-core')
- `TokenResponse` (from 'botbuilder-core')
- `OAuthSettings` (from './Authentication')
- `AdaptiveCardAuthenticationBase` (from './AdaptiveCardAuthenticationBase')
- `AdaptiveCardLoginRequest` (from './AdaptiveCardAuthenticationBase')
- `AuthError` (from './Authentication')
- `UserTokenAccess` (from './UserTokenAccess')
- `ActivityTypes` (from 'botbuilder-core')

### Explore Type Dependencies for the AdaptiveCardAuthenticationBase class

**Class: AdaptiveCardAuthenticationBase**

**Description:**
The `AdaptiveCardAuthenticationBase` class is an abstract class designed to handle authentication for Adaptive Cards in Microsoft Teams. It provides methods for authenticating users, handling token exchanges, and managing sign-in processes. This class is intended to be extended by other classes that implement specific authentication mechanisms, such as OAuth or Teams SSO.

---

### **Public Methods:**

1. **`public async authenticate(context: TurnContext): Promise<string | undefined>`**
   - Authenticates the user and returns an authentication token or `undefined` if authentication fails.

2. **`public isValidActivity(context: TurnContext): boolean`**
   - Checks if the activity is a valid Adaptive Card activity that supports authentication.

---

### **Protected Methods:**

1. **`protected abstract handleSsoTokenExchange(context: TurnContext): Promise<TokenResponse | undefined>`**
   - Handles the Single Sign-On (SSO) token exchange process.

2. **`protected abstract handleUserSignIn(context: TurnContext, magicCode: string): Promise<TokenResponse | undefined>`**
   - Manages the user sign-in process using a provided magic code.

3. **`protected abstract getLoginRequest(context: TurnContext): Promise<AdaptiveCardLoginRequest>`**
   - Retrieves the login request for Adaptive Card authentication.

---

### **Public Properties:**
None specified.

---

### **Protected Properties:**
None specified.

---

### **Type Dependencies:**

1. **`TurnContext`** - Used for handling the context of the current turn in a conversation.
2. **`TokenResponse`** - Represents the response containing the authentication token.
3. **`AdaptiveCardLoginRequest`** - Represents the login request for Adaptive Card authentication.

### Explore Type Dependencies for the TeamsSsoSettings class

### TeamsSsoSettings Class Definition

**Class Name:** `TeamsSsoSettings`

**Description:**  
The `TeamsSsoSettings` class encapsulates the configuration settings required for Single Sign-On (SSO) functionality in Microsoft Teams applications. It includes properties for defining the necessary authentication scopes, MSAL (Microsoft Authentication Library) configuration, and other optional settings such as timeouts and sign-in links.

### Public Properties
- `scopes: string[]`  
  An array of strings representing the permission scopes required for SSO authentication.

- `msalConfig: { auth: { clientId: string; clientSecret: string; authority: string } }`  
  An object containing the MSAL configuration for authentication, including the client ID, client secret, and authority URL.

- `signInLink: string`  
  The URL to redirect users for signing in.

- `timeout?: number`  
  An optional timeout value (in milliseconds) for the SSO process.

- `endOnInvalidMessage?: boolean`  
  An optional flag indicating whether to end the SSO process if an invalid message is received.

### Type Dependencies
- `string`  
  Used for properties like `clientId`, `clientSecret`, `authority`, and `signInLink`.

- `string[]`  
  Used for the `scopes` property.

- `number`  
  Used for the optional `timeout` property.

- `boolean`  
  Used for the optional `endOnInvalidMessage` property.

- `{ auth: { clientId: string; clientSecret: string; authority: string } }`  
  A nested object type for the `msalConfig` property, representing the MSAL authentication configuration.

- `Configuration`  
  From the `@azure/msal-node` package, used for the `msalConfig` property.

### Public & Protected Methods
There are no specific public or protected methods explicitly listed for the `TeamsSsoSettings` class in the available information. However, based on its usage in related classes, it is likely that this class is primarily used for configuration purposes rather than containing its own methods.

### Explore Type Dependencies for the TextSection class

### Class Definition: `TextSection`

#### Description:
The `TextSection` class represents a section of text that can be rendered as a message in a conversational context. It is designed to handle text-based content, which can be rendered either as a string or as an array of message objects. The class supports tokenization and can be customized with various properties such as role, required status, and separators.

---

### Public Properties:
- **`text: string`**  
  The text content of the section.

- **`role: string`**  
  The role associated with the text (e.g., "user", "assistant").

- **`tokens?: number`**  
  The number of tokens allocated for this section. Optional.

- **`required?: boolean`**  
  Indicates whether this section is required. Optional.

- **`separator?: string`**  
  A string used to separate different parts of the text. Optional.

- **`textPrefix?: string`**  
  A prefix to be added before the text when rendering. Optional.

---

### Protected Properties:
- **`_length: number`**  
  The length of the rendered text or message, typically in terms of tokens.

---

### Public Methods:
- **`constructor(text: string, role: string, tokens?: number, required?: boolean, separator?: string, textPrefix?: string)`**  
  Initializes a new instance of the `TextSection` class with the provided text, role, and optional parameters for tokens, required status, separator, and text prefix.

- **`async renderAsMessages(context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<Message[]>>`**  
  Renders the text section as an array of message objects, considering the token budget and other constraints.

- **`async renderAsText(context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<string>>`**  
  Renders the text section as a string, considering the token budget and other constraints.

---

### Protected Methods:
- **`protected getTokenBudget(maxTokens: number): number`**  
  Calculates the token budget for the section based on the maximum allowed tokens.

- **`protected returnMessages(output: Message[], length: number, tokenizer: Tokenizer, maxTokens: number): RenderedPromptSection<Message[]>`**  
  Returns the rendered messages along with their length and whether they exceed the token limit.

---

### Type Dependencies:
- **`Message`**  
  Represents a message object that can be rendered by the section.

- **`PromptFunctions`**  
  A set of functions that can be used to dynamically generate content for the section.

- **`RenderedPromptSection<T>`**  
  Represents the result of rendering a section, including the output, length, and whether the content is too long.

- **`TurnContext`**  
  Provides context for the current turn in a conversation, including information about the user and the bot.

- **`Tokenizer`**  
  A utility for tokenizing text, used to ensure that the rendered content fits within the token budget.

- **`Memory`**  
  Represents the memory or state of the conversation, which can be used to retrieve or store information.



### Explore Type Dependencies for the AssistantsClient class

### Class Definition: `AssistantsClient`

#### Description:
The `AssistantsClient` class is a client for interacting with the OpenAI Assistants API, specifically designed to manage threads, messages, and runs. It is a subclass of the `AssistantsClient` from the `@azure/openai-assistants` package. This class provides methods to create and manage assistant threads, messages, and runs, as well as submit tool outputs. It is instantiated with an endpoint and a credential (either `AzureKeyCredential` or `OpenAIKeyCredential`), and it manages state related to API interactions.

---

### Public Methods:
1. **`createMessage(threadId: string, role: MessageRole, content: string, options?: CreateMessageOptions): Promise<ThreadMessage>`**
   - Creates a new message in a specified thread.

2. **`createThread(body?: AssistantThreadCreationOptions, options?: CreateThreadOptions): Promise<AssistantThread>`**
   - Creates a new thread for the assistant.

3. **`listMessages(threadId: string, options?: ListMessagesOptions): Promise<ListResponseOf<ThreadMessage>>`**
   - Lists all messages in a specified thread.

4. **`createRun(threadId: string, createRunOptions: CreateRunOptions, options?: CreateRunRequestOptions): Promise<ThreadRun>`**
   - Creates a new run for a specified thread.

5. **`getRun(threadId: string, runId: string, options?: GetRunOptions): Promise<ThreadRun>`**
   - Retrieves details of a specific run in a thread.

6. **`listRuns(threadId: string, options?: ListRunsOptions): Promise<ListResponseOf<ThreadRun>>`**
   - Lists all runs in a specified thread.

7. **`submitToolOutputsToRun(threadId: string, runId: string, toolOutputs: ToolOutput[], options?: SubmitToolOutputsToRunOptions): Promise<ThreadRun>`**
   - Submits tool outputs to a specific run in a thread.

---

### Public Properties:
1. **`_threads: AssistantThread[]`**
   - Stores the list of assistant threads.

2. **`_messages: { [key: string]: ThreadMessage[] }`**
   - Stores messages for each thread, indexed by thread ID.

3. **`_runs: { [key: string]: ThreadRun[] }`**
   - Stores runs for each thread, indexed by thread ID.

4. **`remainingActions: RequiredAction[]`**
   - Stores the list of remaining required actions for the assistant.

5. **`remainingRunStatus: string[]`**
   - Stores the status of remaining runs.

6. **`remainingMessages: string[]`**
   - Stores the list of remaining messages to be processed.

7. **`_assistant: Assistant`**
   - Represents the assistant instance associated with the client.

---

### Protected Methods:
- **(Not explicitly listed, but may inherit protected members from its superclass)**

---

### Protected Properties:
- **(Not explicitly listed, but may inherit protected members from its superclass)**

---

### Type Dependencies:
1. **`AssistantThread`**
2. **`ThreadMessage`**
3. **`ThreadRun`**
4. **`RequiredAction`**
5. **`MessageRole`**
6. **`CreateMessageOptions`**
7. **`AssistantThreadCreationOptions`**
8. **`CreateThreadOptions`**
9. **`ListMessagesOptions`**
10. **`CreateRunOptions`**
11. **`CreateRunRequestOptions`**
12. **`GetRunOptions`**
13. **`ListRunsOptions`**
14. **`ListResponseOf<T>`**
15. **`ToolOutput`**
16. **`Assistant`**
17. **`AzureKeyCredential`**
18. **`OpenAIKeyCredential`**

This class is designed to facilitate interaction with the OpenAI Assistants API, providing a structured way to manage conversations, actions, and tool outputs within the context of assistant threads and runs.

### Explore Type Dependencies for the OpenAIKeyCredential class

**Class: OpenAIKeyCredential**

**Description:**
The `OpenAIKeyCredential` class is responsible for handling and managing credentials (API keys) required to authenticate and interact with OpenAI services. It is imported from the `@azure/openai-assistants` package.

**Public & Protected Methods:**
- The specific methods of the `OpenAIKeyCredential` class are not provided in the available information.

**Public & Protected Properties:**
- The specific properties of the `OpenAIKeyCredential` class are not provided in the available information.

**Type Dependencies:**
- The `OpenAIKeyCredential` class depends on the `@azure/openai-assistants` package.

Note: The detailed methods and properties of the class are not available in the provided information.

### Explore Type Dependencies for the PromptFunctions class

### Class Definition: `PromptFunctions`

**Description:**  
The `PromptFunctions` class is designed to handle various prompt-related functionalities, particularly in the context of AI or chatbot interactions. It includes methods for managing user interactions, sending adaptive cards, controlling lights, and managing delays. Additionally, it supports text generation and sequence management using models like `gpt-3.5-turbo`.

### Public Methods:
- **`public SendCard(card: object): void`**  
  Sends an adaptive card to the user. The `card` parameter is an object representing the adaptive card.

- **`public LightsOn(): void`**  
  Turns on the lights.

- **`public LightsOff(): void`**  
  Turns off the lights.

- **`public Pause(time: number): void`**  
  Pauses execution for a specified period of time in milliseconds. The `time` parameter is the duration of the pause.

- **`public generatePrompt(input_text: string): string`**  
  Generates a prompt based on the provided input text.

- **`public setParameters(max_input_tokens: number, max_tokens: number, temperature: number, top_p: number, presence_penalty: number, frequency_penalty: number): void`**  
  Sets the parameters for text generation, including token limits and model behavior.

### Protected Methods:
- **`protected validateTime(time: number): boolean`**  
  Validates the time parameter for the `Pause` function to ensure it is a valid number.

- **`protected _apply_augmentation(sequence: string): string`**  
  Applies augmentation to a sequence of text, likely used in the context of sequence management.

### Public Properties:
- **`public lightsStatus: boolean`**  
  Indicates whether the lights are currently on (`true`) or off (`false`).

- **`public pauseDuration: number`**  
  Stores the duration for the pause function.

- **`public max_input_tokens: number`**  
  Maximum number of input tokens allowed for text generation.

- **`public max_tokens: number`**  
  Maximum number of tokens to generate in a response.

- **`public temperature: number`**  
  Controls the randomness of the text generation. Higher values make the output more random.

- **`public top_p: number`**  
  Controls the diversity of the text generation by sampling from the top `p` probability mass.

- **`public presence_penalty: number`**  
  Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics.

- **`public frequency_penalty: number`**  
  Penalizes new tokens based on their frequency in the text so far, reducing repetition.

### Protected Properties:
- **`protected defaultPauseTime: number`**  
  A default value for the pause duration if no time is specified.

- **`protected _augmentation_type: string`**  
  Defines the type of augmentation applied, such as "sequence" or "monologue".

### Type Dependencies:
- `object` (for adaptive card parameter in `SendCard`)
- `number` (for time, token limits, and model parameters)
- `boolean` (for lights status)
- `string` (for input text and sequence augmentation)

### Explore Type Dependencies for the Memory class

### Memory Class Definition

**Class Name:** `Memory`

**Description:**  
The `Memory` class represents a key-value store used to manage and retrieve data related to the application's state or context. It provides methods for setting, getting, checking, and deleting values in a hierarchical memory structure, allowing for scoped memory management.

---

### Public Methods:

- **`deleteValue(path: string): void`**  
  Deletes the value at the specified path in the memory.

- **`hasValue(path: string): boolean`**  
  Checks if a value exists at the specified path in the memory.

- **`getValue<TValue = unknown>(path: string): TValue`**  
  Retrieves the value at the specified path in the memory. The value is returned as a generic type.

- **`setValue(path: string, value: unknown): void`**  
  Sets the value at the specified path in the memory.

---

### Protected Methods:

- **`validateSchema(): boolean`**  
  Validates the schema version of the memory to ensure compatibility.

---

### Public Properties:

- **`schema: number`**  
  Represents the version of the schema used in the memory.

- **`description: string`**  
  A brief description of the memory's purpose or contents.

- **`type: string`**  
  The type of memory, such as "completion" or "augmentation."

- **`completion: object`**  
  An object containing details about the completion configuration, including model, tokens, and penalties.

- **`augmentation: object`**  
  An object containing details about the augmentation configuration, such as augmentation type and data sources.

---

### Protected Properties:

- **`source: string`**  
  The source of the memory entry, indicating where the memory data originated.

---

### Type Dependencies:

- `string`
- `number`
- `boolean`
- `unknown`
- `object`
- `array`

### Explore Type Dependencies for the AzureOpenAIClient class

### AzureOpenAIClient Class Definition

**Class Name:** `AzureOpenAIClient`

**Description:**  
The `AzureOpenAIClient` class is designed to interact with Azure-hosted OpenAI services. It provides methods for creating chat completions, embeddings, and content moderation requests. The class is initialized with specific options that configure the connection to the Azure OpenAI API, including API keys, endpoints, and other relevant settings. It also includes methods for adding request headers and making HTTP requests to the Azure OpenAI API.

---

### Public Methods

1. **`createChatCompletion(request: CreateChatCompletionRequest): Promise<OpenAIClientResponse<CreateChatCompletionResponse>>`**  
   Creates a chat completion request using the Azure OpenAI API.

2. **`createEmbedding(request: CreateEmbeddingRequest): Promise<OpenAIClientResponse<CreateEmbeddingResponse>>`**  
   Creates an embedding request using the Azure OpenAI API.

3. **`createModeration(request: ModerationInput): Promise<OpenAIClientResponse<ModerationResponse>>`**  
   Creates a moderation request to evaluate content for safety and compliance using the Azure OpenAI API.

---

### Protected Methods

1. **`addRequestHeaders(headers: Record<string, string>, options: OpenAIClientOptions): void`**  
   Adds necessary headers to the request, such as API keys and other authentication details.

---

### Public Properties

1. **`options: AzureOpenAIClientOptions`**  
   The configuration options used to initialize the client, including API keys, endpoints, and other settings.

2. **`endpoint: string`**  
   The base URL for the Azure OpenAI API.

3. **`apiVersion: string | undefined`**  
   The version of the Azure OpenAI API being used.

---

### Type Dependencies

1. **`AzureOpenAIClientOptions`**  
   Defines the options required to configure the `AzureOpenAIClient`, including properties like `apiKey`, `endpoint`, `apiVersion`, and more.

2. **`CreateChatCompletionRequest`**  
   The request type for creating a chat completion.

3. **`CreateChatCompletionResponse`**  
   The response type for a chat completion request.

4. **`CreateEmbeddingRequest`**  
   The request type for creating an embedding.

5. **`CreateEmbeddingResponse`**  
   The response type for an embedding request.

6. **`ModerationInput`**  
   The input type for a moderation request.

7. **`ModerationResponse`**  
   The response type for a moderation request.

8. **`OpenAIClientResponse<T>`**  
   A generic type representing the response from the OpenAI API.

9. **`OpenAIClientOptions`**  
   The options used to configure the OpenAI client, including API keys, organization, and other settings.

10. **`axios`**  
    The HTTP client used for making requests to the Azure OpenAI API.



### Explore Type Dependencies for the TaskModules class

**Class Definition:**

- **Name:** `TaskModules`
- **Description:** The `TaskModules` class manages task modules in a Microsoft Teams bot application. It provides methods for handling task module interactions, such as fetching and submitting data, sending adaptive cards, and configuring settings. The class is designed to work with the bot framework and integrates with the `Application` class to register handlers for task module-related activities.

---

**Public Methods:**

1. **`fetch<TData extends Record<string, any> = Record<string, any>>(verb: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[], handler: (context: TurnContext, state: TState, data: TData) => Promise<TaskModuleTaskInfo | string>): Application<TState>`**
   - Registers a handler for fetching task module data.

2. **`submit<TData extends Record<string, any> = Record<string, any>>(verb: string | RegExp | RouteSelector | (string | RegExp | RouteSelector)[], handler: (context: TurnContext, state: TState, data: TData) => Promise<TaskModuleTaskInfo | string | null | undefined>): Application<TState>`**
   - Registers a handler for submitting task module data.

3. **`configFetch<TData extends Record<string, any>>(handler: (context: TurnContext, state: TState, data: TData) => Promise<BotConfigAuth | TaskModuleResponse>): Application<TState>`**
   - Registers a handler for fetching task module configuration.

4. **`configSubmit<TData extends Record<string, any>>(handler: (context: TurnContext, state: TState, data: TData) => Promise<BotConfigAuth | TaskModuleResponse>): Application<TState>`**
   - Registers a handler for submitting task module configuration.

5. **`SendCard(card: object): void`**
   - Sends an adaptive card to the user.

---

**Protected Methods:**

- None explicitly listed.

---

**Public Properties:**

- None explicitly listed.

---

**Protected Properties:**

- None explicitly listed.

---

**Type Dependencies:**

- `Application<TState>`
- `RouteSelector`
- `TurnContext`
- `TState`
- `TaskModuleTaskInfo`
- `TaskModuleResponse`
- `BotConfigAuth`
- `Record<string, any>`
- `object` (for the `card` parameter in `SendCard`)
- `string`
- `RegExp`

### Explore Type Dependencies for the ActionAugmentationSection class

### Class Definition: `ActionAugmentationSection`

#### Description:
The `ActionAugmentationSection` class is designed to manage and augment actions within a prompt section, such as turning lights on or off, pausing for a specified duration, and sending adaptive cards. It renders a list of actions to the prompt and handles the execution of these actions in a structured manner.

---

### Public Methods:
1. **`constructor(actions: ChatCompletionAction[], callToAction: string)`**
   - Initializes the `ActionAugmentationSection` with a list of actions and a call-to-action message.

2. **`renderAsMessages(context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<Message<string>[]>>`**
   - Renders the actions as messages within the prompt, considering the token budget.

3. **`turnLightsOn(): void`**
   - Turns the lights on.

4. **`turnLightsOff(): void`**
   - Turns the lights off.

5. **`pause(time: number): void`**
   - Pauses the execution for a specified time in milliseconds.

6. **`sendCard(card: object): void`**
   - Sends an adaptive card to the user.

---

### Protected Methods:
1. **`executeAction(action: Action): void`**
   - Executes a given action from the list of available actions.

---

### Public Properties:
1. **`actions: Map<string, ChatCompletionAction>`**
   - A map of available actions, where the key is the action name and the value is the corresponding `ChatCompletionAction`.

---

### Protected Properties:
1. **`_text: string`**
   - Stores the text content related to the actions.

2. **`_tokens: number[] | undefined`**
   - Stores the token budget for the actions.

3. **`_actions: Map<string, ChatCompletionAction>`**
   - A map of actions that are available for augmentation.

---

### Type Dependencies:
- `TurnContext`
- `Memory`
- `PromptFunctions`
- `Tokenizer`
- `ChatCompletionAction`
- `Message`
- `RenderedPromptSection`
- `Action`
- `Schema`

This class is structured to handle various actions within a prompt, including rendering them as messages, executing them, and managing their state. It also supports sending adaptive cards and pausing for a specified duration.

### Explore Type Dependencies for the Response class

### Class Definition: `Response`

#### Description:
The `Response` class provides utilities for working with Large Language Model (LLM) responses, particularly for parsing JSON objects and handling various JSON-related scenarios. It is designed to assist in extracting and cleaning data from LLM outputs, making it easier to work with structured data in bot frameworks or other applications.

---

### Public Methods:
1. **`parseAllObjects(text: string): Record<string, any>[]`**
   - Parses all JSON objects from a given string and returns an array of key-value pairs.

2. **`parseJSON<TObject = {}>(text: string): TObject | undefined`**
   - Parses a JSON string and returns the corresponding object of type `TObject`. If parsing fails, it returns `undefined`.

3. **`removeEmptyValuesFromObject(obj: Record<string, any>): Record<string, any>`**
   - Removes any key-value pairs from the object where the value is `null`, `undefined`, or an empty string.

---

### Protected Methods:
- No protected methods are explicitly listed.

---

### Public Properties:
- No public properties are explicitly listed.

---

### Protected Properties:
- No protected properties are explicitly listed.

---

### Type Dependencies:
- `Record<string, any>`: Used for representing objects with string keys and any type of values.
- `string`: Used for string inputs and outputs.
- `undefined`: Used as a possible return type when parsing fails.
- `TObject`: A generic type used in the `parseJSON` method to represent the expected structure of the parsed object.

---

This class is primarily focused on parsing and cleaning JSON data, making it a useful utility for handling responses from LLMs or other sources that return structured data.

### Explore Type Dependencies for the ToolsAugmentation class

### ToolsAugmentation Class Definition

**Class Name:** `ToolsAugmentation`

**Description:**  
The `ToolsAugmentation` class is designed to augment the capabilities of a bot by providing methods to control tools such as lights, manage delays, and send adaptive cards. It implements the `Augmentation<string>` interface and is part of the Teams AI Library, enabling server-side action and tool calling similar to OpenAI's 'tools' functionality. The class includes methods for creating prompt sections, validating responses, and generating plans based on user interactions.

---

### Public Methods:

1. **`createPromptSection(): PromptSection | undefined`**  
   Creates a section of the prompt that may include tool-related actions. Returns a `PromptSection` or `undefined` if no section is created.

2. **`validateResponse(context: TurnContext, memory: Memory, tokenizer: Tokenizer, response: PromptResponse<string>, remaining_attempts: number): Promise<Validation>`**  
   Validates the response from the user or system, ensuring it meets the required criteria. Returns a `Validation` object indicating the validity of the response.

3. **`createPlanFromResponse(context: TurnContext, memory: Memory, response: PromptResponse<string | ActionCall[]>): Promise<Plan>`**  
   Generates a plan based on the validated response, which may include actions such as turning lights on or off, pausing, or sending an adaptive card. Returns a `Plan` object.

4. **`lightsOn(): void`**  
   Turns on the lights.

5. **`lightsOff(): void`**  
   Turns off the lights.

6. **`pause(time: number): void`**  
   Pauses execution for a specified amount of time in milliseconds.

7. **`SendCard(card: object): void`**  
   Sends an adaptive card to the user. The `card` parameter is an object representing the adaptive card.

---

### Protected Methods:

1. **`_setPauseState(state: boolean): void`**  
   Sets the internal pause state of the system, indicating whether the system is currently paused.

---

### Public Properties:

- **`lights_on: boolean`**  
  Indicates whether the lights are currently on.

- **`lights_off: boolean`**  
  Indicates whether the lights are currently off.

- **`pause_time: number`**  
  The amount of time to delay in milliseconds.

---

### Protected Properties:

- **`_is_paused: boolean`**  
  Indicates whether the system is currently in a paused state.

---

### Type Dependencies:

- `TurnContext`
- `Memory`
- `Plan`
- `PromptSection`
- `Tokenizer`
- `ActionCall`
- `PromptResponse`
- `Validation`
- `Message`
- `RenderedPromptSection`
- `ChatCompletionAction`
- `FunctionCall`
- `Citation`
- `TextContentPart`
- `ImageContentPart`
- `Augmentation<string>`

### Explore Type Dependencies for the DefaultAugmentation class

### Class Definition: `DefaultAugmentation`

#### Description:
The `DefaultAugmentation` class is a default augmentation in the `teams-ai` module that does not add any additional functionality to the prompt. It always returns a `Plan` with a single `SAY` command containing the model's response. This class is used when no specific augmentation is required, providing a simple and consistent behavior for handling prompts and responses.

#### Public Methods:
1. **`createPromptSection(): PromptSection | undefined`**
   - This method creates a prompt section, but in the case of `DefaultAugmentation`, it returns `undefined` as no additional prompt section is added.

2. **`validateResponse(context: TurnContext, memory: Memory, tokenizer: Tokenizer, response: PromptResponse<string>, remaining_attempts: number): Promise<Validation<string>>`**
   - This method validates the response to a prompt. It takes the context, memory, tokenizer, the response, and the number of remaining attempts as parameters, and returns a promise that resolves to a `Validation<string>` object.

3. **`createPlanFromResponse(context: TurnContext, memory: Memory, response: PromptResponse<string>): Promise<Plan>`**
   - This method creates a plan based on the model's response. It takes the context, memory, and the response as parameters, and returns a promise that resolves to a `Plan` object. The plan contains a single `SAY` command with the model's response.

#### Public Properties:
- The `DefaultAugmentation` class does not have any explicitly listed public or protected properties.

#### Type Dependencies:
1. **`TurnContext`** - Represents the context of the current turn in a conversation.
2. **`Memory`** - Used to store and retrieve information during the conversation.
3. **`Plan`** - Represents a plan of actions to be executed, typically containing commands like `SAY`.
4. **`PredictedSayCommand`** - A type representing a command to say something, used in the plan.
5. **`PromptSection`** - Represents a section of a prompt, though in this class it is not used.
6. **`Tokenizer`** - Used to tokenize the input or output text.
7. **`PromptResponse<string>`** - Represents the response to a prompt, containing the model's output.
8. **`Validation<string>`** - Represents the result of validating a response, including whether it is valid or not.
9. **`Augmentation`** - The interface that defines the structure for augmentations, which `DefaultAugmentation` implements.

This class provides a minimalistic implementation of the `Augmentation` interface, ensuring that even when no specific augmentation is applied, the system can still generate a valid plan based on the model's response.

### Explore Type Dependencies for the LlamaModel class

**Class Definition:**

**LlamaModel**

The `LlamaModel` class is responsible for handling prompt completion using an external API. It implements the `PromptCompletionModel` interface and is designed to work with various types such as `TurnContext`, `Memory`, `PromptFunctions`, `Tokenizer`, and `PromptTemplate`. The class is initialized with options that include an API key and endpoint, and it uses an HTTP client (Axios) to make requests to the external API.

---

**Public Methods:**

- `constructor(options: LlamaModelOptions)`
  - Initializes the `LlamaModel` with the provided options.

- `completePrompt(context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, template: PromptTemplate): Promise<PromptResponse<string>>`
  - Completes a prompt based on the provided context, memory, functions, tokenizer, and template.

---

**Public Properties:**

- `options: LlamaModelOptions`
  - Holds the configuration options for the `LlamaModel`, including the API key and endpoint.

---

**Private Properties:**

- `_httpClient: AxiosInstance`
  - An instance of Axios used for making HTTP requests to the external API.

---

**Type Dependencies:**

- `LlamaModelOptions`
- `TurnContext`
- `Memory`
- `PromptFunctions`
- `Tokenizer`
- `PromptTemplate`
- `PromptResponse`
- `AxiosInstance`

### Explore Type Dependencies for the LayoutEngine class

### Class: `LayoutEngine`

#### Description:
The `LayoutEngine` class is a base layout engine responsible for rendering sections of varying lengths (`auto`, `fixed`, or `proportional`). It is primarily used internally by the `Prompt` and `GroupSection` classes to manage and render their sections. The class provides methods to render sections as text or messages, and it handles the layout of sections based on token limits.

---

#### Public Properties:
- `sections: PromptSection[]`  
  An array of sections to be rendered by the layout engine.

- `required: boolean`  
  A flag indicating whether the sections are required.

- `tokens: number`  
  The number of tokens available for rendering the sections.

- `separator: string`  
  A string used to separate sections during rendering.

---

#### Public Methods:
- `constructor(sections: PromptSection[], tokens: number, required: boolean, separator: string)`  
  Initializes a new instance of the `LayoutEngine` class with the provided sections, token limit, required flag, and separator.

- `async renderAsText(context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<string>>`  
  Renders the sections as text, considering the provided context, memory, functions, tokenizer, and maximum token limit.

- `async renderAsMessages(context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<Message[]>>`  
  Renders the sections as a series of messages, considering the provided context, memory, functions, tokenizer, and maximum token limit.

---

#### Protected Methods:
- `private addSectionsToLayout<T>(sections: PromptSection[], layout: PromptSectionLayout<T>[]): void`  
  Adds sections to the layout.

- `private async layoutSections<T>(layout: PromptSectionLayout<T>[], maxTokens: number, cbFixed: (section: PromptSection) => Promise<RenderedPromptSection<T>>, cbProportional: (section: PromptSection, remaining: number) => Promise<RenderedPromptSection<T>>, textLayout: boolean = false, tokenizer?: Tokenizer): Promise<number>`  
  Lays out the sections based on the available tokens, using callbacks for fixed and proportional sections.

- `private async layoutFixedSections<T>(layout: PromptSectionLayout<T>[], callback: (section: PromptSection) => Promise<RenderedPromptSection<T>>): Promise<void>`  
  Lays out the fixed-length sections using the provided callback.

- `private async layoutProportionalSections<T>(layout: PromptSectionLayout<T>[], callback: (section: PromptSection) => Promise<RenderedPromptSection<T>>): Promise<void>`  
  Lays out the proportional-length sections using the provided callback.

- `private getLayoutLength<T>(layout: PromptSectionLayout<T>[], textLayout: boolean = false, tokenizer?: Tokenizer): number`  
  Calculates the total length of the layout, optionally considering text layout and tokenization.

- `private dropLastOptionalSection<T>(layout: PromptSectionLayout<T>[]): boolean`  
  Drops the last optional section from the layout if necessary.

- `private needsMoreLayout<T>(layout: PromptSectionLayout<T>[]): boolean`  
  Determines if more layout is needed based on the current state of the layout.

---

#### Type Dependencies:
- `PromptSection`
- `TurnContext`
- `Memory`
- `PromptFunctions`
- `Tokenizer`
- `RenderedPromptSection<T>`
- `Message`
- `PromptSectionLayout<T>`

### Explore Type Dependencies for the AzureContentSafetyModerator class

**Class Name**: `AzureContentSafetyModerator`

**Description**:  
The `AzureContentSafetyModerator` class is responsible for moderating content in Azure-hosted OpenAI services. It reviews both input and output content for safety, using OpenAI's moderation API to flag harmful content based on predefined categories such as hate, violence, sexual content, and self-harm. The class is designed to ensure that AI-generated content adheres to safety standards by analyzing prompts and plans for potential risks.

### Public Methods:
1. **`constructor(options: AzureOpenAIModeratorOptions)`**  
   Initializes the `AzureContentSafetyModerator` with the provided options.

2. **`public async reviewInput(context: TurnContext, state: TState): Promise<Plan | undefined>`**  
   Reviews the input content for safety and returns a `Plan` if the content passes moderation, or `undefined` if it is flagged.

3. **`public async reviewOutput(context: TurnContext, state: TState, plan: Plan): Promise<Plan>`**  
   Reviews the output content for safety and returns the `Plan` after moderation.

### Protected Methods:
1. **`protected createClient(options: OpenAIModeratorOptions): AzureOpenAIClient`**  
   Creates and returns an instance of `AzureOpenAIClient` to interact with the OpenAI moderation API.

2. **`protected async createModeration(input: string): Promise<CreateModerationResponseResultsInner | undefined>`**  
   Sends the input content to the OpenAI moderation API and returns the moderation results, or `undefined` if no results are available.

### Public Properties:
1. **`options: AzureOpenAIModeratorOptions`**  
   The configuration options for the moderator, including API key, endpoint, and moderation categories.

### Protected Properties:
1. **`_contentSafetyOptions: ContentSafetyOptions`**  
   Stores the content safety options, including categories and blocklist configurations.

2. **`_azureContentSafetyClient: AzureOpenAIClient`**  
   An instance of the `AzureOpenAIClient` used to interact with the OpenAI moderation API.

3. **`_azureContentSafetyCategories: Record<string, ContentSafetyHarmCategory>`**  
   A record of content safety categories and their associated harm levels.

### Type Dependencies:
- `Plan`
- `PredictedDoCommand`
- `PredictedSayCommand`
- `TurnState`
- `TurnContext`
- `CreateModerationResponseResultsInner`
- `AzureOpenAIClient`
- `AzureOpenAIModeratorCategory`
- `CreateContentSafetyResponse`
- `OpenAIClientResponse`
- `ModerationResponse`
- `CreateContentSafetyRequest`
- `ContentSafetyHarmCategory`
- `ContentSafetyOptions`
- `ModerationSeverity`
- `AI`
- `OpenAIModerator`
- `OpenAIModeratorOptions`

### Explore Type Dependencies for the MonologueAugmentation class

### MonologueAugmentation Class Definition

**Class Name:** `MonologueAugmentation`

**Description:**  
The `MonologueAugmentation` class is designed to enhance the chatbot's ability to perform chain-of-thought reasoning by adding support for inner monologues. This augmentation helps the language model (LLM) process and reason through multiple turns of conversation, improving its ability to generate coherent and contextually relevant responses.

---

### Public Methods:

1. **`createPromptSection(): PromptSection | undefined`**  
   Creates a section of the prompt that includes the inner monologue, which helps the LLM reason through the conversation.

2. **`validateResponse(context: TurnContext, memory: Memory, tokenizer: Tokenizer, response: PromptResponse<string>, remaining_attempts: number): Promise<Validation<InnerMonologue | undefined>>`**  
   Validates the response generated by the LLM, ensuring that the inner monologue is coherent and aligns with the expected format.

3. **`createPlanFromResponse(context: TurnContext, memory: Memory, response: PromptResponse<InnerMonologue | undefined>): Promise<Plan>`**  
   Creates a plan based on the inner monologue response, which can guide the next steps in the conversation.

---

### Public Properties:

1. **`_section: ActionAugmentationSection`**  
   Represents the section of the prompt that deals with the inner monologue.

2. **`_monologueValidator: JSONResponseValidator<InnerMonologue>`**  
   A validator that ensures the inner monologue response is in the correct JSON format and adheres to the expected structure.

3. **`_actionValidator: ActionResponseValidator`**  
   A validator that checks the validity of actions generated as part of the inner monologue.

---

### Type Dependencies:

- `TurnContext`
- `Memory`
- `Tokenizer`
- `PromptResponse`
- `Validation`
- `Plan`
- `PredictedCommand`
- `PredictedDoCommand`
- `PredictedSayCommand`
- `Message`
- `PromptSection`
- `ChatCompletionAction`
- `JSONResponseValidator`
- `ActionResponseValidator`
- `Augmentation`
- `ActionAugmentationSection`
- `InnerMonologue`

This class plays a crucial role in augmenting the chatbot's reasoning capabilities by managing and validating inner monologues, which are essential for complex, multi-turn conversations.

### Explore Type Dependencies for the TurnStateProperty class

**Class Name**: `TurnStateProperty`

**Description**:  
The `TurnStateProperty` class is responsible for managing properties within a `TurnState` in a bot framework. It allows for setting, getting, and deleting state properties associated with a specific scope, such as conversation, user, or temporary state. This class is designed to map an application's turn state property to a bot state property and inject it into a `DialogSet`.

---

### Public Methods:
- `constructor(state: TurnState, scopeName: string, propertyName: string)`
  - Initializes a new instance of the `TurnStateProperty` class with the provided `TurnState`, scope name, and property name.

- `delete(): Promise<void>`
  - Deletes the property from the associated state.

- `get(context: TurnContext): Promise<T | undefined>`
  - Retrieves the value of the property from the state. Returns `undefined` if the property is not set.

- `get(context: TurnContext, defaultValue: T): Promise<T>`
  - Retrieves the value of the property from the state, or returns the provided `defaultValue` if the property is not set.

- `get(defaultValue?: unknown): Promise<T | undefined> | Promise<T>`
  - Overloaded method to retrieve the property value, with or without a default value.

- `set(context: TurnContext, value: T): Promise<void>`
  - Sets the value of the property in the state.

---

### Public Properties:
- `_state: TurnStateEntry`
  - Represents the entry in the `TurnState` where the property is stored.

- `_propertyName: string`
  - The name of the property being managed within the state.

---

### Type Dependencies:
- `TurnState`
- `TurnContext`
- `TurnStateEntry`
- `StatePropertyAccessor`

### Explore Type Dependencies for the TextDataSource class

### Class Definition: `TextDataSource`

#### Description:
The `TextDataSource` class is a data source used to inject a static block of text into a prompt. It is primarily designed for testing purposes but can also be used to include externally defined text in a prompt. The class implements the `DataSource` interface, allowing it to render text data that can be tokenized and constrained by a maximum token limit.

---

### Public Methods:
1. **`constructor(name: string, text: string)`**
   - Initializes a new instance of the `TextDataSource` class with a name and a block of text.

2. **`get name(): string`**
   - Returns the name of the data source.

3. **`renderData(context: TurnContext, memory: Memory, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<string>>`**
   - Renders the text data as a prompt section, tokenizing the text and ensuring it fits within the specified maximum token limit.

---

### Public Properties:
1. **`_name: string`**
   - The name of the data source.

2. **`_text: string`**
   - The static block of text to be rendered.

3. **`_tokens?: number[]`** (optional)
   - An optional array of tokenized text.

---

### Type Dependencies:
1. **`TurnContext`**
   - Represents the context of a turn in a conversation, used in the `renderData` method.

2. **`Memory`**
   - Represents the memory state, used in the `renderData` method.

3. **`Tokenizer`**
   - A tokenizer used to break the text into tokens, passed to the `renderData` method.

4. **`RenderedPromptSection<string>`**
   - The return type of the `renderData` method, representing a section of the prompt that contains the rendered text.

5. **`DataSource`**
   - The interface that `TextDataSource` implements, defining the structure and required methods for a data source.



### Explore Type Dependencies for the StreamingResponse class

**Class Name:** `StreamingResponse`

**Description:**  
The `StreamingResponse` class is a helper class designed to manage streaming responses in a bot framework context. It allows for sending a series of updates, such as text chunks or informative messages, to the client in a single response. The class handles queuing updates, managing attachments, and ensuring that the response stream is properly ended.

---

### **Public Methods:**
- `constructor(context: TurnContext)`
- `get streamId(): string | undefined`
- `get updatesSent(): number`
- `queueInformativeUpdate(text: string): void`
- `queueTextChunk(text: string): void`
- `endStream(): Promise<void>`
- `setAttachments(attachments: Attachment[]): void`
- `getMessage(): string`
- `waitForQueue(): Promise<void>`

### **Protected Methods:**
- `private queueNextChunk(): void`
- `private queueActivity(factory: () => Partial<Activity>): void`
- `private drainQueue(): Promise<void>`
- `private sendActivity(activity: Partial<Activity>): Promise<void>`

---

### **Public Properties:**
- `_context: TurnContext`
- `_nextSequence: number`
- `_streamId?: string`
- `_message: string`
- `_attachments?: Attachment[]`
- `_ended: boolean`
- `_queue: Array<() => Partial<Activity>>`
- `_queueSync: Promise<void> | undefined`
- `_chunkQueued: boolean`

---

### **Type Dependencies:**
- `TurnContext`
- `Activity`
- `Attachment`
- `Partial<Activity>`

### Explore Type Dependencies for the ActionOutputMessage class

### Class Definition: `ActionOutputMessage`

**Description:**
The `ActionOutputMessage` class is responsible for rendering output messages related to actions performed within a conversational AI system. It processes and formats action-related data, such as user inputs or system responses, and renders them as structured messages. This class is designed to handle the output of actions, including managing history and tokenization, and is capable of rendering messages in a format suitable for further processing or display.

---

### Public Methods:

1. **`constructor(historyVariable: string = 'temp.history', tokens: number = -1)`**
   - Initializes the `ActionOutputMessage` class with a history variable and an optional token count.
   
2. **`async renderAsMessages(context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<Message<any>[]>>`**
   - Renders the action output as a series of messages, taking into account the context, memory, functions, and tokenization constraints.

---

### Protected Properties:

1. **`_historyVariable: string`**
   - Stores the name of the variable that holds the history of actions or messages.

---

### Type Dependencies:

- **`TurnContext`**: Represents the context of the current turn in the conversation.
- **`Memory`**: Manages the memory state of the conversation, storing relevant data.
- **`PromptFunctions`**: A collection of functions used to process prompts and actions.
- **`Tokenizer`**: Handles the tokenization of message content, ensuring that the message fits within token limits.
- **`Message`**: Represents a message object, which includes properties like `role` and `content`.
- **`RenderedPromptSection<Message<any>[]>`**: Represents the structured output of the rendered messages.
- **`ActionCall`**: Represents an action call, which may be relevant for handling specific action outputs.

---

This class is designed to integrate with the broader AI system, leveraging tokenization and memory management to ensure that action outputs are rendered effectively within the constraints of the conversation.

### Explore Type Dependencies for the OpenAIEmbeddings class

**Class Name**: `OpenAIEmbeddings`

**Description**:  
The `OpenAIEmbeddings` class is designed to interact with OpenAI and Azure OpenAI hosted models to generate embeddings from text inputs. It provides methods for creating embedding requests and handling responses, while also managing HTTP requests and configurations for both OpenAI and Azure OpenAI services.

---

### **Public Methods**:
1. `createEmbeddings(model: string, inputs: string | string[]): Promise<EmbeddingsResponse>`  
   - Creates embeddings for the given text inputs using the specified model.

---

### **Protected Methods**:
1. `createEmbeddingRequest(request: CreateEmbeddingRequest): Promise<AxiosResponse<CreateEmbeddingResponse>>`  
   - Constructs and sends a request to create embeddings based on the provided request object.

2. `post<TData>(url: string, body: object, retryCount?: number): Promise<AxiosResponse<TData>>`  
   - Sends a POST request to the specified URL with the given body and optional retry logic.

---

### **Public Properties**:
1. `options`: `OpenAIEmbeddingsOptions | AzureOpenAIEmbeddingsOptions | OpenAILikeEmbeddingsOptions`  
   - Configuration options for the embeddings, which can vary depending on whether OpenAI or Azure OpenAI is used.

---

### **Protected Properties**:
1. `_httpClient`: `AxiosInstance`  
   - The HTTP client used to send requests to the OpenAI or Azure OpenAI API.

2. `_useAzure`: `boolean`  
   - A flag indicating whether the Azure OpenAI service is being used.

3. `UserAgent`: `string`  
   - The user agent string used in HTTP requests to identify the client.

---

### **Type Dependencies**:
- `AxiosInstance`
- `AxiosResponse`
- `AxiosRequestConfig`
- `EmbeddingsModel`
- `EmbeddingsResponse`
- `CreateEmbeddingRequest`
- `CreateEmbeddingResponse`
- `OpenAICreateEmbeddingRequest`
- `Colorize`

### Explore Type Dependencies for the OpenAIModerator class

### Class Definition: `OpenAIModerator`

#### Description:
The `OpenAIModerator` class is responsible for moderating content using OpenAI's moderation API. It reviews both user input and model output to ensure safety and compliance with predefined moderation categories. The class can be configured to moderate either input, output, or both, and it interacts with the OpenAI API to assess the content for harmful or inappropriate material.

---

### Public Methods:

1. **`constructor(options: OpenAIModeratorOptions)`**
   - Initializes the `OpenAIModerator` with the provided options.

2. **`reviewInput(context: TurnContext, state: TState): Promise<Plan | undefined>`**
   - Reviews the input from the user for safety and returns a `Plan` if moderation is required, or `undefined` if the input is safe.

3. **`reviewOutput(context: TurnContext, state: TState, plan: Plan): Promise<Plan>`**
   - Reviews the output generated by the model for safety and returns a modified `Plan` if necessary.

4. **`get options(): OpenAIModeratorOptions`**
   - Returns the options used to configure the `OpenAIModerator`.

---

### Protected Methods:

1. **`createClient(options: OpenAIModeratorOptions): OpenAIClient`**
   - Creates and returns an instance of `OpenAIClient` using the provided options.

2. **`createModeration(input: string, model?: string): Promise<CreateModerationResponseResultsInner | undefined>`**
   - Sends the input to the OpenAI moderation API and returns the moderation results, or `undefined` if no moderation is required.

---

### Public Properties:

1. **`options: OpenAIModeratorOptions`**
   - The configuration options for the `OpenAIModerator`.

---

### Protected Properties:

1. **`_options: OpenAIModeratorOptions`**
   - The internal storage for the moderator's configuration options.

2. **`_client: OpenAIClient`**
   - The client used to interact with the OpenAI moderation API.

---

### Type Dependencies:

- **`OpenAIModeratorOptions`**: Defines the configuration options for the `OpenAIModerator`.
- **`TurnState`**: Represents the state of the conversation turn.
- **`TurnContext`**: Provides context for the current turn of the conversation.
- **`OpenAIClient`**: The client used to interact with OpenAI's API.
- **`CreateModerationResponseResultsInner`**: Represents the results of a moderation request.
- **`CreateModerationResponse`**: The response from the OpenAI moderation API.
- **`OpenAIClientResponse`**: The response structure from the OpenAI client.
- **`Moderator`**: The interface that defines moderation methods.
- **`AI`**: Represents the AI system interacting with the moderator.
- **`Plan`**: Represents a plan generated by the AI system.
- **`PredictedDoCommand`**: Represents a predicted "do" command in the plan.
- **`PredictedSayCommand`**: Represents a predicted "say" command in the plan.

### Explore Type Dependencies for the MemoryFork class

**Class Name:** `MemoryFork`

**Description:**  
The `MemoryFork` class represents a forked memory structure, allowing for the creation of a copy of an existing memory that can be modified independently without affecting the original memory. It provides methods to manipulate values within the forked memory, such as setting, getting, deleting, and checking the existence of values.

**Public Methods:**
- `deleteValue(path: string): void`  
  Deletes a value at the specified path in the forked memory.

- `hasValue(path: string): boolean`  
  Checks if a value exists at the specified path in the forked memory.

- `getValue<TValue = unknown>(path: string): TValue`  
  Retrieves the value at the specified path in the forked memory.

- `setValue(path: string, value: unknown): void`  
  Sets a value at the specified path in the forked memory.

**Private Methods:**
- `getScopeAndName(path: string): { scope: string; name: string }`  
  Extracts the scope and name from the given path.

**Public Properties:**
- `_fork: Record<string, Record<string, unknown>>`  
  Stores the forked memory structure as a nested record of key-value pairs.

- `_memory: Memory`  
  Represents the original memory from which the fork was created.

**Type Dependencies:**
- `Memory` (interface)  
  The original memory interface that the `MemoryFork` class interacts with.
  
- `Record<string, Record<string, unknown>>`  
  Used for the `_fork` property to store the forked memory data.

### Explore Type Dependencies for the TeamsSsoAdaptiveCardAuthentication class

### Class Definition: `TeamsSsoAdaptiveCardAuthentication`

#### Description:
The `TeamsSsoAdaptiveCardAuthentication` class is designed to handle authentication using adaptive cards in Microsoft Teams with Single Sign-On (SSO) capabilities. It extends the `AdaptiveCardAuthenticationBase` class and provides methods for managing the SSO token exchange, user sign-in, and generating login requests for adaptive card-based authentication.

---

### Public Methods:
1. **`constructor()`**  
   Initializes a new instance of the `TeamsSsoAdaptiveCardAuthentication` class.

2. **`handleSsoTokenExchange(context: TurnContext): Promise<never>`**  
   Handles the SSO token exchange process. This method is not implemented and returns a `Promise<never>`.

3. **`handleUserSignIn(context: TurnContext, magicCode: string): Promise<TokenResponse | undefined>`**  
   Handles the user sign-in process using a magic code. Returns a `Promise` that resolves to a `TokenResponse` or `undefined`.

4. **`getLoginRequest(context: TurnContext): Promise<AdaptiveCardLoginRequest>`**  
   Retrieves the login request for adaptive card authentication. Returns a `Promise` that resolves to an `AdaptiveCardLoginRequest`.

5. **`isValidActivity(context: TurnContext): boolean`**  
   Checks if the activity is valid for adaptive card authentication. Overrides a method from the base class. Returns a `boolean`.

---

### Protected Methods:
None explicitly listed.

---

### Public Properties:
None explicitly listed.

---

### Protected Properties:
None explicitly listed.

---

### Type Dependencies:
- **`TurnContext`** from `botbuilder-core`
- **`TokenResponse`** from `botframework-schema`
- **`AdaptiveCardAuthenticationBase`** from `./AdaptiveCardAuthenticationBase`
- **`AdaptiveCardLoginRequest`** from `./AdaptiveCardAuthenticationBase`
- **`AuthError`** from `./Authentication`
- **`UserTokenAccess`** from `./UserTokenAccess`

This class is primarily focused on handling the SSO authentication flow using adaptive cards in Microsoft Teams, leveraging the base functionality provided by `AdaptiveCardAuthenticationBase`.

### Explore Type Dependencies for the PromptSectionBase class

### Class Definition: `PromptSectionBase`

#### Description:
`PromptSectionBase` is an abstract base class designed for creating sections of prompts in a conversational AI framework. It provides a default implementation for rendering prompts as text and requires derived classes to implement the rendering of prompts as messages. The class manages tokens, separators, and other formatting options for prompt sections, and it interacts with various components such as memory, tokenizers, and functions to render prompts in different formats.

---

### Public Properties:
- **`required: boolean`**  
  Indicates whether the prompt section is required.

- **`tokens: number`**  
  The number of tokens allocated for the prompt section.

- **`separator: string`**  
  A string used to separate different parts of the prompt section.

- **`textPrefix: string`**  
  A prefix added to the text when rendering the section as text.

---

### Protected Methods:
- **`protected getTokenBudget(maxTokens: number): number`**  
  Calculates the token budget for the section based on the maximum allowed tokens.
  ```typescript
  protected getTokenBudget(maxTokens: number): number
  ```

- **`protected returnMessages(output: Message[], length: number, tokenizer: Tokenizer, maxTokens: number): RenderedPromptSection<Message[]>`**  
  Returns the rendered messages along with their length and whether they exceed the token limit.
  ```typescript
  protected returnMessages(output: Message[], length: number, tokenizer: Tokenizer, maxTokens: number): RenderedPromptSection<Message[]>
  ```

---

### Public Methods:
- **`constructor(tokens: number = -1, required: boolean = true, separator: string = '\n', textPrefix: string = '')`**  
  Initializes the `PromptSectionBase` with the specified number of tokens, required status, separator, and text prefix.
  ```typescript
  constructor(tokens: number = -1, required: boolean = true, separator: string = '\n', textPrefix: string = '')
  ```

- **`async renderAsText(context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<string>>`**  
  Renders the prompt section as text, returning the rendered text along with its length and whether it exceeds the token limit.
  ```typescript
  async renderAsText(context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<string>>
  ```

- **`abstract renderAsMessages(context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<Message<any>[]>>`**  
  Abstract method that must be implemented by derived classes to render the prompt section as messages.
  ```typescript
  abstract renderAsMessages(context: TurnContext, memory: Memory, functions: PromptFunctions, tokenizer: Tokenizer, maxTokens: number): Promise<RenderedPromptSection<Message<any>[]>>
  ```

- **`public static getMessageText(message: Message): string`**  
  Extracts the text content from a `Message` object.
  ```typescript
  public static getMessageText(message: Message): string
  ```

---

### Type Dependencies:
- **`Message`**  
  Represents a message object used in rendering prompts.

- **`MessageContentParts`**  
  Represents parts of the content within a message.

- **`PromptFunctions`**  
  A set of functions used to assist in rendering prompts.

- **`PromptSection`**  
  Represents a section of a prompt, which can be rendered as text or messages.

- **`RenderedPromptSection<T>`**  
  Represents the result of rendering a prompt section, including the output and metadata such as length and whether it exceeds the token limit.

- **`TurnContext`**  
  Represents the context of a turn in a conversation, providing access to the conversation state and other relevant data.

- **`Tokenizer`**  
  A utility for managing tokens in the prompt, ensuring that the prompt stays within the token limit.

- **`Memory`**  
  Represents the memory state used during the conversation, which can be accessed to retrieve or store information.



### Explore Type Dependencies for the OAuthBotAuthentication class

### Class Definition: `OAuthBotAuthentication<TState extends TurnState>`

**Description:**  
The `OAuthBotAuthentication` class is responsible for handling OAuth authentication in a bot context, specifically for Microsoft Teams. It provides methods for managing user sign-in, token exchange, and dialog flow related to authentication. The class extends `BotAuthenticationBase` and integrates with the Microsoft Teams OAuth flow to facilitate secure user authentication and token management.

---

### Public Methods:

1. **`constructor(app: Application<TState>, oauthSettings: OAuthSettings, settingName: string, storage?: Storage)`**  
   Initializes the `OAuthBotAuthentication` class with the application, OAuth settings, setting name, and optional storage.

2. **`async authenticate(context: TurnContext, state: TState): Promise<string | undefined>`**  
   Authenticates the user based on the provided context and state, returning a token or `undefined` if authentication fails.

3. **`async handleSignInActivity(context: TurnContext, state: TState): Promise<void>`**  
   Handles the sign-in activity for the user, processing the sign-in flow and managing the authentication state.

4. **`async runDialog(context: TurnContext, state: TState, dialogStateProperty: string): Promise<DialogTurnResult<TokenResponse>>`**  
   Runs the authentication dialog, managing the dialog state and returning the result of the dialog turn.

5. **`async continueDialog(context: TurnContext, state: TState, dialogStateProperty: string): Promise<DialogTurnResult<TokenResponse>>`**  
   Continues the authentication dialog if it was previously started, returning the result of the dialog turn.

6. **`async verifyStateRouteSelector(context: TurnContext): Promise<boolean>`**  
   Verifies if the current activity is a valid state verification request.

7. **`async tokenExchangeRouteSelector(context: TurnContext): Promise<boolean>`**  
   Determines if the current activity is a token exchange request and processes it accordingly.

---

### Protected Methods:

1. **`async createDialogContext(context: TurnContext, state: TState, dialogStateProperty: string): Promise<DialogContext>`**  
   Creates a dialog context for managing the authentication dialog flow.

2. **`async createOAuthCard(context: TurnContext): Promise<Attachment>`**  
   Creates an OAuth card to be sent to the user for sign-in purposes.

---

### Public Properties:

1. **`app: Application<TState>`**  
   The application instance that the bot is running within.

2. **`settings: OAuthSettings`**  
   The OAuth settings used for configuring the authentication flow.

3. **`settingName: string`**  
   The name of the setting used for identifying the OAuth configuration.

4. **`_oauthPrompt: OAuthPrompt`**  
   The OAuth prompt used to initiate the sign-in process.

5. **`_oauthSettings: OAuthSettings`**  
   The settings specific to the OAuth flow, including scopes and other configuration details.

---

### Type Dependencies:

1. **`Application<TState>`**  
   Represents the bot application.

2. **`OAuthSettings`**  
   Configuration settings for OAuth, including scopes and sign-in URLs.

3. **`TurnContext`**  
   The context object for the current turn of the conversation.

4. **`TurnState`**  
   Represents the state of the current turn, including user and conversation data.

5. **`DialogContext`**  
   The context for managing dialogs within the bot.

6. **`DialogTurnResult<TokenResponse>`**  
   The result of a dialog turn, including the token response if authentication is successful.

7. **`DialogTurnStatus`**  
   Represents the status of the dialog turn, such as whether it is complete or still in progress.

8. **`OAuthPrompt`**  
   A prompt used to initiate the OAuth sign-in process.

9. **`Storage`**  
   An optional storage mechanism for persisting authentication state.

10. **`TokenResponse`**  
    Represents the response from the OAuth token exchange, including the access token.

11. **`Attachment`**  
    Represents an attachment, such as an OAuth card, that can be sent to the user.

12. **`BotAuthenticationBase<TState>`**  
    The base class for bot authentication, providing common functionality for handling authentication flows.



### Explore Type Dependencies for the TeamsSsoMessageExtensionAuthentication class

### Class Definition: `TeamsSsoMessageExtensionAuthentication`

#### Description:
The `TeamsSsoMessageExtensionAuthentication` class is designed to handle Single Sign-On (SSO) authentication for message extensions in Microsoft Teams. It provides methods for managing user sign-ins, handling SSO token exchanges, and generating sign-in links. The class leverages the Microsoft Authentication Library (MSAL) for managing authentication flows and integrates with the Teams platform to facilitate seamless user authentication.

---

### Public & Protected Methods:

1. **`isValidActivity(context: TurnContext): boolean`**
   - Checks if the provided activity is valid for the authentication process.

2. **`handleSsoTokenExchange(context: TurnContext): Promise<TokenResponse | undefined>`**
   - Handles the exchange of an SSO token for an OAuth token.

3. **`handleUserSignIn(context: TurnContext, magicCode: string): Promise<TokenResponse | undefined>`**
   - Manages the user sign-in process using a magic code.

4. **`getSignInLink(context: TurnContext): Promise<string>`**
   - Generates and returns a sign-in link for the user.

5. **`isSsoSignIn(context: TurnContext): boolean`**
   - Determines if the current activity is an SSO sign-in request.

---

### Public & Protected Properties:

1. **`settings: TeamsSsoSettings`**
   - Configuration settings for the SSO process, including scopes and MSAL configuration.

2. **`msal: ConfidentialClientApplication`**
   - An instance of the MSAL `ConfidentialClientApplication` used for managing authentication flows.

---

### Type Dependencies:

1. **`TurnContext`** from `'botbuilder-core'`
2. **`TokenResponse`** from `'botframework-schema'`
3. **`MessageExtensionAuthenticationBase`**
4. **`TeamsSsoSettings`**
5. **`ConfidentialClientApplication`** from `'@azure/msal-node'`
6. **`MessageExtensionsInvokeNames`** from `'../MessageExtensions'`

### Explore Type Dependencies for the TeamsAdapter class

**Class Definition:**

```typescript
class TeamsAdapter {
  /**
   * A class that implements the Bot Framework Protocol for Microsoft Teams, allowing it to handle
   * messages, events, and interactions within the Teams environment. It can be hosted in various
   * cloud environments, both public and private.
   */

  // Public Properties
  public credentialsFactory: ServiceClientCredentialsFactory;
  public userAgent: string;

  // Constructor
  constructor(
    readonly botFrameworkAuthConfig?: ConfigurationBotFrameworkAuthenticationOptions,
    credentialsFactory?: ServiceClientCredentialsFactory,
    authConfiguration?: AuthenticationConfiguration,
    connectorClientOptions?: ConnectorClientOptions
  ) {}

  // Public Methods
  public async process(
    req: Request,
    res: Response,
    logic: (context: TurnContext) => Promise<void>
  ): Promise<void>;

  public async process(
    req: Request,
    socket: INodeSocket,
    head: INodeBuffer,
    logic: (context: TurnContext) => Promise<void>
  ): Promise<void>;

  public async process(
    req: Request,
    resOrSocket: Response | INodeSocket,
    logicOrHead: ((context: TurnContext) => Promise<void>) | INodeBuffer,
    maybeLogic?: (context: TurnContext) => Promise<void>
  ): Promise<void>;

  // Protected Methods
  protected async processActivity(activity: any): Promise<any>;
}

```

**Public Properties:**
- `credentialsFactory: ServiceClientCredentialsFactory`
- `userAgent: string`

**Protected Methods:**
- `protected async processActivity(activity: any): Promise<any>`

**Public Methods:**
- `public async process(req: Request, res: Response, logic: (context: TurnContext) => Promise<void>): Promise<void>`
- `public async process(req: Request, socket: INodeSocket, head: INodeBuffer, logic: (context: TurnContext) => Promise<void>): Promise<void>`
- `public async process(req: Request, resOrSocket: Response | INodeSocket, logicOrHead: ((context: TurnContext) => Promise<void>) | INodeBuffer, maybeLogic?: (context: TurnContext) => Promise<void>): Promise<void>`

**Type Dependencies:**
- `CloudAdapter`
- `ConfigurationBotFrameworkAuthentication`
- `ConfigurationBotFrameworkAuthenticationOptions`
- `ConfigurationServiceClientCredentialFactory`
- `ConfigurationServiceClientCredentialFactoryOptions`
- `Request`
- `Response`
- `TurnContext`
- `AuthenticationConfiguration`
- `ConnectorClientOptions`
- `ServiceClientCredentialsFactory`
- `INodeSocket`
- `INodeBuffer`
- `packageInfo` from `../package.json`

### Explore Type Dependencies for the TeamsSsoBotAuthentication class

### Class Definition: `TeamsSsoBotAuthentication<TState extends TurnState>`

#### Description:
The `TeamsSsoBotAuthentication` class handles Single Sign-On (SSO) authentication for Microsoft Teams bots. It facilitates the authentication process by managing OAuth token exchanges, user sign-ins, and dialog flows related to SSO. This class is designed to work with the Microsoft Authentication Library (MSAL) and integrates with Teams' bot framework to provide seamless SSO experiences for users.

---

### Public Methods:

1. **`constructor(app: Application<TState>, settings: TeamsSsoSettings, settingName: string, msal: ConfidentialClientApplication, storage?: Storage)`**
   - Initializes the `TeamsSsoBotAuthentication` class with the application, SSO settings, MSAL client, and optional storage.

2. **`runDialog(context: TurnContext, state: TState, dialogStateProperty: string): Promise<DialogTurnResult<TokenResponse>>`**
   - Starts the SSO dialog for the user, managing the authentication flow.

3. **`continueDialog(context: TurnContext, state: TState, dialogStateProperty: string): Promise<DialogTurnResult<TokenResponse>>`**
   - Continues the SSO dialog if it was previously started, handling the next step in the authentication process.

4. **`tokenExchangeRouteSelector(context: TurnContext): Promise<boolean>`**
   - Determines if the current activity is a token exchange request and handles it accordingly.

---

### Protected Methods:

1. **`createSsoDialogContext(context: TurnContext, state: TState, dialogStateProperty: string): Promise<DialogContext>`**
   - Creates a dialog context for managing the SSO dialog flow.

2. **`shouldDedup(context: TurnContext): Promise<boolean>`**
   - Checks if the current request should be deduplicated to avoid processing the same request multiple times.

3. **`getStorageKey(context: TurnContext): string`**
   - Generates a unique key for storing authentication-related data in the storage.

---

### Public Properties:

1. **`_prompt: TeamsSsoPrompt`**
   - The prompt used to initiate the SSO flow and manage user interactions.

2. **`_tokenExchangeIdRegex: RegExp`**
   - A regular expression used to identify token exchange requests in the activity.

---

### Type Dependencies:

1. **`Application<TState>`** - Represents the bot application.
2. **`TeamsSsoSettings`** - Configuration settings for Teams SSO.
3. **`ConfidentialClientApplication`** - MSAL client for handling confidential client authentication.
4. **`Storage`** - Optional storage for persisting authentication state.
5. **`TurnContext`** - Represents the context of a bot turn, including the activity and state.
6. **`TokenResponse`** - Represents the response containing the OAuth token.
7. **`DialogTurnResult`** - Represents the result of a dialog turn.
8. **`DialogContext`** - Manages the dialog stack and state.
9. **`DialogSet`** - A collection of dialogs that can be used to manage conversation flow.
10. **`DialogState`** - Represents the state of a dialog.
11. **`WaterfallDialog`** - A dialog that guides the user through a series of steps.
12. **`ActivityTypes`** - Represents the types of activities in a bot conversation.
13. **`TurnState`** - Represents the state of the current turn in the bot conversation.
14. **`TurnStateProperty`** - Represents a property in the turn state.

---

This class is designed to integrate with the Microsoft Teams bot framework and MSAL to provide a seamless SSO experience, handling the complexities of token exchanges, user sign-ins, and dialog management.

### Explore Type Dependencies for the TestPlanner class

### TestPlanner Class Definition

**Class Name:** `TestPlanner`

**Description:**  
The `TestPlanner` class is a testing implementation of a planner used to simulate and validate the behavior of AI planning functionalities. It is designed to handle tasks such as starting and continuing plans, and it interacts with the AI system to generate and manage plans. This class is primarily used in testing environments to ensure that the planning logic works as expected.

---

### Public & Protected Methods:

1. **`beginTask(context: TurnContext, state: TurnState, ai: AI<TurnState>): Promise<Plan>`**  
   - **Description:** Starts a new task and returns a promise that resolves to a `Plan`.
   - **Parameters:**
     - `context: TurnContext` - The context of the current turn.
     - `state: TurnState` - The current state of the turn.
     - `ai: AI<TurnState>` - The AI system managing the task.
   - **Returns:** `Promise<Plan>` - A promise that resolves to a `Plan`.

2. **`continueTask(context: TurnContext, state: TurnState, ai: AI<TurnState>): Promise<Plan>`**  
   - **Description:** Continues an ongoing task and returns a promise that resolves to a `Plan`.
   - **Parameters:**
     - `context: TurnContext` - The context of the current turn.
     - `state: TurnState` - The current state of the turn.
     - `ai: AI<TurnState>` - The AI system managing the task.
   - **Returns:** `Promise<Plan>` - A promise that resolves to a `Plan`.

---

### Public & Protected Properties:

1. **`beginPlan: Plan`**  
   - **Type:** `Plan`  
   - **Description:** Represents the plan generated when a new task is started.

2. **`continuePlan: Plan`**  
   - **Type:** `Plan`  
   - **Description:** Represents the plan generated when an ongoing task is continued.

---

### Type Dependencies:

- **`TurnContext`** - Represents the context of a turn in a conversation.
- **`Plan`** - Represents a plan that includes a series of commands for the AI to execute.
- **`Planner`** - Interface that defines the structure for a planner responsible for generating plans.
- **`PredictedSayCommand`** - A command that instructs the AI to say something, part of the `Plan`.
- **`TurnState`** - Represents the state of the current turn, used to manage the conversation's context.
- **`AI<TState>`** - Represents the AI system that manages tasks and generates plans based on the state.

This class is designed to facilitate testing by simulating the behavior of a planner in an AI system, allowing developers to validate the planning logic in various scenarios.