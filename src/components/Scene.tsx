"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CoinState {
  scale: number;
  x: number;
  y: number;
  z: number;
  /** absolute target rotation-Y in radians (not additive) */
  rotY: number;
  duration: number;
  ease: string;
  float?: boolean;
}

// ─── Coin section states ───────────────────────────────────────────────────
// All rotation values are ABSOLUTE so jumping sections always lands correctly.
function buildStates(
  isMobile: boolean,
  isLargeScreen: boolean
): Record<string, CoinState> {
  const tScale = isMobile ? 1.9 : isLargeScreen ? 3.4 : 2.8;
  const tY = isMobile ? -1 : isLargeScreen ? -2.2 : -1.7;

  return {
    // ── Hero: initial zoom-in state (set via GSAP timeline, no state machine)
    hero: {
      scale: tScale,
      x: 0,
      y: tY,
      z: 1,
      rotY: Math.PI,          // after first hero rotation
      duration: 1.4,
      ease: "power2.out",
      float: false,
    },
    // ── After rotate 2 (2600px)
    heroRot2: {
      scale: tScale,
      x: 0,
      y: tY,
      z: 1,
      rotY: Math.PI * 2,
      duration: 1.6,
      ease: "power2.out",
      float: false,
    },
    // ── After rotate 3 (5200px)
    heroRot3: {
      scale: tScale,
      x: 0,
      y: tY,
      z: 1,
      rotY: Math.PI * 3,
      duration: 1.6,
      ease: "power2.out",
      float: false,
    },
    // ── Ecosystem transition (coins float in the middle)
    ecosystem: {
      scale: 0.9,
      x: 0,
      y: 1.2,
      z: 1,
      rotY: Math.PI * 6,     // 3 full spins on top of heroRot3
      duration: 1.8,
      ease: "power2.inOut",
      float: true,
    },
    // ── GetMNT
    getMnt: {
      scale: isMobile ? 1.5 : isLargeScreen ? 1.9 : 1.6,
      x: 0,
      y: isMobile ? -0.7 : -1.2,
      z: 1,
      rotY: Math.PI * 8,
      duration: 1.4,
      ease: "power2.inOut",
      float: false,
    },
    // ── Events
    events: {
      scale: isMobile ? 0.3 : isLargeScreen ? 0.4 : 0.5,
      x: 0,
      y: isMobile ? -2.4 : -2.2,
      z: 1,
      rotY: Math.PI * 12,    // 2 more full spins
      duration: 1.8,
      ease: "power2.inOut",
      float: false,
    },
  };
}

// ─── Scene wrapper ────────────────────────────────────────────────────────────
export default function Scene({ isHidden }: { isHidden: boolean }) {
  const [quality, setQuality] = useState<"low" | "high">("low");
  const [vh, setVh] = useState("100dvh");

  useEffect(() => {
    const timer = setTimeout(() => setQuality("high"), 2500);

    if (typeof window !== "undefined") {
      setVh(`${window.innerHeight}px`);

      const handleOrientationChange = () => {
        setTimeout(() => setVh(`${window.innerHeight}px`), 200);
      };
      window.addEventListener("orientationchange", handleOrientationChange);
      return () => {
        clearTimeout(timer);
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      };
    }
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-10 pointer-events-none will-change-transform transition-opacity duration-700 ${
        isHidden ? "opacity-0" : "opacity-100"
      }`}
      style={{ height: vh }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <Environment preset="city" />
        <Model url="/models/mantle_coin.glb" quality={quality} />
      </Canvas>
    </div>
  );
}

// ─── Model — state-machine driven ────────────────────────────────────────────
function Model({ url, quality }: { url: string; quality: "low" | "high" }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);
  const activeTweenRef = useRef<gsap.core.Timeline | null>(null);
  const currentStateRef = useRef<string>("hero");

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const isLargeScreen =
    typeof window !== "undefined" && window.innerWidth > 1440;

  // ─── Helper: kill float, apply a state atomically ─────────────────────────
  function applyState(key: string, states: Record<string, CoinState>) {
    if (!modelRef.current) return;
    const s = states[key];
    if (!s) return;
    if (currentStateRef.current === key) return; // already there
    currentStateRef.current = key;

    // kill previous animations
    if (floatTweenRef.current) {
      floatTweenRef.current.kill();
      floatTweenRef.current = null;
    }
    if (activeTweenRef.current) {
      activeTweenRef.current.kill();
      activeTweenRef.current = null;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (s.float && modelRef.current) {
          const baseY = modelRef.current.position.y;
          floatTweenRef.current = gsap.to(modelRef.current.position, {
            y: baseY + 0.08,
            duration: 4.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      },
    });

    tl.to(
      modelRef.current.scale,
      { x: s.scale, y: s.scale, z: s.scale, duration: s.duration, ease: s.ease },
      0
    );
    tl.to(
      modelRef.current.position,
      { x: s.x, y: s.y, z: s.z, duration: s.duration, ease: s.ease },
      0
    );
    tl.to(
      modelRef.current.rotation,
      { y: s.rotY, duration: s.duration, ease: s.ease },
      0
    );

    activeTweenRef.current = tl;
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (!scene || !modelRef.current) return;

    // center the model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    modelRef.current.scale.set(1.6, 1.6, 1.6);
    modelRef.current.rotation.y = 0;

    if (quality !== "high") return;

    const states = buildStates(isMobile, isLargeScreen);
    const tScale = isMobile ? 1.9 : isLargeScreen ? 3.4 : 2.8;
    const tY = isMobile ? -1 : isLargeScreen ? -2.2 : -1.7;

    // ─── PHASE 1: Hero zoom-in (scrub timeline — short distance, reliable) ───
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "+=1200",
        scrub: 1,
        onLeaveBack: () => {
          currentStateRef.current = "hero";
        },
      },
    });

    heroTl.to(modelRef.current.scale, {
      x: tScale, y: tScale, z: tScale,
      ease: "power2.out", duration: 4,
    });
    heroTl.to(
      modelRef.current.position,
      { x: 0, y: tY, z: 1, ease: "power2.out", duration: 4 },
      0
    );
    heroTl.to({}, { duration: 0.5 });
    heroTl.to(
      modelRef.current.rotation,
      { y: Math.PI, ease: "power2.out", duration: 2 },
      0.7
    );

    // ─── Rotation waypoints (hero section — text switches) ───────────────────
    ScrollTrigger.create({
      trigger: ".scroll-container",
      start: "2600px top",
      onEnter: () => {
        if (!modelRef.current) return;
        if (floatTweenRef.current) { floatTweenRef.current.kill(); floatTweenRef.current = null; }
        gsap.to(modelRef.current.rotation, {
          y: Math.PI * 2,
          duration: 1.8,
          ease: "power2.out",
          overwrite: "auto",
        });
        currentStateRef.current = "heroRot2";
      },
      onLeaveBack: () => {
        if (!modelRef.current) return;
        gsap.to(modelRef.current.rotation, {
          y: Math.PI,
          duration: 1.8,
          ease: "power2.out",
          overwrite: "auto",
        });
        currentStateRef.current = "hero";
      },
    });

    ScrollTrigger.create({
      trigger: ".scroll-container",
      start: "5200px top",
      onEnter: () => {
        if (!modelRef.current) return;
        gsap.to(modelRef.current.rotation, {
          y: Math.PI * 3,
          duration: 1.8,
          ease: "power2.out",
          overwrite: "auto",
        });
        currentStateRef.current = "heroRot3";
      },
      onLeaveBack: () => {
        if (!modelRef.current) return;
        gsap.to(modelRef.current.rotation, {
          y: Math.PI * 2,
          duration: 1.8,
          ease: "power2.out",
          overwrite: "auto",
        });
        currentStateRef.current = "heroRot2";
      },
    });

    // ─── PHASE 2: Ecosystem (state machine) ──────────────────────────────────
    ScrollTrigger.create({
      trigger: ".scroll-container",
      start: isMobile ? "7400px top" : "7500px top",
      onEnter: () => applyState("ecosystem", states),
      onLeaveBack: () => applyState("heroRot3", states),
    });

    // ─── PHASE 3: GetMNT (state machine) ─────────────────────────────────────
    ScrollTrigger.create({
      trigger: ".scroll-container",
      start: isMobile ? "35000px top" : "28200px top",
      onEnter: () => applyState("getMnt", states),
      onLeaveBack: () => applyState("ecosystem", states),
    });

    // ─── PHASE 4: Events (state machine) ─────────────────────────────────────
    ScrollTrigger.create({
      trigger: ".scroll-container",
      start: isMobile ? "43000px top" : "37500px top",
      onEnter: () => applyState("events", states),
      onLeaveBack: () => applyState("getMnt", states),
    });

    // ─── ScrollTrigger.refresh after Lenis is ready ───────────────────────────
    // Small delay lets Lenis first scroll handler run before ST recalculates
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refreshTimer);
      heroTl.kill();
      if (floatTweenRef.current) floatTweenRef.current.kill();
      if (activeTweenRef.current) activeTweenRef.current.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [scene, quality, isMobile, isLargeScreen]);

  return <primitive ref={modelRef} object={scene} />;
}

useGLTF.preload("/models/mantle_coin.glb");