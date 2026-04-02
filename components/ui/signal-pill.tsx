interface SignalPillProps {
  title: string;
  text: string;
}

export function SignalPill({ title, text }: SignalPillProps) {
  return (
    <article className="rounded-lg border border-line bg-panel p-4 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-accent/35">
      <h3 className="text-base font-semibold text-textMain">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-textMuted">{text}</p>
    </article>
  );
}
