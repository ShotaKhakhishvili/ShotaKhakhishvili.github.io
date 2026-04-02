"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { heroChips, heroProject, heroValueStatement } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { GridBackground } from "@/components/ui/grid-background";
import { ProjectVideo } from "@/components/ui/project-video";
import { Reveal } from "@/components/ui/reveal";
import { TechChip } from "@/components/ui/tech-chip";
import { MOTION_DURATION_REVEAL, MOTION_EASE_STANDARD } from "@/lib/motion";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-line/60 py-20 md:py-28 lg:py-36">
      <GridBackground />

      <Container className="grid gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-20">
        <Reveal className="space-y-8 lg:pt-4" delay={0.03}>
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">UE5 Systems Programming</p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.04] tracking-tight text-textMain md:text-6xl">
              UE5 C++ Systems and Gameplay Programmer
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-textMuted">
              {heroValueStatement}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-textMuted/85">Featured System: {heroProject.title}</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {heroChips.slice(0, 3).map((chip) => (
              <TechChip key={chip}>{chip}</TechChip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="#pinned-story"
              className="inline-flex items-center justify-center rounded-md border border-accent bg-accentSoft px-5 py-2.5 text-sm font-medium tracking-wide text-textMain shadow-glow transition duration-300 hover:-translate-y-0.5 hover:bg-[#1b4f6e]"
            >
              Enter Story
            </Link>
            <Link
              href="#cinematic-projects"
              className="inline-flex items-center justify-center rounded-md border border-line bg-panel/80 px-5 py-2.5 text-sm font-medium tracking-wide text-textMain transition duration-300 hover:border-accent/60 hover:text-white"
            >
              All Projects
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: MOTION_DURATION_REVEAL, ease: MOTION_EASE_STANDARD, delay: 0.24 }}
            className="hidden items-center gap-3 pt-1 text-xs uppercase tracking-[0.18em] text-textMuted/85 md:flex"
          >
            <span className="relative flex h-6 w-3 items-start justify-center rounded-full border border-line/80">
              <span className="hero-scroll-cue-dot mt-1 h-1.5 w-1.5 rounded-full bg-accent/80" />
            </span>
            <span className="hero-scroll-cue-line h-px w-14 bg-gradient-to-r from-line via-accent/60 to-transparent" />
            <span>Scroll For Project Breakdown</span>
          </motion.div>
        </Reveal>

        <Reveal delay={0.11}>
          <div className="relative rounded-[1.45rem] border border-line/75 bg-panel/88 p-2.5 shadow-glow lg:translate-y-4">
            <div className="pointer-events-none absolute inset-0 rounded-[1.45rem] bg-gradient-to-b from-white/[0.035] via-transparent to-transparent" />
            <ProjectVideo
              src={heroProject.presentation.mediaType === "video" ? heroProject.video : undefined}
              poster={heroProject.image}
              title={`${heroProject.title} showcase`}
              priority
              className="rounded-[1.15rem] border border-line/70"
            />
            <p className="mt-3 px-1 text-[10px] font-medium uppercase tracking-[0.16em] text-textMuted/80">
              Procedural Terrain Runtime Anchor
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
