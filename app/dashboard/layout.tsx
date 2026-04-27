"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/Sidebar";
import { AdminHeader } from "@/components/Header";
import { AdminFooter } from "@/components/DashFooter";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* 1. Mobile Header */}
      <AdminHeader setIsOpen={setIsOpen} />

      {/* 2. Sidebar Navigation */}
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* 3. Main Content Wrapper */}
      <div className="flex-1 flex flex-col md:ml-64 w-full min-h-screen">
        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 pt-24 md:pt-8 w-full max-w-7xl mx-auto">
          {children}
        </main>

        {/* 4. Minimal Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}
