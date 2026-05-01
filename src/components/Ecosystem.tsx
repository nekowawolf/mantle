"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const words = ["We", "build", "$MNT-powered", "products", "on", "Ethereum"];

const TEXT_START = 8000;

export default function Ecosystem() {
  const { scrollY } = useScroll();

  const wordOpacities = words.map((_, i) => {
    const wordStart = TEXT_START + i * 120;
    const wordEnd = wordStart + 400;
    return useTransform(scrollY, [wordStart, wordEnd], [0, 1]);
  });

  const wordYs = words.map((_, i) => {
    const wordStart = TEXT_START + i * 120;
    const wordEnd = wordStart + 400;
    return useTransform(scrollY, [wordStart, wordEnd], [40, 0]);
  });

  const containerOpacity = useTransform(
    scrollY,
    [9500, 10000],
    [1, 0]
  );

  return (
    <section
      id="ecosystem"
      className="relative z-10 w-full h-[1000vh] pointer-events-none"
    >
      {/* text position */}
      <motion.div
        style={{ opacity: containerOpacity }}
        className="
          fixed
          bottom-48 md:bottom-64
          left-1/2 -translate-x-1/2
          w-[90%] max-w-4xl
          flex flex-wrap justify-center gap-x-4 gap-y-2
        "
      >
        {words.map((word, i) => (
          <motion.span
            key={word + i}
            style={{
              opacity: wordOpacities[i],
              y: wordYs[i],
            }}
            className={`
              text-4xl md:text-6xl lg:text-7xl
              font-bold tracking-tight leading-tight
              ${word === "$MNT-powered" ? "text-[#00D4A0]" : "text-white"}
            `}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}