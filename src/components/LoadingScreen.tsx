"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    tl.to(containerRef.current, {
      opacity: 1,
      duration: 0.3,
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/background_animation.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="w-44 h-44 animate-spin-slow relative">
          <Image
            src="/img/logo_mantle.webp"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-white">
          Mantle Network
        </h1>
      </div>
    </div>
  );
}