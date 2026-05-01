"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

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

// Data for new 3 Cards (no link/button)
const newCardsData = [
  {
    title: "Native ETH Asset",
    desc: "mETH Protocol is a liquid ETH staking and restaking protocol that maximizes yields — widely accepted as collateral in CEXs & DeFi apps, and money markets.",
  },
  {
    title: "Native BTC Asset",
    desc: "Ignition fBTC bridges Bitcoin into Web3, unlocking new financial opportunities as the most integrated wrapped BTC asset, powering ecosystems like Babylon, Solv Protocol, and PumpBTC.",
  },
  {
    title: "Stables-Backed Yield Asset Partnerships",
    desc: "Mantle strengthens its ecosystem through partnerships with Ethena USDe, Agora AUSD, and Ondo USDy — enhancing treasury yield, institutional-backed stability, and innovative yield opportunities across the network.",
  },
];

// Data for partner cards
const partnerCardsData = [
  {
    logo: "https://www.mantle.xyz/images/home/project-ecofund-logo.svg",
    name: "EcoFund",
    desc: "The Mantle EcoFund supports ecosystem growth with a $200M capital pool, backing innovative projects alongside top-tier VCs like Polychain and Dragonfly.",
    link: "Visit",
  },
  {
    logo: "https://www.mantle.xyz/images/home/project-mirana-logo.svg",
    name: "Mirana Ventures",
    desc: "Mirana Ventures supports Mantle's EcoFund with strong venture capital expertise, helping drive ecosystem growth through strategic investments and industry experience.",
    link: "Visit",
  },
  {
    logo: "https://www.mantle.xyz/images/home/project-bybit-logo.svg",
    name: "Bybit",
    desc: "Bybit strengthens Mantle's liquidity and DeFi-CeFi integration through yield-bearing collateral, simplified asset access, fiat ramps, and connected on-chain and CEX opportunities.",
    link: "Visit",
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

  // --- NEW DESKTOP CARDS (appear after existing cards disappear) ---
  const dNewCard1Op = useTransform(scrollY, [13100, 13500, 14700, 15000], [0, 1, 1, 0]);
  const dNewCard1Y = useTransform(scrollY, [13100, 13500], [50, 0]);

  const dNewCard2Op = useTransform(scrollY, [13300, 13700, 14900, 15200], [0, 1, 1, 0]);
  const dNewCard2Y = useTransform(scrollY, [13300, 13700], [50, 0]);

  const dNewCard3Op = useTransform(scrollY, [13500, 13900, 15100, 15300], [0, 1, 1, 0]);
  const dNewCard3Y = useTransform(scrollY, [13500, 13900], [50, 0]);

  const desktopNewCardsAnim = [
    { op: dNewCard1Op, y: dNewCard1Y },
    { op: dNewCard2Op, y: dNewCard2Y },
    { op: dNewCard3Op, y: dNewCard3Y },
  ];

  // --- NEW MOBILE CARDS (appear after existing cards disappear) ---
  const mNewCard1Op = useTransform(scrollY, [14500, 14800, 15400, 15700], [0, 1, 1, 0]);
  const mNewCard1Y = useTransform(scrollY, [14500, 14800], [50, 0]);

  const mNewCard2Op = useTransform(scrollY, [15750, 16050, 16650, 16950], [0, 1, 1, 0]);
  const mNewCard2Y = useTransform(scrollY, [15750, 16050], [50, 0]);

  const mNewCard3Op = useTransform(scrollY, [17000, 17300, 17900, 18100], [0, 1, 1, 0]);
  const mNewCard3Y = useTransform(scrollY, [17000, 17300], [50, 0]);

  const mobileNewCardsAnim = [
    { op: mNewCard1Op, y: mNewCard1Y },
    { op: mNewCard2Op, y: mNewCard2Y },
    { op: mNewCard3Op, y: mNewCard3Y },
  ];


  // --- TEXT: "We work with initiatives..." ---
  const initiativeWords = ["We", "work", "with", "initiatives", "that", "boost", "user", "gains", "&", "fortify", "the", "ecosystem"];

  const INITIATIVE_TEXT_START_DESKTOP = 15400;
  const INITIATIVE_TEXT_START_MOBILE = 18200;

  // Desktop animations
  const initiativeWordOpacitiesDesktop = initiativeWords.map((_, i) => {
    const wordStart = INITIATIVE_TEXT_START_DESKTOP + i * 100;
    const wordEnd = wordStart + 320;

    return useTransform(scrollY, [wordStart, wordEnd], [0, 1]);
  });

  const initiativeWordYsDesktop = initiativeWords.map((_, i) => {
    const wordStart = INITIATIVE_TEXT_START_DESKTOP + i * 100;
    const wordEnd = wordStart + 320;

    return useTransform(scrollY, [wordStart, wordEnd], [40, 0]);
  });

  // Mobile animations
  const initiativeWordOpacitiesMobile = initiativeWords.map((_, i) => {
    const wordStart = INITIATIVE_TEXT_START_MOBILE + i * 120;
    const wordEnd = wordStart + 400;

    return useTransform(scrollY, [wordStart, wordEnd], [0, 1]);
  });

  const initiativeWordYsMobile = initiativeWords.map((_, i) => {
    const wordStart = INITIATIVE_TEXT_START_MOBILE + i * 120;
    const wordEnd = wordStart + 400;

    return useTransform(scrollY, [wordStart, wordEnd], [40, 0]);
  });

  const initiativeContainerOpacityDesktop = useTransform(
    scrollY,
    [18000, 18500],
    [1, 0]
  );

  const initiativeContainerOpacityMobile = useTransform(
    scrollY,
    [21000, 21500],
    [1, 0]
  );


  // --- PARTNER DESKTOP CARDS ---
  const dPartnerCard1Op = useTransform(
    scrollY,
    [18600, 19000, 20800, 21200],
    [0, 1, 1, 0]
  );
  const dPartnerCard1Y = useTransform(scrollY, [18600, 19000], [50, 0]);

  const dPartnerCard2Op = useTransform(
    scrollY,
    [18800, 19200, 21000, 21400],
    [0, 1, 1, 0]
  );
  const dPartnerCard2Y = useTransform(scrollY, [18800, 19200], [50, 0]);

  const dPartnerCard3Op = useTransform(
    scrollY,
    [19000, 19400, 21200, 21600],
    [0, 1, 1, 0]
  );
  const dPartnerCard3Y = useTransform(scrollY, [19000, 19400], [50, 0]);

  const desktopPartnerCardsAnim = [
    { op: dPartnerCard1Op, y: dPartnerCard1Y },
    { op: dPartnerCard2Op, y: dPartnerCard2Y },
    { op: dPartnerCard3Op, y: dPartnerCard3Y },
  ];


  // --- PARTNER MOBILE CARDS ---
  const mPartnerCard1Op = useTransform(
    scrollY,
    [21600, 21900, 22900, 23200],
    [0, 1, 1, 0]
  );
  const mPartnerCard1Y = useTransform(scrollY, [21600, 21900], [50, 0]);

  const mPartnerCard2Op = useTransform(
    scrollY,
    [23250, 23550, 24550, 24850],
    [0, 1, 1, 0]
  );
  const mPartnerCard2Y = useTransform(scrollY, [23250, 23550], [50, 0]);

  const mPartnerCard3Op = useTransform(
    scrollY,
    [24900, 25200, 26200, 26500],
    [0, 1, 1, 0]
  );
  const mPartnerCard3Y = useTransform(scrollY, [24900, 25200], [50, 0]);

  const mobilePartnerCardsAnim = [
    { op: mPartnerCard1Op, y: mPartnerCard1Y },
    { op: mPartnerCard2Op, y: mPartnerCard2Y },
    { op: mPartnerCard3Op, y: mPartnerCard3Y },
  ];


  return (
    <section
      id="ecosystem"
      className="relative z-10 w-full h-[2000vh] pointer-events-none"
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

      {/* NEW DESKTOP CARDS (md:flex) - appear after existing cards */}
      <div className="hidden md:flex fixed top-[60%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl gap-6 pointer-events-auto">
        {newCardsData.map((card, i) => (
          <motion.div
            key={`desktop-new-${i}`}
            style={{ opacity: desktopNewCardsAnim[i].op, y: desktopNewCardsAnim[i].y }}
            className="flex-1 min-h-[300px] bg-[#092C25]/40 border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between hover:bg-[#092C25]/60 transition-colors duration-300"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* NEW MOBILE CARDS (md:hidden) - appear after existing cards */}
      <div className="flex md:hidden fixed top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-sm pointer-events-auto h-[320px]">
        {newCardsData.map((card, i) => (
          <motion.div
            key={`mobile-new-${i}`}
            style={{ opacity: mobileNewCardsAnim[i].op, y: mobileNewCardsAnim[i].y }}
            className="absolute inset-0 w-full h-full bg-[#092C25]/60 border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* INITIATIVE TEXT - DESKTOP */}
      <motion.div
        style={{ opacity: initiativeContainerOpacityDesktop }}
        className="
          hidden md:flex
          fixed
          bottom-40
          left-1/2 -translate-x-1/2
          w-[90%] max-w-4xl
          flex-wrap justify-center gap-x-4 gap-y-2
        "
      >
        {initiativeWords.map((word, i) => (
          <motion.span
            key={`initiative-desktop-${word}-${i}`}
            style={{
              opacity: initiativeWordOpacitiesDesktop[i],
              y: initiativeWordYsDesktop[i],
            }}
            className={`
              text-6xl lg:text-7xl
              font-bold tracking-tight leading-tight
              ${(word === "gains" || word === "ecosystem") ? "text-[#00D4A0]" : "text-white"}
            `}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* INITIATIVE TEXT - MOBILE */}
      <motion.div
        style={{ opacity: initiativeContainerOpacityMobile }}
        className="
          flex md:hidden
          fixed
          bottom-80
          left-1/2 -translate-x-1/2
          w-[90%]
          flex-wrap justify-center gap-x-4 gap-y-2
        "
      >
        {initiativeWords.map((word, i) => (
          <motion.span
            key={`initiative-mobile-${word}-${i}`}
            style={{
              opacity: initiativeWordOpacitiesMobile[i],
              y: initiativeWordYsMobile[i],
            }}
            className={`
              text-4xl
              font-bold tracking-tight leading-tight
              ${(word === "gains" || word === "ecosystem") ? "text-[#00D4A0]" : "text-white"}
            `}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* PARTNER DESKTOP CARDS (md:flex) */}
      <div className="hidden md:flex fixed top-[60%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl gap-6 pointer-events-auto">
        {partnerCardsData.map((card, i) => (
          <motion.div
            key={`desktop-partner-${i}`}
            style={{ opacity: desktopPartnerCardsAnim[i].op, y: desktopPartnerCardsAnim[i].y }}
            className="flex-1 min-h-[300px] bg-[#092C25]/40 border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between hover:bg-[#092C25]/60 transition-colors duration-300"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10">
                  <Image
                    src={card.logo}
                    alt={card.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white">{card.name}</h3>
              </div>
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

      {/* PARTNER MOBILE CARDS (md:hidden) */}
      <div className="flex md:hidden fixed top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-sm pointer-events-auto h-[320px]">
        {partnerCardsData.map((card, i) => (
          <motion.div
            key={`mobile-partner-${i}`}
            style={{ opacity: mobilePartnerCardsAnim[i].op, y: mobilePartnerCardsAnim[i].y }}
            className="absolute inset-0 w-full h-full bg-[#092C25]/60 border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/10">
                  <Image
                    src={card.logo}
                    alt={card.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{card.name}</h3>
              </div>
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