export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}