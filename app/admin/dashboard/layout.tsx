"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Home,
  Building,
  MessageSquare,
  LogOut,
  Settings,
  Menu,
  X,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Properties", href: "/admin/dashboard/properties", icon: Building },
  { name: "Queries", href: "/admin/dashboard/queries", icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 w-full z-20 flex items-center justify-between p-4 bg-surface-container border-b border-outline-variant/10">
        <span className="text-xl font-black text-primary tracking-tighter font-headline">
          LUXE ESTATE
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className="text-on-surface p-2 bg-surface-container-high rounded-md"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-surface-container shrink-0 border-r border-outline-variant/10 flex flex-col fixed h-full z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div>
            <Link href="/" className="block" onClick={() => setIsOpen(false)}>
              <span className="text-xl font-black text-primary tracking-tighter font-headline">
                LUXE ESTATE
              </span>
            </Link>
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block mt-1">
              Admin Portal
            </span>
          </div>
          <button
            className="md:hidden text-on-surface-variant hover:text-on-surface p-1"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-md text-on-surface hover:bg-surface-container-high transition-colors text-sm font-medium"
              >
                <Icon className="w-4 h-4 text-primary" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-outline-variant/10 space-y-2">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-md text-on-surface hover:bg-surface-container-high transition-colors text-sm font-medium text-left">
            <Settings className="w-4 h-4 text-outline-variant" />
            Settings
          </button>
          <Link
            href="/admin"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-md text-error hover:bg-error/10 transition-colors text-sm font-medium text-left"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 w-full">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
