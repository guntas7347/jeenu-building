// app/admin/layout.tsx
import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminClientLayout from "./AdminClientLayout";

export const metadata = {
  title: "Admin | RO HOMES",
  description: "Admin Dashboard for RO Homes",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAllowed = await isAdmin();

  if (!isAllowed) {
    redirect("/login");
  }

  return <AdminClientLayout>{children}</AdminClientLayout>;
}
