"use client";

import React from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function VerifyPage() {
  const [isLoading, setLoading] = React.useState(false);
  const [code, setCode] = React.useState<string[]>(Array(6).fill(""));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return; // digits only
    const updated = [...code];
    updated[index] = value.slice(-1); // keep only last digit
    setCode(updated);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const updated = [...code];
    pasted.split("").forEach((char, i) => {
      updated[i] = char;
    });
    setCode(updated);
    const nextEmpty = Math.min(pasted.length, 5);
    inputRefs.current[nextEmpty]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = code.join("");
    if (token.length < 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`/api/auth/verify/${token}`);
      if (!res.data.success) {
        toast.error(res.data.message);
        setLoading(false);
        return;
      }
      toast.success(res.data.message);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Verification failed.");
      setLoading(false);
    }
  }

  async function handleResend() {
    try {
      toast.loading("Resending code...", { id: "resend" });
      // Calls the /api/me endpoint to get current user id, then resends
      const me = await axios.get("/api/me");
      const userId = me.data?.user?._id;
      if (!userId) {
        toast.error("Could not find your account. Please sign in again.", { id: "resend" });
        return;
      }
      const res = await axios.get(`/api/send/${userId}`);
      if (!res.data.success) {
        toast.error(res.data.message, { id: "resend" });
        return;
      }
      toast.success("A new code has been sent to your email.", { id: "resend" });
    } catch {
      toast.error("Failed to resend. Please try again.", { id: "resend" });
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
              Check your email
            </h1>
            <p className="text-xs text-muted-foreground font-mono mt-2">
              We sent a 6-digit verification code to your email address.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full border border-border bg-card p-6 sm:p-8"
          >
            {/* OTP inputs */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono font-semibold">
                Verification code
              </label>
              <div className="flex gap-2 justify-between">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    id={`otp-${index}`}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-full aspect-square text-center text-lg font-bold font-mono bg-transparent border border-border text-foreground focus:border-foreground/60 outline-none transition-colors caret-transparent"
                  />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground/60 font-mono">
                Enter the 6-digit code from your email. Expires in 60 minutes.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || code.join("").length < 6}
              className="w-full bg-foreground text-background font-mono font-bold text-xs uppercase tracking-widest py-3 hover:bg-foreground/90 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify email"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                or
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Resend */}
            <div className="flex flex-col gap-3 text-center">
              <button
                type="button"
                onClick={handleResend}
                className="text-[11px] text-muted-foreground font-mono hover:text-foreground underline underline-offset-2 transition-colors cursor-pointer"
              >
                Didn&apos;t receive the code? Resend
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
    </>
  );
}

export default VerifyPage;
