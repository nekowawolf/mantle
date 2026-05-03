"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const words = ["Discover", "Upcoming", "Mantle", "Events", "IRL", "&", "Online"];

export default function Events() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Frozen VH for stable fixed positioning on mobile
  const [vh, setVh] = useState("100dvh");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setVh(`${window.innerHeight}px`);
      const handleOrientationChange = () => {
        setTimeout(() => setVh(`${window.innerHeight}px`), 200);
      };
      window.addEventListener("orientationchange", handleOrientationChange);
      return () => window.removeEventListener("orientationchange", handleOrientationChange);
    }
  }, []);

  // ── DESKTOP: per-word opacity & Y ─────────────────────────────────────────.
  const wordOpacitiesDesktop = words.map((_, i) => {
    const start = 0.15 + i * 0.02;
    return useTransform(scrollYProgress, [start, start + 0.08], [0, 1]);
  });
  const wordYsDesktop = words.map((_, i) => {
    const start = 0.15 + i * 0.02;
    return useTransform(scrollYProgress, [start, start + 0.08], [40, 0]);
  });
  const containerOpacityDesktop = useTransform(
    scrollYProgress,
    [0.75, 0.85],
    [1, 0]
  );

  // ── MOBILE: per-word opacity & Y ──────────────────────────────────────────
  const wordOpacitiesMobile = words.map((_, i) => {
    const start = 0.12 + i * 0.015;
    return useTransform(scrollYProgress, [start, start + 0.06], [0, 1]);
  });
  const wordYsMobile = words.map((_, i) => {
    const start = 0.12 + i * 0.015;
    return useTransform(scrollYProgress, [start, start + 0.06], [40, 0]);
  });
  const containerOpacityMobile = useTransform(
    scrollYProgress,
    [0.75, 0.85],
    [1, 0]
  );

  // ── mantle_text.png  ────────────────
  const mantleTextOpacityDesktop = useTransform(
    scrollYProgress,
    [0.35, 0.40],
    [0, 1]
  );
  const mantleTextOpacityMobile = useTransform(
    scrollYProgress,
    [0.30, 0.35],
    [0, 1]
  );

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative z-20 w-full h-[400vh] pointer-events-none"
    >
      {/* Stable fixed wrapper to prevent mobile address bar shifting */}
      <div 
        className="fixed top-0 left-0 w-full pointer-events-none"
        style={{ height: vh }}
      >
        {/* TEXT — DESKTOP */}
        <motion.div
          style={{ opacity: containerOpacityDesktop }}
          className="
            hidden md:flex
            absolute bottom-72
            left-1/2 -translate-x-1/2
            w-[90%] max-w-4xl
            flex-wrap justify-center gap-x-4 gap-y-2
            pointer-events-none
          "
        >
          {words.map((word, i) => (
            <motion.span
              key={`events-d-${i}`}
              style={{ opacity: wordOpacitiesDesktop[i], y: wordYsDesktop[i] }}
              className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight ${
                word === "Mantle" || word === "IRL" || word === "Online"
                  ? "text-[#00D4A0]"
                  : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* TEXT — MOBILE */}
        <motion.div
          style={{ opacity: containerOpacityMobile }}
          className="
            flex md:hidden
            absolute bottom-80
            left-1/2 -translate-x-1/2
            w-[90%]
            flex-wrap justify-center gap-x-3 gap-y-2
            pointer-events-none
          "
        >
          {words.map((word, i) => (
            <motion.span
              key={`events-m-${i}`}
              style={{ opacity: wordOpacitiesMobile[i], y: wordYsMobile[i] }}
              className={`text-4xl font-bold tracking-tight leading-tight ${
                word === "Mantle" || word === "IRL" || word === "Online"
                  ? "text-[#00D4A0]"
                  : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* mantle_text.png — DESKTOP */}
        <motion.div
          className="hidden md:block absolute pointer-events-none select-none"
          style={{
            opacity: mantleTextOpacityDesktop,
            bottom: "94px",
            left: "43%",
            marginLeft: "94px",
          }}
        >
          <div className="relative w-[150px] h-[52px]">
            <Image
              src="/img/mantle_text.png"
              alt="Mantle"
              fill
              className="object-contain object-left"
            />
          </div>
        </motion.div>

        {/* mantle_text.png MOBILE */}
        <motion.div
          className="block md:hidden absolute pointer-events-none select-none"
          style={{
            opacity: mantleTextOpacityMobile,
            bottom: "80px",
            left: "30%",
            marginLeft: "80px",
          }}
        >
          <div className="relative w-[100px] h-[35px]">
            <Image
              src="/img/mantle_text.png"
              alt="Mantle"
              fill
              className="object-contain object-left"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}