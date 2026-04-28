"use client";

import { useState, useEffect } from "react";
import { getUserProfile } from "@/lib/actions/user";
import ProfileCard from "@/components/ProfileCard";
import EditProfileModal from "@/components/EditProfileModal";
import ListingCard from "@/components/ListingCard";
import { Loader2, Bookmark, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingProfile from "./LoadingProfile";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "saved">("profile");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await getUserProfile();
      if (!data) {
        router.push("/");
      }
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedUser: any) => {
    setUser((prev: any) => ({ ...prev, ...updatedUser }));
  };

  if (loading) {
    return <LoadingProfile />;
  }

  const savedListings =
    user?.savedListings?.map((sl: any) => ({
      ...sl.listing,
      saved: true,
    })) || [];
  return (
    <main className="pt-32 pb-16 max-w-5xl mx-auto px-6 min-h-96">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Your Account
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Manage your personal details and saved properties.
        </p>
      </div>

      {/* Modern Tab Navigation */}
      <div className="flex items-center gap-2 mb-8 bg-slate-50 p-1.5 rounded-2xl w-fit border border-slate-100">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === "profile"
              ? "bg-white text-blue-600 shadow-sm border border-slate-200"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <UserIcon size={18} /> My Profile
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === "saved"
              ? "bg-white text-blue-600 shadow-sm border border-slate-200"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Bookmark size={18} /> Saved Properties ({savedListings.length})
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-8">
            <ProfileCard
              user={user}
              onEditClick={() => setIsEditModalOpen(true)}
            />
          </div>
        )}

        {/* Saved Listings Tab */}
        {activeTab === "saved" && (
          <div>
            {savedListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedListings.map((property: any) => (
                  <ListingCard
                    key={property.id}
                    property={property}
                    totalSize={property.measurements?.totalSize || "N/A"}
                    displayImage={
                      property.images?.[0] ||
                      "https://placehold.co/800x600?text=No+Image"
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bookmark size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No saved properties
                </h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Properties you save by clicking the heart icon will appear
                  here for easy access.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal Rendered at the Root of the Page */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSuccess={handleProfileUpdate}
      />
    </main>
  );
}
