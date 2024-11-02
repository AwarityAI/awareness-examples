# FAQs and Troubleshooting

## Frequently Asked Questions about the Teams AI Library

1. **What is the Teams AI Library?**
2. **Do I need my own Large Language Model to use the Teams AI Library?**
3. **Can I use the Teams AI Library with LLMs other than OpenAI's models?**
4. **Does the Teams AI Library replace the Bot Framework SDK?**
5. **Do I need to customize prompts and actions when using the Teams AI Library?**

## Troubleshooting Authentication Issues in Teams AI Bots

### Common Symptoms

- The bot works in the Bot Framework Emulator and web chat but not in Teams.
- Users receive an error message saying, "Unable to reach app. Please try again."
- HTTP errors like 502 Bad Gateway or 504 Gateway Timeout appear when inspecting network requests.
- Authentication flow seems to complete, but the bot doesn't receive the expected access token.

### Possible Causes

1. **Incorrect App ID and Password:** Misconfiguration of the Microsoft App ID and Microsoft App Password.
2. **OAuth Connection Issues:** Problems with the OAuth connection settings in Azure Bot Service.
3. **Token Expiry Handling:** The bot does not correctly handle expired tokens.
4. **SDK Version Issues:** Known issues in certain versions of the Bot Builder SDK.
5. **Deployment Environment:** The bot isn't properly deployed in a secure, accessible environment.
6. **User Consent Issues:** The bot hasn't correctly handled user consent for accessing their identity.
7. **SSO Limitations:** Misunderstandings about the capabilities and limitations of Single Sign-On (SSO) in Teams.

## Common Issues and Solutions

- **Resolving common setup and runtime errors**

## Best Practices

- **Tips for effective bot development**
- **Security considerations**