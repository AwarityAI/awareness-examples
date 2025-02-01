---
title: Handling Conversation Events in Bots
author: stevenic
description: Learn how to handle conversation events in Microsoft Teams bots, including member additions and removals, and channel lifecycle events to enhance interactivity.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Handling Conversation Events in Bots

## Introduction

- Overview of conversation events in Microsoft Teams
- Importance of handling events for dynamic bot interactions

## Understanding ConversationUpdate Activities

- The role of `ConversationUpdate` activity type
- Differences between message activities and conversation events
- How Teams communicates conversation changes to bots

## Handling Member Added and Removed Events

- Detecting when members join or leave a conversation
  - Implementing `OnMembersAddedAsync`
  - Implementing `OnMembersRemovedAsync`
- Sending welcome messages to new users
  - Crafting effective welcome messages
  - Personalizing greetings based on user information
- Updating bot state based on membership changes
  - Managing user data and preferences
  - Cleaning up resources when users leave

## Managing Teams Channel and Team Events

- Channel lifecycle events
  - Handling channel creation (`OnTeamsChannelCreatedAsync`)
  - Handling channel updates and renames
  - Responding to channel deletion (`OnTeamsChannelDeletedAsync`)
- Team lifecycle events
  - Responding to team added or removed
  - Handling team renames and settings changes

## Responding to Other Conversation Events

- Message reactions
  - Handling `OnReactionAddedAsync` and `OnReactionRemovedAsync`
  - Using reactions to enhance user interaction
- Conversation properties updates
  - Detecting topic changes
  - Responding to metadata updates

## Implementing Activity Handlers for Events

- Overriding base activity handler methods
- Best practices for event handler implementation
- Asynchronous processing of events
- Example code snippets for common event handlers

## Best Practices for Event Handling

- Ensuring thread safety and avoiding race conditions
- Logging and monitoring conversation events
- Respecting user privacy and compliance considerations
- Scaling event handling for large teams and audiences

## Testing and Debugging Conversation Events

- Simulating events using the Bot Framework Emulator
- Testing in a controlled Teams environment
- Common issues and troubleshooting tips

## Summary

- Recap of key points
- The impact of event handling on user experience

## Next step

> [!div class="nextstepaction"]
> [Adding Authentication to Your Bot](../enhancing-capabilities/adding-authentication.md)

## See also

- [Understanding Bot Activity Handlers](../bot-fundamentals/understanding-bot-activity-handlers.md)
- [Proactive Messaging in Teams Bots](proactive-messaging.md)