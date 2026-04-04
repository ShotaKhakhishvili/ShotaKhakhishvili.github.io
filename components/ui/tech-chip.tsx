import type { ReactNode } from "react";

interface TechChipProps {
  children: ReactNode;
}

export function TechChip({ children }: TechChipProps) {
  return (
    <span className="inline-flex select-none rounded-full border border-line bg-panelSoft px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-textMuted">
      {children}
    </span>
  );
}
