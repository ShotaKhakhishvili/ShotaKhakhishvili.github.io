import Link from "next/link";

import { featuredProject } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { ProjectVideo } from "@/components/ui/project-video";
import { Reveal } from "@/components/ui/reveal";

export function FeaturedProjectSection() {
  return (
    <section id="featured-project" className="relative border-b border-line/60 py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
        <Reveal className="space-y-5" y={20}>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Featured System</p>
          <h2 className="text-3xl font-semibold tracking-tight text-textMain md:text-5xl">{featuredProject.title}</h2>
          <p className="max-w-xl text-base leading-relaxed text-textMuted">{featuredProject.shortSummary}</p>

          <ul className="space-y-2.5">
            {featuredProject.compactBullets.slice(0, 3).map((bullet) => (
              <li key={bullet} className="rounded-lg border border-line/70 bg-panel/75 px-3.5 py-2 text-sm text-[#d7e4f5]">
                {bullet}
              </li>
            ))}
          </ul>

          {featuredProject.links.repo ? (
            <Link
              href={featuredProject.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit rounded-md border border-accent/65 bg-accentSoft/70 px-4 py-2 text-sm font-medium text-textMain transition hover:-translate-y-0.5 hover:border-accent"
            >
              Open Repository
            </Link>
          ) : null}
        </Reveal>

        <Reveal delay={0.08} y={20}>
          <ProjectVideo
            src={featuredProject.video}
            poster={featuredProject.image}
            title={`${featuredProject.title} deep highlight`}
            priority
            className="rounded-2xl border border-line/75 bg-panel/80"
            videoClassName="aspect-[16/9]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
