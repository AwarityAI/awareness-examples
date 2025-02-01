# FAQs and Troubleshooting

## Frequently Asked Questions about the Teams AI Library

1. **What is the Teams AI Library?**

   The Teams AI Library is an extension of the Bot Framework SDK that helps developers build intelligent bots for Microsoft Teams and Microsoft 365. It simplifies the integration of Large Language Models (LLMs), like those from OpenAI, into conversational applications. With the Teams AI Library, you can create AI-powered bots that understand natural language, manage conversations, and interact with external data sources. It provides built-in prompts and actions that you can customize to fit your specific scenarios, making it easier to deliver engaging and context-aware user experiences.

2. **Do I need my own Large Language Model to use the Teams AI Library?**

   No, you don't need to host your own Large Language Model. The Teams AI Library works with OpenAI or Azure OpenAI API keys, allowing you to use existing LLMs without managing or hosting them yourself. This approach makes it easier to incorporate advanced AI capabilities into your bots without the overhead of handling the underlying models.

3. **Can I use the Teams AI Library with LLMs other than OpenAI's models?**

   Yes, the Teams AI Library is flexible and can be extended to support other Large Language Model providers. While it's designed to work seamlessly with OpenAI and Azure OpenAI models, you can adapt it to integrate different LLMs based on your needs.

4. **Does the Teams AI Library replace the Bot Framework SDK?**

   No, the Teams AI Library doesn't replace the Bot Framework SDK. Instead, it builds upon and extends the Bot Framework SDK by adding capabilities for creating intelligent bots that integrate Large Language Models. The library enhances the SDK with tools for managing prompts, planning actions, and handling conversational interactions, especially tailored for Microsoft Teams and Microsoft 365 environments.

5. **Do I need to customize prompts and actions when using the Teams AI Library?**

   While the Teams AI Library provides built-in prompts and actions, customizing them can help tailor your bot's responses and behaviors to your specific scenarios. You have the flexibility to adjust prompts, topic filters, and actions to ensure your bot behaves as intended. Customization allows you to provide a more engaging and personalized user experience by fine-tuning how your bot interacts with users.

## Troubleshooting Authentication Issues in Teams AI Bots

### Common Symptoms

- **Bot Works in Emulator but Not in Teams:** The bot functions correctly in the Bot Framework Emulator and web chat but doesn't work within Microsoft Teams.

- **Error Message "Unable to Reach App":** Users receive an error stating, "Unable to reach app. Please try again."

- **HTTP Errors During Authentication:** When inspecting network requests, you see HTTP errors like 502 Bad Gateway or 504 Gateway Timeout.

- **Missing Access Token:** The authentication flow appears to complete, but the bot doesn't receive the expected access token.

### Possible Causes

1. **Incorrect App ID and Password:**

   Misconfigured Microsoft App ID and Microsoft App Password can prevent the bot from authenticating properly. Ensure that the App ID and password in your bot's configuration match the credentials provided in the Azure portal.

2. **OAuth Connection Issues:**

   Problems with the OAuth connection settings in Azure Bot Service can disrupt the authentication flow. Verify that the OAuth connection name in your bot matches the one configured in Azure and that all necessary scopes and permissions are granted.

3. **Token Expiry Handling:**

   If your bot doesn't handle expired tokens correctly, users may experience authentication failures after a certain period. Implement logic to detect expired tokens and prompt users to re-authenticate when necessary.

4. **SDK Version Issues:**

   Certain versions of the Bot Builder SDK may have known issues affecting authentication. Ensure you're using the latest version of the SDK to benefit from recent fixes and improvements.

5. **Deployment Environment:**

   The bot must be deployed in a secure, publicly accessible environment over HTTPS. If the bot isn't properly hosted, Microsoft Teams won't be able to communicate with it. Check that your SSL certificates are valid and that your hosting environment is configured correctly.

6. **User Consent Issues:**

   If the bot hasn't correctly handled user consent for accessing their identity, authentication can fail. Ensure that your bot requests the necessary permissions and guides users through the consent process effectively.

7. **SSO Limitations:**

   Misunderstandings about Single Sign-On (SSO) capabilities can lead to implementation issues. Be aware of SSO limitations in Teams and ensure your bot's authentication flow accounts for scenarios where SSO may not be supported.

### Troubleshooting Steps

1. **Verify App Registration and Credentials:**

   - Double-check the Microsoft App ID and Microsoft App Password in your bot's configuration.
   - Ensure they match exactly with the credentials in the Azure portal.

2. **Inspect OAuth Connection Settings:**

   - Confirm that the OAuth connection name in your bot matches the one in Azure Bot Service.
   - Verify that all required scopes and permissions are included.

3. **Update the Bot Framework SDK:**

   - Upgrade to the latest version of the Bot Builder SDK.
   - Test your bot after updating to see if the issue persists.

4. **Handle Token Expiry Properly:**

   - Implement token refresh logic in your bot.
   - Prompt users to re-authenticate when tokens expire.

5. **Check Deployment Environment:**

   - Ensure your bot is hosted on a server that is accessible over HTTPS.
   - Validate your SSL certificates and make sure they are correctly installed.

6. **Guide Users Through Consent:**

   - Provide clear instructions during the authentication flow.
   - Use OAuth Cards to request user permissions within Teams.

7. **Understand SSO Capabilities:**

   - Review the documentation on SSO limitations in Microsoft Teams.
   - Adjust your authentication flow to handle cases where SSO isn't available.

8. **Monitor Network Traffic and Logs:**

   - Use developer tools to inspect network requests during authentication.
   - Check for HTTP errors or failed requests that can indicate where the process is failing.

9. **Test Authentication Flows:**

   - Try authenticating in different environments (Emulator, web chat, Teams) to compare behaviors.
   - Use test accounts to simulate different user scenarios.

## Common Issues and Solutions

### Issue: Incorrect or Missing Environment Variables

**Solution:**

- Ensure all required environment variables are set correctly in your `.env` file.
- Key variables include:
  - `AZURE_OPENAI_KEY`
  - `AZURE_OPENAI_ENDPOINT`
  - `AZURE_SEARCH_ENDPOINT`
  - `AZURE_SEARCH_KEY`
  - `AZURE_OPENAI_DEPLOYMENTMODEL`
  - `AZURE_SEARCH_INDEXNAME`
  - `BOT_ID`
  - `BOT_PASSWORD`

### Issue: Using Outdated Indexers

**Solution:**

- Switch to using the Azure Blob Storage Indexer instead of the SharePoint Indexer.
- The Azure Blob Storage Indexer is more reliable and ensures content updates are reflected promptly.

### Issue: Conflicting or Old `.env` Files

**Solution:**

- Delete any old `.env` files to prevent conflicts.
- Remove conflicting values such as `SECRET_BOT_PASSWORD` and `TEAMS_APP_UPDATE_TIME` from your `.env` file.

### Issue: Dependencies Not Installed or Built

**Solution:**

- Run `yarn install` to install all necessary dependencies.
- Execute `yarn build` to build the project before running it.

### Issue: Not Updating `index.ts` Correctly

**Solution:**

- Follow the setup instructions carefully to update `index.ts` with the necessary imports and data source configurations.
- Ensure that all required modules are imported and options are set properly.

### Issue: Temperature Settings Affecting Bot Responses

**Solution:**

- Adjust the `temperature` setting in your `config.json` file.
- A lower temperature (e.g., 0.3) makes the bot's responses more precise and deterministic.
- A higher temperature (e.g., 0.7) allows for more creative and varied responses.

## Best Practices

### Tips for Effective Bot Development

- **Use Clear and Concise Prompts:**

  Craft prompts that are specific and guide the language model effectively. Use the `PromptManager` to design prompts that result in accurate responses.

- **Manage Conversation History:**

  Keep track of conversation context by managing the history size. Use parameters like `MaxHistoryMessages` and `MaxConversationHistoryTokens` to control the amount of historical data.

- **Implement Feedback Loops:**

  Introduce mechanisms to learn from interactions. Use validation and repair loops to handle errors and improve the bot's performance over time.

- **Leverage External Data Sources:**

  Enhance your bot's responses by integrating external data. Use classes like `DataSourceSection`, `TextDataSource`, and `VectraDataSource` to include relevant information in conversations.

- **Test Extensively:**

  Regularly test your bot in different environments and scenarios. Use the Teams Toolkit and Visual Studio Code for debugging and testing.

### Security Considerations

- **Protect Sensitive Information:**

  Never expose API keys, client secrets, or passwords in your code or public repositories. Store them securely using environment variables or secure configuration files.

- **Handle Authentication Securely:**

  Ensure that authentication flows are correctly implemented and that tokens are securely managed and refreshed when necessary.

- **Stay Updated:**

  Keep your development tools, frameworks, and libraries up to date to benefit from the latest security patches and features.

- **Implement Error Handling:**

  Anticipate potential failures and provide clear guidance to users when errors occur. Handle exceptions gracefully to maintain trust.

- **Monitor and Alert:**

  Set up monitoring for unusual activity or potential security threats. Use logging and alerting systems to respond proactively to issues.

- **Respect Privacy and Ethics:**

  Adhere to ethical guidelines by respecting user privacy, filtering inappropriate content, and preventing model hallucinations. Incorporate moderation mechanisms to ensure responsible bot behavior.