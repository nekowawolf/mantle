"use client";

export default function Hero() {
  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/background_animation2.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
