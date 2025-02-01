---
title: Developing Calls and Meetings Bots
author: stevenic
description: Learn how to develop calls and meetings bots for Microsoft Teams, including registration, handling notifications, and working with real-time media.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Developing Calls and Meetings Bots

## Introduction

- Overview of the development process for calls and meetings bots
- Key components and capabilities of calls and meetings bots
- Prerequisites and necessary tools

## Setting Up Your Calling Bot

- **Registering the Bot in Azure**
  - Creating a Bot Channels Registration with calling enabled
  - Configuring bot endpoint URLs for calling and media
- **Configuring Microsoft Entra ID (Azure AD)**
  - Setting up app registration for authentication
  - Assigning permissions and consent
- **Updating the Teams App Manifest**
  - Enabling calling and meeting capabilities
  - Specifying required permissions and scopes

## Handling Call Notifications

- Understanding call signaling and workflow in Teams
- Implementing the `/callback` endpoint
  - Receiving incoming call notifications
  - Processing call-related events
- Managing call lifecycle events
  - Calls started, ended, and updated
  - Participants added and removed

## Working with Real-Time Media

- **Real-Time Media Concepts**
  - Overview of media streams and modalities
  - Supported audio and video formats
- **Media Processing in Bots**
  - Accessing media streams
  - Injecting and extracting media content
- **Media SDKs and APIs**
  - Using Microsoft Graph Communications API
  - Integrating with Azure Communication Services

## Implementing Call Controls

- Managing calls programmatically
  - Answering and rejecting calls
  - Transferring and redirecting calls
- Controlling media sessions
  - Muting and unmuting participants
  - Starting and stopping video streams
- Handling DTMF signals and IVR scenarios

## Developing Meeting Bots

- **Joining and Participating in Meetings**
  - Proactively joining scheduled meetings
  - Joining meetings upon user request
- **Interacting Within Meetings**
  - Accessing meeting context and metadata
  - Sharing content and interacting with participants
- **Meeting-Specific Events**
  - Handling meeting start and end events
  - Monitoring participant activity

## Recording and Transcription

- Enabling recording capabilities
  - Initiating and controlling recordings
  - Storage and access of recorded content
- Implementing transcription services
  - Real-time transcription during calls and meetings
  - Utilizing speech-to-text APIs

## Security and Compliance

- **Authentication and Authorization**
  - Ensuring secure access to calls and meetings
  - Implementing token validation and renewal
- **Data Protection**
  - Handling sensitive information responsibly
  - Compliance with organizational policies and regulations
- **Privacy Considerations**
  - Informing users about bot capabilities
  - Obtaining necessary consents

## Best Practices

- Designing for scalability and performance
  - Managing resource utilization
  - Optimizing media processing
- Enhancing user experience
  - Providing clear prompts and feedback
  - Ensuring seamless interactions
- Monitoring and analytics
  - Tracking bot performance
  - Logging and diagnosing issues

## Next step

> [!div class="nextstepaction"]
> [Testing and Debugging Calls and Meetings Bots](testing-and-debugging-calls-and-meetings-bots.md)

## See also

- [Overview of Calls and Meetings Bots](overview-of-calls-and-meetings-bots.md)
- [Requirements and Considerations for Calls and Meetings Bots](requirements-and-considerations.md)