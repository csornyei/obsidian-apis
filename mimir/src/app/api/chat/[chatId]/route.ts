import { getChatHistory } from "@/utils/chatApi";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/chat/[chatId]">,
) {
  const { chatId } = await ctx.params;

  const chatHistory = await getChatHistory(chatId);

  if (chatHistory) {
    return new Response(JSON.stringify(chatHistory), { status: 200 });
  }
  console.error("No chat history response received");
  return new Response("Failed to retrieve chat history", { status: 500 });
}
