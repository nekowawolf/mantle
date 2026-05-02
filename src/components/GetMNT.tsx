"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// TIMING CONSTANTS
const GETMNT_START_DESKTOP = 29500;  
const GETMNT_START_MOBILE = 35500;   

// Bridge images
const bridgeImages = [
  "https://cms.mantle.xyz/assets/dce6cb1d-0c2b-4123-a282-256fd45a04a7",
  "https://cms.mantle.xyz/assets/0e297c90-5866-49a1-a5e8-d04b58c1c587",
  "https://cms.mantle.xyz/assets/2990f058-367d-4d1f-817a-2f0132a03fe1",
  "https://cms.mantle.xyz/assets/5088552c-6c12-48f3-8faa-bc012e7c24d4",
];

export default function GetMNT() {
  const { scrollY } = useScroll();

  // ─── DESKTOP ───────────────────────────────────────────────────────────────

  // "How to get MNT?"
  const headingClipDesktop = useTransform(
    scrollY,
    [GETMNT_START_DESKTOP, GETMNT_START_DESKTOP + 500],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // "View More" — MUNCUL BARENG BRIDGES
  const viewMoreOpacityDesktop = useTransform(
    scrollY,
    [GETMNT_START_DESKTOP + 2300, GETMNT_START_DESKTOP + 2700],
    [0, 1]
  );

  // Subtitle text
  const subtitleOpacityDesktop = useTransform(
    scrollY,
    [
      GETMNT_START_DESKTOP + 600,
      GETMNT_START_DESKTOP + 1000,
      GETMNT_START_DESKTOP + 1800,
      GETMNT_START_DESKTOP + 2200,
    ],
    [0, 1, 1, 0]
  );

  // Bridges section
  const bridgesOpacityDesktop = useTransform(
    scrollY,
    [
      GETMNT_START_DESKTOP + 2300,
      GETMNT_START_DESKTOP + 2700,
      GETMNT_START_DESKTOP + 3500,
      GETMNT_START_DESKTOP + 3900,
    ],
    [0, 1, 1, 0]
  );

  // ─── MOBILE ────────────────────────────────────────────────────────────────

  // "How to get MNT?"
  const headingClipMobile = useTransform(
    scrollY,
    [GETMNT_START_MOBILE, GETMNT_START_MOBILE + 500],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // "View More" — MUNCUL BARENG BRIDGES
  const viewMoreOpacityMobile = useTransform(
    scrollY,
    [GETMNT_START_MOBILE + 2300, GETMNT_START_MOBILE + 2700],
    [0, 1]
  );

  // Subtitle text
  const subtitleOpacityMobile = useTransform(
    scrollY,
    [
      GETMNT_START_MOBILE + 600,
      GETMNT_START_MOBILE + 1000,
      GETMNT_START_MOBILE + 1800,
      GETMNT_START_MOBILE + 2200,
    ],
    [0, 1, 1, 0]
  );

  // Bridges section (Fade In & Fade Out)
  const bridgesOpacityMobile = useTransform(
    scrollY,
    [
      GETMNT_START_MOBILE + 2300,
      GETMNT_START_MOBILE + 2700,
      GETMNT_START_MOBILE + 3500,
      GETMNT_START_MOBILE + 3900,
    ],
    [0, 1, 1, 0]
  );

  return (
    <section
      id="get-mnt"
      className="relative z-20 w-full h-[1600vh] pointer-events-none"
    >
      {/* ══════════════════════ DESKTOP ══════════════════════ */}
      <div className="hidden md:block">
        <div
          className="
            fixed
            top-[13%]
            left-1/2 -translate-x-1/2
            pointer-events-none
            overflow-hidden
            pb-4
          "
        >
          <motion.h2
            style={{ clipPath: headingClipDesktop }}
            className="
              text-5xl lg:text-7xl xl:text-8xl
              font-bold text-white text-center
              whitespace-nowrap
              pb-4
            "
          >
            How to get <span className="text-[#00D4A0]">$MNT</span>?
          </motion.h2>
        </div>

        {/* Subtitle */}
        <motion.p
          style={{ opacity: subtitleOpacityDesktop }}
          className="
            fixed
            top-[72%]
            left-1/2 -translate-x-1/2
            w-[90%] max-w-2xl
            text-gray-300 text-lg text-center
            leading-relaxed
            pointer-events-none
          "
        >
          $MNT powers Mantle&apos;s ecosystem, serving as the cornerstone for
          governance, staking, and driving innovation across the decentralized
          economy.
        </motion.p>

        {/* Bridges section */}
        <motion.div
          style={{ opacity: bridgesOpacityDesktop }}
          className="
            fixed
            bottom-[16%]
            left-1/2 -translate-x-1/2
            w-[90%] max-w-3xl
            flex flex-col items-center gap-5
            pointer-events-none
          "
        >
          {/* Bridges */}
          <p className="text-white text-sm font-semibold tracking-widest uppercase opacity-60">
            Bridges
          </p>

          {/* 4 images */}
          <div className="flex items-center justify-center gap-5 flex-wrap">
            {bridgeImages.map((src, i) => (
              <div
                key={i}
                className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
              >
                <img
                  src={src}
                  alt={`bridge-${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* View More link */}
        <motion.div
          style={{ opacity: viewMoreOpacityDesktop }}
          className="
            fixed
            bottom-[8%]
            left-1/2 -translate-x-1/2
            pointer-events-auto
          "
        >
          <a
            href="https://www.mantle.xyz/mnt"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2
              text-[#00D4A0] text-base font-semibold
              tracking-widest uppercase
              border-b border-[#00D4A0]/40
              hover:border-[#00D4A0]
              transition-all duration-300
              pb-0.5
            "
          >
            View More <FiArrowRight className="text-lg" />
          </a>
        </motion.div>
      </div>

      {/* ══════════════════════ MOBILE ══════════════════════ */}
      <div className="flex md:hidden">
        <div
          className="
            fixed
            top-[18%]
            left-1/2 -translate-x-1/2
            w-[90%]
            pointer-events-none
            overflow-hidden
            text-center
            pb-4
          "
        >
          <motion.h2
            style={{ clipPath: headingClipMobile }}
            className="
              text-4xl font-bold text-white text-center
              leading-tight
              pb-4
            "
          >
            How to get{" "}
            <span className="text-[#00D4A0]">$MNT</span>
            <span className="text-white">?</span>
          </motion.h2>
        </div>

        {/* Subtitle */}
        <motion.p
          style={{ opacity: subtitleOpacityMobile }}
          className="
            fixed
            bottom-[25%]
            left-1/2 -translate-x-1/2
            w-[88%]
            text-gray-300 text-sm text-center
            leading-relaxed
            pointer-events-none
            px-2
          "
        >
          $MNT powers Mantle&apos;s ecosystem, serving as the cornerstone for
          governance, staking, and driving innovation across the decentralized
          economy.
        </motion.p>

        {/* Bridges section */}
        <motion.div
          style={{ opacity: bridgesOpacityMobile }}
          className="
            fixed
            bottom-[25%]
            left-1/2 -translate-x-1/2
            w-[90%]
            flex flex-col items-center gap-4
            pointer-events-none
          "
        >
          <p className="text-white text-xs font-semibold tracking-widest uppercase opacity-60">
            Bridges
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            {bridgeImages.map((src, i) => (
              <div
                key={i}
                className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
              >
                <img
                  src={src}
                  alt={`bridge-${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* View More link */}
        <motion.div
          style={{ opacity: viewMoreOpacityMobile }}
          className="
            fixed
            bottom-[17%]
            left-1/2 -translate-x-1/2
            pointer-events-auto
          "
        >
          <a
            href="https://www.mantle.xyz/mnt"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1.5
              text-[#00D4A0] text-sm font-semibold
              tracking-widest uppercase
              border-b border-[#00D4A0]/40
              hover:border-[#00D4A0]
              transition-all duration-300
              pb-0.5
            "
          >
            View More <FiArrowRight className="text-base" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}