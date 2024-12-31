import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
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
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollButton(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Auto scroll on new messages
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-6 py-2 relative">
      <AnimatePresence>
        {showScrollButton && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="sticky bottom-4 w-full flex justify-center"
          >
            <Button
              variant="outline"
              size="sm"
              className="shadow-lg bg-background/95 backdrop-blur hover:bg-background/80 transition-all duration-200"
              onClick={scrollToBottom}
            >
              <ChevronDown className="h-4 w-4 mr-1" />
              Latest messages
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

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