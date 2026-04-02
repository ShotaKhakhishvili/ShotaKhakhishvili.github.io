import { coreSignals } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SignalPill } from "@/components/ui/signal-pill";

export function CoreSignalsSection() {
  return (
    <section id="core-signals" className="border-b border-line/60 py-20 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            label="Core Signals"
            title="Execution Signals"
            description="Architecture quality, runtime discipline, and systems-level delivery signal without filler metrics."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coreSignals.map((signal, index) => (
            <Reveal
              key={signal.title}
              delay={0.04 * (index + 1)}
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
