export interface AIRequest {
  content: string;
  type: "text" | "voice" | "image" | "multimodal";
  files?: File[];
  context?: ConversationContext;
}

export interface AIResponse {
  content: string;
  confidence: number;
  model: "gpt-4o" | "gemini-pro" | "gemini-vision";
  searchUsed: boolean;
  sources?: SearchResult[];
}

export interface ConversationContext {
  conversationId?: string;
  previousMessages?: Message[];
  userPreferences?: UserPreferences;
}

export interface UserPreferences {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  language?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  score?: number;
}

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}