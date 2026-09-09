import { Reveal } from "@/components/motion/Reveal";

type SectionHeadProps = {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
};

/** Left-aligned editorial header: "01 — Eyebrow", big title, hairline. */
export function SectionHead({ index, eyebrow, title, subtitle }: SectionHeadProps) {
  return (
    <Reveal className="grid gap-6 border-t border-[var(--line)] pt-8 md:grid-cols-[10rem_1fr] md:gap-10">
      <p className="eyebrow flex items-baseline gap-3">
        <span className="text-white/40">{index}</span>
        <span>{eyebrow}</span>
      </p>
      <div className="max-w-2xl">
        <h2 className="display text-4xl font-extrabold sm:text-5xl">{title}</h2>
        {subtitle && <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-dim)] sm:text-lg">{subtitle}</p>}
      </div>
    </Reveal>
  );
}
