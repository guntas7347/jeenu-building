"use server";

import { getServerSession } from "next-auth";
import { getUser } from "./actions/auth-user";
import { redirect } from "next/navigation";

export const getSessionUser = async () => {
  const session = await getServerSession();
  if (!session) return null;
  const user = await getUser(session?.user?.email!);
  return user;
};

export const isAdmin = async () => {
  const user = await getSessionUser();
  return user?.isAdmin || false;
};

export const requireAuth = async (admin = false) => {
  const session = await getSessionUser();

  if (!session) return { error: "UNAUTHORIZED" };

  if (admin && !session.isAdmin) return { error: "FORBIDDEN" };

  return { user: session };
};

export const requireAuthPage = async () => {
  const user = await getSessionUser();

  if (!user) redirect("/login");

  return user;
};

export const requireAdminPage = async () => {
  const user = await getSessionUser();

  if (!user?.isAdmin) redirect("/");

  return user;
};
