"use client";
import React from "react";
import { cn } from "@/lib/className";
import { Container } from "@/components/Container";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useAisuggestion } from "@/hooks/useAiSuggestion";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import axios from "axios";

interface UserMessageClientProps {
  username: string;
}

export function UserMessageClient({ username }: UserMessageClientProps) {
  const [mood, setMood] = React.useState<string>("friendly");
  const [message, setMessage] = React.useState<string>("");
  const moods = ["Happy", "Neutral", "Sad", "Frustrated", "Angry"];
  const queryClient = useQueryClient();
  const { data: suggestions, isLoading } = useAisuggestion(mood);

  function handleMood(mood: string) {
    setMood(mood);
    queryClient.invalidateQueries({ queryKey: ["suggestion"] });
  }

  function handleSeletion(message: string) {
    setMessage(message);
  }

  async function sendMessage() {
    try {
      const res = await axios.post(`/api/messages/create/${username}`, {
        content: message,
      });
      if (!res.data.success) {
        setMessage("");
        toast.warning(res.data.message);
        return;
      }
      setMessage("");
      toast.success(res.data.message, { position: "top-center" });
    } catch (error) {
      setMessage("");
      toast.warning("Request failed!", { position: "top-center" });
    }
  }

  return (
    <>
      <Toaster />
      <Container
        className={cn(
          " flex flex-col justify-center items-center  pt-24 sm:pt-32 md:pt-40 gap-8 px-4",
        )}
      >
        <h1>We help you stay Anonymous.</h1>
        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            placeholder="Type your message here."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={sendMessage}>Send message</Button>
        </Field>
        <div className={cn("flex w-full")}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isLoading}>
              <Button variant="outline">Choose your mood</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {moods.map((mood, idx) => {
                return (
                  <DropdownMenuItem
                    key={idx}
                    onSelect={() => {
                      handleMood(mood);
                    }}
                  >
                    {mood}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          className={cn(
            "flex flex-col w-full border border-neutral-400 gap-3 p-2",
          )}
        >
          {isLoading ? (
            <p className="shimmer text-sm shimmer-color-blue-500/60 flex">
              Generating response...
            </p>
          ) : (
            suggestions?.map((suggestion: string, index: number) => {
              return (
                <div
                  key={index}
                  className={cn(
                    " border border-b-neutral-400 w-full flex justify-between items-center",
                  )}
                >
                  <p className={cn("")}>{suggestion}</p>
                  <Button onClick={() => handleSeletion(suggestion)}>
                    Select
                  </Button>
                </div>
              );
            })
          )}
        </div>

        <Empty>
          <EmptyHeader>
            <EmptyTitle>Get your Messages </EmptyTitle>
            <EmptyDescription>
              Be completely anonymous with Feedy. Create your account and start
              receiving anonymous messages today.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center ">
            <Button>
              <Link href={"/signup"}>Create Account</Link>
              <MdOutlineArrowOutward />
            </Button>
          </EmptyContent>
        </Empty>
      </Container>
    </>
  );
}
