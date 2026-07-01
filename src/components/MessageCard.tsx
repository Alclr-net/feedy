import React from "react";
import { cn } from "@/lib/className";
import { MdDelete } from "react-icons/md";

function MessageCard({
  className,
  date,
  message,
  handleDeletion,
}: {
  className?: string;
  date: Date;
  message: string;
  handleDeletion?: () => void;
}) {
  const formatedDate = new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex flex-col w-full break-words p-4 bg-background text-foreground font-mono",
        className
      )}
    >
      <div className="flex justify-between items-center border-b border-border/60 pb-2 mb-2">
        <p className="text-[10px] text-muted-foreground">{formatedDate}</p>
        <button
          className="cursor-pointer text-red-500 hover:text-red-600 transition-colors p-1"
          onClick={handleDeletion}
          aria-label="Delete message"
        >
          <MdDelete size={16} />
        </button>
      </div>
      <p className="text-xs leading-relaxed text-foreground/90">{message}</p>
    </div>
  );
}

export default MessageCard;
