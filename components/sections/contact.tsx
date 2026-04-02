import Link from "next/link";

import { contactLinks } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function ContactSection() {
  return (
    <section id="contact" className="py-14 md:py-16">
      <Container className="flex justify-center">
        <Reveal className="w-full rounded-xl border border-line/80 bg-panel/90 px-5 py-6 shadow-card md:px-7 md:py-7 lg:max-w-3xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-accent/90">Contact</p>
          <h2 className="mt-2 max-w-3xl text-xl font-semibold tracking-tight text-textMain md:text-2xl">
            Open to UE5 gameplay and systems programming roles.
          </h2>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 text-sm">
            {contactLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel={link.label === "Email" ? undefined : "noreferrer"}
                className={
                  index === 0
                    ? "inline-flex rounded-md border border-accent/60 bg-accentSoft px-3.5 py-2 font-medium text-textMain transition hover:border-accent hover:text-white"
                    : "inline-flex rounded-md border border-line/80 bg-panelSoft/50 px-3.5 py-2 font-medium text-textMain transition hover:border-accent/60 hover:text-white"
                }
              >
                {link.label === "Email" ? "Email" : link.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
