import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/Sidebar";
import ChatThread from "@/components/ChatThread";
import ChatInput from "@/components/ChatInput";
import { mockChats } from "@/lib/mockData";

function App() {
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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
    <div className="flex h-screen w-full bg-background">
      <Sidebar
        chats={mockChats}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        onCollapse={setIsSidebarCollapsed}
      />
      <main className={`flex-1 flex flex-col transition-all duration-300`}>
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="mx-auto max-w-3xl">
            <ChatThread messages={activeChat.messages} isStreaming={isStreaming} />
          </div>
        </ScrollArea>
        <div className="border-t bg-background p-4">
          <div className="mx-auto max-w-3xl px-4">
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