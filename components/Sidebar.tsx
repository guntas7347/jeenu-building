"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building2,
  MessageSquare,
  LogOut,
  Settings,
  X,
  LayoutDashboard,
} from "lucide-react";
import { signOut } from "next-auth/react";

const SIDEBAR_LINKS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Properties", href: "/admin/properties", icon: Building2 },
  { name: "Queries", href: "/admin/queries", icon: MessageSquare },
];

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) await signOut();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`w-64 bg-white shrink-0 border-r border-slate-200 flex flex-col fixed h-full z-40 transition-transform duration-300 ease-in-out md:translate-x-0 shadow-2xl md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand & Close Button */}
        <div className="p-6 flex items-center justify-between border-b border-slate-50">
          <div>
            <Link href="/" className="block" onClick={() => setIsOpen(false)}>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">
                Red Owl Homes
              </span>
            </Link>
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block mt-1">
              Admin Portal
            </span>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-slate-900 p-1 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-blue-600" : "text-slate-400"}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 space-y-1.5">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all text-sm font-semibold text-left">
            <Settings size={18} className="text-slate-400" />
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all text-sm font-semibold text-left"
          >
            <LogOut size={18} className="text-red-500" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
