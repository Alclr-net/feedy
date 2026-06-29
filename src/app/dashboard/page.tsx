"use client";
import React from "react";
import { cn } from "@/lib/className";
import { Container } from "@/components/Container";
import { useUser } from "@/hooks/useUser";
// import toast, { Toaster } from "react-hot-toast";
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
  const URI = `http://localhost:3000/u/${user?.username}`;
  const optionToast = {
    duration: 3000,
  };
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
    toast("Copy Successfully", { position: "top-center" });
  }
  async function handleDeletion(messageId: string) {
    try {
      if (!user) {
        toast.warning("Unauthorized Request.", { position: "top-center" })
      }
      const res = await axios.delete(`/api/messages/delete/${messageId}/${user._id}`);
      if (!res.data.success) {
        toast.warning(res.data.message);
      }
      queryClient.invalidateQueries({ queryKey: ["msg"] })
      toast.success(res.data.message, { position: "top-center" })
    } catch (error) {
      toast.warning("Request failed!", { position: "top-center" })
    }
  }
  React.useEffect(() => {
    if (user) setAcceptance(user.isAcceptingMessages);
  }, [user]);
  return (
    <>
      <Container
        className={cn(
          " flex flex-col justify-center items-center  pt-50 gap-8",
        )}
      >
        {isLoading ? (
          <Spinner className="size-8" />
        ) : (
          <>
            <div
              className={cn(
                "border border-neutral-400 flex justify-between items-center w-4xl bg-neutral-50 text-neutral-100 dark:text-neutral-700 hover:text-neutral-100 dark:hover:text-neutral-950 ",
              )}
            >
              <h6 className={cn("p-5 underline text-lg font-bold")}>{URI}</h6>
              <button
                onClick={() => handleCopyURI(URI)}
                className={cn(
                  "bg-black shadow-lg p-4 mx-1 text-neutral-700 dark:text-neutral-100 hover:text-neutral-950 dark:hover:text-neutral-100 cursor-pointer",
                )}
              >
                Copy
              </button>
            </div>
            <div
              className={cn(
                "border border-neutral-400 flex justify-between items-center w-4xl bg-neutral-50  dark:bg-neutral-50 text-neutral-100 dark:text-neutral-700 hover:text-neutral-100 dark:hover:text-neutral-950 px-4",
              )}
            >

              <Label
                htmlFor="IsAcceptingMessages"
                className={cn("text-lg py-4 font-bold")}
              >
                Accept Messages
              </Label>
              <Switch
                id="IsAcceptingMessages"
                checked={isAccepting}
                onCheckedChange={changeAcceptance}
              />
            </div>
            <div
              className={cn(
                "border border-neutral-400 flex flex-col items-center w-4xl bg-neutral-950 dark:bg-neutral-50 text-neutral-100 dark:text-neutral-950 hover:text-white dark:hover:text-white-black transition-all duration-300",
              )}
            >
              <h6 className={cn("text-lg font-bold py-4 tracking-wider uppercase")}>Messages</h6>
              <div
                className={cn(
                  " grid grid-cols-1 sm:grid-cols-2 gap-4  w-full p-4 border border-t-neutral-400 bg-white dark:bg-black ",
                )}
              >
                {loadingStateMessage ? (
                  // <div
                  //   className={cn(
                  //     "grid grid-cols-1 sm:grid-cols-2 gap-4  w-full p-4 ",
                  //   )}
                  // >
                  <>
                    <div className="flex w-full max-w-xs flex-col gap-2 ">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </>
                  // </div>
                ) : messages.length > 0 ? (
                  messages.map((message: Message, i: number) => {
                    return (
                      <MessageCard
                        key={i}
                        date={message.createdAt}
                        className={cn("shadow-xs shadow-neutral-400")}
                        message={message.content}
                        handleDeletion={() =>
                          handleDeletion(message._id.toString())
                        }
                      />
                    );
                  })
                ) : (
                  <div className="col-span-full py-16 px-4 flex flex-col items-center justify-center text-center select-none border border-dashed border-neutral-800 rounded-lg bg-black/40">
                    <p className="text-lg md:text-xl font-bold tracking-widest text-neutral-100 uppercase font-mono relative after:content-[''] after:block after:w-16 after:h-0.5 after:bg-neutral-600 after:mx-auto after:mt-3">
                      {`There is no messages yet for ${user?.username}.`}
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-4 tracking-wider uppercase max-w-md leading-relaxed font-mono">
                      Share your anonymous link with others to start receiving feedback and coffee messages! ☕
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )
        }
      </Container >
      <Toaster />
    </>
  );
}
export default Dashboard;
