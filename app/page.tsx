import Link from "next/link";

import { ContactSection } from "@/components/sections/contact";
import { CoreSignalsSection } from "@/components/sections/core-signals";
import { FeaturedProjectSection } from "@/components/sections/featured-project";
import { HeroSection } from "@/components/sections/hero";
import { SelectedProjectsSection } from "@/components/sections/selected-projects";
import { Container } from "@/components/ui/container";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#featured-project", label: "Featured" },
  { href: "#selected-projects", label: "Projects" },
  { href: "#core-signals", label: "Signals" },
  { href: "#contact", label: "Contact" }
] as const;

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/40 bg-bg/72 backdrop-blur-sm">
        <Container className="flex h-12 items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-textMuted">
            Shota Khakhishvili | UE5 C++ Systems
          </p>
          <nav aria-label="Section navigation" className="hidden items-center gap-4 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.12em] text-textMuted transition hover:text-textMain"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="#selected-projects"
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-textMuted transition hover:text-textMain"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-textMuted transition hover:text-textMain"
            >
              Contact
            </Link>
          </div>
        </Container>
      </header>

      <main>
        <HeroSection />
        <FeaturedProjectSection />
        <SelectedProjectsSection />
        <CoreSignalsSection />
        <ContactSection />
      </main>
    </>
  );
}
