import { Button } from './ui/button';
import { ArrowUp, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';

type FormData = {
   prompt: string;
};

type ChatInputProps = {
   onSubmit: (prompt: string) => void;
   isTyping: boolean;
};

const ChatInput = ({ onSubmit, isTyping }: ChatInputProps) => {
   const { register, handleSubmit, reset, watch, formState } =
      useForm<FormData>();
   const prompt = watch('prompt', '');

   const handleFormSubmit = ({ prompt }: FormData) => {
      if (prompt.trim()) {
         onSubmit(prompt);
         reset();
      }
   };

   return (
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-sm border-t border-gray-200/50">
         <div className="max-w-4xl mx-auto">
            <form
               onSubmit={handleSubmit(handleFormSubmit)}
               className="relative flex items-end gap-3 p-3 bg-white rounded-2xl border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-200 focus-within:border-blue-500 focus-within:shadow-2xl"
            >
               <div className="flex-1 relative">
                  <textarea
                     {...register('prompt', {
                        required: true,
                        validate: (data) => data.trim().length > 0,
                     })}
                     onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                           e.preventDefault();
                           if (prompt.trim() && !isTyping) {
                              handleSubmit(handleFormSubmit)();
                           }
                        }
                     }}
                     className="w-full resize-none min-h-[20px] max-h-32 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0 pr-10 text-sm leading-5"
                     placeholder="Ask me anything about GERD..."
                     rows={1}
                     maxLength={2000}
                     disabled={isTyping}
                  />
                  {isTyping && (
                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="flex space-x-1">
                           <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                           <div
                              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: '0.1s' }}
                           ></div>
                           <div
                              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: '0.2s' }}
                           ></div>
                        </div>
                     </div>
                  )}
               </div>
               <Button
                  type="submit"
                  disabled={!formState.isValid || isTyping || !prompt.trim()}
                  size="sm"
                  className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white border-0 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
               >
                  <ArrowUp className="h-4 w-4" />
               </Button>
            </form>
            <div className="flex items-center justify-center gap-2 mt-2">
               <Sparkles className="h-3 w-3 text-gray-400" />
               <div className="text-xs text-gray-500 text-center">
                  GERD AI Assistant • Can make mistakes • Check important info
               </div>
            </div>
         </div>
      </div>
   );
};

export default ChatInput;
