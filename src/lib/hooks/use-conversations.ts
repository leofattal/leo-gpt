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
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("conversations")
        .select(
          `
          id,
          title,
          last_message_at,
          messages(count)
        `
        )
        .eq("user_id", user.id)
        .order("last_message_at", { ascending: false });

      if (error) throw error;

      const formattedConversations = data.map((conv) => ({
        id: conv.id,
        title: conv.title || "New Conversation",
        lastMessageAt: conv.last_message_at,
        messageCount: conv.messages?.[0]?.count || 0,
      }));

      setConversations(formattedConversations);
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
