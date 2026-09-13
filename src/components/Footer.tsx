"use client";

import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Ecosystem",
    links: [
      { label: "DApp", href: "https://www.mantle.xyz/dapp", external: true },
      { label: "EcoFund", href: "https://www.mantle.xyz/ecofund", external: true },
      { label: "Safe Multisig", href: "https://multisig.mantle.xyz/", external: true },
      { label: "Get MNT", href: "https://www.mantle.xyz/mnt", external: true },
      { label: "What is MNT", href: "https://www.mantle.xyz/what-is-mnt", external: true },
    ],
  },
  {
    title: "Bridge",
    links: [
      { label: "Mainnet Bridge", href: "https://app.mantle.xyz/bridge", external: true },
      { label: "Mantle Refuel", href: "https://refuel.mantle.xyz/en/refuel", external: true },
      { label: "Super Portal", href: "https://superportal.mantle.xyz/maintenance", external: true },
      { label: "Testnet Bridge", href: "https://app.mantle.xyz/bridge?network=sepolia", external: true },
      { label: "Testnet Faucet", href: "https://faucet.sepolia.mantle.xyz/", external: true },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Docs", href: "https://docs.mantle.xyz/network", external: true },
      { label: "Block Explorer", href: "https://mantlescan.xyz/", external: true },
      { label: "Mantlescan Explorer", href: "https://mantlescan.xyz/", external: true },
      { label: "Mantle Subgraph", href: "https://subgraph.mantle.xyz/", external: true },
      { label: "Status", href: "https://0xmantle.instatus.com/", external: true },
      { label: "Bug Bounty", href: "https://immunefi.com/bug-bounty/mETH/information/", external: true },
      { label: "GitHub", href: "https://github.com/mantlenetworkio", external: true },
      { label: "Mantle Learn", href: "https://www.mantle.hackquest.io/", external: true },
    ],
  },
  {
    title: "Governance",
    links: [
      { label: "Forum", href: "https://forum.mantle.xyz/", external: true },
      { label: "Vote", href: "https://snapshot.org/#/bitdao.eth", external: true },
      { label: "Delegate", href: "https://delegatevote.mantle.xyz/", external: true },
      { label: "Treasury Monitor", href: "https://treasurymonitor.mantle.xyz/", external: true },
      { label: "Migrate $BIT", href: "https://migratebit.mantle.xyz/", external: true },
      { label: "Docs", href: "https://docs.mantle.xyz/governance", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "https://www.mantle.xyz/blog", external: true },
      { label: "Events", href: "https://group.mantle.xyz/events", external: true },
      { label: "Careers", href: "https://group.mantle.xyz/jobs", external: true },
      { label: "Brand Assets", href: "https://drive.google.com/drive/folders/1ByNQpJ9RTat9valFheMN3vBF_fCt7qzx", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-20 w-full bg-black text-white/80 border-t border-[#00D4A0]/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-12">
        {/* Grid Sections */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[#00D4A0] font-semibold text-sm tracking-wider uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-[#00D4A0] transition-colors duration-200 inline-flex items-center gap-1 group cursor-pointer"
                    >
                      {link.label}
                      {link.external && (
                        <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Copyright & Social */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left - GitHub & X */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/nekowawolf/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-[#00D4A0] transition-colors duration-200 cursor-pointer group"
            >
              <FaGithub className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://x.com/nekowawolf_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-[#00D4A0] transition-colors duration-200 cursor-pointer group"
            >
              <FaXTwitter className="w-5 h-5" />
              <span className="text-sm">X (Twitter)</span>
            </a>
          </div>

          {/* Center - Copyright */}
          <div className="text-white/40 text-sm text-center order-3 md:order-2">
            &copy; Mantle {new Date().getFullYear()}. All rights reserved.
          </div>

          {/* Right - Created by nekowawolf */}
          <div className="order-2 md:order-3">
            <a
              href="https://nekowawolf.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-[#00D4A0] transition-colors duration-200 cursor-pointer"
            >
              Built by nekowawolf
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}