import { NextResponse } from "next/server";
import { Resend } from "resend";

import { profile } from "@/data/profile";

export const runtime = "nodejs";

const MAX = { name: 100, email: 200, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { name?: unknown; email?: unknown; message?: unknown; company?: unknown };

function str(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // honeypot: real users never see this field
  if (str(payload.company, 50)) return NextResponse.json({ ok: true });

  const name = str(payload.name, MAX.name);
  const email = str(payload.email, MAX.email);
  const message = str(payload.message, MAX.message);

  if (message.length < 10) {
    return NextResponse.json({ ok: false, error: "message_too_short" }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "bad_email" }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "pk.dev <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? profile.email,
    replyTo: email || undefined,
    subject: `pk.dev — ${name || "nowa wiadomość"}`,
    text: [message, "", "—", name || "(bez imienia)", email || "(bez e-maila)"].join("\n"),
  });

  if (error) {
    console.error("[contact] resend error", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
