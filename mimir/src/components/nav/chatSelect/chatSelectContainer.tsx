import Link from "next/link";
import { getConversationList } from "@/utils/chatApi";

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
        <ul>
          {chatList.map((conversation) => (
            <li key={conversation.id}>
              <Link href={`/${conversation.id}`}>{conversation.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
