import { getChatList, sendMessage } from "@/utils/chatApi";
import { Message } from "@/utils/types";

export async function GET() {
  const chatListResponse = await getChatList();

  if (!!chatListResponse) {
    console.log("Chat list response received:", chatListResponse);
    return new Response(JSON.stringify(chatListResponse), { status: 200 });
  }
  console.error("No chat list response received");
  return new Response("Failed to retrieve chat list", { status: 500 });
}

type PostBody = {
  chatId: string;
  message: Message;
};

export async function POST(req: Request) {
  try {
    const body: PostBody = await req.json();

    const { message, chatId } = body;

    console.log(`POST: chatId=${chatId}, message=${JSON.stringify(message)}`);

    const response = await sendMessage(chatId, message);

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return new Response("Failed to send message", { status: 500 });
  }
}
