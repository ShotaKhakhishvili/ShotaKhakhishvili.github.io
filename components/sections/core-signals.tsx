import { coreSignals } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SignalPill } from "@/components/ui/signal-pill";

export function CoreSignalsSection() {
  return (
    <section id="core-signals" className="border-b border-line/60 py-16 md:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            label="Core Signals"
            title="Execution Signals"
            description="Short, technical indicators of how systems are built and shipped."
          />
        </Reveal>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {coreSignals.map((signal, index) => (
            <Reveal
              key={signal.title}
              delay={0.03 * (index + 1)}
              className="h-full"
            >
              <SignalPill title={signal.title} text={signal.text} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
