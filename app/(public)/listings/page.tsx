import { getListings } from "@/lib/actions/listings";
import ClientPage from "./ClientPage";
import { Metadata } from "next";
import { Suspense } from "react"; // 1. Import Suspense
import { Loader2 } from "lucide-react"; // Optional: For a nice fallback

export const metadata: Metadata = {
  title: "Premium Real Estate Listings | EstateElite",
  description: "Browse our exclusive collection of luxury properties.",
};

export default async function ListingPage() {
  const initialListings = await getListings();

  return (
    // 2. Wrap the client component in a Suspense boundary
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
          <p className="text-slate-500 font-medium">Loading properties...</p>
        </div>
      }
    >
      <ClientPage initialListings={initialListings} />
    </Suspense>
  );
}
