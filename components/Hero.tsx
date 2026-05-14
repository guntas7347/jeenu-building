"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowDown, ChevronRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";

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
      {/* <div className="fixed top-20 left-4 z-50 bg-black text-green-400 font-mono text-xl px-4 py-2 rounded-md shadow-lg border border-green-500/30 hidden md:block">
        Scroll: {progress.toFixed(3)}
      </div> */}

      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Layer 1: Background Image */}
        <motion.div
          style={{ scale: houseScale, opacity: houseOpacity }}
          className="absolute inset-0 w-full left-0 h-full z-10 pointer-events-none origin-center"
        >
          <img
            src="/homepage-image.jpeg"
            className="w-full h-full object-cover object-[65%] md:object-right-10"
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
          className="absolute top-[90%] md:top-[95%] -translate-y-1/2 z-50 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold text-xs tracking-widest transition-colors duration-300 flex items-center gap-2"
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
                DISCOVER BUILDS
              </span>
            </div>

            <h1 className="mb-6 max-w-4xl mx-auto text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">
              Find your dream homes{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                build
              </span>
            </h1>

            <p className="text-gray-300 font-bold mb-12 max-w-2xl mx-auto text-lg md:text-xl drop-shadow-sm">
              Explore the complete packages - turnkey builds at multiple
              locations!
            </p>

            <div className="w-full max-w-4xl mx-auto relative shadow-2xl rounded-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-[2rem] blur-xl opacity-50" />
              <SearchBar />
              <div className="flex justify-center mt-5">
                <Link
                  href="/listings"
                  className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(var(--primary-rgb,99,102,241),0.45)] active:scale-95"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* subtle inner glow on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 120%, rgba(var(--primary-rgb,99,102,241),0.18) 0%, transparent 70%)",
                    }}
                  />
                  <span>Browse all options</span>
                  <ChevronRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 text-primary"
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
