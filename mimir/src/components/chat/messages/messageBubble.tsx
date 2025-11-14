import { Message } from "@/utils/types";

interface MessageProps {
  message: Message;
}

export default function MessageBubble({
  message: { author, content },
}: MessageProps) {
  if (author === "user") {
    return (
      <div className="mb-2 flex justify-end">
        <div className="max-w-3/8 min-w-lg rounded bg-blue-500 p-2 text-white">
          <pre>{content}</pre>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-2 flex justify-start">
        <div className="max-w-3/8 min-w-lg rounded bg-zinc-200 p-2 text-zinc-800">
          <pre>{content}</pre>
        </div>
      </div>
    );
  }
}
