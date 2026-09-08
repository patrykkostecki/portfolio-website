"use client";

import { useEffect } from "react";

import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Ticker } from "@/components/Ticker";
import { useLocale } from "@/lib/locale";

export default function Home() {
  const { dict } = useLocale();

  useEffect(() => {
    document.title = dict.meta.title;
  }, [dict]);

  return (
    <>
      <Hero messages={dict} />
      <Ticker messages={dict} />
      <Services messages={dict} />
      <Projects messages={dict} />
      <Faq messages={dict} />
      <Contact messages={dict} />
    </>
  );
}
