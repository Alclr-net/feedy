"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { cn } from "@/lib/className";
import axios from "axios";
import Loader from "@/components/Loader";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
function SignupPage() {
  const [isLoading, setLoading] = React.useState(false);
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function handleFormSubmission(e: any) {
    e.preventDefault();
    setLoading(true);
    const data = {
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    try {
      const response = await axios.post("/api/signup", data);
      
      if (!response.data.success) {
        setLoading(false);
        usernameRef.current!.value = "";
        emailRef.current!.value = "";
        passwordRef.current!.value = "";
        toast.error(response.data.message);
      }
      setLoading(false);
      toast.success(response.data.message);
      usernameRef.current!.value = "";
      emailRef.current!.value = "";
      passwordRef.current!.value = "";
      router.push("/signIn");
    } catch (error: any) {
      setLoading(false);
      usernameRef.current!.value = "";
      emailRef.current!.value = "";
      passwordRef.current!.value = "";
      toast.error(error.response.data?.message);
    }
  }
  return (
    <>
      <Container
        className={cn("flex flex-col justify-center items-center h-screen")}
      >
        {isLoading ? <Loader height="1px" /> : ""}
        <form
          onSubmit={handleFormSubmission}
          className="flex flex-col gap-5 w-full max-w-2xl bg-neutral-900 border border-neutral-400 p-10  text-white  shadow-lg"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className={cn(
                "text-sm tracking-wide font-bold after:content-['*'] after:text-red-600 ",
              )}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              placeholder="Enter your username"
              ref={usernameRef}
              className={cn(
                "  p-2 border border-neutral-400  active:border-neutral-500 active:text-neutral-50  ",
              )}
            />
            <p className={cn("text-xs text-neutral-200 italic py-1")}>
              *Username must be at least 3 characters long and contain only
              lowercase letters and numbers.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className={cn(
                "text-sm  tracking-wide font-bold after:content-['*'] after:text-red-600 ",
              )}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your Email Address"
              ref={emailRef}
              className={cn(
                "  p-2 border border-neutral-400  active:border-neutral-500 active:text-neutral-50 after: ",
              )}
            />
            <p className={cn("text-xs text-neutral-200 italic py-1")}>
              *We will send you a verification code to your email address.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className={cn(
                "text-sm  tracking-wide font-bold after:content-['*'] after:text-red-600 ",
              )}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter your Password"
              ref={passwordRef}
              className={cn(
                "  p-2 border border-neutral-400  active:border-neutral-500 active:text-neutral-50  ",
              )}
            />
            <p className={cn("text-xs text-neutral-200 italic py-1")}>
              *Criteria:
              <br />
              - At least 8 characters
              <br />
              - Include uppercase and lowercase letters
              <br />
              - Include at least one number
              <br />
              - One special character
              <br />
              - Minimum 8 characters
              <br />
            </p>
          </div>
          <button
            type="submit"
            className={cn(
              "w-full bg-white border  border-neutral-950 p-2 cursor-pointer ",
            )}
            disabled={isLoading}
          >
            <h2
              className={cn(
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "text-black font-bold text-lg",
              )}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </h2>
          </button>
          <div
            className={cn(" flex flex-col justify-center items-center gap-5 ")}
          >
            <div
              className={cn(
                " bg-neutral-600 w-full p-2 flex justify-center text-lg font-bold gap-1 text-white cursor-pointer",
              )}
            >
              <Link
                href={"http://localhost:3000/api/auth/github"}
                // className={cn("flex items-center justify-center gap-2 text-white")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)] cursor-pointer"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                </svg>
              </Link>
              Github
            </div>
            <div
              className={cn(
                " bg-blue-400 w-full p-2 flex justify-center text-lg font-bold gap-1 text-white cursor-pointer",
              )}
            >
              <Link href={"http://localhost:3000/api/auth/google"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-google transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)] cursor-pointer"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
                </svg>
              </Link>
              Google
            </div>
          </div>
          <p className={cn("self-center")}>
            Already have an account?
            <Link
              href={"/signIn"}
              className={cn(
                "text-blue-600 text-decoration: underline m-1 hover:text-blue-400  transition-colors duration-300",
              )}
            >
              Log in
            </Link>
          </p>
        </form>
      </Container>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2000,
        }}
      />
    </>
  );
}

export default SignupPage;
