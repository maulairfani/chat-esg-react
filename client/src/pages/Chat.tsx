import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/Sidebar";
import ChatThread from "@/components/ChatThread";
import ChatInput from "@/components/ChatInput";
import { mockChats } from "@/lib/mockData";

export default function Chat() {
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const simulateStreamingResponse = async (message: string) => {
    setIsStreaming(true);

    // Add user message immediately
    const updatedMessages = [...activeChat.messages, { role: "user" as const, content: message }];
    setActiveChat(prev => ({
      ...prev,
      messages: updatedMessages
    }));

    // Simulate streaming by adding the assistant message with empty content
    const streamingMessage = { role: "assistant" as const, content: "" };
    setActiveChat(prev => ({
      ...prev,
      messages: [...updatedMessages, streamingMessage]
    }));

    // Simulate streaming response
    const response = "This is a simulated streaming response that appears gradually...";
    let streamedContent = "";

    for (let i = 0; i < response.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50)); // Adjust speed as needed
      streamedContent += response[i];

      setActiveChat(prev => ({
        ...prev,
        messages: [
          ...updatedMessages,
          { role: "assistant", content: streamedContent }
        ]
      }));
    }

    setIsStreaming(false);
  };

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={20}
          minSize={15}
          maxSize={25}
          className="hidden md:block"
        >
          <Sidebar
            chats={mockChats}
            activeChat={activeChat}
            onSelectChat={setActiveChat}
          />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-border" />
        <ResizablePanel defaultSize={80}>
          <div className="flex h-screen flex-col">
            <ScrollArea className="flex-1 px-8 py-4">
              <ChatThread messages={activeChat.messages} isStreaming={isStreaming} />
            </ScrollArea>
            <div className="border-t p-4">
              <div className="max-w-3xl mx-auto px-4">
                <ChatInput
                  onSend={simulateStreamingResponse}
                  disabled={isStreaming}
                />
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}