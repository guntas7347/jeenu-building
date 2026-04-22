"use client";

import { User, Menu, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/lib/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline/10 shadow-lg transition-all duration-300">
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="text-2xl font-black text-primary tracking-tighter font-headline"
        >
          LUXE ESTATE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12 font-medium tracking-tight">
          <Link
            href="/listing"
            className="text-on-surface-variant hover:text-primary transition-all duration-300"
          >
            Search
          </Link>
          <Link
            href="/about"
            className="text-on-surface-variant hover:text-primary transition-all duration-300"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant hover:text-primary transition-all duration-300"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="hidden sm:block bg-gradient-gold text-on-primary px-6 py-2.5 rounded-full font-bold text-sm tracking-wide uppercase shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all outline-none border-none cursor-pointer">
            List Property
          </button>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={toggleTheme}
              className="text-primary hover:text-primary-fixed transition-colors bg-surface-container-low p-2 rounded-full inline-flex"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 pointer-events-none" />
              ) : (
                <Moon className="w-5 h-5 pointer-events-none" />
              )}
            </button>
            <Link
              href="/admin"
              className="hidden sm:inline-flex text-primary hover:text-primary-fixed transition-colors bg-surface-container-low p-2 rounded-full"
            >
              <User className="w-5 h-5 cursor-pointer" />
            </Link>
            <button className="md:hidden text-primary hover:text-primary-fixed transition-colors bg-surface-container-low p-2 rounded-full">
              <Menu className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
