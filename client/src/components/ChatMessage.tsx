import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Bot, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
      {role === "assistant" && (
        <Avatar 
          className="h-8 w-8 shrink-0 bg-primary/10"
        >
          <Bot className="h-5 w-5 text-primary" />
        </Avatar>
      )}
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
        {role === "assistant" && (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Copy className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ThumbsDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}