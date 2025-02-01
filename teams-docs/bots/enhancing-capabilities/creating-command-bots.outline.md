---
title: Creating Command Bots in Teams
author: stevenic
description: Learn how to create command bots in Microsoft Teams by setting up a command menu and handling commands in your bot code.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Creating Command Bots in Teams

## Introduction

- Overview of command bots in Teams
- Advantages of using command bots
- Typical use cases and scenarios

## Understanding Command Bots

- What are command bots?
- User interactions with command bots
- Differences between command bots and traditional bots

## Designing Your Command Menu

- Identifying useful commands for your bot
- Best practices for command naming conventions
- Organizing commands for ease of use
- Providing command descriptions and usage hints

## Configuring the Teams App Manifest

- Adding commands to the `commandLists` section
  - Syntax and structure of the command list
  - Defining command titles and descriptions
- Setting the scope for commands (`personal`, `team`, `groupChat`)
- Example of a command menu configuration

## Implementing Command Handling in Your Bot Code

- Parsing incoming command messages
  - Detecting command triggers
  - Extracting command parameters and arguments
- Mapping commands to bot actions
  - Creating command handler functions
  - Structuring your code for scalability
- Sending responses based on commands
  - Crafting appropriate replies
  - Using rich messages and Adaptive Cards if necessary

## Providing Help and Guidance to Users

- Implementing a help command
  - Listing available commands and their descriptions
- Responding to unrecognized commands
  - Handling errors gracefully
  - Suggesting correct command usage

## Testing and Debugging Command Bots

- Testing commands within Microsoft Teams
  - Personal chats vs. team channels
- Common issues and how to resolve them
  - Command recognition problems
  - Permission and scope-related errors
- Tools and techniques for effective debugging

## Best Practices for Command Bots

- Enhancing user experience
  - Keeping commands simple and intuitive
  - Providing clear feedback and confirmations
- Accessibility considerations
  - Ensuring commands are accessible to all users
- Maintaining and updating command lists
  - Versioning and backward compatibility

## Next step

> [!div class="nextstepaction"]
> [Building Notification Bots](building-notification-bots.md)

## See also

- [Formatting Your Bot Messages](../bot-fundamentals/formatting-your-bot-messages.md)