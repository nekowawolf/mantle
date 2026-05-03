"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  DESKTOP CONFIGURATION
// ═══════════════════════════════════════════════════════════════
const SCROLLBAR_WIDTH = 12;        // px — enlarge to make it thicker
const MIN_THUMB_HEIGHT = 120;      // px — make it longer
const SCROLLBAR_COLOR = "#00D4A0"; // color
const PADDING_Y = 0;               // top & bottom distance from the edge of the screen
const PADDING_X = -6;              // right gap from the edge

// ═══════════════════════════════════════════════════════════════
//  MOBILE CONFIGURATION
// ═══════════════════════════════════════════════════════════════
const MOBILE_SCROLLBAR_WIDTH = 6;
const MOBILE_MIN_THUMB_HEIGHT = 60;
const MOBILE_PADDING_Y = 0;
const MOBILE_PADDING_X = -2;
// ═══════════════════════════════════════════════════════════════

export default function FakeScrollbar() {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  
  const currentWidth = isMobile ? MOBILE_SCROLLBAR_WIDTH : SCROLLBAR_WIDTH;
  const currentMinHeight = isMobile ? MOBILE_MIN_THUMB_HEIGHT : MIN_THUMB_HEIGHT;
  const currentPaddingY = isMobile ? MOBILE_PADDING_Y : PADDING_Y;
  const currentPaddingX = isMobile ? MOBILE_PADDING_X : PADDING_X;

  const [thumbHeight, setThumbHeight] = useState(currentMinHeight);
  const [trackHeight, setTrackHeight] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScrollY = useRef(0);

  useEffect(() => {
    const calc = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      const pY = mobile ? MOBILE_PADDING_Y : PADDING_Y;
      const minH = mobile ? MOBILE_MIN_THUMB_HEIGHT : MIN_THUMB_HEIGHT;

      const vh = window.innerHeight;
      const sh = document.documentElement.scrollHeight;
      const tHeight = vh - pY * 2;
      setTrackHeight(tHeight);
      
      const ratio = Math.min(1, vh / sh);
      const tH = Math.max(minH, ratio * tHeight);
      setThumbHeight(tH);
      
      setMaxScroll(Math.max(0, sh - vh));
    };

    calc();
    const observer = new ResizeObserver(calc);
    observer.observe(document.body);
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("resize", calc);
      observer.disconnect();
    };
  }, []);

  const thumbY = useTransform(scrollY, [0, maxScroll], [0, Math.max(0, trackHeight - thumbHeight)]);
  
  const smoothY = useSpring(thumbY, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragStartScrollY.current = window.scrollY;
    document.body.style.userSelect = "none";

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      
      const deltaY = e.clientY - dragStartY.current;
      const maxThumbTravel = trackHeight - thumbHeight;
      if (maxThumbTravel > 0) {
        const scrollRatio = maxScroll / maxThumbTravel;
        window.scrollTo(0, dragStartScrollY.current + deltaY * scrollRatio);
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    
    const clickRatio = clickY / trackHeight;
    
    window.scrollTo({
      top: clickRatio * maxScroll,
      behavior: "smooth"
    });
  };

  if (maxScroll <= 0) return null;

  return (
    <div
      className="fake-scrollbar fixed top-0 h-full z-[100] flex flex-col items-center transition-opacity duration-300"
      style={{ 
        paddingTop: currentPaddingY, 
        paddingBottom: currentPaddingY, 
        width: currentWidth * 2,
        right: currentPaddingX 
      }}
    >
      <div
        className="relative h-full w-full flex justify-center cursor-pointer"
        onClick={handleTrackClick}
      >
        <motion.div
          style={{
            y: smoothY,
            height: thumbHeight,
            width: currentWidth,
            backgroundColor: SCROLLBAR_COLOR,
          }}
          className="cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
        />
      </div>
    </div>
  );
}