"use server";

import { adminDb } from "@/lib/firebase/admin";
import { Property, Query } from "@/types";
import { revalidatePath } from "next/cache";

export async function saveProperty(
  id: string,
  isNew: boolean,
  data: Partial<Property>,
) {
  try {
    const propertyId = isNew
      ? data.title
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") || "untitled"
      : id;

    // Only inject createdAt if it doesn't exist to prevent overwrite from adminDb
    const payload = {
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
    };

    await adminDb
      .collection("properties")
      .doc(propertyId)
      .set(payload, { merge: true });
    revalidatePath("/admin/dashboard/properties");
    revalidatePath("/listing");
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message || "Failed to save property");
  }
}

export async function deleteProperty(id: string) {
  try {
    await adminDb.collection("properties").doc(id).delete();
    revalidatePath("/admin/dashboard/properties");
    revalidatePath("/listing");
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message || "Failed to delete property");
  }
}

export async function markQueryReplied(id: string) {
  try {
    await adminDb.collection("queries").doc(id).update({
      status: "Replied",
    });
    revalidatePath("/admin/dashboard/queries");
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message || "Failed to update query");
  }
}

export async function createQuery(data: Partial<Query>) {
  try {
    const payload = {
      ...data,
      status: "New",
      date: new Date().toISOString(),
    };
    await adminDb.collection("queries").add(payload);
    revalidatePath("/admin/dashboard/queries");
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message || "Failed to submit inquiry");
  }
}
