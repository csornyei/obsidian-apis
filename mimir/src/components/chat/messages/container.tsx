import { Message } from "@/utils/types";
import MessageBubble from "./messageBubble";

interface MessagesContainerProps {
  messages: Message[];
}

export default function MessagesContainer({
  messages,
}: MessagesContainerProps) {
  return (
    <div className="min-h-1/2 flex-1 overflow-y-auto rounded-lg border-4 border-zinc-900 bg-zinc-950 p-4 shadow-xl shadow-zinc-700">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
    </div>
  );
}
