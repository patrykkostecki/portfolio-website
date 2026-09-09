import { skills } from "@/data/profile";
import type { Messages } from "@/lib/i18n";

type TickerProps = {
  messages: Messages;
};

/** Real stack, in mono, separated by slashes — no sparkles. */
export function Ticker({ messages }: TickerProps) {
  const items = [...messages.ticker, ...skills.flatMap((c) => c.items.map((s) => s.label))];
  const row = (key: string, ariaHidden: boolean) => (
    <div key={key} aria-hidden={ariaHidden} className="marquee-track">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-12">
          <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white">
            {item}
          </span>
          <span className="text-white/20">/</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee relative border-y border-[var(--line)] py-4">
      {row("a", false)}
      {row("b", true)}
    </div>
  );
}
