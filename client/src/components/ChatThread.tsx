import { RefObject } from "react";
import { AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatThreadProps {
  messages: Message[];
  isStreaming?: boolean;
  bottomRef: RefObject<HTMLDivElement>;
}

import ChatMessage from "./ChatMessage";

export default function ChatThread({ messages, isStreaming, bottomRef }: ChatThreadProps) {
  return (
    <div className="space-y-6 py-2">
      {messages.map((message, index) => (
        <ChatMessage 
          key={index} 
          {...message} 
          isStreaming={isStreaming && index === messages.length - 1} 
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}