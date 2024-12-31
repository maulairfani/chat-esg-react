import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, MessageSquare, Plus, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { format, isWithinInterval, subDays, subHours } from "date-fns";

interface Chat {
  id: string;
  title: string;
  createdAt: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}

interface SidebarProps {
  chats: Chat[];
  activeChat: Chat;
  onSelectChat: (chat: Chat) => void;
  onCollapse?: (collapsed: boolean) => void;
  onNewChat: () => void;
}

interface GroupedChats {
  last24h: Chat[];
  last7d: Chat[];
  older: Chat[];
}

export default function Sidebar({ chats, activeChat, onSelectChat, onCollapse, onNewChat }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    onCollapse?.(isCollapsed);
  }, [isCollapsed, onCollapse]);

  const groupChats = (chats: Chat[]): GroupedChats => {
    const now = new Date();
    return {
      last24h: chats.filter((chat) =>
        isWithinInterval(new Date(chat.createdAt), {
          start: subHours(now, 24),
          end: now,
        })
      ),
      last7d: chats.filter((chat) =>
        isWithinInterval(new Date(chat.createdAt), {
          start: subDays(now, 7),
          end: subHours(now, 24),
        })
      ),
      older: chats.filter(
        (chat) => new Date(chat.createdAt) < subDays(now, 7)
      ),
    };
  };

  const groupedChats = groupChats(chats);

  const ChatGroup = ({ title, chats }: { title: string; chats: Chat[] }) => {
    if (chats.length === 0) return null;
    return (
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground px-2">{title}</h2>
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
            <span className="truncate">{chat.title}</span>
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r transition-all duration-300 shrink-0",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className={cn("text-2xl font-bold text-primary", isCollapsed && "hidden")}>
          ChatESG
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="shrink-0"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className={cn("border-b p-4", isCollapsed && "hidden")}>
        <Button className="w-full" variant="outline" onClick={onNewChat}>
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className={cn("space-y-4 p-4", isCollapsed && "hidden")}>
          <ChatGroup title="Last 24 hours" chats={groupedChats.last24h} />
          <ChatGroup title="Last 7 days" chats={groupedChats.last7d} />
          <ChatGroup title="Older" chats={groupedChats.older} />
        </div>
      </ScrollArea>
      <div className={cn("border-t p-4", isCollapsed && "hidden")}>
        <ThemeToggle />
      </div>
    </div>
  );
}