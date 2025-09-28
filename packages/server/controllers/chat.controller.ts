import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.service';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is Required')
      .max(100, 'Prompt is too long(max 100 characters)'),
   conversationId: z.string().optional(),
});

export const ChatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatSchema.safeParse(req.body);

      if (!parseResult.success) {
         return res.status(400).json(parseResult.error.format());
      }

      try {
         const { prompt, conversationId = 'default' } = parseResult.data;

         const response = await chatService.sendMessage(prompt, conversationId);

         return res.status(200).json({ message: response.message });
      } catch (error: any) {
         console.error('Controller error:', error);
         return res
            .status(500)
            .json({
               error: 'Failed to generate response',
               details: error.message,
            });
      }
   },
};
