"use client";

interface ChatTextInputProps {
  message: string;
  setMessage: (msg: string) => void;
  sendMessage?: (msg: string) => void;
}

export default function ChatTextInput({
  message,
  setMessage,
  sendMessage,
}: ChatTextInputProps) {
  return (
    <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          if (message.trim() === "") return;
          e.preventDefault();

          if (sendMessage) {
            sendMessage(message);
          }
          setMessage("");
        }
      }}
      className="w-full rounded-lg border border-zinc-900 bg-zinc-950 p-4 shadow-xl shadow-zinc-700"
      rows={5}
      placeholder="Type your message..."
    />
  );
}
