import { Bot, MessageSquare, Plus, X } from 'lucide-react';
import { Button } from './ui/button';

type Conversation = {
   id: string;
   title: string;
   lastMessage: string;
   timestamp: Date;
};

type SidebarProps = {
   conversations: Conversation[];
   activeConversationId: string;
   onNewChat: () => void;
   onSelectConversation: (id: string) => void;
   isOpen: boolean;
   onToggle: () => void;
};

const Sidebar = ({
   conversations,
   activeConversationId,
   onNewChat,
   onSelectConversation,
   isOpen,
   onToggle,
}: SidebarProps) => {
   return (
      <>
         {/* Mobile overlay */}
         {isOpen && (
            <div
               className="fixed inset-0 bg-black/50 z-40 md:hidden"
               onClick={onToggle}
            />
         )}

         {/* Sidebar */}
         <div
            className={`fixed left-0 top-0 h-full gradient-sidebar text-white transition-transform duration-300 z-50 ${
               isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 md:relative md:z-auto w-64 flex flex-col shadow-2xl`}
         >
            {/* Header */}
            <div className="p-4 border-b border-gray-600/50">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Bot className="h-5 w-5" />
                     </div>
                     <h2 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        GERD Assistant
                     </h2>
                  </div>
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={onToggle}
                     className="md:hidden text-gray-400 hover:text-white hover:bg-gray-700/50"
                  >
                     <X className="h-5 w-5" />
                  </Button>
               </div>
               <Button
                  onClick={onNewChat}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
               >
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
               </Button>
            </div>

            {/* Chat history */}
            <div className="flex-1 overflow-y-auto p-3">
               {conversations.length === 0 ? (
                  <div className="text-gray-400 text-sm text-center mt-8 p-4">
                     <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                     <p>No conversations yet</p>
                     <p className="text-xs mt-2">Start a new chat to begin!</p>
                  </div>
               ) : (
                  <div className="space-y-2">
                     {conversations.map((conversation) => (
                        <button
                           key={conversation.id}
                           onClick={() => onSelectConversation(conversation.id)}
                           className={`w-full text-left p-3 rounded-xl transition-all duration-200 group border ${
                              activeConversationId === conversation.id
                                 ? 'bg-gray-700/50 border-gray-500 shadow-lg'
                                 : 'border-transparent hover:bg-gray-700/30 hover:border-gray-600'
                           }`}
                        >
                           <div className="flex items-start gap-3">
                              <MessageSquare className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0 group-hover:text-white" />
                              <div className="flex-1 min-w-0">
                                 <div className="text-sm font-medium truncate text-white">
                                    {conversation.title}
                                 </div>
                                 <div className="text-xs text-gray-400 truncate mt-1 group-hover:text-gray-300">
                                    {conversation.lastMessage}
                                 </div>
                                 <div className="text-xs text-gray-500 mt-1">
                                    {conversation.timestamp.toLocaleDateString()}
                                 </div>
                              </div>
                           </div>
                        </button>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default Sidebar;
