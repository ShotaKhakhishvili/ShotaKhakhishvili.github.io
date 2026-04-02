import { selectedProjects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function SelectedProjectsSection() {
  return (
    <section id="selected-projects" className="border-b border-line/60 py-20 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            label="Selected Projects"
            title="Shipped Runtime Systems"
            description="Curated UE5/C++ engineering work across plugin architecture, custom runtime systems, and simulation-grade gameplay behavior."
          />
        </Reveal>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {selectedProjects.map((project, index) => (
            <Reveal key={project.slug} delay={0.05 * (index + 1)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
