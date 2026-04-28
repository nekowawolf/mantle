"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Scene from "@/components/Scene";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && textLeftRef.current && textRightRef.current) {
      gsap.registerPlugin(ScrollTrigger);

      const timer = setTimeout(() => {
        gsap.fromTo(textLeftRef.current, 
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textLeftRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Animate right text block
        gsap.fromTo(textRightRef.current, 
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRightRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <main className="relative bg-black min-h-screen text-white overflow-x-hidden selection:bg-[#092C25] selection:text-white">
      {/* Loading Screen Overlay */}
      {isLoading && (
        <LoadingScreen 
          onComplete={() => setIsLoading(false)} 
          isModelLoaded={isModelLoaded} 
        />
      )}
      
      {/* Main Content Container */}
      <div 
        className={`${isLoading ? "invisible" : "visible"} transition-opacity duration-1000`}
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        <Navbar />
        
        <Scene onLoaded={() => setIsModelLoaded(true)} />
        
        <div className="scroll-container relative z-10 w-full">
          <Hero /> 
          
          <section className="h-[100vh] w-full flex flex-col items-center justify-center pointer-events-none relative z-10">
            <div className="absolute bottom-20 animate-bounce">
              <p className="text-xs md:text-sm tracking-[0.3em] font-medium opacity-60">SCROLL TO EXPLORE</p>
            </div>
          </section>
          
          <section className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col gap-[70vh]">
              
              <div ref={textLeftRef} className="w-full md:w-5/12 bg-black/20 p-8 rounded-2xl backdrop-blur-sm border border-white/5">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-xl">
                  Mantle Network
                </h2>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
                  A modular Layer 2 blockchain focused on hyper-scaled performance, low fees, and Ethereum-grade security. Built by builders, for builders.
                </p>
                <a 
                  href="https://www.mantle.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-8 px-8 py-4 bg-white text-[#092C25] font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
                >
                  Explore Ecosystem
                </a>
              </div>
              
              <div ref={textRightRef} className="w-full md:w-5/12 self-end bg-black/20 p-8 rounded-2xl backdrop-blur-sm border border-white/5">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-xl">
                  Why Mantle?
                </h2>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="text-[#092C25] bg-white rounded-full p-1 mr-4 mt-1">✓</span>
                    <div>
                      <h3 className="text-xl font-bold">High Performance</h3>
                      <p className="text-gray-300">Hyperscaled throughput with incredibly low transaction fees.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#092C25] bg-white rounded-full p-1 mr-4 mt-1">✓</span>
                    <div>
                      <h3 className="text-xl font-bold">Ethereum Compatibility</h3>
                      <p className="text-gray-300">EVM-compatible, so you can easily deploy existing Ethereum dApps.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#092C25] bg-white rounded-full p-1 mr-4 mt-1">✓</span>
                    <div>
                      <h3 className="text-xl font-bold">Modular Architecture</h3>
                      <p className="text-gray-300">Separates transaction execution, data availability, and finality.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
            </div>
          </section>
          
          <section className="relative z-20 bg-black mt-[30vh]">
            <div className="max-w-7xl mx-auto px-6 py-48 text-center border-t border-[#092C25]/40">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Join the Future
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                Deploy your dApps on Mantle and experience the next generation of Ethereum scaling.
              </p>
              <a 
                href="#" 
                className="inline-block px-8 py-4 bg-[#092C25] text-white font-bold rounded hover:bg-[#061e19] transition-colors border border-[#092C25]/50"
              >
                Start Building
              </a>
            </div>
            <Footer />
          </section>
        </div>
      </div>
    </main>
  );
}