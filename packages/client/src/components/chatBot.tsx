import axios from 'axios';
import { useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import Sidebar from './Sidebar';
import { Button } from './ui/button';

type MessageResponse = {
   message: string;
};

type Message = {
   content: string;
   isUser: boolean;
   isError?: boolean;
};

type Conversation = {
   id: string;
   title: string;
   lastMessage: string;
   timestamp: Date;
   messages: Message[];
};

const ChatBot = () => {
   const [conversations, setConversations] = useState<Conversation[]>([]);
   const [activeConversationId, setActiveConversationId] = useState<string>('');
   const [messages, setMessages] = useState<Message[]>([]);
   const [isTyping, setIsTyping] = useState(false);
   const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const conversationId = useRef<string>(crypto.randomUUID());

   const copyToClipboard = async (text: string, index: number) => {
      try {
         await navigator.clipboard.writeText(text);
         setCopiedIndex(index);
         setTimeout(() => setCopiedIndex(null), 2000);
      } catch (err) {
         console.error('Failed to copy text:', err);
      }
   };

   const createNewChat = () => {
      // Save current conversation if it has messages
      if (messages.length > 0) {
         const newConversation: Conversation = {
            id: conversationId.current,
            title: messages[0]?.content.slice(0, 50) + '...' || 'New Chat',
            lastMessage:
               messages[messages.length - 1]?.content.slice(0, 100) + '...' ||
               '',
            timestamp: new Date(),
            messages: [...messages],
         };
         setConversations((prev) => [newConversation, ...prev]);
      }

      // Reset for new chat
      conversationId.current = crypto.randomUUID();
      setActiveConversationId('');
      setMessages([]);
      setSidebarOpen(false);
   };

   const selectConversation = (id: string) => {
      const conversation = conversations.find((c) => c.id === id);
      if (conversation) {
         conversationId.current = id;
         setActiveConversationId(id);
         setMessages(conversation.messages);
         setSidebarOpen(false);
      }
   };

   const handleSubmit = async (prompt: string) => {
      const userMessage: Message = { content: prompt, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      try {
         const { data } = await axios.post<MessageResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });

         const aiMessage: Message = {
            content: data.message,
            isUser: false,
         };

         setMessages((prev) => [...prev, aiMessage]);
      } catch (err: any) {
         const errorMessage =
            err.response?.data?.message ||
            'Sorry, I encountered an error while processing your request. Please try again.';

         const errorResponse: Message = {
            content: errorMessage,
            isUser: false,
            isError: true,
         };

         setMessages((prev) => [...prev, errorResponse]);
      } finally {
         setIsTyping(false);
      }
   };

   return (
      <div className="flex h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
         <Sidebar
            conversations={conversations}
            activeConversationId={activeConversationId}
            onNewChat={createNewChat}
            onSelectConversation={selectConversation}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
         />

         <div className="flex-1 flex flex-col bg-white/95 backdrop-blur-sm">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-4 flex items-center gap-3">
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden hover:bg-gray-100/50"
               >
                  <Menu className="h-5 w-5" />
               </Button>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                     <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <h1 className="text-lg font-semibold text-gray-800">
                     {messages.length === 0 ? 'New Chat' : 'GERD Assistant'}
                  </h1>
               </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
               {messages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center p-4">
                     <div className="text-center max-w-2xl">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                           <span className="text-white text-2xl font-bold">
                              AI
                           </span>
                        </div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                           Welcome to GERD!
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                           I'm your AI assistant for the Ethiopian Great
                           Renaissance Dam. Ask me about construction, capacity,
                           benefits, and more!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                           <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
                              🏗️ Construction
                           </div>
                           <div className="bg-purple-50 rounded-lg p-3 text-sm text-purple-700">
                              ⚡ Energy
                           </div>
                           <div className="bg-pink-50 rounded-lg p-3 text-sm text-pink-700">
                              💧 Water
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <ChatMessages
                     messages={messages}
                     isTyping={isTyping}
                     copiedIndex={copiedIndex}
                     onCopy={copyToClipboard}
                  />
               )}
               <ChatInput onSubmit={handleSubmit} isTyping={isTyping} />
            </div>
         </div>
      </div>
   );
};

export default ChatBot;
