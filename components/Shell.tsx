"use client";

import { MotionConfig, MotionGlobalConfig } from "framer-motion";
import type { ReactNode } from "react";

import { Background } from "@/components/Background";
import { Chrome } from "@/components/Chrome";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

// screenshot/diagnostic mode: ?noanim renders everything instantly
if (typeof window !== "undefined" && window.location.search.includes("noanim")) {
  MotionGlobalConfig.skipAnimations = true;
  document.documentElement.style.scrollBehavior = "auto";
}

export function Shell({ children }: { children: ReactNode }) {
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
