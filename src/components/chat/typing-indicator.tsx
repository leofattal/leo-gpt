"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="mr-auto flex max-w-4xl gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar className="h-8 w-8 bg-muted">
          <AvatarFallback>
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Typing animation */}
      <div className="flex max-w-[80%] flex-col items-start gap-1">
        <Card className="border-muted bg-muted shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center space-x-1">
              <div className="mr-2 text-xs text-muted-foreground">
                LeoGPT is typing
              </div>
              <div className="flex space-x-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
