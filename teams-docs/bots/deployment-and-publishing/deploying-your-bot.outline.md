---
title: Deploying Your Bot
author: stevenic
description: Learn how to deploy your Microsoft Teams bot to Azure, set up continuous integration and continuous deployment (CI/CD), and manage updates.
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: stevenic
ms.date: 11/27/2024
---

# Deploying Your Bot

## Introduction

- Importance of deploying your bot for accessibility
- Overview of the deployment process
- Preparation steps before deployment

## Deploying to Azure

- **Choosing a Hosting Option**
  - Azure App Service
  - Azure Functions
  - Azure Kubernetes Service (AKS)
  - Factors to consider when selecting a hosting environment
- **Preparing Your Bot for Deployment**
  - Configuring production settings
  - Managing environment variables and secrets
  - Optimizing your bot for the cloud environment
- **Deploying Your Bot Application**
  - Step-by-step guide for deploying to Azure App Service
    - Creating a new App Service instance
    - Deploying your code using Git, ZIP deploy, or CI/CD pipelines
  - Configuring application settings in Azure
  - Verifying the deployment and functionality
- **Updating the Bot Registration**
  - Setting the correct messaging endpoint in Azure Bot Service
  - Testing connectivity between Azure Bot Service and your deployed bot

## Setting Up Continuous Integration and Continuous Deployment (CI/CD)

- **Benefits of CI/CD in Bot Development**
  - Automating the deployment process
  - Reducing errors and improving efficiency
- **Using Azure DevOps for CI/CD**
  - Creating build and release pipelines
  - Integrating with your code repository (GitHub, Azure Repos)
  - Configuring automatic deployments upon code changes
- **Alternative CI/CD Tools**
  - GitHub Actions
  - Jenkins
  - Choosing the right tool for your team

## Managing Updates and Maintenance

- **Updating Your Bot Application**
  - Deploying updates without downtime
  - Rolling back changes if necessary
- **Scaling Your Bot**
  - Configuring auto-scaling in Azure
  - Handling increased user load effectively
- **Monitoring and Logging**
  - Implementing Application Insights
  - Tracking performance metrics and errors
  - Setting up alerts for critical issues

## Security and Compliance Considerations

- **Protecting Secrets and Credentials**
  - Using Azure Key Vault for secure storage
  - Avoiding hard-coded secrets in code repositories
- **Securing Network Access**
  - Enabling HTTPS for your bot's endpoints
  - Configuring firewalls and access restrictions
- **Compliance with Policies and Regulations**
  - Understanding data residency and compliance requirements
  - Ensuring adherence to organizational security policies

## Best Practices for Deployment

- **Testing Before Deployment**
  - Performing thorough testing in a staging environment
  - Using deployment slots for safe updates
- **Optimizing Performance**
  - Implementing caching strategies
  - Monitoring resource utilization
- **Documentation and Team Collaboration**
  - Keeping deployment procedures documented
  - Training team members on deployment processes

## Next step

> [!div class="nextstepaction"]
> [Updating and Deleting Bot Messages](updating-and-deleting-bot-messages.md)

## See also

- [Publishing Your Bot to Microsoft Teams](publishing-your-bot-to-teams.md)
- [Bot Development Best Practices and Guidelines](../additional-resources/best-practices.md)