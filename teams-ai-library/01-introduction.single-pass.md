### 1. Introduction

---

#### Overview of the Teams AI Library

The Teams AI Library is designed to extend the capabilities of the Bot Framework SDK, providing enhanced features and benefits for building intelligent bots within Microsoft Teams. By building upon the existing Bot Framework SDK, it offers specialized tools and functionalities tailored for Teams environments, enabling developers to create more interactive and responsive bots.

---

##### Purpose and Capabilities

The primary purpose of the Teams AI Library is to facilitate the creation of intelligent bots that can interact seamlessly within Microsoft Teams. It allows developers to leverage advanced AI functionalities, including natural language processing, prompt management, action planning, and integration with AI models such as OpenAI or Azure OpenAI services.

---

##### Key Features and Benefits

- **Integration with OpenAI or Azure OpenAI Services**: Leverage advanced AI capabilities for natural language understanding and response generation.
- **Adaptive Cards and Task Modules**: Create rich interactive experiences within Teams through support for Adaptive Cards and Task Modules.
- **Enhanced Authentication Mechanisms**: Utilize Teams Single Sign-On (SSO) and other authentication features for secure user interactions.
- **Prompt Management and Conversation History**: Manage prompts and maintain conversation history for more natural and context-aware interactions.
- **Message Extensions and Teams Activities**: Extend messaging capabilities with message extensions and handle Teams-specific events and activities.
- **User State and Memory Management**: Efficiently manage user state and memory within conversations to provide personalized experiences.

---

##### How It Extends the Bot Framework SDK

The Teams AI Library builds upon the Bot Framework SDK by adding specific tools and features tailored for Microsoft Teams. It integrates advanced AI capabilities, allowing for more sophisticated interactions and planning within bot applications. Enhancements include:

- **Teams-Specific Features**: Support for Teams events, activities, and message extensions.
- **Advanced AI Integration**: Seamless integration with AI models for natural language processing and understanding.
- **Enhanced User Interaction**: Improved handling of Adaptive Cards, Task Modules, and conversation flows.
- **Authentication Support**: Advanced authentication options like Teams SSO for secure and streamlined user experiences.

---

#### Getting Started

---

##### Prerequisites

To get started with the Teams AI Library, ensure you have the following prerequisites:

- **Node.js version 18.x**: The Teams AI Library requires Node.js version 18.x.
- **OpenAI or Azure OpenAI API keys**: Valid API keys are necessary to leverage AI functionalities within the library.

---

##### Installation Guide

Follow these steps to install the Teams AI Library and set up your environment:

1. **Setting Up the Library**:

   Install the Teams AI Library package using npm:

   ```bash
   npm install @microsoft/teams-ai
   ```

2. **Initial Setup of Environment Variables**:

   Configure the necessary environment variables required for the library to function properly. This includes your OpenAI or Azure OpenAI API keys and any other configuration settings needed for your bot.

---

#### Quick Start Guide

---

##### Creating Your First Bot

To create your first bot using the Teams AI Library, follow these steps:

1. **Initialize a new Node.js project**:

   ```bash
   mkdir my-first-bot
   cd my-first-bot
   npm init -y
   ```

2. **Install the Teams AI Library**:

   ```bash
   npm install @microsoft/teams-ai
   ```

3. **Set up your bot code**:

   Create an `index.js` file and import the necessary modules from the Teams AI Library. Use the library's classes and methods to define your bot's behavior.

---

##### Running the Basic Echo Bot Example

The Teams AI Library provides a basic echo bot example to help you get started. To run the echo bot:

1. **Copy the echo bot sample code**:

   You can find the echo bot example in the Teams AI Library documentation or samples directory.

2. **Run your bot**:

   Start your bot application:

   ```bash
   node index.js
   ```

3. **Test your bot in Microsoft Teams**:

   Use the Microsoft Teams platform to add your bot and test its echo functionality.

---