"use client";
import { cn } from "@/lib/className";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiCoffeeDuotone } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
export const Navbar = () => {
  const [scroll, setScroll] = React.useState(false);
  const [activeBurger, setactiveBurger] = React.useState(false);
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: user } = useUser();
  function handleBurger() {
    if (!activeBurger) {
      setactiveBurger(true);
    } else {
      setactiveBurger(false);
    }
  }
  async function handleLogOut() {
    try {
      const res = await axios.post("/api/sign-out");
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      queryClient.clear()
      queryClient.invalidateQueries({ queryKey: ["me"] });

      toast.success("Logout successfully", { position: "top-center" });
      router.refresh()
    } catch (error) {

      toast.warning("Something Went Wrong", { position: "top-center" });
    }
  }
  React.useEffect(() => {
    function scrollControl() {
      if (window.scrollY > 10) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }
    window.addEventListener("scroll", scrollControl);
    return () => {
      window.removeEventListener("scroll", scrollControl);
    };
  }, []);
  const Links: { name: string; href: string }[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "#",
    },
  ];
  return (
    <>
      <div
        className={cn(
          "w-full bg-neutral-50 flex items-center z-20 ",
          scroll ? "relative" : "fixed top-0 left-0 right-0",
        )}
      >
        <div
          className={cn(
            " mx-2 md:mx-auto flex justify-between items-center py-2 ",
            "transition-transform duration-200 ease-out",
            scroll
              ? " max-w-7xl scale-95 fixed top-0 left-0 right-0 px-2 mt-4  border border-neutral-400 bg-white dark:bg-white"
              : " w-full max-w-7xl",
          )}
        >
          <Link href={"/"} className={cn("flex items-center gap-2")}>
            <h2
              className={cn(
                "text-lg font-bold text-shadow-lg flex items-center gap-2 text-black",
              )}
            >
              <PiCoffeeDuotone />
              FEEDY
            </h2>
          </Link>
          <button
            className={cn("flex md:hidden items-center text-2xl")}
            onClick={handleBurger}
          >
            <GiHamburgerMenu />
          </button>
          <div
            className={cn(
              activeBurger
                ? " items-start absolute top-0 left-0 right-0 bg-neutral-100 rounded-2xl mt-15 mx-2 py-2 border border-neutral-400"
                : "hidden md:flex  gap-8 text-sm",
            )}
          >
            {Links.map((link: { name: string; href: string }, idx: number) => {
              return (
                <div
                  key={idx}
                  className={cn(
                    " font-bold flex items-center justify-center  text-neutral-100 dark:text-neutral-700 hover:text-neutral-50 dark:hover:text-neutral-950 text-lg",
                  )}
                >
                  <Link href={link.href}>{link.name}</Link>
                </div>
              );
            })}
            {user ? (
              <div
                className={cn(
                  " font-bold flex items-center justify-center  text-neutral-100 dark:text-neutral-700 hover:text-neutral-50 dark:hover:text-neutral-950 text-lg",
                )}
              >
                <button
                  className={cn("cursor-pointer")}
                  onClick={handleLogOut}>Log out</button>
              </div>
            ) : (
              <div
                className={cn(
                  " font-bold flex items-center justify-center  text-neutral-100 dark:text-neutral-700 hover:text-neutral-50 dark:hover:text-neutral-950 text-lg",
                )}
              >
                <Link href={"/signIn"}>Log in</Link>
              </div>
            )}
            {user ? (
              <>
                <Button
                  href={"/dashboard"}
                  classname={
                    "bg-black shadow-lg flex items-center justify-center gap-2 text-neutral-700 dark:text-neutral-100 hover:text-neutral-950 dark:hover:text-neutral-50 font-bold "
                  }
                >
                  <FaUserAlt />
                  <h2 className={cn(" text-white font-normal")}>Dashboard</h2>
                </Button>
              </>
            ) : (
              <Button
                href={"/"}
                classname={activeBurger ? "hidden" : "bg-black shadow-lg"}
              >
                <h2 className={cn(" text-white font-normal")}>Get Started</h2>
              </Button>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
