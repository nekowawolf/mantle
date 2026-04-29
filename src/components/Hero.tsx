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
  const { scrollY } = useScroll();
  const clipPath = useTransform(scrollY, [0, 300], ["inset(0 0 0% 0)", "inset(0 0 50% 0)"]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

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
    if (!videoContainer) return;

    const ctx = gsap.context(() => {
      // Video fade out
      gsap.to(videoContainer, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: "+=500",
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
    end: "+=400",
    scrub: true,
  },
});
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

        {/* Fast appearing overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-black/60 transition-all duration-300"
        />
      </div>

      {/* HERO CONTENT */}
      <section className="h-screen w-full relative z-10 px-6 md:px-16 pointer-events-none">
        <motion.div 
          style={{ 
            opacity: opacityFade,
            clipPath: clipPath 
          }}
          className="fixed top-32 md:top-24 left-6 md:left-16 max-w-3xl pt-[80px] md:pt-[130px] lg:pt-[160px]"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-light text-gray-300 ml-1 md:ml-2 -mt-4 md:-mt-6">
            Network
          </h2>
        </motion.div>

        <motion.div 
          style={{ opacity: opacityFade }}
          className="fixed bottom-36 right-6 md:right-16 max-w-xs md:max-w-md text-right"
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

      <section className="relative z-10 w-full h-[50vh] pointer-events-none" />
    </>
  );
}