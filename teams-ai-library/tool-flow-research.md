## Research Classes

The goal of this research is to gather all of the major class definitions for the library.

Last Updated: 2024-11-20T08:02:39.789Z

### Gather Class Definitions

#### TestModel
A class used for testing purposes, connecting to **TestPromptManager**, **TestTurnState**, and **GPTTokenizer**.

#### AdaptiveCards
Handles adaptive card functionalities, connecting to **Application** and **TurnState**.

#### StreamingResponse
A helper class for streaming responses, connecting to **TurnContext**, **Activity**, and **Attachment**.

#### JSONResponseValidator
Validates JSON responses against a schema, connecting to **TurnContext**, **Memory**, **Tokenizer**, and **PromptResponse**.

#### BotAuthenticationBase
An abstract base class for Teams bot authentication, connecting to **Application**, **TurnState**, and **TurnContext**.

#### TaskModules
Handles task module operations, connecting to **Application** and **TurnState**.

#### ToolsAugmentation
Enables server-side action/tools calling, connecting to **TurnContext**, **Memory**, **Tokenizer**, and **Plan**.

#### PromptManager
Manages prompts, connecting to **PromptTemplate**, **DataSource**, **Memory**, **Tokenizer**, and **GroupSection**.

#### ActionResponseValidator
Validates action calls returned by the model, connecting to **ChatCompletionAction**, **PromptResponseValidator**, **JSONResponseValidator**, and **Tokenizer**.

#### AssistantsPlanner
Manages task planning for AI assistants, connecting to **AI**, **TurnState**, and **AssistantsClient**.

#### OpenAIClient
Implements the OpenAI client interface, connecting to **CreateChatCompletionRequest**, **CreateEmbeddingRequest**, and **CreateModerationRequest**.

#### LLMClient
Handles interactions with language models, connecting to **PromptCompletionModel**, **PromptTemplate**, **Memory**, and **StreamingResponse**.

#### AzureContentSafetyModerator
An Azure OpenAI moderator for reviewing prompts and plans, connecting to **TurnState**, **TurnContext**, and **Plan**.

#### MessageExtensions
Handles message extension invocations, connecting to **Application** and **TurnState**.

#### AI
Generates plans, moderates input/output, and generates prompts, connecting to **Planner**, **Moderator**, and **TurnState**.

#### PromptCompletionModel
An AI model for completing prompts, connecting to **TurnContext**, **Memory**, **PromptFunctions**, **Tokenizer**, and **StreamingResponse**.

#### UserTokenAccess
Manages user tokens, connecting to **TurnContext**, **OAuthPromptSettings**, and **TokenResponse**.

#### TeamsAdapter
An adapter for handling communication between the bot and Microsoft Teams, connecting to **Application** and **TurnContext**.

#### Application
The main class for routing and processing incoming requests, connecting to **AdaptiveCards**, **AI**, **TaskModules**, and **AuthenticationManager**.

#### OAuthBotAuthentication
Handles authentication for Teams bots, connecting to **BotAuthenticationBase**, **Application**, **DialogContext**, and **OAuthPrompt**.

#### TeamsSsoPrompt
Handles Single Sign-On (SSO) prompts in Microsoft Teams, connecting to **DialogSet**, **DialogState**, and **TeamsSsoSettings**.

#### OpenAIModerator
Uses OpenAI's moderation API to review prompts and plans, connecting to **TurnState**, **TurnContext**, **Plan**, and **PredictedDoCommand**.

#### DefaultModerator
A pass-through moderator that approves all inputs and outputs, connecting to **Moderator** and **TurnState**.

#### EmbeddingsModel
An AI model for creating embeddings, connecting to **EmbeddingsResponse**.

#### FunctionCallMessage
Represents an assistant message containing a function to call, connecting to **Message**, **FunctionCall**, **TurnContext**, and **Memory**.

#### TurnState
Manages the state of a conversation, connecting to **TurnContext**, **TeamsAdapter**, and **Activity**.

#### Plan
Represents a structured plan of actions, connecting to **PredictedDoCommand**, **PredictedSayCommand**, and **TurnState**.

#### MemoryFork
Implements the **Memory** interface, allowing for memory operations and forks, connecting to **TurnContext** and **Memory**.

#### PromptTemplate
Represents a cached prompt template, connecting to **PromptSection**, **ChatCompletionAction**, and **Augmentation**.

#### TeamsSsoBotAuthentication
Handles authentication for Teams bots using SSO, connecting to **BotAuthenticationBase**, **TeamsSsoPrompt**, and **DialogSet**.

#### TestPromptManager
A prompt manager used for testing, extending **PromptManager** and connecting to **TestTurnState** and **GPTTokenizer**.

#### FunctionResponseMessage
Represents a message containing the response to a function call, connecting to **TurnContext**, **Memory**, **PromptFunctions**, and **Tokenizer**.

#### TeamsAttachmentDownloader
Downloads attachments in a Teams application, connecting to **TeamsAdapter**, **TurnContext**, and **InputFile**.

#### TextSection
Represents a section of text rendered as a message, connecting to **PromptSectionBase**, **TurnContext**, **Tokenizer**, and **Memory**.

#### GroupSection
Represents a group of sections rendered as a single message, connecting to **TextSection**, **TurnContext**, **Memory**, and **Tokenizer**.

#### ConversationHistory
Manages and renders conversation history, connecting to **Message**, **PromptFunctions**, **TurnContext**, and **Memory**.

#### SystemMessage
Represents a system message, connecting to **TestPromptManager** and **GPTTokenizer**.

#### AssistantMessage
Represents an assistant message, connecting to **TestPromptManager** and **TestTurnState**.

#### OAuthAdaptiveCardAuthentication
Handles authentication for Adaptive Cards in Teams, connecting to **AdaptiveCardAuthenticationBase**, **TokenResponse**, and **TurnContext**.

#### TeamsSsoMessageExtensionAuthentication
Handles authentication for Teams Message Extensions using SSO, connecting to **MessageExtensionAuthenticationBase**, **TeamsSsoSettings**, and **TurnContext**.

#### AzureOpenAIClient
Implements the OpenAI client for Azure, connecting to **CreateChatCompletionRequest**, **CreateEmbeddingRequest**, and **ModerationInput**.

#### Utilities
Provides utility functions for manipulating data, connecting to **Tokenizer** and **ClientCitation**.

#### ActionPlanner
Manages actions and prompts in AI interactions, connecting to **AI**, **PromptManager**, **LLMClient**, and **TurnState**.

#### TestTurnState
A test version of **TurnState** used in unit tests, connecting to **TurnContext** and **TurnState**.

#### TeamsSsoAdaptiveCardAuthentication
Handles authentication using Teams SSO for Adaptive Cards, connecting to **AdaptiveCardAuthenticationBase** and **TurnContext**.

#### DefaultAugmentation
Implements the **Augmentation** interface, providing methods for creating prompt sections and validating responses, connecting to **TurnContext**, **Memory**, and **Plan**.

#### LlamaModel
Implements the **PromptCompletionModel** interface, connecting to **TurnContext**, **Memory**, **PromptFunctions**, and **Tokenizer**.

#### TestPlanner
Implements the **Planner** interface for testing, connecting to **Plan**, **PredictedSayCommand**, and **TurnState**.

#### OpenAIEmbeddings
Calls OpenAI and Azure OpenAI hosted models, connecting to **EmbeddingsModel**.

#### BinaryClassifier
A classifier that connects to **PromptCompletionModel**, **PromptManager**, **PromptTemplate**, and **Tokenizer**.

#### SequenceAugmentation
Creates a sequence of actions, connecting to **ActionAugmentationSection**, **JSONResponseValidator**, and **Plan**.

#### MonologueAugmentation
Adds support for inner monologues to prompts, connecting to **ActionAugmentationSection**, **JSONResponseValidator**, and **ActionResponseValidator**.

#### TestEmbeddings
Implements the **EmbeddingsModel** interface for testing, connecting to **EmbeddingsResponse**.

#### InputFileDownloader
Downloads files relative to the user's input, connecting to **TurnContext** and **TurnState**.

#### SayCommand
A function that operates with **TurnState**, connecting to **TurnContext** and **PredictedSayCommand**.

#### DoCommand
A function that operates with **TurnState**, connecting to **TurnContext** and **PredictedDoCommand**.

#### ActionOutputMessage
Renders user input text and images as a user message, connecting to **TurnContext**, **Memory**, **Tokenizer**, and **Message**.

#### TeamsSsoSettings
Provides configuration settings for Teams SSO, connecting to **TeamsSsoPrompt** and **TeamsSsoBotAuthentication**.

#### ChatCompletionAction
An action that can be called by an LLM, connecting to **PromptTemplate** and **Augmentation**.

#### TestAdapter
A testing utility for simulating bot interactions, connecting to **Application**, **TurnContext**, and **TestTurnState**.

#### TestModel
Implements the **PromptCompletionModel** interface for testing, connecting to **TurnContext**, **Memory**, **PromptFunctions**, and **Tokenizer**.

## Research Plan for Exploring API Code Base

This research plan is designed to gather the necessary information to implement streaming tool responses in the system. The goal is to answer the questions identified by the assistant, which will help in understanding the current flow of tool calls, streaming responses, and how they intersect.

Last Updated: 2024-11-20T08:57:47.801Z

### 1. **Tool Call Flow**

A tool call is initiated in the **ActionPlanner** class through the `beginTask` or `continueTask` methods. These methods are responsible for generating a plan based on user input and the current state. When the AI system is ready to start or continue a task, these methods check the context and may trigger tool calls as part of the plan. The **AssistantsPlanner** class, which implements the `Planner` interface, also plays a role in initiating tool calls, particularly through the `beginTask` method.

The response from a tool call is handled in the **LLMClient** class, specifically through the `completePrompt` method. This method processes the response from the AI model, including any tool calls that are part of the response. The **LLMClient** validates the response and can repair it if necessary. Additionally, the **submitActionResults** method in the **AssistantsPlanner** class processes the tool outputs by mapping action outputs to tool outputs and submitting them to the assistant. The results are then processed based on the status of the run, and a plan is generated from the tool outputs or messages as needed.

### 2. **Streaming Response Flow**

### How is streaming initiated and managed in the **StreamingResponse** class?

In the **StreamingResponse** class, streaming is initiated by creating an instance of the class with a specific `context`, which represents the interaction or session in which the streaming will occur. The class provides several key methods to manage the streaming process:

1. **`queueInformativeUpdate()`**: This method allows for sending informative updates to the client during the streaming process. It increments the `updatesSent` counter and sends activities with a specific `streamType` and `streamSequence`, ensuring that the client is kept informed about the progress of the stream.

2. **`queueTextChunk()`**: This method is used to send chunks of text to the client as they are generated. Each chunk is sent with a `streamType` of 'streaming' and a corresponding `streamSequence`, allowing the client to receive partial responses incrementally.

3. **`endStream()`**: This method finalizes the streaming process. It sends a final message to the client, including any remaining queued text chunks and attachments, and sets the `streamType` to 'final', indicating that the streaming session has concluded.

The **StreamingResponse** class uses an adapter (e.g., **TestAdapter**) to send activities back to the client. These activities are queued and validated through assertions in tests, ensuring that the correct `streamType`, `streamSequence`, and `streamId` are included in the messages sent to the client.

### How are streaming responses passed back to the client in the **LLMClient** or **OpenAIClient** class?

In both the **LLMClient** and **OpenAIClient** classes, streaming responses are passed back to the client incrementally as they are received from the model.

1. **In the `LLMClient` class**:
   - Streaming is initiated in the `completePrompt()` method, where a new instance of **StreamingResponse** is created if streaming is detected.
   - The `chunkReceived` event handler is responsible for sending chunks of data to the client as they are received. It checks if the context matches and then queues the text chunk to the **StreamingResponse** instance, ensuring that the client receives partial responses in real-time.
   - Once the streaming process is complete, the `endStream()` method is called to finalize the response and send any remaining data to the client.

2. **In the `OpenAIClient` class**:
   - Streaming is handled in the `completePrompt()` method, where a for-await-of loop processes each chunk of data as it is received from the OpenAI API.
   - Each chunk is processed individually, and the `delta` from each chunk is used to update the message content. If tool calls are involved, they are handled during this process.
   - Events such as `chunkReceived` are emitted during the streaming process, notifying other parts of the system about the reception of each chunk. This allows the client to receive partial responses incrementally as they are generated.

In both cases, the streaming process is managed through event-driven mechanisms, where chunks of data are passed back to the client as they are received, and the streaming session is finalized with a call to `endStream()` once all data has been processed.

### 3. **Intersection of Tool Calls and Streaming**

Tool calls are processed in both the **AI** and **ActionPlanner** classes. 

In the **AI** class, tool calls are handled through the `run` method, which generates and executes a plan. The plan contains commands, including `PredictedDoCommand` for tool calls. The `run` method checks the type of command (e.g., 'DO' for tool calls) and executes the corresponding action handler. The `doAction` method in the **AI** class is also responsible for manually executing a named action, which can include tool calls.

In the **ActionPlanner** class, tool calls are processed through methods like `beginTask` and `continueTask`. These methods handle the flow of actions and tool calls, generating plans based on user input and executing the actions. The `continueTask` method specifically checks the model's response to see if it contains a message, which can include tool responses.

Tool responses are currently returned to the client as part of the plan's commands. In the **AI** class, the output of actions (including tool calls) is stored in `state.temp.lastOutput`, which is used as input for subsequent actions or commands. The responses are returned through `PredictedSayCommand` (for SAY actions) or `PredictedDoCommand` (for DO actions). In the **ActionPlanner** class, tool responses are processed and returned through the `completePrompt` method, which generates a `PromptResponse` object containing the response message. These responses are then passed back to the client as part of the overall interaction flow.

### 4. **Key Classes for Modification**

### Processing of Actions and Tool Calls:

1. **AI Class**:
   - The **AI** class is responsible for processing actions and tool calls, but specific details about its internal handling of these processes are not provided. It likely interacts with other components like the **ActionPlanner** and **LLMClient** to manage actions and tool calls.

2. **ActionPlanner Class**:
   - The **ActionPlanner** class plays a central role in generating plans based on user input and triggering actions or tool calls. It uses methods like `beginTask` and `continueTask` to initiate tasks and generate plans. When a prompt needs to be completed, the `completePrompt` method is used, which interacts with the **LLMClient** to handle the prompt and validate the response. The **ActionPlanner** also supports augmentations, such as the **ToolsAugmentation**, which processes responses that may include actions and generates plans accordingly.

3. **LLMClient Class**:
   - The **LLMClient** class is responsible for managing interactions with the Large Language Model (LLM). It processes actions and tool calls through its `completePrompt` method, which handles the input and manages the conversation history. The **LLMClient** also validates responses and can handle repairs if the response is invalid. It uses the **StreamingResponse** class to manage streaming responses, indicating that it can handle both synchronous and streaming interactions with the LLM.

4. **OpenAIClient Class**:
   - The **OpenAIClient** class processes actions and tool calls by interacting with the OpenAI API. It prepares parameters for chat completions, including handling tool calls if the response from the model includes them. The class supports streaming responses by checking for a `stream` option in the `completePrompt` method and processing chunks of data as they are received. It emits events like `beforeCompletion`, `chunkReceived`, and `responseReceived` to manage the flow of actions and tool calls during the streaming process.

### Streaming Implementation in the StreamingResponse Class:

- The **StreamingResponse** class is designed to manage streaming responses to the client. It allows a series of updates to be sent in a structured sequence, typically starting with an informative update, followed by multiple text chunks, and ending with a final message. The class maintains a queue of activities to be sent to the client and processes them using the `drainQueue()` method, which sends queued activities until the queue is empty.

- The class uses methods like `sendInformativeUpdate()`, `sendTextChunk()`, and `endStream()` to manage the flow of messages. Each message is sent with a `streamType` that indicates whether it is an informative update, a chunk of streaming text, or the final message. The messages are also assigned a sequence number to ensure they are processed in the correct order.

- The **StreamingResponse** class tracks the stream ID returned by the client when sending activities, which is used to identify the stream for subsequent messages. This ensures that all messages related to a particular stream are correctly associated and processed.

In summary, actions and tool calls are processed through a combination of the **AI**, **ActionPlanner**, **LLMClient**, and **OpenAIClient** classes, with the **LLMClient** and **OpenAIClient** handling the interaction with the LLM and managing the responses. Streaming is implemented in the **StreamingResponse** class, which manages the flow of updates and text chunks in a structured sequence, ensuring that messages are sent in the correct order and associated with the correct stream.

### Relevant Code Snippets

To achieve the goal of implementing streaming responses for tool calls, several key modifications need to be made in the existing codebase. Below are the relevant code snippets and explanations of the necessary changes:

---

### 1. **Modify `completePrompt` Method in `LLMClient` Class**

Ensure that the `completePrompt` method in the `LLMClient` class handles streaming when tool calls are involved.

```typescript
// LLMClient.ts

public async completePrompt(...): Promise<PromptResponse> {
    // Existing code to set up the prompt and parameters

    // Check if streaming is enabled
    if (options.stream) {
        const streamingResponse = new StreamingResponse(context);

        // Handle events for streaming
        this.model.events.on('chunkReceived', async (ctx, mem, chunk) => {
            // Forward the chunk to the streaming response
            await streamingResponse.queueTextChunk(chunk.delta.content);
        });

        this.model.events.on('responseReceived', async (ctx, mem, response) => {
            // Finalize the streaming response
            await streamingResponse.endStream();
        });
    }

    // Call the model to complete the prompt
    const promptResponse = await this.model.completePrompt(...);

    // Existing code to handle the promptResponse

    return promptResponse;
}
```

---

### 2. **Update `completePrompt` Method in `OpenAIClient` Class**

Modify the `OpenAIClient` to process tool calls during streaming by handling function calls in the streaming data.

```typescript
// OpenAIClient.ts

public async completePrompt(...): Promise<PromptResponse> {
    const response: CreateChatCompletionResponse = await this.post(url, params);

    let messageContent = '';
    let functionCall: FunctionCall | undefined;

    // Handle streaming response
    if (params.stream) {
        for await (const chunk of response.data) {
            const delta = chunk.choices[0].delta;

            // Accumulate message content
            if (delta.content) {
                messageContent += delta.content;
                // Emit chunkReceived event
                this.events.emit('chunkReceived', context, memory, { delta });
            }

            // Process tool calls (function calls)
            if (delta.function_call) {
                if (!functionCall) {
                    functionCall = { name: '', arguments: '' };
                }
                functionCall.name += delta.function_call.name || '';
                functionCall.arguments += delta.function_call.arguments || '';
            }
        }

        // Emit responseReceived event after streaming is complete
        this.events.emit('responseReceived', context, memory, {
            status: PromptResponseStatus.Success,
            message: {
                role: 'assistant',
                content: messageContent,
                function_call: functionCall,
            },
        });
    } else {
        // Existing code for non-streaming responses
    }

    // Return the final prompt response
    return promptResponse;
}
```

---

### 3. **Enhance `StreamingResponse` Class to Handle Tool Outputs**

Add methods to the `StreamingResponse` class to queue tool outputs during streaming.

```typescript
// StreamingResponse.ts

public async queueToolOutput(output: string): Promise<void> {
    // Format and queue the tool output
    await this.queueActivity(() => {
        const activity = MessageFactory.text(output);
        activity.channelData = {
            streamType: 'streaming',
            streamSequence: ++this.updatesSent,
            streamId: this.streamId,
        };
        return activity;
    });
}
```

---

### 4. **Modify `run` and `doAction` Methods in `AI` Class**

Ensure that tool calls are executed, and their outputs are streamed back to the client.

```typescript
// AI.ts

public async run(context: TurnContext, state: TState) {
    // Existing code to generate the plan

    const streamingResponse = new StreamingResponse(context);

    for (const command of plan.commands) {
        if (command.type === 'DO') {
            // Execute the tool action
            const result = await this.doAction(context, state, command);

            // Stream the tool output
            await streamingResponse.queueToolOutput(result);
        } else if (command.type === 'SAY') {
            // Stream the assistant's message
            await streamingResponse.queueTextChunk(command.response);
        }
    }

    // Finalize the streaming response
    await streamingResponse.endStream();
}

protected async doAction(context: TurnContext, state: TState, command: PredictedDoCommand): Promise<string> {
    const handler = this.actions[command.action];
    if (handler) {
        // Execute the action handler
        const result = await handler(context, state, command.parameters);
        return result;
    } else {
        throw new Error(`No handler registered for action: ${command.action}`);
    }
}
```

---

### 5. **Update `ToolsAugmentation` Class to Support Streaming**

Modify the `ToolsAugmentation` class to handle tool calls during streaming.

```typescript
// ToolsAugmentation.ts

public async createPlanFromResponse(
    context: TurnContext,
    memory: TurnState,
    response: PromptResponse
): Promise<Plan> {
    const actionCalls = response.message?.function_call;
    if (actionCalls) {
        const commands: PredictedCommand[] = [];

        // Extract tool calls from the response
        commands.push({
            type: 'DO',
            action: actionCalls.name,
            parameters: JSON.parse(actionCalls.arguments),
        });

        return { commands };
    }

    // Existing code to handle other cases

    return plan;
}
```

---

### 6. **Adjust `ActionResponseValidator` to Validate Streaming Tool Responses**

Ensure that tool responses are validated even when they are received incrementally.

```typescript
// ActionResponseValidator.ts

public async validateResponse(
    context: TurnContext,
    memory: TurnState,
    tokenizer: Tokenizer,
    response: PromptResponse
): Promise<Validation<string>> {
    // Validate the function call in the response
    const functionCall = response.message?.function_call;
    if (functionCall) {
        if (!functionCall.name) {
            return { valid: false, feedback: 'Action name is missing.' };
        }

        // Additional validation for arguments
        // ...

        return { valid: true };
    }

    // Existing validation logic for other cases

    return { valid: true };
}
```

---

### 7. **Ensure `PromptCompletionModel` Emits Events During Streaming**

Make sure that models implementing `PromptCompletionModel` emit events that allow streaming tool responses.

```typescript
// PromptCompletionModel.ts

export interface PromptCompletionModel {
    events?: EventEmitter<PromptCompletionModelEvents>;

    completePrompt(...): Promise<PromptResponse>;
}

export interface PromptCompletionModelEvents {
    beforeCompletion: (context: TurnContext, memory: TurnState, ...) => void;
    chunkReceived: (context: TurnContext, memory: TurnState, chunk: PromptChunk) => void;
    responseReceived: (context: TurnContext, memory: TurnState, response: PromptResponse) => void;
}
```

---

### 8. **Handle Tool Calls in Conversation History If Needed**

If conversation history is used in prompts, ensure it correctly captures tool calls and their outputs during streaming.

```typescript
// ConversationHistory.ts

public async renderAsMessages(...): Promise<RenderedPromptSection<Message<string>[]>> {
    // Existing code to compile conversation history

    // Include tool calls and their outputs
    for (const message of conversationHistory) {
        if (message.function_call) {
            // Include the function call in the message
            messages.push({
                role: 'assistant',
                function_call: message.function_call,
            });
        }
    }

    // Return the rendered messages
    return { output: messages, length: totalTokens, truncated: false };
}
```

---

### **Summary of Changes**

- **LLMClient**: Modify `completePrompt` to handle streaming tool responses by emitting events and forwarding chunks to `StreamingResponse`.
- **OpenAIClient**: Update `completePrompt` to process function calls during streaming and emit `chunkReceived` and `responseReceived` events.
- **StreamingResponse**: Add methods to queue tool outputs and ensure they are sent to the client incrementally.
- **AI**: Update `run` and `doAction` methods to execute tool calls and stream their outputs.
- **ToolsAugmentation**: Adjust `createPlanFromResponse` to include tool calls in the plan during streaming.
- **ActionResponseValidator**: Update `validateResponse` to validate tool responses in a streaming context.
- **PromptCompletionModel**: Ensure models emit necessary events to facilitate streaming responses.
- **ConversationHistory**: Include tool calls and their outputs in conversation history if they are part of the prompt.

---

By implementing these changes, the system will support streaming responses for tool calls, allowing partial results to be sent to the client as they are generated. This improves the responsiveness of the application and provides a better user experience.

**Note**: The code snippets provided are illustrative and may need to be adapted to fit the actual structure and design patterns of your codebase.