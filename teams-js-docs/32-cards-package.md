# 3.2 Cards Package

## Overview

### Purpose of the Cards Package

The **Cards Package** is designed to empower developers to create rich, interactive content within their applications. By utilizing adaptive cards, developers can build visually engaging UI components that enhance user interaction and experience. The package provides a comprehensive set of tools and functionalities for building and customizing cards, making it easier to display information and collect user input in a structured and flexible manner.

Key functionalities of the Cards Package include:

- **Building Adaptive Cards**: Create dynamic and responsive cards that adapt to different platforms and devices.
- **Customizing Card Elements**: Utilize a variety of elements such as text blocks, images, inputs, and actions to design complex card layouts.
- **Enhancing User Interaction**: Implement interactive elements like buttons and forms to facilitate user engagement within the card interface.
- **Theming and Styling**: Apply consistent styling across cards using properties for colors, fonts, spacing, and alignment.

### Creating and Customizing Cards

Adaptive Cards are a way to exchange card content in a common and consistent format. They allow developers to craft messages that seamlessly integrate into applications, providing users with interactive and visually appealing content.

**Overview of Card Structure and Elements**

An Adaptive Card is essentially a JSON object that describes the content and layout of a card. The primary building blocks of a card include:

- **Containers**: Elements that hold and organize content, such as `Container`, `ColumnSet`, and `ActionSet`.
- **Elements**: Individual components like `TextBlock`, `Image`, and `Input` fields that display information or collect user data.
- **Actions**: Interactive elements like buttons that perform operations when clicked, such as `SubmitAction` or `OpenUrlAction`.

**Introduction to Adaptive Cards**

Adaptive Cards are platform-agnostic snippets of UI, designed to integrate seamlessly across different applications. They are rendered natively inside host applications, ensuring a consistent user experience. The Cards Package leverages Adaptive Cards to enable developers to create interactive, card-based interfaces with ease.

#### Building an Adaptive Card

Below is a sample code demonstrating how to define an Adaptive Card with text, images, and actions using the Cards Package:

```typescript
import { Card, TextBlock, Image, ActionSet, OpenUrlAction } from '@teams.sdk/cards';

// Create a TextBlock element
const textBlock = TextBlock('Welcome to Adaptive Cards!', {
  size: 'large',
  weight: 'bolder',
  color: 'accent',
  wrap: true,
});

// Define an Image element
const image = Image('https://example.com/image.png', {
  altText: 'Sample Image',
  size: 'medium',
});

// Create an OpenUrlAction
const openUrlAction = OpenUrlAction('Learn More', 'https://adaptivecards.io');

// Create an ActionSet with the OpenUrlAction
const actionSet = ActionSet([openUrlAction]);

// Create the Adaptive Card
const adaptiveCard = Card([textBlock, image, actionSet], {
  version: '1.6',
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
});

console.log(JSON.stringify(adaptiveCard, null, 2));
```

**Explanation:**

- **TextBlock**: Displays a block of text with specified styling options.
- **Image**: Shows an image from a specified URL, with properties like `altText` and `size`.
- **OpenUrlAction**: Defines an action that opens a URL when triggered.
- **ActionSet**: Groups one or more actions together.
- **Card**: Combines all elements and actions into a complete Adaptive Card object.

Developers can modify and extend this example by adding more elements or customizing properties to suit their application's needs.

[Placeholder for additional images or diagrams illustrating the card structure]

---

---

## Actions

### Action Types

Adaptive Cards support a variety of action types that enable user interaction within the card. These actions allow users to perform tasks such as submitting data, opening URLs, or toggling visibility of elements. Understanding each action type and its use case is crucial for creating interactive and functional cards.

#### Overview of Available Action Types

1. **`ExecuteAction`**: Executes a back-end process or command when triggered. Ideal for performing operations that require server-side processing.

2. **`OpenUrlAction`**: Opens a specified URL in a web browser. Useful for directing users to external links or resources.

3. **`SubmitAction`**: Submits the collected data from input fields within the card to the server. Commonly used in forms and data collection scenarios.

4. **`ToggleVisibilityAction`**: Toggles the visibility of specified card elements. This action enhances the user experience by showing or hiding content dynamically without refreshing the card.

5. **`ShowCardAction`**: Displays an in-line Adaptive Card when the action is triggered. Useful for presenting additional information or collecting more input without navigating away from the current card.

#### Definitions and Use Cases

- **`ExecuteAction`**: Ideal for initiating complex operations that might involve computations or data manipulation on the server. For example, starting a background job or sending a command to a service.

- **`OpenUrlAction`**: Best used when you want to redirect the user to an external website, documentation, or a resource outside the application. For instance, directing users to a help page or terms of service.

- **`SubmitAction`**: Suited for forms where user input needs to be sent back to the server for processing. Upon triggering, it can also carry additional data defined in the `data` property.

- **`ToggleVisibilityAction`**: Useful for creating interactive content where certain sections are revealed or hidden based on user actions. This enhances the user interface by making it more dynamic and responsive.

- **`ShowCardAction`**: Allows embedding expandable sections within a card. It can be used to display additional input fields or information without overcrowding the main card layout.

#### Best Practices for Implementing Actions

- **Consistency**: Use actions consistently throughout your application to provide a predictable user experience.

- **Clarity**: Clearly label action titles to reflect their purpose. For example, use "Submit Feedback" instead of just "Submit".

- **Feedback**: Provide immediate feedback after an action is performed. This could be in the form of a confirmation message or visual change in the card.

- **Minimalism**: Avoid overcrowding cards with too many actions. Focus on the most essential actions to prevent overwhelming the user.

- **Accessibility**: Ensure that actions are accessible and usable for all users, including those relying on assistive technologies.

### Implementing Actions

Defining actions within an Adaptive Card involves specifying the action type and its associated properties. Actions are typically added to the `actions` array property of a card or an `ActionSet`.

#### How to Define Actions Within a Card

Here's how you can define actions within a card:

1. **Import the Necessary Action Classes**: Import the action types you need from the Cards Package.

   ```typescript
   import { SubmitAction, OpenUrlAction } from '@teams.sdk/cards';
   ```

2. **Create Action Instances**: Instantiate actions by providing the required properties such as `title`, `url`, or `data`.

   ```typescript
   const submitAction = SubmitAction('Submit', { action: 'submitForm' });
   const openUrlAction = OpenUrlAction('Visit Website', 'https://example.com');
   ```

3. **Add Actions to the Card**: Include the actions in the `actions` array of the card.

   ```typescript
   const actionCard = Card([], {
     actions: [submitAction, openUrlAction],
     version: '1.6',
     $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
   });
   ```

#### Handling User Interactions and Event Processing

When a user interacts with actions in your card:

- **`SubmitAction`**: The `data` payload is sent to your backend or bot for processing. Ensure that your backend is set up to handle the incoming data and provide an appropriate response.

- **`OpenUrlAction`**: The specified URL is opened in the user's default web browser. No additional backend handling is required.

- **Event Processing**: Your application should listen for action events and manage the control flow accordingly. This might involve updating the UI, storing data, or triggering other processes.

#### Handling Card Actions

Below is a sample code demonstrating how to implement actions within a card:

```typescript
import { Card, SubmitAction, OpenUrlAction } from '@teams.sdk/cards';

// Create a SubmitAction
const submitAction = SubmitAction('Submit', { action: 'submitForm' });

// Create an OpenUrlAction
const openUrlAction = OpenUrlAction('Visit Website', 'https://example.com');

// Create the Adaptive Card with actions
const actionCard = Card([], {
  actions: [submitAction, openUrlAction],
  version: '1.6',
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
});

console.log(JSON.stringify(actionCard, null, 2));
```

**Explanation:**

- **SubmitAction**: When triggered, it will send the specified `data` payload back to the server or bot for processing.

- **OpenUrlAction**: Opens the provided URL, allowing users to access additional content or resources.

Developers should ensure that their application or bot infrastructure is prepared to handle these actions appropriately, processing the data received from `SubmitAction` and initiating any necessary workflows.

[Placeholder for additional images or diagrams illustrating action handling]

---

## Inputs

### Input Elements

Collecting user input is essential for interactive applications. The Cards Package offers a range of input elements that can be integrated into Adaptive Cards to gather data from users efficiently and intuitively.

#### Guides for Using Input Elements in Cards

The following input elements are available:

1. **`TextInput`**: Allows users to enter text. Supports single-line or multi-line inputs and can be styled for specific input types like email or password.

2. **`DateInput`**: Enables users to select a date using a date picker. Useful for forms requiring date entries such as appointments or schedules.

3. **`ChoiceSetInput`**: Presents a list of choices to the user. Can be displayed as a dropdown (compact style) or as a set of radio buttons or checkboxes (expanded style).

4. **`NumberInput`**: Allows users to input numeric values. Ideal for quantities, measurements, or any data that requires numerical input.

5. **`ToggleInput`**: Provides a toggle switch for binary choices, representing true/false or yes/no options.

6. **`TimeInput`**: Enables users to select a time using a time picker control.

#### Collecting User Input Through Cards

Input elements are included in the `body` of an Adaptive Card and must have a unique `id` property to identify the data upon submission.

**Defining Input Fields:**

- **TextInput Example**: Collects textual information, with options for placeholders and validation.
  
- **DateInput Example**: Captures date selections within specified boundaries.

- **ChoiceSetInput Example**: Offers a set of predefined options for the user to select.

**Handling Submission:**

- Inputs are collected when the user triggers a `SubmitAction`.
- The collected data is sent as a key-value pair, where the key is the `id` of the input.

#### Validation and Data Binding Strategies

- **Required Fields**: Use the `isRequired` property to ensure essential fields are filled before submission.

- **Default Values**: The `value` property sets a default or initial value for the input.

- **Regular Expressions**: For `TextInput`, the `regex` property can enforce specific input formats (e.g., email, phone numbers).

- **Client-Side vs. Server-Side Validation**: While basic validation can occur on the client, robust validation should be implemented on the server side upon data receipt.

#### Implementing Input Fields

Below is a sample code illustrating how to add various input fields to a card:

```typescript
import { Card, TextInput, DateInput, ChoiceSetInput, SubmitAction } from '@teams.sdk/cards';

// Create a TextInput element
const textInput = TextInput('nameInput', {
  placeholder: 'Enter your name',
  isRequired: true,
});

// Create a DateInput element
const dateInput = DateInput('dateInput', {
  placeholder: 'Select a date',
  min: '2023-01-01',
  max: '2025-12-31',
});

// Create a ChoiceSetInput element
const choiceSetInput = ChoiceSetInput('choiceInput', [
  { title: 'Option 1', value: '1' },
  { title: 'Option 2', value: '2' },
  { title: 'Option 3', value: '3' },
], {
  placeholder: 'Select an option',
  style: 'compact',
});

// Create a SubmitAction
const submitAction = SubmitAction('Submit', { action: 'submitForm' });

// Create the Adaptive Card with input fields and a submit action
const inputCard = Card([textInput, dateInput, choiceSetInput], {
  actions: [submitAction],
  version: '1.6',
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
});

console.log(JSON.stringify(inputCard, null, 2));
```

**Explanation:**

- **`TextInput`**: Collects user-provided text with a placeholder and marks it as required.

- **`DateInput`**: Allows date selection within a specified range.

- **`ChoiceSetInput`**: Provides a dropdown list of options for user selection.

- **`SubmitAction`**: Submits the input data when activated.

Upon submission, the input data is sent as a JSON payload where each input `id` corresponds to the user's input value. For example:

```json
{
  "nameInput": "John Doe",
  "dateInput": "2023-08-15",
  "choiceInput": "2"
}
```

Developers should implement appropriate backend handling to process this data, including validation and any necessary business logic.

[Placeholder for additional images or diagrams illustrating input fields in a card]

---

## Containers

### Container Elements

Organizing card content effectively enhances readability and user engagement. The Cards Package provides several container elements that help structure content in a logical and visually appealing manner. These containers allow developers to group related elements, create complex layouts, and ensure responsiveness across different devices.

#### Key Container Elements

1. **`Container`**
   - A basic element that groups a collection of items.
   - Can apply common styling or actions to all contained elements.
   - Useful for grouping related content together.

2. **`ColumnSet` and `Column`**
   - **`ColumnSet`** divides content horizontally into `Column` elements.
   - Each `Column` can contain its own set of elements.
   - Allows for side-by-side placement of content, enabling responsive designs.

3. **`FactSet`**
   - Displays a series of "facts" (name/value pairs).
   - Ideal for presenting key-value data like specifications, summaries, or statistics.
   - Enhances the presentation of structured information.

4. **`ImageSet`**
   - Displays a collection of `Image` elements in a gallery-like format.
   - Supports acceptable image formats such as PNG, JPEG, and GIF.
   - Useful for showcasing multiple images within a single card.

5. **`ActionSet`**
   - Groups multiple actions together.
   - Allows for the inclusion of action buttons within specific sections of a card.
   - Enhances interactivity by organizing actions logically.

6. **`Carousel`**
   - Presents content as a series of cards that users can swipe through.
   - Ideal for displaying multiple items without overwhelming the user interface.
   - Enhances navigation and user experience.

#### Structuring Card Layouts for Better Presentation

By utilizing these container elements, developers can:

- **Group Related Content**
  - Organize elements logically, making the card easier to read and understand.
  - Apply consistent styling to grouped elements for a cohesive look.

- **Create Responsive Designs**
  - Adjust layouts dynamically based on the device or screen size.
  - Ensure content is displayed optimally across different platforms.

- **Enhance Visual Hierarchy**
  - Use containers to emphasize important information.
  - Guide the user's attention through strategic placement and grouping.

- **Facilitate Complex Layouts**
  - Combine containers to build intricate designs.
  - Nest containers within each other for advanced structuring.

### Layout Customization

Effective layout customization involves arranging elements to be both visually appealing and accessible. Containers offer flexibility in designing complex and adaptive card layouts.

#### Arranging Elements for Responsiveness and Accessibility

- **Adaptive Widths**
  - Use the `width` property in `Column` elements to control sizing.
  - Options include `"auto"`, `"stretch"`, or specific pixel/weight values.

- **Visibility and Conditional Rendering**
  - Control the visibility of containers using the `isVisible` property.
  - Implement dynamic layouts that adjust based on user interactions or data conditions.

- **Accessibility Considerations**
  - Ensure that the layout supports screen readers and keyboard navigation.
  - Use descriptive text and labels for all interactive elements.

#### Using Containers to Create Complex Layouts

- **Nested Containers**
  - Embed `Container` elements within others to create multi-level structures.
  - Allows for granular control over styling and organization.

- **Combining Different Containers**
  - Mix `ColumnSet`, `FactSet`, and other containers to achieve the desired layout.
  - Leverage the strengths of each container type for specific use cases.

- **Styling and Theming**
  - Apply styles such as background colors, spacing, and padding at the container level.
  - Maintain a consistent theme across all elements within a container.

#### Customizing Card Layouts

Below is a sample code demonstrating how to utilize containers and columns for responsive design:

```typescript
import { Card, ColumnSet, Column, TextBlock, Image } from '@teams.sdk/cards';

// Create the first column
const column1 = Column([
  TextBlock('Column 1', { weight: 'bolder', size: 'medium' }),
  Image('https://example.com/image1.png', { size: 'small' }),
], { width: 'auto' });

// Create the second column
const column2 = Column([
  TextBlock('Column 2', { weight: 'bolder', size: 'medium' }),
  Image('https://example.com/image2.png', { size: 'small' }),
], { width: 'stretch' });

// Create a ColumnSet to hold the columns
const columnSet = ColumnSet([column1, column2]);

// Create the Adaptive Card with the ColumnSet
const layoutCard = Card([columnSet], {
  version: '1.6',
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
});

console.log(JSON.stringify(layoutCard, null, 2));
```

**Explanation:**

- **`Column`**: Defines a vertical stack of elements. Each column can have its own content and styling.
  - `column1` contains a text block and an image with `width` set to `"auto"`, making it size to fit its content.
  - `column2` has similar content but with `width` set to `"stretch"`, causing it to fill the remaining space.

- **`ColumnSet`**: Arranges columns horizontally, allowing side-by-side placement.
  - The columns inside a `ColumnSet` adjust their widths based on their `width` properties and the available space.

- **Responsive Design**:
  - By configuring the `width` properties, the layout adapts to different screen sizes.
  - The `stretch` and `auto` settings help distribute space proportionally.

Developers can build upon this example by adding more columns, nesting columns within other containers, or incorporating additional elements like `ImageSet` or `FactSet` to enrich the card's layout.

[Placeholder for images or diagrams illustrating column layouts and responsiveness]

---

## Media Elements

### Media Components

Incorporating media elements into cards significantly enhances user engagement and provides a richer interactive experience. The Cards Package offers a variety of media components that allow developers to include images, videos, icons, and formatted text within their Adaptive Cards.

#### Incorporating Media into Cards

1. **`Image`**
   - Displays an image within the card.
   - Supports formats such as PNG, JPEG, and GIF.
   - Properties include `url`, `altText`, `size`, `style`, and `horizontalAlignment`.
   - Use cases: Showcasing product images, profile pictures, or illustrative graphics.

2. **`Media`**
   - Embeds media content like audio or video.
   - Allows users to play media directly within the card.
   - Properties include `sources`, `poster`, and `altText`.
   - Use cases: Playing promotional videos, tutorials, or podcast clips.

3. **`Icon`**
   - Displays a small image or symbol representing an action or status.
   - Ideal for enhancing visual cues within the card.
   - Use cases: Indicating statuses like online/offline, adding decorative elements next to text.

4. **`Badge`**
   - Shows a small badge or label, often used for notifications or status indicators.
   - Can include counts or short pieces of text.
   - Use cases: Displaying unread message counts, alerting to new updates.

5. **`CodeBlock`**
   - Renders a block of preformatted code.
   - Preserves whitespace and formatting, useful for displaying code snippets.
   - Use cases: Sharing code examples, displaying logs or error messages.

6. **`RichTextBlock`**
   - Allows for the inclusion of richly formatted text.
   - Supports inline formatting like bold, italic, and hyperlinks.
   - Use cases: Creating complex text layouts, including hyperlinks and emphasis within text.

7. **`TextBlock`**
   - Displays text within the card.
   - Properties include `text`, `weight`, `size`, `color`, and `wrap`.
   - Use cases: Titles, descriptions, labels, and any textual content.

8. **`TextRun`**
   - Used within a `RichTextBlock` to format individual portions of text.
   - Supports styling properties similar to `TextBlock`.
   - Use cases: Highlighting specific words or phrases within a block of text.

9. **`ProgressBar`**
   - Visualizes progress towards a goal or completion of a task.
   - Displays a horizontal bar filling up based on a percentage value.
   - Use cases: Showing download progress, task completion status.

10. **`ProgressRing`**
    - Similar to `ProgressBar`, but displays progress in a circular ring.
    - Use cases: Representing loading states, circular progress indicators.

#### Enhancing User Engagement with Visual and Interactive Elements

Incorporating these media components into your cards can:

- **Improve Visual Appeal**
  - Break up text-heavy content with images and icons.
  - Use badges and progress indicators to make data more digestible.

- **Increase Interactivity**
  - Embed media content for users to engage with directly.
  - Use formatted text and hyperlinks to provide additional resources.

- **Convey Information Effectively**
  - Utilize visual cues like icons and badges to represent statuses or alerts.
  - Display progress using bars and rings for intuitive understanding.

- **Enhance Accessibility**
  - Provide alternative text (`altText`) for images and media to support screen readers.
  - Use clear and descriptive text in `TextBlock` and `RichTextBlock` elements.

### Styling Media

Customization of media elements allows developers to align the card's appearance with the application's branding and design guidelines.

#### Customizing Appearance and Behavior of Media Elements

- **Size and Scaling**
  - Control the size of images and media using properties like `size`, `width`, and `height`.
  - Options for `size` include `"auto"`, `"stretch"`, `"small"`, `"medium"`, and `"large"`.

- **Alignment**
  - Use `horizontalAlignment` and `verticalAlignment` properties to position elements within their container.
  - Options include `"left"`, `"center"`, and `"right"` for horizontal alignment.

- **Styling Options**
  - Apply styles such as `style` in `Image` to render images with different effects (e.g., `style: "person"` for circular images).
  - Customize `TextBlock` and `TextRun` with properties like `weight`, `color`, `fontType`, and `isSubtle`.

- **Interactivity**
  - Make images clickable by wrapping them with an `Action` element.
  - Use `selectAction` property in `Image` or `TextBlock` to define actions when the element is clicked.

#### Managing Media Properties Like Size, Alignment, and Styling Options

Here's how to manage common properties for media elements:

- **Images**

  ```typescript
  import { Image } from '@teams.sdk/cards';

  const image = Image('https://example.com/image.png', {
    altText: 'Descriptive Alt Text',
    size: 'medium',
    style: 'person',
    horizontalAlignment: 'center',
  });
  ```

- **RichTextBlock with TextRun**

  ```typescript
  import { RichTextBlock, TextRun } from '@teams.sdk/cards';

  const richText = RichTextBlock([
    TextRun('This is ', { weight: 'default' }),
    TextRun('bold', { weight: 'bolder' }),
    TextRun(' and this is ', { weight: 'default' }),
    TextRun('italic.', { italic: true }),
  ]);
  ```

- **ProgressBar**

  ```typescript
  import { ProgressBar } from '@teams.sdk/cards';

  const progressBar = ProgressBar(0.75, {
    label: 'Task Completion',
    color: 'accent',
  });
  ```

- **Media Element**

  ```typescript
  import { Media } from '@teams.sdk/cards';

  const mediaElement = Media([
    {
      mimeType: 'video/mp4',
      url: 'https://example.com/video.mp4',
    },
  ], {
    poster: 'https://example.com/poster.png',
    altText: 'Video Description',
  });
  ```

#### Example: Incorporating Media into a Card

Below is a sample code demonstrating how to include various media elements in an Adaptive Card:

```typescript
import { Card, TextBlock, Image, Media, RichTextBlock, TextRun } from '@teams.sdk/cards';

// TextBlock element
const headerText = TextBlock('Media Elements in Adaptive Cards', {
  size: 'large',
  weight: 'bolder',
  color: 'accent',
});

// Image element
const image = Image('https://example.com/image.png', {
  altText: 'Sample Image',
  size: 'medium',
  horizontalAlignment: 'center',
});

// RichTextBlock with TextRun elements
const richText = RichTextBlock([
  TextRun('This is a '),
  TextRun('RichTextBlock', { weight: 'bolder' }),
  TextRun(' with '),
  TextRun('formatted', { italic: true }),
  TextRun(' text.'),
]);

// Media element (video)
const mediaElement = Media([
  {
    mimeType: 'video/mp4',
    url: 'https://example.com/video.mp4',
  },
], {
  poster: 'https://example.com/poster.png',
  altText: 'Sample Video',
});

// Create the Adaptive Card with media elements
const mediaCard = Card([headerText, image, richText, mediaElement], {
  version: '1.6',
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
});

console.log(JSON.stringify(mediaCard, null, 2));
```

**Explanation:**

- **`TextBlock`**: Used for the card's header with styling applied.
- **`Image`**: Displays an image with centered alignment.
- **`RichTextBlock`**: Contains multiple `TextRun` elements with different formatting.
- **`Media`**: Embeds a video that users can play within the card.

By combining these elements, developers can create engaging and interactive cards that provide a better user experience.

[Placeholder for images or diagrams illustrating media elements within a card]

---

## Layouts

### Layout Components

Creating sophisticated and responsive designs in Adaptive Cards often requires the use of advanced layout components. These components provide greater control over the arrangement of elements, enabling developers to craft complex and dynamic card layouts.

#### Utilizing Advanced Layout Components

1. **`StackLayout`**
   - Organizes child elements in a single line, either vertically or horizontally.
   - Allows for stacking elements with precise control over spacing, alignment, and distribution.
   - Properties include `orientation`, `spacing`, `horizontalAlignment`, and `verticalAlignment`.
   - Use cases: Creating toolbars, navigation bars, or grouped buttons.

2. **`FlowLayout`**
   - Wraps child elements across multiple lines based on the available space.
   - Automatically moves elements to the next line when there isn't enough room, similar to text wrapping.
   - Properties include `spacing`, `horizontalAlignment`, `verticalAlignment`, and `maxWidth`.
   - Use cases: Displaying tags, chips, or a dynamic list of items that adjusts to the card's width.

3. **`AreaGridLayout`**
   - Divides the card into a grid of rows and columns, similar to CSS Grid.
   - Offers precise placement of elements in specified grid areas.
   - Properties include `rows`, `columns`, `areas`, and `children` with assigned grid positions.
   - Use cases: Designing complex layouts that require elements to span multiple rows or columns, such as dashboards or detailed information panels.

#### Creating Sophisticated and Responsive Card Designs

By leveraging these advanced layout components, developers can:

- **Enhance Responsiveness**
  - Design layouts that adapt to different screen sizes and orientations.
  - Ensure content is displayed optimally on various devices, from mobile phones to desktop applications.

- **Improve Visual Hierarchy**
  - Arrange elements to guide the user's focus through the card.
  - Balance the card's appearance by aligning and distributing content effectively.

- **Optimize Space Utilization**
  - Use wrapping and grid layouts to make the best use of available space.
  - Prevent content from being truncated or overflowing the card boundaries.

- **Create Dynamic Content Arrangements**
  - Build layouts that adjust based on the amount or type of content.
  - Accommodate scenarios where the content size or quantity is not fixed.

#### Example: Utilizing `StackLayout` and `FlowLayout`

Below is a sample code demonstrating how to use `StackLayout` and `FlowLayout` to create a responsive card layout:

```typescript
import { Card, StackLayout, FlowLayout, TextBlock, Image } from '@teams.sdk/cards';

// Create a StackLayout with horizontal orientation
const horizontalStack = StackLayout([
  Image('https://example.com/icon1.png', { size: 'small' }),
  Image('https://example.com/icon2.png', { size: 'small' }),
  Image('https://example.com/icon3.png', { size: 'small' }),
], {
  orientation: 'horizontal',
  spacing: 'medium',
  horizontalAlignment: 'center',
});

// Create a FlowLayout to display tags
const flowLayout = FlowLayout([
  TextBlock('Tag1', { style: 'tag' }),
  TextBlock('Tag2', { style: 'tag' }),
  TextBlock('Tag3', { style: 'tag' }),
  TextBlock('Tag4', { style: 'tag' }),
  TextBlock('Tag5', { style: 'tag' }),
], {
  spacing: 'small',
  maxWidth: 300,
});

// Create the Adaptive Card with layout components
const layoutCard = Card([horizontalStack, flowLayout], {
  version: '1.6',
  $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
});

console.log(JSON.stringify(layoutCard, null, 2));
```

**Explanation:**

- **`StackLayout`**
  - The `horizontalStack` arranges images horizontally with medium spacing.
  - The `horizontalAlignment: 'center'` property centers the stack within the card.

- **`FlowLayout`**
  - The `flowLayout` displays text blocks representing tags.
  - The `maxWidth` property ensures the layout wraps the tags when exceeding the specified width.

Developers can adjust properties like `orientation`, `spacing`, and `alignment` to customize the layout further. By combining these components, you can create adaptable layouts that maintain a consistent appearance across different devices and screen sizes.

[Placeholder for images or diagrams illustrating advanced layouts using `StackLayout` and `FlowLayout`]

### Design Principles

Creating effective card designs goes beyond just arranging elements; it involves applying design principles that enhance usability, accessibility, and aesthetic appeal.

#### Best Practices for Creating Clean and User-Friendly Card Designs

- **Simplicity**
  - Keep the design uncluttered by focusing on essential information.
  - Use whitespace effectively to separate different sections and improve readability.

- **Consistency**
  - Apply consistent styling for similar elements (e.g., headers, buttons).
  - Maintain uniformity in fonts, colors, and spacing throughout the card.

- **Hierarchy**
  - Use size, weight, and color to establish a visual hierarchy.
  - Highlight important information by making it more prominent.

- **Clarity**
  - Write clear and concise text.
  - Use labels and placeholders that guide the user on what is expected.

- **Feedback**
  - Provide immediate visual feedback for interactive elements.
  - Inform users of the result of their actions (e.g., display confirmation messages).

#### Ensuring Accessibility and Responsiveness Across Devices and Platforms

- **Responsive Design**
  - Design cards that adapt to different screen sizes and orientations.
  - Test cards on multiple devices to ensure consistent appearance and functionality.

- **Accessibility**
  - Use `altText` for images and media to support screen readers.
  - Ensure sufficient color contrast between text and background.
  - Avoid using color as the sole means of conveying information.

- **Keyboard Navigation**
  - Design interactive elements to be accessible via keyboard.
  - Provide focus indicators for elements that can receive input.

- **Localization**
  - Account for text expansion in different languages.
  - Use culturally appropriate images and icons.

- **Performance**
  - Optimize images and media files to reduce loading times.
  - Limit the use of heavy resources that may impact performance on lower-end devices.

By adhering to these design principles, developers can create Adaptive Cards that are not only visually appealing but also provide a seamless and inclusive user experience.

[Placeholder for images or diagrams illustrating design principles and accessibility considerations]

---

## Common Components

### Styling and Theming

Creating visually consistent and aesthetically pleasing cards is essential for a professional user experience. The Cards Package provides various properties and options to manage card styles, allowing developers to customize colors, fonts, spacing, and alignment.

#### Managing Card Styles

1. **Colors**

   - **Foreground Color**: Adjust the text color using the `color` property in text elements like `TextBlock` and `TextRun`.
     - Available options: `"default"`, `"dark"`, `"light"`, `"accent"`, `"good"`, `"warning"`, `"attention"`.
     - Example:

       ```typescript
       const textBlock = TextBlock('Colored Text', {
         color: 'accent',
       });
       ```

   - **Background Color**: Set the background color of containers using the `backgroundColor` property.
     - Hex color codes or predefined color names can be used.
     - Example:

       ```typescript
       const container = Container([
         // child elements
       ], {
         backgroundColor: '#F0F0F0',
       });
       ```

2. **Fonts**

   - **Font Type**: Specify the font type using the `fontType` property.
     - Available options: `"default"`, `"monospace"`.
     - Example:

       ```typescript
       const codeBlock = TextBlock('Monospaced Text', {
         fontType: 'monospace',
       });
       ```

   - **Font Size and Weight**: Control text size with the `size` property and weight with the `weight` property.
     - Size options: `"small"`, `"default"`, `"medium"`, `"large"`, `"extraLarge"`.
     - Weight options: `"lighter"`, `"default"`, `"bolder"`.
     - Example:

       ```typescript
       const headerText = TextBlock('Header', {
         size: 'large',
         weight: 'bolder',
       });
       ```

3. **Spacing and Alignment**

   - **Spacing**: Adjust spacing between elements using the `spacing` property.
     - Options: `"none"`, `"small"`, `"default"`, `"medium"`, `"large"`, `"extraLarge"`, `"padding"`.
     - Example:

       ```typescript
       const textBlock = TextBlock('Spaced Text', {
         spacing: 'medium',
       });
       ```

   - **Alignment**

     - **Horizontal Alignment**: Align elements horizontally within their container using the `horizontalAlignment` property.
       - Options: `"left"`, `"center"`, `"right"`
       - Example:

         ```typescript
         const image = Image('https://example.com/image.png', {
           horizontalAlignment: 'center',
         });
         ```

     - **Vertical Alignment**: Align elements vertically within their container using the `verticalAlignment` property (applies to `Container`, `Column`, and other container types).
       - Options: `"top"`, `"center"`, `"bottom"`
       - Example:

         ```typescript
         const container = Container([
           // child elements
         ], {
           verticalAlignment: 'center',
         });
         ```

#### Applying Consistent Theming Across Cards

To maintain a consistent look and feel across all cards in your application:

- **Define a Theme Object**: Create a centralized theme configuration that holds styling properties.

  ```typescript
  const theme = {
    colors: {
      primary: '#0078D7',
      secondary: '#2B2B2B',
      accent: '#D83B01',
    },
    fonts: {
      default: 'Segoe UI',
      monospace: 'Consolas',
    },
  };
  ```

- **Apply the Theme**: Use the theme properties when defining elements.

  ```typescript
  const themedText = TextBlock('Themed Text', {
    color: theme.colors.primary,
    fontType: theme.fonts.default,
    size: 'medium',
  });
  ```

- **Create Reusable Components**: Build styled components that incorporate the theme, ensuring consistency and simplifying maintenance.

  ```typescript
  function HeaderText(text: string) {
    return TextBlock(text, {
      weight: 'bolder',
      size: 'large',
      color: theme.colors.primary,
    });
  }

  const header = HeaderText('Welcome to the Themed Card');
  ```

- **Consistent Padding and Margins**: Use uniform spacing throughout your cards.

  ```typescript
  const contentContainer = Container([
    // child elements
  ], {
    spacing: 'default',
    padding: 'default',
  });
  ```

By adhering to a predefined theme, you ensure that all cards within your application present a unified and professional appearance.

### Adaptive Elements

Adaptive Cards are designed to work seamlessly across multiple platforms and devices. To enhance user experience, it's important to make cards responsive and utilize adaptive properties effectively.

#### Making Cards Responsive Across Different Platforms

- **Use Relative Sizing and Positioning**

  - Avoid hardcoding pixel values for sizes and positions.
  - Use properties like `width: 'auto'` or `width: 'stretch'` to allow elements to adjust based on the available space.

- **Test on Multiple Devices**

  - Preview your cards on different devices and platforms to ensure they render correctly.
  - Utilize tools and emulators provided by host applications.

- **Responsive Images**

  - Use the `size` property with values like `"auto"`, `"small"`, `"medium"`, `"large"`, `"stretch"` to make images adapt to the container size.

  ```typescript
  const responsiveImage = Image('https://example.com/image.png', {
    size: 'stretch',
  });
  ```

#### Using Adaptive Properties to Enhance User Experience

- **`isVisible` Property**

  - Dynamically show or hide elements based on user interaction or data.
  - Can be controlled through actions like `ToggleVisibilityAction`.

  ```typescript
  const expandableSection = Container([
    // child elements
  ], {
    isVisible: false,
    id: 'detailsSection',
  });

  const toggleAction = ToggleVisibilityAction('Show Details', ['detailsSection']);
  ```

- **`MinHeight` and `MaxHeight`**

  - Control the minimum and maximum height of elements, ensuring they display appropriately without consuming excessive space.

- **`Fallback` Property**

  - Provide alternative content when an element isn't supported by the host application.
  - Ensures compatibility and a graceful degradation of functionality.

  ```typescript
  const unsupportedElement = {
    type: 'UnsupportedType',
    fallback: TextBlock('This content is not supported.'),
  };
  ```

- **Localization Support**

  - Use the `lang` property to specify the language of the card content.
  - Ensure text directionality is handled correctly for languages that read right-to-left (RTL).

  ```typescript
  const localizedText = TextBlock('مرحبا بكم', {
    lang: 'ar',
  });
  ```

By leveraging adaptive properties and designing with responsiveness in mind, developers can create cards that provide a consistent and optimal experience for all users, regardless of the platform or device they are using.

[Placeholder for images or diagrams illustrating responsive design and adaptive elements]

---

## Next Steps

Now that you have an understanding of the Cards Package and how to create rich, interactive content, you can explore other packages to enhance your applications further.

- **Explore Other Packages**

  - **[3.3 AI Package](#33-ai-package)**
    - Integrate AI capabilities into your applications, enabling intelligent features like natural language understanding and predictive analytics.
  
  - **[3.4 OpenAI Package](#34-openai-package)**
    - Delve into advanced AI integrations using the OpenAI API for cutting-edge functionalities like language generation and semantic analysis.
  
  - **[3.5 Apps Package](#35-apps-package)**
    - Learn about app development, including lifecycle management, authentication, and platform integrations.
  
  - **[3.6 Common Package](#36-common-package)**
    - Understand shared utilities and common functionalities that can be leveraged across different packages.

- **Hands-On Practice**

  - Visit **[4. Tutorials and Examples](#4-tutorials-and-examples)** to access practical guides and sample projects that will help you apply what you've learned and deepen your understanding.

- **Deepen Your Understanding**

  - Explore advanced concepts and best practices in **[5. Advanced Topics](#5-advanced-topics)** to further enhance your applications and stay ahead with the latest developments.

---