"use client";
import { useEffect, useState } from "react";

import InputsContainer from "@/components/chat/inputs/container";
import MessagesContainer from "@/components/chat/messages/container";

import { Message } from "@/utils/types";
import { getChatMessages, sendChatMessage } from "@/utils/local";

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    (async () => {
      const messageHistory = await getChatMessages("defaultChatId");

      console.log("Fetched message history:", messageHistory);

      setMessages(messageHistory);
    })();
  }, []);

  const sendMessage = async (msg: string) => {
    console.log("Sending message:", msg);

    setMessages((prev) => [...prev, { author: "user", content: msg }]);

    await sendChatMessage("defaultChatId", msg);
  };

  return (
    <div className="mx-4 flex h-full w-full flex-col gap-8">
      <MessagesContainer messages={messages} />
      <InputsContainer sendMessage={sendMessage} />
    </div>
  );
}
