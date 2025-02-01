---
title: Building Notification Bots
author: stevenic
description: Learn how to build notification bots in Microsoft Teams to send interactive notifications and handle user feedback effectively.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Building Notification Bots

## Introduction

- Overview of notification bots in Teams
- Benefits of using notification bots
- Common use cases and scenarios

## Understanding Notification Bots

- What are notification bots?
- Differences between notifications and proactive messages
- Key components of a notification bot

## Setting Up Your Notification Bot

- Prerequisites and initial setup
  - Development environment requirements
  - Necessary permissions and app registrations
- Configuring your bot for notifications
  - Updating the app manifest
  - Setting up credentials and endpoints

## Sending Notifications

- Crafting effective notification messages
  - Content guidelines and best practices
  - Using Adaptive Cards for rich notifications
- Implementing proactive messaging
  - Acquiring and using conversation references
  - Code examples for sending notifications

## Handling User Feedback and Interactions

- Capturing user responses to notifications
  - Processing inputs from Adaptive Cards
  - Updating bot state based on user actions
- Providing acknowledgments and follow-ups
  - Ensuring a responsive user experience
  - Managing notification threads

## Managing Notification Delivery

- Scheduling and triggering notifications
  - Event-driven notifications
  - Time-based notifications
- Managing notification queues and rate limits
  - Avoiding message throttling
  - Implementing retry policies

## Best Practices

- Personalizing notifications for better engagement
- Respecting user preferences and privacy
  - Providing opt-in and opt-out options
  - Adhering to compliance requirements
- Monitoring and logging notifications
  - Tracking delivery success and failures
  - Using analytics to improve performance

## Testing and Troubleshooting

- Testing notification functionality
  - Using the Bot Framework Emulator
  - Testing within Microsoft Teams
- Common issues and solutions
  - Handling errors and exceptions
  - Debugging tips for notification bots

## Next step

> [!div class="nextstepaction"]
> [Developing Workflow Bots](../advanced-features/developing-workflow-bots.md)

## See also

- [Proactive Messaging in Teams Bots](../conversations/proactive-messaging.md)
