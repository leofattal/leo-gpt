"use client";

import { createClient } from "@/lib/supabase";
import { useAuth } from "./use-auth";
import { useState, useCallback } from "react";
import { Message } from "@/lib/types/chat";

export function useChat(conversationId?: string) {
  const { user } = useAuth();
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Enhanced send message function that saves to database
  const sendMessage = useCallback(
    async (content: string) => {
      if (!user) {
        console.error('No user found - please login first');
        throw new Error('Please login first to send messages');
      }

      try {
        setIsLoading(true);
        setError(null);

        // Create user message
        const userMessage: Message = {
          id: crypto.randomUUID(),
          content,
          role: "user",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);

        // Create conversation if needed
        let currentConversationId = conversationId;
        if (!currentConversationId) {
          const { data: conversation, error: convError } = await supabase
            .from("conversations")
            .insert({
              user_id: user.id,
              title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
            })
            .select()
            .single();

          if (convError) throw convError;
          currentConversationId = conversation.id;
        }

        // Save user message to database
        await supabase.from("messages").insert({
          conversation_id: currentConversationId,
          role: "user",
          content,
          metadata: {
            timestamp: new Date().toISOString(),
          },
        });

        // Call AI API
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "user", content }],
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get AI response");
        }

        const aiResponseText = await response.text();

        // Create AI message
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          content: aiResponseText,
          role: "assistant",
          timestamp: new Date(),
          metadata: {
            model: "gpt-4o",
            confidence: 0.85,
            searchUsed: false,
          },
        };

        setMessages((prev) => [...prev, aiMessage]);

        // Save AI response to database
        if (currentConversationId) {
          await supabase.from("messages").insert({
            conversation_id: currentConversationId,
            role: "assistant",
            content: aiResponseText,
            ai_model: "gpt-4o",
            confidence_score: 0.85,
            search_used: false,
            metadata: {
              model: "gpt-4o",
              timestamp: new Date().toISOString(),
            },
          });
        }

        return currentConversationId;
      } catch (error) {
        console.error("Error sending message:", error);
        const errorObj =
          error instanceof Error ? error : new Error("Unknown error");
        setError(errorObj);
        throw errorObj;
      } finally {
        setIsLoading(false);
      }
    },
    [user, conversationId, supabase]
  );

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    setMessages,
  };
}
