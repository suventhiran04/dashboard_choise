"use client";

import { useSidebar } from "@/context/SidebarContext";
import {
  Sun,
  Moon,
  Search,
  Settings,
  AlertTriangle,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Topbar() {
  const { collapsed } = useSidebar();

  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Initialize from localStorage / system once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("theme");
    const initial: "light" | "dark" =
      stored === "dark" || stored === "light" ? (stored as any) : "light";

    setTheme(initial);

    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleThemeChange = (next: "light" | "dark") => {
    setTheme(next);

    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", next);
    }
  };

  return (
    <header
      className={`
        fixed top-0 right-0 h-20
        flex items-center justify-between
        transition-all duration-300 z-40 px-6
        bg-ns-surface dark:bg-ns-surface-dark
        backdrop-blur-md border-b border-ns-border dark:border-ns-border-dark
        ${
          collapsed ? "ml-20 w-[calc(100%-80px)]" : "ml-64 w-[calc(100%-256px)]"
        }
      `}
    >
      {/* LEFT: Welcome Text */}
      <div className="text-lg font-medium text-ns-text dark:text-ns-text-dark">
        Welcome back, <span className="font-semibold">Charakka ML</span>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* Group 1: Theme Toggle */}
        <div className="flex items-center gap-1 bg-ns-bg dark:bg-ns-border-dark rounded-full px-3 py-1.5">
          {/* SUN BUTTON */}
          <button
            onClick={() => handleThemeChange("light")}
            className={`p-2 rounded-full transition
              ${
                theme === "light"
                  ? "bg-ns-surface dark:bg-ns-surface-dark shadow-sm"
                  : "hover:bg-ns-surface/70 dark:hover:bg-ns-border"
              }
            `}
          >
            <Sun
              size={16}
              className={`${
                theme === "light"
                  ? "text-yellow-500"
                  : "text-ns-text-muted dark:text-ns-text-muted-dark"
              }`}
            />
          </button>

          {/* MOON BUTTON */}
          <button
            onClick={() => handleThemeChange("dark")}
            className={`p-2 rounded-full transition
              ${
                theme === "dark"
                  ? "bg-ns-surface dark:bg-ns-surface-dark shadow-sm"
                  : "hover:bg-ns-surface/70 dark:hover:bg-ns-border"
              }
            `}
          >
            <Moon
              size={16}
              className={`${
                theme === "dark"
                  ? "text-indigo-500"
                  : "text-ns-text-muted dark:text-ns-text-muted-dark"
              }`}
            />
          </button>
        </div>

        {/* Group 2: Search */}
        <div className="flex items-center gap-1 bg-ns-bg dark:bg-ns-border-dark rounded-full px-3 py-1.5">
          <button className="p-2 rounded-full hover:bg-ns-surface dark:hover:bg-ns-border transition">
            <Search
              size={16}
              className="text-ns-text-muted dark:text-ns-text-muted-dark"
            />
          </button>
        </div>

        {/* Group 3 */}
        <div className="flex items-center gap-3 bg-ns-bg dark:bg-ns-border-dark rounded-full px-4 py-2">
          <Settings
            size={16}
            className="text-ns-text-muted dark:text-ns-text-muted-dark"
          />
          <AlertTriangle
            size={16}
            className="text-ns-text-muted dark:text-ns-text-muted-dark"
          />
          <MessageSquare
            size={16}
            className="text-ns-text-muted dark:text-ns-text-muted-dark"
          />
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2 bg-ns-bg dark:bg-ns-border-dark rounded-full px-3 py-1.5 cursor-pointer hover:bg-ns-border dark:hover:bg-ns-border transition">
          <img
            src="https://i.pravatar.cc/300"
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <ChevronDown
            size={16}
            className="text-ns-text-muted dark:text-ns-text-muted-dark"
          />
        </div>
      </div>
    </header>
  );
}
