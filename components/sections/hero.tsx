"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";

import { floatingHeroCards, heroBackgroundVideo } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { FloatingProjectLayer } from "@/components/sections/floating-project-layer";
import { Reveal } from "@/components/ui/reveal";
import { MOTION_DURATION_REVEAL, MOTION_EASE_STANDARD } from "@/lib/motion";

export function HeroSection() {
  const handleTopProjectPress = useCallback((slug: string) => {
    window.dispatchEvent(
      new CustomEvent("selected-project:focus", {
        detail: { slug, scrollToCard: true }
      })
    );

    const section = document.getElementById("selected-projects");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section id="home" className="relative isolate flex min-h-screen items-center overflow-hidden border-b border-line/60">
      {heroBackgroundVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/pic_ProceduralSurface.png"
          aria-label="UE5 procedural terrain and systems showcase"
        >
          <source src={heroBackgroundVideo} type="video/mp4" />
        </video>
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#060b14]/88 via-[#060b14]/70 to-[#060b14]/22" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(144,214,255,0.2),transparent_36%),radial-gradient(circle_at_82%_75%,rgba(67,103,140,0.24),transparent_30%)]" />
      <FloatingProjectLayer cards={floatingHeroCards} onProjectPress={handleTopProjectPress} />

      <Container className="relative z-20 py-16 md:py-20 lg:pl-0">
        <Reveal className="max-w-3xl space-y-14 lg:-ml-40" delay={0.03}>
          <div className="space-y-5">
            <div className="inline-flex rounded-xl border border-white/28 bg-[#06101c]/78 px-4 py-3 shadow-[0_28px_64px_-34px_rgba(0,0,0,0.98)] backdrop-blur-[14px] md:px-5 md:py-4">
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.03] tracking-tight text-[#4f6578] [text-shadow:0_0_12px_rgba(27,44,60,0.24)] md:text-6xl lg:text-[4.2rem]">
                UE5 C++ Gameplay / Systems Programmer
              </h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: MOTION_DURATION_REVEAL, ease: MOTION_EASE_STANDARD, delay: 0.24 }}
            className="hidden w-fit items-center gap-4 rounded-xl border border-white/35 bg-[#091322]/62 px-5 py-3 text-sm uppercase tracking-[0.2em] text-[#dff1ff] shadow-[0_25px_55px_-42px_rgba(98,187,235,0.9)] backdrop-blur-sm md:flex md:text-base"
          >
            <span className="relative flex h-11 w-6 items-start justify-center rounded-full border border-white/45 bg-black/20">
              <span className="hero-scroll-cue-dot mt-2 h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="hero-scroll-cue-line h-[3px] w-24 bg-gradient-to-r from-white/30 via-accent to-transparent" />
            <span>Scroll To See Projects</span>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}
