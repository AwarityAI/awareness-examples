## Research Code Types

The goal of this research is to gather all of the type definitions for the library.

Last Updated: 2024-11-20T03:10:46.174Z

### Gather Type Definitions

Here is a list of types defined in the library, including their class and the file they are located in:

1. **TestModel** - Class - `packages\teams-ai\src\models\TestModel.ts`
2. **TestAdapter** - Class - `packages\teams-ai\src\TestAdapter.ts`
3. **TestPromptManager** - Class - `packages\teams-ai\src\internals\testing\TestPromptManager.ts`
4. **GPTTokenizer** - Class - `packages\teams-ai\src\tokenizers\GPTTokenizer.ts`
5. **TestTurnState** - Class - `packages\teams-ai\src\internals\testing\TestTurnState.ts`
6. **Prompt** - Class - `packages\teams-ai\src\prompts\Prompt.ts`
7. **PromptTemplate** - Interface - `packages\teams-ai\src\prompts\PromptTemplate.ts`
8. **PromptTemplateConfig** - Interface - `packages\teams-ai\src\prompts\PromptTemplateConfig.ts`
9. **UserMessage** - Class - `packages\teams-ai\src\prompts\UserMessage.ts`
10. **AdaptiveCard** - Interface - `packages\teams-ai\src\AdaptiveCards.ts`
11. **AdaptiveCardsOptions** - Interface - `packages\teams-ai\src\AdaptiveCards.ts`
12. **AdaptiveCardActionExecuteResponseType** - Enum - `packages\teams-ai\src\AdaptiveCards.ts`
13. **AdaptiveCardsSearchParams** - Interface - `packages\teams-ai\src\AdaptiveCards.ts`
14. **AdaptiveCardSearchResult** - Interface - `packages\teams-ai\src\AdaptiveCards.ts`
15. **AdaptiveCards** - Class - `packages\teams-ai\src\AdaptiveCards.ts`
16. **ACTION_INVOKE_NAME** - Constant - `packages\teams-ai\src\AdaptiveCards.ts`
17. **ACTION_EXECUTE_TYPE** - Constant - `packages\teams-ai\src\AdaptiveCards.ts`
18. **DEFAULT_ACTION_SUBMIT_FILTER** - Constant - `packages\teams-ai\src\AdaptiveCards.ts`
19. **SEARCH_INVOKE_NAME** - Constant - `packages\teams-ai\src\AdaptiveCards.ts`
20. **AdaptiveCardInvokeResponseType** - Enum - `packages\teams-ai\src\AdaptiveCards.ts`
21. **JSONResponseValidator** - Class - `packages\teams-ai\src\validators\JSONResponseValidator.ts`
22. **BotAuthenticationBase** - Class - `packages\teams-ai\src\authentication\BotAuthenticationBase.ts`
23. **MessageExtensionAuthenticationBase** - Class - `packages\teams-ai\src\authentication\MessageExtensionAuthenticationBase.ts`
24. **Application** - Class - `packages\teams-ai\src\Application.ts`
25. **OAuthPromptSettings** - Interface - `packages\teams-ai\src\authentication\OAuthPromptSettings.ts`
26. **AuthError** - Class - `packages\teams-ai\src\authentication\AuthError.ts`
27. **Authentication** - Class - `packages\teams-ai\src\authentication\Authentication.ts`
28. **AuthenticationManager** - Class - `packages\teams-ai\src\authentication\AuthenticationManager.ts`
29. **AuthenticationOptions** - Interface - `packages\teams-ai\src\authentication\Authentication.ts`
30. **TurnState** - Class - `packages\teams-ai\src\TurnState.ts`
31. **Activity** - Class - `packages\teams-ai\src\Activity.ts`
32. **ActivityTypes** - Enum - `packages\teams-ai\src\ActivityTypes.ts`
33. **TurnContext** - Class - `packages\teams-ai\src\TurnContext.ts`
34. **UserTokenAccess** - Module - `packages\teams-ai\src\authentication\UserTokenAccess.ts`
35. **OAuthPromptMessageExtensionAuthentication** - Class - `packages\teams-ai\src\authentication\OAuthMessageExtensionAuthentication.ts`
36. **OAuthBotAuthentication** - Class - `packages\teams-ai\src\authentication\OAuthBotAuthentication.ts`
37. **OAuthAdaptiveCardAuthentication** - Class - `packages\teams-ai\src\authentication\OAuthAdaptiveCardAuthentication.ts`
38. **AdaptiveCardAuthenticationBase** - Class - `packages\teams-ai\src\authentication\AdaptiveCardAuthenticationBase.ts`
39. **TeamsSsoSettings** - Interface - `packages\teams-ai\src\authentication\TeamsSsoSettings.ts`
40. **TextSection** - Class - `packages\teams-ai\src\prompts\TextSection.ts`
41. **Assistant** - Interface - `@azure/openai-assistants`
42. **AssistantThread** - Interface - `@azure/openai-assistants`
43. **AssistantThreadCreationOptions** - Interface - `@azure/openai-assistants`
44. **AssistantsClient** - Class - `@azure/openai-assistants`
45. **CreateMessageOptions** - Interface - `@azure/openai-assistants`
46. **CreateRunOptions** - Interface - `@azure/openai-assistants`
47. **CreateRunRequestOptions** - Interface - `@azure/openai-assistants`
48. **CreateThreadOptions** - Interface - `@azure/openai-assistants`
49. **GetRunOptions** - Interface - `@azure/openai-assistants`
50. **ListMessagesOptions** - Interface - `@azure/openai-assistants`
51. **ListResponseOf** - Type Alias - `@azure/openai-assistants`
52. **ListRunsOptions** - Interface - `@azure/openai-assistants`
53. **MessageRole** - Enum - `@azure/openai-assistants`
54. **OpenAIKeyCredential** - Class - `@azure/openai-assistants`
55. **RequiredAction** - Interface - `@azure/openai-assistants`
56. **RequiredFunctionToolCall** - Interface - `@azure/openai-assistants`
57. **SubmitToolOutputsToRunOptions** - Interface - `@azure/openai-assistants`
58. **ThreadMessage** - Interface - `@azure/openai-assistants`
59. **ThreadRun** - Interface - `@azure/openai-assistants`
60. **ToolOutput** - Interface - `@azure/openai-assistants`
61. **PromptSection** - Interface - `packages\teams-ai\src\prompts\PromptSection.ts`
62. **RenderedPromptSection<T>** - Interface - `packages\teams-ai\src\prompts\PromptSection.ts`
63. **PromptFunctions** - Class - `packages\teams-ai\src\prompts\PromptSection.ts`
64. **Memory** - Class - `packages\teams-ai\src\prompts\PromptSection.ts`
65. **AzureOpenAIChatCompletionRequest** - Interface - `packages\teams-ai\src\internals\AzureOpenAIClient.ts`
66. **CreateChatCompletionRequest** - Interface - `packages\teams-ai\src\internals\AzureOpenAIClient.ts`
67. **CreateChatCompletionResponse** - Interface - `packages\teams-ai\src\internals\AzureOpenAIClient.ts`
68. **CreateEmbeddingRequest** - Interface - `packages\teams-ai\src\internals\AzureOpenAIClient.ts`
69. **CreateEmbeddingResponse** - Interface - `packages\teams-ai\src\internals\AzureOpenAIClient.ts`
70. **ModerationInput** - Interface - `packages\teams-ai\src\internals\AzureOpenAIClient.ts`
71. **ModerationResponse** - Interface - `packages\teams-ai\src\internals\AzureOpenAIClient.ts`
72. **AzureOpenAIClientOptions** - Interface - `packages\teams-ai\src\internals\AzureOpenAIClient.ts`
73. **AzureOpenAIClient** - Class - `packages\teams-ai\src\internals\AzureOpenAIClient.ts`
74. **TaskModuleInvokeNames** - Enum - `packages\teams-ai\src\TaskModules.ts`
75. **TaskModulesOptions** - Interface - `packages\teams-ai\src\TaskModules.ts`
76. **TaskModules** - Class - `packages\teams-ai\src\TaskModules.ts`
77. **createTaskSelector** - Function - `packages\teams-ai\src\TaskModules.ts`
78. **ActionHandler** - Type Alias - `packages\teams-ai\src\actions\Action.ts`
79. **ActionEntry** - Interface - `packages\teams-ai\src\actions\Action.ts`
80. **StopCommandName** - Constant - `packages\teams-ai\src\actions\Action.ts`
81. **ActionAugmentationSection** - Class - `packages\teams-ai\src\augmentations\ActionAugmentationSection.ts`
82. **ActionList** - Interface - `packages\teams-ai\src\augmentations\ActionAugmentationSection.ts`
83. **ChatCompletionAction** - Interface - `packages\teams-ai\src\models\ChatCompletionAction.ts`
84. **Plan** - Type Alias - `packages\teams-ai\src\planners\Planner.ts`
85. **PredictedDoCommand** - Type Alias - `packages\teams-ai\src\planners\Planner.ts`
86. **PredictedSayCommand** - Type Alias - `packages\teams-ai\src\planners\Planner.ts`
87. **Validation** - Interface - `packages\teams-ai\src\validators\PromptResponseValidator.ts`
88. **PromptResponseValidator** - Interface - `packages\teams-ai\src\validators\PromptResponseValidator.ts`
89. **TeamsSsoSettings** - Interface - `packages\teams-ai\src\authentication\TeamsSsoSettings.ts`
90. **GroupSection** - Class - `packages\teams-ai\src\prompts\GroupSection.ts`
91. **AIOptions<TState>** - Interface - `packages\teams-ai\src\AI.ts`
92. **ConfiguredAIOptions<TState>** - Interface - `packages\teams-ai\src\AI.ts`
93. **AI<TState>** - Class - `packages\teams-ai\src\AI.ts`
94. **StopCommandName** - Constant - `packages\teams-ai\src\AI.ts`
95. **UnknownActionName** - Constant - `packages\teams-ai\src\AI.ts`
96. **FlaggedInputActionName** - Constant - `packages\teams-ai\src\AI.ts`
97. **FlaggedOutputActionName** - Constant - `packages\teams-ai\src\AI.ts`
98. **HttpErrorActionName** - Constant - `packages\teams-ai\src\AI.ts`
99. **TooManyStepsActionName** - Constant - `packages\teams-ai\src\AI.ts`
100. **PlanReadyActionName** - Constant - `packages\teams-ai\src\AI.ts`
101. **DoCommandActionName** - Constant - `packages\teams-ai\src\AI.ts`
102. **SayCommandActionName** - Constant - `packages\teams-ai\src\AI.ts`
103. **PromptResponse** - Interface - `packages\teams-ai\src\internals\types.ts`
104. **PromptResponseStatus** - Enum - `packages\teams-ai\src\internals\types.ts`
105. **Message** - Interface - `packages\teams-ai\src\internals\prompts.ts`
106. **PromptFunctions** - Interface - `packages\teams-ai\src\internals\prompts.ts`
107. **Tokenizer** - Class - `packages\teams-ai\src\internals\tokenizers.ts`
108. **Memory** - Class - `packages\teams-ai\src\internals\MemoryFork.ts`
109. **PromptCompletionModel** - Interface - `packages\teams-ai\src\internals\models\PromptCompletionModel.ts`
110. **Response** - Class - `packages\teams-ai\src\validators\Response.ts`
111. **ToolsAugmentation** - Class - `packages\teams-ai\src\augmentations\ToolsAugmentation.ts`
112. **DefaultAugmentation** - Class - `packages\teams-ai\src\augmentations\DefaultAugmentation.ts`
113. **LlamaModel** - Class - `packages\teams-ai\src\models\LlamaModel.ts`
114. **LlamaModelOptions** - Interface - `packages\teams-ai\src\models\LlamaModel.ts`
115. **LayoutEngine** - Class - `packages\teams-ai\src\prompts\LayoutEngine.ts`
116. **PlanReady** - Function - `packages\teams-ai\src\actions\PlanReady.ts`
117. **AzureOpenAIModeratorOptions** - Interface - `packages\teams-ai\src\moderators\AzureContentSafetyModerator.ts`
118. **AzureContentSafetyModerator** - Class - `packages\teams-ai\src\moderators\AzureContentSafetyModerator.ts`
119. **TooManyStepsParameters** - Interface - `packages\teams-ai\src\actions\TooManySteps.ts`
120. **tooManySteps** - Function - `packages\teams-ai\src\actions\TooManySteps.ts`
121. **FunctionResponseMessage** - Class - `packages\teams-ai\src\prompts\FunctionResponseMessage.ts`
122. **Moderator** - Interface - `packages\teams-ai\src\moderators\Moderator.ts`
123. **EmbeddingsModel** - Interface - `packages\teams-ai\src\embeddings\EmbeddingsModel.ts`
124. **EmbeddingsResponseStatus** - Type Alias - `packages\teams-ai\src\embeddings\EmbeddingsModel.ts`
125. **EmbeddingsResponse** - Interface - `packages\teams-ai\src\embeddings\EmbeddingsModel.ts`
126. **MonologueAugmentation** - Class - `packages\teams-ai\src\augmentations\MonologueAugmentation.ts`
127. **TurnStateProperty** - Class - `packages\teams-ai\src\TurnStateProperty.ts`
128. **TextDataSource** - Class - `packages\teams-ai\src\dataSources\TextDataSource.ts`
129. **DataSource** - Interface - `packages\teams-ai\src\dataSources\DataSource.ts`
130. **InputFileDownloader** - Interface - `packages\teams-ai\src\InputFileDownloader.ts`
131. **InputFile** - Interface - `packages\teams-ai\src\InputFileDownloader.ts`
132. **StreamingResponse** - Class - `packages\teams-ai\src\StreamingResponse.ts`
133. **ActionOutputMessage** - Class - `packages\teams-ai\src\prompts\ActionOutputMessage.ts`
134. **OpenAIEmbeddings** - Class - `packages\teams-ai\src\embeddings\OpenAIEmbeddings.ts`
135. **OpenAIModerator** - Class - `packages\teams-ai\src\moderators\OpenAIModerator.ts`
136. **flaggedInput** - Function - `packages\teams-ai\src\actions\FlaggedInput.ts`
137. **flaggedOutput** - Function - `packages\teams-ai\src\actions\FlaggedOutput.ts`
138. **doCommand** - Function - `packages\teams-ai\src\actions\DoCommand.ts`
139. **MemoryFork** - Class - `packages\teams-ai\src\MemoryFork.ts`
140. **CompletionConfig** - Interface - `packages\teams-ai\src\types\CompletionConfig.ts`
141. **TeamsSsoAdaptiveCardAuthentication** - Class - `packages\teams-ai\src\authentication\TeamsSsoAdaptiveCardAuthentication.ts`
142. **PromptSectionBase** - Abstract Class - `packages\teams-ai\src\prompts\PromptSectionBase.ts`
143. **OAuthBotAuthentication** - Class - `packages\teams-ai\src\authentication\OAuthBotAuthentication.ts`
144. **TeamsSsoMessageExtensionAuthentication** - Class - `packages\teams-ai\src\authentication\TeamsSsoMessageExtensionAuthentication.ts`
145. **TeamsAdapter** - Class - `packages\teams-ai\src\TeamsAdapter.ts`
146. **TeamsSsoBotAuthentication** - Class - `packages\teams-ai\src\authentication\TeamsSsoBotAuthentication.ts`
147. **TestPlanner** - Class - `packages\teams-ai\src\internals\testing\TestPlanner.ts`
