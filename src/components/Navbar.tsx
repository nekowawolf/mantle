"use client";

import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
      <div className="flex items-center space-x-2">
        <div className="font-bold text-xl tracking-wide text-white">
          MANTLE
        </div>
      </div>
      
      <div className="hidden md:flex space-x-8 text-sm font-medium">
        <a href="#" className="text-white hover:text-[#092C25] hover:bg-white/90 px-3 py-1 rounded transition-colors duration-300">Ecosystem</a>
        <a href="#" className="text-white hover:text-[#092C25] hover:bg-white/90 px-3 py-1 rounded transition-colors duration-300">Developers</a>
        <a href="#" className="text-white hover:text-[#092C25] hover:bg-white/90 px-3 py-1 rounded transition-colors duration-300">Community</a>
        <a href="#" className="text-white hover:text-[#092C25] hover:bg-white/90 px-3 py-1 rounded transition-colors duration-300">About</a>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <a href="#" className="text-white hover:text-gray-300 transition-colors">
          <FaTwitter size={20} />
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors">
          <FaDiscord size={20} />
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors">
          <FaGithub size={20} />
        </a>
      </div>

      <div className="md:hidden text-white cursor-pointer">
        <HiMenu size={28} />
      </div>
    </nav>
  );
}
