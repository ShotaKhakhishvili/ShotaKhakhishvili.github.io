import Link from "next/link";

import { featuredProject, heroChips, heroValueStatement } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { GridBackground } from "@/components/ui/grid-background";
import { ProjectVideo } from "@/components/ui/project-video";
import { Reveal } from "@/components/ui/reveal";
import { TechChip } from "@/components/ui/tech-chip";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-line/60 py-16 md:py-24">
      <GridBackground />

      <Container className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <Reveal className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">UE5 Systems Programming</p>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-textMain md:text-6xl">
              UE5 C++ Gameplay / Systems Programmer
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-textMuted md:text-base">{heroValueStatement}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {heroChips.map((chip) => (
              <TechChip key={chip}>{chip}</TechChip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="#selected-projects"
              className="inline-flex items-center justify-center rounded-md border border-accent bg-accentSoft px-5 py-2.5 text-sm font-medium tracking-wide text-textMain shadow-glow transition duration-300 hover:-translate-y-0.5 hover:bg-[#1b4f6e]"
            >
              See Systems Work
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-line bg-panel px-5 py-2.5 text-sm font-medium tracking-wide text-textMain transition duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-white"
            >
              Contact
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-line/90 bg-panel/90 p-2 shadow-glow">
            <ProjectVideo
              src={featuredProject.video}
              poster={featuredProject.image}
              title={`${featuredProject.title} showcase`}
              priority
              className="rounded-xl border border-line/80"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
