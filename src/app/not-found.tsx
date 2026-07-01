import React from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 font-mono text-foreground">
      <Container className="max-w-md w-full text-center flex flex-col items-center gap-6">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground border border-border px-3 py-1 bg-card select-none">
          Error 404
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold uppercase tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="w-full border-t border-border/40 pt-6 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full bg-foreground text-background font-mono font-bold text-xs uppercase tracking-widest py-3 hover:bg-foreground/90 active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            Back to Home
            <MdOutlineArrowOutward />
          </Link>
        </div>
      </Container>
    </div>
  );
}
