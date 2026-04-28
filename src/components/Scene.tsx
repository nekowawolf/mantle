"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Scene() {
  const [quality, setQuality] = useState<"low" | "high">("low");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuality("high");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none will-change-transform">
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!scene || !modelRef.current) return;

    // CENTER MODEL
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // SCALE MODEL
    modelRef.current.scale.set(1.6, 1.6, 1.6);

    modelRef.current.rotation.y = Math.PI;

    // LOW QUALITY MODE (mobile / initial load)
    if (quality === "low") {
      return;
    }

    // HIGH QUALITY MODE (scroll animation aktif)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(modelRef.current.rotation, {
      y: Math.PI * 2,
      ease: "none",
    });

    return (): void => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [scene, quality]);

  return <primitive ref={modelRef} object={scene} />;
}