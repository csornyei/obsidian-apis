import ChatContainer from "@/components/chat/container";
import { getChatHistory, getConversationList } from "@/utils/chatApi";

export default async function Home() {
  const conversations = await getConversationList();

  if (conversations && conversations.length > 0) {
    const firstConvoId = conversations[0].id;

    const history = await getChatHistory(firstConvoId);
    return (
      <ChatContainer conversationId={firstConvoId} chatHistory={history} />
    );
  }

  return <ChatContainer />;
}
