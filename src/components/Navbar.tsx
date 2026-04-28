"use client";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        {/* Logo */}
        <div className="font-bold text-xl tracking-wide text-white">
          MANTLE
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a
            href="#"
            className="text-white hover:text-[#092C25] hover:bg-white/90 px-3 py-1 rounded transition-all duration-300"
          >
            Ecosystem
          </a>

          <a
            href="#"
            className="text-white hover:text-[#092C25] hover:bg-white/90 px-3 py-1 rounded transition-all duration-300"
          >
            Developers
          </a>

          <a
            href="#"
            className="text-white hover:text-[#092C25] hover:bg-white/90 px-3 py-1 rounded transition-all duration-300"
          >
            Community
          </a>

          <a
            href="#"
            className="text-white hover:text-[#092C25] hover:bg-white/90 px-3 py-1 rounded transition-all duration-300"
          >
            About
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
          <div className="flex flex-col items-end space-y-8 text-right">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="text-white text-5xl font-bold hover:text-gray-400 transition-colors duration-300"
            >
              Ecosystem
            </a>

            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="text-white text-5xl font-bold hover:text-gray-400 transition-colors duration-300"
            >
              Developers
            </a>

            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="text-white text-5xl font-bold hover:text-gray-400 transition-colors duration-300"
            >
              Community
            </a>

            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="text-white text-5xl font-bold hover:text-gray-400 transition-colors duration-300"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </>
  );
}