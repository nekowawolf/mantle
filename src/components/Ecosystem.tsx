"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

const words = ["We", "build", "$MNT-powered", "products", "on", "Ethereum"];
const TEXT_START = 8000;

// Data for 3 Cards
const cardsData = [
  {
    title: "ZK Roadmap",
    desc: "Delivering institutional-grade settlement and value transfer as the world's largest L2 with ZK validity proofs — supporting banking for the next generation.",
    textLink: "Learn More",
    link: "https://www.mantle.xyz/blog/announcements/mantle-network-advances-technical-roadmap-as-the-first-zk-validity-rollup-with-succincts-sp1",
    bg: "/img/mantle_card1.1.png",
  },
  {
    title: "Modular Design",
    desc: "Upgradable modules for execution, data availability, and finality.",
    textLink: "Build On Mantle",
    link: "https://docs.mantle.xyz/network",
    bg: "/img/mantle_card1.2.png",
  },
  {
    title: "EigenLayer Integration",
    desc: "First L2 to adopt EigenDA technology and enable ETH restaking via Eigenlayer.",
    textLink: "Restake",
    link: "https://app.methprotocol.xyz/restake",
    bg: "/img/mantle_card1.3.png",
  },
];

// Data for new 3 Cards (no link/button)
const newCardsData = [
  {
    title: "Native ETH Asset",
    desc: "mETH Protocol is a liquid ETH staking and restaking protocol that maximizes yields — widely accepted as collateral in CEXs & DeFi apps, and money markets.",
    bg: "/img/mantle_card2.1.png",
  },
  {
    title: "Native BTC Asset",
    desc: "Ignition fBTC bridges Bitcoin into Web3, unlocking new financial opportunities as the most integrated wrapped BTC asset, powering ecosystems like Babylon, Solv Protocol, and PumpBTC.",
    bg: "/img/mantle_card2.2.png",
  },
  {
    title: "Stables-Backed Yield Asset Partnerships",
    desc: "Mantle strengthens its ecosystem through partnerships with Ethena USDe, Agora AUSD, and Ondo USDy — enhancing treasury yield, institutional-backed stability, and innovative yield opportunities across the network.",
    bg: "/img/mantle_card2.3.png",
  },
];

// Data for partner cards
const partnerCardsData = [
  {
    logo: "/img/logo_mantle.webp",
    name: "EcoFund",
    desc: "The Mantle EcoFund supports ecosystem growth with a $200M capital pool, backing innovative projects alongside top-tier VCs like Polychain and Dragonfly.",
    textLink: "Visit",
    link: "https://www.mantle.xyz/ecofund",
    bg: "/img/mantle_card1.1.png",
  },
  {
    logo: "/img/mirana.jpg",
    name: "Mirana Ventures",
    desc: "Mirana Ventures supports Mantle's EcoFund with strong venture capital expertise, helping drive ecosystem growth through strategic investments and industry experience.",
    textLink: "Visit",
    link: "https://www.mirana.xyz/",
    bg: "/img/mantle_card1.2.png",
  },
  {
    logo: "/img/bybit.jpg",
    name: "Bybit",
    desc: "Bybit strengthens Mantle's liquidity and DeFi-CeFi integration through yield-bearing collateral, simplified asset access, fiat ramps, and connected on-chain and CEX opportunities.",
    textLink: "Visit",
    link: "https://www.bybit.com/",
    bg: "/img/mantle_card1.3.png",
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
  const dCard1Op = useTransform(scrollY, [11200, 11600, 12800, 13200], [0, 1, 1, 0]);
  const dCard1Y = useTransform(scrollY, [11200, 11600], [50, 0]);

  const dCard2Op = useTransform(scrollY, [11400, 11800, 13000, 13400], [0, 1, 1, 0]);
  const dCard2Y = useTransform(scrollY, [11400, 11800], [50, 0]);

  const dCard3Op = useTransform(scrollY, [11600, 12000, 13200, 13600], [0, 1, 1, 0]);
  const dCard3Y = useTransform(scrollY, [11600, 12000], [50, 0]);

  const desktopCardsAnim = [
    { op: dCard1Op, y: dCard1Y, ptr: useTransform(dCard1Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: dCard2Op, y: dCard2Y, ptr: useTransform(dCard2Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: dCard3Op, y: dCard3Y, ptr: useTransform(dCard3Op, (v) => v > 0.1 ? "auto" : "none") },
  ];

  // --- MOBILE ANIMATION CARDS ---
  const mCard1Op = useTransform(scrollY, [11200, 11500, 12100, 12400], [0, 1, 1, 0]);
  const mCard1Y = useTransform(scrollY, [11200, 11500], [50, 0]);

  const mCard2Op = useTransform(scrollY, [12450, 12750, 13350, 13650], [0, 1, 1, 0]);
  const mCard2Y = useTransform(scrollY, [12450, 12750], [50, 0]);

  const mCard3Op = useTransform(scrollY, [13700, 14000, 14600, 14900], [0, 1, 1, 0]);
  const mCard3Y = useTransform(scrollY, [13700, 14000], [50, 0]);

  const mobileCardsAnim = [
    { op: mCard1Op, y: mCard1Y, ptr: useTransform(mCard1Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: mCard2Op, y: mCard2Y, ptr: useTransform(mCard2Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: mCard3Op, y: mCard3Y, ptr: useTransform(mCard3Op, (v) => v > 0.1 ? "auto" : "none") },
  ];

  // --- NEW DESKTOP CARDS (appear after existing cards disappear) ---
  const dNewCard1Op = useTransform(scrollY, [13600, 14000, 15200, 15500], [0, 1, 1, 0]);
  const dNewCard1Y = useTransform(scrollY, [13600, 14000], [50, 0]);

  const dNewCard2Op = useTransform(scrollY, [13800, 14200, 15400, 15700], [0, 1, 1, 0]);
  const dNewCard2Y = useTransform(scrollY, [13800, 14200], [50, 0]);

  const dNewCard3Op = useTransform(scrollY, [14000, 14400, 15600, 15800], [0, 1, 1, 0]);
  const dNewCard3Y = useTransform(scrollY, [14000, 14400], [50, 0]);

  const desktopNewCardsAnim = [
    { op: dNewCard1Op, y: dNewCard1Y, ptr: useTransform(dNewCard1Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: dNewCard2Op, y: dNewCard2Y, ptr: useTransform(dNewCard2Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: dNewCard3Op, y: dNewCard3Y, ptr: useTransform(dNewCard3Op, (v) => v > 0.1 ? "auto" : "none") },
  ];

  // --- NEW MOBILE CARDS (appear after existing cards disappear) ---
  const mNewCard1Op = useTransform(scrollY, [15000, 15300, 15900, 16200], [0, 1, 1, 0]);
  const mNewCard1Y = useTransform(scrollY, [15000, 15300], [50, 0]);

  const mNewCard2Op = useTransform(scrollY, [16250, 16550, 17150, 17450], [0, 1, 1, 0]);
  const mNewCard2Y = useTransform(scrollY, [16250, 16550], [50, 0]);

  const mNewCard3Op = useTransform(scrollY, [17500, 17800, 18400, 18600], [0, 1, 1, 0]);
  const mNewCard3Y = useTransform(scrollY, [17500, 17800], [50, 0]);

  const mobileNewCardsAnim = [
    { op: mNewCard1Op, y: mNewCard1Y, ptr: useTransform(mNewCard1Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: mNewCard2Op, y: mNewCard2Y, ptr: useTransform(mNewCard2Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: mNewCard3Op, y: mNewCard3Y, ptr: useTransform(mNewCard3Op, (v) => v > 0.1 ? "auto" : "none") },
  ];


  // --- TEXT: "We work with initiatives..." ---
  const initiativeWords = ["We", "work", "with", "initiatives", "that", "boost", "user", "gains", "&", "fortify", "the", "ecosystem"];

  const INITIATIVE_TEXT_START_DESKTOP = 16000;
  const INITIATIVE_TEXT_START_MOBILE = 19000;

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
    [18600, 19100],
    [1, 0]
  );

  const initiativeContainerOpacityMobile = useTransform(
    scrollY,
    [21800, 22300],
    [1, 0]
  );


  // --- PARTNER DESKTOP CARDS ---
  const dPartnerCard1Op = useTransform(
    scrollY,
    [19200, 19600, 21400, 21800],
    [0, 1, 1, 0]
  );
  const dPartnerCard1Y = useTransform(scrollY, [19200, 19600], [50, 0]);

  const dPartnerCard2Op = useTransform(
    scrollY,
    [19400, 19800, 21600, 22000],
    [0, 1, 1, 0]
  );
  const dPartnerCard2Y = useTransform(scrollY, [19400, 19800], [50, 0]);

  const dPartnerCard3Op = useTransform(
    scrollY,
    [19600, 20000, 21800, 22200],
    [0, 1, 1, 0]
  );
  const dPartnerCard3Y = useTransform(scrollY, [19600, 20000], [50, 0]);

  const desktopPartnerCardsAnim = [
    { op: dPartnerCard1Op, y: dPartnerCard1Y, ptr: useTransform(dPartnerCard1Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: dPartnerCard2Op, y: dPartnerCard2Y, ptr: useTransform(dPartnerCard2Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: dPartnerCard3Op, y: dPartnerCard3Y, ptr: useTransform(dPartnerCard3Op, (v) => v > 0.1 ? "auto" : "none") },
  ];


  // --- PARTNER MOBILE CARDS ---
  const mPartnerCard1Op = useTransform(
    scrollY,
    [22400, 22700, 23700, 24000],
    [0, 1, 1, 0]
  );
  const mPartnerCard1Y = useTransform(scrollY, [22400, 22700], [50, 0]);

  const mPartnerCard2Op = useTransform(
    scrollY,
    [24050, 24350, 25350, 25650],
    [0, 1, 1, 0]
  );
  const mPartnerCard2Y = useTransform(scrollY, [24050, 24350], [50, 0]);

  const mPartnerCard3Op = useTransform(
    scrollY,
    [25700, 26000, 27000, 27300],
    [0, 1, 1, 0]
  );
  const mPartnerCard3Y = useTransform(scrollY, [25700, 26000], [50, 0]);

  const mobilePartnerCardsAnim = [
    { op: mPartnerCard1Op, y: mPartnerCard1Y, ptr: useTransform(mPartnerCard1Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: mPartnerCard2Op, y: mPartnerCard2Y, ptr: useTransform(mPartnerCard2Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: mPartnerCard3Op, y: mPartnerCard3Y, ptr: useTransform(mPartnerCard3Op, (v) => v > 0.1 ? "auto" : "none") },
  ];


  return (
    <section
      id="ecosystem"
      className="relative z-20 w-full h-[17600px] pointer-events-none"
    >
      {/* TEXT POSITION */}
      <motion.div
        style={{ opacity: containerOpacity }}
        className="
          fixed
          bottom-80 md:bottom-64 min-[1440px]:bottom-96
          left-1/2 -translate-x-1/2
          w-[90%] max-w-4xl
          flex flex-wrap justify-center gap-x-4 gap-y-2
          pointer-events-none
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
      <div className="hidden md:flex fixed top-[60%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl gap-6 pointer-events-none">
        {cardsData.map((card, i) => (
          <motion.div
            key={`desktop-${i}`}
            style={{
              opacity: desktopCardsAnim[i].op,
              y: desktopCardsAnim[i].y,
              pointerEvents: desktopCardsAnim[i].ptr,
              backgroundImage: `linear-gradient(to bottom, rgba(9, 44, 37, 0.4), rgba(9, 44, 37, 0.7)), url(${card.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex-1 min-h-[300px] border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                {card.desc}
              </p>
            </div>
            <div className="flex mt-8">
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#153e33] border border-[#00D4A0]/40 text-white font-semibold rounded-xl hover:bg-[#00D4A0] hover:text-[#092C25] hover:border-[#00D4A0] transition-all duration-300 cursor-pointer text-sm shadow-md"
              >
                {card.textLink}
                <FiArrowRight className="text-lg" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MOBILE CARDS (md:hidden) */}
      <div className="flex md:hidden fixed top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-sm pointer-events-none h-[320px]">
        {cardsData.map((card, i) => (
          <motion.div
            key={`mobile-${i}`}
            style={{
              opacity: mobileCardsAnim[i].op,
              y: mobileCardsAnim[i].y,
              pointerEvents: mobileCardsAnim[i].ptr,
              backgroundImage: `linear-gradient(to bottom, rgba(9, 44, 37, 0.6), rgba(9, 44, 37, 0.8)), url(${card.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 w-full h-full border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {card.desc}
              </p>
            </div>
            <div className="flex mt-6 w-full">
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#153e33] border border-[#00D4A0]/40 text-white font-semibold rounded-xl hover:bg-[#00D4A0] hover:text-[#092C25] hover:border-[#00D4A0] transition-all duration-300 cursor-pointer text-sm shadow-md"
              >
                {card.textLink}
                <FiArrowRight className="text-lg" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* NEW DESKTOP CARDS (md:flex) - appear after existing cards */}
      <div className="hidden md:flex fixed top-[60%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl gap-6 pointer-events-none">
        {newCardsData.map((card, i) => (
          <motion.div
            key={`desktop-new-${i}`}
            style={{
              opacity: desktopNewCardsAnim[i].op,
              y: desktopNewCardsAnim[i].y,
              pointerEvents: desktopNewCardsAnim[i].ptr,
              backgroundImage: `linear-gradient(to bottom, rgba(9, 44, 37, 0.4), rgba(9, 44, 37, 0.7)), url(${card.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex-1 min-h-[300px] border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
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
      <div className="flex md:hidden fixed top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-sm pointer-events-none h-[320px]">
        {newCardsData.map((card, i) => (
          <motion.div
            key={`mobile-new-${i}`}
            style={{
              opacity: mobileNewCardsAnim[i].op,
              y: mobileNewCardsAnim[i].y,
              pointerEvents: mobileNewCardsAnim[i].ptr,
              backgroundImage: `linear-gradient(to bottom, rgba(9, 44, 37, 0.6), rgba(9, 44, 37, 0.8)), url(${card.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 w-full h-full border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between shadow-xl"
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
          bottom-80 md:bottom-40 min-[1440px]:bottom-96
          left-1/2 -translate-x-1/2
          w-[90%] max-w-4xl
          flex-wrap justify-center gap-x-4 gap-y-2
          pointer-events-none
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
          pointer-events-none
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
      <div className="hidden md:flex fixed top-[60%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl gap-6 pointer-events-none">
        {partnerCardsData.map((card, i) => (
          <motion.div
            key={`desktop-partner-${i}`}
            style={{
              opacity: desktopPartnerCardsAnim[i].op,
              y: desktopPartnerCardsAnim[i].y,
              pointerEvents: desktopPartnerCardsAnim[i].ptr,
              backgroundImage: `linear-gradient(to bottom, rgba(9, 44, 37, 0.4), rgba(9, 44, 37, 0.7)), url(${card.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex-1 min-h-[300px] border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={card.logo}
                    alt={card.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white">{card.name}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                {card.desc}
              </p>
            </div>
            <div className="flex mt-8">
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#153e33] border border-[#00D4A0]/40 text-white font-semibold rounded-xl hover:bg-[#00D4A0] hover:text-[#092C25] hover:border-[#00D4A0] transition-all duration-300 cursor-pointer text-sm shadow-md"
              >
                {card.textLink}
                <FiArrowRight className="text-lg" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PARTNER MOBILE CARDS (md:hidden) */}
      <div className="flex md:hidden fixed top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-sm pointer-events-none h-[320px]">
        {partnerCardsData.map((card, i) => (
          <motion.div
            key={`mobile-partner-${i}`}
            style={{
              opacity: mobilePartnerCardsAnim[i].op,
              y: mobilePartnerCardsAnim[i].y,
              pointerEvents: mobilePartnerCardsAnim[i].ptr,
              backgroundImage: `linear-gradient(to bottom, rgba(9, 44, 37, 0.6), rgba(9, 44, 37, 0.8)), url(${card.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 w-full h-full border border-[#00D4A0]/20 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                  <Image
                    src={card.logo}
                    alt={card.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{card.name}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">
                {card.desc}
              </p>
            </div>
            <div className="flex mt-6 w-full">
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#153e33] border border-[#00D4A0]/40 text-white font-semibold rounded-xl hover:bg-[#00D4A0] hover:text-[#092C25] hover:border-[#00D4A0] transition-all duration-300 cursor-pointer text-sm shadow-md"
              >
                {card.textLink}
                <FiArrowRight className="text-lg" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}