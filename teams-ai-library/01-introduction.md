# Introduction

## Overview of the Teams AI Library

**What is the Teams AI Library?**

The Teams AI Library is a JavaScript SDK designed for building AI-powered applications and bots for Microsoft Teams. It simplifies the integration of AI functionalities into Teams applications, enabling developers to create intelligent conversational agents that automate tasks and enhance user interactions within the Teams environment.

**Purpose and Capabilities**

- **Simplified AI Integration:** Streamlines the process of incorporating AI features into Teams applications, reducing the complexity typically associated with AI development.
- **Intelligent Conversational Agents:** Facilitates the development of bots that understand natural language, respond appropriately, and perform actions based on user input.
- **Enhanced User Interactions:** Improves the overall user experience within Teams by providing more interactive and responsive applications.

**Key Features and Benefits**

- **Built on the Microsoft Bot Framework SDK:** Extends the capabilities of the Bot Framework SDK with AI-driven features, making it easier to develop conversational bot logic for Teams.
- **Natural Language Modeling and Prompt Engineering:** Offers tools for advanced language understanding and response generation.
- **Action Planning and Execution:** Supports the creation of bots that can plan and execute complex sequences of actions based on user input.
- **Conversational Session History and Localization:** Maintains context across conversations and supports multiple languages for global reach.
- **Integration with AI Models and LLM Modularity:** Seamlessly integrates with AI models like OpenAI and Azure OpenAI, providing advanced natural language processing, content generation, and moderation features.
- **Responsible AI Practices with Content Moderation and Safety:** Ensures interactions are safe and appropriate with built-in content moderation tools.
- **Utilities and Support Tools:** Includes components for creating and handling Adaptive Cards, message extensions, authentication support, and more to enhance user experiences within Teams.

**Extending the Bot Framework SDK**

By building on top of the Microsoft Bot Framework SDK, the Teams AI Library adds powerful AI-driven capabilities. It simplifies the development of conversational bot logic for Teams, allowing developers to focus on creating rich, intelligent experiences without the need to manage the underlying AI infrastructure.

## Getting Started

### Prerequisites

Before you begin developing with the Teams AI Library, ensure you have the following prerequisites installed and set up:

- **Node.js version 18.x:** The Teams AI Library requires Node.js version 18.x to run. You can download it from the [official Node.js website](https://nodejs.org/en/download/).
- **OpenAI or Azure OpenAI API Keys:** You'll need API keys from either OpenAI or Azure OpenAI to access AI models:
  - **OpenAI API Key:** Sign up and obtain an API key from the [OpenAI website](https://platform.openai.com/).
  - **Azure OpenAI API Key:** Obtain an API key by creating an Azure OpenAI resource in the [Azure portal](https://portal.azure.com/).

### Installation Guide

Follow these steps to set up the Teams AI Library and configure your development environment:

1. **Initialize Your Project:**

   Create a new directory for your bot project and navigate into it:

   ```bash
   mkdir my-teams-ai-bot
   cd my-teams-ai-bot
   ```

   Initialize a new Node.js project:

   ```bash
   npm init -y
   ```

2. **Install the Teams AI Library:**

   Install the `@microsoft/teams-ai` package using npm:

   ```bash
   npm install @microsoft/teams-ai
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root of your project to securely store your environment variables:

   ```bash
   touch .env
   ```

   Add your OpenAI or Azure OpenAI API keys to the `.env` file:

   ```env
   # For OpenAI
   OPENAI_API_KEY=your-openai-api-key

   # For Azure OpenAI
   AZURE_OPENAI_API_KEY=your-azure-openai-api-key
   AZURE_OPENAI_ENDPOINT=your-azure-openai-endpoint
   ```

   Replace `your-openai-api-key`, `your-azure-openai-api-key`, and `your-azure-openai-endpoint` with your actual API keys and endpoint URL.

4. **Install Required Dependencies:**

   Install any additional packages needed for your project, such as `dotenv` for loading environment variables:

   ```bash
   npm install dotenv
   ```

5. **Configure Your Development Environment:**

   In your `index.js` file, load the environment variables and set up the Teams AI Library:

   ```javascript
   require('dotenv').config();
   const { Application } = require('@microsoft/teams-ai');

   const app = new Application({
     /* Your configuration settings */
   });

   // Start your bot
   app.listen(process.env.port || process.env.PORT || 3978, () => {
     console.log(`\nBot started, listening on ${process.env.PORT || 3978}`);
   });
   ```

   Make sure to replace the placeholder comment with your actual configuration settings.

With these steps completed, your development environment is set up, and you're ready to start building your Teams AI bot.

## Quick Start Guide

This guide will walk you through creating your first bot using the Teams AI Library and running a basic echo bot example. By the end of this guide, you'll have a working bot that echoes back any message it receives.

### Creating Your First Bot

#### Understanding the Basic Bot Structure

A bot built with the Teams AI Library typically involves the following components:

- **Importing Required Modules**: Include the necessary libraries and classes.
- **Initializing the Application**: Create an instance of the `Application` class with appropriate configuration.
- **Defining Message Handlers**: Set up functions that handle incoming messages or activities.
- **Starting the Bot Server**: Configure the bot to listen for incoming requests.

### Running the Basic Echo Bot Example

Follow these steps to implement and run a simple echo bot.

#### Step 1: Create the Bot File

Create an `index.js` file in your project directory and add the following code:

```javascript
require('dotenv').config();
const { Application } = require('@microsoft/teams-ai');

// Create a new application instance
const app = new Application({
  // You can add configuration options here if needed
});

// Set up a message handler to echo back user messages
app.message('/^.*$/', async (context) => {
  await context.sendActivity(`You said: ${context.activity.text}`);
});

// Start the bot server
const port = process.env.port || process.env.PORT || 3978;
app.listen(port, () => {
  console.log(`\nBot started, listening on port ${port}`);
});
```

**Explanation:**

- **Import Statements**:
  - `require('dotenv').config();` loads environment variables from your `.env` file.
  - `const { Application } = require('@microsoft/teams-ai');` imports the `Application` class from the Teams AI Library.
- **Application Instance**: `const app = new Application({...});` initializes your bot application.
- **Message Handler**: `app.message('/^.*$/', async (context) => {...});` sets up a handler that triggers on any message.
- **Starting the Server**: `app.listen(port, () => {...});` starts the bot and listens on the specified port.

#### Step 2: Run Your Bot Locally

Start your bot by running the following command in your terminal:

```bash
node index.js
```

You should see an output indicating that your bot has started:

```
Bot started, listening on port 3978
```

#### Step 3: Test Your Bot with the Bot Framework Emulator (Optional)

To test your bot locally:

1. **Download the Emulator**: Install the [Bot Framework Emulator](https://github.com/microsoft/BotFramework-Emulator/releases).
2. **Launch the Emulator**: Open the emulator application.
3. **Connect to Your Bot**:
   - Click on **Open Bot**.
   - Enter your bot's endpoint URL, which is `http://localhost:3978/api/messages`.
4. **Interact with Your Bot**: Send messages and observe the bot echoing back your input.

#### Step 4: Prepare for Deployment to Microsoft Teams

To run your bot in Microsoft Teams, you'll need to deploy it and register it properly.

1. **Register Your Bot with Azure Bot Service**:

   - Create a Bot Channels Registration in the [Azure Portal](https://portal.azure.com/).
   - Obtain the Microsoft App ID and App Password.

2. **Update Environment Variables**:

   Add the Microsoft App ID and Password to your `.env` file:

   ```env
   MICROSOFT_APP_ID=your-microsoft-app-id
   MICROSOFT_APP_PASSWORD=your-microsoft-app-password
   ```

3. **Modify Your Bot Code**:

   Update your `Application` instance configuration to include authentication:

   ```javascript
   const app = new Application({
     botAppId: process.env.MICROSOFT_APP_ID,
     botAppPassword: process.env.MICROSOFT_APP_PASSWORD,
     // Other configuration options
   });
   ```

4. **Deploy Your Bot to a Web Service**:

   - Host your bot on a service accessible over the internet, such as Azure App Service.
   - Ensure that your bot is running securely and is reachable at a public URL.

5. **Create a Teams App Package**:

   - Prepare a [Teams App Manifest](https://docs.microsoft.com/microsoftteams/platform/resources/schema/manifest-schema) that describes your bot.
   - Include your bot's endpoint and Microsoft App ID in the manifest.
   - Package the manifest along with necessary images into a `.zip` file.

6. **Upload Your App to Microsoft Teams**:

   - In Teams, go to **Apps** > **Upload a custom app**.
   - Select **Upload for me or my teams** and upload your `.zip` package.
   - Install the app and start chatting with your bot.

#### Step 5: Test Your Bot in Microsoft Teams

Once your bot is installed:

- Open a chat with your bot in Teams.
- Send a message and verify that the bot echoes back your message.

**Congratulations!** You've successfully created and run a basic echo bot using the Teams AI Library.
