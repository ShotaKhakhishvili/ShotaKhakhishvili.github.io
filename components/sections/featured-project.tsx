import Link from "next/link";

import { featuredProject } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { ProjectVideo } from "@/components/ui/project-video";
import { Reveal } from "@/components/ui/reveal";
import { TechChip } from "@/components/ui/tech-chip";

export function FeaturedProjectSection() {
  return (
    <section id="featured-project" className="border-b border-line/60 py-24 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <Reveal className="space-y-6 lg:pt-2">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Featured Project</p>
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-textMain md:text-5xl">
                {featuredProject.title}
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-textMuted md:text-base">
                {featuredProject.summary}
              </p>
            </div>

            <ul className="space-y-3 text-sm leading-relaxed text-textMuted">
              {featuredProject.bullets.map((bullet) => (
                <li key={bullet} className="leading-relaxed">
                  - {bullet}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {featuredProject.tags.map((tag) => (
                <TechChip key={tag}>{tag}</TechChip>
              ))}
            </div>

            {featuredProject.links.repo ? (
              <Link
                href={featuredProject.links.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit text-sm font-medium text-accent transition hover:text-[#87d8ff]"
              >
                Open Project Repository
              </Link>
            ) : null}
          </Reveal>

          <Reveal delay={0.06} className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-line/85 bg-panel/90 p-2 shadow-card">
              <ProjectVideo
                src={featuredProject.video}
                poster={featuredProject.image}
                title={featuredProject.title}
                className="rounded-xl border border-line/80"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
