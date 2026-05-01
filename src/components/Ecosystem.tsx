"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const words = ["We", "build", "$MNT-powered", "products", "on", "Ethereum"];
const TEXT_START = 8000;

// Data for 3 Cards
const cardsData = [
  {
    title: "ZK Roadmap",
    desc: "Delivering institutional-grade settlement and value transfer as the world's largest L2 with ZK validity proofs — supporting banking for the next generation.",
    link: "Learn More",
  },
  {
    title: "Modular Design",
    desc: "Upgradable modules for execution, data availability, and finality.",
    link: "Build On Mantle",
  },
  {
    title: "EigenLayer Integration",
    desc: "First L2 to adopt EigenDA technology and enable ETH restaking via Eigenlayer.",
    link: "Restake",
  },
];

export default function Ecosystem() {
  const { scrollY } = useScroll();

  // --- TEXT ANIMATION  ---
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

  const containerOpacity = useTransform(scrollY, [9800, 10800], [1, 0]);

  // --- DESKTOP ANIMATION CARDS ---
  // Timing is adjusted so that it is not cut off by the bottom of the page.
  const dCard1Op = useTransform(scrollY, [10700, 11100, 12300, 12700], [0, 1, 1, 0]);
  const dCard1Y = useTransform(scrollY, [10700, 11100], [50, 0]);

  const dCard2Op = useTransform(scrollY, [10900, 11300, 12500, 12900], [0, 1, 1, 0]);
  const dCard2Y = useTransform(scrollY, [10900, 11300], [50, 0]);

  const dCard3Op = useTransform(scrollY, [11100, 11500, 12700, 13100], [0, 1, 1, 0]);
  const dCard3Y = useTransform(scrollY, [11100, 11500], [50, 0]);

  const desktopCardsAnim = [
    { op: dCard1Op, y: dCard1Y },
    { op: dCard2Op, y: dCard2Y },
    { op: dCard3Op, y: dCard3Y },
  ];

  // --- MOBILE ANIMATION CARDS ---
  // Timing is tightened so that the turns are smooth and definitely appear on the short HP screen.
  const mCard1Op = useTransform(scrollY, [10700, 11000, 11600, 11900], [0, 1, 1, 0]);
  const mCard1Y = useTransform(scrollY, [10700, 11000], [50, 0]);

  const mCard2Op = useTransform(scrollY, [11950, 12250, 12850, 13150], [0, 1, 1, 0]);
  const mCard2Y = useTransform(scrollY, [11950, 12250], [50, 0]);

  const mCard3Op = useTransform(scrollY, [13200, 13500, 14100, 14400], [0, 1, 1, 0]);
  const mCard3Y = useTransform(scrollY, [13200, 13500], [50, 0]);

  const mobileCardsAnim = [
    { op: mCard1Op, y: mCard1Y },
    { op: mCard2Op, y: mCard2Y },
    { op: mCard3Op, y: mCard3Y },
  ];

  return (
    <section
      id="ecosystem"
      className="relative z-10 w-full h-[1100vh] pointer-events-none"
    >
      {/* TEXT POSITION */}
      <motion.div
        style={{ opacity: containerOpacity }}
        className="
          fixed
          bottom-80 md:bottom-64
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

      {/* DESKTOP CARDS (md:flex) */}
      <div className="hidden md:flex fixed top-[60%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl gap-6 pointer-events-auto">
        {cardsData.map((card, i) => (
          <motion.div
            key={`desktop-${i}`}
            style={{ opacity: desktopCardsAnim[i].op, y: desktopCardsAnim[i].y }}
            className="flex-1 min-h-[300px] bg-[#092C25]/40 border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between hover:bg-[#092C25]/60 transition-colors duration-300"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                {card.desc}
              </p>
            </div>
            <a
              href="#"
              className="mt-8 inline-block text-[#00D4A0] font-semibold hover:text-white transition-colors"
            >
              {card.link} →
            </a>
          </motion.div>
        ))}
      </div>

      {/* MOBILE CARDS (md:hidden) */}
      <div className="flex md:hidden fixed top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-sm pointer-events-auto h-[320px]">
        {cardsData.map((card, i) => (
          <motion.div
            key={`mobile-${i}`}
            style={{ opacity: mobileCardsAnim[i].op, y: mobileCardsAnim[i].y }}
            className="absolute inset-0 w-full h-full bg-[#092C25]/60 border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {card.desc}
              </p>
            </div>
            <a
              href="#"
              className="mt-6 inline-block text-[#00D4A0] font-semibold hover:text-white transition-colors"
            >
              {card.link} →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}