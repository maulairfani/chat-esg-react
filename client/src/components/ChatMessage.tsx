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
        "flex gap-3",
        role === "user" ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar 
        className={cn(
          "h-8 w-8 shrink-0",
          role === "assistant" ? "bg-primary/10" : "bg-primary/90"
        )}
      >
        {role === "assistant" ? (
          <Bot className="h-5 w-5 text-primary" />
        ) : (
          <User className="h-5 w-5 text-primary-foreground" />
        )}
      </Avatar>
      <div 
        className={cn(
          "flex-1 space-y-2 overflow-hidden px-1",
          role === "user" ? "text-right" : "text-left"
        )}
      >
        <motion.div 
          initial={isStreaming ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          className={cn(
            "inline-block rounded-lg px-4 py-2 text-sm shadow-sm",
            role === "assistant" 
              ? "bg-gradient-to-br from-muted/50 to-muted border border-muted/20" 
              : "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
          )}
        >
          {content}
        </motion.div>
      </div>
    </div>
  );
}