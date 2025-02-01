---
title: Testing Your Bot Locally
author: stevenic
description: Learn how to test your Microsoft Teams bot locally using the Bot Framework Emulator and ngrok, and understand strategies for effective debugging.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Testing Your Bot Locally

## Introduction

- Importance of local testing during bot development
- Overview of tools and methods for local testing

## Configuring Your Bot for Local Testing

- Setting up environment variables
- Modifying your bot's configuration for local endpoints
- Ensuring authentication is properly handled during testing

## Using the Bot Framework Emulator

- Installing the Bot Framework Emulator
- Connecting the emulator to your bot
  - Setting the endpoint URL
  - Providing Microsoft App ID and Password (if necessary)
- Testing basic bot functionality
- Inspecting messages and activities

## Implementing ngrok for Local Tunneling

- Understanding the need for tunneling services
- Installing ngrok on your development machine
- Starting ngrok and establishing a secure tunnel
- Updating your bot's messaging endpoint in Azure with the ngrok URL

## Testing Your Bot in Microsoft Teams

- Preparing your bot for Teams testing
- Creating and configuring the app package
- Sideloading your bot into Teams
- Interacting with your bot within the Teams client

## Debugging Strategies

- Using breakpoints and stepping through code
- Monitoring logs and console output
- Handling exceptions and errors effectively
- Common issues and how to resolve them

## Best Practices for Local Testing

- Security considerations when exposing local servers
- Maintaining session persistence with ngrok
- Collaborating with others during testing
- Automating tests and using testing frameworks

## Next step

> [!div class="nextstepaction"]
> [Understanding Bot Activity Handlers](../bot-fundamentals/understanding-bot-activity-handlers.md)

## See also

- [Creating Your First Bot](creating-your-first-bot.md)
- [Prerequisites for Bot Development](prerequisites.md)