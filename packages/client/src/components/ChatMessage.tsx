import { Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
         className={`group w-full ${
            message.isUser
               ? 'bg-gradient-to-r from-blue-50 to-indigo-50'
               : 'bg-white'
         } ${!message.isUser ? 'shadow-sm' : ''}`}
      >
         <div className="max-w-4xl mx-auto px-4 py-6 flex gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
               <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shadow-lg ${
                     message.isUser
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  }`}
               >
                  {message.isUser ? 'You' : 'AI'}
               </div>
            </div>

            {/* Message content */}
            <div className="flex-1 min-w-0 relative">
               <div
                  className={`prose prose-sm max-w-none break-words pr-16 ${
                     message.isError ? 'text-red-600' : 'text-gray-900'
                  } ${message.isUser ? 'prose-blue' : 'prose-gray'}`}
               >
                  {/* Copy button for AI messages - positioned at top right */}
                  {!message.isUser && !message.isError && (
                     <button
                        onClick={() => onCopy(message.content, index)}
                        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md border border-gray-200 bg-white shadow-sm"
                     >
                        {copiedIndex === index ? (
                           <>
                              <Check className="h-3 w-3" />
                              Copied
                           </>
                        ) : (
                           <>
                              <Copy className="h-3 w-3" />
                              Copy
                           </>
                        )}
                     </button>
                  )}
                  <ReactMarkdown
                     components={{
                        code({ className, children, ...props }: any) {
                           const match = /language-(\w+)/.exec(className || '');
                           const code = String(children).replace(/\n$/, '');
                           const isInline = !match;

                           if (!isInline && match) {
                              return (
                                 <div className="relative my-2">
                                    <SyntaxHighlighter
                                       style={oneDark as any}
                                       language={match[1]}
                                       PreTag="div"
                                       className="rounded-lg text-sm"
                                    >
                                       {code}
                                    </SyntaxHighlighter>
                                    <button
                                       onClick={() =>
                                          navigator.clipboard.writeText(code)
                                       }
                                       className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-2 py-1 rounded text-xs transition-colors"
                                    >
                                       Copy
                                    </button>
                                 </div>
                              );
                           }

                           return (
                              <code
                                 className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono text-gray-800 border"
                                 {...props}
                              >
                                 {children}
                              </code>
                           );
                        },
                        p: ({ children }) => (
                           <p className="mb-3 leading-relaxed">{children}</p>
                        ),
                        ul: ({ children }) => (
                           <ul className="mb-3 space-y-1 list-disc list-inside">
                              {children}
                           </ul>
                        ),
                        ol: ({ children }) => (
                           <ol className="mb-3 space-y-1 list-decimal list-inside">
                              {children}
                           </ol>
                        ),
                        li: ({ children }) => (
                           <li className="ml-2">{children}</li>
                        ),
                        h1: ({ children }) => (
                           <h1 className="text-xl font-bold mb-3 mt-4 text-gray-800">
                              {children}
                           </h1>
                        ),
                        h2: ({ children }) => (
                           <h2 className="text-lg font-bold mb-2 mt-3 text-gray-800">
                              {children}
                           </h2>
                        ),
                        h3: ({ children }) => (
                           <h3 className="text-base font-bold mb-2 mt-3 text-gray-800">
                              {children}
                           </h3>
                        ),
                        blockquote: ({ children }) => (
                           <blockquote className="border-l-4 border-blue-500 pl-4 my-3 text-gray-600 italic">
                              {children}
                           </blockquote>
                        ),
                        table: ({ children }) => (
                           <div className="overflow-x-auto my-3">
                              <table className="min-w-full border-collapse border border-gray-300">
                                 {children}
                              </table>
                           </div>
                        ),
                        th: ({ children }) => (
                           <th className="border border-gray-300 px-3 py-2 bg-gray-100 font-semibold">
                              {children}
                           </th>
                        ),
                        td: ({ children }) => (
                           <td className="border border-gray-300 px-3 py-2">
                              {children}
                           </td>
                        ),
                     }}
                  >
                     {message.content}
                  </ReactMarkdown>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ChatMessage;
