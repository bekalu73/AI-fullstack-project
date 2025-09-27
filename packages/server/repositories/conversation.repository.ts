//Implementation Detail
const conversations = new Map<string, string>();

//Export Public Interface

export const constconversationRepository = {
   getLastResponseId(conversationId: string) {
      return conversations.get(conversationId);
   },
   setLastResponseId(conversationId: string, responseId: string) {
      return conversations.set(conversationId, responseId);
   },
};
