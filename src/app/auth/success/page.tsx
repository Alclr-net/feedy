"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/Components/Container";
import { cn } from "@/lib/className";

function AuthSuccessPage() {
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider")?.toLowerCase();
  console.log(provider)
console.log(provider)
  const providerLabel = provider
    ? provider.charAt(0).toUpperCase() + provider.slice(1)
    : "Account";
console.log(providerLabel)
  const title = provider
    ? `${providerLabel} sign-in successful`
    : "Authentication successful";

  const description = provider
    ? `Your ${providerLabel} account is now connected and you're signed in.`
    : "You are signed in successfully. You can continue to your dashboard or head back home.";

  return (
    <Container className={cn("min-h-screen flex items-center justify-center py-20")}> 
      <div className="w-full max-w-xl rounded-2xl border border-neutral-700 bg-neutral-900/90 p-8 text-white shadow-2xl shadow-black/30">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400">
          ✓
        </div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-300">{description}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="rounded-lg bg-white px-4 py-3 text-center font-semibold text-black transition hover:bg-neutral-200"
          >
            Go to dashboard
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-neutral-600 px-4 py-3 text-center font-semibold text-neutral-100 transition hover:bg-neutral-800"
          >
            Back to home
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default AuthSuccessPage;
