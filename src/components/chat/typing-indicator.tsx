'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Bot } from 'lucide-react'

export function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-4xl mr-auto">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="h-8 w-8 bg-muted">
          <AvatarFallback>
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Typing animation */}
      <div className="flex flex-col gap-1 max-w-[80%] items-start">
        <Card className="bg-muted border-muted shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center space-x-1">
              <div className="text-xs text-muted-foreground mr-2">
                LeoGPT is typing
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}