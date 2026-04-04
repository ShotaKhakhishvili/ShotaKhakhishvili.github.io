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

const siteUrl = "https://shotakhakhishvili.github.io";
const siteTitle = "Shota Khakhishvili | UE5 C++ Gameplay / Systems Programmer";
const siteDescription =
  "UE5 C++ gameplay and systems programmer portfolio featuring runtime architecture, plugin tooling, rendering experiments, and playable prototypes.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/icons/favicon.svg"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Shota Khakhishvili Portfolio",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/website.png",
        width: 1200,
        height: 630,
        alt: "Shota Khakhishvili portfolio preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/website.png"]
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
