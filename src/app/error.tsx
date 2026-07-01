"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MdOutlineArrowOutward, MdRefresh } from "react-icons/md";

// ─── Error Reporting ────────────────────────────────────────────────────────
// To connect a real error service (e.g. Sentry), install @sentry/nextjs and
// replace the body of `reportError` with:
//   import * as Sentry from "@sentry/nextjs";
//   Sentry.captureException(error);
function reportError(error: Error & { digest?: string }) {
  // Structured log — visible in Vercel / server logs
  console.error(
    JSON.stringify({
      type: "CLIENT_ERROR",
      message: error.message,
      digest: error.digest ?? null,
      stack: error.stack ?? null,
      timestamp: new Date().toISOString(),
    }),
  );
}
// ────────────────────────────────────────────────────────────────────────────

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 font-mono text-foreground">
      <Container className="max-w-md w-full text-center flex flex-col items-center gap-6">
        <div className="text-[10px] uppercase tracking-[0.25em] text-red-500 border border-red-500/20 px-3 py-1 bg-red-500/5 select-none">
          Error 500
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold uppercase tracking-tight">
            Server Error
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Something went wrong on our servers. We&apos;ve logged this error
            and are looking into it.
          </p>
          {/* Show error digest in production for support reference */}
          {error?.digest && (
            <p className="text-[10px] text-muted-foreground/60 mt-1 select-all">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="w-full border-t border-border/40 pt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 bg-foreground text-background font-mono font-bold text-xs uppercase tracking-widest py-3 hover:bg-foreground/90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MdRefresh size={14} />
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 border border-border text-foreground font-mono font-bold text-xs uppercase tracking-widest py-3 hover:bg-muted active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            Back to Home
            <MdOutlineArrowOutward />
          </Link>
        </div>
      </Container>
    </div>
  );
}
