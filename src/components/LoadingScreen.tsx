"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
  isModelLoaded: boolean;
}

export default function LoadingScreen({ onComplete, isModelLoaded }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isCompletedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      if (!isCompletedRef.current) document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (isModelLoaded && !isCompletedRef.current) {
      const timer = setTimeout(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            isCompletedRef.current = true;
            document.body.style.overflow = "";
            onComplete();
          }
        });
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isModelLoaded, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
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
            sizes="(max-width: 768px) 128px, 192px"
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider drop-shadow-md">
          Mantle Network
        </h1>
      </div>
    </div>
  );
}