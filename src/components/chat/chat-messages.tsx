'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Message } from '@/lib/types/chat'
import { ChatMessage } from './chat-message'
import { TypingIndicator } from './typing-indicator'
import { useEffect, useRef } from 'react'

interface ChatMessagesProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isLoading])

  return (
    <ScrollArea ref={scrollAreaRef} className="h-full">
      <div className="flex flex-col space-y-4 p-4">
        {messages.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-lg font-semibold mb-2">Welcome to LeoGPT!</h3>
            <p className="text-muted-foreground max-w-sm">
              Start a conversation by typing a message below. I'm here to help with any questions or tasks you have.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}

        {isLoading && <TypingIndicator />}
      </div>
    </ScrollArea>
  )
}