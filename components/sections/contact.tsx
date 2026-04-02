import Link from "next/link";

import { contactLinks } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-20">
      <Container>
        <Reveal className="rounded-xl border border-line bg-panel px-6 py-7 shadow-card md:px-8 md:py-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Contact</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-textMain md:text-3xl">
            Open to UE5 C++ gameplay and systems roles.
          </h2>

          <p className="mt-3 text-sm text-textMuted">Fastest path is email. Profiles below.</p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="mailto:shota.khakhishvili@gmail.com"
              className="inline-flex rounded-md border border-accent/60 bg-accentSoft px-4 py-2 font-medium text-textMain transition hover:border-accent hover:text-white"
            >
              shota.khakhishvili@gmail.com
            </Link>
            {contactLinks
              .filter((link) => link.label !== "Email")
              .map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-md border border-line bg-panelSoft px-4 py-2 font-medium text-textMain transition hover:border-accent/60 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
