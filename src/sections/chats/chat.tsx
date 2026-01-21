"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import supabase from "@/utils/supabase/client";
import { Bot, Send, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useChat } from "./hooks/useChat";
import MessageLoader from "./message-loader";

type Message = {
  id: string;
  user_name: string;
  query: string;
  response: string;
  created_at: string;
};
export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasEnteredName, setHasEnteredName] = useState(false);

  const {
    newQuery,
    setNewQuery,
    handleSubmit,
    username,
    setUsername,
    isPending,
  } = useChat();

  // Fetch initial messages
  useEffect(() => {
    if (!hasEnteredName) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
      }
    };
    fetchMessages();

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          console.log("Change received!");
          setMessages((current) => [...current, payload.new as Message]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          console.log("Update received:", payload);
          setMessages((current) =>
            current.map((msg) =>
              msg.id === payload.new.id ? { ...msg, ...payload.new } : msg
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [hasEnteredName]);

  const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim()) {
      setHasEnteredName(true);
    }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
    if (!newQuery.trim()) return;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-950 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Chat Interface</h1>
          {hasEnteredName && (
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
              {username}
            </span>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (hidden on mobile) */}
        <aside className="w-64 border-r bg-white dark:bg-gray-950 p-4  hidden md:block">
          <div className="space-y-4">
            <div className="text-sm font-medium">Recent Chats</div>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <span>General Questions</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span>Code Help</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span>Project Ideas</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Chat area */}
        <main className="flex-1 flex flex-col h-full">
          {!hasEnteredName ? (
            <Card className="mx-auto my-auto w-full max-w-md p-6">
              <CardHeader>
                <CardTitle>Welcome to Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNameSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="username"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Your Name
                    </label>
                    <Input
                      id="username"
                      placeholder="Enter your name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Start Chatting
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex-1 flex flex-col mx-auto w-full max-w-3xl border-0 rounded-none md:my-4 md:rounded-lg md:border h-64 ">
              <CardHeader className="px-4 py-3 border-b">
                <CardTitle>Chat Session</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-y-auto">
                <ScrollArea className="h-[calc(100vh-13rem)] md:h-[calc(100vh-16rem)] p-4">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center p-8">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">
                          Welcome, {username}!
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Start a conversation by typing a message below.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 pt-3">
                      {messages.map((message) => (
                        <div key={message.id} className="space-y-4">
                          {message.query && (
                            <div className="flex gap-4 items-start">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                                <User className="h-4 w-4" />
                              </div>
                              <div className="flex flex-col space-y-2">
                                <div className="px-4 py-2 rounded-lg shadow-sm">
                                  {message.query}
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex gap-4 items-end p-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Bot className="h-4 w-10" />
                            </div>
                            <div className="flex flex-col space-y-2 text-justify">
                              <div className="px-4 py-2 rounded-lg shadow-sm bg-gray-100 text-gray-800">
                                {message.response ? (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: message.response,
                                    }}
                                  />
                                ) : isPending ? (
                                  <MessageLoader />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <form
                  onSubmit={handleSendQuery}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    type="text"
                    className="flex-1"
                    value={newQuery}
                    onChange={(e) => setNewQuery(e.target.value)}
                    placeholder="Type your query..."
                  />
                  <Button type="submit" size="icon" disabled={!newQuery.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
