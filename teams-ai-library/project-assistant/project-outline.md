# Project Assistant Bot

The goal is to create a Project Assistant Bot sample that showcases the capabilities of the teams AI library.

## Project Structure

Based on the samples analyzed, here's a recommended project outline:

1. Project Structure
```
/src
  /prompts
    /chat
      config.json      # AI model configuration
      skprompt.txt    # Prompt templates
  /cards              # Adaptive card templates
  /utils              # Utility functions
  index.ts           # Main entry point
  bot.ts             # Core bot logic
  responseFormatter.ts # Response handling
/lib                 # Compiled JavaScript output
/public              # Static files (if needed)
.env                 # Environment configuration
package.json         # Project dependencies
tsconfig.json        # TypeScript configuration
README.md           # Project documentation
```

2. Core Dependencies
- @microsoft/teams-ai (~1.5.0) - Main Teams AI SDK
- botbuilder (^4.23.1) - Bot Framework core
- restify (~11.1.0) - HTTP server
- openai (4.61.0) - OpenAI integration
- dotenv (^16.4.5) - Environment configuration

3. Development Dependencies
- typescript - For TypeScript support
- nodemon - Development watching
- eslint - Code linting
- prettier - Code formatting
- ts-node - TypeScript execution
- rimraf - Clean build
- env-cmd - Environment management

4. Environment Configuration (.env)
- BOT_ID
- BOT_PASSWORD
- OPENAI_KEY or AZURE_OPENAI_KEY
- AZURE_OPENAI_ENDPOINT (if using Azure)

5. Development Tools Required
- Visual Studio Code
- Teams Toolkit extension
- Node.js (v16 or higher)
- yarn or npm
- Git

6. Key Components to Implement
- TeamsAdapter configuration
- Error handling middleware
- State management (MemoryStorage)
- Prompt management
- Action planning
- Message handling
- Card generation
- Response formatting

7. Testing/Deployment Requirements
- Microsoft 365 Developer account
- Teams client access
- Local debugging setup
- Teams app manifest
- Azure deployment configuration (if needed)

8. Optional Components (based on needs)
- Authentication handling
- Message extension support
- Adaptive card interactions
- Data source integration
- Content moderation
- Streaming responses

This structure provides a foundation that can be customized based on specific requirements while maintaining consistency with Microsoft Teams development best practices.


## Program Pseudo Code

Define a bot called "Project Assistant Bot" for Microsoft Teams.

Section: Authentication and Initialization
    Attempt to sign in the user using Teams Single Sign-On (SSO).
    If that fails, display "Please authenticate to use the Project Assistant Bot."

    Include Microsoft Graph API with permissions for Planner, To Do, Calendar, and OneDrive access.

Section: Natural Language Understanding
    To interpret user commands, use AI-powered intent recognition.

    If the user says something like "Create a new task for the marketing campaign due next Friday",
        Interpret this command as "Create Task" and extract details such as task title "marketing campaign" and due date "next Friday".

    If the user says "Show my tasks" or similar,
        Interpret this as "View Tasks".

    If the user requests a meeting,
        Interpret this as "Schedule Meeting".

Section: Task Management Integration
    To create a task:
        Ask the user for task details such as title, due date, and priority, if not provided.
        Use Microsoft Planner to create the task with the specified details.
        Display a confirmation message with the task details in an Adaptive Card.

    To update a task:
        Ask the user for the task ID or title.
        Ask for the updated details such as new due date, status, or assignee.
        Update the task in Microsoft Planner with the new details.
        Display an updated Adaptive Card with the modified task information.

    To manage personal tasks:
        If the user wants a personal task,
            Use Microsoft To Do to create or update the task.
            Display a summary of the To Do list in an Adaptive Card format.

Section: Action Mapping and Chaining
    To handle complex workflows:
        If the user requests multiple actions in sequence, such as "Create a task and assign it to John",
            First, create the task as per user specifications.
            Then, assign it to the specified team member using their name or email.

    To set reminders:
        If the user requests a reminder for a task,
            Set a reminder and notify the user before the due date.
            Display a message confirming the reminder has been set.

Section: Team Collaboration
    To assign tasks and notify team members:
        When a task is assigned to a user, send a notification in the Teams channel.
        Display a message in the team chat indicating who has been assigned the task.

    To provide status updates:
        If the task status changes, notify the relevant team members of the update.
        Display a progress message within the Teams channel.

    To schedule a meeting:
        If the user requests a meeting for a specific task,
            Use the Calendar API to create a meeting invite.
            Invite the necessary team members.
            Display the meeting details in the Teams channel and provide a calendar link.

Section: Advanced Features
    To send proactive notifications:
        If a task deadline is approaching,
            Send a reminder message to the user.
            Display an alert in Teams with a link to view or update the task.

    To attach media:
        If the user wants to add an attachment to a task,
            Allow them to upload a file using OneDrive integration.
            Link the file to the task and display a message confirming the attachment.

    To provide analytics:
        If the user requests a project summary,
            Calculate the number of completed and pending tasks.
            Generate a report of project progress and display it as a chart or list in an Adaptive Card.

Section: Error Handling
    If an action fails, display a friendly error message indicating the issue.

    If a Microsoft Graph API call fails due to permissions, display "Please ensure appropriate permissions are granted."

Conclusion
    Display "Project Assistant Bot is ready to assist with project management tasks! Type a command to get started."
