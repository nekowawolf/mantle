"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Scene from "@/components/Scene";
import Ecosystem from "@/components/Ecosystem";
import Governance from "@/components/Governance";
import GetMNT from "@/components/GetMNT";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`relative bg-black ${
        isLoading ? "h-screen overflow-hidden" : "min-h-screen overflow-x-hidden"
      } text-white selection:bg-[#092C25] selection:text-white`}
    >
      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}

      {/* UI CONTENT */}
      <div
        className={`${
          isLoading ? "invisible opacity-0" : "visible opacity-100"
        } transition-opacity duration-700`}
      >
        <Scene isHidden={isLoading} />
        <Navbar />

        <div className="scroll-container relative w-full">
          <Hero isActive={!isLoading} />
          <Ecosystem />
          <Governance />
          <GetMNT />
        </div>
      </div>
    </main>
  );
}