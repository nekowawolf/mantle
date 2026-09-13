"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const words = ["Discover", "Upcoming", "Mantle", "Events", "IRL", "&", "Online"];

// 3 Event Cards Data
const eventCardsData = [
  {
    image: "/img/event1.avif",
    title: "House of AI (by Lagrange & 0G) | Consensus Miami",
    link: "https://luma.com/d7e60v9j",
  },
  {
    image: "/img/event2.jpeg",
    title: "Mantle Spring Creative Marathon",
    link: "https://mantle-hub.notion.site/?p=343fc254d25c801d9681fa2a000181e3&pm=c",
  },
  {
    image: "/img/event3.avif",
    title: "Mantle x Solana Accelerate Miami",
    link: "https://luma.com/vdjdy9q3",
  },
];

export default function Events() {
  const containerRef = useRef<HTMLElement>(null);

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
      return () =>
        window.removeEventListener("orientationchange", handleOrientationChange);
    }
  }, []);

  // ── DESKTOP: per-word opacity & Y ─────────────────────────────────────────
  const wordOpacitiesDesktop = words.map((_, i) => {
    const start = 0.05 + i * 0.012;
    return useTransform(scrollYProgress, [start, start + 0.04], [0, 1]);
  });
  const wordYsDesktop = words.map((_, i) => {
    const start = 0.05 + i * 0.012;
    return useTransform(scrollYProgress, [start, start + 0.04], [40, 0]);
  });

  // Text fade out — FASTER (was 0.75–0.85, now 0.28–0.35)
  const containerOpacityDesktop = useTransform(
    scrollYProgress,
    [0.28, 0.35],
    [1, 0]
  );

  // ── MOBILE: per-word opacity & Y ──────────────────────────────────────────
  const wordOpacitiesMobile = words.map((_, i) => {
    const start = 0.02 + i * 0.01;
    return useTransform(scrollYProgress, [start, start + 0.04], [0, 1]);
  });
  const wordYsMobile = words.map((_, i) => {
    const start = 0.02 + i * 0.01;
    return useTransform(scrollYProgress, [start, start + 0.04], [40, 0]);
  });

  // Text fade out — FASTER mobile (was 0.75–0.85, now 0.22–0.29)
  const containerOpacityMobile = useTransform(
    scrollYProgress,
    [0.22, 0.29],
    [1, 0]
  );

  // ── mantle_text.png ─────────────────────────────────────────────────────
  const mantleTextOpacityDesktop = useTransform(
    scrollYProgress,
    [0.20, 0.25],
    [0, 1]
  );
  const mantleTextOpacityMobile = useTransform(
    scrollYProgress,
    [0.15, 0.20],
    [0, 1]
  );

  // Mantle text stays visible




  // ── EVENT CARDS — Governance-style staggered animation ───────────────────
  // DESKTOP: 3 cards fade in after words fade out, then fade out
  const dCard1Op = useTransform(
    scrollYProgress,
    [0.38, 0.45, 0.77, 0.80],
    [0, 1, 1, 0]
  );
  const dCard1Y = useTransform(scrollYProgress, [0.38, 0.45], [50, 0]);

  const dCard2Op = useTransform(
    scrollYProgress,
    [0.39, 0.46, 0.78, 0.81],
    [0, 1, 1, 0]
  );
  const dCard2Y = useTransform(scrollYProgress, [0.39, 0.46], [50, 0]);

  const dCard3Op = useTransform(
    scrollYProgress,
    [0.40, 0.47, 0.79, 0.82],
    [0, 1, 1, 0]
  );
  const dCard3Y = useTransform(scrollYProgress, [0.40, 0.47], [50, 0]);

  const desktopCardsAnim = [
    {
      op: dCard1Op,
      y: dCard1Y,
      ptr: useTransform(dCard1Op, (v) => (v > 0.1 ? "auto" : "none")),
    },
    {
      op: dCard2Op,
      y: dCard2Y,
      ptr: useTransform(dCard2Op, (v) => (v > 0.1 ? "auto" : "none")),
    },
    {
      op: dCard3Op,
      y: dCard3Y,
      ptr: useTransform(dCard3Op, (v) => (v > 0.1 ? "auto" : "none")),
    },
  ];

  // MOBILE: cards appear one by one (stacked, like Governance mobile)
  const mCard1Op = useTransform(
    scrollYProgress,
    [0.30, 0.35, 0.45, 0.48],
    [0, 1, 1, 0]
  );
  const mCard1Y = useTransform(scrollYProgress, [0.30, 0.35], [50, 0]);

  const mCard2Op = useTransform(
    scrollYProgress,
    [0.47, 0.52, 0.62, 0.65],
    [0, 1, 1, 0]
  );
  const mCard2Y = useTransform(scrollYProgress, [0.47, 0.52], [50, 0]);

  const mCard3Op = useTransform(
    scrollYProgress,
    [0.64, 0.69, 0.79, 0.82],
    [0, 1, 1, 0]
  );
  const mCard3Y = useTransform(scrollYProgress, [0.64, 0.69], [50, 0]);

  const mobileCardsAnim = [
    {
      op: mCard1Op,
      y: mCard1Y,
      ptr: useTransform(mCard1Op, (v) => (v > 0.1 ? "auto" : "none")),
    },
    {
      op: mCard2Op,
      y: mCard2Y,
      ptr: useTransform(mCard2Op, (v) => (v > 0.1 ? "auto" : "none")),
    },
    {
      op: mCard3Op,
      y: mCard3Y,
      ptr: useTransform(mCard3Op, (v) => (v > 0.1 ? "auto" : "none")),
    },
  ];


  return (
    <section
      id="events"
      ref={containerRef}
      className="relative z-20 w-full h-[4500px] pointer-events-none"
    >
      {/* Stable fixed wrapper */}
      <div
        className="fixed top-0 left-0 w-full pointer-events-none"
        style={{ height: vh }}
      >
        {/* ════════════════ WORDS — DESKTOP ════════════════ */}
        <motion.div
          style={{ opacity: containerOpacityDesktop }}
          className="
            hidden md:flex
            absolute bottom-80 min-[1440px]:bottom-[400px]
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
              className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight ${word === "Mantle" || word === "IRL" || word === "Online"
                  ? "text-[#00D4A0]"
                  : "text-white"
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
            absolute bottom-96
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
              className={`text-4xl font-bold tracking-tight leading-tight ${word === "Mantle" || word === "IRL" || word === "Online"
                  ? "text-[#00D4A0]"
                  : "text-white"
                }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* ════════════════ mantle_text.png — DESKTOP ════════════════ */}
        <motion.div
           className="
            hidden md:block absolute
            pointer-events-none select-none
            left-1/2 -translate-x-1/2
            bottom-[44px]
            min-[1440px]:bottom-[50px]
          "
          style={{
            opacity: mantleTextOpacityDesktop,
          }}
        >
          <div className="relative w-[120px] h-[42px]">
            <Image
              src="/img/mantle_text1.png"
              alt="Mantle"
              fill
              className="object-contain object-center"
            />
          </div>
        </motion.div>

        {/* ════════════════ mantle_text.png — MOBILE ════════════════ */}
        <motion.div
          className="block md:hidden absolute pointer-events-none select-none left-1/2 -translate-x-1/2"
          style={{
            opacity: mantleTextOpacityMobile,
            bottom: "36px",
          }}
        >
          <div className="relative w-[100px] h-[35px]">
            <Image
              src="/img/mantle_text1.png"
              alt="Mantle"
              fill
              className="object-contain object-center"
            />
          </div>
        </motion.div>


        {/* ════════════════ EVENT CARDS — DESKTOP ════════════════ */}
        <div className="hidden md:flex absolute top-[46%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl gap-6 pointer-events-none">
          {eventCardsData.map((card, i) => (
            <motion.div
              key={`event-desktop-${i}`}
              style={{
                opacity: desktopCardsAnim[i].op,
                y: desktopCardsAnim[i].y,
                pointerEvents: desktopCardsAnim[i].ptr,
              }}
              className="flex-1 border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col bg-gradient-to-b from-[#092C25]/60 to-[#092C25]/90 hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >
              {/* Card Image */}
              <div className="relative w-full h-[140px] lg:h-[160px] overflow-hidden rounded-t-2xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {/* Card Content */}
              <div className="flex flex-col flex-1 justify-between p-5 gap-4">
                <p className="text-white text-base lg:text-xl font-semibold leading-snug">
                  {card.title}
                </p>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 bg-[#153e33] border border-[#00D4A0]/40 text-white font-semibold rounded-xl hover:bg-[#00D4A0] hover:text-[#092C25] hover:border-[#00D4A0] transition-all duration-300 cursor-pointer text-sm shadow-md self-start"
                >
                  Visit
                  <FiArrowRight className="text-base" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ════════════════ EVENT CARDS — MOBILE ════════════════ */}
        <div className="flex md:hidden absolute top-[46%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[75%] max-w-[280px] pointer-events-none h-[300px]">
          {eventCardsData.map((card, i) => (
            <motion.div
              key={`event-mobile-${i}`}
              style={{
                opacity: mobileCardsAnim[i].op,
                y: mobileCardsAnim[i].y,
                pointerEvents: mobileCardsAnim[i].ptr,
              }}
              className="absolute inset-0 w-full h-full border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col bg-gradient-to-b from-[#092C25]/60 to-[#092C25]/90 shadow-xl"
            >
              {/* Card Image — rounded */}
              <div className="relative w-full h-[130px] overflow-hidden rounded-t-2xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {/* Card Content */}
              <div className="flex flex-col flex-1 justify-between p-5 gap-3">
                <p className="text-white text-base font-semibold leading-snug">
                  {card.title}
                </p>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#153e33] border border-[#00D4A0]/40 text-white font-semibold rounded-xl hover:bg-[#00D4A0] hover:text-[#092C25] hover:border-[#00D4A0] transition-all duration-300 cursor-pointer text-sm shadow-md"
                >
                  Visit
                  <FiArrowRight className="text-base" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}