import { Provide } from '@midwayjs/decorator';
import { ChatOpenAI } from '@langchain/openai';
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableWithMessageHistory } from '@langchain/core/runnables';
import { OptionsType } from '../interface';
const messageHistories: Record<string, InMemoryChatMessageHistory> = {};
@Provide()
export class UserService {
  async getUserToChat(options: OptionsType) {
    const model = new ChatOpenAI({
      model: 'gpt-3.5-turbo',
      configuration: {
        baseURL: '',
        apiKey: '',
      },
    });
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are a helpful assistant who remembers all details the user shares with you.`,
      ],
      ['placeholder', '{chat_history}'],
      ['human', '{input}'],
    ]);
    const chain = prompt.pipe(model);
    const withMessageHistory = new RunnableWithMessageHistory({
      runnable: chain,
      getMessageHistory: async sessionId => {
        console.log('messageHistories', messageHistories, sessionId);
        if (messageHistories[sessionId] === undefined) {
          messageHistories[sessionId] = new InMemoryChatMessageHistory();
        }
        messageHistories[sessionId];
        return messageHistories[sessionId];
      },
      inputMessagesKey: 'input',
      historyMessagesKey: 'chat_history',
    });
    const config = {
      configurable: {
        sessionId: 'botchat01',
      },
    };
    const res = await withMessageHistory.invoke(
      {
        input: options.input,
      },
      config
    );
    return {
      aiMessage: res.content,
    };
  }
}
