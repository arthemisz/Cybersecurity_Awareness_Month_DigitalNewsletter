import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── RFC 5322 email validation ──────────────────────────────────────────────
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// ─── Resend client (lazy — instantiated once per cold start) ────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Week 1 dispatch HTML template ─────────────────────────────────────────
function buildWeek1Html(email: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Week 1 Dispatch — Identity &amp; Passkeys</title>
</head>
<body style="margin:0;padding:0;background-color:#0c0d0e;font-family:'Courier New',Courier,monospace;color:#d4d4d4;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0c0d0e;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Inner card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#141516;border:1px solid #2a2a2d;border-radius:8px;overflow:hidden;">

          <!-- Header band -->
          <tr>
            <td style="background-color:#1a1a1d;padding:24px 32px;border-bottom:1px solid #2a2a2d;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:11px;font-weight:700;letter-spacing:0.12em;color:#f5a623;text-transform:uppercase;">&#9632; THE ZERO TRUST GAZETTE</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:#666;letter-spacing:0.05em;">DISPATCH 01 / 04</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Amber accent bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#f5a623 0%,#e8890c 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Classification badge -->
          <tr>
            <td style="padding:28px 32px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#f5a623;color:#0c0d0e;font-size:10px;font-weight:700;letter-spacing:0.14em;padding:4px 10px;border-radius:3px;text-transform:uppercase;">
                    CONFIRMED — WEEK 1 ACTIVE
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:20px 32px 0;">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;line-height:1.25;color:#f0f0f0;letter-spacing:-0.01em;">
                Identity &amp; Passkeys
              </h1>
              <p style="margin:10px 0 0;font-size:13px;line-height:1.65;color:#888;">
                Week 1 of Cybersecurity Awareness Month 2026<br />
                Eliminating static credentials from the attack surface.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:24px 32px 0;">
              <div style="height:1px;background-color:#2a2a2d;"></div>
            </td>
          </tr>

          <!-- Body content -->
          <tr>
            <td style="padding:24px 32px;">
              <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#c8c8c8;">
                <span style="color:#f5a623;font-weight:700;">OPERATIVE:</span> You've been enrolled in the October 2026 campaign.<br />
                Your first mission brief is below.
              </p>

              <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#c8c8c8;">
                A passkey is a cryptographic keypair generated and stored inside your device's secure hardware enclave — the private key <em>never</em> leaves the chip. It cannot be phished, credential-stuffed, or sprayed. It collapses the single largest attack surface in enterprise security to near zero.
              </p>

              <!-- Stat block -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1a1a1d;border:1px solid #2a2a2d;border-radius:6px;margin:20px 0;">
                <tr>
                  <td style="padding:20px 24px;">
                    <div style="font-size:32px;font-weight:700;color:#f5a623;letter-spacing:-0.03em;line-height:1;">99.9%</div>
                    <div style="margin-top:6px;font-size:12px;color:#888;line-height:1.5;">of automated credential attacks are stopped by hardware-bound passkeys.</div>
                  </td>
                </tr>
              </table>

              <!-- Checklist -->
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#666;text-transform:uppercase;">
                THIS WEEK'S ACTIONS
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #1e1e21;font-size:13px;color:#c8c8c8;">
                    <span style="color:#f5a623;margin-right:8px;">&#9656;</span>
                    Register a passkey for your primary work account
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #1e1e21;font-size:13px;color:#c8c8c8;">
                    <span style="color:#f5a623;margin-right:8px;">&#9656;</span>
                    Remove duplicate and reused passwords from your vault
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #1e1e21;font-size:13px;color:#c8c8c8;">
                    <span style="color:#f5a623;margin-right:8px;">&#9656;</span>
                    Disable SMS fallback on accounts that support it
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:13px;color:#c8c8c8;">
                    <span style="color:#f5a623;margin-right:8px;">&#9656;</span>
                    Order a backup FIDO2 key and store it off-site
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <div style="height:1px;background-color:#2a2a2d;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 32px;">
              <p style="margin:0 0 8px;font-size:11px;color:#555;letter-spacing:0.04em;">
                <span style="color:#f5a623;">&#9632;</span> This dispatch was sent to <span style="color:#888;">${email}</span>
              </p>
              <p style="margin:0;font-size:11px;color:#444;line-height:1.6;">
                The Zero Trust Gazette &middot; Sec Dispatch 2026<br />
                Cybersecurity Awareness Month &middot; Free &middot; No tracking<br />
                Next dispatch: Week 2 — Social Engineering &amp; AI Deception
              </p>
            </td>
          </tr>

        </table>
        <!-- /Inner card -->

      </td>
    </tr>
  </table>
  <!-- /Outer wrapper -->

</body>
</html>`.trim();
}

// ─── POST handler ───────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // 1. Parse body
    const body = await request.json().catch(() => null);

    if (!body || typeof body.email !== "string") {
      return NextResponse.json(
        { error: "Missing required field: email" },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();

    // 2. Validate email against RFC 5322
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address. Please provide a valid RFC 5322 email." },
        { status: 400 }
      );
    }

    // 3. Step A — Save subscriber to Resend contacts / audience
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID ?? "",
    });

    // 4. Step B — Dispatch Week 1 welcome email
    const { error: sendError } = await resend.emails.send({
      from: "The Zero Trust Gazette <onboarding@resend.dev>",
      to: [email],
      subject: "[CONFIRMED] Week 1 Dispatch: Identity & Passkeys",
      html: buildWeek1Html(email),
    });

    if (sendError) {
      return NextResponse.json(
        { error: "Failed to send welcome dispatch. Please try again." },
        { status: 500 }
      );
    }

    // 5. Success
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (_err: unknown) {
    // Never reflect internal details or API keys
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
