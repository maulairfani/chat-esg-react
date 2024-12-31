interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatThreadProps {
  messages: Message[];
}

import ChatMessage from "./ChatMessage";

export default function ChatThread({ messages }: ChatThreadProps) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} {...message} />
      ))}
    </div>
  );
}
