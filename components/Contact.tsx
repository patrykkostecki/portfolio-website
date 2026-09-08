"use client";

import { motion } from "framer-motion";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

import { profile } from "@/data/profile";
import type { Messages } from "@/lib/i18n";

type ContactProps = {
  messages: Messages;
};

export function Contact({ messages }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`pk.dev — ${form.name || "nowy projekt"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

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

          <form onSubmit={submit} className="flex flex-col gap-3">
            <input
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder={messages.contact.form.name}
              className="glass rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-[var(--text-dim)]/70 outline-none transition focus:border-[rgba(56,182,255,0.5)]"
            />
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder={messages.contact.form.email}
              className="glass rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-[var(--text-dim)]/70 outline-none transition focus:border-[rgba(56,182,255,0.5)]"
            />
            <textarea
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder={messages.contact.form.message}
              rows={5}
              required
              className="glass resize-none rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-[var(--text-dim)]/70 outline-none transition focus:border-[rgba(56,182,255,0.5)]"
            />
            <button type="submit" className="btn-grad mt-1 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white">
              {messages.contact.form.submit}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
