import ChatContainer from "@/components/chat/container";
import { getChatHistory } from "@/utils/chatApi";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ convoId: string }>;
}) {
  const { convoId } = await params;

  const history = await getChatHistory(convoId);

  console.log(history);

  return <ChatContainer conversationId={convoId} chatHistory={history} />;
}
