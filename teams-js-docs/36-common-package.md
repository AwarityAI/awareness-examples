# 3.6 Common Package

## Overview

The Common Package is a foundational component of the Teams SDK that provides essential utilities and services shared across various parts of the SDK. It includes core functionalities such as event handling, logging, and storage mechanisms, which are crucial for building robust and scalable applications on the Microsoft Teams platform.

### Purpose

The primary purpose of the Common Package is to offer developers a set of standardized tools and interfaces that simplify common tasks in application development. By utilizing these shared components, developers can ensure consistency, reduce code duplication, and focus on implementing the unique features of their applications.

### Key Features and Capabilities

- **Event Management with EventEmitter**: A flexible and type-safe event handling system that allows for emitting and listening to custom events within the application.
- **Logging Interface**: A configurable logging mechanism that supports multiple log levels and outputs, enabling developers to monitor and debug their applications effectively.
- **Storage Solutions**: Provides storage interfaces and implementations like `LocalStorage` for data persistence, allowing applications to store and retrieve data efficiently.

[Placeholder for diagrams illustrating the architecture of the Common Package and its components.]

## Events

The Common Package provides an `EventEmitter` class, which is essential for managing events within your application. It allows you to create, emit, and listen for custom events, facilitating communication between different components of your application in a decoupled and efficient manner.

### Using the `EventEmitter` Class for Event Management

The `EventEmitter` class is designed to be flexible and type-safe. By defining the types of events your application can handle, you can ensure that event data is consistent and that handlers receive the correct data types.

Key features of the `EventEmitter` class include:

- **Type Safety**: Define a custom interface for your events to enforce type safety across your application.
- **Event Registration**: Register event handlers using the `on` and `once` methods.
- **Event Emission**: Emit events with associated data using the `emit` method.
- **Event Removal**: Remove event handlers using the `off` method.

### Custom Event Handling

Custom event handling allows you to define and manage events specific to your application's logic. This is particularly useful in larger applications where components need to communicate without being tightly coupled.

#### Example

Below is an example of how to use the `EventEmitter` class for custom event handling:

```typescript
import { EventEmitter } from '@teams.sdk/common/events';

// Define the event types
interface MyEvents {
  userJoined: { userId: string; userName: string };
  messageReceived: { userId: string; message: string };
}

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter<MyEvents>();

// Listen for the 'userJoined' event
const userJoinedListenerId = eventEmitter.on('userJoined', (data) => {
  console.log(`User joined: ${data.userName} (ID: ${data.userId})`);
});

// Emit the 'userJoined' event
eventEmitter.emit('userJoined', { userId: '123', userName: 'Alice' });

// Listen for the 'messageReceived' event
eventEmitter.on('messageReceived', (data) => {
  console.log(`Message from ${data.userId}: ${data.message}`);
});

// Emit the 'messageReceived' event
eventEmitter.emit('messageReceived', { userId: '123', message: 'Hello, world!' });

// Remove the 'userJoined' listener
eventEmitter.off(userJoinedListenerId);
```

In this example:

- **Event Types Definition**: The `MyEvents` interface defines the structure of the events `userJoined` and `messageReceived`.
- **EventEmitter Instance**: An `EventEmitter` instance is created with the `MyEvents` type.
- **Registering Event Handlers**: The `on` method is used to register handlers for specific events.
- **Emitting Events**: The `emit` method triggers the events, passing in the required data.
- **Removing Event Handlers**: The `off` method removes a previously registered event handler using its identifier.

[Placeholder for diagrams or additional explanations about event flow and handling.]

---

## Logging

Effective logging is crucial for monitoring, debugging, and maintaining applications. The Common Package offers a `Logger` interface and a default implementation called `ConsoleLogger`. This logging system provides configurable log levels and structured outputs, allowing you to capture important information about your application's behavior.

### Implementing Logging with the `Logger` Interface

The `Logger` interface defines a standardized way to handle logging across your application. It includes methods for different log levels:

- `error(...)`: Critical issues that require immediate attention.
- `warn(...)`: Potential problems or important notices.
- `info(...)`: General informational messages about application progress.
- `debug(...)`: Detailed diagnostic information for debugging purposes.
- `log(level, ...)`: Generic logging method where you specify the log level.
- `child(name)`: Creates a child logger with an inherited configuration, useful for contextual logging within modules or components.

By implementing this interface, you can create custom loggers or use the provided `ConsoleLogger` for straightforward console logging.

#### Example of the `Logger` Interface

```typescript
export interface Logger {
  /**
   * Output debug message.
   * @param msg Any data to log.
   */
  debug(...msg: any[]): void;

  /**
   * Output info message.
   * @param msg Any data to log.
   */
  info(...msg: any[]): void;

  /**
   * Output warn message.
   * @param msg Any data to log.
   */
  warn(...msg: any[]): void;

  /**
   * Output error message.
   * @param msg Any data to log.
   */
  error(...msg: any[]): void;

  /**
   * Output log message with a specified level.
   * @param level The log level (e.g., 'info', 'error').
   * @param msg Any data to log.
   */
  log(level: LogLevel, ...msg: any[]): void;

  /**
   * Create a child logger instance with a contextual name.
   * @param name The name of the child logger.
   */
  child(name: string): Logger;
}
```

### Configuring Log Levels and Outputs

The logging system allows you to configure the verbosity of logs through log levels:

- **Levels**: `'error'`, `'warn'`, `'info'`, `'debug'`.
- **Default Level**: `'info'`.

You can set the desired log level when initializing the logger. Messages with a level equal to or higher than the configured level will be logged.

#### Using the `ConsoleLogger`

The `ConsoleLogger` is the default implementation that outputs logs to the console. It respects the log level configuration and supports creating child loggers for more granular control.

```typescript
import { ConsoleLogger } from '@teams.sdk/common/logging';

// Create a logger with the default 'info' level
const logger = new ConsoleLogger('MyApp');

// Log messages at various levels
logger.info('Application started');
logger.debug('This debug message will not appear at the default level');

// Create a logger with 'debug' level
const debugLogger = new ConsoleLogger('MyApp', { level: 'debug' });
debugLogger.debug('This debug message will appear');

// Create a child logger for a specific module
const authLogger = logger.child('AuthModule');
authLogger.info('User authentication successful');
```

### Logging Implementation Example

Below is an example of how to implement application-wide logging using the `Logger` interface and the `ConsoleLogger`.

```typescript
import { Logger, ConsoleLogger } from '@teams.sdk/common/logging';

// Initialize the main application logger
const logger = new ConsoleLogger('MainApp', { level: 'info' });

// Log informational messages
logger.info('Main application initialized.');

// Log warnings and errors
logger.warn('This is a warning message.');
logger.error('An error occurred.');

// Conditional debugging
if (process.env.DEBUG) {
  const debugLogger = new ConsoleLogger('MainApp', { level: 'debug' });
  debugLogger.debug('Debugging is enabled.');
}

// Using a child logger for a module
const databaseLogger = logger.child('DatabaseModule');
databaseLogger.info('Database connection established.');
databaseLogger.error('Database query failed.');

// Custom logger implementation (if needed)
const customLogger: Logger = {
  debug: (...msg) => {
    /* Custom debug implementation */
  },
  info: (...msg) => {
    /* Custom info implementation */
  },
  warn: (...msg) => {
    /* Custom warn implementation */
  },
  error: (...msg) => {
    /* Custom error implementation */
  },
  log: (level, ...msg) => {
    /* Custom log implementation based on level */
  },
  child: (name) => {
    /* Return a new logger instance with the given name */
    return customLogger;
  },
};
```

In this example:

- **Initializing the Logger**: The `ConsoleLogger` is initialized with a name and an optional log level.
- **Logging Messages**: Various levels of messages are logged using the corresponding methods.
- **Child Loggers**: A child logger is created for the `"DatabaseModule"`, which helps in segregating logs by components.
- **Custom Logger**: Shows how you might implement your own logger if the default does not suit your needs.

### Best Practices for Logging

- **Set Appropriate Log Levels**: Use the log level that corresponds to the severity of the message.
- **Use Child Loggers**: Create child loggers for different modules to organize logs effectively.
- **Avoid Logging Sensitive Information**: Ensure that logs do not contain sensitive user data or credentials.
- **Configure Log Levels in Production**: In a production environment, set the log level to `info` or `warn` to reduce verbosity.

[Placeholder for diagrams or flowcharts depicting logging flow and log level hierarchy.]

---

## Storage

Data persistence is a fundamental aspect of application development. The Common Package provides storage interfaces and implementations that allow your application to store, retrieve, and manage data efficiently. One of the key storage mechanisms offered is `LocalStorage`, which is an in-memory storage solution suitable for caching and temporary data persistence.

### Utilizing `LocalStorage` and Other Storage Mechanisms

The `LocalStorage` class is a simple yet powerful tool for storing key-value pairs in memory. It adheres to the `Storage` interface, ensuring a consistent API for getting, setting, and deleting data.

#### `Storage` Interface

```typescript
export interface Storage<T = any> {
  get(key: string): T | undefined | Promise<T | undefined>;
  set(key: string, value: T): void | Promise<void>;
  delete(key: string): void | Promise<void>;
}
```

This interface defines the basic methods required for any storage implementation:

- `get(key)`: Retrieves the value associated with the specified key.
- `set(key, value)`: Stores a value under the specified key.
- `delete(key)`: Removes the value associated with the specified key.

#### `LocalStorage` Class

The `LocalStorage` class implements the `Storage` interface and provides additional features such as:

- **Capacity Management**: Control the maximum number of records to store.
- **Time-To-Live (TTL)**: Specify how long data should persist before it expires.
- **Least Recently Used (LRU) Eviction**: Automatically removes the least recently used items when the storage exceeds its capacity.

```typescript
export interface LocalStorageOptions {
  /**
   * Max number of records.
   */
  readonly max?: number;

  /**
   * Time to live in milliseconds.
   */
  readonly ttl?: number;
}

export class LocalStorage<T = any> implements Storage<T> {
  constructor(data: Record<string, T> = {}, options: LocalStorageOptions = {}) {
    // Implementation details...
  }

  get(key: string): T | undefined {
    // Retrieve the value associated with the key.
  }

  set(key: string, value: T): void {
    // Store the value with the specified key.
  }

  delete(key: string): void {
    // Delete the value associated with the key.
  }

  // Additional utility methods...
}
```

### Best Practices for Data Persistence

When using `LocalStorage` or any data persistence mechanism, consider the following best practices:

- **Limit Data Size**: Use the `max` option to prevent excessive memory usage.
- **Manage Data Expiry**: Utilize the `ttl` (Time-To-Live) option to ensure data does not become stale.
- **Handle Asynchronous Operations**: If your storage operations are asynchronous, ensure that you handle promises appropriately.
- **Avoid Sensitive Data**: Do not store sensitive information in unencrypted storage mechanisms.
- **Data Serialization**: When storing complex data structures, ensure that they are serializable and deserializable without loss of information.

### Data Persistence with `LocalStorage` Example

Below is an example of how to use `LocalStorage` for data persistence within your application:

```typescript
import { LocalStorage } from '@teams.sdk/common/storage';

// Initialize LocalStorage with some default data
const storage = new LocalStorage<string>(
  {
    user1: 'Alice',
    user2: 'Bob',
  },
  { max: 5, ttl: 60000 } // Max 5 records, 1-minute time-to-live
);

// Retrieve a value by key
const user1 = storage.get('user1');
console.log(`User1: ${user1}`); // Output: User1: Alice

// Add a new key-value pair
storage.set('user3', 'Charlie');
console.log(`User3: ${storage.get('user3')}`); // Output: User3: Charlie

// Update an existing key
storage.set('user1', 'Alice Updated');
console.log(`Updated User1: ${storage.get('user1')}`); // Output: Updated User1: Alice Updated

// Delete a key
storage.delete('user2');
console.log(`User2 after deletion: ${storage.get('user2')}`); // Output: User2 after deletion: undefined

// Display all stored data
console.log('All data:', storage.toString());
/* Possible output:
All data: {
  "user3": "Charlie",
  "user1": "Alice Updated"
}
*/
```

In this example:

- **Initialization**: The `LocalStorage` is initialized with some default data (`user1` and `user2`) and configuration options (`max` and `ttl`).
- **Retrieving Data**: The `get` method is used to retrieve values by their keys.
- **Adding Data**: The `set` method adds new key-value pairs to the storage.
- **Updating Data**: Existing keys can be updated with new values using the `set` method.
- **Deleting Data**: The `delete` method removes data associated with a specific key.
- **Displaying Data**: The `toString` method can be used to output the current state of the storage.

### Additional Storage Mechanisms

While `LocalStorage` is suitable for in-memory caching and temporary storage, you may need more persistent storage solutions for long-term data persistence:

- **File-Based Storage**: Storing data in files on the server's filesystem.
- **Database Systems**: Using databases like SQL, MongoDB, or Redis for robust data storage and querying capabilities.
- **Cloud Storage Services**: Leveraging cloud-based storage solutions for scalability and redundancy.

When choosing a storage mechanism, consider factors such as data volume, concurrency requirements, scalability needs, and security considerations.

### Best Practices Summary

- **Choose the Right Storage**: Match your storage solution to your application's needs.
- **Implement Caching Wisely**: Use in-memory storage like `LocalStorage` for caching to improve performance.
- **Secure Your Data**: Always ensure that data is stored securely, especially if it contains sensitive information.
- **Backup and Recovery**: Implement backup strategies for persistent storage to prevent data loss.
- **Regular Maintenance**: Monitor your storage for performance issues and perform necessary maintenance tasks.

[Placeholder for diagrams or tables comparing different storage mechanisms and their use cases.]

---

## Next Steps

- **Explore Other Packages**
  - Proceed to [3.7 Dev Package](#37-dev-package) to learn about development tools.
  - Proceed to [3.8 BotBuilder Package](#38-botbuilder-package) to learn about integrating with the Microsoft Bot Framework.

- **Hands-On Practice**
  - Proceed to [4. Tutorials and Examples](#4-tutorials-and-examples) for practical implementations.

- **Deepen Your Understanding**
  - Delve into advanced concepts in [5. Advanced Topics](#5-advanced-topics).

---