"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { FloatingProjectCard } from "@/data/projects";
import { cn } from "@/lib/utils";

interface FloatingProjectLayerProps {
  cards: FloatingProjectCard[];
  className?: string;
}

const cardAnchors = [
  "right-[4%] top-[10%]",
  "right-[15%] top-[45%]",
  "right-[6%] bottom-[9%]",
  "left-[56%] top-[18%]",
  "left-[50%] bottom-[8%]"
] as const;

const layerOrder = [22, 17, 20, 24, 23] as const;

const driftVariants = [
  { x: [-20, 20, -20], y: [-10, 10, -10], duration: 13 },
  { x: [18, -18, 18], y: [9, -9, 9], duration: 15 },
  { x: [-16, 16, -16], y: [8, -8, 8], duration: 12 },
  { x: [14, -14, 14], y: [-10, 10, -10], duration: 16 },
  { x: [-12, 12, -12], y: [10, -10, 10], duration: 14 }
];

export function FloatingProjectLayer({ cards, className }: FloatingProjectLayerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("pointer-events-none absolute inset-0 hidden overflow-hidden lg:block", className)}>
      {cards.slice(0, 5).map((card, index) => (
        <FloatingCard
          key={card.slug}
          card={card}
          index={index}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
}

interface FloatingCardProps {
  card: FloatingProjectCard;
  index: number;
  prefersReducedMotion: boolean | null;
}

function FloatingCard({ card, index, prefersReducedMotion }: FloatingCardProps) {
  const drift = driftVariants[index % driftVariants.length];
  const enterX = index % 2 === 0 ? 32 : -30;
  const enterY = index % 3 === 0 ? -20 : 20;

  return (
    <motion.div
      initial={{ opacity: 0, x: enterX, y: enterY, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{
        duration: 0.58,
        ease: "easeOut",
        delay: 0.08 + index * 0.07
      }}
      className={cn(
        "absolute w-[240px]",
        cardAnchors[index % cardAnchors.length]
      )}
      style={{ zIndex: layerOrder[index % layerOrder.length] }}
    >
      <motion.article
        animate={
          prefersReducedMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: drift.x,
                y: drift.y,
                scale: [1, 1.012, 0.996, 1]
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.2 }
            : {
                x: { duration: drift.duration, repeat: Infinity, ease: "linear" },
                y: { duration: drift.duration + 2, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: drift.duration + 1, repeat: Infinity, ease: "easeInOut" }
              }
        }
        className="transform-gpu will-change-transform overflow-hidden rounded-2xl border border-white/20 bg-[#0f1725]/50 shadow-[0_24px_55px_-40px_rgba(0,0,0,0.95)] backdrop-blur-md"
        style={{ transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
      >
        <div className="relative">
          {card.video ? (
            <video
              className="h-[138px] w-full object-cover saturate-110"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={card.image}
              aria-label={`${card.title} preview`}
            >
              <source src={card.video} type="video/mp4" />
            </video>
          ) : (
            <img src={card.image} alt={card.title} className="h-[138px] w-full object-cover" loading="lazy" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        </div>
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#dce8f8]/92">{card.title}</p>
      </motion.article>
    </motion.div>
  );
}
