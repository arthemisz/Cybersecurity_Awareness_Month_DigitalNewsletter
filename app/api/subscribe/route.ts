import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getWeekTemplate } from "@/lib/email-templates";

// ─── RFC 5322 email validation ──────────────────────────────────────────────
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// ─── Resend client (instantiated once per cold start) ───────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── POST /api/subscribe ────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  console.log("──── /api/subscribe HIT ────");

  // ── 0. Environment diagnostics ──────────────────────────────────────────
  const hasApiKey = !!process.env.RESEND_API_KEY;
  const hasAudienceId = !!process.env.RESEND_AUDIENCE_ID;
  console.log(`ENV CHECK → RESEND_API_KEY defined: ${hasApiKey}`);
  console.log(`ENV CHECK → RESEND_AUDIENCE_ID defined: ${hasAudienceId}`);

  // ── 1. Parse body ──────────────────────────────────────────────────────
  const body = await request.json().catch(() => null);

  if (!body || typeof body.email !== "string") {
    console.log("VALIDATION FAIL → missing or non-string email field");
    return NextResponse.json(
      { success: false, error: "Missing required field: email" },
      { status: 400 }
    );
  }

  const email = body.email.trim().toLowerCase();
  console.log(`SUBSCRIBER → ${email}`);

  // ── 2. Validate email against RFC 5322 ─────────────────────────────────
  if (!EMAIL_REGEX.test(email)) {
    console.log(`VALIDATION FAIL → email did not pass RFC 5322 regex: ${email}`);
    return NextResponse.json(
      { success: false, error: "Invalid email address. Please provide a valid RFC 5322 email." },
      { status: 400 }
    );
  }

  // ── 3. Step A — Save subscriber to Resend contacts ─────────────────────
  //    Skipped gracefully if RESEND_AUDIENCE_ID is not set.
  if (hasAudienceId) {
    try {
      const contactResult = await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID!,
        unsubscribed: false,
      });
      console.log("CONTACTS.CREATE → success", JSON.stringify(contactResult));
    } catch (contactErr: unknown) {
      const msg =
        contactErr instanceof Error ? contactErr.message : String(contactErr);
      console.error("CONTACTS.CREATE → FAILED:", msg, contactErr);
      // Non-fatal: continue to send the email even if contact creation fails.
      // The subscriber still gets their dispatch.
    }
  } else {
    console.warn(
      "CONTACTS.CREATE → SKIPPED (RESEND_AUDIENCE_ID is not set). " +
        "Add it to .env.local to save contacts to your Resend audience."
    );
  }

  // ── 4. Step B — Immediately dispatch Week 1 welcome email ──────────────
  //    No scheduledAt, no date gates. Fires right now.
  try {
    const template = getWeekTemplate(1, email);

    const sendResult = await resend.emails.send({
      from: "The Zero Trust Gazette <onboarding@resend.dev>",
      to: [email],
      subject: template.subject,
      html: template.html,
    });

    console.log("EMAILS.SEND → success", JSON.stringify(sendResult));
  } catch (sendErr: unknown) {
    const msg =
      sendErr instanceof Error ? sendErr.message : String(sendErr);
    console.error("EMAILS.SEND → FAILED:", msg, sendErr);
    return NextResponse.json(
      { success: false, error: `Email dispatch failed: ${msg}` },
      { status: 500 }
    );
  }

  // ── 5. Success ─────────────────────────────────────────────────────────
  console.log(`✓ DONE → Week 1 dispatch sent to ${email}`);
  return NextResponse.json({ success: true }, { status: 200 });
}
