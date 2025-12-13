"use client";
import { useState, useEffect } from "react";
import { Search, Github } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // ⬅️ prevents hydration mismatch
  }
  return (
    <nav className="border-b border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* App Name */}
          <Link
            href="/"
            className="text-xl font-medium text-gray-700 hover:text-gray-900 transition-colors
                       dark:text-neutral-300 dark:hover:text-white"
          >
            Blog
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search (desktop / tablet) */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search..."
                readOnly
                onClick={() =>
                  document.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
                  )
                }
                className="
      w-44 md:w-52 px-3 py-1.5 pr-16 text-sm rounded-md
      border border-gray-300 bg-white text-gray-900
      cursor-pointer
      focus:outline-none focus:ring-1 focus:ring-gray-400
      dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100
      dark:placeholder:text-neutral-500
      dark:focus:ring-neutral-700 hover:shadow-sm transition-shadow


    "
              />

              {/* Search icon */}
              <button
                onClick={() =>
                  document.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2
               text-gray-400 hover:text-gray-600 
               dark:text-neutral-500 dark:hover:text-neutral-300"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Shortcut hint */}
              <kbd
                className="absolute right-7 top-1/2 -translate-y-1/2
               text-[14px] rounded mr-1
               bg-gray-100 text-gray-600
               dark:bg-neutral-800 dark:text-neutral-400"
              >
                <span className="px-2 text-[17px]">⌘</span>
                <span className="px-2">K</span>
              </kbd>
            </div>

            {/* Search icon (mobile) */}
            <button
              aria-label="Search"
              onClick={() =>
                document.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
                )
              }
              className="sm:hidden text-gray-600 hover:text-gray-900
             dark:text-neutral-400 dark:hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* GitHub */}
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors
                         dark:text-neutral-300 dark:hover:text-white"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>

            {/* About (hide on very small screens) */}
            <Link
              href="/about"
              className="hidden sm:inline font-medium text-gray-700 hover:text-gray-900 transition-colors
                         dark:text-neutral-300 dark:hover:text-white"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
