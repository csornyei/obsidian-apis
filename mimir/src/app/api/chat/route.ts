import { getConversationList, sendMessage } from "@/utils/chatApi";
import { Message } from "@/utils/types";

export async function GET() {
  const chatListResponse = await getConversationList();

  if (!!chatListResponse) {
    return new Response(JSON.stringify(chatListResponse), { status: 200 });
  }
  console.error("No chat list response received");
  return new Response("Failed to retrieve chat list", { status: 500 });
}

type PostBody = {
  message: Message;
};

export async function POST(req: Request) {
  try {
    const body: PostBody = await req.json();

    const { message } = body;

    console.log(
      `conversation_id=${message.conversation_id}, message=${JSON.stringify(message)}`,
    );

    const response = await sendMessage(message);

    if (!response) {
      console.error("No response from sendMessage");
      return new Response("Failed to send message", { status: 500 });
    }

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return new Response("Failed to send message", { status: 500 });
  }
}
