import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface Chat {
  id: string;
  title: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}

interface SidebarProps {
  chats: Chat[];
  activeChat: Chat;
  onSelectChat: (chat: Chat) => void;
}

export default function Sidebar({ chats, activeChat, onSelectChat }: SidebarProps) {
  return (
    <div className="flex h-screen flex-col border-r">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold text-primary mb-4">ChatESG</h1>
        <Button className="w-full" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                chat.id === activeChat.id && "bg-accent"
              )}
              onClick={() => onSelectChat(chat)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {chat.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <ThemeToggle />
      </div>
    </div>
  );
}