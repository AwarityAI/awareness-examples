---
title: Adding Authentication to Your Bot
author: stevenic
description: Learn how to add authentication to your Microsoft Teams bot using OAuth 2.0, implement Single Sign-On (SSO), and securely access protected resources.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Adding Authentication to Your Bot

## Introduction

- Importance of authentication in bots
- Scenarios requiring user authentication
- Overview of authentication methods in Teams bots

## Understanding OAuth 2.0 in Teams Bots

- Basics of OAuth 2.0 protocol
- How OAuth 2.0 applies to bot authentication
- Benefits of using OAuth for secure interactions

## Implementing OAuth 2.0 Authentication

- Setting up Microsoft Entra ID (formerly Azure AD) app registration
  - Creating a new app registration
  - Configuring Redirect URIs and permissions
- Updating your bot's code to support OAuth
  - Using the OAuthPrompt class
  - Managing access and refresh tokens
- Handling the authentication flow
  - User consent and sign-in process
  - Token acquisition and storage

## Adding Single Sign-On (SSO)

- Advantages of SSO in Teams bots
- Configuring SSO in Microsoft Entra ID
  - Enabling OAuth 2.0 implicit grant
  - Setting up required scopes and permissions
- Modifying the Teams app manifest for SSO
  - Adding the `webApplicationInfo` section
  - Specifying app IDs and resource information
- Implementing SSO in your bot
  - Acquiring tokens silently
  - Handling fallback scenarios when SSO is not available

## Accessing Protected Resources

- Using Microsoft Graph API
  - Making API calls with access tokens
  - Common use cases (e.g., reading user profile, calendars)
- Interacting with other secured APIs
  - Configuring additional scopes and permissions
  - Managing multiple resource providers

## Best Practices for Secure Authentication

- Securely storing and handling tokens
- Implementing proper error handling and messaging
- Respecting user privacy and data consent
- Regularly updating permissions and app registrations

## Testing and Debugging Authentication

- Testing authentication flows locally
  - Using tools like ngrok for secure tunneling
  - Debugging with the Bot Framework Emulator
- Troubleshooting common authentication issues
  - Resolving consent and permission errors
  - Addressing token expiration and renewal problems

## Next step

> [!div class="nextstepaction"]
> [Interacting with Files Using Bots](interacting-with-files.md)

## See also

- [Implementing Single Sign-On (SSO) in Your Bot](../authentication/implementing-sso-in-your-bot.md)
- [Authentication in Teams Bots](../authentication/authentication-in-teams-bots.md)