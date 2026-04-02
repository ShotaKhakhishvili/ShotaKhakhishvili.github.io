"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import type { Project } from "@/data/projects";
import { MOTION_DURATION_REVEAL, MOTION_EASE_STANDARD } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ProjectVideo } from "@/components/ui/project-video";
import { TechChip } from "@/components/ui/tech-chip";

type BlockWidth = "standard" | "wide";
type BlockAlign = "start" | "end";
type BlockEnter = "left" | "right";

interface AlternatingProjectBlockProps {
  project: Project;
  enterFrom: BlockEnter;
  width?: BlockWidth;
  align?: BlockAlign;
  offset?: boolean;
  showBullets?: boolean;
  isActive?: boolean;
  delay?: number;
  className?: string;
  cardClassName?: string;
}

const widthClasses: Record<BlockWidth, string> = {
  standard: "md:w-[64%] xl:w-[56%]",
  wide: "md:w-[82%] xl:w-[74%]"
};

export function AlternatingProjectBlock({
  project,
  enterFrom,
  width = "standard",
  align = "start",
  offset = false,
  showBullets = false,
  isActive = false,
  delay = 0,
  className,
  cardClassName
}: AlternatingProjectBlockProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("flex", align === "start" ? "md:justify-start" : "md:justify-end", offset ? "md:mt-8" : "", className)}>
      <motion.article
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: enterFrom === "left" ? -48 : 48, y: 10 }}
        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.32 }}
        transition={{ duration: MOTION_DURATION_REVEAL, ease: MOTION_EASE_STANDARD, delay }}
        whileHover={prefersReducedMotion ? undefined : { y: -3 }}
        className={cn(
          "w-full rounded-2xl border border-line/80 bg-panel/90 p-4 shadow-card transition-all duration-300 will-change-transform md:p-5",
          widthClasses[width],
          isActive ? "scale-[1.012] opacity-100 ring-1 ring-accent/20" : "opacity-62 hover:opacity-80",
          cardClassName
        )}
      >
        <ProjectVideo
          src={project.presentation.mediaType === "video" ? project.video : undefined}
          poster={project.image}
          title={project.title}
          className="border-line/70"
        />

        <div className="mt-4 space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-textMain md:text-2xl">{project.title}</h3>
          <p className="max-w-2xl text-sm leading-relaxed text-textMuted/95">{project.shortSummary}</p>

          {showBullets && project.compactBullets.length > 0 ? (
            <ul className="space-y-1.5 text-xs text-textMuted/90 md:text-sm">
              {project.compactBullets.slice(0, 2).map((bullet) => (
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
}
