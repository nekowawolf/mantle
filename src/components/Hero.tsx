"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroProps {
  isActive?: boolean;
}

export default function Hero({ isActive }: HeroProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (isActive && videoElementRef.current) {
      videoElementRef.current.play().catch(e => console.log("Video play error:", e));
    } else if (!isActive && videoElementRef.current) {
      videoElementRef.current.pause();
    }
  }, [isActive]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: "+=800",
          scrub: true,
          onUpdate: (self) => {
            if (self.progress > 0.9 && videoElementRef.current && !videoElementRef.current.paused) {
               videoElementRef.current.pause();
            } else if (self.progress <= 0.9 && videoElementRef.current && videoElementRef.current.paused && isActive) {
               videoElementRef.current.play().catch(() => {});
            }
          }
        }
      });
    }
  }, [isActive]);

  return (
    <>
      <div ref={videoRef} className="fixed inset-0 w-full h-screen overflow-hidden z-0">
        <video
          ref={videoElementRef}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/background_animation2.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <section className="h-[100vh] w-full flex flex-col justify-center pointer-events-none relative z-10 px-6 max-w-7xl mx-auto">
        <div className="w-full flex justify-between items-center pointer-events-auto">
          
          {/* Left Card */}
          <div className="w-full md:w-4/12 bg-black/20 p-8 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-xl">
              Mantle Network
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed drop-shadow-md">
              A modular Layer 2 blockchain focused on hyper-scaled performance, low fees, and Ethereum-grade security.
            </p>
            <a 
              href="https://www.mantle.xyz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-8 px-6 py-3 bg-white text-[#092C25] font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Explore Ecosystem
            </a>
          </div>
          
          {/* Right Card */}
          <div className="w-full md:w-4/12 bg-black/20 p-8 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-xl">
              Why Mantle?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#092C25] bg-white rounded-full p-1 mr-3 mt-1 text-xs">✓</span>
                <div>
                  <h3 className="text-lg font-bold">High Performance</h3>
                  <p className="text-sm text-gray-300">Hyperscaled throughput with low fees.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#092C25] bg-white rounded-full p-1 mr-3 mt-1 text-xs">✓</span>
                <div>
                  <h3 className="text-lg font-bold">EVM Compatible</h3>
                  <p className="text-sm text-gray-300">Easily deploy existing dApps.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#092C25] bg-white rounded-full p-1 mr-3 mt-1 text-xs">✓</span>
                <div>
                  <h3 className="text-lg font-bold">Modular Architecture</h3>
                  <p className="text-sm text-gray-300">Separates execution and finality.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce pointer-events-auto">
          <p className="text-xs md:text-sm tracking-[0.3em] font-medium opacity-60 whitespace-nowrap">SCROLL TO EXPLORE</p>
        </div>
      </section>
      
      {/* Scrollable space for GSAP animations to play without content overlapping */}
      <section className="relative z-10 w-full h-[150vh] pointer-events-none">
      </section>
    </>
  );
}
