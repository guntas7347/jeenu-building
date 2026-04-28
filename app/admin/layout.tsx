// app/admin/layout.tsx
import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminClientLayout from "./AdminClientLayout";

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
