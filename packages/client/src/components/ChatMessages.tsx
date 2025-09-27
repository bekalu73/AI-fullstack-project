import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

type Message = {
   content: string;
   isUser: boolean;
   isError?: boolean;
};

type ChatMessagesProps = {
   messages: Message[];
   isTyping: boolean;
   copiedIndex: number | null;
   onCopy: (text: string, index: number) => void;
};

const ChatMessages = ({
   messages,
   isTyping,
   copiedIndex,
   onCopy,
}: ChatMessagesProps) => {
   const messagesEndRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages, isTyping]);

   return (
      <div className="flex-1 p-6 pb-32 overflow-y-auto space-y-6">
         {messages.map((message, index) => (
            <ChatMessage
               key={index}
               message={message}
               index={index}
               copiedIndex={copiedIndex}
               onCopy={onCopy}
            />
         ))}
         {isTyping && <TypingIndicator />}
         <div ref={messagesEndRef} />
      </div>
   );
};

export default ChatMessages;
