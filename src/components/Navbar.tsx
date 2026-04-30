"use client";

import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop transforms
  const scale = useTransform(scrollY, [0, 300], [1, 0.1333]); 
  const x = useTransform(scrollY, [0, 300], [0, 0]); 
  const y = useTransform(scrollY, [0, 300], [0, -80]); 

  // Mobile transforms
  const scaleMobile = useTransform(scrollY, [0, 300], [1, 0.285]); 
  const yMobile = useTransform(scrollY, [0, 300], [0, -112]); 


  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4 flex justify-between items-center">
        {/* Logo space placeholder to keep flex layout intact */}
        <div className="w-[100px]" />

        {/* Animated Logo */}
        <motion.h1
          style={{
            scale: isDesktop ? scale : scaleMobile,
            y: isDesktop ? y : yMobile,
            transformOrigin: "top left"
          }}
          className="fixed top-34 md:top-25 left-6 md:left-16 z-[51] text-[70px] md:text-[120px] lg:text-[150px] font-bold leading-[0.85] tracking-tight text-white pointer-events-auto cursor-pointer"
        >
          MANTLE
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a href="#" className="text-white hover:text-white hover:bg-[#092C25]/80 px-3 py-1 rounded transition-all duration-300">
            About
          </a>

          <a href="#" className="text-white hover:text-white hover:bg-[#092C25]/80 px-3 py-1 rounded transition-all duration-300">
            Ecosystem
          </a>

          <a href="#" className="text-white hover:text-white hover:bg-[#092C25]/80 px-3 py-1 rounded transition-all duration-300">
            Governance
          </a>

          <a href="#" className="text-white hover:text-white hover:bg-[#092C25]/80 px-3 py-1 rounded transition-all duration-300">
            Get MNT
          </a>

          <a href="#" className="text-white hover:text-white hover:bg-[#092C25]/80 px-3 py-1 rounded transition-all duration-300">
            Event
          </a>

          <a href="#" className="text-white hover:text-white hover:bg-[#092C25]/80 px-3 py-1 rounded transition-all duration-300">
            Community
          </a>
        </div>

        {/* Mobile Burger */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-white z-[60]"
        >
          <HiMenu size={30} />
        </button>
      </nav>

      {/* Mobile Fullscreen Menu - KEEP AS IS (NO CHANGES) */}
      <div
        className={`fixed inset-0 z-[55] bg-black transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-white"
        >
          <HiX size={36} />
        </button>

        {/* Menu Content */}
        <div className="flex flex-col justify-center h-full px-10">
        <div className="flex flex-col items-end space-y-8 text-right w-full">

          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="text-white text-5xl font-bold hover:text-gray-400 transition-colors duration-300"
          >
            About
          </a>

          <a
            href="#ecosystem"
            onClick={() => setIsOpen(false)}
            className="text-white text-5xl font-bold hover:text-gray-400 transition-colors duration-300"
          >
            Ecosystem
          </a>

          <a
            href="#governance"
            onClick={() => setIsOpen(false)}
            className="text-white text-5xl font-bold hover:text-gray-400 transition-colors duration-300"
          >
            Governance
          </a>

          <a
            href="#get-mnt"
            onClick={() => setIsOpen(false)}
            className="text-white text-5xl font-bold hover:text-gray-400 transition-colors duration-300"
          >
            Get MNT
          </a>

          <a
            href="#event"
            onClick={() => setIsOpen(false)}
            className="text-white text-5xl font-bold hover:text-gray-400 transition-colors duration-300"
          >
            Event
          </a>

          <a
            href="#community"
            onClick={() => setIsOpen(false)}
            className="text-white text-5xl font-bold hover:text-gray-400 transition-colors duration-300"
          >
            Community
          </a>
            </div> 
        </div>
      </div>
    </>
  );
}