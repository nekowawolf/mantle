"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Scene from "@/components/Scene";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 100);
    }
  }, [isLoading]);

  return (
    <main className={`relative bg-black ${isLoading ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-hidden'} text-white selection:bg-[#092C25] selection:text-white`}>
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
          <Hero isActive={!isLoading} /> 
          <CTASection />
          <Footer />
        </div>
      </div>
    </main>
  );
}