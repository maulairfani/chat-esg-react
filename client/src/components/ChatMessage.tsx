import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export default function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
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
        <motion.p 
          initial={isStreaming ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          className="text-sm leading-relaxed"
        >
          {content}
        </motion.p>
      </div>
    </div>
  );
}