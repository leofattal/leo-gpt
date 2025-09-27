export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  metadata?: {
    model?: string;
    confidence?: number;
    searchUsed?: boolean;
    sources?: SearchResult[];
  };
}

export interface Conversation {
  id: string;
  userId: string;
  title?: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  score?: number;
}
