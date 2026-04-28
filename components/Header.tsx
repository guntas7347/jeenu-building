"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  setIsOpen: (isOpen: boolean) => void;
}

export function AdminHeader({ setIsOpen }: AdminHeaderProps) {
  return (
    <header className="md:hidden fixed top-0 w-full z-20 flex items-center justify-between p-4 bg-white border-b border-slate-200 shadow-sm">
      <Link href="/dashboard" className="flex items-center">
        <span className="text-xl font-black text-slate-900 tracking-tighter">
          Red Owl Homes <span className="text-blue-600">Admin</span>
        </span>
      </Link>
      <button
        onClick={() => setIsOpen(true)}
        className="text-slate-600 p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
        aria-label="Open Menu"
      >
        <Menu size={20} />
      </button>
    </header>
  );
}
