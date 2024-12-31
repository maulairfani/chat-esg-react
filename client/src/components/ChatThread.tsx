import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatMessage from "./ChatMessage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatThreadProps {
  messages: Message[];
  isStreaming?: boolean;
}

export default function ChatThread({ messages, isStreaming }: ChatThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior, block: "end" });
    }
  };

  useEffect(() => {
    // Initial scroll to bottom
    scrollToBottom("auto");
  }, []);

  useEffect(() => {
    // Scroll to bottom on new messages
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Show button if not at bottom (with smaller threshold)
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex-1 h-full">
      <div 
        ref={containerRef}
        className="absolute inset-0 space-y-6 py-4 overflow-y-auto scroll-smooth"
      >
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            {...message} 
            isStreaming={isStreaming && index === messages.length - 1} 
          />
        ))}
        <div ref={bottomRef} className="h-px" />
      </div>

      <AnimatePresence>
        {showScrollButton && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 right-8 z-10"
          >
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg hover:bg-primary/90 transition-colors"
              onClick={() => scrollToBottom()}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}