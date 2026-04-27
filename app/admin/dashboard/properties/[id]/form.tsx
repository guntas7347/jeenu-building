"use client";

import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Property } from "@/types";

export default function PropertyForm({
  initialData,
  id,
  isNew,
}: {
  initialData: Partial<Property>;
  id: string;
  isNew: boolean;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Property>>(initialData);
  const [imageUrlInput, setImageUrlInput] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addImage = () => {
    if (!imageUrlInput) return;
    setForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), imageUrlInput],
    }));
    setImageUrlInput("");
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // await saveProperty(id, isNew, form);
      alert("Property saved successfully!");
      router.push("/admin/dashboard/properties");
    } catch (err) {
      console.error(err);
      alert("Failed to save property");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl pb-32">
      <header className="flex items-center gap-4">
        <Link
          href="/admin/dashboard/properties"
          className="p-2 border border-outline-variant/10 rounded hover:bg-surface-container-high transition-colors text-on-surface"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">
            {isNew ? "Add Property" : "Edit Property"}
          </h1>
          <p className="text-on-surface-variant mt-1">
            Make changes to this listing below.
          </p>
        </div>
      </header>

      <div className="bg-surface-container rounded-xl border border-outline-variant/10 p-8 space-y-8">
        {/* Basic Details */}
        <section>
          <h2 className="text-lg font-bold text-on-surface mb-6 border-b border-outline-variant/10 pb-2">
            Basic Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="form-label">Property Title</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="e.g. The Obsidian Pavilion"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-input"
                placeholder="e.g. Bel Air, Los Angeles"
                value={form.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Price</label>
              <input
                type="text"
                name="price"
                className="form-input"
                placeholder="e.g. $14,500,000"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-input"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Featured">Featured</option>
                <option value="Sold">Sold</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section>
          <h2 className="text-lg font-bold text-on-surface mb-6 border-b border-outline-variant/10 pb-2">
            Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="form-label">Bedrooms</label>
              <input
                type="number"
                name="beds"
                className="form-input"
                placeholder="4"
                value={form.beds}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Bathrooms</label>
              <input
                type="number"
                name="baths"
                step="0.5"
                className="form-input"
                placeholder="4.5"
                value={form.baths}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Square Footage</label>
              <input
                type="text"
                name="sqft"
                className="form-input"
                placeholder="12,400"
                value={form.sqft}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-lg font-bold text-on-surface mb-6 border-b border-outline-variant/10 pb-2">
            Description
          </h2>
          <div>
            <label className="form-label">Full Description</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="Describe the property..."
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Images */}
        <section>
          <h2 className="text-lg font-bold text-on-surface mb-6 border-b border-outline-variant/10 pb-2">
            Gallery Images (URLs)
          </h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                className="form-input flex-1"
                placeholder="https://example.com/image.jpg"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addImage()}
              />
              <button
                type="button"
                onClick={addImage}
                className="btn-admin-secondary shrink-0 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            {form.images && form.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {form.images.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-md overflow-hidden bg-surface-container aspect-video"
                  >
                    <img
                      src={url}
                      alt={`Gallery ${idx}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 bg-error text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-admin flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href="/admin/dashboard/properties"
            className="btn-admin-secondary inline-flex items-center"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
