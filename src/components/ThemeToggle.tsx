"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center   text-foreground dark:text-background transition-colors cursor-pointer select-none  "
      aria-label="Toggle theme"
    >
      {isDark ? <MdSunny size={14} /> : <IoMdMoon size={14} />}
    </button>
  );
}
