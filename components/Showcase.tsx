"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import type { MouseEvent } from "react";

import { projects } from "@/data/projects";

const [web, app, game] = projects;

/** Real work, stacked in 3D and tilting toward the cursor. */
export function Showcase() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div onMouseMove={onMove} onMouseLeave={reset} className="relative mx-auto w-full max-w-[34rem]" style={{ perspective: 1400 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }} className="relative aspect-[4/3]">
        {/* browser window — alverniaplanet.com */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-[4%] w-[80%]"
          style={{ transform: "translateZ(0px)" }}
        >
          <div className="animate-floaty-slow overflow-hidden rounded-xl border border-white/10 bg-[#0e1525] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-2 flex h-4 flex-1 items-center rounded bg-white/5 px-2 font-mono text-[9px] text-white/40">
                alverniaplanet.com
              </span>
            </div>
            <div className="relative aspect-[16/10]">
              <Image src={web.cover} alt="alverniaplanet.com" fill sizes="(max-width: 1024px) 80vw, 440px" priority className="object-cover object-top" />
            </div>
          </div>
        </motion.div>

        {/* game frame — tadzik28.pl */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-[2%] left-[6%] w-[42%]"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="animate-floaty overflow-hidden rounded-lg border border-white/10 bg-[#0e1525] shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
            <div className="relative aspect-[16/10]">
              <Image src={game.cover} alt="tadzik28.pl" fill sizes="220px" className="object-cover" />
            </div>
            <p className="flex items-center justify-between px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-white/50">
              tadzik28.pl <span className="text-[var(--sky)]">gra 2D</span>
            </p>
          </div>
        </motion.div>

        {/* phone — MarsApp */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 right-0 w-[31%]"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="animate-floaty relative overflow-hidden rounded-[1.6rem] border-[5px] border-[#0b1120] bg-[#0b1120] shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
            <span className="absolute left-1/2 top-1.5 z-10 h-1 w-7 -translate-x-1/2 rounded-full bg-black/70" />
            <Image src={app.gallery[0]} alt="MarsApp" width={440} height={954} sizes="180px" className="h-auto w-full rounded-[1.2rem]" />
          </div>
          <Image
            src={app.cover}
            alt=""
            aria-hidden
            width={40}
            height={40}
            className="absolute -left-4 top-3 h-10 w-10 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
