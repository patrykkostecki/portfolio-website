import type { MouseEvent } from "react";

/** Tracks the cursor inside a `.spot` element so the CSS glow follows it. */
export function spotlight(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
