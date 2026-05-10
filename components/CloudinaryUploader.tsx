"use client";

import { useState, useRef, DragEvent } from "react";
import {
  UploadCloud,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/lib/config";

interface CloudinaryUploaderProps {
  onUpload: (url: string) => void;
}

export default function CloudinaryUploader({
  onUpload,
}: CloudinaryUploaderProps) {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setSuccess(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setSuccess(false);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET!);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      // Pass the URL to the parent component
      onUpload(data.secure_url);

      // Reset state for a clean UX
      setSuccess(true);
      setImage(null);

      // Optional: clear the file input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-md">
      {/* Hidden native input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Dropzone Area */}
      <div
        onClick={() => !loading && !image && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all duration-200 ${
          isDragging
            ? "border-blue-500 bg-blue-50/50"
            : image
              ? "border-slate-300 bg-slate-50"
              : success
                ? "border-green-400 bg-green-50/50"
                : "border-slate-300 hover:border-slate-400 hover:bg-slate-50 cursor-pointer"
        }`}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-4 text-blue-600">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm font-medium">Uploading to cloud...</p>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center gap-3 py-4 text-green-600">
            <CheckCircle2 className="w-8 h-8" />
            <p className="text-sm font-medium">Upload complete!</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSuccess(false);
              }}
              className="text-xs underline hover:text-green-700 mt-1"
            >
              Upload another
            </button>
          </div>
        ) : image ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex items-center justify-between w-full p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-md shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-sm font-medium text-slate-700 truncate">
                    {image.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {(image.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
              <button
                onClick={clearSelection}
                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                uploadImage();
              }}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
            >
              Confirm Upload
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-4 text-slate-500">
            <div className="p-3 bg-slate-100 rounded-full text-slate-600">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700">
                Click to upload or drag and drop
              </p>
              <p className="text-xs mt-1">SVG, PNG, JPG or GIF</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
