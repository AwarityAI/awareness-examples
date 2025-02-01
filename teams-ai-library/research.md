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



## Research Type Dependencies

The goal of this research is to list all of the projects type Dependencies.

Last Updated: 2024-11-20T06:51:01.145Z