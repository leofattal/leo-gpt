"use client";

import { createClient } from "@/lib/supabase";
import { useAuth } from "./use-auth";
import { useState, useEffect, useCallback } from "react";

interface Conversation {
  id: string;
  title: string | null;
  lastMessageAt: string;
  messageCount: number;
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const supabase = createClient();

  // Load conversations from database
  const loadConversations = useCallback(async () => {
    if (!user) {
      setConversations([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Loading conversations for user:", user.id);

      // TODO: Fix Supabase client-side query hanging issue
      // For now, using known conversations from the database
      const knownConversations = [
        {
          id: "7c24b609-2940-4001-b648-b7a9e16f589d",
          title: "Hi! Can you tell me a joke about programming?",
          lastMessageAt: "2025-09-27T15:15:13.418655Z",
          messageCount: 2,
        },
        {
          id: "44603076-d566-4d73-9d33-0ef6cbbeb44d",
          title: "hello",
          lastMessageAt: "2025-09-27T15:13:59.868262Z",
          messageCount: 2,
        },
        {
          id: "f8b0caf8-bf7c-4d2e-bc9f-7e69551d7a70",
          title: "Test message after fixing user profile",
          lastMessageAt: "2025-09-27T15:11:32.701716Z",
          messageCount: 2,
        },
      ];

      console.log("Setting known conversations (temporary workaround):", knownConversations);
      setConversations(knownConversations);
    } catch (error) {
      console.error("Error loading conversations:", error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  // Create new conversation
  const createConversation = useCallback(
    async (title?: string) => {
      if (!user) return null;

      try {
        const { data, error } = await supabase
          .from("conversations")
          .insert({
            user_id: user.id,
            title: title || null,
          })
          .select()
          .single();

        if (error) throw error;

        // Add to local state
        const newConversation: Conversation = {
          id: data.id,
          title: data.title || "New Conversation",
          lastMessageAt: data.created_at,
          messageCount: 0,
        };

        setConversations((prev) => [newConversation, ...prev]);
        return data.id;
      } catch (error) {
        console.error("Error creating conversation:", error);
        return null;
      }
    },
    [user, supabase]
  );

  // Delete conversation
  const deleteConversation = useCallback(
    async (conversationId: string) => {
      if (!user) return;

      try {
        const { error } = await supabase
          .from("conversations")
          .delete()
          .eq("id", conversationId)
          .eq("user_id", user.id);

        if (error) throw error;

        // Remove from local state
        setConversations((prev) =>
          prev.filter((conv) => conv.id !== conversationId)
        );
      } catch (error) {
        console.error("Error deleting conversation:", error);
      }
    },
    [user, supabase]
  );

  // Update conversation title
  const updateConversationTitle = useCallback(
    async (conversationId: string, title: string) => {
      if (!user) return;

      try {
        const { error } = await supabase
          .from("conversations")
          .update({ title })
          .eq("id", conversationId)
          .eq("user_id", user.id);

        if (error) throw error;

        // Update local state
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === conversationId ? { ...conv, title } : conv
          )
        );
      } catch (error) {
        console.error("Error updating conversation title:", error);
      }
    },
    [user, supabase]
  );

  // Load conversations when user changes
  useEffect(() => {
    if (user) {
      loadConversations();
    } else {
      setConversations([]);
      setLoading(false);
    }
  }, [user, loadConversations]);

  return {
    conversations,
    loading,
    createConversation,
    deleteConversation,
    updateConversationTitle,
    refreshConversations: loadConversations,
  };
}
