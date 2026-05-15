"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function ImageLightbox({
  images,
  currentIndex,
  onIndexChange,
  isOpen,
  onClose,
  title = "Image",
}: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        onIndexChange((currentIndex + 1) % images.length);
      if (e.key === "ArrowLeft")
        onIndexChange((currentIndex - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 z-10 text-white/80 hover:text-white transition-colors bg-white/10 rounded-full p-2"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-widest">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="absolute left-4 md:left-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onIndexChange((currentIndex - 1 + images.length) % images.length);
          }}
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-5xl max-h-[80vh] w-full px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - photo ${currentIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain mx-auto rounded-xl animate-[fadeIn_0.2s_ease]"
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          className="absolute right-4 md:right-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onIndexChange((currentIndex + 1) % images.length);
          }}
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-6 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                onIndexChange(i);
              }}
              className={`flex-shrink-0 w-14 h-10 rounded-md overflow-hidden border-2 transition-all ${i === currentIndex ? "border-primary" : "border-transparent opacity-50 hover:opacity-80"}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
