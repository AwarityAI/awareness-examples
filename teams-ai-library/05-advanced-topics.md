# Advanced Topics

## Custom Planners and Augmentations

As your bot's functionality grows, you may find the need to implement custom planners and augmentations to tailor the AI's behavior to your application's specific requirements. Custom planners and augmentations allow you to extend the Teams AI library beyond its built-in capabilities, enabling more sophisticated interactions and actions.

### Developing Custom Planners

Custom planners are essential when you need to control how the AI system generates and executes plans based on user inputs and conversation context. By creating your own planner, you can incorporate custom logic, workflows, and integrate specialized AI models.

#### Creating a Custom Planner

To develop a custom planner, implement the `Planner` interface by defining the following methods:

- `beginTask(context, state)`: Initiates a new task based on the current context and state.
- `continueTask(context, state)`: Continues an existing task, managing multi-turn interactions.

These methods should return a `Plan` object, which includes an array of `PredictedCommand` objects. Each `PredictedCommand` represents an action the AI should perform.

#### Leveraging AI Models

Within your custom planner's methods, you can leverage Large Language Models (LLMs) or other AI models to generate plans dynamically. This allows your bot to interpret user inputs and decide on the appropriate sequence of actions based on complex logic or external data sources.

#### Example

```javascript
class CustomPlanner {
  async beginTask(context, state) {
    // Custom logic to generate a plan
    const plan = {
      commands: [/* PredictedCommand objects */]
    };
    return plan;
  }

  async continueTask(context, state) {
    // Logic for continuing an existing task
    const plan = {
      commands: [/* PredictedCommand objects */]
    };
    return plan;
  }
}
```

#### Integrating the Custom Planner

To use your custom planner, integrate it into your bot's AI configuration:

```javascript
const app = new Application({
  // ... other configurations
  aiOptions: {
    planner: new CustomPlanner(),
    // ... additional AI options
  }
});
```

### Creating and Integrating Custom Augmentations

Augmentations enhance your bot's AI capabilities by adding layers of functionality, context, and reasoning. Custom augmentations allow you to tailor how the AI model generates responses and handles complex tasks.

#### Implementing a Custom Augmentation

To create a custom augmentation, define a class that implements the `Augmentation` interface with the following methods:

- `createPromptSection(context, state)`: Appends custom instructions or context to the outgoing prompt.
- `validateResponse(response)`: Validates the model's response to ensure it meets expected formats and safety standards.
- `createPlanFromResponse(context, state, validatedResponse)`: Constructs a `Plan` based on the validated model response.

#### Example

```javascript
class CustomAugmentation {
  createPromptSection(context, state) {
    // Return a PromptSection with custom instructions
    return new PromptSection(/* custom configuration */);
  }

  validateResponse(response) {
    // Validate the response format and content
    if (/* response is valid */) {
      return validatedResponse;
    } else {
      throw new Error('Invalid response format');
    }
  }

  async createPlanFromResponse(context, state, validatedResponse) {
    // Generate a plan based on the validated response
    const plan = {
      commands: [/* PredictedCommand objects */]
    };
    return plan;
  }
}
```

#### Modifying the Prompt Manager

To integrate your custom augmentation, ensure the `PromptManager` recognizes it:

- Adjust the `appendAugmentations` method to process your new augmentation type.
- Register any new functions or data sources your augmentation relies on using the `PromptManager`.

#### Configuring the Augmentation in Prompt Templates

Specify your custom augmentation in the prompt template's configuration:

```json
{
  "template": {
    "config": {
      "augmentation": "CustomAugmentation"
    },
    // ... other configurations
  }
}
```

#### Integrating the Custom Augmentation

Incorporate your augmentation into the AI options when setting up your application:

```javascript
const app = new Application({
  // ... other configurations
  aiOptions: {
    augmentation: new CustomAugmentation(),
    // ... additional AI options
  }
});
```

### Best Practices

- **Validation and Safety**: Implement robust validation in your augmentations to ensure responses are appropriate and safe before execution.
- **Testing**: Write unit tests for your custom planners and augmentations to validate their behavior and catch potential issues early.
- **Compatibility**: Ensure that your custom components are compatible with the AI models you are using and adhere to their constraints.
- **Documentation**: Document your custom planners and augmentations thoroughly to aid in maintenance and collaboration.

### Summary

By developing custom planners and augmentations, you gain fine-grained control over your bot's AI behavior, allowing for highly customized interactions that align with your application's needs. Custom planners enable you to define how the bot interprets and responds to user inputs, while custom augmentations enhance the AI's capabilities, enabling more complex tasks and richer interactions.

## Semantic Functions

Semantic functions are specialized components in the Teams AI library that perform model-based processing or transformations on data. They enable your bot to handle complex tasks by applying AI models to user input or other data, returning the results as inputs or parameters for subsequent prompts. By leveraging semantic functions, you can create more dynamic and context-aware interactions within your bot, enhancing its ability to understand and respond to users effectively.

### Understanding Semantic Functions

At their core, semantic functions execute model calls to process or transform data. For example, a semantic function named `translator` might translate a user's input from any language into English before passing it to the main prompt for further processing. This allows your bot to handle multilingual inputs seamlessly and respond appropriately.

Key aspects of semantic functions include:

- **Data Transformation**: They modify or analyze input data to extract meaningful information.
- **Model Utilization**: They utilize AI models, such as language models or classifiers, to perform complex processing.
- **Chaining Prompts**: They enable chaining multiple prompts and functions together for advanced interaction flows.
- **Context Awareness**: They enhance the bot's understanding by applying contextual computations relevant to the conversation.

By integrating semantic functions, your bot can better interpret user intent, perform sophisticated tasks, and provide richer, more engaging experiences.

### Implementing Semantic Functions

Semantic functions can be implemented using various methods and components provided by the Teams AI library. One primary way to define semantic functions is through the `ActionPlanner` class.

#### Defining Semantic Functions with ActionPlanner

The `ActionPlanner` class allows you to add semantic functions using the `addSemanticFunction` method. Here's how you can define a semantic function:

```javascript
actionPlanner.addSemanticFunction('translator', {
  promptTemplate: 'Translate the following text to English: {userInput}',
  outputKey: 'translatedText',
  // Additional configuration options
});
```

In this example:

- **Function Name**: `'translator'` is the name used to reference the function.
- **Prompt Template**: The template instructs the AI model on what task to perform.
- **Output Key**: `'translatedText'` is where the function's output will be stored for later use.

#### Using Semantic Functions in Plans

Once defined, these functions can be incorporated into the bot's planning process. When the bot constructs a plan to respond to a user's input, it can invoke these semantic functions to process data as needed.

#### Example Usage

Suppose you want your bot to first analyze user input for sentiment before generating a response:

```javascript
actionPlanner.addSemanticFunction('sentimentAnalysis', {
  promptTemplate: 'Analyze the sentiment of the following text: {userInput}',
  outputKey: 'sentiment',
});

// Later in your plan
const plan = {
  commands: [
    { type: 'function', name: 'sentimentAnalysis' },
    // Additional commands based on the sentiment
  ],
};
```

### Registering Semantic Functions with PromptManager

The `PromptManager` class manages prompt templates and functions within your application. By registering semantic functions with `PromptManager`, you can efficiently organize and reuse them.

```javascript
promptManager.addFunction('translator', translatorFunction);
promptManager.addFunction('sentimentAnalysis', sentimentAnalysisFunction);
```

Benefits of using `PromptManager` include:

- **Centralized Management**: Keep all prompts and functions in one place.
- **Compatibility with Templates**: Seamlessly integrate functions into prompt templates.
- **Reusability**: Easily reuse functions across different parts of your bot.

### Using Semantic Functions in Prompt Templates

Semantic functions can be incorporated directly into your prompt templates, especially if you're using templates compatible with Microsoft's Semantic Kernel SDK.

**Example Prompt Template with Semantic Function**:

```json
{
  "template": {
    "sections": [
      {
        "type": "function",
        "name": "translator",
        "args": {
          "input": "{userInput}"
        }
      },
      {
        "type": "text",
        "content": "Translated input: {translatedText}"
      },
      {
        "type": "function",
        "name": "generateResponse",
        "args": {
          "input": "{translatedText}"
        }
      },
      {
        "type": "text",
        "content": "Bot Response: {botResponse}"
      }
    ]
  }
}
```

In this template:

- The `translator` function processes the user's input.
- The result is stored in `{translatedText}`.
- The `generateResponse` function creates a response based on the translated text.
- The final bot response is displayed using `{botResponse}`.

### Enhancing AI Responses with Semantic Functions

By utilizing semantic functions, you can significantly enhance your bot's AI responses:

- **Contextual Understanding**: Functions like `translator` or `sentimentAnalysis` provide deeper insights into user input.
- **Dynamic Responses**: Generate responses that adapt to the processed input, such as adjusting tone based on sentiment.
- **Complex Task Handling**: Perform multi-step operations within a single interaction, improving efficiency.

### Best Practices

When working with semantic functions:

- **Robust Error Handling**: Implement validation to handle unexpected inputs or model errors gracefully.
- **Performance Considerations**: Be mindful of the additional processing time model calls may introduce.
- **Security Measures**: Ensure inputs and outputs are properly sanitized to prevent injection attacks or leakage of sensitive information.
- **Modularity**: Keep functions focused on single responsibilities for easier maintenance and testing.

### Summary

Semantic functions are powerful tools in the Teams AI library that allow you to extend your bot's capabilities by leveraging AI models to process and transform data. By implementing semantic functions, you can create more nuanced and intelligent interactions, providing users with a richer conversational experience. Integrating these functions into your bot involves defining them within classes like `ActionPlanner`, registering them with `PromptManager`, and utilizing them in your prompt templates. Adhering to best practices ensures that your bot remains robust, efficient, and secure while delivering advanced functionalities.

## Error Handling and Logging

Effective error handling and logging are critical components of developing reliable and robust bots using the Teams AI library. Proper error management ensures that your application can gracefully handle unexpected situations, provide meaningful feedback to users and developers, and maintain the integrity of the application state. Logging and debugging techniques enhance observability, making it easier to monitor performance, diagnose issues, and improve your bot over time.

### Implementing Robust Error Handling

Implementing robust error handling involves several best practices:

#### Input Validation and Precondition Checks

- **Validate Inputs**: Always validate the inputs to your functions and methods. Check for missing or invalid parameters, required data, and ensure that inputs conform to expected formats before proceeding. This helps prevent errors from propagating through your application.

#### Structured Exception Handling

- **Use Try-Catch Blocks**: Wrap code that may throw exceptions in `try-catch` blocks to handle exceptions gracefully without crashing the application.
- **Specific Exception Handling**: Catch specific exceptions when possible and handle them appropriately. This allows for more precise error management.

#### Centralized Error Handling

- **Global Error Handlers**: Use centralized error handling mechanisms, such as an `onTurnError` handler in your bot, to catch unhandled exceptions throughout the application.

  ```javascript
  // Example of setting up an onTurnError handler
  app.adapter.onTurnError = async (context, error) => {
    // Log the error
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    // Send a message to the user
    await context.sendActivity('Oops! Something went wrong.');
    // Additional error handling logic...
  };
  ```

#### User-Friendly Error Messages

- **Inform the User**: When errors occur, provide clear and user-friendly messages to the users. Let them know that an error occurred and, if appropriate, guide them on how to proceed.

  ```javascript
  await context.sendActivity('Sorry, I didn\'t understand that request. Please try again.');
  ```

#### Ensuring Application State Consistency

- **Maintain State Integrity**: Ensure that the application's state remains consistent even when errors occur. For example, clean up authentication states or tokens during sign-out processes or when authentication fails.

#### Graceful Degradation and Recovery

- **Fallback Options**: Provide fallback options when certain features fail, allowing the application to continue operating with reduced functionality rather than failing completely.

#### Validation and Feedback Loops for AI Responses

- **Validate AI Outputs**: Use validators to ensure that responses from AI models conform to expected schemas and formats before processing them. This helps manage cases where the AI's response is invalid or incomplete.

  ```javascript
  // Example of validating AI response
  if (isValidResponse(aiResponse)) {
    // Process the response
  } else {
    // Handle invalid response
    await context.sendActivity('I\'m having trouble processing that request.');
  }
  ```

#### Structured Error Responses

- **Error Information**: Include status codes or properties in error responses (e.g., `error`, `rate_limited`, `invalid_response`) to indicate the type of error. This aids in debugging and allows for appropriate handling of different error types.

### Logging and Debugging Techniques

Effective logging and debugging are essential for monitoring your bot's performance and diagnosing issues.

#### Meaningful Error Logging

- **Detailed Logs**: Use logging mechanisms to record errors with sufficient detail, including error messages, stack traces, and context information.
- **Separate Logging Levels**: Utilize different logging levels (e.g., `error`, `warn`, `info`, `debug`) to categorize logs and control what is recorded based on the environment and configuration.

#### Utilizing Logging Mechanisms

- **Console Logging**: During development, logging to the console can be helpful for quick feedback.
- **Centralized Logging Services**: In production, consider logging to a centralized logging service like Azure Application Insights for better monitoring and analysis.

#### Using Colorized Console Output

- **Enhance Readability**: Utilize colorized output in your console logs to enhance readability.

  ```javascript
  const chalk = require('chalk');

  console.error(chalk.red('[Error] An error occurred.'));
  console.warn(chalk.yellow('[Warning] This is a warning.'));
  console.log(chalk.green('[Info] Application started successfully.'));
  ```

#### Configurable Logging Levels

- **Environment Variables**: Manage environment variables for configurable logging. Use tools like `dotenv` or `env-cmd` to configure logging levels and debugging settings based on the environment (development, testing, production).

  ```javascript
  // Example using dotenv
  require('dotenv').config();

  const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
  ```

#### Monitoring and Logging AI Responses

- **Log AI Interactions**: Monitor and log AI responses and repair attempts. Enabling options like `logRepairs` in planners such as `ActionPlanner` and `LLMClient` provides insight into how the AI is processing and correcting inputs, which is valuable for debugging complex interactions.

  ```javascript
  const planner = new ActionPlanner({
    // ... other configurations
    logRepairs: true,
  });
  ```

#### Using Application Insights

- **Advanced Monitoring**: Use Application Insights to log errors and telemetry data in production environments. This provides advanced monitoring capabilities, helping you detect, diagnose, and resolve issues that occur in live applications.

  ```javascript
  const appInsights = require('applicationinsights');
  appInsights.setup('<INSTRUMENTATION_KEY>').start();
  const client = appInsights.defaultClient;

  client.trackException({ exception: error });
  ```

#### Continuous Monitoring and Improvement

- **Review Logs Regularly**: Regularly review error logs to identify patterns or recurring issues that need to be addressed.
- **Performance Metrics**: Monitor performance metrics to identify bottlenecks or areas for optimization.

### Summary

By implementing robust error handling and utilizing effective logging and debugging techniques, you can enhance the reliability and maintainability of your bot built with the Teams AI library. Proper error handling ensures that your bot can gracefully manage unexpected situations, providing users with a smooth experience even when issues arise. Comprehensive logging facilitates quicker diagnosis and resolution of problems, contributing to ongoing improvements and the overall success of your application.

## Testing and Debugging

Developing reliable and robust bots with the Teams AI library necessitates thorough testing and debugging to ensure that all components function correctly under various conditions. This section covers essential tools and best practices for testing and debugging your bot effectively.

### Using Test Adapters and Test Models

**Test adapters** and **test models** are critical tools that provide a controlled environment to simulate interactions with your bot. They enable you to validate the bot's behavior without deploying it to a live setting or relying on external services.

#### Test Adapters

Test adapters simulate the behavior of the bot framework adapter, allowing you to:

- **Simulate User Interactions**: Send messages to your bot and receive responses as if in a real conversation.
- **Control the Environment**: Create specific scenarios to test how your bot handles different types of inputs and activities.
- **Repeatable Tests**: Run tests consistently without external factors affecting the outcomes.

**Example Usage**:

```javascript
const { TestAdapter } = require('botbuilder-core');
const { Application } = require('teams-ai');

const botLogic = async (context) => {
  // Your bot's logic here
};

const adapter = new TestAdapter(botLogic);

// Simulate sending a message to the bot
adapter.send('Hello')
  .assertReply('Hello! How can I assist you today?');
```

#### Test Models

Test models provide mock implementations of internal components, such as state management and prompt handling. They allow you to:

- **Simulate Conversation State**: Manipulate and inspect the state during tests.
- **Isolate AI Components**: Test the bot's logic without invoking actual AI services.
- **Improve Test Reliability**: Ensure tests are not affected by network issues or service availability.

### Writing Unit Tests for Bots and Components

Unit tests verify that individual components of your bot function correctly. Writing comprehensive unit tests involves:

- **Covering Various Scenarios**: Test normal operations, edge cases, error conditions, and different user interactions.
- **Using Testing Frameworks**: Employ frameworks like **Mocha** or **Jest** for structuring tests and **Chai** for assertions.
- **Handling Asynchronous Code**: Utilize `async/await` to ensure tests wait for asynchronous operations to complete.
- **Isolating Tests**: Use `beforeEach` and `afterEach` hooks to set up and tear down any shared resources, ensuring tests do not interfere with each other.

**Example Unit Test**:

```javascript
const { expect } = require('chai');
const { TestAdapter } = require('botbuilder-core');

describe('EchoBot Tests', () => {
  let adapter;

  beforeEach(() => {
    adapter = new TestAdapter(async (context) => {
      const text = context.activity.text;
      await context.sendActivity(`Echo: ${text}`);
    });
  });

  it('should echo back the user message', async () => {
    await adapter.send('Test message')
      .assertReply('Echo: Test message');
  });
});
```

### Mocking and Stubbing in Tests

Mocking and stubbing are techniques used to simulate the behavior of complex, real objects to test components in isolation.

- **Mocking**: Creating fake objects or functions that imitate the behavior of real ones.
- **Stubbing**: Replacing methods or functions with predefined behavior for testing purposes.

Using libraries like **Sinon.js**, you can:

- **Mock External Services**: Simulate API responses without making actual network calls.
- **Control Function Outputs**: Define what functions return to test different outcomes.
- **Test Error Handling**: Force functions to throw exceptions to verify your bot's resilience.

**Example of Mocking an External Service**:

```javascript
const sinon = require('sinon');
const myService = require('../services/myService');

describe('Bot Service Interaction', () => {
  beforeEach(() => {
    sinon.stub(myService, 'fetchData').resolves({ data: 'Mocked Data' });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should handle service response correctly', async () => {
    // Test logic that uses myService.fetchData
  });
});
```

### Best Practices for Testing

- **Write Independent Tests**: Ensure each test can run independently and does not rely on shared state.
- **Cover All Code Paths**: Include tests for both expected behavior and error conditions.
- **Use Assertions Effectively**: Verify that methods return expected values, and functions are called with correct arguments.
- **Document Testing Strategies**: Keep clear documentation on how to run tests, testing strategies, and any known issues.
- **Integrate with CI/CD**: Incorporate tests into continuous integration pipelines for automated testing on code changes.

### Debugging Techniques

Effective debugging allows you to identify and resolve issues quickly.

#### Bot Framework Emulator

- **Visual Debugging**: Use the Bot Framework Emulator to interact with your bot locally, inspect messages, and monitor activities.
- **State Inspection**: View and manipulate the conversation state during testing.

#### Console Logging and Spying

- **Logging**: Implement logging throughout your bot to trace execution flow and capture errors.
- **Console Spying**: In tests, spy on console methods to ensure logging methods are called appropriately.

**Example Using Sinon to Spy on `console.error`**:

```javascript
const sinon = require('sinon');

describe('Error Logging', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = sinon.spy(console, 'error');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should log an error when exception occurs', async () => {
    // Trigger error in bot logic
    expect(consoleErrorSpy.calledOnce).to.be.true;
  });
});
```

#### Node.js Debugging Flags

- **Inspect Mode**: Run your bot with `--inspect` or `--inspect-brk` flags to attach a debugger.
- **Breakpoints**: Set breakpoints to pause execution and inspect variables and application flow.

**Example**:

```bash
node --inspect-brk index.js
```

#### Environment Variables

- **Configure Logging Levels**: Use environment variables to control the verbosity of logs.
- **Toggle Features**: Enable or disable features (like detailed error messages) during debugging sessions.

### Additional Tips

- **Fast Feedback Loop**: Keep tests fast to encourage frequent execution during development.
- **Simulate Various Scenarios**: Use test adapters to mimic different user behaviors, including invalid inputs and edge cases.
- **Mock External Dependencies**: When interacting with services like content moderation or AI models, mock these to avoid external dependencies in tests.
- **Test State Management**: Verify that your bot correctly sets, gets, and deletes state properties across interactions.

### Conclusion

Thorough testing and debugging are integral to developing high-quality bots with the Teams AI library. By utilizing test adapters, writing comprehensive unit tests, and employing mocking and stubbing techniques, you can ensure your bot is robust, reliable, and ready for real-world interactions. Incorporating these practices into your development workflow will lead to smoother deployments and a better experience for your users.
