import { Send } from "lucide-react";

interface SendButtonProps {
  sendMessage: () => void;
}

export default function SendButton({ sendMessage }: SendButtonProps) {
  return (
    <button
      className="cursor-pointer self-end rounded-full bg-zinc-600 p-4 text-zinc-50 shadow-md shadow-zinc-900 transition hover:bg-zinc-700 active:translate-y-1 active:scale-95"
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <Send className="h-8 w-8" />
    </button>
  );
}
