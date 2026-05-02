"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const governanceText = "Decentralized governance powering the future of Mantle";
const words = governanceText.split(" ");

const GOVERNANCE_TEXT_START_DESKTOP = 24000;
const GOVERNANCE_TEXT_START_MOBILE = 28000;

// Data for Governance Cards
const cardsData = [
  {
    title: "Governance",
    desc: "All decisions, from launching new initiatives, to transferring and recalling treasury resources, assigning and modifying powers to operating teams, and implementing corrective actions, are subject to proposals and voting by $MNT token holders.",
    buttons: [
      { label: "Forum", link: "https://forum.mantle.xyz/" },
      { label: "Snapshot", link: "https://snapshot.org/#/bitdao.eth/" },
      { label: "Delegate", link: "https://delegatevote.mantle.xyz/" },
    ],
    bg: "/img/mantle_card1.1.png",
  },
  {
    title: "Resource Management",
    desc: "As stewards of a significant treasury, we prioritize value, transparency, and accountability — contributing TVL to partners and rewarding Mantle token holders with earned ecosystem tokens to foster community engagement.",
    buttons: [
      { label: "Treasury Monitor", link: "https://treasurymonitor.mantle.xyz/" },
      { label: "Mantle Rewards Station", link: "https://rewards.mantle.xyz/" },
    ],
    bg: "/img/mantle_card1.2.png",
  },
];

export default function Governance() {
  const { scrollY } = useScroll();

  // --- DESKTOP TEXT ANIMATION ---
  const textOpacityDesktop = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_DESKTOP, GOVERNANCE_TEXT_START_DESKTOP + 600],
    [0, 1]
  );
  const textYDesktop = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_DESKTOP, GOVERNANCE_TEXT_START_DESKTOP + 600],
    [80, 0]
  );

  // --- MOBILE TEXT ANIMATION ---
  const textOpacityMobile = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_MOBILE, GOVERNANCE_TEXT_START_MOBILE + 800],
    [0, 1]
  );
  const textYMobile = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_MOBILE, GOVERNANCE_TEXT_START_MOBILE + 800],
    [80, 0]
  );

  // Container opacity fade out
  const containerOpacityDesktop = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_DESKTOP + 1200, GOVERNANCE_TEXT_START_DESKTOP + 1800],
    [1, 0]
  );

  const containerOpacityMobile = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_MOBILE + 1400, GOVERNANCE_TEXT_START_MOBILE + 2000],
    [1, 0]
  );

  // --- DESKTOP CARDS ANIMATION ---
  const dCard1Op = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_DESKTOP + 1600, GOVERNANCE_TEXT_START_DESKTOP + 2000, GOVERNANCE_TEXT_START_DESKTOP + 3400, GOVERNANCE_TEXT_START_DESKTOP + 3800],
    [0, 1, 1, 0]
  );
  const dCard1Y = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_DESKTOP + 1600, GOVERNANCE_TEXT_START_DESKTOP + 2000],
    [50, 0]
  );

  const dCard2Op = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_DESKTOP + 1800, GOVERNANCE_TEXT_START_DESKTOP + 2200, GOVERNANCE_TEXT_START_DESKTOP + 3600, GOVERNANCE_TEXT_START_DESKTOP + 4000],
    [0, 1, 1, 0]
  );
  const dCard2Y = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_DESKTOP + 1800, GOVERNANCE_TEXT_START_DESKTOP + 2200],
    [50, 0]
  );

  const desktopCardsAnim = [
    { op: dCard1Op, y: dCard1Y, ptr: useTransform(dCard1Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: dCard2Op, y: dCard2Y, ptr: useTransform(dCard2Op, (v) => v > 0.1 ? "auto" : "none") },
  ];

  // --- MOBILE CARDS ANIMATION ---
  const mCard1Op = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_MOBILE + 1800, GOVERNANCE_TEXT_START_MOBILE + 2100, GOVERNANCE_TEXT_START_MOBILE + 3300, GOVERNANCE_TEXT_START_MOBILE + 3600],
    [0, 1, 1, 0]
  );
  const mCard1Y = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_MOBILE + 1800, GOVERNANCE_TEXT_START_MOBILE + 2100],
    [50, 0]
  );

  const mCard2Op = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_MOBILE + 3400, GOVERNANCE_TEXT_START_MOBILE + 3700, GOVERNANCE_TEXT_START_MOBILE + 4900, GOVERNANCE_TEXT_START_MOBILE + 5200],
    [0, 1, 1, 0]
  );
  const mCard2Y = useTransform(
    scrollY,
    [GOVERNANCE_TEXT_START_MOBILE + 3400, GOVERNANCE_TEXT_START_MOBILE + 3700],
    [50, 0]
  );

  const mobileCardsAnim = [
    { op: mCard1Op, y: mCard1Y, ptr: useTransform(mCard1Op, (v) => v > 0.1 ? "auto" : "none") },
    { op: mCard2Op, y: mCard2Y, ptr: useTransform(mCard2Op, (v) => v > 0.1 ? "auto" : "none") },
  ];

  return (
    <section
      id="governance"
      className="relative z-20 w-full h-[1000vh] pointer-events-none"
    >
      {/* GOVERNANCE TEXT - DESKTOP */}
      <motion.div
        style={{
          opacity: useTransform([textOpacityDesktop, containerOpacityDesktop], ([t, c]) => Math.min(Number(t), Number(c))),
          y: textYDesktop,
        }}
        className="
          hidden md:flex
          fixed
          bottom-80 md:bottom-40    
          left-1/2 -translate-x-1/2
          w-[90%] max-w-4xl
          flex-wrap justify-center gap-x-4 gap-y-2
          pointer-events-none
        "
      >
        {words.map((word, i) => (
          <span
            key={`gov-desktop-${word}-${i}`}
            className={`
              text-4xl md:text-6xl lg:text-7xl
              font-bold tracking-tight leading-tight
              ${word === "Decentralized" || word === "governance" ? "text-[#00D4A0]" : "text-white"}
            `}
          >
            {word}
          </span>
        ))}
      </motion.div>

      {/* GOVERNANCE TEXT - MOBILE */}
      <motion.div
        style={{
          opacity: useTransform([textOpacityMobile, containerOpacityMobile], ([t, c]) => Math.min(Number(t), Number(c))),
          y: textYMobile,
        }}
        className="
          flex md:hidden
          fixed
          bottom-85
          left-1/2 -translate-x-1/2
          w-[90%]
          flex-wrap justify-center gap-x-4 gap-y-2
          pointer-events-none
        "
      >
        {words.map((word, i) => (
          <span
            key={`gov-mobile-${word}-${i}`}
            className={`
              text-4xl
              font-bold tracking-tight leading-tight
              ${word === "Decentralized" || word === "governance" ? "text-[#00D4A0]" : "text-white"}
            `}
          >
            {word}
          </span>
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
            <div className="flex flex-wrap gap-3 mt-6">
              {card.buttons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#153e33] border border-[#00D4A0]/40 text-white font-semibold rounded-xl hover:bg-[#00D4A0] hover:text-[#092C25] hover:border-[#00D4A0] transition-all duration-300 cursor-pointer text-sm shadow-md"
                >
                  {btn.label}
                  <FiArrowRight className="text-lg" />
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* MOBILE CARDS (md:hidden) */}
      <div className="flex md:hidden fixed top-[58%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-sm pointer-events-none h-[380px]">
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
            <div className="flex flex-col w-full gap-3 mt-4">
              {card.buttons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-[#153e33] border border-[#00D4A0]/40 text-white font-semibold rounded-xl hover:bg-[#00D4A0] hover:text-[#092C25] hover:border-[#00D4A0] transition-all duration-300 cursor-pointer text-sm shadow-md"
                >
                  {btn.label}
                  <FiArrowRight className="text-lg" />
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}