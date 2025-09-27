import OpenAI from 'openai';
import { constconversationRepository } from '../repositories/conversation.repository';

//Implementation Detail
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

type ChatResponse = {
   id: string;
   message: string;
};

//public Interface
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         previous_response_id:
            constconversationRepository.getLastResponseId(conversationId),
      });

      constconversationRepository.setLastResponseId(
         conversationId,
         response.id
      );
      return {
         id: response.id,
         message: response.output_text,
      };
   },
};
