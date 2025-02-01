---
title: Proactive Messaging in Teams Bots
author: stevenic
description: Learn how to implement proactive messaging in Microsoft Teams bots to initiate conversations and send messages to users or channels without waiting for user input.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Proactive Messaging in Teams Bots

## Introduction

- Overview of proactive messaging in bots
- Differences between proactive and reactive messaging
- Importance and benefits of proactive messaging in Teams

## Understanding Proactive Messages

- Definition of proactive messages
- How Teams handles proactive messages
- Scenarios where proactive messaging is applicable

## Use Cases for Proactive Messaging

- Sending notifications and alerts
- Reminders and scheduled messages
- Event-driven communications (e.g., system updates, external triggers)
- Onboarding and welcome messages to new users or teams

## Implementing Proactive Messaging in Your Bot

### Acquiring Conversation References

- What is a conversation reference
- Methods to obtain and store conversation references
  - During user interaction
  - Through roster APIs
- Best practices for managing conversation references

### Sending Proactive Messages

- Using stored conversation references to initiate messages
- Code examples for sending proactive messages
  - Sample implementations in C#, JavaScript/TypeScript, or Python
- Handling different conversation types (personal, group, channel)

### Authentication and Permissions

- Ensuring the bot has the required permissions
- Handling user consent and privacy considerations
- Using Microsoft Graph API for advanced scenarios

## Best Practices for Proactive Messaging

- Respecting user preferences and opt-in mechanisms
- Timing and frequency considerations to avoid spamming
- Personalizing messages for better engagement
- Compliance with Microsoft Teams policies and guidelines

## Troubleshooting Proactive Messaging

- Common issues and error handling
- Debugging tips for failed message deliveries
- Logging and monitoring proactive message activities

## Samples and Additional Resources

- References to code samples and tutorials
- Tools and libraries to assist with proactive messaging

## Next step

> [!div class="nextstepaction"]
> [Handling Conversation Events in Bots](handling-conversation-events.md)

## See also

- [Personal, Group, and Channel Conversations](personal-group-channel-conversations.md)
- [Understanding Bot Activity Handlers](../bot-fundamentals/understanding-bot-activity-handlers.md)