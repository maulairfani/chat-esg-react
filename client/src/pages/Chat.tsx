import { useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/Sidebar";
import ChatThread from "@/components/ChatThread";
import ChatInput from "@/components/ChatInput";
import CompanySelector from "@/components/CompanySelector";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockChats } from "@/lib/mockData";

function App() {
  const [chats, setChats] = useState(mockChats);
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      createdAt: new Date().toISOString(),
      messages: [],
    };

    setChats(prevChats => [newChat, ...prevChats]);
    setActiveChat(newChat);
  };

  const simulateStreamingResponse = async (message: string) => {
    setIsStreaming(true);

    // Add user message immediately
    const updatedMessages = [...activeChat.messages, { 
      role: "user" as const, 
      content: message 
    }];

    setActiveChat(prev => ({
      ...prev,
      messages: updatedMessages
    }));

    // Simulate streaming response
    const response = "This is a simulated streaming response that appears gradually...";
    const sampleSources = [
      {
        url: "https://example.com/article1",
        page: "5",
        snippet: "A relevant excerpt from the source document that supports this response."
      },
      {
        url: "https://example.com/article2",
        snippet: "Another supporting piece of evidence from a different source."
      }
    ];

    let streamedContent = "";

    for (let i = 0; i < response.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      streamedContent += response[i];

      setActiveChat(prev => ({
        ...prev,
        messages: [
          ...updatedMessages,
          { 
            role: "assistant", 
            content: streamedContent,
            sources: sampleSources
          }
        ]
      }));
    }

    setIsStreaming(false);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        onCollapse={setIsSidebarCollapsed}
        onNewChat={createNewChat}
      />
      <main className="flex-1 flex flex-col transition-all duration-300">
        <div className="border-b p-4 flex items-center justify-center">
          <CompanySelector value={selectedCompany} onChange={setSelectedCompany} />
        </div>
        <ScrollArea 
          className="flex-1 px-4 py-6"
          onScrollCapture={(e) => {
            const target = e.currentTarget;
            const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100;
            setShowScrollButton(!isNearBottom);
          }}
        >
          <div className="mx-auto max-w-3xl">
            {activeChat.messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <h1 className="text-2xl font-medium text-muted-foreground">
                  What can I help with?
                </h1>
              </div>
            ) : (
              <ChatThread 
                messages={activeChat.messages} 
                isStreaming={isStreaming} 
                bottomRef={bottomRef}
              />
            )}
          </div>
        </ScrollArea>
        <div className="border-t bg-background">
          <div className="mx-auto max-w-3xl px-4 py-2">
            <AnimatePresence>
              {showScrollButton && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mb-2 flex justify-center"
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
            <ChatInput
              onSend={simulateStreamingResponse}
              disabled={isStreaming}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;