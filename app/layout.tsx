import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Shota Khakhishvili | UE5 C++ Gameplay / Systems Programmer",
  description:
    "UE5 C++ gameplay and systems programming portfolio focused on runtime architecture, performance, plugin tooling, and shippable technical systems.",
  icons: {
    icon: "/icons/favicon.svg"
  },
  openGraph: {
    title: "Shota Khakhishvili | UE5 C++ Gameplay / Systems Programmer",
    description:
      "Systems-focused portfolio with featured procedural terrain architecture, UE5 plugin development, and gameplay runtime engineering.",
    images: ["/images/pic_ProceduralSurface.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${sora.variable} ${jetbrainsMono.variable} bg-bg text-textMain antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
