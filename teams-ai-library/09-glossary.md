# Glossary

**Action**: An operation or response that the bot can perform in reaction to user inputs or AI-generated plans. Actions are defined using the `Action` interface, which includes properties such as `name`, `description`, and `parameters`.

**Action Interface**: Defines the structure and behavior of actions within the Teams AI Library. It includes properties like `name` (a unique identifier for the action), `description` (an explanation of what the action does), and `parameters` (defining the expected input for the action).

**Action Handlers**: Functions that are registered to respond to specific actions defined in the bot. They handle the execution of actions when they are triggered by the AI planner or user inputs.

**ActionPlanner**: A built-in planner that leverages large language models (LLMs) to generate plans which may include parameterized actions and direct responses to users. It incorporates advanced features such as augmentations and validations to create effective action sequences.

**Adaptive Cards**: A framework for creating interactive and visually rich UI elements within Microsoft Teams. Developers can design cards that display information and collect user input in a structured format, enhancing the user experience in conversations.

**AI Class**: The central interface in the Teams AI Library for integrating AI capabilities into Teams applications. It manages the interaction between the application and various AI functionalities, orchestrating how the bot processes and responds to user inputs.

**AI System Architecture**: The design and integration of AI functionalities within the Teams AI Library. It outlines how components like the `AI` class, planners, actions, and augmentations work together to enable intelligent bot behaviors in Microsoft Teams and Microsoft 365 applications.

**Application Class**: The core component of the Teams AI Library's application framework. It is responsible for configuring and setting up the bot application, handling incoming activities, routing messages, and managing the overall flow of conversations.

**ApplicationBuilder**: A class that provides a fluent interface to construct and configure an `Application` instance. It simplifies the setup process by allowing developers to chain configuration methods, making the bot's initialization more intuitive.

**AssistantsPlanner**: A built-in planner tailored for applications that coordinate multiple assistants or AI agents. It manages the planning and execution of tasks across different assistants during interactions with users.

**Augmentation**: Enhancements to AI capabilities that add additional functionalities and context to prompt templates. Augmentations improve the quality and relevance of AI-generated responses by providing the AI model with more information or tools.

**AzureContentSafetyModerator**: A built-in moderator that utilizes Azure services to ensure content safety during AI interactions. It helps filter inappropriate or unsafe content in both user inputs and AI-generated outputs.

**Authentication**: Mechanisms that ensure secure access to bot functionalities and user data. This includes verifying user identities and managing authorization through methods like OAuth authentication and Teams Single Sign-On (SSO).

**Authentication Classes and Interfaces**: Components such as `Authentication`, `AuthenticationManager`, `OAuthBotAuthentication`, and `TeamsSsoBotAuthentication` that facilitate various authentication mechanisms in the Teams AI Library. They handle processes like token exchange and user session management.

**Bot Framework SDK**: A software development kit provided by Microsoft that offers tools and libraries for building chatbots and conversational applications. The Teams AI Library extends this SDK by adding advanced AI capabilities specific to Microsoft Teams.

**Embeddings**: Numerical representations of text that capture semantic meaning and relationships. Embeddings are used for advanced AI functionalities like semantic search or contextual understanding, supported by interfaces like `EmbeddingsModel` and classes like `OpenAIEmbeddings`.

**GPT3Tokenizer**: A tokenizer tailored for the GPT-3 model. It provides optimized tokenization aligned with the specific requirements of GPT-3, efficiently converting text into tokens the model can process.

**GPTTokenizer**: A tokenizer designed for models based on the GPT architecture. It converts input text into tokens suitable for processing by GPT models, facilitating the text-to-token transformation essential for AI operations.

**LLMClient**: A component responsible for interacting with large language models to generate prompt completions. It provides a simplified interface for planners to request and receive generated text from AI models.

**Memory and State Management**: The practice of managing conversation and user state within the bot. It involves components like `TurnState` and `MemoryFork` to store, access, and modify state information during interactions.

**MemoryFork**: A component used to create a snapshot of the current state at a specific point in the conversation. It enables the bot to branch conversations, simulate changes, and handle sub-conversations independently.

**Message Extensions**: Features in Microsoft Teams that allow bots to extend their functionality beyond standard messaging. They enable users to search for information, perform actions, and insert rich content directly within the Teams client, implemented through the `MessageExtensions` class.

**Moderators**: Classes that ensure content safety by moderating the AI's input and output. Built-in moderators like `OpenAIModerator`, `AzureContentSafetyModerator`, and `DefaultModerator` help filter inappropriate content and maintain safe interactions.

**MonologueAugmentation**: An augmentation that adds support for inner monologue reasoning within the AI system. It enables the model to articulate its thoughts and reasoning in a structured format, enhancing transparency and explainability in responses.

**OAuth Authentication**: A widely used authorization framework that enables third-party applications to obtain limited access to user accounts without exposing user credentials. In the Teams AI Library, it allows bots to authenticate users securely for accessing protected resources.

**OpenAIModerator**: A built-in moderator that utilizes OpenAI's content moderation tools to ensure safety during AI interactions. It helps detect and filter content that violates policies or is inappropriate.

**Planner Interface**: Defines the structure and behavior that all planners must implement within the Teams AI Library. It ensures consistency and interoperability among different planners, specifying methods for generating and executing plans.

**Planners**: Components that determine how a bot responds to user inputs by generating actionable plans. They analyze the context of conversations and decide the sequence of actions the bot should execute to effectively fulfill user requests.

**PredictedCommand**: Represents an action that the AI should perform as part of a plan. It is an element within a plan that specifies the intended action and any associated parameters.

**Prompt**: An input message or instruction provided to the AI model to elicit desired responses. Prompts serve as the starting point for AI-generated content and are crucial in shaping the AI's behavior and output.

**PromptManager**: A class that manages a collection of `PromptTemplate` instances. It provides organization, loading, and validation of prompts, facilitating efficient prompt management within the bot.

**PromptTemplate**: Defines the structure and content of a prompt. It includes elements like a name, content, and configuration settings that influence how the AI processes the prompt.

**SequenceAugmentation**: An augmentation that facilitates the execution of a sequence of actions or responses. It allows the AI model to plan and carry out multiple steps in a defined order, enhancing its ability to handle complex tasks.

**Teams AI Library**: A JavaScript SDK designed for building AI-powered applications and bots for Microsoft Teams. It extends the Bot Framework SDK, simplifying the integration of AI functionalities into Teams applications and enhancing bot capabilities.

**Teams Single Sign-On (SSO)**: A mechanism that simplifies the authentication process by leveraging the user's existing Teams credentials. It allows users to access multiple applications without repeated logins, enhancing user experience.

**Tokenization**: The process of converting input text into tokens that AI models can understand and process. Tokenization is essential for preparing text for AI models, affecting how input is interpreted and responses are generated.

**ToolsAugmentation**: An augmentation that enhances the AI's ability to interact with external tools or actions specified in an `actions.json` file. It allows for dynamic execution of operations during AI interactions.

**TurnState**: A component that holds information relevant to the current turn of the conversation. It acts as a container for all state information specific to the ongoing interaction, including conversation state, user state, and temporary data.

**Utilities Class**: Provides a collection of helper functions designed to assist developers in various tasks within the Teams AI Library. It simplifies common operations such as data manipulation, formatting, and parsing.

**User State**: Information that is persistent across multiple conversations with the same user. It includes data like user preferences, historical interactions, and profile information, enabling personalized experiences.

---

This glossary provides definitions for key terms and concepts within the Teams AI Library, offering a reference to assist developers in understanding the components and functionalities of the library.