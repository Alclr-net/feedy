"use client";

import React from "react";
import { cn } from "@/lib/className";
import { Container } from "@/components/Container";
import { useUser } from "@/hooks/useUser";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import MessageCard from "@/components/MessageCard";
import axios from "axios";
import { useMessages } from "@/hooks/useMessages";
import { useQueryClient } from "@tanstack/react-query";
import { Message, User } from "@/types/global";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
  const { data: user, isLoading } = useUser();
  const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const URI = `${BASE_URL}/u/${user?.username}`;
  const [isAccepting, setAcceptance] = React.useState<boolean>(false);
  const { data: messages = [], isLoading: loadingStateMessage } = useMessages(user);
  const queryClient = useQueryClient();

  async function changeAcceptance(checked: boolean) {
    setAcceptance(checked);
    try {
      const res = await axios.post(`/api/change_acceptance/${user._id}`, {
        isAcceptingMessages: checked,
      });
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      queryClient.setQueryData(["me"], (data: User) => ({
        ...data,
        isAcceptingMessages: checked,
      }));
      toast("Acceptance updated successfully.", { position: "top-center" });
    } catch (error) {
      toast.warning("Request failed!", { position: "top-center" });
    }
  }

  function handleCopyURI(url: string) {
    navigator.clipboard.writeText(url);
    toast("Copied!", { position: "top-center" });
  }

  async function handleDeletion(messageId: string) {
    try {
      if (!user) {
        toast.warning("Unauthorized Request.", { position: "top-center" });
      }
      const res = await axios.delete(`/api/messages/delete/${messageId}/${user._id}`);
      if (!res.data.success) {
        toast.warning(res.data.message);
      }
      queryClient.invalidateQueries({ queryKey: ["msg"] });
      toast.success(res.data.message, { position: "top-center" });
    } catch (error) {
      toast.warning("Request failed!", { position: "top-center" });
    }
  }

  React.useEffect(() => {
    if (user) setAcceptance(user.isAcceptingMessages);
  }, [user]);

  return (
    <>
      <div className="min-h-screen bg-background pt-20 sm:pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">

          {isLoading ? (
            <div className="flex justify-center pt-20">
              <Spinner className="size-6" />
            </div>
          ) : (
            <>
              {/* Page heading */}
              <div className="mb-2">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">Dashboard</p>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground font-mono uppercase tracking-tight mt-1">
                  @{user?.username}
                </h1>
              </div>

              {/* Link copy row */}
              <div className="border border-border bg-card flex items-center justify-between gap-3 p-3 sm:p-4">
                <p className="text-[11px] sm:text-xs text-muted-foreground font-mono truncate flex-1">
                  {URI}
                </p>
                <button
                  onClick={() => handleCopyURI(URI)}
                  className="shrink-0 bg-foreground text-background font-mono font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 hover:bg-foreground/90 active:scale-95 transition-all cursor-pointer"
                >
                  Copy
                </button>
              </div>

              {/* Accept messages toggle */}
              <div className="border border-border bg-card flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground font-mono uppercase tracking-wider">
                    Accept Messages
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                    {isAccepting ? "Currently accepting" : "Not accepting"}
                  </p>
                </div>
                <Switch
                  id="IsAcceptingMessages"
                  checked={isAccepting}
                  onCheckedChange={changeAcceptance}
                />
              </div>

              {/* Messages section */}
              <div className="border border-border bg-card">
                <div className="px-3 sm:px-4 py-3 border-b border-border/40 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
                    Messages
                  </p>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {messages.length} total
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
                  {loadingStateMessage ? (
                    <>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-background p-4 flex flex-col gap-2">
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-3 w-3/4" />
                        </div>
                      ))}
                    </>
                  ) : messages.length > 0 ? (
                    messages.map((message: Message, i: number) => (
                      <MessageCard
                        key={i}
                        date={message.createdAt}
                        className={cn("shadow-xs shadow-neutral-950/20")}
                        message={message.content}
                        handleDeletion={() => handleDeletion(message._id.toString())}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-16 px-4 flex flex-col items-center justify-center text-center bg-background select-none">
                      <div className="w-px h-8 bg-border mx-auto mb-6" />
                      <p className="text-xs sm:text-sm font-bold tracking-widest text-foreground uppercase font-mono">
                        No messages yet
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-3 tracking-wider max-w-xs leading-relaxed font-mono">
                        Share your link to start receiving anonymous messages
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Dashboard;
