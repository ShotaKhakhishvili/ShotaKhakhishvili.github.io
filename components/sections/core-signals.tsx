import { coreSignals } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function CoreSignalsSection() {
  return (
    <section id="core-signals" className="border-b border-line/60 py-14 md:py-18">
      <Container className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
        <Reveal>
          <header className="mb-5 space-y-2 lg:sticky lg:top-24 lg:mb-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent/90">Core Signals</p>
            <h2 className="text-lg font-semibold tracking-tight text-textMain md:text-xl">Technical Strength Map</h2>
            <p className="text-[11px] uppercase tracking-[0.16em] text-textMuted">High-signal only</p>
          </header>
        </Reveal>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-2 lg:pl-8">
          {coreSignals.map((signal, index) => (
            <Reveal key={signal.title} delay={0.02 * (index + 1)} className="h-full">
              <article className="rounded-xl border border-line/75 bg-panel/85 px-3.5 py-3 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-accent/35">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-textMain">{signal.title}</h3>
                <p className="mt-1 text-xs leading-snug text-textMuted">{signal.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
