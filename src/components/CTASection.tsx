export default function CTASection() {
  return (
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
    </section>
  );
}
