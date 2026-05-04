"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaDiscord, FaXTwitter, FaTelegram } from "react-icons/fa6";

const words = ["Join", "the", "Community"];

const communityCardsData = [
  {
    image: "/img/Mantle4.1.png",
    title: "Join Discord",
    link: "https://discord.com/invite/0xMantle",
    Icon: FaDiscord,
  },
  {
    image: "/img/Mantle4.2.png",
    title: "Follow X",
    link: "https://x.com/Mantle_Official",
    Icon: FaXTwitter,
  },
  {
    image: "/img/Mantle4.3.png",
    title: "Join Telegram",
    link: "https://t.me/mantlenetwork",
    Icon: FaTelegram,
  },
];

export default function Community() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [vh, setVh] = useState("100dvh");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setVh(`${window.innerHeight}px`);
      const handleOrientationChange = () => {
        setTimeout(() => setVh(`${window.innerHeight}px`), 200);
      };
      window.addEventListener("orientationchange", handleOrientationChange);
      return () =>
        window.removeEventListener("orientationchange", handleOrientationChange);
    }
  }, []);

  // ── DESKTOP: per-word opacity & Y ─────────────────────────────────────────
  const wordOpacitiesDesktop = words.map((_, i) => {
    const start = 0.05 + i * 0.05;
    return useTransform(scrollYProgress, [start, start + 0.1], [0, 1]);
  });
  const wordYsDesktop = words.map((_, i) => {
    const start = 0.05 + i * 0.05;
    return useTransform(scrollYProgress, [start, start + 0.1], [40, 0]);
  });
  const containerOpacityDesktop = useTransform(scrollYProgress, [0.30, 0.35], [1, 0]);

  // ── MOBILE: per-word opacity & Y ──────────────────────────────────────────
  const wordOpacitiesMobile = words.map((_, i) => {
    const start = 0.05 + i * 0.05;
    return useTransform(scrollYProgress, [start, start + 0.1], [0, 1]);
  });
  const wordYsMobile = words.map((_, i) => {
    const start = 0.05 + i * 0.05;
    return useTransform(scrollYProgress, [start, start + 0.1], [40, 0]);
  });
  const containerOpacityMobile = useTransform(scrollYProgress, [0.30, 0.35], [1, 0]);

  // ── EVENT CARDS — Governance-style staggered animation ───────────────────
  // DESKTOP: 3 cards fade in
  const dCard1Op = useTransform(scrollYProgress, [0.40, 0.50], [0, 1]);
  const dCard1Y = useTransform(scrollYProgress, [0.40, 0.50], [50, 0]);

  const dCard2Op = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const dCard2Y = useTransform(scrollYProgress, [0.45, 0.55], [50, 0]);

  const dCard3Op = useTransform(scrollYProgress, [0.50, 0.60], [0, 1]);
  const dCard3Y = useTransform(scrollYProgress, [0.50, 0.60], [50, 0]);

  const desktopCardsAnim = [
    { op: dCard1Op, y: dCard1Y, ptr: useTransform(dCard1Op, (v) => (v > 0.1 ? "auto" : "none")) },
    { op: dCard2Op, y: dCard2Y, ptr: useTransform(dCard2Op, (v) => (v > 0.1 ? "auto" : "none")) },
    { op: dCard3Op, y: dCard3Y, ptr: useTransform(dCard3Op, (v) => (v > 0.1 ? "auto" : "none")) },
  ];

  // MOBILE: cards replace each other
  const mCard1Op = useTransform(scrollYProgress, [0.40, 0.50, 0.60, 0.65], [0, 1, 1, 0]);
  const mCard1Y = useTransform(scrollYProgress, [0.40, 0.50], [50, 0]);

  const mCard2Op = useTransform(scrollYProgress, [0.65, 0.70, 0.80, 0.85], [0, 1, 1, 0]);
  const mCard2Y = useTransform(scrollYProgress, [0.65, 0.70], [50, 0]);

  const mCard3Op = useTransform(scrollYProgress, [0.85, 0.90, 1.0, 1.0], [0, 1, 1, 1]);
  const mCard3Y = useTransform(scrollYProgress, [0.85, 0.90], [50, 0]);

  const mobileCardsAnim = [
    { op: mCard1Op, y: mCard1Y, ptr: useTransform(mCard1Op, (v) => (v > 0.1 ? "auto" : "none")) },
    { op: mCard2Op, y: mCard2Y, ptr: useTransform(mCard2Op, (v) => (v > 0.1 ? "auto" : "none")) },
    { op: mCard3Op, y: mCard3Y, ptr: useTransform(mCard3Op, (v) => (v > 0.1 ? "auto" : "none")) },
  ];

  return (
    <section
      id="community"
      ref={containerRef}
      className="relative z-20 w-full h-[1000vh] pointer-events-none"
    >
      <div
        className="fixed top-0 left-0 w-full pointer-events-none"
        style={{ height: vh }}
      >
        {/* ════════════════ WORDS — DESKTOP ════════════════ */}
        <motion.div
          style={{ opacity: containerOpacityDesktop }}
          className="
            hidden md:flex
            absolute top-[32%]
            left-1/2 -translate-x-1/2
            w-[90%] max-w-4xl
            flex-wrap justify-center gap-x-4 gap-y-2
            pointer-events-none
          "
        >
          {words.map((word, i) => (
            <motion.span
              key={`comm-d-${i}`}
              style={{ opacity: wordOpacitiesDesktop[i], y: wordYsDesktop[i] }}
              className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight ${
                word === "Community" ? "text-[#00D4A0]" : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* ════════════════ WORDS — MOBILE ════════════════ */}
        <motion.div
          style={{ opacity: containerOpacityMobile }}
          className="
            flex md:hidden
            absolute top-[36%]
            left-1/2 -translate-x-1/2
            w-[90%]
            flex-wrap justify-center gap-x-3 gap-y-2
            pointer-events-none
          "
        >
          {words.map((word, i) => (
            <motion.span
              key={`comm-m-${i}`}
              style={{ opacity: wordOpacitiesMobile[i], y: wordYsMobile[i] }}
              className={`text-4xl font-bold tracking-tight leading-tight ${
                word === "Community" ? "text-[#00D4A0]" : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* ════════════════ CARDS — DESKTOP ════════════════ */}
        <div className="hidden md:flex absolute top-[42%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl gap-6 pointer-events-none">
          {communityCardsData.map((card, i) => {
            const Icon = card.Icon;
            return (
              <motion.div
                key={`comm-card-d-${i}`}
                style={{
                  opacity: desktopCardsAnim[i].op,
                  y: desktopCardsAnim[i].y,
                  pointerEvents: desktopCardsAnim[i].ptr,
                }}
                className="flex-1 border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col bg-gradient-to-b from-[#092C25]/60 to-[#092C25]/90 hover:scale-[1.02] transition-all duration-300 shadow-xl"
              >
                <div className="relative w-full h-[140px] lg:h-[160px] overflow-hidden rounded-t-2xl">
                  <Image src={card.image} alt={card.title} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Icon className="text-7xl text-white drop-shadow-md" />
                  </div>
                </div>
                <div className="flex flex-col flex-1 justify-between p-5 gap-4">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-fit px-5 py-2 bg-[#153e33] border border-[#00D4A0]/40 text-white font-semibold rounded-xl hover:bg-[#00D4A0] hover:text-[#092C25] hover:border-[#00D4A0] transition-all duration-300 cursor-pointer text-sm shadow-md self-center"
                  >
                    {card.title}
                    <FiArrowRight className="text-base" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ════════════════ CARDS — MOBILE ════════════════ */}
        <div className="flex md:hidden absolute top-[45%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[75%] max-w-[280px] pointer-events-none h-[300px]">
          {communityCardsData.map((card, i) => {
            const Icon = card.Icon;
            return (
              <motion.div
                key={`comm-card-m-${i}`}
                style={{
                  opacity: mobileCardsAnim[i].op,
                  y: mobileCardsAnim[i].y,
                  pointerEvents: mobileCardsAnim[i].ptr,
                }}
                className="absolute inset-0 w-full h-full border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col bg-gradient-to-b from-[#092C25]/60 to-[#092C25]/90 shadow-xl"
              >
                <div className="relative w-full h-[130px] overflow-hidden rounded-t-2xl">
                  <Image src={card.image} alt={card.title} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Icon className="text-7xl text-white drop-shadow-md" />
                  </div>
                </div>
                <div className="flex flex-col flex-1 justify-between p-5 gap-3">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#153e33] border border-[#00D4A0]/40 text-white font-semibold rounded-xl hover:bg-[#00D4A0] hover:text-[#092C25] hover:border-[#00D4A0] transition-all duration-300 cursor-pointer text-sm shadow-md"
                  >
                    {card.title}
                    <FiArrowRight className="text-base" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
