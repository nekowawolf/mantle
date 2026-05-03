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

function Model({
  url,
  quality,
}: {
  url: string;
  quality: "low" | "high";
}) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);

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
        onComplete: () => {
          // ─── PHASE 3: FLOATING ANIMATION ───
          if (modelRef.current) {
            // Kill any existing float tween
            if (floatTweenRef.current) {
              floatTweenRef.current.kill();
            }
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
        scrollTrigger: {
          trigger: "#ecosystem",
          start: isMobile ? "top 300%" : "top 90%",
          end: isMobile ? "top 40%" : "top 10%",
          scrub: isMobile ? 0.5 : 3,
          onLeaveBack: () => {
            if (floatTweenRef.current) {
              floatTweenRef.current.kill();
              floatTweenRef.current = null;
            }
          },
        },
      });

      // Coins shrink smaller
      ecosystemTl.to(modelRef.current.scale, {
        x: 0.9,
        y: 0.9,
        z: 0.9,
        ease: "power2.inOut",
        duration: 3,
      });

      // Coin naik ke tengah
      ecosystemTl.to(
        modelRef.current.position,
        {
          x: 0,
          y: 1.2,
          z: 1,
          ease: "power2.inOut",
          duration: 3,
        },
        0
      );

      ecosystemTl.to(
        modelRef.current.rotation,
        {
          y: "+=" + Math.PI * 3,
          ease: "none",
          duration: 4,
        },
        0
      );

      // ─── PHASE 4: GetMNT ───
      ScrollTrigger.create({
        trigger: "#get-mnt",

        // Different trigger positions
        start: isMobile ? "top 100%" : "top 80%",
        end: isMobile ? "top 35%" : "top 20%",

        scrub: isMobile ? 1 : 2,

        onEnter: () => {
          // Hentikan floating animation
          if (floatTweenRef.current) {
            floatTweenRef.current.kill();
            floatTweenRef.current = null;
          }

          if (!modelRef.current) return;

          const getMntTl = gsap.timeline();

          // 1. Scale up
          getMntTl.to(
            modelRef.current.scale,
            {
              x: isMobile ? 1.5 : 1.6,
              y: isMobile ? 1.5 : 1.6,
              z: isMobile ? 1.5 : 1.6,
              duration: 1.2,
              ease: "power2.out",
            },
            0
          );

          // 2. Rotate 1×
          getMntTl.to(
            modelRef.current.rotation,
            {
              y: "+=" + Math.PI * 2,
              duration: 1.5,
              ease: "power2.inOut",
            },
            0
          );

          // 3. Move coin to center
          getMntTl.to(
            modelRef.current.position,
            {
              x: 0,
              y: isMobile ? -0.7 : -1,
              z: 1,
              duration: 1.4,
              ease: "power2.inOut",
            },
            0.1
          );
        },

        onLeaveBack: () => {
          if (!modelRef.current) return;

          // Reverse rotate
          gsap.to(modelRef.current.rotation, {
            y: "-=" + Math.PI * 2,
            duration: 1.2,
            ease: "power2.inOut",
          });

          // Scale back
          gsap.to(modelRef.current.scale, {
            x: 0.9,
            y: 0.9,
            z: 0.9,
            duration: 1,
            ease: "power2.inOut",
          });

          // Back to floating position
          gsap.to(modelRef.current.position, {
            x: 0,
            y: 1.2,
            z: 1,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              if (modelRef.current) {
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
        },
      });

      // ─── PHASE 5: EVENTS ───
      ScrollTrigger.create({
        trigger: "#events",
      
        start: isMobile ? "top 240%" : "top 100%",
        end: isMobile ? "top 35%" : "top 20%",
      
        scrub: isMobile ? 1 : 2,
      
        onEnter: () => {
          if (floatTweenRef.current) {
            floatTweenRef.current.kill();
            floatTweenRef.current = null;
          }
      
          if (!modelRef.current) return;
      
          const eventsTl = gsap.timeline();
      
          // 1. Rotate 2x (720°)
          eventsTl.to(
            modelRef.current.rotation,
            {
              y: "+=" + Math.PI * 4,   // 2 full rotations
              duration: 2.0,
              ease: "power2.inOut",
            },
            0
          );
      
          eventsTl.to(
            modelRef.current.scale,
            {
              x: isMobile ? 0.3 : 0.4,
              y: isMobile ? 0.3 : 0.4,
              z: isMobile ? 0.3 : 0.4,
              duration: 1.6,
              ease: "power2.inOut",
            },
            0
          );
      
          eventsTl.to(
            modelRef.current.position,
            {
              x: isMobile ? -0.2 : -0.35,
              y: isMobile ? -2.4 : -2.2,
              z: 1,
              duration: 1.8,
              ease: "power2.inOut",
            },
            0.1
          );
        },
      
        onLeaveBack: () => {
          if (!modelRef.current) return;
      
          gsap.to(modelRef.current.rotation, {
            y: "-=" + Math.PI * 4,
            duration: 1.5,
            ease: "power2.inOut",
          });
      
          gsap.to(modelRef.current.scale, {
            x: isMobile ? 1.5 : 1.6,
            y: isMobile ? 1.5 : 1.6,
            z: isMobile ? 1.5 : 1.6,
            duration: 1.2,
            ease: "power2.inOut",
          });
      
          gsap.to(modelRef.current.position, {
            x: 0,
            y: isMobile ? -0.7 : -1,
            z: 1,
            duration: 1.4,
            ease: "power2.inOut",
          });
        },
      });

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
        if (floatTweenRef.current) {
          floatTweenRef.current.kill();
        }
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }
  }, [scene, quality, targetScale]);

  return <primitive ref={modelRef} object={scene} />;
}

useGLTF.preload("/models/mantle_coin.glb");