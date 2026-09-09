"use client";

import { Check, Copy, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";

import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { profile } from "@/data/profile";
import type { Messages } from "@/lib/i18n";

type ContactProps = {
  messages: Messages;
};

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY = { name: "", email: "", message: "", company: "" };

export function Contact({ messages }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const fallbackHref = `mailto:${profile.email}?subject=${encodeURIComponent(`pk.dev — ${form.name || "nowy projekt"}`)}&body=${encodeURIComponent(form.message)}`;

  const field =
    "w-full border-b border-[var(--line-strong)] bg-transparent px-0 py-3.5 text-base text-white placeholder:text-[var(--text-dim)]/70 outline-none transition-colors focus:border-[var(--sky)] disabled:opacity-60";

  return (
    <section id="contact" className="relative scroll-mt-28 px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead index="05" eyebrow={messages.contact.eyebrow} title={messages.contact.title} />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <a
              href={`mailto:${profile.email}`}
              className="display link-line inline-block break-all text-[1.6rem] font-extrabold text-white transition-colors hover:text-[var(--sky)] sm:text-4xl lg:text-[2.6rem]"
            >
              {profile.email}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={`mailto:${profile.email}`} className="btn-primary px-6 py-3.5 text-sm">
                  <Mail className="h-4 w-4" />
                  {messages.contact.writeBtn}
                </a>
              </Magnetic>
              <button type="button" onClick={copyEmail} className="btn-ghost px-5 py-3.5 font-mono text-xs">
                {copied ? <Check className="h-4 w-4 text-[var(--sky)]" /> : <Copy className="h-4 w-4" />}
                {copied ? messages.contact.copied : messages.contact.copy}
              </button>
            </div>
            <div className="mt-10 flex gap-6">
              <a href={profile.github} target="_blank" rel="noreferrer" className="link-line inline-flex items-center gap-2 text-sm text-[var(--text-dim)] hover:text-white">
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-line inline-flex items-center gap-2 text-sm text-[var(--text-dim)] hover:text-white">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            {status === "sent" ? (
              <div className="glass flex min-h-[20rem] flex-col items-start justify-center gap-4 rounded-2xl p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--sky)] text-[var(--navy)]">
                  <Check className="h-5 w-5" />
                </span>
                <p className="display text-2xl font-bold">{messages.contact.form.sent}</p>
                <button type="button" onClick={() => setStatus("idle")} className="link-line text-sm text-[var(--text-dim)] hover:text-white">
                  {messages.contact.form.again}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-2">
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder={messages.contact.form.name}
                  autoComplete="name"
                  maxLength={100}
                  disabled={status === "sending"}
                  className={field}
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder={messages.contact.form.email}
                  autoComplete="email"
                  maxLength={200}
                  disabled={status === "sending"}
                  className={field}
                />
                <textarea
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder={messages.contact.form.message}
                  rows={4}
                  required
                  minLength={10}
                  maxLength={5000}
                  disabled={status === "sending"}
                  className={`${field} resize-none`}
                />
                {/* honeypot — hidden from people, filled by bots */}
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={(event) => setForm({ ...form, company: event.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <button type="submit" disabled={status === "sending"} className="btn-primary px-7 py-4 text-sm disabled:cursor-wait disabled:opacity-80">
                      {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      {status === "sending" ? messages.contact.form.sending : messages.contact.form.submit}
                    </button>
                  </Magnetic>
                  <p className="font-mono text-[11px] text-[var(--text-dim)]/80">{messages.footer.note}</p>
                </div>
                {status === "error" && (
                  <p role="alert" className="mt-3 text-sm text-[#ff8a80]">
                    {messages.contact.form.error}{" "}
                    <a href={fallbackHref} className="font-mono text-white underline underline-offset-4">
                      {profile.email}
                    </a>
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
