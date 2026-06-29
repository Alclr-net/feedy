import { cn } from "@/lib/className";
import React from "react";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: String;
}) => {
  return <div className={cn("max-w-7xl mx-auto px-4 relative ",className)}>{children}</div>;
};
