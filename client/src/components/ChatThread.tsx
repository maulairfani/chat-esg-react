import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative h-full overflow-y-auto">
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

      <AnimatePresence>
        {showScrollButton && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 right-8"
          >
            <Button
              size="icon"
              className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
              onClick={scrollToBottom}
            >
              <ArrowDown className="h-4 w-4 text-primary-foreground" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}