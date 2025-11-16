"use client";
import Link from "next/link";
import { Conversation } from "@/utils/types";
import { FC, useState } from "react";
import { ArrowRight } from "lucide-react";

interface ChatSelectProps {
  chats: Conversation[];
}

const ChatSelect: FC<ChatSelectProps> = ({ chats }) => {
  const [selectedChat, setSelectedChat] = useState<string>("");
  return (
    <div className="flex flex-row gap-2">
      <select
        value={selectedChat}
        onChange={(e) => setSelectedChat(e.target.value)}
      >
        {chats.map((chat) => (
          <option key={chat.id} value={chat.id}>
            {chat.title}
          </option>
        ))}
      </select>
      <Link href={`/${selectedChat}`}>
        <ArrowRight />
      </Link>
    </div>
  );
};

export default ChatSelect;
