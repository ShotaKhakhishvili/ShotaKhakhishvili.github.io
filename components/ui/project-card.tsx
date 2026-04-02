"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { Project } from "@/data/projects";
import { ProjectVideo } from "@/components/ui/project-video";
import { TechChip } from "@/components/ui/tech-chip";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.62 }}
      className="flex h-full flex-col gap-4 rounded-2xl border border-line/85 bg-panel/90 p-4 shadow-card transition-colors duration-300 hover:border-accent/50 md:p-5"
    >
      <ProjectVideo src={project.video} poster={project.image} title={project.title} videoClassName="aspect-[16/10]" />

      <div className="space-y-3">
        <h3 className="text-xl font-semibold tracking-tight text-textMain">{project.title}</h3>
        <p className="text-sm leading-relaxed text-textMuted">{project.shortSummary}</p>
        <ul className="space-y-2 text-sm text-textMuted">
          {project.compactBullets.slice(0, 2).map((bullet) => (
            <li key={bullet} className="leading-relaxed">
              - {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        {project.tags.slice(0, 3).map((tag) => (
          <TechChip key={tag}>{tag}</TechChip>
        ))}
      </div>

      {project.links.repo ? (
        <Link
          href={project.links.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit text-sm font-medium text-accent transition hover:text-[#87d8ff]"
        >
          View Repository
        </Link>
      ) : null}
    </motion.article>
  );
}
