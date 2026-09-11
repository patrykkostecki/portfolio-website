import type { Metadata } from "next";
import { Exo_2, Inter, JetBrains_Mono } from "next/font/google";

import { Shell } from "@/components/Shell";
import "./globals.css";

const exo = Exo_2({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-exo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pk-dev.pl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "pk.dev — strony, aplikacje i gry 2D | Patryk Kostecki",
  description:
    "Masz pomysł? Opowiedz mi o nim. Buduję strony internetowe, aplikacje i gry 2D — od pomysłu po wdrożenie i opiekę po starcie.",
  openGraph: {
    title: "pk.dev — strony, aplikacje i gry 2D",
    description:
      "Masz pomysł? Opowiedz mi o nim. Buduję strony internetowe, aplikacje i gry 2D — od pomysłu po wdrożenie i opiekę po starcie.",
    url: siteUrl,
    siteName: "pk.dev",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/pkdev-avatar.png", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary",
    title: "pk.dev — strony, aplikacje i gry 2D",
    description: "Masz pomysł? Opowiedz mi o nim — zbuduję go od A do Z.",
    images: ["/pkdev-avatar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${exo.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
