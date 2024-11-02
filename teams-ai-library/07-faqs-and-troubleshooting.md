# FAQs and Troubleshooting

## Frequently Asked Questions about the Teams AI Library

1. **What is the Teams AI Library?**

   The Teams AI Library is an extension of the Bot Framework SDK that provides abstractions and tools to help developers build intelligent bots utilizing Large Language Models (LLMs), such as those from OpenAI. It simplifies the integration of LLMs into conversational applications within Microsoft Teams and Microsoft 365, enabling the creation of robust AI-powered bots.

2. **Do I need my own Large Language Model to use the Teams AI Library?**

   No, you do not need to host your own Large Language Model to use the Teams AI Library. The library works with OpenAI or Azure OpenAI API keys, allowing you to utilize existing LLMs without the need to host them yourself. You will need to have API access to OpenAI's models through OpenAI or Azure OpenAI to integrate LLM capabilities into your bots.

3. **Can I use the Teams AI Library with LLMs other than OpenAI's models?**

   Yes, you can use the Teams AI Library with Large Language Models other than OpenAI's models. While the library is designed with integration to OpenAI and Azure OpenAI in mind, it is flexible and can be extended to work with different LLM providers to suit your needs.

4. **Does the Teams AI Library replace the Bot Framework SDK?**

   No, the Teams AI Library does not replace the Bot Framework SDK. Instead, it extends and builds upon the Bot Framework SDK, providing additional capabilities for building intelligent bots that interact with Microsoft Teams and Microsoft 365 applications. The library enhances your ability to integrate Large Language Models and streamline bot development.

5. **Do I need to customize prompts and actions when using the Teams AI Library?**

   Yes, you may need to customize prompts and actions when using the Teams AI Library. While the library provides built-in prompts and actions to get you started, customizing them is often necessary to tailor the bot's responses and behaviors to your specific scenarios. By tweaking prompts, topic filters, and actions, you can ensure that your conversational application behaves as intended and provides a more engaging user experience.

## Troubleshooting Authentication Issues in Teams AI Bots

When integrating authentication into your Teams AI bot, you might encounter issues that prevent the bot from functioning correctly within Microsoft Teams. This section outlines common symptoms, possible causes, and steps to resolve authentication problems.

### Common Symptoms

- **Bot functions in the Bot Framework Emulator but not in Teams:** The bot responds correctly during local testing but fails when deployed to Teams.
- **"Unable to reach app. Please try again" error message:** Users receive this error when interacting with the bot in Teams.
- **HTTP errors like 502 Bad Gateway or 504 Gateway Timeout:** These errors appear when inspecting network requests during bot interactions.
- **Authentication flow completes without issuing an access token:** The bot does not receive the expected access token after the user completes the authentication flow.

### Possible Causes

1. **Incorrect App ID and Password:** The Microsoft App ID and App Password are misconfigured or incorrect in your bot's settings.
2. **OAuth Connection Issues:** There are problems with the OAuth connection settings in Azure Bot Service, such as mismatched connection names or incorrect scopes.
3. **Token Expiry Handling:** The bot does not correctly handle cases where the user's access token has expired, leading to authentication failures.
4. **SDK Version Issues:** Certain versions of the Bot Framework SDK have known issues affecting authentication functionality.
5. **Deployment Environment:** The bot is not deployed in a secure, accessible environment required for Teams integration.
6. **User Consent Issues:** The bot does not correctly handle user consent for accessing identity information, preventing the acquisition of access tokens.
7. **Single Sign-On (SSO) Limitations:** Misunderstandings about the capabilities and limitations of SSO in Teams lead to incorrect implementation.

### Troubleshooting Steps

1. **Verify App Registration and Credentials:**
   - **Check Microsoft App ID and Password:** Ensure that the App ID and App Password are correctly entered in your bot's configuration settings.
   - **Validate Credentials:** Use tools like Postman to send a request to the Microsoft identity platform token endpoint to confirm that the credentials are valid.

2. **Inspect OAuth Connection Settings:**
   - **Confirm Connection Name:** In the Azure Bot Service, verify that the OAuth connection name matches the name expected by your bot code.
   - **Review OAuth Configurations:** Ensure that the OAuth settings, including scopes and redirect URIs, are correctly configured.

3. **Update Bot Framework SDK:**
   - **Check SDK Version:** Determine the version of the Bot Framework SDK used in your project.
   - **Upgrade if Necessary:** Update to the latest stable release to benefit from fixes related to authentication issues.

4. **Ensure Proper Deployment:**
   - **Secure and Accessible Environment:** Deploy your bot to a secure environment that is accessible over HTTPS. Teams requires bots to be hosted on publicly accessible endpoints.
   - **Validate SSL Certificates:** Ensure that SSL certificates are valid and properly configured.

5. **Handle Token Expiry and Refresh:**
   - **Implement Token Handling Logic:** Incorporate logic to detect expired tokens and initiate the re-authentication process when necessary.
   - **Use SDK Features:** Leverage the Bot Framework SDK's built-in methods for token management and refresh.

6. **Confirm User Consent Process:**
   - **Request Necessary Permissions:** Make sure your bot requests all the necessary permissions during the authentication process.
   - **Handle Consent Prompt:** Properly handle scenarios where users need to provide consent, and provide clear instructions if consent is denied or not completed.

7. **Test with OAuth Cards and SSO:**
   - **Use OAuth Cards:** Utilize OAuth Cards in your bot to initiate the authentication flow within Teams.
   - **Understand SSO Limitations:** Be aware that SSO in Teams has limitations and may not cover all authentication scenarios. Implement fallback authentication methods if needed.

8. **Monitor Network Traffic and Logs:**
   - **Use Developer Tools:** Employ Teams Developer Tools or browser developer tools to monitor network requests and identify where failures occur during authentication.
   - **Check Bot Logs:** Review your bot's application logs for error messages or exceptions related to authentication.

9. **Validate App Permissions and Scopes:**
   - **Review API Permissions:** In your app registration on Microsoft Entra ID (formerly Azure Active Directory), check that the necessary API permissions are granted.
   - **Ensure Scope Alignment:** Confirm that the scopes requested by your bot match those configured in the app registration.

10. **Handle Multiple Endpoints and Sessions:**
    - **Manage State Across Channels:** If your bot is accessible through multiple channels, ensure that user state and tokens are managed consistently.
    - **Prevent Duplicate Responses:** Implement logic to synchronize sessions and prevent issues like duplicate messages or conflicting states.

By systematically addressing each of these areas, you can identify and resolve authentication issues in your Teams AI bot. Proper handling of authentication is crucial for providing a seamless and secure user experience within Microsoft Teams.

## Common Issues and Solutions

When developing bots using the Teams AI Library, you may encounter various setup and runtime issues. This section outlines common problems and provides solutions to help you troubleshoot and resolve them efficiently.

### Incorrect or Missing Environment Variables

**Issue:** Failure to properly configure the `.env` file with all the necessary environment variables can lead to errors during bot execution.

**Solution:** Ensure that the following essential environment variables are correctly set in your `.env` file, located at the root of your project alongside `package.json`:

- `AZURE_OPENAI_KEY`
- `AZURE_OPENAI_ENDPOINT`
- `AZURE_SEARCH_ENDPOINT`
- `AZURE_SEARCH_KEY`
- `AZURE_OPENAI_DEPLOYMENTMODEL`
- `AZURE_SEARCH_INDEXNAME`
- `BOT_ID`
- `BOT_PASSWORD`

Double-check that each variable has the correct value corresponding to your Azure and OpenAI configurations.

### Using Outdated Indexers

**Issue:** Relying on the SharePoint Indexer for Azure AI Search Service, which is still in beta, can cause issues, especially when documents are deleted or renamed. The indexer may not update these changes promptly, leading to inconsistent search results.

**Solution:** Switch to the Azure Blob Storage Indexer, which is generally available and more stable. This indexer provides better reliability and ensures that your bot works with up-to-date content.

### Not Deleting Old `.env` Files

**Issue:** Old environment configurations from previous samples or runs can cause conflicts and unexpected behavior in your bot.

**Solution:** Check for any old `.env` and `env/.env.*.*` files in your project, and delete any automatically populated values that are no longer relevant. This allows the Teams Toolkit to generate new resources without conflicts.

### Leaving Conflicting Values in `.env` File

**Issue:** Keeping values for `SECRET_BOT_PASSWORD` and `TEAMS_APP_UPDATE_TIME` in the `.env` file can lead to setup conflicts and runtime errors.

**Solution:** Remove these values from your `.env` file or leave them blank. This helps prevent issues during deployment and ensures that your bot uses the correct credentials.

### Assuming All Credentials Are Auto-Generated

**Issue:** The Teams Toolkit automatically provisions `BOT_ID` and `BOT_PASSWORD`, but it does not generate Azure OpenAI or OpenAI keys, a database, or storage options.

**Solution:** Manually provide the required credentials for Azure OpenAI or OpenAI in your `.env` file. Obtain these keys from the Azure portal or OpenAI's platform and ensure they're correctly configured.

### Not Updating `index.ts` Correctly

**Issue:** Failing to update the `index.ts` file with correct import statements and data source options can prevent the application from connecting to Azure AI services properly.

**Solution:** Follow the setup instructions carefully to configure the `index.ts` file. Ensure that all necessary modules are imported and that data source options are correctly specified to enable proper connectivity.

### Skipping Dependency Installation or Build Steps

**Issue:** Neglecting to install project dependencies or to build them can cause the application to malfunction or fail to start.

**Solution:** Run `yarn install` to install all necessary dependencies and `yarn build` to build the project. Make sure to execute these commands in the appropriate directory within Visual Studio Code.

### Not Installing Required Tools

**Issue:** Missing essential development tools can hinder the setup process and lead to errors during development.

**Solution:** Verify that you have installed all the required tools:

- Visual Studio Code
- Teams Toolkit extension for Visual Studio Code
- Git
- Node.js
- Microsoft Teams
- OpenAI or Azure OpenAI API keys
- Microsoft 365 Developer Account

Having these tools installed and properly configured is essential for successful bot development.

### Not Using Teams Toolkit for First-Time Bot Setup

**Issue:** For first-time bot developers, not utilizing the Teams Toolkit extension in Visual Studio Code can make the setup process more challenging.

**Solution:** Use the Teams Toolkit extension, which streamlines bot setup and deployment. It provides templates and guides that are especially helpful for beginners.

### Issues with Temperature Settings

**Issue:** The `temperature` setting in the `config.json` file affects the chatbot's creativity and precision. An inappropriate value can lead to unsatisfactory or unpredictable responses.

**Solution:** Adjust the `temperature` setting according to your application's needs. Lower values make the bot's responses more focused and deterministic, while higher values increase creativity but may reduce coherence.

### Not Reporting Problems Through GitHub

**Issue:** Failing to report issues or bugs can slow down the improvement of the Teams AI Library and its extensions.

**Solution:** If you encounter any issues, raise them via GitHub. Contributing to issue reports helps the maintainers address problems more quickly and improve the library for everyone.

## Best Practices

Developing bots with the Teams AI Library involves a combination of utilizing powerful tools and adhering to effective development practices. This section outlines key recommendations to help you build robust, efficient, and secure bots for Microsoft Teams.

### Tips for Effective Bot Development

1. **Leverage the Bot Framework SDK:**
   Build your bot on top of the Bot Framework SDK, which serves as the foundation of the Teams AI Library. This provides essential setup and core functionalities, allowing you to focus on creating rich conversational experiences.

2. **Utilize Built-in AI Components and APIs:**
   Take advantage of the AI components, APIs, and UI controls provided by the Teams AI Library. These tools streamline the development process, enabling you to incorporate advanced AI capabilities without extensive overhead.

3. **Design Effective Prompts:**
   Craft clear and concise prompts using the `PromptManager`. Providing detailed instructions, examples, and context guides the language model to generate accurate and relevant responses, enhancing user engagement.

4. **Implement Custom State Classes:**
   Use the `TurnStateFactory` to create custom state classes that store additional information or logic specific to your bot. This enhances the bot's ability to manage complex interactions and maintain context across conversations.

5. **Incorporate External Data Sources:**
   Register data sources with the planner to inject relevant external information into prompts. Enriching your bot's responses with contextual data makes interactions more meaningful and personalized for users.

6. **Use the ActionPlanner for Responsive Interactions:**
   Implement the `ActionPlanner` to generate and execute plans based on user input and available actions. This makes your bot more responsive and intelligent in handling user requests.

7. **Employ Embeddings for Semantic Understanding:**
   Incorporate embeddings to capture the semantic meaning of text. Utilizing models like OpenAI's `text-embedding-ada-002` enhances your bot's natural language processing capabilities, allowing for more nuanced interactions.

8. **Integrate Local Indexes with VectraDataSource:**
   Use the `VectraDataSource` class to connect to a local Vectra index. Injecting relevant text snippets into prompts improves the relevance and context of your bot's responses.

9. **Manage Prompt Size and Content:**
   Adjust the size and content of prompts to respect token limits using prompt management tools. This ensures that the model processes an optimal amount of information without exceeding limitations.

10. **Implement Feedback Loops and Repair Mechanisms:**
    Introduce feedback mechanisms to monitor and improve your bot's interactions over time. Incorporating repair loops, validation steps, and learning from mistakes enhances user satisfaction and bot reliability.

11. **Manage Conversation History:**
    Control conversation history using parameters like `MaxHistoryMessages` and `MaxConversationHistoryTokens`. This helps maintain context while optimizing performance and resource utilization.

12. **Focus on Prompt Engineering:**
    Design prompts that consider user intent, conversation context, and your bot's personality. Effective prompt engineering leads to personalized and engaging user experiences.

13. **Take Advantage of Multilingual Support:**
    Leverage the language models' ability to understand multiple languages. This can save on localization efforts and cater to a broader user base without additional development work.

14. **Utilize Sample Projects and Documentation:**
    Explore sample projects and comprehensive documentation provided with the Teams AI Library. Familiarizing yourself with these resources can accelerate your development process and help you adopt best practices more effectively.

15. **Stay Flexible with Language Models:**
    While the Teams AI Library works seamlessly with OpenAI's GPT models, design your bot to remain flexible. This allows you to switch to other large language models in the future without significant code changes.

### Security Considerations

1. **Ensure Ethical and Responsible AI Use:**
   Incorporate moderation hooks and topic filters to create ethical and responsible conversational applications. This includes filtering inappropriate content and adhering to user privacy standards.

2. **Implement Moderation Actions:**
   Use actions like `FlaggedInputAction` and `FlaggedOutputAction` to handle events triggered by AI components. This is essential for moderating content and maintaining appropriate interactions within your bot.

3. **Register and Handle Actions Properly:**
   Define all actions your bot can perform in an `actions.json` file, including names, descriptions, and required parameters. Register handlers for each action and include a handler for unknown actions to guide the conversation effectively.

4. **Prevent Model Hallucinations:**
   By explicitly defining actions and using augmentations like `sequence`, `monologue`, or `tools`, you prevent the model from generating invalid function or action names. This ensures reliable bot behavior and enhances security.

5. **Keep Secrets Secure:**
   Never expose your App Password, client secrets, or API keys in client-side code or public repositories. Store sensitive information securely, such as in environment variables or secure configuration files.

6. **Use the Latest Frameworks and Libraries:**
   Regularly update your development tools, frameworks, and libraries to benefit from security patches and improvements. Staying up-to-date reduces vulnerabilities and ensures compatibility with the latest features.

7. **Implement Robust Error Handling:**
   Anticipate possible points of failure and handle exceptions gracefully. Use try-catch blocks around API calls to catch exceptions and prevent unhandled errors from causing the bot to crash.

8. **Provide Clear User Guidance:**
   If authentication fails or an error occurs, inform the user in a friendly manner. Provide actionable steps to resolve the issue or offer assistance, enhancing user trust and experience.

9. **Testing in Teams:**
   Always test authentication flows and other bot functionalities within Microsoft Teams, not just in emulators or web chats. The Teams client environment can introduce differences that are crucial to identify during development.

10. **Monitor and Alert:**
    Set up monitoring and alerting to be notified of errors or unusual activity in real-time. This allows you to respond quickly to issues as they arise and maintain the reliability of your bot.

11. **Understand the Authentication Flow:**
    Familiarize yourself with how Teams handles authentication, including token exchange and the use of OAuth 2.0 protocols. A thorough understanding prevents common mistakes and enhances security.

12. **Design for Single Endpoint Responses:**
    Be mindful that responses can come from any active user session. Design your bot to handle responses appropriately, regardless of the endpoint, ensuring consistent user experiences.

By following these best practices, you can develop Teams AI bots that are not only powerful and feature-rich but also secure, reliable, and user-friendly. Consistently applying these recommendations will help you create bots that meet high standards of quality and provide significant value to users.
