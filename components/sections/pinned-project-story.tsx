"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { pinnedStoryProjects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { ProjectVideo } from "@/components/ui/project-video";
import { TechChip } from "@/components/ui/tech-chip";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function PinnedProjectStorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<Array<HTMLElement | null>>([]);
  const activeIndexRef = useRef(0);

  const activateStep = (index: number) => {
    if (activeIndexRef.current === index) {
      return;
    }

    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const steps = stepsRef.current.filter((node): node is HTMLElement => Boolean(node));

      if (!pinRef.current || steps.length === 0) {
        return;
      }

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top+=72",
            end: "bottom bottom-=8%",
            pin: pinRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true
          });

          steps.forEach((step, index) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top center+=90",
              end: "bottom center",
              onEnter: () => activateStep(index),
              onEnterBack: () => activateStep(index)
            });
          });
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="pinned-story" ref={sectionRef} className="bg-engineered-depth relative border-b border-line/60 py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <div ref={pinRef} className="lg:h-[min(74vh,720px)]">
          <div className="space-y-4 pb-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Flagship Systems Story</p>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-textMain md:text-5xl">
              One system focus at a time.
            </h2>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-line/90 bg-panel/90 p-2 shadow-glow md:min-h-[420px]">
            {pinnedStoryProjects.map((project, index) => (
              <div
                key={project.slug}
                className={cn(
                  "absolute inset-2 transition-all duration-700 ease-out",
                  index === activeIndex ? "z-20 translate-y-0 scale-100 opacity-100" : "z-10 translate-y-2 scale-[0.99] opacity-0"
                )}
              >
                <ProjectVideo
                  src={project.video}
                  poster={project.image}
                  title={project.title}
                  priority={index === 0}
                  className="h-full rounded-xl border border-line/80"
                />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center gap-2">
              {pinnedStoryProjects.map((project, index) => (
                <span
                  key={`progress-${project.slug}`}
                  className={cn(
                    "h-[3px] flex-1 rounded-full transition-all duration-500",
                    index === activeIndex ? "bg-accent/90" : "bg-line/75"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-12 pb-6 lg:space-y-20">
          {pinnedStoryProjects.map((project, index) => (
            <article
              key={project.slug}
              ref={(node) => {
                stepsRef.current[index] = node;
              }}
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              className={cn(
                "rounded-xl border border-line/70 bg-panelSoft/45 p-5 transition-all duration-300 md:p-6",
                index === activeIndex
                  ? "opacity-100 shadow-card ring-1 ring-accent/25"
                  : "opacity-45 hover:opacity-65"
              )}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent/90">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-textMain">{project.title}</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-textMuted md:text-base">{project.summary}</p>

              {project.bullets.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm text-textMuted">
                  {project.bullets.slice(0, 2).map((bullet) => (
                    <li key={bullet}>- {bullet}</li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <TechChip key={`${project.slug}-${tag}`}>{tag}</TechChip>
                ))}
              </div>

              {project.links.repo ? (
                <Link
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-fit text-sm font-medium text-accent transition hover:text-[#87d8ff]"
                >
                  Open Repository
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
