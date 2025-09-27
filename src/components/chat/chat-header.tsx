"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/hooks/use-auth";
import { LogOut, Settings, User, Menu } from "lucide-react";
import Link from "next/link";

export function ChatHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b border-border bg-background px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-lg font-semibold">LeoGPT</h1>
            <p className="text-sm text-muted-foreground">AI Chat Assistant</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">
              {user?.user_metadata?.full_name || user?.email}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={signOut}
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
