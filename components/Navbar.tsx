"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/useTheme";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/lib/authModalContext";
import { CONTACT_NUMBER } from "@/lib/config";

const NAV_LINKS = [
  { title: "Home", href: "/" },
  { title: "Listings", href: "/listings" },
  { title: "Calculator", href: "/calculator" },

  //todo copypaste ownest calcuators page
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { openLoginModal } = useAuthModal();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for the glass pill
  useEffect(() => {
    if (pathname !== "/") {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Helper to render the correct auth button based on session state
  const renderAuthAction = (isMobile = false) => {
    const baseClasses = `font-sans text-sm font-medium px-5 py-2.5 rounded-2xl shadow-sm transition-all active:scale-95 flex items-center justify-center ${
      isMobile ? "w-full" : ""
    }`;

    // Show a loading skeleton while checking auth state
    if (status === "loading") {
      return (
        <div
          className={`h-10 w-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl ${
            isMobile ? "w-full" : ""
          }`}
        />
      );
    }

    if (session) {
      return (
        <Link
          href="/profile"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`${baseClasses} bg-primary text-white hover:opacity-90`}
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
        className={`${baseClasses} bg-primary text-white hover:opacity-90`}
      >
        Sign In
      </button>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-2.5 transition-all duration-300">
      {/* ── Desktop Pill Navbar ─────────────────────────────────────────────────── */}
      <div
        // Added py-2.5 statically here so the height never jumps during scroll
        className={`max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-white/50 dark:bg-slate-900/80 backdrop-blur-3xl border border-white/50 dark:border-slate-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-white/10 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/10 dark:border-slate-800/50 shadow-[0_2px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
        }`}
        style={{
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2 flex-shrink-0 group"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-black/10 dark:ring-white/10 group-hover:ring-primary/40 transition-all">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className={`text-sm font-bold tracking-tight transition-colors ${
              scrolled ? "text-gray-900 dark:text-white" : "text-white"
            }`}
          >
            Red Owl <span className="text-primary">Homes</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.title}
                href={link.href}
                className={`px-3 py-2 rounded-xl text-sm font-medium tracking-tight transition-all ${
                  isActive
                    ? scrolled
                      ? "text-primary bg-primary/5"
                      : "text-white bg-white/20"
                    : scrolled
                      ? "text-gray-600 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`hidden md:flex items-center justify-center w-8 h-8 rounded-xl transition-colors ${
              scrolled
                ? "bg-gray-100/70 dark:bg-white/8 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/15"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>{" "}
          <Link
            href={`tel:${CONTACT_NUMBER}`}
            className={`flex items-center justify-center w-8 h-8 rounded-xl transition-colors ${
              scrolled
                ? "bg-gray-100/70 dark:bg-white/8 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/15"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            aria-label="contact"
          >
            <Phone className="w-4 h-4 text-primary" />
          </Link>
          {/* Desktop Auth Button */}
          <div className="hidden md:block">{renderAuthAction()}</div>
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden flex items-center justify-center w-8 h-8 rounded-xl transition-colors ${
              scrolled
                ? "bg-gray-100/70 dark:bg-white/8 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/15"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* ── Floating Mobile Panel ──────────────────────────────────────────────── */}
      <div
        className={`md:hidden max-w-5xl mx-auto mt-2 overflow-hidden rounded-2xl transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/85 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-2xl rounded-2xl p-4 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 pt-1 pb-1">
            Menu
          </p>
          <div className="space-y-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-white/5 ${
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>

          {/* Mobile Auth Button */}
          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-white/8">
            {renderAuthAction(true)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
