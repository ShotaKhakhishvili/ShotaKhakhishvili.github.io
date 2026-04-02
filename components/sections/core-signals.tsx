import { coreSignals } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function CoreSignalsSection() {
  return (
    <section id="core-signals" className="border-b border-line/60 py-16 md:py-20">
      <Container>
        <Reveal>
          <header className="mb-6 space-y-2 md:mb-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent/90">Core Signals</p>
            <h2 className="text-2xl font-semibold tracking-tight text-textMain md:text-3xl">Technical Focus</h2>
          </header>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coreSignals.map((signal, index) => (
            <Reveal key={signal.title} delay={0.02 * (index + 1)} className="h-full">
              <article className="rounded-xl border border-line/75 bg-panel/85 px-4 py-3 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-accent/35">
                <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-textMain">{signal.title}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
