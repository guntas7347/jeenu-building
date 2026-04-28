"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, Loader2, X } from "lucide-react";
import { getListingById, updateListing } from "@/lib/actions/listings";
import TagInput from "@/components/InputTag";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import FormSelect from "@/components/FormSelect";
import PricingBreakdownEditor, { PricingItem } from "./PricingBreakdown";

type Params = Promise<{ id: string }>;

export default function ListingFormPage({ params }: { params: Params }) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");

  // Form State matching the Schema (added slug)
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    propertyType: "Modern Villa",
    status: "AVAILABLE",
    badge: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    price: "",
    images: [] as string[],
    brochureUrl: "",
    floorPlanUrl: "",
    beds: 0,
    baths: 0,
    garages: 0,
    features: [] as string[],
    inclusions: [] as string[],
    measurements: { totalSize: "", builtUp: "", carpet: "" },
    pricing: [] as { label: string; value: string }[],
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data: any = await getListingById(id);

        // Redirect back if the listing doesn't exist
        if (!data) {
          alert("Listing not found.");
          router.push("/admin/properties");
          return;
        }

        setForm({
          ...data,
          slug: data.slug || "",
          priceInput: data.priceInPaisa
            ? (Number(data.priceInPaisa) / 100).toString()
            : "",
          images: data.images || [],
          features: data.features || [],
          inclusions: data.inclusions || [],
          measurements: (data.measurements as any) || {
            totalSize: "",
            builtUp: "",
            carpet: "",
          },
          pricing: (data.pricing as any) || [],
        });
      } catch (error) {
        console.error("Failed to load listing:", error);
        alert("Failed to load listing details.");
        router.push("/admin/properties");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // Auto-generate slug from title if title is being changed and slug is empty or user is just starting
    if (
      name === "title" &&
      (!form.slug || form.slug === generateSlug(form.title))
    ) {
      setForm((prev) => ({ ...prev, title: value, slug: generateSlug(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      measurements: { ...prev.measurements, [name]: value },
    }));
  };

  // Helper to slugify strings safely
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleSave = async () => {
    if (!form.slug) {
      alert("A unique slug is required.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug, // Added to payload
        description: form.description,
        propertyType: form.propertyType,
        status: form.status,
        badge: form.badge,
        address: form.address,
        city: form.city,
        state: form.state,
        country: form.country,
        pincode: form.pincode,
        price: Number(form.price),
        images: form.images,
        brochureUrl: form.brochureUrl,
        floorPlanUrl: form.floorPlanUrl,
        beds: Number(form.beds),
        baths: Number(form.baths),
        garages: Number(form.garages),
        features: form.features,
        inclusions: form.inclusions,
        measurements: form.measurements,
        pricing: form.pricing,
      };

      await updateListing(id, payload);

      alert("Listing saved successfully!");
      router.push("/admin/properties");
    } catch (err) {
      console.error(err);
      alert("Failed to save listing");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-32 pt-8 px-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/properties"
            className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Edit Listing
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Update the details of this property.
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm"
        >
          {saving ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          {saving ? "Saving..." : "Save Listing"}
        </button>
      </header>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-12">
        {/* Core Info */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              1
            </span>
            Core Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Property Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. The Obsidian Pavilion"
            />
            <FormInput
              label="Slug (URL Path)"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              placeholder="e.g. the-obsidian-pavilion"
            />
            <FormSelect
              label="Property Type"
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              options={[
                { value: "Modern Villa", label: "Modern Villa" },
                { value: "Apartment", label: "Apartment" },
                { value: "Townhouse", label: "Townhouse" },
                { value: "Commercial", label: "Commercial" },
                { value: "Land", label: "Land" },
              ]}
            />
            <FormSelect
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={[
                { value: "AVAILABLE", label: "Available" },
                { value: "PENDING", label: "Pending" },
                { value: "SOLD", label: "Sold" },
                { value: "DRAFT", label: "Draft" },
              ]}
            />
            <FormInput
              label="Badge (Optional)"
              name="badge"
              value={form.badge}
              onChange={handleChange}
              placeholder="e.g. Premium, New Construction"
            />
            <FormInput
              label="Price (Standard Currency)"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 14500000"
            />
            <div className="md:col-span-2">
              <FormTextarea
                label="Full Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the property..."
              />
            </div>
          </div>
        </section>

        {/* Location */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              2
            </span>
            Location Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormInput
                label="Street Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Luxury Lane"
              />
            </div>
            <FormInput
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Los Angeles"
            />
            <FormInput
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="CA"
            />
            <FormInput
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="India"
            />
            <FormInput
              label="Pincode / ZIP"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="90210"
            />
          </div>
        </section>

        {/* Property Specifics */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              3
            </span>
            Property Specifics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <FormInput
              label="Bedrooms"
              type="number"
              name="beds"
              value={form.beds}
              onChange={handleChange}
            />
            <FormInput
              label="Bathrooms"
              type="number"
              name="baths"
              value={form.baths}
              onChange={handleChange}
            />
            <FormInput
              label="Garages"
              type="number"
              name="garages"
              value={form.garages}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput
              label="Total Size (sqft)"
              name="totalSize"
              value={form.measurements.totalSize}
              onChange={handleMeasurementChange}
              placeholder="e.g. 4500"
            />
            <FormInput
              label="Built-Up Area (sqft)"
              name="builtUp"
              value={form.measurements.builtUp}
              onChange={handleMeasurementChange}
              placeholder="e.g. 3200"
            />
            <FormInput
              label="Carpet Area (sqft)"
              name="carpet"
              value={form.measurements.carpet}
              onChange={handleMeasurementChange}
              placeholder="e.g. 2800"
            />
          </div>
        </section>

        {/* Arrays & Tags */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              4
            </span>
            Features & Amenities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TagInput
              label="Property Features"
              placeholder="e.g. Corner Plot, Sea View"
              tags={form.features}
              setTags={(tags) =>
                setForm((prev) => ({ ...prev, features: tags }))
              }
            />
            <TagInput
              label="Inclusions"
              placeholder="e.g. Modular Kitchen, Solar Panels"
              tags={form.inclusions}
              setTags={(tags) =>
                setForm((prev) => ({ ...prev, inclusions: tags }))
              }
            />
          </div>
        </section>

        {/* Media */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              5
            </span>
            Media & Documents
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Brochure URL (PDF)"
                name="brochureUrl"
                value={form.brochureUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
              <FormInput
                label="Floor Plan URL"
                name="floorPlanUrl"
                value={form.floorPlanUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Gallery Images (URLs)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 outline-none"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (imageUrlInput) {
                        setForm((prev) => ({
                          ...prev,
                          images: [...prev.images, imageUrlInput],
                        }));
                        setImageUrlInput("");
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (imageUrlInput) {
                      setForm((prev) => ({
                        ...prev,
                        images: [...prev.images, imageUrlInput],
                      }));
                      setImageUrlInput("");
                    }
                  }}
                  className="px-6 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-bold"
                >
                  Add
                </button>
              </div>

              {form.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {form.images.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-xl overflow-hidden bg-slate-100 aspect-video border border-slate-200"
                    >
                      <img
                        src={url}
                        alt={`Gallery ${idx}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== idx),
                          }))
                        }
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              6
            </span>
            Pricing Breakdown
          </h2>

          <PricingBreakdownEditor
            initialData={form.pricing}
            onChange={(data) => setForm((prev) => ({ ...prev, pricing: data }))}
          />
        </section>
      </div>
    </div>
  );
}
