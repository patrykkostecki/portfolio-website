"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Scroll progress bar + back-to-top button. */
export function Chrome() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.2 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[linear-gradient(90deg,#38B6FF,#6364C7,#882199)] shadow-[0_0_14px_rgba(56,182,255,0.6)]"
      />
      <motion.button
        type="button"
        aria-label="Do góry"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={false}
        animate={showTop ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: 16, pointerEvents: "none" }}
        transition={{ duration: 0.3 }}
        className="glass glass-hover fixed bottom-6 right-6 z-[55] flex h-12 w-12 items-center justify-center rounded-full text-[var(--text-dim)] hover:text-white"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </>
  );
}
