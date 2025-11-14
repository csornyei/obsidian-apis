"use client";

import ChatTextInput from "@/components/chat/inputs/input";
import SendButton from "./sendButton";
import { useState } from "react";

interface InputsContainerProps {
  sendMessage: (msg: string) => void;
}

export default function InputsContainer({ sendMessage }: InputsContainerProps) {
  const [message, setMessage] = useState("");

  return (
    <form>
      <div className="flex flex-row gap-4 justify-self-end">
        <ChatTextInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        <SendButton
          sendMessage={() => {
            if (message.trim() === "") return;
            sendMessage(message);
            setMessage("");
          }}
        />
      </div>
    </form>
  );
}
