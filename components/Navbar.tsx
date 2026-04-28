"use client";

import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/useTheme";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/lib/authModalContext";

const NAV_LINKS = [
  { title: "Home", href: "/" },
  { title: "Listings", href: "/listings" },
  { title: "About Us", href: "/about" },
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { openLoginModal } = useAuthModal();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to render the correct auth button based on session state
  const renderAuthAction = (isMobile = false) => {
    const baseClasses = `font-sans text-sm font-medium px-5 py-2.5 rounded-2xl shadow-sm transition-all active:scale-95 flex items-center justify-center ${
      isMobile ? "w-full" : ""
    }`;

    // Show a loading skeleton while checking auth state
    if (status === "loading") {
      return (
        <div
          className={`h-10 w-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl ${isMobile ? "w-full" : ""}`}
        />
      );
    }

    if (session) {
      return (
        <Link
          href="/profile"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`${baseClasses} bg-blue-600 text-white hover:bg-blue-700`}
        >
          Profile
        </Link>
      );
    }

    return (
      <button
        onClick={() => {
          setIsMobileMenuOpen(false);
          openLoginModal();
        }}
        className={`${baseClasses} bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100`}
      >
        Sign In
      </button>
    );
  };

  return (
    <header className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm dark:bg-slate-900/95 dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
        {/* Logo & Desktop Nav */}
        <div className="flex items-center gap-10">
          <Link
            className="text-2xl font-black tracking-tighter text-blue-700 dark:text-blue-500"
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Red Owl Homes
          </Link>

          <nav className="hidden md:flex gap-8 items-center mx-auto">
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

        {/* Right Side Actions (Desktop & Mobile) */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all dark:text-slate-300 dark:hover:bg-slate-800 active:scale-95"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Desktop Auth Button */}
          <div className="hidden md:block">{renderAuthAction()}</div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[400px] opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-bold tracking-tight transition-colors ${
                    isActive
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            {renderAuthAction(true)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
