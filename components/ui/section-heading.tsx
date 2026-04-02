interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <header className="mb-8 space-y-3 md:mb-10">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{label}</p>
      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-textMain md:text-4xl">{title}</h2>
      {description ? <p className="max-w-3xl text-sm text-textMuted md:text-base">{description}</p> : null}
    </header>
  );
}
