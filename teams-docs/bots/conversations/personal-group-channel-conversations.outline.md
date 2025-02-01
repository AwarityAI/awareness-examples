---
title: Personal, Group, and Channel Conversations
author: stevenic
description: Learn about the different conversation types in Microsoft Teams bots—personal, group, and channel conversations—and how to manage them effectively.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Personal, Group, and Channel Conversations

## Introduction

- Understanding the importance of conversation types in Teams bots
- How conversation contexts impact bot functionality and user experience
- Overview of personal, group, and channel conversations

## Conversation Types in Microsoft Teams

### Personal Conversations

- Characteristics of personal (1:1) conversations
- When to use personal conversations in bots
- Privacy and personalization considerations

### Group Conversations

- Features of group chats with multiple users
- Use cases for bots in group conversations
- Managing interactions among multiple participants

### Channel Conversations

- Overview of channel conversations within Teams
- Benefits of deploying bots in channels
- Navigating threads and message contexts

## Implementing Bots in Different Conversation Contexts

### Adding Bots to Conversations

- How to add bots to personal chats
- Inviting bots to group chats
- Installing bots in Teams channels

### Handling Messages and Activities

- Processing incoming activities based on conversation type
- Differences in message handling for personal, group, and channel chats
- Using @mentions and replies appropriately

### Managing Conversation State and Context

- Tracking conversation references and identifiers
- Storing state information per conversation type
- Handling conversation updates and member changes

## Permissions and Scopes

- Understanding the scopes defined in the app manifest
  - `personal`, `team`, and `groupchat` scopes
- Configuring bots to operate in desired conversation contexts
- Security considerations and compliance

## Best Practices for Conversation Management

- Designing bot interactions for each conversation type
- Ensuring a consistent user experience across contexts
- Tips for avoiding common pitfalls

## Testing Bots in Various Conversation Types

- Strategies for testing personal, group, and channel conversations
- Using the Bot Framework Emulator and Teams client
- Debugging issues specific to conversation contexts

## Next step

> [!div class="nextstepaction"]
> [Proactive Messaging in Teams Bots](proactive-messaging.md)

## See also

- [Handling Conversation Events in Bots](handling-conversation-events.md)
- [Understanding Bot Activity Handlers](../bot-fundamentals/understanding-bot-activity-handlers.md)