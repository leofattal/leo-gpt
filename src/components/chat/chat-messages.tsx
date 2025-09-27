"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/lib/types/chat";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea ref={scrollAreaRef} className="h-full">
      <div className="flex flex-col space-y-4 p-4">
        {messages.length === 0 && !isLoading ? (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <div className="mb-4 text-6xl">🤖</div>
            <h3 className="mb-2 text-lg font-semibold">Welcome to LeoGPT!</h3>
            <p className="max-w-sm text-muted-foreground">
              Start a conversation by typing a message below. I&apos;m here to
              help with any questions or tasks you have.
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
  );
}
