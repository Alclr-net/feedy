"use client";
import { cn } from "@/lib/className";
import Link from "next/link";
import React from "react";
export function Button({
  children,
  href,
  classname,

}: {
  children: React.ReactNode;
  href: string;
classname:string;

}) {
  return (
    <Link href={href}>
      {" "}
      <button
      className={cn(" p-2 cursor-pointer",classname)}
  
      >{children}</button>
    </Link>
  );
}
