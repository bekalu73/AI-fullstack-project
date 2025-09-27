import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';
import { useForm } from 'react-hook-form';

type FormData = {
   prompt: string;
};

type ChatInputProps = {
   onSubmit: (prompt: string) => void;
   isTyping: boolean;
};

const ChatInput = ({ onSubmit, isTyping }: ChatInputProps) => {
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const handleFormSubmit = ({ prompt }: FormData) => {
      onSubmit(prompt);
      reset();
   };

   return (
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm border-t border-gray-100">
         <div className="max-w-4xl mx-auto">
            <form
               onSubmit={handleSubmit(handleFormSubmit)}
               className="flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
               <textarea
                  {...register('prompt', {
                     required: true,
                     validate: (data) => data.trim().length > 0,
                  })}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(handleFormSubmit)();
                     }
                  }}
                  className="w-full resize-none p-4 min-h-[52px] max-h-32 text-gray-800 placeholder-gray-500 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
                  placeholder="Type your message here..."
                  rows={1}
                  maxLength={1000}
               />
               <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                     Press Enter to send, Shift+Enter for new line
                  </div>
                  <Button
                     disabled={!formState.isValid || isTyping}
                     size="sm"
                     className="h-11 w-11 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <ArrowUp className="h-5 w-5 text-white" />
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ChatInput;
