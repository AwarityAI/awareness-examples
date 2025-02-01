---
title: Implementing Single Sign-On (SSO) in Your Bot
author: stevenic
description: Learn how to implement Single Sign-On (SSO) in your Microsoft Teams bot by configuring Microsoft Entra ID, updating your app manifest, and securely handling access tokens.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Implementing Single Sign-On (SSO) in Your Bot

## Introduction

- Overview of Single Sign-On (SSO) in Microsoft Teams bots
- Benefits of implementing SSO
  - Enhanced user experience with seamless authentication
  - Reduced login prompts and credential management
  - Improved security through centralized authentication

## Prerequisites

- Microsoft Entra ID (formerly Azure AD) tenant access
- Registered bot application with Microsoft App ID
- Development environment set up for bot development
- Understanding of OAuth 2.0 and authentication concepts

## Configuring Microsoft Entra ID for SSO

- **Registering Your Bot Application**
  - Creating a new app registration in Microsoft Entra ID
  - Recording the Application (client) ID and Directory (tenant) ID
- **Setting Redirect URIs**
  - Adding required redirect URIs for SSO flow
  - Ensuring correct URI format for desktop and web clients
- **Configuring API Permissions**
  - Adding Microsoft Graph API permissions
    - User.Read, offline_access, openid, profile
  - Granting admin consent for your organization

## Updating the Teams App Manifest

- **Modifying the `webApplicationInfo` Section**
  - Inserting the application ID and resource information
  - Example of updated `webApplicationInfo` section
- **Specifying Required Scopes**
  - Listing permission scopes in the manifest
  - Ensuring scopes match those configured in Entra ID
- **Validating and Packaging the Updated Manifest**
  - Checking for errors or inconsistencies
  - Preparing the app package for deployment

## Implementing SSO in Your Bot Code

- **Acquiring Access Tokens Silently**
  - Using the Bot Framework SDK's SSO features
  - Implementing token retrieval without user interaction
- **Handling Access Tokens Securely**
  - Storing tokens in secure storage
  - Managing token expiration and refresh logic
- **Managing Fallback Authentication**
  - Detecting when SSO fails or is unavailable
  - Prompting users for interactive sign-in as a backup

## Accessing Protected Resources

- **Making Authenticated API Calls**
  - Using access tokens to call Microsoft Graph API
  - Example: Retrieving user profile information
- **Handling Permissions and Consent**
  - Understanding delegated permissions
  - Managing incremental consent scenarios
- **Error Handling**
  - Dealing with insufficient permissions
  - Responding to token validation errors

## Testing and Debugging SSO Integration

- **Testing SSO Locally**
  - Configuring ngrok for secure tunneling
  - Updating redirect URIs for local testing
- **Troubleshooting Common Issues**
  - Resolving token acquisition failures
  - Addressing consent and permission errors
- **Monitoring and Logging**
  - Implementing logging for authentication flows
  - Using monitoring tools to track issues

## Best Practices for SSO Implementation

- **Security Considerations**
  - Protecting tokens and sensitive data
  - Following least privilege principle with permissions
- **Enhancing User Experience**
  - Providing clear messaging during authentication
  - Avoiding unnecessary sign-in prompts
- **Compliance and Privacy**
  - Adhering to organizational policies
  - Informing users about data usage and consent

## Next step

> [!div class="nextstepaction"]
> [Advanced Authentication Scenarios](advanced-authentication-scenarios.md)

## See also

- [Authentication in Teams Bots](authentication-in-teams-bots.md)
- [Adding Authentication to Your Bot](../enhancing-capabilities/adding-authentication.md)