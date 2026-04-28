"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  Home,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react";
// Assumes you have these exported from your actions file
import {
  getListings,
  deleteListing,
  createListing,
} from "@/lib/actions/listings";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/helpers";

export default function AdminPropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getListings();
      setProperties(data || []);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        `Are you sure you want to delete this property (${id.slice(-6).toUpperCase()})? This action cannot be undone.`,
      )
    )
      return;

    setDeletingId(id);
    try {
      await deleteListing(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete property:", error);
      alert("Failed to delete property.");
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "AVAILABLE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "SOLD":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const handleCreate = async () => {
    try {
      const data = await createListing();
      router.push(`/admin/properties/${data.id}`);
    } catch (error) {
      console.error("Failed to create property:", error);
      alert("Failed to create property.");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Properties
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage all your listed properties and inventory.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm active:scale-95 shrink-0"
        >
          <Plus size={20} /> Add Property
        </button>
      </header>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3 min-h-[400px]">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="font-medium text-sm">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4 min-h-[400px] p-8 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
              <Home size={32} />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 mb-1">
                No properties found
              </p>
              <p className="text-sm font-medium">
                Your portfolio is currently empty. Start by adding a new
                listing.
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="mt-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
            >
              Create Listing
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 rounded-tl-3xl">
                    Property
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Location
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Price
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right rounded-tr-3xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {properties.map((prop) => (
                  <tr
                    key={prop.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {prop.images?.[0] ? (
                            <img
                              src={prop.images[0]}
                              alt={prop.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <Home size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 line-clamp-1 max-w-[250px]">
                            {prop.title}
                          </p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">
                            ID: {prop.id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                        <MapPin size={16} className="text-slate-400" />
                        {prop.city}, {prop.state}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">
                        {formatPrice(prop.priceInPaisa || prop.price)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider border ${getStatusBadge(
                          prop.status,
                        )}`}
                      >
                        {prop.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/properties/${prop.id}`}
                          className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
                          title="Edit Property"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(prop.id)}
                          disabled={deletingId === prop.id}
                          className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-red-600 hover:border-red-200 transition-colors shadow-sm disabled:opacity-50"
                          title="Delete Property"
                        >
                          {deletingId === prop.id ? (
                            <Loader2
                              size={16}
                              className="animate-spin text-red-600"
                            />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
