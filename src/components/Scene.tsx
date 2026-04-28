"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SceneProps {
  onLoaded: () => void;
}

export default function Scene({ onLoaded }: SceneProps) {
  const [isModelReady, setIsModelReady] = useState(false);

  // Notify parent only when model is truly ready
  useEffect(() => {
    if (isModelReady) {
      const timer = setTimeout(() => {
        onLoaded();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isModelReady, onLoaded]);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="city" />
        <Model url="/models/mantle_coin.glb" onLoaded={() => setIsModelReady(true)} />
      </Canvas>
    </div>
  );
}

function Model({ url, onLoaded }: { url: string, onLoaded: () => void }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (scene && !isAnimating) {
      onLoaded();
      setIsAnimating(true);
    }
  }, [scene, onLoaded, isAnimating]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!modelRef.current) return;

    // Center the model geometry
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.x += (scene.position.x - center.x);
    scene.position.y += (scene.position.y - center.y);
    scene.position.z += (scene.position.z - center.z);

    modelRef.current.scale.set(1.5, 1.5, 1.5);
    modelRef.current.position.set(0, -0.5, 0); 
    modelRef.current.rotation.set(0, 0, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      }
    });

    // Scale up on scroll
    tl.to(modelRef.current.scale, {
      x: 2.2,
      y: 2.2,
      z: 2.2,
      ease: "power2.inOut"
    }, 0);

    // Rotate on scroll
    tl.to(modelRef.current.rotation, {
      x: Math.PI * 0.2,
      y: Math.PI * 4,
      ease: "none"
    }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [scene]);

  return <primitive ref={modelRef} object={scene} />;
}