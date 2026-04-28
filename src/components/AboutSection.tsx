"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0, 1, 1, 0]);

  const storyPoints = [
    {
      text: "Mantle is a high-performance Ethereum Layer 2 scaling solution built to enable hyper-scaled performance.",
      side: "right"
    },
    {
      text: "Experience extremely low fees while maintaining the highest security standards of Ethereum.",
      side: "left"
    },
    {
      text: "With modular architecture and innovative design, Mantle is paving the way for next-gen dApps.",
      side: "right"
    },
    {
      text: "Join the thousands of developers already building on the fastest growing L2 ecosystem.",
      side: "left"
    }
  ];

  return (
    <motion.section 
      ref={ref}
      style={{ opacity }}
      className="relative z-30 bg-black min-h-screen flex flex-col justify-center gap-16 md:gap-24 px-6 py-32"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
      >
        The Story of Mantle
      </motion.h2>

      <div className="max-w-6xl mx-auto w-full space-y-16 md:space-y-24">
        {storyPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: point.side === "right" ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
            className={`flex ${point.side === "right" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-xl ${
                point.side === "right" 
                  ? "text-right border-r-4 border-[#092C25] pr-8" 
                  : "text-left border-l-4 border-[#092C25] pl-8"
              }`}
            >
              <p className="text-lg md:text-2xl text-gray-200 leading-relaxed font-light">
                {point.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}