import { getConversationList } from "@/utils/chatApi";
import ChatSelect from "./chatSelect";

async function getPreviousConversations() {
  try {
    const chatList = await getConversationList();

    if (!chatList) {
      return [];
    }

    return chatList;
  } catch (error) {
    console.error("Error fetching chat list:", error);
    return [];
  }
}

export default async function ChatSelectContainer() {
  const chatList = await getPreviousConversations();

  return (
    <div>
      {chatList.length === 0 ? (
        <p>No chats available.</p>
      ) : (
        <ChatSelect chats={chatList} />
      )}
    </div>
  );
}
