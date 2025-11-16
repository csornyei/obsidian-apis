"use client";
import { useState } from "react";

import InputsContainer from "@/components/chat/inputs/container";
import MessagesContainer from "@/components/chat/messages/container";

import { Message } from "@/utils/types";
import { sendChatMessage } from "@/utils/local";

interface ChatContainerProps {
  conversationId?: string | null;
  chatHistory?: Message[];
}

export default function ChatContainer({
  conversationId = null,
  chatHistory = [],
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(chatHistory);

  const sendMessage = async (msg: string) => {
    console.log("Sending message:", msg);

    setMessages((prev) => [...prev, { role: "user", content: msg }]);

    await sendChatMessage(conversationId, msg);
  };

  return (
    <div className="mx-4 flex h-full w-full flex-col gap-8">
      <MessagesContainer messages={messages} />
      <InputsContainer sendMessage={sendMessage} />
    </div>
  );
}
