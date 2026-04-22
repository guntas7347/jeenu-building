"use client";

import { useState } from "react";
import { createQuery } from "@/app/actions";

export default function InquiryForm({
  propertyId,
  propertyTitle,
}: {
  propertyId: string;
  propertyTitle: string;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || "",
      message: formData.get("message") as string,
      propertyId,
      propertyString: propertyTitle,
    };

    try {
      await createQuery(data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-surface-container-low rounded-lg text-center border border-primary/30">
        <h4 className="text-xl font-bold text-primary mb-2">
          Inquiry Received
        </h4>
        <p className="text-sm text-on-surface-variant">
          Our concierge will contact you within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-xs font-bold uppercase tracking-widest text-on-surface hover:text-primary transition-colors cursor-pointer"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest text-primary font-bold">
          Full Name
        </label>
        <input
          name="name"
          className="form-input"
          placeholder="Alexander Dupont"
          type="text"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-primary font-bold">
            Email
          </label>
          <input
            name="email"
            className="form-input"
            placeholder="alex@domain.com"
            type="email"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-primary font-bold">
            Phone
          </label>
          <input
            name="phone"
            className="form-input"
            placeholder="+1 555 0192"
            type="tel"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest text-primary font-bold">
          Message (Optional)
        </label>
        <textarea
          name="message"
          className="form-textarea"
          placeholder="I am interested in a private tour..."
          rows={4}
        />
      </div>
      <button
        disabled={loading}
        className="w-full bg-gradient-gold py-5 rounded-md text-on-primary font-bold tracking-widest uppercase text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all border-none outline-none cursor-pointer disabled:opacity-50 disabled:grayscale"
        type="submit"
      >
        {loading ? "Submitting..." : "Request Portfolio & Tour"}
      </button>
    </form>
  );
}
