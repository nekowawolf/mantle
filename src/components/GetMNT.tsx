"use client";

import { useEffect, useRef, useState } from "react";
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

// CEX images
const cexImages = [
  "https://cms.mantle.xyz/assets/5ad6aa20-2e1d-463e-9b1f-7e3de7f53c9f",
  "https://cms.mantle.xyz/assets/ebe45a64-40ce-4ee9-822c-47708b141dd6",
  "https://cms.mantle.xyz/assets/8a6562a2-31b5-4b05-a0bb-312fd7126cd1", 
  "https://cms.mantle.xyz/assets/97c59f85-b73a-48da-9d3f-7cb6e732a200", 
];

// DEX images
const dexImages = [
  "https://cms.mantle.xyz/assets/d2576c94-0039-4c68-b4f9-53b15c67f21d", 
  "https://cms.mantle.xyz/assets/4379de1a-e98e-4be0-a92f-24278d590393", 
  "https://cms.mantle.xyz/assets/2fdbdf9e-9906-4481-9277-2ea5b75ac782", 
  "https://cms.mantle.xyz/assets/a38ede32-2060-48b1-9ddc-05be4d4d7154", 
];

// ─── Candlestick data ───────────────────────────────────────────────────────
const closes = [
  0.15, 0.18, 0.20, 0.25, 0.30, 0.32, 0.34, 0.36, 0.40, 0.42, 0.44, 0.46,
  0.52, 0.56, 0.58, 0.60, 0.59, 0.62, 0.60, 0.65, 0.63, 0.66, 0.68, 0.67,
  0.70, 0.72, 0.68, 0.69, 0.67, 0.65, 0.63, 0.60, 0.55, 0.52, 0.50, 0.48,
  0.46, 0.44, 0.42, 0.45, 0.43, 0.46, 0.44, 0.45, 0.50, 0.54, 0.57, 0.60,
  0.63, 0.66, 0.70, 0.68, 0.69, 0.70, 0.68, 0.72, 0.68, 0.66, 0.67, 0.65,
  0.68, 0.64, 0.66, 0.65, 0.67, 0.70, 0.72, 0.74, 0.76, 0.78, 0.82, 0.85,
  0.87, 0.88, 0.90, 0.89, 0.92, 0.95,
];

interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  isGreen: boolean;
}

function buildCandles(): CandleData[] {
  const candles: CandleData[] = [];
  let prevClose = closes[0] - 0.02;
  // Use seeded-like fixed random values to avoid hydration issues
  const wickTops = [
    0.012, 0.008, 0.014, 0.006, 0.010, 0.013, 0.007, 0.011, 0.009, 0.015,
    0.008, 0.012, 0.006, 0.014, 0.010, 0.007, 0.013, 0.009, 0.011, 0.008,
    0.015, 0.006, 0.012, 0.010, 0.007, 0.014, 0.009, 0.013, 0.008, 0.011,
    0.006, 0.015, 0.010, 0.007, 0.012, 0.014, 0.009, 0.008, 0.013, 0.011,
    0.006, 0.015, 0.010, 0.007, 0.012, 0.009, 0.014, 0.008, 0.011, 0.013,
    0.006, 0.015, 0.010, 0.007, 0.012, 0.009, 0.014, 0.008, 0.011, 0.013,
    0.007, 0.010, 0.006, 0.015, 0.012, 0.009, 0.014, 0.008, 0.011, 0.013,
    0.006, 0.015, 0.010, 0.007, 0.012, 0.009, 0.014, 0.008,
  ];
  const wickBots = [
    0.007, 0.011, 0.009, 0.013, 0.008, 0.006, 0.014, 0.010, 0.012, 0.007,
    0.015, 0.009, 0.013, 0.008, 0.011, 0.014, 0.006, 0.010, 0.012, 0.007,
    0.009, 0.015, 0.008, 0.011, 0.013, 0.007, 0.010, 0.006, 0.014, 0.012,
    0.009, 0.008, 0.013, 0.015, 0.011, 0.007, 0.010, 0.014, 0.006, 0.012,
    0.009, 0.008, 0.013, 0.015, 0.011, 0.007, 0.010, 0.014, 0.006, 0.012,
    0.009, 0.008, 0.013, 0.015, 0.011, 0.007, 0.010, 0.014, 0.006, 0.012,
    0.013, 0.009, 0.015, 0.008, 0.011, 0.007, 0.010, 0.014, 0.006, 0.012,
    0.009, 0.008, 0.013, 0.015, 0.011, 0.007, 0.010, 0.014,
  ];

  for (let i = 0; i < closes.length; i++) {
    const close = closes[i];
    const open = prevClose;
    const isGreen = close >= open;
    const high = Math.max(open, close) + (wickTops[i] ?? 0.01);
    const low = Math.min(open, close) - (wickBots[i] ?? 0.008);
    candles.push({ open, high, low, close, isGreen });
    prevClose = close;
  }
  return candles;
}

const CANDLES = buildCandles();

// ─── CandleChart component ──────────────────────────────────────────────────
interface CandleChartProps {
  /** 0 → invisible, 1 → fully visible (matches heading opacity) */
  opacity: number;
  isMobile: boolean;
}

function CandleChart({ opacity, isMobile }: CandleChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Responsive logical size
    const W = isMobile ? 360 : 800;
    const H = isMobile ? 160 : 280;
    canvas.width = W;
    canvas.height = H;

    const margin = isMobile
      ? { left: 4, right: 4, top: 10, bottom: 10 }
      : { left: 8, right: 8, top: 16, bottom: 16 };

    const chartW = W - margin.left - margin.right;
    const chartH = H - margin.top - margin.bottom;

    const totalCandles = CANDLES.length;
    const candleSpacing = chartW / (totalCandles + 2);
    const candleWidth = Math.max(isMobile ? 3 : 5, candleSpacing * 0.6);

    function priceToY(p: number) {
      return margin.top + chartH * (1 - p);
    }

    const buildDuration = 9500;
    const holdDuration = 1200;
    const fadeDuration = 600;
    const totalDuration = buildDuration + holdDuration + fadeDuration;
    const timePerCandle = buildDuration / totalCandles;

    const drawCandle = (
      candle: CandleData,
      x: number,
      progress: number
    ) => {
      const { open, high, low, close, isGreen } = candle;
      const color = isGreen ? "#00ff88" : "#ff3b5c";
      const glow = isGreen ? "rgba(0,255,136,0.9)" : "rgba(255,59,92,0.9)";

      const curClose = open + (close - open) * progress;
      const curHigh = open + (high - open) * Math.min(1, progress * 1.2);
      const curLow = open + (low - open) * Math.min(1, progress * 1.2);

      const yOpen = priceToY(open);
      const yClose = priceToY(curClose);
      const yHigh = priceToY(curHigh);
      const yLow = priceToY(curLow);

      const bodyTop = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(1.5, Math.abs(yClose - yOpen));

      ctx.save();
      ctx.shadowColor = glow;
      ctx.shadowBlur = isMobile ? 10 : 18;
      ctx.strokeStyle = color;
      ctx.lineWidth = isMobile ? 1 : 1.5;

      // wick
      ctx.beginPath();
      ctx.moveTo(x, yHigh);
      ctx.lineTo(x, yLow);
      ctx.stroke();

      // body
      ctx.shadowBlur = isMobile ? 14 : 22;
      ctx.fillStyle = color;
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);

      // inner bright core
      ctx.shadowBlur = 0;
      ctx.fillStyle = isGreen ? "#b6ffe1" : "#ffb3c0";
      ctx.globalAlpha = 0.28;
      ctx.fillRect(
        x - candleWidth / 2 + 0.5,
        bodyTop + 0.5,
        Math.max(0.5, candleWidth - 1),
        Math.max(0.5, bodyHeight - 1)
      );
      ctx.restore();
    };

    const animate = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = (ts - startTimeRef.current) % totalDuration;

      ctx.clearRect(0, 0, W, H);

      let alpha = opacity; // respect external opacity
      if (elapsed > buildDuration + holdDuration) {
        alpha *= 1 - (elapsed - buildDuration - holdDuration) / fadeDuration;
      }
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

      const activeCount = Math.min(
        totalCandles,
        Math.floor(elapsed / timePerCandle) + 1
      );

      for (let i = 0; i < activeCount; i++) {
        const candleStart = i * timePerCandle;
        const progress = Math.min(
          1,
          Math.max(0, (elapsed - candleStart) / (timePerCandle * 0.85))
        );
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const x = margin.left + candleSpacing * (i + 1.5);
        drawCandle(CANDLES[i], x, eased);
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        imageRendering: "crisp-edges",
      }}
    />
  );
}

// ─── Main GetMNT component ──────────────────────────────────────────────────
export default function GetMNT() {
  const { scrollY } = useScroll();

  // Frozen VH for stable positioning on mobile
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

  // ─── DESKTOP ───────────────────────────────────────────────────────────────

  // "How to get MNT?" clip-in
  const headingClipDesktop = useTransform(
    scrollY,
    [GETMNT_START_DESKTOP, GETMNT_START_DESKTOP + 500],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // "How to get MNT?" fade-out
  const headingOpacityDesktop = useTransform(
    scrollY,
    [GETMNT_START_DESKTOP + 7100, GETMNT_START_DESKTOP + 7500],
    [1, 0]
  );

  // Chart opacity — same lifecycle as the heading (appears as heading enters, fades as heading fades)
  const chartOpacityDesktop = useTransform(
    scrollY,
    [
      GETMNT_START_DESKTOP,
      GETMNT_START_DESKTOP + 500,
      GETMNT_START_DESKTOP + 7100,
      GETMNT_START_DESKTOP + 7500,
    ],
    [0, 1, 1, 0]
  );

  // "View More"
  const viewMoreOpacityDesktop = useTransform(
    scrollY,
    [
      GETMNT_START_DESKTOP + 2300,
      GETMNT_START_DESKTOP + 2700,
      GETMNT_START_DESKTOP + 7100,
      GETMNT_START_DESKTOP + 7500,
    ],
    [0, 1, 1, 0]
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

  // CEX section
  const cexOpacityDesktop = useTransform(
    scrollY,
    [
      GETMNT_START_DESKTOP + 4100,
      GETMNT_START_DESKTOP + 4500,
      GETMNT_START_DESKTOP + 5300,
      GETMNT_START_DESKTOP + 5700,
    ],
    [0, 1, 1, 0]
  );

  // DEX section
  const dexOpacityDesktop = useTransform(
    scrollY,
    [
      GETMNT_START_DESKTOP + 5900,
      GETMNT_START_DESKTOP + 6300,
      GETMNT_START_DESKTOP + 7100,
      GETMNT_START_DESKTOP + 7500,
    ],
    [0, 1, 1, 0]
  );

  // ─── MOBILE ────────────────────────────────────────────────────────────────

  // "How to get MNT?" clip-in
  const headingClipMobile = useTransform(
    scrollY,
    [GETMNT_START_MOBILE, GETMNT_START_MOBILE + 500],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // "How to get MNT?" fade-out
  const headingOpacityMobile = useTransform(
    scrollY,
    [GETMNT_START_MOBILE + 7100, GETMNT_START_MOBILE + 7500],
    [1, 0]
  );

  // Chart opacity — same lifecycle as the heading
  const chartOpacityMobile = useTransform(
    scrollY,
    [
      GETMNT_START_MOBILE,
      GETMNT_START_MOBILE + 500,
      GETMNT_START_MOBILE + 7100,
      GETMNT_START_MOBILE + 7500,
    ],
    [0, 1, 1, 0]
  );

  // "View More"
  const viewMoreOpacityMobile = useTransform(
    scrollY,
    [
      GETMNT_START_MOBILE + 2300,
      GETMNT_START_MOBILE + 2700,
      GETMNT_START_MOBILE + 7100,
      GETMNT_START_MOBILE + 7500,
    ],
    [0, 1, 1, 0]
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

  // Bridges section
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

  // CEX section
  const cexOpacityMobile = useTransform(
    scrollY,
    [
      GETMNT_START_MOBILE + 4100,
      GETMNT_START_MOBILE + 4500,
      GETMNT_START_MOBILE + 5300,
      GETMNT_START_MOBILE + 5700,
    ],
    [0, 1, 1, 0]
  );

  // DEX section
  const dexOpacityMobile = useTransform(
    scrollY,
    [
      GETMNT_START_MOBILE + 5900,
      GETMNT_START_MOBILE + 6300,
      GETMNT_START_MOBILE + 7100,
      GETMNT_START_MOBILE + 7500,
    ],
    [0, 1, 1, 0]
  );

  // ─── Live opacity values for canvas (read on each RAF) ────────────────────
  const chartOpacityDesktopRef = useRef(0);
  const chartOpacityMobileRef = useRef(0);

  useEffect(() => {
    return chartOpacityDesktop.on("change", (v) => {
      chartOpacityDesktopRef.current = v;
    });
  }, [chartOpacityDesktop]);

  useEffect(() => {
    return chartOpacityMobile.on("change", (v) => {
      chartOpacityMobileRef.current = v;
    });
  }, [chartOpacityMobile]);

  // ─── HELPER: Render image group ────────────────────────────────────────────
  const renderImageGroup = (
    images: string[],
    label: string,
    size: "desktop" | "mobile"
  ) => {
    const isDesktop = size === "desktop";
    const imgClass = isDesktop ? "w-14 h-14" : "w-12 h-12";
    const gapClass = isDesktop ? "gap-5" : "gap-4";
    const textClass = isDesktop ? "text-sm" : "text-xs";
    const spacingClass = isDesktop ? "gap-5" : "gap-4";

    return (
      <div className={`flex flex-col items-center ${spacingClass}`}>
        <p
          className={`text-white ${textClass} font-semibold tracking-widest uppercase opacity-60`}
        >
          {label}
        </p>
        <div
          className={`flex items-center justify-center ${gapClass} flex-wrap`}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className={`relative ${imgClass} rounded-xl overflow-hidden flex-shrink-0`}
            >
              <img
                src={src}
                alt={`${label.toLowerCase()}-${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="get-mnt"
      className="relative z-20 w-full h-[11500px] md:h-[7500px] pointer-events-none"
    >
      {/* Stable fixed wrapper to prevent mobile address bar shifting */}
      <div 
        className="fixed top-0 left-0 w-full pointer-events-none"
        style={{ height: vh }}
      >

      <div className="hidden md:block">
        {/* Candlestick Chart — appears & disappears with the heading */}
        <motion.div
          style={{ opacity: chartOpacityDesktop }}
          className="
            absolute
            top-[35%]
            left-1/2 -translate-x-1/2
            w-[70%] max-w-3xl
            h-[280px]
            pointer-events-none
          "
        >
          <CandleChartCanvas
            opacityMotion={chartOpacityDesktop}
            isMobile={false}
          />
        </motion.div>

        {/* Heading */}
        <div
          className="
            absolute
            top-[13%]
            left-1/2 -translate-x-1/2
            pointer-events-none
            overflow-hidden
            pb-4
          "
        >
          <motion.h2
            style={{
              clipPath: headingClipDesktop,
              opacity: headingOpacityDesktop,
            }}
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
            absolute
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
            absolute
            bottom-[16%]
            left-1/2 -translate-x-1/2
            w-[90%] max-w-3xl
            flex flex-col items-center
            pointer-events-none
          "
        >
          {renderImageGroup(bridgeImages, "Bridges", "desktop")}
        </motion.div>

        {/* CEX section */}
        <motion.div
          style={{ opacity: cexOpacityDesktop }}
          className="
            absolute
            bottom-[16%]
            left-1/2 -translate-x-1/2
            w-[90%] max-w-3xl
            flex flex-col items-center
            pointer-events-none
          "
        >
          {renderImageGroup(cexImages, "CEX", "desktop")}
        </motion.div>

        {/* DEX section */}
        <motion.div
          style={{ opacity: dexOpacityDesktop }}
          className="
            absolute
            bottom-[16%]
            left-1/2 -translate-x-1/2
            w-[90%] max-w-3xl
            flex flex-col items-center
            pointer-events-none
          "
        >
          {renderImageGroup(dexImages, "DEX", "desktop")}
        </motion.div>

        {/* View More link */}
        <motion.div
          style={{ opacity: viewMoreOpacityDesktop }}
          className="
            absolute
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
              flex items-center gap-1.5
              text-[#00D4A0] text-xs font-medium
              tracking-[0.2em] uppercase
              border-b border-[#00D4A0]/40
              hover:border-[#00D4A0]
              transition-all duration-300
              pb-[2px]
            "
          >
            View More <FiArrowRight className="text-sm" />
          </a>
        </motion.div>
      </div>

      {/* ══════════════════════ MOBILE ══════════════════════ */}
      <div className="flex md:hidden">
        {/* Candlestick Chart — mobile */}
        <motion.div
          style={{ opacity: chartOpacityMobile }}
          className="
            absolute
            top-[40%]
            left-1/2 -translate-x-1/2
            w-[105%]
            h-[160px]
            pointer-events-none
          "
        >
          <CandleChartCanvas
            opacityMotion={chartOpacityMobile}
            isMobile={true}
          />
        </motion.div>

        {/* Heading */}
        <div
          className="
            absolute
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
            style={{
              clipPath: headingClipMobile,
              opacity: headingOpacityMobile,
            }}
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
            absolute
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
            absolute
            bottom-[25%]
            left-1/2 -translate-x-1/2
            w-[90%]
            flex flex-col items-center
            pointer-events-none
          "
        >
          {renderImageGroup(bridgeImages, "Bridges", "mobile")}
        </motion.div>

        {/* CEX section */}
        <motion.div
          style={{ opacity: cexOpacityMobile }}
          className="
            absolute
            bottom-[25%]
            left-1/2 -translate-x-1/2
            w-[90%]
            flex flex-col items-center
            pointer-events-none
          "
        >
          {renderImageGroup(cexImages, "CEX", "mobile")}
        </motion.div>

        {/* DEX section */}
        <motion.div
          style={{ opacity: dexOpacityMobile }}
          className="
            absolute
            bottom-[25%]
            left-1/2 -translate-x-1/2
            w-[90%]
            flex flex-col items-center
            pointer-events-none
          "
        >
          {renderImageGroup(dexImages, "DEX", "mobile")}
        </motion.div>

        {/* View More link */}
        <motion.div
          style={{ opacity: viewMoreOpacityMobile }}
          className="
            absolute
            bottom-[18%]
            left-1/2 -translate-x-1/2
            pointer-events-auto
          "
        >
          <a
            href="https://www.mantle.xyz/mnt"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1
              text-[#00D4A0] text-[10px] font-medium
              tracking-[0.2em] uppercase
              border-b border-[#00D4A0]/40
              hover:border-[#00D4A0]
              transition-all duration-300
              pb-[1px]
            "
          >
            View More <FiArrowRight className="text-xs" />
          </a>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Canvas wrapper that reads MotionValue opacity each frame ─────────────
import type { MotionValue } from "framer-motion";

function CandleChartCanvas({
  opacityMotion,
  isMobile,
}: {
  opacityMotion: MotionValue<number>;
  isMobile: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = isMobile ? 360 : 800;
    const H = isMobile ? 160 : 280;
    canvas.width = W;
    canvas.height = H;

    const margin = isMobile
      ? { left: 4, right: 4, top: 10, bottom: 10 }
      : { left: 8, right: 8, top: 16, bottom: 16 };

    const chartW = W - margin.left - margin.right;
    const chartH = H - margin.top - margin.bottom;

    const totalCandles = CANDLES.length;
    const candleSpacing = chartW / (totalCandles + 2);
    const candleWidth = Math.max(isMobile ? 3 : 5, candleSpacing * 0.6);

    function priceToY(p: number) {
      return margin.top + chartH * (1 - p);
    }

    const buildDuration = 9500;
    const holdDuration = 1200;
    const fadeDuration = 600;
    const totalDuration = buildDuration + holdDuration + fadeDuration;
    const timePerCandle = buildDuration / totalCandles;

    const drawCandle = (candle: CandleData, x: number, progress: number) => {
      const { open, high, low, close, isGreen } = candle;
      const color = isGreen ? "#00ff88" : "#ff3b5c";
      const glow = isGreen ? "rgba(0,255,136,0.9)" : "rgba(255,59,92,0.9)";

      const curClose = open + (close - open) * progress;
      const curHigh = open + (high - open) * Math.min(1, progress * 1.2);
      const curLow = open + (low - open) * Math.min(1, progress * 1.2);

      const yOpen = priceToY(open);
      const yClose = priceToY(curClose);
      const yHigh = priceToY(curHigh);
      const yLow = priceToY(curLow);

      const bodyTop = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(1.5, Math.abs(yClose - yOpen));

      ctx.save();
      ctx.shadowColor = glow;
      ctx.shadowBlur = isMobile ? 10 : 18;
      ctx.strokeStyle = color;
      ctx.lineWidth = isMobile ? 1 : 1.5;

      ctx.beginPath();
      ctx.moveTo(x, yHigh);
      ctx.lineTo(x, yLow);
      ctx.stroke();

      ctx.shadowBlur = isMobile ? 14 : 22;
      ctx.fillStyle = color;
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);

      ctx.shadowBlur = 0;
      ctx.fillStyle = isGreen ? "#b6ffe1" : "#ffb3c0";
      ctx.globalAlpha = 0.28;
      ctx.fillRect(
        x - candleWidth / 2 + 0.5,
        bodyTop + 0.5,
        Math.max(0.5, candleWidth - 1),
        Math.max(0.5, bodyHeight - 1)
      );
      ctx.restore();
    };

    const animate = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = (ts - startTimeRef.current) % totalDuration;

      ctx.clearRect(0, 0, W, H);

      // Read live opacity from MotionValue
      let alpha = opacityMotion.get();
      if (elapsed > buildDuration + holdDuration) {
        alpha *= 1 - (elapsed - buildDuration - holdDuration) / fadeDuration;
      }

      // Skip rendering when fully invisible (perf)
      if (alpha <= 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

      const activeCount = Math.min(
        totalCandles,
        Math.floor(elapsed / timePerCandle) + 1
      );

      for (let i = 0; i < activeCount; i++) {
        const candleStart = i * timePerCandle;
        const progress = Math.min(
          1,
          Math.max(0, (elapsed - candleStart) / (timePerCandle * 0.85))
        );
        const eased = 1 - Math.pow(1 - progress, 3);
        const x = margin.left + candleSpacing * (i + 1.5);
        drawCandle(CANDLES[i], x, eased);
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile, opacityMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        imageRendering: "crisp-edges",
        background: "transparent",
      }}
    />
  );
}