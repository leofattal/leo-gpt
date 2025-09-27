"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, MessageSquare, Trash2, Loader2 } from "lucide-react";
import { useConversations } from "@/lib/hooks/use-conversations";
import { useRouter } from "next/navigation";

export function ChatSidebar() {
  const { conversations, loading, createConversation, deleteConversation } =
    useConversations();
  const router = useRouter();

  const handleNewChat = async () => {
    const conversationId = await createConversation();
    if (conversationId) {
      router.push(`/chat/${conversationId}`);
    }
  };

  const handleDeleteConversation = async (id: string) => {
    await deleteConversation(id);
  };

  return (
    <div className="flex h-full w-80 flex-col border-r border-border bg-background">
      {/* Header */}
      <div className="p-4">
        <Button
          onClick={handleNewChat}
          className="w-full justify-start"
          variant="outline"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      <Separator />

      {/* Conversations List */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 p-2">
          {loading ? (
            <div className="py-8 text-center">
              <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Loading conversations...
              </p>
            </div>
          ) : conversations.length === 0 ? (
            <div className="py-8 text-center">
              <MessageSquare className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No conversations yet
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Start a new chat to begin
              </p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="group relative flex cursor-pointer items-center rounded-lg p-3 hover:bg-muted"
                onClick={() => router.push(`/chat/${conversation.id}`)}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {conversation.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {conversation.messageCount} messages
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(conversation.lastMessageAt).toLocaleDateString()}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 h-6 w-6 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteConversation(conversation.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
