"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { selectedProjects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const fieldMotion = [
  { y: [-10, 10, -10], x: [-4, 3, -4], duration: 13 },
  { y: [10, -9, 10], x: [3, -4, 3], duration: 14 },
  { y: [-9, 8, -9], x: [-3, 3, -3], duration: 12 },
  { y: [8, -9, 8], x: [4, -3, 4], duration: 15 },
  { y: [-8, 9, -8], x: [-3, 2, -3], duration: 13 },
  { y: [9, -8, 9], x: [2, -3, 2], duration: 14 }
];

interface BeamState {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  side: "left" | "right";
}

export function SelectedProjectsSection() {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const panelRef = useRef<HTMLDivElement | null>(null);
  const defaultProject = useMemo(
    () => selectedProjects.find((project) => project.title.includes("Custom Engine")) ?? selectedProjects[0],
    []
  );
  const projectMetaBySlug = useMemo(
    () => new Map(selectedProjects.map((project, index) => [project.slug, { index, side: index % 2 === 0 ? "left" : "right" as "left" | "right" }])),
    []
  );
  const [selectedSlug, setSelectedSlug] = useState<string>(defaultProject?.slug ?? "");
  const [activeHoverSlug, setActiveHoverSlug] = useState<string | null>(null);
  const [beam, setBeam] = useState<BeamState | null>(null);

  const activateProject = useCallback((slug: string) => {
    setSelectedSlug((prev) => (prev === slug ? prev : slug));
    setActiveHoverSlug((prev) => (prev === slug ? prev : slug));
  }, []);
  const focusedProject = useMemo(
    () => selectedProjects.find((project) => project.slug === selectedSlug) ?? defaultProject,
    [defaultProject, selectedSlug]
  );

  const updateBeam = useCallback(() => {
    if (!activeHoverSlug || !panelRef.current) {
      setBeam(null);
      return;
    }

    const card = cardRefs.current[activeHoverSlug];
    if (!card) {
      setBeam(null);
      return;
    }

    const panelRect = panelRef.current.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const side = projectMetaBySlug.get(activeHoverSlug)?.side ?? "left";

    setBeam({
      startX: side === "left" ? cardRect.right - 6 : cardRect.left + 6,
      startY: cardRect.top + cardRect.height * 0.52,
      endX: side === "left" ? panelRect.left + 8 : panelRect.right - 8,
      endY: panelRect.top + panelRect.height * 0.42,
      side
    });
  }, [activeHoverSlug, projectMetaBySlug]);

  useEffect(() => {
    updateBeam();
  }, [updateBeam]);

  useEffect(() => {
    if (!activeHoverSlug) {
      return;
    }

    let rafId = 0;
    const syncBeam = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateBeam);
    };

    window.addEventListener("scroll", syncBeam, { passive: true });
    window.addEventListener("resize", syncBeam);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", syncBeam);
      window.removeEventListener("resize", syncBeam);
    };
  }, [activeHoverSlug, updateBeam]);

  const activeSide = activeHoverSlug ? projectMetaBySlug.get(activeHoverSlug)?.side ?? null : null;

  return (
    <section id="selected-projects" className="bg-editorial-rhythm relative border-b border-line/60 py-20 md:py-28">
      <Container>
        <Reveal>
          <header className="mb-10 space-y-3 md:mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Selected Projects</p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-textMain md:text-5xl">
              Additional gameplay and systems builds.
            </h2>
          </header>
        </Reveal>

        <div className="relative mt-8 pb-16 lg:pb-28">
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute left-[7%] top-[30%] h-40 w-40 rounded-full bg-accent/10 blur-[90px]" />
            <div className="absolute right-[8%] top-[58%] h-44 w-44 rounded-full bg-[#5f8dad]/15 blur-[95px]" />
          </div>

          <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(520px,35vw)_minmax(0,1fr)] lg:gap-x-4 lg:gap-y-14">
            {selectedProjects.map((project, index) => (
              <Reveal
                key={project.slug}
                delay={0.03 * ((index % 6) + 1)}
                y={20}
                className={index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-3"}
              >
                {(() => {
                  const isActive = activeHoverSlug === project.slug;
                  const isDimmed = activeHoverSlug && !isActive;
                  const outerShiftClass =
                    index % 2 === 0
                      ? index % 4 === 0
                        ? "lg:-ml-28"
                        : "lg:-ml-20"
                      : index % 4 === 1
                        ? "lg:-mr-28"
                        : "lg:-mr-20";
                  const sizeClass = index % 3 === 0 ? "lg:max-w-[640px]" : index % 3 === 1 ? "lg:max-w-[620px]" : "lg:max-w-[600px]";

                  return (
                <div
                  className={`flex ${index % 2 === 0 ? "justify-start lg:justify-self-start" : "justify-end lg:justify-self-end"} ${outerShiftClass}`}
                >
                  <motion.div
                    ref={(node) => {
                      cardRefs.current[project.slug] = node;
                    }}
                    animate={{
                      y: fieldMotion[index % fieldMotion.length].y,
                      x: fieldMotion[index % fieldMotion.length].x
                    }}
                    transition={{
                      duration: fieldMotion[index % fieldMotion.length].duration,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`transform-gpu will-change-transform relative w-full ${sizeClass}`}
                    style={{ transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
                  >
                    <motion.article
                      whileHover={{ scale: 1.038 }}
                      transition={{ duration: 0.26, ease: "easeOut" }}
                      onMouseEnter={() => activateProject(project.slug)}
                      onMouseMove={() => activateProject(project.slug)}
                      onFocus={() => activateProject(project.slug)}
                      onMouseLeave={() => setActiveHoverSlug(null)}
                      className={`group relative overflow-hidden rounded-2xl bg-panel/76 backdrop-blur-md transition-all duration-300 ${isDimmed ? "opacity-38 saturate-[0.76]" : "opacity-100"} ${isActive ? "border border-accent/55 shadow-[0_30px_90px_-45px_rgba(98,187,235,0.65)]" : "border border-line/75 shadow-card"}`}
                    >
                      <div className="relative">
                        {project.video ? (
                          <video
                            className="aspect-[16/10] w-full object-cover brightness-[0.93] transition duration-300 group-hover:brightness-[1.04]"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster={project.image}
                            aria-label={`${project.title} preview`}
                          >
                            <source src={project.video} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={project.image} alt={project.title} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-transparent" />
                        <motion.div
                          aria-hidden
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(130,208,255,0.16),rgba(130,208,255,0))]"
                        />
                        <motion.div
                          aria-hidden
                          animate={{ opacity: isActive ? 0.92 : 0, x: isActive ? "112%" : "-132%" }}
                          transition={{ duration: isActive ? 1.25 : 0.2, ease: "linear", repeat: isActive ? Infinity : 0, repeatDelay: 0.55 }}
                          className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-transparent via-white/22 to-transparent"
                        />
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="inline-flex rounded-md border border-white/20 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e0ebf8] backdrop-blur-sm">
                            {project.title}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  </motion.div>
                </div>
                  );
                })()}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      <div className="pointer-events-none fixed inset-0 z-20 hidden lg:block">
        <AnimatePresence initial={false}>
          {beam ? (
            <motion.svg
              key={`${activeHoverSlug ?? "beam"}-${beam.side}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="project-connection-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(98,187,235,0.06)" />
                  <stop offset="50%" stopColor="rgba(125,204,248,0.36)" />
                  <stop offset="100%" stopColor="rgba(98,187,235,0.08)" />
                </linearGradient>
                <filter id="project-connection-glow" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="2.8" />
                </filter>
              </defs>
              <motion.path
                d={`M ${beam.startX} ${beam.startY} C ${(beam.startX + beam.endX) / 2} ${beam.startY - 8}, ${(beam.startX + beam.endX) / 2} ${beam.endY + 8}, ${beam.endX} ${beam.endY}`}
                stroke="url(#project-connection-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                filter="url(#project-connection-glow)"
                initial={{ pathLength: 0.1, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                exit={{ pathLength: 0.1, opacity: 0 }}
                transition={{ duration: 0.34, ease: "easeInOut" }}
              />
            </motion.svg>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-1/2 z-30 hidden -translate-y-[18%] justify-center lg:flex">
        <motion.aside
          ref={panelRef}
          initial={false}
          layout
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.24,
            ease: "easeOut",
            layout: { type: "spring", stiffness: 150, damping: 24, mass: 0.72 }
          }}
          className={`pointer-events-auto relative w-[min(600px,84vw)] rounded-2xl border bg-[#0a111b]/86 p-5 shadow-[0_25px_70px_-35px_rgba(0,0,0,0.95)] backdrop-blur-md transition-colors duration-300 ${activeHoverSlug ? "border-accent/45" : "border-accent/30"}`}
        >
          <motion.div
            aria-hidden
            animate={{ opacity: activeHoverSlug ? 1 : 0.45 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`pointer-events-none absolute inset-y-5 w-[3px] rounded-full bg-gradient-to-b from-accent/15 via-accent/70 to-accent/15 ${activeSide === "right" ? "right-0" : "left-0"}`}
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              layout
              key={focusedProject.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.24,
                ease: "easeOut",
                layout: { type: "spring", stiffness: 155, damping: 25, mass: 0.75 }
              }}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent/90">Focused Project</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-textMain">{focusedProject.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-textMuted">{focusedProject.shortSummary}</p>

              <ul className="mt-3 space-y-1.5 text-sm text-[#d8e6f7]">
                {focusedProject.compactBullets.slice(0, 2).map((bullet) => (
                  <li key={bullet}>- {bullet}</li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.13em] text-[#c4d6ec]">
                {focusedProject.tags.slice(0, 4).map((tag) => (
                  <span key={`${focusedProject.slug}-${tag}`} className="rounded-md border border-line/80 bg-panel/80 px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              {focusedProject.links.repo ? (
                <Link href={focusedProject.links.repo} target="_blank" rel="noreferrer" className="pointer-events-auto mt-4 inline-flex text-sm font-medium text-accent hover:text-[#8fd1f5]">
                  Open Repository
                </Link>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </motion.aside>
      </div>
    </section>
  );
}
