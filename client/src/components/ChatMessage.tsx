import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        role === "assistant" ? "bg-muted" : "bg-background"
      )}
    >
      <Avatar className={cn(role === "assistant" ? "bg-primary" : "bg-secondary")}>
        {role === "assistant" ? (
          <Bot className="h-5 w-5" />
        ) : (
          <User className="h-5 w-5" />
        )}
      </Avatar>
      <div className="flex-1">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
