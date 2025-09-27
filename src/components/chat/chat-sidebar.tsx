'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Plus, MessageSquare, Trash2, Loader2 } from 'lucide-react'
import { useConversations } from '@/lib/hooks/use-conversations'
import { useRouter } from 'next/navigation'

export function ChatSidebar() {
  const {
    conversations,
    loading,
    createConversation,
    deleteConversation,
  } = useConversations()
  const router = useRouter()

  const handleNewChat = async () => {
    const conversationId = await createConversation()
    if (conversationId) {
      router.push(`/chat/${conversationId}`)
    }
  }

  const handleDeleteConversation = async (id: string) => {
    await deleteConversation(id)
  }

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
            <div className="text-center py-8">
              <Loader2 className="mx-auto h-8 w-8 text-muted-foreground mb-2 animate-spin" />
              <p className="text-sm text-muted-foreground">
                Loading conversations...
              </p>
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No conversations yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
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
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {conversation.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {conversation.messageCount} messages
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(conversation.lastMessageAt).toLocaleDateString()}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 ml-2 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteConversation(conversation.id)
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
  )
}