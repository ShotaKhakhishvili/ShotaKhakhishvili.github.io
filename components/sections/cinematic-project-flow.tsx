"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { cinematicProjects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { ProjectVideo } from "@/components/ui/project-video";
import { Reveal } from "@/components/ui/reveal";
import { TechChip } from "@/components/ui/tech-chip";
import { cn } from "@/lib/utils";
import { MOTION_DURATION_REVEAL, MOTION_EASE_STANDARD } from "@/lib/motion";

const widthClasses: Record<string, string> = {
  wide: "md:w-[82%] xl:w-[74%]",
  narrow: "md:w-[64%] xl:w-[56%]"
};

const rhythmOffsets = ["", "md:mt-6", "", "md:mt-10", "", "md:mt-4"] as const;

const rhythmGaps = ["", "md:mb-2", "md:mb-6", "", "md:mb-3", ""] as const;

export function CinematicProjectFlowSection() {
  const [activeSlug, setActiveSlug] = useState<string>(cinematicProjects[0]?.slug ?? "");
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const activeIndex = cinematicProjects.findIndex((project) => project.slug === activeSlug);
  const prefersReducedMotion = useReducedMotion();

  const observerOptions = useMemo(
    () => ({
      root: null,
      rootMargin: "-30% 0px -30% 0px",
      threshold: 0.25
    }),
    []
  );

  useEffect(() => {
    const cards = cardRefs.current.filter((node): node is HTMLElement => Boolean(node));
    if (!cards.length) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slug = entry.target.getAttribute("data-slug");
          if (slug) {
            setActiveSlug(slug);
          }
        }
      });
    }, observerOptions);

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [observerOptions]);

  return (
    <section id="cinematic-projects" className="bg-editorial-rhythm relative border-b border-line/60 py-20 md:py-24">
      <Container>
        <Reveal>
          <header className="mb-10 space-y-3 md:mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Cinematic Project Flow</p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-textMain md:text-5xl">
              Remaining projects, sequenced with intent.
            </h2>
          </header>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_220px] lg:gap-12">
          <div className="space-y-8 md:space-y-11">
            {cinematicProjects.map((project, index) => {
              const alignClass = project.entry === "left" ? "md:justify-start" : "md:justify-end";
              const delay = 0.03 * (index + 1);
              const distance = activeIndex < 0 ? 0 : Math.abs(index - activeIndex);
              const focusClass =
                distance === 0
                  ? "scale-[1.012] opacity-100"
                  : distance === 1
                    ? "opacity-70"
                    : "opacity-50";
              const offsetClass = rhythmOffsets[index % rhythmOffsets.length];
              const gapClass = rhythmGaps[index % rhythmGaps.length];

              return (
                <div key={project.slug} className={cn("flex", alignClass, offsetClass, gapClass)}>
                  <motion.article
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    data-slug={project.slug}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: project.entry === "left" ? -46 : 46 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.32 }}
                    transition={{ duration: MOTION_DURATION_REVEAL, ease: MOTION_EASE_STANDARD, delay }}
                    whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                    className={cn(
                      "w-full rounded-2xl border border-line/80 bg-panel/90 p-4 shadow-card transition-all duration-300 md:p-5",
                      widthClasses[project.width],
                      focusClass
                    )}
                  >
                    <ProjectVideo src={project.video} poster={project.image} title={project.title} className="border-line/70" />

                    <div className="mt-4 space-y-2.5">
                      <h3 className="text-2xl font-semibold tracking-tight text-textMain">{project.title}</h3>
                      <p className="max-w-2xl text-sm leading-relaxed text-textMuted">{project.summary}</p>

                      {project.bullets.length > 0 ? (
                        <ul className="space-y-1.5 text-xs text-textMuted/90 md:text-sm">
                          {project.bullets.slice(0, 2).map((bullet) => (
                            <li key={bullet}>- {bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <TechChip key={`${project.slug}-tag-${tag}`}>{tag}</TechChip>
                      ))}
                    </div>

                    {project.links.repo ? (
                      <Link
                        href={project.links.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex w-fit text-sm font-medium text-accent transition hover:text-[#87d8ff]"
                      >
                        Open Project
                      </Link>
                    ) : null}
                  </motion.article>
                </div>
              );
            })}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-line/65 bg-panel/72 p-4 backdrop-blur-sm">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent/90">Flow Index</p>
              <ul className="mt-3 space-y-2">
                {cinematicProjects.map((project, index) => (
                  <li
                    key={`index-${project.slug}`}
                    className={cn(
                      "rounded-md border px-2.5 py-2 text-xs leading-snug transition",
                      activeSlug === project.slug
                        ? "border-accent/65 bg-accentSoft/45 text-textMain"
                        : "border-line/55 bg-panelSoft/20 text-textMuted"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")} {project.title}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
