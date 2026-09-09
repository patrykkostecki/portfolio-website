"use client";

import { MotionConfig, MotionGlobalConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import { Background } from "@/components/Background";
import { Chrome } from "@/components/Chrome";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

// screenshot/diagnostic mode: ?noanim renders everything instantly
const NOANIM = typeof window !== "undefined" && window.location.search.includes("noanim");
if (NOANIM) MotionGlobalConfig.skipAnimations = true;

export function Shell({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!NOANIM) return;
    // after hydration, so the <html> attributes still match the server
    document.documentElement.style.scrollBehavior = "auto";
    // whileInView never fires in headless/hidden viewports — force the final state
    const style = document.createElement("style");
    style.textContent = '[style*="opacity: 0"], [style*="opacity:0"] { opacity: 1 !important; transform: none !important; }';
    document.head.appendChild(style);
    // ?at=<section id> shifts that section to the top without scrolling (hidden viewports never repaint on scroll)
    const at = new URLSearchParams(window.location.search).get("at");
    const target = at ? document.getElementById(at) : null;
    if (target) document.body.style.transform = `translateY(-${Math.max(0, target.getBoundingClientRect().top + window.scrollY - 24)}px)`;
    return () => {
      style.remove();
      document.body.style.transform = "";
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen">
        <Background />
        <Chrome />
        <Navbar />
        <main className="relative overflow-x-clip">{children}</main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
