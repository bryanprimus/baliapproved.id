import { useId, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

export interface SealProps {
  number: number;
  area: string;
  year: number;
  /** Rendered size in pixels. The type scales with it. */
  size?: number;
  className?: string;
}

export function Seal({ number, area, year, size = 168, className }: SealProps) {
  const padded = String(number).padStart(3, "0");
  const ring = `BALI APPROVED · No. ${padded} · ${area.toUpperCase()} · ${year} · `;
  const pathId = `seal-ring-${padded}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <>
      <div
        data-slot="seal"
        className={cn(
          "relative grid size-(--seal-size) place-items-center overflow-hidden rounded-full bg-[color-mix(in_oklch,var(--secondary)_82%,transparent)] shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--secondary-foreground)_28%,transparent)] backdrop-blur-[6px]",
          className,
        )}
        style={{ "--seal-size": `${size}px` } as CSSProperties}
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 size-full animate-seal-turn motion-reduce:animate-none"
          viewBox="0 0 200 200"
        >
          <defs>
            <path
              id={pathId}
              fill="none"
              d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
            />
          </defs>
          <text className="fill-secondary-foreground/80 font-mono text-[11.5px] tracking-[0.055em]">
            <textPath href={`#${pathId}`} startOffset="0">
              {ring}
              {ring}
            </textPath>
          </text>
        </svg>
        <span className="font-features-['lnum'] text-[calc(var(--seal-size)*0.3)] leading-none text-secondary-foreground">
          {padded}
        </span>
      </div>
      <span className="sr-only">
        Approved, entry number {number}, {area}, {year}.
      </span>
    </>
  );
}
