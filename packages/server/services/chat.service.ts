import fs from 'fs';
import path from 'path';
import { constconversationRepository } from '../repositories/conversation.repository';

type GroqMessage = {
   role: string;
   content: string;
};

type GroqChoice = {
   message: GroqMessage;
};

type GroqResponse = {
   choices: GroqChoice[];
};

type ChatResponse = {
   id: string;
   message: string;
};

//Implementation Detail
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const template = fs.readFileSync(
   path.join(__dirname, '..', 'prompt', 'gerd.txt'),
   'utf-8'
);

const gerdInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompt', 'gerd.md'),
   'utf-8'
);

const instructions = template.replace('{{gerdInfo}}', gerdInfo);

// Store conversation history
const conversationHistory = new Map<
   string,
   Array<{ role: string; content: string }>
>();

async function queryGroq(prompt: string, conversationId: string) {
   // Get or create conversation history
   if (!conversationHistory.has(conversationId)) {
      conversationHistory.set(conversationId, []);
   }

   const history = conversationHistory.get(conversationId)!;

   // Build messages with system prompt and conversation history
   const messages = [
      {
         role: 'system',
         content: instructions,
      },
      ...history,
      {
         role: 'user',
         content: prompt,
      },
   ];

   const requestBody = {
      model: 'llama-3.1-8b-instant',
      messages: messages,
      max_tokens: Math.min(
         4000,
         8192 - messages.reduce((acc, msg) => acc + msg.content.length, 0) / 4
      ),
      temperature: 0.7,
      stop: null,
   };

   const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${GROQ_API_KEY}`,
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
   });

   if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
         `Groq API error: ${response.status} ${response.statusText} - ${errorText}`
      );
   }

   const result = (await response.json()) as GroqResponse;

   // Add user message and assistant response to history
   history.push({ role: 'user', content: prompt });
   history.push({
      role: 'assistant',
      content: result.choices[0]?.message?.content || '',
   });

   // Keep only last 10 messages to avoid token limits
   if (history.length > 10) {
      history.splice(0, history.length - 10);
   }

   return result;
}

//public Interface
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      try {
         const response = await queryGroq(prompt, conversationId);
         const responseId = Date.now().toString();

         constconversationRepository.setLastResponseId(
            conversationId,
            responseId
         );

         return {
            id: responseId,
            message:
               response.choices[0]?.message?.content ||
               'Sorry, I could not process your request.',
         };
      } catch (error) {
         console.error('Chat service error:', error);
         throw error;
      }
   },
};
