import { getListings } from "@/lib/actions/listings";
import HomeClient from "./HomeClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Red Owl Homes | Modern Turnkey & Architectural Home Builds",
  description:
    "Curating extraordinary living spaces, high-yield dual-key packages, and custom luxury homes across Australia.",
};

export default async function HomePage() {
  // Fetch original real listings from database
  let initialListings: any[] = [];
  try {
    const res = await getListings(1, 6, true);
    initialListings = res?.data || [];
  } catch (error) {
    console.error("Failed to load listings on HomePage:", error);
  }

  return <HomeClient initialListings={initialListings} />;
}
