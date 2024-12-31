interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatThreadProps {
  messages: Message[];
  isStreaming?: boolean;
}

import ChatMessage from "./ChatMessage";

export default function ChatThread({ messages, isStreaming }: ChatThreadProps) {
  return (
    <div className="space-y-6 py-2">
      {messages.map((message, index) => (
        <ChatMessage 
          key={index} 
          {...message} 
          isStreaming={isStreaming && index === messages.length - 1} 
        />
      ))}
    </div>
  );
}