import React from "react";
import { cn } from "@/lib/className";
import { MdDelete } from "react-icons/md";

function MessageCard({
  className,
  date,
  message,
  handleDeletion
}: {
  className: string;
  date: Date;
  message: string;
  handleDeletion?: () => void
}) {
  const formatedDate = new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
  return (
    <>
      <div
        className={cn(
          "flex flex-col w-full wrap-break-word  p-4 bg-black dark:bg-white text-white dark:text-neutral-950 ",
          className,
        )}
      >
        <div
          className={cn(
            "flex justify-between border border-b-neutral-400 my-2",
          )}
        >
          <p>{formatedDate}</p>
          <button className={cn("cursor-pointer text-red-400")} onClick={handleDeletion}>
            <MdDelete />
          </button>
        </div>
        {message}
      </div>
    </>
  );
}
export default MessageCard;
