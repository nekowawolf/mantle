"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const words = ["Join", "the", "next", "$MNT", "event", "&", "shape", "the", "future"];

// ─── Scroll offsets ────────
const TEXT_START_DESKTOP = 33000;
const TEXT_START_MOBILE  = 38000;

const COIN_DONE_DESKTOP = TEXT_START_DESKTOP + 2900;
const COIN_DONE_MOBILE  = TEXT_START_MOBILE  + 3200;

export default function Events() {
  const { scrollY } = useScroll();

  // ── DESKTOP: per-word opacity & Y ─────────────────────────────────────────
  const wordOpacitiesDesktop = words.map((_, i) => {
    const start = TEXT_START_DESKTOP + i * 120;
    return useTransform(scrollY, [start, start + 400], [0, 1]);
  });
  const wordYsDesktop = words.map((_, i) => {
    const start = TEXT_START_DESKTOP + i * 120;
    return useTransform(scrollY, [start, start + 400], [40, 0]);
  });
  const containerOpacityDesktop = useTransform(
    scrollY,
    [TEXT_START_DESKTOP + 2200, TEXT_START_DESKTOP + 2800],
    [1, 0]
  );

  // ── MOBILE: per-word opacity & Y ──────────────────────────────────────────
  const wordOpacitiesMobile = words.map((_, i) => {
    const start = TEXT_START_MOBILE + i * 130;
    return useTransform(scrollY, [start, start + 420], [0, 1]);
  });
  const wordYsMobile = words.map((_, i) => {
    const start = TEXT_START_MOBILE + i * 130;
    return useTransform(scrollY, [start, start + 420], [40, 0]);
  });
  const containerOpacityMobile = useTransform(
    scrollY,
    [TEXT_START_MOBILE + 2400, TEXT_START_MOBILE + 3000],
    [1, 0]
  );

  // ── mantle_text.png  ────────────────
  const mantleTextOpacityDesktop = useTransform(
    scrollY,
    [COIN_DONE_DESKTOP, COIN_DONE_DESKTOP + 100],
    [0, 1]
  );
  const mantleTextOpacityMobile = useTransform(
    scrollY,
    [COIN_DONE_MOBILE, COIN_DONE_MOBILE + 100],
    [0, 1]
  );

  return (
    <section
      id="events"
      className="relative z-20 w-full h-[400vh] pointer-events-none"
    >
      {/* TEXT — DESKTOP */}
      <motion.div
        style={{ opacity: containerOpacityDesktop }}
        className="
          hidden md:flex
          fixed bottom-64
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
              word === "$MNT" ? "text-[#00D4A0]" : "text-white"
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
          fixed bottom-80
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
              word === "$MNT" ? "text-[#00D4A0]" : "text-white"
            }`}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* mantle_text.png — DESKTOP */}
      <motion.div
        className="hidden md:block fixed pointer-events-none select-none"
        style={{
          opacity: mantleTextOpacityDesktop,
          bottom: "94px",
          left: "44%",
          marginLeft: "109px",
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
        className="block md:hidden fixed pointer-events-none select-none"
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
    </section>
  );
}