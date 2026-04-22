import { adminDb } from "./admin";
import { Property, Query } from "@/types";

export async function getAllProperties(): Promise<Property[]> {
  const snapshot = await adminDb.collection("properties").get();
  let properties = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Property[];
  properties = properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return properties;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const docSnap = await adminDb.collection("properties").doc(id).get();
  if (!docSnap.exists) return null;
  return { id: docSnap.id, ...docSnap.data() } as Property;
}

export async function getAllQueries(): Promise<Query[]> {
  const snapshot = await adminDb.collection("queries").get();
  const queries = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Query[];
  queries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return queries;
}
