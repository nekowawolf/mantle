import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#092C25] py-16 px-6 border-t border-black pointer-events-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-8 md:mb-0">
          <div className="font-bold text-3xl tracking-wide text-white mb-4">
            MANTLE
          </div>
          <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
            Mantle is a fast, scalable, and secure modular Layer 2 built to bring hyper-scaled performance to Ethereum.
          </p>
        </div>
        
        <div className="flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            <FaTwitter size={28} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <FaDiscord size={28} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <FaGithub size={28} />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} Mantle Network. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
