"use client";
import { cn } from "@/lib/className";
import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navbar = () => {
  // const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: user } = useUser();

  async function handleLogOut() {
    try {
      const res = await axios.post("/api/sign-out");
      if (!res.data.success) { toast.error(res.data.message); return; }
      queryClient.clear();
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Logout successfully", { position: "top-center" });
      router.refresh();
    } catch {
      toast.warning("Something Went Wrong", { position: "top-center" });
    }
  }

  // React.useEffect(() => {
  //   const onScroll = () => setScrolled(window.scrollY > 10);
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  // Close menu on resize to desktop
  React.useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      {/* ── Navbar shell ── */}
      <div
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          "bg-background  dark:bg-foreground border-b border-background/25   dark:border-border shadow-sm backdrop-blur"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 w-full">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/feedy-favicons/favicon-192x192.png" alt="Feedy Logo" className="w-10 h-10 object-contain" />

          </Link>

          {/* Desktop nav */}
          <div className={cn("flex justify-center items-center gap-3")}>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  className="text-xs font-mono font-bold text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-background uppercase tracking-wider transition-colors"
                >
                  {l.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="text-xs font-mono font-bold text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-background uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Log out
                </button>
              ) : (
                <Link
                  href="/signIn"
                  className="text-xs font-mono font-bold text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-background uppercase tracking-wider transition-colors cursor-pointer "
                >
                  Log in
                </Link>
              )}
              {user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 bg-foreground text-background font-mono font-bold text-xs uppercase tracking-widest px-4 py-2 hover:bg-foreground/90 dark:bg-background dark:text-foreground dark:hover:bg-background/90 active:scale-95 transition-all"
                >
                  <FaUserAlt className="text-[10px]" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="bg-foreground text-background font-mono font-bold text-xs uppercase tracking-widest px-4 py-2  hover:bg-foreground/90 dark:bg-background dark:text-foreground dark:hover:bg-background/90 active:scale-95 transition-all"
                >
                  Get Started
                </Link>
              )}

            </nav>

            {/* Mobile burger */}
            <button
              className="flex md:hidden items-center justify-center w-9 h-9 text-foreground dark:text-background"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <IoClose size={22} /> : <GiHamburgerMenu size={20} />}
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-foreground text-background border-t border-background/20 dark:bg-background dark:text-foreground dark:border-border px-4 pb-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm font-mono font-bold text-background/80 hover:text-background border-b border-background/10 dark:text-muted-foreground dark:hover:text-foreground dark:border-border/40 uppercase tracking-wider transition-colors"
              >
                {l.name}
              </Link>
            ))}
            {user ? (
              <button
                onClick={() => { handleLogOut(); setMenuOpen(false); }}
                className="text-left py-3 text-sm font-mono font-bold text-background/80 hover:text-background border-b border-background/10 dark:text-muted-foreground dark:hover:text-foreground dark:border-border/40 uppercase tracking-wider transition-colors cursor-pointer"
              >
                Log out
              </button>
            ) : (
              <Link
                href="/signIn"
                onClick={() => setMenuOpen(false)}
                className="text-left py-3 text-sm font-mono font-bold text-background/80 hover:text-background border-b border-background/10 dark:text-muted-foreground dark:hover:text-foreground dark:border-border/40 uppercase tracking-wider transition-colors cursor-pointer"
              >
                Log in
              </Link>
            )}

            <div className="pt-4 ">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full font-mono font-bold text-xs
                   uppercase tracking-widest px-4 py-3 bg-black text-background hover:bg-foreground/90  dark:bg-black dark:text-white dark:hover:bg-background/90 transition-all border border-neutral-700"
                >
                  <FaUserAlt className="text-[10px]" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full bg-background text-foreground font-mono font-bold text-xs uppercase tracking-widest px-4 py-3 hover:bg-background/90 dark:bg-foreground dark:text-background dark:hover:bg-foreground/90 transition-all"
                >
                  Get Started
                </Link>
              )}

            </div>

          </div>

        )}

      </div>
      <Toaster />
    </>
  );
};
