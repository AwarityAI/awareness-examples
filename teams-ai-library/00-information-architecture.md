To create comprehensive developer documentation for the Teams AI library, it's important to organize the content in a way that is intuitive and helpful for developers. Below is a proposed information architecture for the documentation:

---

### **1. Introduction**
- **Overview of the Teams AI Library**
  - Purpose and capabilities
  - Key features and benefits
  - How it extends the Bot Framework SDK
- **Getting Started**
  - Prerequisites
    - Node.js version requirement (v18.x)
    - OpenAI or Azure OpenAI API keys
  - Installation guide
    - Setting up the library
    - Initial setup of environment variables
- **Quick Start Guide**
  - Creating your first bot
  - Running the basic echo bot example

### **2. Core Concepts**
- **AI System Architecture**
  - How the AI system works within the Teams AI library
  - Role of the `AI` class
  - Interaction with Microsoft Teams and Microsoft 365 applications
- **Prompts and Prompt Management**
  - Understanding prompts and prompt templates
    - `PromptManager` and `PromptTemplate` classes
    - Designing and using prompt templates
  - Sections and layouts in prompts
    - `PromptSection`, `TemplateSection`, `TextSection`, `GroupSection`
- **Planners and Plans**
  - Overview of planners
    - Purpose and functionality
    - The `Planner` interface
  - Built-in planners
    - `ActionPlanner`
    - `AssistantsPlanner`
    - `LLMClient`
  - Creating custom planners
- **Actions**
  - Defining and handling actions
    - The `Action` interface
    - Registering action handlers
  - Built-in actions
    - `sayCommand`, `doCommand`, `unknown`, `flaggedInput`, `flaggedOutput`, `tooManySteps`, `httpError`
  - Custom actions
- **Moderators and Content Safety**
  - Introduction to moderation
    - Ensuring safe and appropriate AI interactions
  - Built-in moderators
    - `OpenAIModerator`
    - `AzureContentSafetyModerator`
    - `DefaultModerator`
  - Configuring and customizing moderators
- **Augmentations**
  - Enhancing AI capabilities with augmentations
  - Types of augmentations
    - `ToolsAugmentation`
    - `MonologueAugmentation`
    - `SequenceAugmentation`
    - `DefaultAugmentation`
  - Implementing custom augmentations
- **Memory and State Management**
  - Understanding `TurnState` and `MemoryFork`
  - Managing conversation and user state
  - Accessing and modifying state within handlers
- **Authentication**
  - Overview of authentication mechanisms
    - OAuth authentication
    - Teams Single Sign-On (SSO)
  - Authentication classes and interfaces
    - `Authentication`, `AuthenticationManager`
    - `OAuthBotAuthentication`, `TeamsSsoBotAuthentication`
    - Message extension and adaptive card authentication
  - Implementing authentication in your bot
- **Tokenization**
  - Importance of tokenization in AI models
  - Using tokenizers
    - `GPTTokenizer`
    - `GPT3Tokenizer`
    - The `Tokenizer` interface

### **3. Modules and API Reference**
- **Application Framework**
  - The `Application` class
    - Configuration and setup
    - Handling incoming activities
    - Routing and processing messages
  - The `ApplicationBuilder` class
    - Simplifying application creation
- **Adaptive Cards**
  - Working with adaptive cards
    - The `AdaptiveCards` class
  - Handling card actions and submissions
  - Designing adaptive card templates
- **Message Extensions**
  - Extending functionality with message extensions
    - The `MessageExtensions` class
  - Implementing search and action commands
  - Handling invoke activities
- **Meetings and Events**
  - Handling Teams meeting events
    - Start and end events
    - Participant join and leave events
  - The `Meetings` class and its methods
- **Utilities and Helpers**
  - The `Utilities` class
    - Common helper functions
    - Formatting and parsing utilities
  - Streaming responses
    - The `StreamingResponse` class
- **Authentication Modules**
  - Detailed reference for authentication classes
    - `OAuthBotAuthentication`
    - `OAuthMessageExtensionAuthentication`
    - `TeamsSsoBotAuthentication`
    - `AdaptiveCardAuthenticationBase`
- **Embeddings and Models**
  - Using embeddings for advanced AI features
    - The `EmbeddingsModel` interface
    - The `OpenAIEmbeddings` class
  - Models and model clients
    - `OpenAIModel`
    - `LlamaModel`
    - `TestModel` (for testing purposes)

### **4. Tutorials and Samples**
- **Echo Bot Tutorial**
  - Building a simple echo bot
  - Understanding the basic structure
- **Action Mapping with LightBot**
  - Controlling a virtual light through AI
  - Implementing action handlers
- **Twenty Questions Game Bot**
  - Creating an interactive game using AI
  - Managing game state and user interaction
- **Chat Moderation Bot**
  - Implementing content moderation features
  - Using moderators to filter input and output
- **Message Extensions Sample**
  - Enhancing messages with AI-generated content
  - Working with compose extensions
- **Chained Actions List Bot**
  - Managing lists and items through chained actions
  - Implementing complex action sequences
- **Custom Model Integration with LLAMA**
  - Using custom AI models
  - Integrating Meta Llama with the Teams AI library

### **5. Advanced Topics**
- **Custom Planners and Augmentations**
  - Developing custom planners
  - Creating and integrating custom augmentations
- **Semantic Functions**
  - Understanding and using semantic functions
  - Enhancing AI responses with functions
- **Error Handling and Logging**
  - Implementing robust error handling
  - Logging and debugging techniques
- **Testing and Debugging**
  - Using test adapters and test models
  - Writing unit tests for bots and components
  - Mocking and stubbing in tests

### **6. Deployment and Operations**
- **Deploying to Microsoft Teams**
  - Packaging your bot for deployment
  - Using Teams Toolkit for Visual Studio Code
- **Environment Configuration**
  - Managing environment variables
  - Setting up production environments
- **Monitoring and Maintenance**
  - Monitoring bot performance
  - Updating and scaling your bot

### **7. FAQs and Troubleshooting**
- **Common Issues and Solutions**
  - Resolving common setup and runtime errors
- **Best Practices**
  - Tips for effective bot development
  - Security considerations

### **8. Contributing and Community**
- **Contributing to the Teams AI Library**
  - Guidelines for contributing code
  - Submitting issues and feature requests
- **Community Resources**
  - Where to find support
  - Community forums and discussions

### **9. Appendix**
- **API Reference Documentation**
  - Comprehensive API details
  - Classes, interfaces, methods, and properties
- **Glossary**
  - Definitions of key terms and concepts
- **Change Log and Version History**
  - Updates and changes in each version
- **License Information**
  - Details about the MIT License

---

This proposed information architecture aims to:

- **Provide a logical flow** from basic concepts to advanced topics, helping both new and experienced developers navigate the documentation effectively.
- **Separate conceptual overviews from technical references**, ensuring developers can find both explanations and detailed API information as needed.
- **Include practical examples and tutorials** to demonstrate how to implement various features of the Teams AI library in real-world scenarios.
- **Offer troubleshooting and best practices guidance** to assist developers in overcoming common challenges and following recommended development patterns.
- **Encourage community engagement** by providing information on how to contribute and where to find additional support.

By structuring the documentation in this way, developers can:

- Quickly find the information they need.
- Understand the capabilities and architecture of the Teams AI library.
- Learn how to implement, customize, and extend the library's features in their own bots.
- Access detailed API references for in-depth technical understanding.
- Leverage community knowledge and contribute to the ongoing development of the library.

---

Feel free to adjust or expand upon this structure to better fit the specific needs and priorities of your documentation. The goal is to make the Teams AI library as accessible and developer-friendly as possible.