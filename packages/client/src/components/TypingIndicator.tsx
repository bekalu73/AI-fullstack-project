const TypingIndicator = () => {
   return (
      <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
         <div className="max-w-[85%] p-5 rounded-3xl bg-white text-gray-800 mr-16 border border-gray-100 shadow-sm">
            <div className="flex space-x-1.5">
               <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
               <div
                  className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.15s' }}
               ></div>
               <div
                  className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.3s' }}
               ></div>
            </div>
         </div>
      </div>
   );
};

export default TypingIndicator;
