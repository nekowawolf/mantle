"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
  isModelLoaded: boolean;
}

export default function LoadingScreen({ onComplete, isModelLoaded }: LoadingScreenProps) {
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModelLoaded && wipeRef.current) {
      const timer = setTimeout(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          }
        });

        tl.to(wipeRef.current, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power3.inOut"
        });
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isModelLoaded, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/background_animation.mp4" type="video/mp4" />
      </video>

      {/* Dim Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        <div className="relative w-32 h-32 md:w-48 md:h-48 animate-spin-slow">
          <Image
            src="/img/logo_mantle1.png"
            alt="Mantle Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider drop-shadow-md">
          Mantle Network
        </h1>
      </div>

      {/* Diagonal Wipe Overlay*/}
      <div
        ref={wipeRef}
        className="fixed inset-0 z-20 bg-black"
        style={{
          clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)"
        }}
      />
    </div>
  );
}
