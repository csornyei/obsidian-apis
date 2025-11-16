import { Message } from "@/utils/types";

interface MessageProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageProps) {
  console.log(message);
  if (message.role === "user") {
    return (
      <div className="mb-2 flex justify-end">
        <div className="max-w-3/8 min-w-lg rounded bg-blue-500 p-2 text-white">
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-2 flex justify-start">
        <div className="max-w-3/8 min-w-lg rounded bg-zinc-200 p-2 text-zinc-800">
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
      </div>
    );
  }
}
