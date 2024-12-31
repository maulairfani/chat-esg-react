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
            <ScrollArea className="flex-1 p-4">
              <ChatThread messages={activeChat.messages} />
            </ScrollArea>
            <div className="border-t p-4">
              <ChatInput
                onSend={(message) => {
                  const updatedChat = {
                    ...activeChat,
                    messages: [
                      ...activeChat.messages,
                      { role: "user", content: message },
                      { role: "assistant", content: "This is a mock response." },
                    ],
                  };
                  setActiveChat(updatedChat);
                }}
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
