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
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      // Smooth scroll to bottom when new messages arrive or typing starts/stops
      messagesEndRef.current?.scrollIntoView({
         behavior: 'smooth',
         block: 'end',
      });
   }, [messages, isTyping]);

   return (
      <div ref={containerRef} className="flex-1 overflow-y-auto scroll-smooth">
         <div className="max-w-4xl mx-auto px-4 py-6 space-y-1">
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
            <div ref={messagesEndRef} className="h-4" />
         </div>
      </div>
   );
};

export default ChatMessages;
