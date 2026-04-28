import { getListings } from "@/lib/actions/listings";
import ClientPage from "./ClientPage";
import { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { getSavedListingsIds } from "@/lib/actions/user";
export const metadata: Metadata = {
  title: "Premium Real Estate Listings | Red Owl Homes",
  description: "Browse our exclusive collection of luxury properties.",
};

export default async function ListingPage() {
  const initialListings = await getListings();
  const savedListingsIds = await getSavedListingsIds();
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
          <p className="text-slate-500 font-medium">Loading properties...</p>
        </div>
      }
    >
      <ClientPage
        initialData={initialListings}
        savedListingsIds={savedListingsIds}
      />
    </Suspense>
  );
}
