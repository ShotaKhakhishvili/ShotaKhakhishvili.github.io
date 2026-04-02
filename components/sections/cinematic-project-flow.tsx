"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cinematicProjects, marqueeCinematicProjects, supportingCinematicProjects } from "@/data/projects";
import { AlternatingProjectBlock } from "@/components/ui/alternating-project-block";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function CinematicProjectFlowSection() {
  const [activeSlug, setActiveSlug] = useState<string>(cinematicProjects[0]?.slug ?? "");
  const [activeMarqueeSlug, setActiveMarqueeSlug] = useState<string>(marqueeCinematicProjects[0]?.slug ?? "");
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndex = marqueeCinematicProjects.findIndex((project) => project.slug === activeMarqueeSlug);
  const activeSequenceIndex = cinematicProjects.findIndex((project) => project.slug === activeSlug);
  const sequenceProgress = cinematicProjects.length ? ((activeSequenceIndex + 1) / cinematicProjects.length) * 100 : 0;
  const cinematicSideBySlug = useMemo(
    () => new Map(cinematicProjects.map((project, index) => [project.slug, (index % 2 === 0 ? "left" : "right") as "left" | "right"])),
    []
  );

  const observerOptions = useMemo(
    () => ({
      root: null,
      rootMargin: "-30% 0px -30% 0px",
      threshold: 0.25
    }),
    []
  );

  useEffect(() => {
    const cards = cardRefs.current.filter((node): node is HTMLDivElement => Boolean(node));
    if (!cards.length) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slug = entry.target.getAttribute("data-slug");
          if (slug) {
            setActiveSlug(slug);
            if (marqueeCinematicProjects.some((project) => project.slug === slug)) {
              setActiveMarqueeSlug(slug);
            }
          }
        }
      });
    }, observerOptions);

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [observerOptions]);

  return (
    <section id="cinematic-projects" className="bg-editorial-rhythm relative border-b border-line/60 py-24 md:py-32">
      <Container>
        <Reveal>
          <header className="mb-12 space-y-3 md:mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Cinematic Project Flow</p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-textMain md:text-5xl">
              Remaining projects, sequenced with intent.
            </h2>
          </header>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_220px] lg:gap-14">
          <div className="space-y-10 md:space-y-14">
            <Reveal>
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent/90">Marquee Projects</p>
                <p className="max-w-2xl text-sm text-textMuted">High-signal systems shown with full cinematic emphasis.</p>
              </div>
            </Reveal>

            {marqueeCinematicProjects.map((project, index) => {
              const delay = 0.03 * (index + 1);
              const distance = activeIndex < 0 ? 0 : Math.abs(index - activeIndex);
              const entrySide = cinematicSideBySlug.get(project.slug) ?? project.presentation.entrySide;
              const isOffset = project.presentation.layoutMode === "offset";
              const isSplit = project.presentation.layoutMode === "split";
              const wrapperClass =
                project.presentation.layoutMode === "split"
                  ? "md:mb-3"
                  : project.presentation.layoutMode === "offset"
                    ? "md:mt-8"
                    : "";
              const focusClass =
                distance === 0
                  ? "scale-[1.012] opacity-100"
                  : distance === 1
                    ? "opacity-70"
                    : "opacity-50";

              return (
                <div key={project.slug} className={cn(wrapperClass)}>
                  <div
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    data-slug={project.slug}
                  >
                    <AlternatingProjectBlock
                      project={project}
                      enterFrom={entrySide}
                      width={isSplit ? "wide" : "standard"}
                      align={entrySide === "left" ? "start" : "end"}
                      offset={isOffset}
                      showBullets
                      isActive={distance === 0}
                      delay={delay}
                      cardClassName={focusClass}
                    />
                  </div>
                </div>
              );
            })}

            <Reveal>
              <div className="mt-8 space-y-2 border-t border-line/60 pt-8 md:mt-12 md:pt-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent/80">Supporting Projects</p>
                <p className="max-w-2xl text-sm text-textMuted/90">Compressed prototypes, lower visual priority.</p>
              </div>
            </Reveal>

            <div className="space-y-4 md:space-y-5">
              {supportingCinematicProjects.map((project, index) => {
                const entrySide = cinematicSideBySlug.get(project.slug) ?? project.presentation.entrySide;

                return (
                  <div
                    key={`support-${project.slug}`}
                    ref={(node) => {
                      cardRefs.current[marqueeCinematicProjects.length + index] = node;
                    }}
                    data-slug={project.slug}
                  >
                    <AlternatingProjectBlock
                      project={project}
                      enterFrom={entrySide}
                      width={project.presentation.layoutMode === "split" ? "wide" : "standard"}
                      align={entrySide === "left" ? "start" : "end"}
                      offset={project.presentation.layoutMode === "offset"}
                      showBullets={false}
                      delay={0.02 * (index + 1)}
                      cardClassName="opacity-62 border-line/65 bg-panelSoft/38 saturate-[0.9]"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-line/65 bg-panel/72 p-4 backdrop-blur-sm">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent/90">Flow Index</p>
              <div className="mt-3 space-y-1.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-textMuted/85">
                  {String(Math.max(activeSequenceIndex + 1, 1)).padStart(2, "0")} / {String(cinematicProjects.length).padStart(2, "0")}
                </p>
                <div className="h-1 overflow-hidden rounded-full bg-line/45">
                  <div
                    className="h-full rounded-full bg-accent/80 transition-[width] duration-300 ease-out"
                    style={{ width: `${Math.max(sequenceProgress, 6)}%` }}
                  />
                </div>
              </div>
              <ul className="mt-3 space-y-2">
                {cinematicProjects.map((project, index) => (
                  <li
                    key={`index-${project.slug}`}
                    className={cn(
                      "rounded-md border px-2.5 py-2 text-xs leading-snug transition",
                      activeSlug === project.slug
                        ? "border-accent/65 bg-accentSoft/45 text-textMain"
                        : project.presentation.priorityTier === "marquee"
                          ? "border-line/55 bg-panelSoft/20 text-textMuted"
                          : "border-line/45 bg-panelSoft/10 text-textMuted/70"
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
