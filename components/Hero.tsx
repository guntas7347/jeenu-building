"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import SearchBar from "./SearchBar"; // Adjust path as needed

const HeroSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Start when top of section hits top of viewport
    // End when bottom of section hits bottom of viewport
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  /* =========================================
     1. BACKGROUND IMAGE ANIMATIONS
     Finishes at 0.4 (40% scroll)
     ========================================= */
  const houseScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.3]);
  const houseOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    [1, 1, 0.4],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    [0, 0, 1],
  );

  /* =========================================
     2. "RO HOMES" TEXT ANIMATIONS
     Zooms extremely fast and finishes by 0.45
     ========================================= */
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.45],
    [0, 1, 1, 0],
  );

  const textScale = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1.1, 2]);

  const textLetterSpacing = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["-0.02em", "0.15em"],
  );

  /* =========================================
     3. MAIN CONTENT ANIMATIONS
     Starts at 0.35, fully visible by 0.5.
     The rest of the scroll (0.5 to 1.0) is just holding the screen.
     ========================================= */
  const sectionOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);

  const sectionScale = useTransform(scrollYProgress, [0.35, 0.5], [0.85, 1]);

  const sectionY = useTransform(
    scrollYProgress,
    [0.35, 0.5],
    ["10svh", "0svh"],
  );

  // Allow clicking/typing in the search bar once fully visible
  const sectionPointerEvents = useTransform(scrollYProgress, (v) =>
    v >= 0.45 ? "auto" : "none",
  ) as unknown as "auto" | "none";

  const handleSkipToEnd = () => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const targetScrollY = absoluteTop + rect.height - window.innerHeight;

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    // Reduced to 300svh. It still gives plenty of scroll time, but feels less tedious.
    <section ref={targetRef} className="relative h-[600svh] bg-[#0a0a0a]">
      {/* Scroll Tracker (Remove in production) */}
      <div className="fixed top-20 left-4 z-50 bg-black text-green-400 font-mono text-xl px-4 py-2 rounded-md shadow-lg border border-green-500/30 hidden md:block">
        Scroll: {progress.toFixed(3)}
      </div>

      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Layer 1: Background Image */}
        <motion.div
          style={{ scale: houseScale, opacity: houseOpacity }}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none origin-center"
        >
          <img
            src="/homepage-image.jpeg"
            alt="RO Homes"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Layer 1.5: Glassmorphism Dark Overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 w-full h-full z-15 bg-black/60 backdrop-blur-md pointer-events-none"
        />

        {/* Layer 2: Skip Button */}
        <motion.button
          onClick={handleSkipToEnd}
          style={{
            opacity: useTransform(scrollYProgress, [0.1, 0.2], [1, 0]),
            pointerEvents: useTransform(scrollYProgress, (v) =>
              v >= 0.2 ? "none" : "auto",
            ) as unknown as "auto" | "none",
          }}
          className="absolute top-[80%] md:top-[85%] -translate-y-1/2 z-50 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold text-xs tracking-widest transition-colors duration-300 flex items-center gap-2"
        >
          Scroll To Discover
          <ArrowDown size={14} className="animate-bounce" />
        </motion.button>

        {/* Layer 3: Massive Flying Text */}
        <motion.div
          style={{
            opacity: textOpacity,
            scale: textScale,
            letterSpacing: textLetterSpacing,
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none origin-center"
        >
          <h1 className="text-6xl md:text-[9rem] leading-none font-black uppercase text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] text-center">
            RO HOMES
          </h1>
        </motion.div>

        {/* Layer 4: Main Content */}
        <motion.div
          id="main-content"
          style={{
            opacity: sectionOpacity,
            scale: sectionScale,
            y: sectionY,
            pointerEvents: sectionPointerEvents,
          }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center px-6"
        >
          <div className="max-w-7xl mx-auto text-center relative z-10 w-full pt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white mb-6 shadow-xl backdrop-blur-sm">
              <Sparkles size={16} className="text-primary" />
              <span className="font-bold tracking-widest text-xs">
                DISCOVER PREMIER REAL ESTATE
              </span>
            </div>

            <h1 className="mb-6 max-w-4xl mx-auto text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">
              Find your dream home in the perfect location
            </h1>

            <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow-sm">
              Explore thousands of premium listings from luxury villas to modern
              apartments, curated just for you.
            </p>

            <div className="w-full max-w-4xl mx-auto relative shadow-2xl rounded-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-[2rem] blur-xl opacity-50" />
              <SearchBar />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
