"use client";
import React from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { Container } from "@/components/Container";
import { cn } from "@/lib/className";
import { useAppDispatch } from "@/lib/hooks";
// import { setUser } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

function SignIn() {
  const [isLoading, setLoading] = React.useState(false);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const optionToast = {
    duration: 3000,
  };
  const dispatch = useAppDispatch();
  const router = useRouter()
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

      // dispatch(
      //   setUser({
      //     name: response.data.data.username,
      //     isVerified: response.data.data.isVerified,
      //     isLoggedIn: true,
      //   }),
      // );
      toast.success(response.data.message);
      emailRef.current!.value = "";
      passwordRef.current!.value = "";

      queryClient.invalidateQueries({ queryKey: ["me"] })
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
      <Container
        className={cn("flex  flex-col justify-center items-center h-screen")}
      >
        {isLoading ? <Loader height="1px" /> : ""}
        <form
          onSubmit={handleFormSubmission}
          className={cn(
            " flex flex-col gap-5 w-full max-w-2xl bg-neutral-900 border border-neutral-400 p-10 text-white shaodow-lg",
          )}
        >
          <div className={cn("flex flex-col gap-2")}>
            <label
              htmlFor="email"
              className={cn(
                "text-sm tracking-wide font-bold after:content-['*'] after:text-red-600",
              )}
            >
              Email or Username
            </label>
            <input
              type="text"
              name="email"
              autoComplete="off"
              placeholder="Enter your email or username"
              ref={emailRef}
              className={cn(
                "p-2 border border-neutral-400 active:border-neural-500 active:text-neutral-50",
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className={cn(
                "text-sm tracking-wide font-bold after:content-['*'] after:text-red-600",
              )}
            >
              password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter your password"
              ref={passwordRef}
              className={cn(
                "p-2 border border-neutral-400 active:border-neural-500 active:text-neutral-50",
              )}
            />
          </div>
          <button
            type="submit"
            className={cn(
              "w-full bg-white border  border-neutral-950 p-2 cursor-pointer mt-5",
            )}
          >
            <h2
              className={cn(
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "text-black font-bold text-lg",
              )}
            >
              {isLoading ? "Submitting" : "Submit"}
            </h2>
          </button>
          <div className={cn(" flex justify-center items-center gap-5 ")}>
            <div
              className={cn(
                " bg-neutral-600 w-full p-2 align-center text-lg font-bold gap-1 text-white cursor-pointer",
              )}
            >
              <a
                href={"http://localhost:3000/api/auth/github"}
                className={cn(
                  "flex items-center justify-center gap-2 text-white",
                )}
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
                Github
              </a>
            </div>
            <div
              className={cn(
                " bg-blue-400 w-full p-2 flex justify-center text-lg font-bold gap-1 text-white cursor-pointer",
              )}
            >
              <a
                href={"http://localhost:3000/api/auth/google"}
                className={cn(
                  "flex items-center justify-center gap-2 text-white",
                )}
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
                  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-google transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)] cursor-pointer"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
                </svg>
                Google
              </a>
            </div>
          </div>
          <p className={cn("self-center")}>
            I don't have an account?
            <Link
              href={"/signup"}
              className={cn(
                "text-blue-600 text-decoration: underline m-1 hover:text-blue-400  transition-colors duration-300",
              )}
            >
              Signup
            </Link>
          </p>
        </form>
      </Container>
      <Toaster position="bottom-right" toastOptions={optionToast} />
    </>
  );
}

export default SignIn;
