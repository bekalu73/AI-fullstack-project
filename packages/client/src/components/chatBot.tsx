import axios from 'axios';
import { useRef, useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

type MessageResponse = {
   message: string;
};

type Message = {
   content: string;
   isUser: boolean;
   isError?: boolean;
};

const ChatBot = () => {
   const conversationId = useRef(crypto.randomUUID());
   const [messages, setMessages] = useState<Message[]>([]);
   const [isTyping, setIsTyping] = useState(false);
   const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
   const [error, setError] = useState<string>('');

   const copyToClipboard = async (text: string, index: number) => {
      try {
         await navigator.clipboard.writeText(text);
         setCopiedIndex(index);
         setTimeout(() => setCopiedIndex(null), 2000);
      } catch (err) {
         console.error('Failed to copy text:', err);
      }
   };

   const handleSubmit = async (prompt: string) => {
      setError('');
      setMessages((prev) => [...prev, { content: prompt, isUser: true }]);
      setIsTyping(true);

      try {
         const { data } = await axios.post<MessageResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });

         setMessages((prev) => [
            ...prev,
            { content: data.message, isUser: false },
         ]);
      } catch (err: any) {
         const errorMessage =
            err.response?.data?.message ||
            'Sorry, I encountered an error while processing your request. Please try again.';

         setMessages((prev) => [
            ...prev,
            { content: errorMessage, isUser: false, isError: true },
         ]);
      } finally {
         setIsTyping(false);
      }
   };

   return (
      <div className="flex flex-col h-full max-w-4xl mx-auto bg-gradient-to-b from-gray-50 to-white">
         <ChatMessages
            messages={messages}
            isTyping={isTyping}
            copiedIndex={copiedIndex}
            onCopy={copyToClipboard}
         />
         <ChatInput onSubmit={handleSubmit} isTyping={isTyping} />
      </div>
   );
};

export default ChatBot;
