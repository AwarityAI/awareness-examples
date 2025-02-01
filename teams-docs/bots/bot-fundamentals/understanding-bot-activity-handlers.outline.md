---
title: Understanding Bot Activity Handlers
author: stevenic
description: Learn how bot activity handlers work in Microsoft Teams and how to implement them to manage various user interactions effectively.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Understanding Bot Activity Handlers

## Introduction

- Overview of bot activities in the Bot Framework
- Importance of activity handlers in bot development
- How activity handlers process user interactions

## The Bot Framework Activity Model

- Understanding the activity object
  - Activity types and their purposes
- The activity processing pipeline
  - From incoming requests to responses

## Implementing Core Activity Handlers

- Utilizing the base activity handler class
- Handling message activities
  - `OnMessageActivityAsync` method
  - Processing user messages and generating responses
- Handling conversation lifecycle events
  - `OnMembersAddedAsync` and `OnMembersRemovedAsync`
  - Welcoming users and managing participant lists
- Other common activity handlers
  - Typing indicators with `OnTypingActivityAsync`
  - Handling message reactions with `OnMessageReactionAsync`

## Teams-Specific Activity Handlers

- Extending activity handlers for Teams features
  - Inheriting from Teams activity handler classes
- Handling channel events
  - `OnTeamsChannelCreatedAsync`, `OnTeamsChannelDeletedAsync`
  - Managing channel additions and deletions
- Responding to team events
  - `OnTeamsTeamRenamedAsync`
  - Handling team name changes and updates
- Processing file uploads and card actions
  - Managing additional Teams interactions

## Customizing Activity Handling

- Overriding default methods for custom behavior
- Implementing multiple handlers for complex scenarios
- Best practices for extending activity handlers

## Error Handling and Logging

- Strategies for handling exceptions within handlers
- Logging activities for monitoring and debugging
- Ensuring reliability and robustness in your bot

## Best Practices

- Organizing your code for maintainability
- Performance considerations when handling activities
- Security implications and data validation

## Next step

> [!div class="nextstepaction"]
> [Conversation Basics](conversation-basics.md)

## See also

- [Formatting Your Bot Messages](formatting-your-bot-messages.md)
- [Creating Your First Bot](../getting-started/creating-your-first-bot.md)