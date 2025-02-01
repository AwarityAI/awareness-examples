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