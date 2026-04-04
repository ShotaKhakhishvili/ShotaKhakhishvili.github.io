"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { selectedProjects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { BunnyVideo } from "@/components/ui/bunny-video";
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

type TetherDirection = "above" | "below";

interface TetherState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  direction: TetherDirection;
}

interface GlobalParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  size: number;
}

export function SelectedProjectsSection() {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const panelRef = useRef<HTMLDivElement | null>(null);
  const tetherAnimationRef = useRef<number | null>(null);
  const tetherVelocityRef = useRef({ x: 0, y: 0 });
  const tetherStateRef = useRef<TetherState | null>(null);
  const beamRef = useRef<BeamState | null>(null);
  const particleIdRef = useRef(0);
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
  const [globalParticles, setGlobalParticles] = useState<GlobalParticle[]>([]);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const [tetherState, setTetherState] = useState<TetherState | null>(null);
  const connectedSlug = selectedSlug;

  const selectProject = useCallback((slug: string) => {
    setSelectedSlug((prev) => (prev === slug ? prev : slug));
  }, []);

  const hoverProject = useCallback((slug: string) => {
    setActiveHoverSlug((prev) => (prev === slug ? prev : slug));
  }, []);

  const focusProjectFromExternal = useCallback((slug: string, scrollToCard: boolean) => {
    if (!projectMetaBySlug.has(slug)) {
      return;
    }

    setSelectedSlug(slug);
    setActiveHoverSlug(null);
    setPreviewSlug(null);

    const section = document.getElementById("selected-projects");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (scrollToCard) {
      requestAnimationFrame(() => {
        const node = cardRefs.current[slug];
        node?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }, [projectMetaBySlug]);

  useEffect(() => {
    const handleExternalFocus = (event: Event) => {
      const customEvent = event as CustomEvent<{ slug?: string; scrollToCard?: boolean }>;
      const slug = customEvent.detail?.slug;
      if (!slug) {
        return;
      }

      focusProjectFromExternal(slug, Boolean(customEvent.detail?.scrollToCard));
    };

    window.addEventListener("selected-project:focus", handleExternalFocus as EventListener);

    return () => {
      window.removeEventListener("selected-project:focus", handleExternalFocus as EventListener);
    };
  }, [focusProjectFromExternal]);
  const focusedProject = useMemo(
    () => selectedProjects.find((project) => project.slug === selectedSlug) ?? defaultProject,
    [defaultProject, selectedSlug]
  );
  const previewProject = useMemo(
    () => selectedProjects.find((project) => project.slug === previewSlug) ?? null,
    [previewSlug]
  );
  const tetherProject = useMemo(
    () => selectedProjects.find((project) => project.slug === selectedSlug) ?? defaultProject,
    [defaultProject, selectedSlug]
  );

  const updateTetherState = useCallback(() => {
    const selectedCard = cardRefs.current[selectedSlug];
    if (!selectedCard) {
      setTetherState(null);
      return;
    }

    const rect = selectedCard.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const nextDirection: TetherDirection | null =
      rect.bottom < 88 ? "above" : rect.top > viewportHeight - 88 ? "below" : null;

    if (!nextDirection) {
      setTetherState(null);
      tetherVelocityRef.current = { x: 0, y: 0 };
      return;
    }

    const targetX = window.innerWidth * 0.5 - 220;
    const targetY = window.innerHeight * (nextDirection === "above" ? 0.08 : 0.64);

    setTetherState((prev) => {
      if (
        prev &&
        prev.direction === nextDirection &&
        Math.abs(prev.targetX - targetX) < 0.05 &&
        Math.abs(prev.targetY - targetY) < 0.05
      ) {
        return prev;
      }

      return {
        x: prev?.x ?? rect.left,
        y: prev?.y ?? rect.top,
        targetX,
        targetY,
        direction: nextDirection
      };
    });
  }, [selectedSlug]);

  const updateBeam = useCallback(() => {
    if (!connectedSlug || !panelRef.current) {
      setBeam(null);
      return;
    }

    const card = cardRefs.current[connectedSlug];
    if (!card) {
      setBeam(null);
      return;
    }

    const panelRect = panelRef.current.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const side = projectMetaBySlug.get(connectedSlug)?.side ?? "left";
    const tetherSource = tetherStateRef.current;
    const tethered = Boolean(tetherSource && connectedSlug === selectedSlug);
    const virtualRect = tethered && tetherSource
      ? {
          left: tetherSource.x,
          right: tetherSource.x + 440,
          top: tetherSource.y,
          bottom: tetherSource.y + 248
        }
      : null;
    const sourceRect = virtualRect ?? cardRect;

    const sourceCenterX = (sourceRect.left + sourceRect.right) * 0.5;
    const sourceCenterY = (sourceRect.top + sourceRect.bottom) * 0.5;

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    const panelBorderCandidates = [
      {
        x: panelRect.left + 8,
        y: clamp(sourceCenterY, panelRect.top + 12, panelRect.bottom - 12)
      },
      {
        x: panelRect.right - 8,
        y: clamp(sourceCenterY, panelRect.top + 12, panelRect.bottom - 12)
      },
      {
        x: clamp(sourceCenterX, panelRect.left + 12, panelRect.right - 12),
        y: panelRect.top + 8
      },
      {
        x: clamp(sourceCenterX, panelRect.left + 12, panelRect.right - 12),
        y: panelRect.bottom - 8
      }
    ];
    const nearestPanelPoint = panelBorderCandidates.reduce((closest, point) => {
      const closestDist = Math.hypot(closest.x - sourceCenterX, closest.y - sourceCenterY);
      const pointDist = Math.hypot(point.x - sourceCenterX, point.y - sourceCenterY);
      return pointDist < closestDist ? point : closest;
    }, panelBorderCandidates[0]);

    const sourceBorderCandidates = [
      {
        x: sourceRect.left + 6,
        y: clamp(nearestPanelPoint.y, sourceRect.top + 12, sourceRect.bottom - 12)
      },
      {
        x: sourceRect.right - 6,
        y: clamp(nearestPanelPoint.y, sourceRect.top + 12, sourceRect.bottom - 12)
      },
      {
        x: clamp(nearestPanelPoint.x, sourceRect.left + 12, sourceRect.right - 12),
        y: sourceRect.top + 6
      },
      {
        x: clamp(nearestPanelPoint.x, sourceRect.left + 12, sourceRect.right - 12),
        y: sourceRect.bottom - 6
      }
    ];

    const nearestSourcePoint = sourceBorderCandidates.reduce((closest, point) => {
      const closestDist = Math.hypot(closest.x - nearestPanelPoint.x, closest.y - nearestPanelPoint.y);
      const pointDist = Math.hypot(point.x - nearestPanelPoint.x, point.y - nearestPanelPoint.y);
      return pointDist < closestDist ? point : closest;
    }, sourceBorderCandidates[0]);

    const resolvedSide = side;

    setBeam((prev) => {
      if (!prev || prev.side !== resolvedSide) {
        return {
          startX: nearestSourcePoint.x,
          startY: nearestSourcePoint.y,
          endX: nearestPanelPoint.x,
          endY: nearestPanelPoint.y,
          side: resolvedSide
        };
      }

      const smoothing = 0.22;
      const nextStartX = prev.startX + (nearestSourcePoint.x - prev.startX) * smoothing;
      const nextStartY = prev.startY + (nearestSourcePoint.y - prev.startY) * smoothing;
      const nextEndX = prev.endX + (nearestPanelPoint.x - prev.endX) * smoothing;
      const nextEndY = prev.endY + (nearestPanelPoint.y - prev.endY) * smoothing;
      const tinyDelta =
        Math.abs(nextStartX - prev.startX) < 0.04 &&
        Math.abs(nextStartY - prev.startY) < 0.04 &&
        Math.abs(nextEndX - prev.endX) < 0.04 &&
        Math.abs(nextEndY - prev.endY) < 0.04;

      if (tinyDelta) {
        return prev;
      }

      return {
        startX: nextStartX,
        startY: nextStartY,
        endX: nextEndX,
        endY: nextEndY,
        side: resolvedSide
      };
    });
  }, [connectedSlug, projectMetaBySlug, selectedSlug]);

  useEffect(() => {
    updateBeam();
  }, [updateBeam]);

  useEffect(() => {
    tetherStateRef.current = tetherState;
  }, [tetherState]);

  useEffect(() => {
    beamRef.current = beam;
    if (!beam) {
      setGlobalParticles((prev) => (prev.length > 0 ? [] : prev));
    }
  }, [beam]);

  useEffect(() => {
    updateTetherState();
  }, [selectedSlug, updateTetherState]);

  useEffect(() => {
    if (!tetherStateRef.current) {
      if (tetherAnimationRef.current) {
        cancelAnimationFrame(tetherAnimationRef.current);
        tetherAnimationRef.current = null;
      }
      return;
    }

    const step = () => {
      setTetherState((prev) => {
        if (!prev) {
          return prev;
        }

        const spring = 0.062;
        const damping = 0.56;
        const maxSpeed = 13.2;
        const velocity = tetherVelocityRef.current;

        velocity.x = (velocity.x + (prev.targetX - prev.x) * spring) * damping;
        velocity.y = (velocity.y + (prev.targetY - prev.y) * spring) * damping;
        const speed = Math.hypot(velocity.x, velocity.y);
        if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          velocity.x *= scale;
          velocity.y *= scale;
        }

        const nextX = prev.x + velocity.x;
        const nextY = prev.y + velocity.y;
        const closeEnough = Math.abs(prev.targetX - nextX) < 0.12 && Math.abs(prev.targetY - nextY) < 0.12;

        if (closeEnough && Math.abs(prev.targetX - prev.x) < 0.08 && Math.abs(prev.targetY - prev.y) < 0.08) {
          velocity.x = 0;
          velocity.y = 0;
          return prev;
        }

        return {
          ...prev,
          x: closeEnough ? prev.targetX : nextX,
          y: closeEnough ? prev.targetY : nextY
        };
      });

      tetherAnimationRef.current = requestAnimationFrame(step);
    };

    tetherAnimationRef.current = requestAnimationFrame(step);

    return () => {
      if (tetherAnimationRef.current) {
        cancelAnimationFrame(tetherAnimationRef.current);
        tetherAnimationRef.current = null;
      }
    };
  }, [Boolean(tetherState)]);

  useEffect(() => {
    let rafId = 0;
    let last = performance.now();
    let spawnCarry = 0;

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;

      setGlobalParticles((prev) => {
        const activeBeam = beamRef.current;
        if (!activeBeam && prev.length === 0) {
          return prev;
        }

        const damp = Math.pow(0.985, dt * 60);
        let next = prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx * dt,
            y: particle.y + particle.vy * dt,
            vx: particle.vx * damp,
            vy: particle.vy * damp - 1.2 * dt,
            life: particle.life + dt
          }))
          .filter((particle) => particle.life < particle.ttl);

        if (activeBeam) {
          spawnCarry += dt;
          while (spawnCarry >= 0.08) {
            spawnCarry -= 0.08;

            const lineX = activeBeam.endX - activeBeam.startX;
            const lineY = activeBeam.endY - activeBeam.startY;
            const lineLength = Math.max(1, Math.hypot(lineX, lineY));
            const dirX = lineX / lineLength;
            const dirY = lineY / lineLength;
            const perpX = -dirY;
            const perpY = dirX;
            const t = 0.12 + Math.random() * 0.76;
            const baseX = activeBeam.startX + lineX * t;
            const baseY = activeBeam.startY + lineY * t;
            const offset = (Math.random() - 0.5) * 22;
            const forwardSpeed = 16 + Math.random() * 26;
            const lateralSpeed = (Math.random() - 0.5) * 30;

            next.push({
              id: particleIdRef.current++,
              x: baseX + perpX * offset,
              y: baseY + perpY * offset,
              vx: dirX * forwardSpeed + perpX * lateralSpeed,
              vy: dirY * forwardSpeed + perpY * lateralSpeed,
              life: 0,
              ttl: 0.85 + Math.random() * 1.15,
              size: 1.2 + Math.random() * 1.5
            });
          }
        }

        if (next.length > 64) {
          next = next.slice(next.length - 64);
        }

        return next;
      });

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    let rafId = 0;
    const syncBeam = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateBeam();
        updateTetherState();
      });
    };

    window.addEventListener("scroll", syncBeam, { passive: true });
    window.addEventListener("resize", syncBeam);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", syncBeam);
      window.removeEventListener("resize", syncBeam);
    };
  }, [updateBeam, updateTetherState]);

  useEffect(() => {
    let rafId = 0;
    let lastBeamAt = 0;
    let lastTetherAt = 0;

    const step = (now: number) => {
      // Keep endpoint updates visually smooth without forcing heavy work every frame.
      if (now - lastBeamAt >= 33) {
        updateBeam();
        lastBeamAt = now;
      }

      // Guarantee fallback tether refresh at least every 0.5s when idle.
      if (now - lastTetherAt >= 500) {
        updateTetherState();
        lastTetherAt = now;
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [updateBeam, updateTetherState]);

  useEffect(() => {
    return () => {
      if (tetherAnimationRef.current) {
        cancelAnimationFrame(tetherAnimationRef.current);
      }
    };
  }, []);

  const activeSide = connectedSlug ? projectMetaBySlug.get(connectedSlug)?.side ?? null : null;

  return (
    <section id="selected-projects" className="bg-editorial-rhythm relative border-b border-line/60 py-20 md:py-28">
      <Container>
        <Reveal>
          <header className="mb-10 space-y-3 md:mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Selected Projects</p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-textMain md:text-5xl">
              Systems & Gameplay Projects
            </h2>
          </header>
        </Reveal>

        <div className="relative mt-8 pb-16 lg:pb-28">
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute left-[7%] top-[30%] h-40 w-40 rounded-full bg-accent/10 blur-[90px]" />
            <div className="absolute right-[8%] top-[58%] h-44 w-44 rounded-full bg-[#5f8dad]/15 blur-[95px]" />
          </div>

          <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(640px,40vw)_minmax(0,1fr)] lg:gap-x-2 lg:gap-y-14">
            {selectedProjects.map((project, index) => (
              <Reveal
                key={project.slug}
                delay={0.03 * ((index % 6) + 1)}
                y={20}
                className={index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-3"}
              >
                {(() => {
                  const isActive = selectedSlug === project.slug;
                  const isDimmed = activeHoverSlug ? activeHoverSlug !== project.slug : false;
                  const outerShiftClass =
                    index % 2 === 0
                      ? index % 4 === 0
                        ? "lg:-ml-40"
                        : "lg:-ml-32"
                      : index % 4 === 1
                        ? "lg:-mr-40"
                        : "lg:-mr-32";
                  const sizeClass = index % 3 === 0 ? "lg:max-w-[640px]" : index % 3 === 1 ? "lg:max-w-[620px]" : "lg:max-w-[600px]";

                  return (
                <div
                  className={`flex ${index % 2 === 0 ? "justify-start lg:justify-self-start" : "justify-end lg:justify-self-end"} ${outerShiftClass}`}
                >
                  <motion.div
                    ref={(node) => {
                      cardRefs.current[project.slug] = node;
                    }}
                    onPointerEnter={() => hoverProject(project.slug)}
                    onPointerMove={() => hoverProject(project.slug)}
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
                      whileTap={{ scale: 1.016 }}
                      transition={{ duration: 0.26, ease: "easeOut" }}
                      onClick={() => {
                        selectProject(project.slug);
                      }}
                      onMouseEnter={() => hoverProject(project.slug)}
                      onMouseMove={() => hoverProject(project.slug)}
                      onPointerEnter={() => hoverProject(project.slug)}
                      onPointerMove={() => hoverProject(project.slug)}
                      onFocus={() => hoverProject(project.slug)}
                      onMouseLeave={() => setActiveHoverSlug(null)}
                      className={`group relative cursor-pointer select-none overflow-hidden rounded-2xl bg-panel/76 backdrop-blur-md transition-all duration-300 active:scale-[1.01] ${isDimmed ? "opacity-38 saturate-[0.76]" : "opacity-100"} ${isActive ? "border border-accent/80 shadow-[0_36px_110px_-42px_rgba(98,187,235,0.78)]" : "border border-line/75 shadow-card"}`}
                    >
                      <div className="relative">
                        {project.video ? (
                          <BunnyVideo
                            src={project.video}
                            poster={project.image}
                            title={`${project.title} preview`}
                            className="aspect-[16/10] w-full brightness-[0.93] transition duration-300 group-hover:brightness-[1.04]"
                            preload="metadata"
                            active={activeHoverSlug ? activeHoverSlug === project.slug : isActive}
                          />
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
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            selectProject(project.slug);
                            setPreviewSlug(project.slug);
                          }}
                          className="pointer-events-auto absolute right-3 top-3 inline-flex select-none items-center rounded-md border border-accent/45 bg-[#08192b]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#d8eeff] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100 hover:border-accent hover:text-white"
                        >
                          View Media
                        </button>
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="inline-flex select-none rounded-md border border-white/20 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e0ebf8] backdrop-blur-sm">
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
              key={`${connectedSlug ?? "beam"}-${beam.side}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="project-connection-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(98,187,235,0.14)" />
                  <stop offset="50%" stopColor="rgba(146,220,255,0.72)" />
                  <stop offset="100%" stopColor="rgba(98,187,235,0.18)" />
                </linearGradient>
                <filter id="project-connection-glow" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="3.4" />
                </filter>
              </defs>
              <motion.path
                d={`M ${beam.startX} ${beam.startY} C ${(beam.startX + beam.endX) / 2} ${beam.startY - 8}, ${(beam.startX + beam.endX) / 2} ${beam.endY + 8}, ${beam.endX} ${beam.endY}`}
                stroke="url(#project-connection-gradient)"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
                filter="url(#project-connection-glow)"
                initial={{ pathLength: 0.1, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0.1, opacity: 0 }}
                transition={{ duration: 0.34, ease: "easeInOut" }}
              />
              <motion.path
                d={`M ${beam.startX + (beam.side === "left" ? -22 : 22)} ${beam.startY + 14} C ${(beam.startX + beam.endX) / 2} ${beam.startY + 20}, ${(beam.startX + beam.endX) / 2} ${beam.endY - 22}, ${beam.endX + (beam.side === "left" ? 12 : -12)} ${beam.endY - 14}`}
                stroke="rgba(142, 212, 250, 0.64)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.74 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              />
              <motion.path
                d={`M ${beam.startX + (beam.side === "left" ? -12 : 12)} ${beam.startY - 10} C ${(beam.startX + beam.endX) / 2} ${beam.startY - 18}, ${(beam.startX + beam.endX) / 2} ${beam.endY + 16}, ${beam.endX + (beam.side === "left" ? 8 : -8)} ${beam.endY + 9}`}
                stroke="rgba(188, 235, 255, 0.46)"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.62 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              />
              {globalParticles.map((particle) => {
                const lifeProgress = particle.life / particle.ttl;
                const fade = Math.max(0, 1 - lifeProgress);
                return (
                  <circle
                    key={particle.id}
                    cx={particle.x}
                    cy={particle.y}
                    r={particle.size * (0.52 + fade * 0.48)}
                    fill="rgba(162,226,255,0.85)"
                    fillOpacity={0.16 + fade * 0.54}
                  />
                );
              })}
            </motion.svg>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {tetherState ? (
          <motion.article
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="pointer-events-none fixed z-40 hidden w-[440px] overflow-hidden rounded-2xl border border-accent/45 bg-panel/78 shadow-[0_28px_80px_-40px_rgba(98,187,235,0.6)] backdrop-blur-md lg:block"
            style={{ left: tetherState.x, top: tetherState.y }}
            aria-hidden
          >
            <div className="relative">
              {tetherProject.video ? (
                <BunnyVideo
                  src={tetherProject.video}
                  poster={tetherProject.image}
                  title={`${tetherProject.title} preview`}
                  className="aspect-[16/10] w-full brightness-[0.95]"
                  preload="metadata"
                  active
                />
              ) : (
                <img src={tetherProject.image} alt={tetherProject.title} className="aspect-[16/10] w-full object-cover" loading="eager" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="inline-flex select-none rounded-md border border-white/20 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#e0ebf8] backdrop-blur-sm">
                  {tetherProject.title}
                </p>
              </div>
            </div>
          </motion.article>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {previewProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/68 px-5 backdrop-blur-sm"
            onClick={() => setPreviewSlug(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="relative w-[min(1100px,94vw)] overflow-hidden rounded-2xl border border-white/20 bg-[#08111c]/95 shadow-[0_36px_120px_-46px_rgba(0,0,0,0.98)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPreviewSlug(null)}
                className="absolute right-3 top-3 z-10 inline-flex cursor-pointer select-none rounded-md border border-white/25 bg-black/55 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#d7e9fa] transition hover:border-accent/65 hover:text-white"
              >
                Close
              </button>

              <div className="relative">
                {previewProject.video ? (
                  <BunnyVideo
                    src={previewProject.video}
                    poster={previewProject.image}
                    title={`${previewProject.title} expanded preview`}
                    className="aspect-video w-full"
                    controls
                    autoPlay
                    muted
                    loop
                    preload="metadata"
                    priority
                    active
                  />
                ) : (
                  <img src={previewProject.image} alt={previewProject.title} className="aspect-video w-full object-cover" loading="eager" />
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/76 via-black/18 to-transparent px-5 pb-4 pt-12">
                  <p className="select-none text-sm font-semibold uppercase tracking-[0.16em] text-[#deedfb]">{previewProject.title}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-x-0 top-1/2 z-30 hidden -translate-y-[18%] justify-center lg:flex">
        <motion.aside
          ref={panelRef}
          initial={false}
          layout
          animate={{
            opacity: 1,
            scale: 1,
            y: tetherState ? (tetherState.direction === "above" ? 132 : -228) : 0,
            x: 0
          }}
          transition={{
            duration: 0.24,
            ease: "easeOut",
            layout: { type: "spring", stiffness: 150, damping: 24, mass: 0.72 }
          }}
          className={`relative w-[min(600px,84vw)] min-h-[320px] overflow-hidden rounded-2xl border bg-[#0a111b]/86 p-5 shadow-[0_25px_70px_-35px_rgba(0,0,0,0.95)] backdrop-blur-md transition-colors duration-300 ${connectedSlug ? "border-accent/45" : "border-accent/30"}`}
        >
          <motion.div
            aria-hidden
            animate={{ opacity: connectedSlug ? 1 : 0.45 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`pointer-events-none absolute inset-y-5 w-[3px] rounded-full bg-gradient-to-b from-accent/15 via-accent/70 to-accent/15 ${activeSide === "right" ? "right-0" : "left-0"}`}
          />
          <motion.div
            layout
            transition={{ layout: { type: "spring", stiffness: 155, damping: 25, mass: 0.75 } }}
          >
            <p className="select-none text-[10px] font-medium uppercase tracking-[0.18em] text-accent/90">Focused Project</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-textMain">{focusedProject.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-textMuted">{focusedProject.shortSummary}</p>

            <ul className="mt-3 space-y-1.5 text-sm text-[#d8e6f7]">
              {focusedProject.compactBullets.slice(0, 2).map((bullet) => (
                <li key={bullet}>- {bullet}</li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.13em] text-[#c4d6ec]">
              {focusedProject.tags.slice(0, 4).map((tag) => (
                <span key={`${focusedProject.slug}-${tag}`} className="select-none rounded-md border border-line/80 bg-panel/80 px-2 py-1">
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
        </motion.aside>
      </div>
    </section>
  );
}
