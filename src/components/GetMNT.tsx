"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// 🔧 FIX 2: Tambah delay ~2000px biar coin animasi dulu selesai, baru text muncul
// Desktop: Governance cards done at 28000 + delay coin animasi
const GETMNT_START_DESKTOP = 31000; // sebelumnya 28000 → ditambah 3000 delay
const GETMNT_START_MOBILE = 37000;  // sebelumnya 34000 → ditambah 3000 delay

export default function GetMNT() {
  const { scrollY } = useScroll();

  // --- DESKTOP: section fade in ---
  const sectionOpacityDesktop = useTransform(
    scrollY,
    [GETMNT_START_DESKTOP, GETMNT_START_DESKTOP + 600],
    [0, 1]
  );
  const sectionYDesktop = useTransform(
    scrollY,
    [GETMNT_START_DESKTOP, GETMNT_START_DESKTOP + 600],
    [60, 0]
  );

  // --- MOBILE: section fade in ---
  const sectionOpacityMobile = useTransform(
    scrollY,
    [GETMNT_START_MOBILE, GETMNT_START_MOBILE + 800],
    [0, 1]
  );
  const sectionYMobile = useTransform(
    scrollY,
    [GETMNT_START_MOBILE, GETMNT_START_MOBILE + 800],
    [60, 0]
  );

  return (
    <section
      id="get-mnt"
      className="relative z-20 w-full h-[800vh] pointer-events-none"
    >
      {/* DESKTOP */}
      <motion.div
        style={{
          opacity: sectionOpacityDesktop,
          y: sectionYDesktop,
        }}
        className="
          hidden md:flex
          fixed
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          flex-col items-center justify-center
          gap-4
          pointer-events-none
        "
      >
        <p className="text-[#00D4A0] text-lg font-semibold tracking-widest uppercase">
          — GetMNT Section —
        </p>
        <h2 className="text-5xl md:text-7xl font-bold text-white text-center">
          Get <span className="text-[#00D4A0]">$MNT</span>
        </h2>
        <p className="text-gray-400 text-xl text-center max-w-md">
          Section content coming soon.
        </p>
      </motion.div>

      {/* MOBILE */}
      <motion.div
        style={{
          opacity: sectionOpacityMobile,
          y: sectionYMobile,
        }}
        className="
          flex md:hidden
          fixed
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          flex-col items-center justify-center
          gap-4
          pointer-events-none
          px-6
        "
      >
        <p className="text-[#00D4A0] text-sm font-semibold tracking-widest uppercase">
          — GetMNT Section —
        </p>
        <h2 className="text-4xl font-bold text-white text-center">
          Get <span className="text-[#00D4A0]">$MNT</span>
        </h2>
        <p className="text-gray-400 text-base text-center max-w-xs">
          Section content coming soon.
        </p>
      </motion.div>
    </section>
  );
}