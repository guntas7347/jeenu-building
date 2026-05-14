"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloorPlanGalleryProps {
  images: string[];
}

const FloorPlanGallery = ({ images }: FloorPlanGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-slate-900">Floor Plans</h4>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {activeIndex + 1} / {images.length}
          </span>
        </div>

        {/* Main Display Area */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="relative bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-slate-100 group cursor-zoom-in overflow-hidden aspect-[4/3]"
        >
          <img
            alt={`Floor Plan ${activeIndex + 1}`}
            className="max-w-96 max-h-96 object-contain transition-transform duration-500 group-hover:scale-105"
            src={images[activeIndex]}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors flex items-center justify-center">
            <Maximize2
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"
              size={32}
            />
          </div>

          {/* Navigation Arrows (Only if multiple) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm border border-slate-200 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm border border-slate-200 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails (Only if multiple) */}
        {images.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative shrink-0 w-20 h-16 rounded-lg border-2 transition-all overflow-hidden ${
                  activeIndex === idx
                    ? "border-blue-500 ring-2 ring-blue-500/10"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt="Thumbnail"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-w-7xl w-full h-full flex items-center justify-center"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors flex items-center gap-2 font-bold"
              >
                Close <X size={24} />
              </button>

              <img
                src={images[activeIndex]}
                className="max-w-full max-h-full object-contain shadow-2xl"
                alt="Full View"
              />

              {images.length > 1 && (
                <div className="absolute inset-x-0 flex justify-between px-4 pointer-events-none">
                  <button
                    onClick={prevImage}
                    className="pointer-events-auto p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="pointer-events-auto p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloorPlanGallery;
