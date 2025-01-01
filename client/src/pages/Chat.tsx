import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/Sidebar";
import ChatThread from "@/components/ChatThread";
import ChatInput from "@/components/ChatInput";
import DocumentSelector from "@/components/DocumentSelector";
import LoadingSteps from "@/components/LoadingSteps";
import { mockChats } from "@/lib/mockData";
import { Chat } from "@/types/chatTypes";

function App() {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [loadingStep, setLoadingStep] = useState(-1);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showLoadingSteps, setShowLoadingSteps] = useState(false);
  const [sources, setSources] = useState([]);
  const [tools, setTools] = useState<string[]>([]);
  const [bsid, setBsid] = useState("");  // State untuk bsid

  const createNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      createdAt: new Date().toISOString(),
      messages: [],
    };

    setChats((prevChats) => [newChat, ...prevChats]);
    setActiveChat(newChat);
    setBsid("");  // Reset bsid ketika membuka chat baru
  };

  const handleStreamingResponse = async (message: string) => {
    if (!selectedCompany || !selectedYear) return;
  
    setIsStreaming(true);
    setShowLoadingSteps(true);
    setLoadingStep(-1);
    setTools([]);
  
    const updatedMessages = [
      ...activeChat.messages,
      { role: "user" as "user", content: message },
    ];
  
    setActiveChat((prev) => ({
      ...prev,
      messages: updatedMessages,
    }));
  
    const chatPayload = {
      src: "skripsi",
      model: "gpt-4o-mini",
      inputs: [{ type: "text", role: "user", content: message }],
      bsid: bsid || undefined,  // Kirim bsid jika tersedia
    };
  
    try {
      const response = await fetch("http://localhost:8000/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "test-uid": "#test-uid",
        },
        body: JSON.stringify(chatPayload),
      });
  
      let reader: ReadableStreamDefaultReader | null = null;

      if (response.body) {
        reader = response.body.getReader();
      } else {
        console.error("Response body is null");
      }
      
      let streamedContent = "";
      let currentTools: string[] = [];
  
      while (true) {
        if (!reader) break;
        const { value, done } = await reader.read();
        if (done) break;
  
        const text = new TextDecoder().decode(value);
        console.log(text);

        const chunks = text
          .replace(/}\n{/g, "}|SPLIT|{")
          .split("|SPLIT|")
          .filter(chunk => chunk.trim() !== "");
  
        for (const chunk of chunks) {
          try {
            const data = JSON.parse(chunk);
  
            // Perbarui bsid jika tersedia dari respons API
            if (data.bsid) {
              setBsid(data.bsid);
            }
  
            if (data.tools.length > 0) {
              for (const tool of data.tools) {
                if (!currentTools.includes(tool)) {
                  currentTools.push(tool);
                  setTools([...currentTools]);
                  setLoadingStep(currentTools.length - 1);
                }
              }
            }
  
            if (data.responses && data.responses.length > 0) {
              streamedContent = data.responses[0];
  
              setActiveChat((prev) => ({
                ...prev,
                messages: [
                  ...updatedMessages,
                  {
                    role: "assistant",
                    content: streamedContent,
                    sources: data.sources || [],
                  },
                ],
              }));
  
              setShowLoadingSteps(false);
            }
  
            if (data.sources) {
              setSources(data.sources);
            }
          } catch (error) {
            console.error("JSON parsing error:", error, "at chunk:", chunk);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching from API:", error);
    } finally {
      setIsStreaming(false);
    }
  };
  

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
        <div className="p-4">
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
                    What would you like to know about {selectedCompany}'s{" "}
                    {selectedYear} sustainability report?
                  </h1>
                )}
              </div>
            )}
            {activeChat.messages.length > 0 && (
              <>
                <ChatThread
                  messages={activeChat.messages}
                  isStreaming={isStreaming}
                />
                {showLoadingSteps && (
                  <LoadingSteps currentStep={loadingStep} steps={tools} />
                )}
              </>
            )}
          </div>
        </ScrollArea>
        <div className="bg-background p-4">
          <div className="mx-auto max-w-3xl">
            <ChatInput
              onSend={handleStreamingResponse}
              disabled={isStreaming || !isDocumentSelected}
              placeholder={
                !isDocumentSelected
                  ? "Select a company and year to chat..."
                  : "Type your message..."
              }
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
