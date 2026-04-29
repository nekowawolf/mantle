"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.4, 1], [0, 1, 1, 0]);

  const storyPoints = [
    {
      text: "Mantle is a high-performance Ethereum Layer 2 scaling solution built to enable hyper-scaled performance.",
      side: "right",
      details: "By leveraging modular architecture and optimistic rollup technology, Mantle achieves transaction throughput that rivals traditional web2 infrastructure while maintaining the decentralization and security guarantees of Ethereum."
    },
    {
      text: "Experience extremely low fees while maintaining the highest security standards of Ethereum.",
      side: "left",
      details: "Mantle's innovative data availability layer and efficient batch processing reduce gas fees by up to 90% compared to mainnet, making DeFi, gaming, and NFT applications accessible to everyone."
    },
    {
      text: "With modular architecture and innovative design, Mantle is paving the way for next-gen dApps.",
      side: "right",
      details: "Developers can deploy existing Ethereum smart contracts with minimal changes while gaining access to new primitives and capabilities that were previously impossible due to mainnet constraints."
    },
    {
      text: "Join the thousands of developers already building on the fastest growing L2 ecosystem.",
      side: "left",
      details: "From DeFi protocols to gaming economies, NFT marketplaces to DAO infrastructure — Mantle is home to a vibrant and rapidly expanding ecosystem of innovative applications."
    },
    {
      text: "Mantle's modular design separates execution, settlement, and data availability for optimal performance.",
      side: "right",
      details: "This separation allows each component to be independently optimized and upgraded, creating a future-proof foundation that can adapt to evolving blockchain technology without sacrificing security or decentralization."
    },
    {
      text: "Backed by leading investors and built by world-class researchers and engineers.",
      side: "left",
      details: "Mantle has raised significant funding from top-tier venture capital firms and strategic partners who share our vision of making Ethereum scalable for global adoption."
    }
  ];

  return (
    <motion.section 
      ref={ref}
      style={{ opacity }}
      className="relative z-30 bg-black min-h-screen flex flex-col justify-center gap-16 md:gap-28 px-6 py-32 md:py-48"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
      >
        The Story of Mantle
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-gray-400 max-w-2xl mx-auto mb-12 md:mb-16"
      >
        Redefining what's possible on Ethereum through modular innovation
      </motion.p>

      <div className="max-w-6xl mx-auto w-full space-y-20 md:space-y-32">
        {storyPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: point.side === "right" ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: false, amount: 0.4 }}
            className={`flex ${point.side === "right" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-2xl ${
                point.side === "right" 
                  ? "text-right border-r-4 border-[#092C25] pr-8 md:pr-12" 
                  : "text-left border-l-4 border-[#092C25] pl-8 md:pl-12"
              }`}
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-light mb-4">
                {point.text}
              </p>
              <p className={`text-sm md:text-base text-gray-400 leading-relaxed ${
                point.side === "right" ? "text-right" : "text-left"
              }`}>
                {point.details}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional stats section for extended scroll */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="mt-24 md:mt-32 pt-12 md:pt-16 border-t border-[#092C25]/30"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          <div>
            <div className="text-3xl md:text-5xl font-bold text-[#092C25]">100K+</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">Active Wallets</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-bold text-[#092C25]">$2B+</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">TVL Secured</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-bold text-[#092C25]">&lt;$0.01</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">Avg Transaction Fee</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-bold text-[#092C25]">200+</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2">Ecosystem dApps</div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}