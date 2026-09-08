import type { Messages } from "@/lib/i18n";

type TickerProps = {
  messages: Messages;
};

export function Ticker({ messages }: TickerProps) {
  const items = messages.ticker;
  const row = (key: string, ariaHidden: boolean) => (
    <div key={key} aria-hidden={ariaHidden} className="marquee-track">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.25em] text-white/35 transition-colors hover:text-white/70">
            {item}
          </span>
          <span className="grad-text text-base">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee relative -mt-2 border-y border-white/5 py-5">
      {row("a", false)}
      {row("b", true)}
    </div>
  );
}
