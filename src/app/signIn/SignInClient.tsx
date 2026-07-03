"use client";

import React from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { Container } from "@/components/Container";
import { cn } from "@/lib/className";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");

function SignIn() {
  const [isLoading, setLoading] = React.useState(false);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const optionToast = { duration: 3000 };
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleFormSubmission(e: any) {
    e.preventDefault();
    setLoading(true);
    const data = {
      identifier: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    try {
      const response = await axios.post("/api/auth/credentials", data);
      if (!response.data.success) {
        setLoading(false);
        emailRef.current!.value = "";
        passwordRef.current!.value = "";
        toast.error(response.data.message);
        return;
      }
      setLoading(false);
      toast.success(response.data.message);
      emailRef.current!.value = "";
      passwordRef.current!.value = "";
      queryClient.invalidateQueries({ queryKey: ["me"] });
      if (!response.data.data.isVerified) {
        router.push("/verify")
        return;
      }
      router.push("/");
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      emailRef.current!.value = "";
      passwordRef.current!.value = "";
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12">
        {isLoading ? <Loader height="1px" /> : ""}

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 mt-14 sm:mt-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono mb-2">
              Feedy
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-mono uppercase tracking-tight">
              Sign in
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-2">
              Welcome back. Enter your credentials below.
            </p>
          </div>

          <form
            onSubmit={handleFormSubmission}
            className="flex flex-col gap-5 w-full border border-border bg-card p-6 sm:p-8"
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono font-semibold after:content-['*'] after:text-red-500 after:ml-0.5"
              >
                Email or Username
              </label>
              <input
                type="text"
                id="email"
                name="email"
                autoComplete="off"
                placeholder="you@domain.com"
                ref={emailRef}
                className="w-full bg-transparent border border-border px-3 py-2.5 text-xs text-foreground font-mono placeholder:text-muted-foreground/40 focus:border-foreground/40 outline-none transition-colors"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono font-semibold after:content-['*'] after:text-red-500 after:ml-0.5"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                placeholder="••••••••"
                ref={passwordRef}
                className="w-full bg-transparent border border-border px-3 py-2.5 text-xs text-foreground font-mono placeholder:text-muted-foreground/40 focus:border-foreground/40 outline-none transition-colors"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-foreground text-background font-mono font-bold text-xs uppercase tracking-widest py-3 hover:bg-foreground/90 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* OAuth */}
            <div className="flex flex-col gap-2">
              <a
                href={`${BASE_URL}/api/auth/github`}
                className="w-full flex items-center justify-center gap-2 bg-card border border-border px-4 py-2.5 text-xs text-foreground font-mono font-bold hover:bg-muted hover:border-border/80 active:scale-95 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                </svg>
                Continue with GitHub
              </a>
              <a
                href={`${BASE_URL}/api/auth/google`}
                className="w-full flex items-center justify-center gap-2 bg-card border border-border px-4 py-2.5 text-xs text-foreground font-mono font-bold hover:bg-muted hover:border-border/80 active:scale-95 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
                </svg>
                Continue with Google
              </a>
            </div>

            {/* Footer link */}
            <p className="text-center text-[11px] text-muted-foreground font-mono">
              No account?{" "}
              <Link href="/signup" className="text-foreground hover:text-muted-foreground underline underline-offset-2 transition-colors">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Toaster position="bottom-right" toastOptions={optionToast} />
    </>
  );
}

export default SignIn;
