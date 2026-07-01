"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/Container";
import { cn } from "@/lib/className";

import React, { Suspense } from "react";

function AuthSuccessPageContent() {
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider")?.toLowerCase();
  const providerLabel = provider
    ? provider.charAt(0).toUpperCase() + provider.slice(1)
    : "Account";
  const title = provider
    ? `${providerLabel} sign-in successful`
    : "Authentication successful";

  const description = provider
    ? `Your ${providerLabel} account is now connected and you're signed in.`
    : "You are signed in successfully. You can continue to your dashboard or head back home.";

  return (
    <Container className={cn("min-h-screen flex items-center justify-center py-20")}> 
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-foreground shadow-2xl">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400">
          ✓
        </div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="rounded-lg bg-foreground px-4 py-3 text-center font-semibold text-background transition hover:bg-foreground/90"
          >
            Go to dashboard
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-border px-4 py-3 text-center font-semibold text-foreground transition hover:bg-muted"
          >
            Back to home
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={
      <Container className="min-h-screen flex items-center justify-center py-20">
        <div className="text-white">Loading authentication status...</div>
      </Container>
    }>
      <AuthSuccessPageContent />
    </Suspense>
  );
}
