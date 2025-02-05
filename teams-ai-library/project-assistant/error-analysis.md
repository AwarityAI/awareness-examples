## Build Errors

src/bot.ts:66:49 - error TS2339: Property 'prompts' does not exist on type 'AI<ProjectAssistantState>'.

66                         const prompt = await ai.prompts.getPrompt(context, 'chat');
                                                   ~~~~~~~

src/bot.ts:67:56 - error TS2339: Property 'complete' does not exist on type 'OpenAIModel'.

67                         const response = await aiModel.complete({
                                                          ~~~~~~~~

src/bot.ts:73:61 - error TS2322: Type '"message"' is not assignable to type '"DO" | "SAY"'.

73                         return { type: 'plan', commands: [{ type: 'message', response }] };
                                                               ~~~~

  node_modules/@microsoft/teams-ai/lib/planners/Planner.d.ts:70:5
    70     type: 'DO' | 'SAY';
           ~~~~
    The expected type comes from property 'type' which is declared here on type 'PredictedCommand'

src/bot.ts:79:17 - error TS2353: Object literal may only specify known properties, and 'prompts' does not exist in type 'AIOptions<ProjectAssistantState>'.

79                 prompts: this.prompts
                   ~~~~~~~

src/bot.ts:146:75 - error TS2345: Argument of type '{ conversation: any; user: any; }' is not assignable to parameter of type 'ProjectAssistantState'.
  Type '{ conversation: any; user: any; }' is missing the following properties from type 'ProjectAssistantState': _scopes, _isLoaded, _stateNotLoadedString, isLoaded, and 13 more.

146         const plan = await this.application.ai.planner.beginTask(context, {
                                                                              ~
147             conversation: conversationData,
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
148             user: await this.userProfileAccessor.get(context, {})
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
149         }, this.application.ai);
    ~~~~~~~~~

src/bot.ts:154:21 - error TS2367: This comparison appears to be unintentional because the types '"DO" | "SAY"' and '"message"' have no overlap.

154                 if (command.type === 'message' && command.response) {
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~

src/bot.ts:154:59 - error TS2339: Property 'response' does not exist on type 'PredictedCommand'.

154                 if (command.type === 'message' && command.response) {
                                                              ~~~~~~~~

src/bot.ts:156:90 - error TS2339: Property 'response' does not exist on type 'PredictedCommand'.

156                     conversationData.messages.push({ role: 'assistant', content: command.response });
                                                                                             ~~~~~~~~

src/bot.ts:158:75 - error TS2339: Property 'response' does not exist on type 'PredictedCommand'.

158                     await this.handleIntent(context, userMessage, command.response);
                                                                              ~~~~~~~~

src/index.ts:57:5 - error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

57     azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
       ~~~~~~~~~~~~~


Found 10 errors in 2 files.

Errors  Files
     9  src/bot.ts:66
     1  src/index.ts:57


## Error Snippets

Based on the error logs, here are the specific code snippets showing the build errors:

In src/bot.ts:
```typescript
// Line 66-67
const prompt = await ai.prompts.getPrompt(context, 'chat');
const response = await aiModel.complete({
```

```typescript
// Line 73
return { type: 'plan', commands: [{ type: 'message', response }] };
```

```typescript
// Line 79
prompts: this.prompts
```

```typescript
// Lines 146-149
const plan = await this.application.ai.planner.beginTask(context, {
    conversation: conversationData,
    user: await this.userProfileAccessor.get(context, {})
}, this.application.ai);
```

```typescript
// Lines 154-158
if (command.type === 'message' && command.response) {
    conversationData.messages.push({ role: 'assistant', content: command.response });
    await this.handleIntent(context, userMessage, command.response);
}
```

In src/index.ts:
```typescript
// Line 57
azureEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
```

These code snippets are triggering the following TypeScript errors:
1. Property 'prompts' does not exist on type 'AI<ProjectAssistantState>'
2. Property 'complete' does not exist on type 'OpenAIModel'
3. Type '"message"' is not assignable to type '"DO" | "SAY"'
4. Object literal may only specify known properties ('prompts' not valid)
5. Argument type mismatch for ProjectAssistantState
6. Type comparison issues between "DO" | "SAY" and "message"
7. Property 'response' does not exist on type 'PredictedCommand'
8. Type 'string | undefined' not assignable to type 'string'


## Type Analysis

Based on the API documentation, here are the relevant type constraints that explain the build errors:

Command Types:
- Valid command types are strictly 'DO' | 'SAY' according to @microsoft/teams-ai/lib/planners/Planner.d.ts
- 'message' is not a valid command type

PredictedCommand Interface:
- Does not have a 'response' property
- For SAY commands, should use PredictedSayCommand which includes:
  ```typescript
  {
    type: 'SAY',
    response: {
      role: 'assistant',
      content: string
    }
  }
  ```
- For DO commands, should use PredictedDoCommand which includes:
  ```typescript
  {
    type: 'DO',
    action: string,
    parameters: Record<string, any>
  }
  ```

AI<ProjectAssistantState>:
- Does not have a 'prompts' property
- Prompts are handled through PromptManager class instead

OpenAIModel:
- Does not have a 'complete' method
- Uses completePrompt() method instead

ProjectAssistantState Interface Requirements:
- Must include properties:
  - _scopes
  - _isLoaded
  - _stateNotLoadedString
  - isLoaded
  - (Plus 13 additional required properties)

Azure Configuration:
- azureEndpoint must be string type, not string | undefined

This represents the actual API types and constraints based on the Teams AI SDK type definitions, which explains why the current code is generating type errors.