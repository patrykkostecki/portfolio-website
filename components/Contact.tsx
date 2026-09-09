"use client";

import { motion } from "framer-motion";
import { Check, Copy, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";

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
    "glass rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-[var(--text-dim)]/70 outline-none transition focus:border-[rgba(56,182,255,0.5)] disabled:opacity-60";

  return (
    <section id="contact" className="relative scroll-mt-28 px-4 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-deep grad-border relative mx-auto max-w-4xl rounded-[2.25rem] p-8 sm:p-12"
      >
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--sky)]">
              {messages.contact.eyebrow}
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
              {messages.contact.title}
            </h2>
            <p className="mt-4 text-[var(--text-dim)]">{messages.contact.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="btn-grad inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
              >
                <Mail className="h-4 w-4" />
                {messages.contact.writeBtn}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="glass glass-hover inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-mono text-xs text-[var(--text-dim)] hover:text-white"
              >
                {copied ? <Check className="h-4 w-4 text-[var(--sky)]" /> : <Copy className="h-4 w-4" />}
                {copied ? messages.contact.copied : profile.email}
              </button>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-dim)] hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-dim)] hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {status === "sent" ? (
            <div className="glass flex min-h-[18rem] flex-col items-center justify-center gap-4 rounded-[1.75rem] p-8 text-center">
              <span className="grad-border flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
                <Check className="h-6 w-6 text-[#3ad08f]" />
              </span>
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold">{messages.contact.form.sent}</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-sm text-[var(--text-dim)] underline-offset-4 transition hover:text-white hover:underline"
              >
                {messages.contact.form.again}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3">
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
                rows={5}
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
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-grad mt-1 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-80"
              >
                {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {status === "sending" ? messages.contact.form.sending : messages.contact.form.submit}
              </button>
              {status === "error" && (
                <p role="alert" className="text-sm text-[#ff8a80]">
                  {messages.contact.form.error}{" "}
                  <a href={fallbackHref} className="font-mono text-white underline underline-offset-4">
                    {profile.email}
                  </a>
                </p>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
