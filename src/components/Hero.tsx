"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroProps {
  isActive: boolean;
}

export default function Hero({ isActive }: HeroProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const clipPath = useTransform(
    scrollY,
    [0, 200],
    ["inset(0 0 0% 0)", "inset(0 0 80% 0)"]
  );

  const opacityFade = useTransform(scrollY, [0, 250], [1, 0]);
  const textOpacity = useTransform(scrollY, [200, 450], [0, 1]);

 // TEXT SWITCH ANIMATION
const text1Opacity = useTransform(
  scrollY,
  [200, 700, 1600, 2600],
  [0, 1, 1, 0]
);

const text2Opacity = useTransform(
  scrollY,
  [2600, 3200, 4200, 5200],
  [0, 1, 1, 0]
);

const text3Opacity = useTransform(
  scrollY,
  [5200, 5800, 7000, 7300],
  [0, 1, 1, 0]
);

// LEFT TITLE OPACITY
const leftTextOpacity = useTransform(
  scrollY,
  [200, 700, 7000, 7300],
  [0, 1, 1, 0]
);

  // VIDEO CONTROL
  useEffect(() => {
    const video = videoElementRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  // GSAP SCROLL EFFECT WITH OVERLAY
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const videoContainer = videoRef.current;
    const overlay = overlayRef.current;
    const gradient = gradientRef.current;
    if (!videoContainer) return;

    const ctx = gsap.context(() => {
      // Video fade out
      gsap.to(videoContainer, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: "+=400",
          scrub: 0.5,
        },
      });

      // Overlay becomes solid faster
      if (overlay) {
        gsap.to(overlay, {
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          ease: "none",
          scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "+=300",
            scrub: true,
          },
        });
      }

      // Gradient Background
      if (gradient) {
        gsap.fromTo(
          gradient,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".scroll-container",
              start: "300px top",
              end: "2800px top",
              scrub: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* BACKGROUND VIDEO */}
      <div
        ref={videoRef}
        className="fixed inset-0 w-full h-screen overflow-hidden z-0"
      >
        <video
          ref={videoElementRef}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/background_animation2.mp4" type="video/mp4" />
        </video>

        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/60 transition-all duration-300"
        />
      </div>

      {/* GRADIENT BACKGROUND */}
      <div
        ref={gradientRef}
        className="fixed inset-0 w-full h-screen z-0 pointer-events-none"
        style={{
        background:
          "linear-gradient(4deg, rgba(9, 44, 37, 1) 0%, rgba(0, 0, 0, 1) 100%)",
        opacity: 0,
      }}
      />

      {/* HERO CONTENT */}
      <section className="h-screen w-full relative z-20 px-6 md:px-16 pointer-events-none">

        {/* LEFT TEXT */}
        <motion.div
          style={{ opacity: leftTextOpacity }}
          className="
            fixed 
            /* Mobile: Atas tengah */
            left-1/2 -translate-x-1/2 top-28
            /* Desktop: Kiri tengah */
            md:left-40 md:top-1/2 md:-translate-y-1/2 md:translate-x-0
            w-[90%] md:max-w-sm
            pointer-events-auto
          "
        >
          <p className="text-3xl md:text-5xl text-gray-300 leading-tight font-bold text-center md:text-left">
            WHAT IS <br className="md:hidden" /> MANTLE NETWORK?
          </p>
        </motion.div>

        {/* RIGHT TEXT */}
      <div
        className="
          fixed 
          left-1/2 -translate-x-1/2 bottom-26
          md:right-19 md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:bottom-auto
          w-[90%] md:max-w-96
          h-[140px]
          pointer-events-auto
        "
      >
        {/* TEXT 1 */}
        <motion.p
          style={{ opacity: text1Opacity }}
          className="
            absolute inset-0
            text-base md:text-lg
            text-gray-300
            leading-relaxed
            font-semibold
            text-center md:text-right
            break-words
          "
        >
          Mantle is a next-generation Ethereum Layer 2
          built for mass adoption — combining scalability,
          speed, and a seamless on-chain experience
          for the next wave of decentralized applications.
        </motion.p>

        {/* TEXT 2 */}
        <motion.p
          style={{ opacity: text2Opacity }}
          className="
            absolute inset-0
            text-base md:text-lg
            text-gray-300
            leading-relaxed
            font-semibold
            text-center md:text-right
            break-words
          "
        >
          Ethereum-grade security, ultra-low transaction fees,
      and blazing-fast performance designed to power
      millions of users, creators, and on-chain economies.
        </motion.p>

        {/* TEXT 3 */}
        <motion.p
          style={{ opacity: text3Opacity }}
          className="
            absolute inset-0
            text-base md:text-lg
            text-gray-300
            leading-relaxed
            font-semibold
            text-center md:text-right
            break-words
          "
        >
          Powered by modular architecture, EigenLayer integration,
      and next-generation ZK technology — enabling a faster,
      more scalable, and community-governed future for Web3.
        </motion.p>
      </div>

        {/* EXISTING CONTENT */}
        <motion.div
          style={{
            opacity: opacityFade,
            clipPath: clipPath,
          }}
          className="fixed top-32 md:top-24 left-6 md:left-16 max-w-3xl pt-[80px] md:pt-[130px] lg:pt-[160px] pointer-events-auto"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-light text-gray-300 ml-1 md:ml-2 -mt-4 md:-mt-6">
            Network
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: opacityFade }}
          className="fixed bottom-36 right-6 md:right-16 max-w-xs md:max-w-md text-right pointer-events-auto"
        >
          <p className="text-base md:text-2xl text-gray-300 leading-relaxed font-semibold">
            A modular Layer 2 blockchain focused on hyper-scaled performance, low fees, and Ethereum-grade security.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: opacityFade }}
          className="fixed bottom-14 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <p className="text-[10px] md:text-sm tracking-[0.3em] opacity-60 whitespace-nowrap text-white">
            SCROLL TO EXPLORE
          </p>
        </motion.div>
      </section>

      {/* Spacer */}
      <section className="relative z-10 w-full h-[1000vh] pointer-events-none" />
    </>
  );
}