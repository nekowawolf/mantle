"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Scene({ isHidden }: { isHidden: boolean }) {
  const [quality, setQuality] = useState<"low" | "high">("low");
  const [vh, setVh] = useState("100dvh");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuality("high");
    }, 2500);

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
      className={`fixed top-0 left-0 w-full z-20 pointer-events-none will-change-transform transition-opacity duration-700 ${
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

function Model({
  url,
  quality,
}: {
  url: string;
  quality: "low" | "high";
}) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const targetScale = isMobile ? 1.9 : 2.8;
  const targetY = isMobile ? -1 : -1.7;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (!scene || !modelRef.current) return;

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    modelRef.current.scale.set(1.6, 1.6, 1.6);
    modelRef.current.rotation.y = 0;

    if (quality === "high") {
      // ─── PHASE 1: HERO — ZOOM IN ───
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: "+=1200",
          scrub: 1,
        },
      });

      heroTl.to(modelRef.current.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        ease: "power2.out",
        duration: 4,
      });

      heroTl.to(
        modelRef.current.position,
        {
          x: 0,
          y: targetY,
          z: 1,
          ease: "power2.out",
          duration: 4,
        },
        0
      );

      heroTl.to({}, { duration: 0.5 });

      heroTl.to(
        modelRef.current.rotation,
        {
          y: "+=" + Math.PI,
          ease: "power2.out",
          duration: 2,
        },
        0.7
      );

      // ─── PHASE 2: HERO → ECOSYSTEM TRANSITION ───
      const ecosystemTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#ecosystem",           
          start: "top 90%",                
          end: "top 20%",                  
          scrub: 1,
        },
      });

      // Coin mengecil
      ecosystemTl.to(modelRef.current.scale, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        ease: "power2.inOut",
        duration: 3,
      });

      // Coin naik ke tengah
      ecosystemTl.to(
        modelRef.current.position,
        {
          x: 0,
          y: 0,
          z: 1,
          ease: "power2.inOut",
          duration: 3,
        },
        0
      );

      // Rotasi pelan
      ecosystemTl.to(
        modelRef.current.rotation,
        {
          y: "+=" + Math.PI * 2,
          ease: "none",
          duration: 4,
        },
        0
      );

      // ─── ROTATE 2 & 3 (text switch triggers) ───
      ScrollTrigger.create({
        trigger: ".scroll-container",
        start: "2600px top",
        onEnter: () => {
          gsap.to(modelRef.current!.rotation, {
            y: "+=" + Math.PI,
            duration: 2,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(modelRef.current!.rotation, {
            y: "-=" + Math.PI,
            duration: 2,
            ease: "power2.out",
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".scroll-container",
        start: "5200px top",
        onEnter: () => {
          gsap.to(modelRef.current!.rotation, {
            y: "+=" + Math.PI,
            duration: 2,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(modelRef.current!.rotation, {
            y: "-=" + Math.PI,
            duration: 2,
            ease: "power2.out",
          });
        },
      });

      return () => {
        heroTl.kill();
        ecosystemTl.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }
  }, [scene, quality, targetScale]);

  return <primitive ref={modelRef} object={scene} />;
}

useGLTF.preload("/models/mantle_coin.glb");