import { Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Message = {
   content: string;
   isUser: boolean;
   isError?: boolean;
};

type ChatMessageProps = {
   message: Message;
   index: number;
   copiedIndex: number | null;
   onCopy: (text: string, index: number) => void;
};

const ChatMessage = ({
   message,
   index,
   copiedIndex,
   onCopy,
}: ChatMessageProps) => {
   return (
      <div
         className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
      >
         <div
            className={`relative group max-w-[85%] p-5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 ${
               message.isUser
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-16 shadow-blue-100'
                  : message.isError
                    ? 'bg-red-50 text-red-800 mr-16 border border-red-200 shadow-red-100'
                    : 'bg-white text-gray-800 mr-16 border border-gray-100 shadow-gray-100'
            }`}
         >
            <ReactMarkdown>{message.content}</ReactMarkdown>
            {!message.isUser && (
               <button
                  onClick={() => onCopy(message.content, index)}
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 p-2.5 rounded-full bg-gradient-to-r from-gray-50 to-white backdrop-blur-sm shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300 hover:scale-110 active:scale-95"
               >
                  {copiedIndex === index ? (
                     <Check className="h-4 w-4 text-green-500" />
                  ) : (
                     <Copy className="h-4 w-4 text-gray-600 hover:text-gray-800" />
                  )}
               </button>
            )}
         </div>
      </div>
   );
};

export default ChatMessage;
