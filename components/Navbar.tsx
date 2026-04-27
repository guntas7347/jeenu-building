"use client";

import { User, Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/useTheme";

// 1. Define navigation links dynamically outside the component
const NAV_LINKS = [
  { title: "Home", href: "/" },
  { title: "Listings", href: "/listings" },
  { title: "Market Insights", href: "/insights" },
  { title: "About Us", href: "/about" },
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname(); // 2. Get current route for active states

  return (
    <header className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm dark:bg-slate-900/95 dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
        <div className="flex items-center gap-10">
          <Link
            className="text-2xl font-black tracking-tighter text-blue-700 dark:text-blue-500"
            href="/"
          >
            EstateElite
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            {/* 3. Map over links dynamically */}
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`font-sans text-sm font-medium tracking-tight transition-colors ${
                    isActive
                      ? "text-blue-700 border-b-2 border-blue-600 pb-1 dark:text-blue-400 dark:border-blue-400"
                      : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* 4. Added the Theme Toggle button using your existing imports */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all dark:text-slate-300 dark:hover:bg-slate-800 active:scale-95"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            href="/dashboard"
            className="font-sans text-sm font-medium px-5 py-2.5 bg-blue-600 text-white rounded-2xl shadow-sm hover:bg-blue-700 transition-all active:scale-95"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
