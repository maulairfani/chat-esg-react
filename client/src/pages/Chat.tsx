import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/Sidebar";
import ChatThread from "@/components/ChatThread";
import ChatInput from "@/components/ChatInput";
import DocumentSelector from "@/components/DocumentSelector";
import LoadingSteps from "@/components/LoadingSteps";
import { mockChats } from "@/lib/mockData";

function App() {
  const [chats, setChats] = useState(mockChats);
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [loadingStep, setLoadingStep] = useState(-1);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

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
    if (!selectedCompany || !selectedYear) return;

    setIsStreaming(true);
    setLoadingStep(0);

    // Add user message immediately
    const updatedMessages = [...activeChat.messages, { 
      role: "user" as const, 
      content: message 
    }];

    setActiveChat(prev => ({
      ...prev,
      messages: updatedMessages
    }));

    // Simulate the loading steps
    for (let step = 0; step < 3; step++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoadingStep(step + 1);
    }

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
    setLoadingStep(-1);
  };

  // Check if document is selected (both company and year)
  const isDocumentSelected = selectedCompany && selectedYear;

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
        <div className="border-b p-4">
          <div className="mx-auto max-w-3xl">
            <DocumentSelector
              company={selectedCompany}
              year={selectedYear}
              onCompanyChange={setSelectedCompany}
              onYearChange={setSelectedYear}
              className="w-full"
            />
          </div>
        </div>
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="mx-auto max-w-3xl">
            {activeChat.messages.length === 0 && (
              <div className="h-full flex items-center justify-center flex-col gap-4 py-12">
                {!isDocumentSelected ? (
                  <h1 className="text-2xl font-medium text-muted-foreground text-center">
                    Select a company and year to begin analysis
                  </h1>
                ) : (
                  <h1 className="text-2xl font-medium text-muted-foreground text-center">
                    What would you like to know about {selectedCompany}'s {selectedYear} sustainability report?
                  </h1>
                )}
              </div>
            )}
            {activeChat.messages.length > 0 && (
              <>
                <ChatThread messages={activeChat.messages} isStreaming={isStreaming} />
                {loadingStep >= 0 && <LoadingSteps currentStep={loadingStep} />}
              </>
            )}
          </div>
        </ScrollArea>
        <div className="border-t bg-background p-4">
          <div className="mx-auto max-w-3xl">
            <ChatInput
              onSend={simulateStreamingResponse}
              disabled={isStreaming || !isDocumentSelected}
              placeholder={!isDocumentSelected 
                ? "Select a company and year to analyze..." 
                : "Type your message..."}
            />
            <p className="text-xs text-muted-foreground text-center mt-2">
              Built with Llama. ChatESG can make mistakes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;