# Tutorials and Samples

## Overview

### Introduction to Tutorials and Samples

The **Tutorials and Samples** section provides step-by-step guidance for developers who want to build applications that integrate with Microsoft Teams and leverage AI capabilities using the Teams AI library. These tutorials offer practical examples and real-world scenarios to help you understand and implement various features of the library. Whether you're a beginner starting with bot development or an experienced developer looking to enhance your bots with advanced AI functionalities, these tutorials will assist you in mastering the Teams AI library.

### How to Use These Tutorials

Each tutorial is designed to be self-contained and follows a consistent structure to make learning straightforward:

1. **Introduction**
   - Presents the purpose and context of the tutorial.
   - Highlights any optional prerequisites specific to the tutorial.
2. **Setup**
   - Guides you through environment preparation and configuration steps.
   - Helps you verify that your setup is correct before proceeding.
3. **Implementation Steps**
   - Provides detailed, step-by-step instructions.
   - Includes code examples and explanations to facilitate understanding.
4. **Testing**
   - Offers testing instructions to validate your implementation.
   - Describes expected outcomes and provides troubleshooting tips.
5. **Conclusion**
   - Summarizes what you've learned.
   - Suggests next steps and additional resources for further exploration.

You can work through the tutorials sequentially or select those that align with your interests and project needs. It's recommended to start with the **Echo Bot Tutorial** if you're new to the Teams AI library, as it covers the basics and sets the foundation for more advanced topics.

### Prerequisites for All Tutorials

Before diving into the tutorials, ensure that you have the following prerequisites installed and configured:

- **Installing Node.js and Yarn**
  - Download and install [Node.js](https://nodejs.org/) (version 18.x or later).
  - Install [Yarn](https://yarnpkg.com/) package manager by running `npm install -g yarn`.
- **Setting Up Development Environment with Visual Studio Code**
  - Install [Visual Studio Code](https://code.visualstudio.com/), a powerful code editor with support for debugging and development tools.
  - Configure necessary extensions for enhanced development experience.
- **Configuring Teams Toolkit**
  - Install the [Microsoft Teams Toolkit](https://aka.ms/teams-toolkit) extension for Visual Studio Code.
  - Use the Teams Toolkit to simplify the development, debugging, and deployment of your Teams applications.

Make sure all these tools are correctly installed and configured on your development machine to ensure a smooth experience as you work through the tutorials.

## Tutorial Structure

Each tutorial in this section follows a consistent structure to facilitate learning and implementation. The tutorials include the following sections:

1. **Introduction**
   - **Purpose and Context**: Provides an overview of the tutorial's objective and how it fits into the broader scope of Teams AI library development.
   - **Optional Prerequisites**: Lists any specific requirements or knowledge needed before starting the tutorial that are not covered in the general prerequisites.

2. **Setup**
   - **Environment Preparation**: Guides you through preparing your development environment, including installing necessary tools and dependencies.
   - **Configuration Steps**: Details the specific configuration settings required for the tutorial.
   - **Verification of Setup**: Offers steps to confirm that your environment is correctly set up before proceeding.

3. **Implementation Steps**
   - **Step-by-Step Guidance**: Provides detailed instructions for building the tutorial project, broken down into manageable steps.
   - **Code Examples and Explanations**: Includes code snippets with explanations to illustrate key concepts and implementations.
   - **Visual Aids (Optional)**: May contain diagrams, screenshots, or other visual elements to enhance understanding.

4. **Testing**
   - **Testing Instructions**: Describes how to test your implementation to ensure it works as intended.
   - **Expected Outcomes**: Outlines the results you should see after completing the testing steps.
   - **Troubleshooting Tips**: Provides solutions to common issues that may arise during testing.

5. **Conclusion**
   - **Summary of What Was Learned**: Recaps the key takeaways and skills acquired through the tutorial.
   - **Next Steps**: Suggests additional tutorials or topics to explore for further learning.
   - **Additional Resources (Optional)**: Offers links to related documentation, sample code repositories, or community resources for further assistance.

This standardized structure is designed to make it easy for you to follow along and build upon your knowledge as you progress through the tutorials. By providing clear instructions and helpful resources at each stage, the tutorials aim to enhance your understanding and ability to utilize the Teams AI library effectively.

## Tutorials

In this section, you'll find a collection of tutorials designed to help you learn and implement various features of the Teams AI library. Each tutorial provides step-by-step guidance, code examples, and explanations to assist you in building functional bots and applications that integrate with Microsoft Teams and leverage AI capabilities.

### Echo Bot Tutorial

**Building a Simple Echo Bot**

Start with the basics by creating a bot that echoes back any message it receives. This tutorial introduces you to the fundamental structure of a bot using the Teams AI SDK and helps you understand how to set up and run a simple bot in Microsoft Teams.

- **Understanding the Basic Bot Structure**
- **Implementing Echo Functionality**

---

### Action Mapping with LightBot

**Controlling a Virtual Light Through AI**

Learn how to create a bot that can control a virtual lighting system. This tutorial teaches you how to implement action handlers and understand action mapping within the Teams AI library, enabling your bot to turn lights on and off, dim them, and check their status.

- **Implementing Action Handlers**
- **Understanding Action Mapping**

---

### Chained Actions with ListBot

**Managing Task Lists Through a Bot**

Discover how to create a bot that helps users manage task lists within Teams. This tutorial covers implementing chained actions to create, update, and search lists and tasks, demonstrating how to handle complex action sequences in your bot.

- **Implementing Chained Actions**
- **Creating Complex Action Sequences**

---

### Twenty Questions Game Bot

**Creating an Interactive Game Using AI**

Develop an interactive game bot that plays Twenty Questions with users. This tutorial guides you through managing conversational context and game state, designing conversational game logic, and providing an engaging user experience within Teams.

- **Managing Game State and User Interaction**
- **Designing Conversational Game Logic**

---

### Chat Moderation Sample

**Implementing Content Moderation Features**

Ensure safe and appropriate interactions by adding content moderation to your bot. This tutorial shows you how to use moderators to filter input and output, helping you maintain a respectful communication environment in Teams.

- **Using Moderators to Filter Input and Output**
- **Ensuring Safe and Appropriate Interactions**

---

### Message Extensions Sample

**Enhancing Messages with AI-Generated Content**

Enhance your Teams messages with AI-generated content using message extensions. This tutorial teaches you how to work with compose extensions and implement message extension commands to provide enriched messaging experiences.

- **Working with Compose Extensions**
- **Implementing Message Extension Commands**

---

### Adaptive Cards TypeAheadBot

**Enhancing User Search Experiences**

Improve user search experiences by integrating Adaptive Cards and implementing type-ahead functionality. This tutorial guides you through working with Adaptive Cards to create dynamic and interactive user interfaces within Teams.

- **Working with Adaptive Cards**
- **Implementing TypeAhead Functionality**

---

### Teams SSO Message Extension

**Integrating Single Sign-On (SSO) Functionality**

Simplify authentication processes in your Teams applications by integrating Single Sign-On (SSO). This tutorial demonstrates how to implement SSO in message extensions and handle authentication flows, providing seamless access for users.

- **Implementing SSO in Message Extensions**
- **Handling Authentication Flows**

---

### DevOps Bot

**Creating a Conversational Bot for Azure DevOps**

Automate DevOps tasks via conversation by creating a bot that interacts with Azure DevOps services. This tutorial shows you how to integrate your bot with DevOps, enhancing productivity within Teams.

- **Interacting with DevOps Services Through a Bot**
- **Automating DevOps Tasks via Conversation**

---

### Datasource Azure AI Search

**Integrating Azure AI Search as a Data Source**

Leverage Azure AI Search to enhance your bot's capabilities. This tutorial demonstrates how to integrate an Azure AI Search index as a data source within bot prompt templates, allowing your bot to perform advanced search functions.

- **Using Bot Prompt Templates with AI Search**
- **Enhancing Bots with Search Capabilities**

---

### Custom Model with LLAMA

**Using Custom AI Models**

Extend your bot's capabilities by integrating custom AI models. In this tutorial, you'll learn how to integrate Meta Llama with the Teams AI library, enabling your bot to utilize custom machine learning models beyond the default ones provided.

- **Integrating Meta Llama with the Teams AI Library**
- **Extending Bot Capabilities with Custom Models**

---

### Teams Chef Bot

**Providing Cooking Recipes and Culinary Assistance**

Create a helpful AI assistant that provides cooking recipes and culinary assistance. This tutorial guides you through implementing knowledge bases and designing an AI assistant that can answer culinary questions within Teams.

- **Implementing Knowledge Bases**
- **Designing Helpful AI Assistants**

---

These tutorials are designed to provide hands-on experience with the Teams AI library, helping you build sophisticated bots and applications that enhance user interaction within Microsoft Teams. By completing these tutorials, you'll gain practical skills and insights that you can apply to your own projects.

## Additional Resources

### Common Issues and Troubleshooting Tips

- **Dependency Installation Problems**

  Common issues may arise during the installation of dependencies, such as version mismatches or missing packages. Ensure that you have the correct versions of Node.js and Yarn installed. Refer to the official documentation for troubleshooting steps related to package installation and version compatibility.

- **Environment Variable Configuration**

  Ensure that environment variables are correctly set up in your `.env` file to avoid runtime errors or unexpected behavior. Double-check that all required environment variables are defined and properly formatted according to the instructions in each tutorial.

- **Authentication Failures**

  Issues related to OAuth and Single Sign-On (SSO) implementations can occur if API keys, client secrets, or connection names are incorrect. Verify your authentication configurations and ensure that all necessary permissions and credentials are correctly set up in your Azure or OpenAI accounts.

### Best Practices for Using Tutorials

- **Following the Recommended Tutorial Structure**

  Adhering to the structured format of each tutorial can enhance learning and implementation efficiency. Each tutorial is designed to build upon concepts introduced in previous sections, so following them in order can provide a more comprehensive understanding of the Teams AI library.

- **Tips for Effective Learning**

  Engage actively with the tutorials by experimenting with the code examples and exploring variations. Hands-on practice can lead to a deeper understanding of the library's features and how they can be applied to your own projects. Don't hesitate to modify the sample code and observe how changes affect the bot's behavior.

### Sample Code Repositories

- **Links to GitHub Repositories for Each Tutorial**

  Access the complete sample code for the projects on GitHub. These repositories provide practical examples and can enhance your understanding of the concepts covered in each tutorial:

  - [Microsoft Teams AI Samples](https://github.com/microsoft/teams-ai)

    Explore the repository to find code samples for various tutorials, including Echo Bot, Action Mapping with LightBot, Chained Actions with ListBot, and more.

### Contribution Guidelines

- **How to Provide Feedback and Contribute**

  Contribute to the improvement of the Teams AI library and its documentation by providing feedback, reporting issues, or submitting pull requests. Refer to the contribution guidelines in the GitHub repository for detailed instructions on how to participate.

- **Engaging with the Project Community**

  Connect with other developers and seek support within the community through forums, discussion boards, or the project's GitHub repository. Engaging with the community can provide valuable insights, help resolve challenges, and foster collaborative learning.

### Additional Documentation and Tools

- **Microsoft Bot Framework Documentation**

  Deepen your knowledge about building bots with the Bot Framework through official documentation:

  - [Introduction to Bot Framework](https://aka.ms/bot-services)
  - [Understanding Bot Adapters](https://aka.ms/about-bot-adapter)

- **Bot Framework Emulator**

  Test and debug your bots locally using the Bot Framework Emulator:

  - [Download Bot Framework Emulator](https://aka.ms/botframework-emulator)

- **Adaptive Cards Documentation**

  Learn how to create rich interactive cards for your bots:

  - [Adaptive Cards Overview](https://adaptivecards.io)
  - [Adaptive Card JSON Schema](http://adaptivecards.io/schemas/adaptive-card.json)

- **Microsoft Graph API Documentation**

  Explore how to integrate Microsoft Graph API to access data in Microsoft services:

  - [Microsoft Graph API Documentation](https://developer.microsoft.com/en-us/graph)

- **Azure OpenAI Documentation**

  Get started with Azure OpenAI services used in the tutorials:

  - [Azure OpenAI Service Overview](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/overview)
  - [Azure OpenAI Quickstart Guide](https://learn.microsoft.com/en-us/azure/ai-services/openai/use-your-data-quickstart)

- **OpenAI Platform Documentation**

  For information on using OpenAI services:

  - [OpenAI Platform Documentation](https://platform.openai.com/docs/)

- **Visual Studio Code and Teams Toolkit**

  Set up your development environment efficiently:

  - [Download Visual Studio Code](https://code.visualstudio.com/docs/setup/setup-overview)
  - [Install Teams Toolkit Extension](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)

- **Axios Library Documentation**

  For handling HTTP requests within your bots:

  - [Axios Documentation](https://axios-http.com/docs/intro)

- **Azure Application Insights**

  Implement logging and monitoring for your bots in a production environment:

  - [Azure Application Insights Documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)

- **Azure Content Safety Documentation**

  Incorporate content safety controls into your applications:

  - [Azure Content Safety Overview](https://learn.microsoft.com/en-us/azure/content-safety/overview)

- **Azure AI Search Documentation**

  Learn how to use Azure AI Search in your applications:

  - [Azure AI Search Service](https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search)

- **Llama 2 on Azure**

  Explore using custom AI models like Llama 2 with Azure services:

  - [Llama 2 on Azure Documentation](https://llama-2.ai/llama-2-on-azure/)

- **Vectra Vector Database**

  Utilize Vectra for semantic search and contextual data retrieval:

  - [Vectra GitHub Repository](https://github.com/Stevenic/vectra)

- **Semantic Search Resources**

  Learn about semantic search techniques to improve information retrieval:

  - [Semantic Search on Wikipedia](https://en.wikipedia.org/wiki/Semantic_search)

- **Retrieval Augmented Generation (RAG)**

  Understand advanced AI concepts like RAG used in some samples:

  - [Retrieval Augmented Generation on Wikipedia](https://en.wikipedia.org/wiki/Prompt_engineering#Retrieval-augmented_generation)

By leveraging these resources, you can deepen your understanding of the Teams AI library, enhance your development skills, and stay informed about best practices and new developments in bot and AI technologies.
