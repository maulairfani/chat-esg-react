import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Bot, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Source {
  url: string;
  page?: string;
  snippet: string;
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  sources?: Source[];
}

export default function ChatMessage({ role, content, isStreaming, sources }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 py-4",
        role === "user" ? "flex-row-reverse" : "flex-row"
      )}
    >
      {role === "assistant" && (
        <Avatar 
          className="h-8 w-8 shrink-0 bg-primary/10 transition-transform hover:scale-110 rounded-xl"
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
            "inline-block rounded-3xl px-4 py-3 text-sm shadow-md transition-all duration-200",
            role === "assistant" 
              ? "bg-gradient-to-br from-muted/50 via-muted/30 to-muted/10" 
              : "bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70 text-primary-foreground"
          )}
        >
          {content}
        </motion.div>
        {role === "assistant" && !isStreaming && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-1"
          >
            {sources && sources.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs font-medium transition-colors hover:bg-muted/50 rounded-lg"
                  >
                    Sources ({sources.length})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 rounded-xl">
                  <div className="space-y-4">
                    {sources.map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {new URL(source.url).hostname}
                          </a>
                          {source.page && (
                            <span className="text-xs text-muted-foreground">
                              Page {source.page}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {source.snippet}
                        </p>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 transition-colors hover:bg-muted/50 rounded-lg"
            >
              <Copy className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 transition-colors hover:bg-muted/50 rounded-lg"
            >
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 transition-colors hover:bg-muted/50 rounded-lg"
            >
              <ThumbsDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}