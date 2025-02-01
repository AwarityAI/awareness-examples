---
title: Updating and Deleting Bot Messages
author: stevenic
description: Learn how to update and delete messages sent by your Microsoft Teams bot, including editing messages and properly handling message deletions.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Updating and Deleting Bot Messages

## Introduction

- Importance of managing bot messages after they are sent
- Scenarios where updating or deleting messages is necessary
- Overview of capabilities and limitations in Microsoft Teams

## Updating Sent Messages

### Understanding Message Updates

- How message editing works in Teams
- Permissions required for bots to update messages
- Limitations on which messages can be updated and when

### Implementing Message Updates in Your Bot

- Identifying the message to update
  - Using activity IDs and conversation references
- Using the Bot Framework SDK to update messages
  - Methods and properties for editing messages
  - Code examples in C#, JavaScript/TypeScript, or Python
- Updating Adaptive Cards and rich content
  - Modifying card content dynamically
  - Handling user input and response actions

### Best Practices for Updating Messages

- Providing visual indicators of edits (e.g., "edited" label)
- Maintaining context and conversation flow
- Avoiding frequent or unnecessary updates to prevent confusion

## Deleting Messages

### Understanding Message Deletion

- Rules and policies governing message deletion in Teams
- Differences between deleting bot messages and user messages
- Compliance and auditing considerations

### Implementing Message Deletion in Your Bot

- Determining if a message can be deleted
- Using the Bot Framework SDK to delete messages
  - Relevant methods and properties
  - Code examples demonstrating deletion
- Handling errors and exceptions
  - Responding to permission issues or failures

### Considerations for Deleting Messages

- Impact on conversation history and user experience
- Communicating deletions to users if appropriate
- Alternative approaches to deletion (e.g., editing content)

## Testing Message Updates and Deletions

- Strategies for testing in development environments
  - Using the Bot Framework Emulator limitations
- Testing within Microsoft Teams
  - Sideloading the bot and conducting real-world tests
- Debugging common issues
  - Troubleshooting failed updates or deletions
  - Monitoring API responses and error codes

## Best Practices

- Ensuring accessibility and inclusivity in updates and deletions
- Respecting user privacy and organizational policies
- Documenting changes for auditing purposes
- Planning for localization and internationalization

## Next step

> [!div class="nextstepaction"]
> [Publishing Your Bot to Microsoft Teams](publishing-your-bot-to-teams.md)

## See also

- [Deploying Your Bot](deploying-your-bot.md)
- [Bot Development Best Practices and Guidelines](../additional-resources/best-practices.md)