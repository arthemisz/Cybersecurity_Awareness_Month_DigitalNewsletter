# SEC_DISPATCH // 2026 — Cybersecurity Awareness Hub

> **Defending at Machine Speed: Cryptography, Resilience & Zero-Trust**  
> Official 4-Week Campaign Delivery Hub for Cybersecurity Awareness Month (October 2026).

---

## ✦ Design DNA & Aesthetic Target (Godly.website Inspired)
This web application is engineered with the exact aesthetic principles of **Godly.website**:
- **Palette**: Deep slate-dark foundation (`#0A0A0C`), card surfaces (`#111215`), micro 1px hairline borders (`rgba(255, 255, 255, 0.08)` / `border-neutral-800/80`), subtle ambient radial glow highlights (cyan, emerald, amber), and frosted glass blur.
- **Light / Dark Mode**: Full dual-theme support. Dark mode delivers a sleek obsidian cyber aesthetic; light mode delivers a crisp Swiss-inspired paper/stone aesthetic with ink-dark typography and subtle hairline rules.
- **Typography**: Clean sans headers paired with high-precision monospace metadata tags (`[SYS_ALERT]`, `[READ // 4 MIN]`, `[WEEK 01 // PASSKEYS]`).
- **Floating Week Dock**: Frosted glass floating pill anchored at the bottom-center of the viewport (`backdrop-blur-2xl bg-neutral-950/85`) with live indicators for active, completed, and upcoming campaign milestones.
- **Micro-Interactions**: Tactile card lifts, interactive hardware/voice simulators, live RFC 5322 header inspection, persisted checklists with celebration confetti, and an instant search command palette (`⌘K`).

---

## ✦ 4-Week Campaign Architecture

| Week | Focus Area | Core Intelligence Theme | Interactive Simulator |
| :--- | :--- | :--- | :--- |
| **Week 1** | **Identity & Authentication** | Eliminating static passwords, FIDO2 tokens, passkeys, and vault hygiene | **Passkey & FIDO2 Readiness Checker** (WebAuthn API detection & simulated biometric TPM anchor) |
| **Week 2** | **Social Engineering & AI Deception** | Vishing audio clones, quishing physical QR stickers, invoice fraud flags | **Phish vs. Legit Header & AI Voice Spectrogram Inspector** (RFC 5322, DMARC/SPF, audio harmonics) |
| **Week 3** | **Systems & Patchwork** | Sub-4-hour zero-day weaponization, shadow IT sanitization, browser plugins | **Enterprise Shadow IT & CVE Exposure Calculator** (Interactive patch & plugin risk slider) |
| **Week 4** | **Incident Readiness & Response** | Immutable 3-2-1 air-gapped backups, RAM volatile forensics, blameless reporting | **Breach Containment Tabletop Simulator** (Ransomware decision tree & RAM integrity rating) |

---

## ✦ Core Features & Modules

1. **Global Header**:
   - Monospace brand mark: `SEC_DISPATCH // 2026`.
   - Live dual UTC & EAT timestamp clock running at 1-second precision.
   - Quick search button (`⌘K` Command Palette).
   - Theme toggle (Light / Dark mode).
   - "Register for Weekly Dispatch" modal trigger.

2. **Godly-Style Floating Week Controller**:
   - `[ Week 1: Auth ] • [ Week 2: Deception ] • [ Week 3: Patch ] • [ Week 4: Incident ]`.
   - Visual states: Active (pulsing cyan beacon), Completed (emerald check), Upcoming (clock icon).
   - Smooth transitions between weeks without full-page reloads.

3. **Bento-Box Feed Grid**:
   - **Hero Feature Card (2-Col)**: Master editorial dispatch, executive summary, estimated read time, audio brief simulation, and "Copy Brief" clipboard action.
   - **Interactive Simulator Card**: Active in-browser tool tailored to each week's specific threat model.
   - **Stat Card**: High-impact typography stat (e.g. `99.9% Automated Attack Mitigation`, `1,200% Surge in QR Phishing`), change delta, and risk comparison meters.
   - **Quick Action Checklist Card**: 3 actionable tasks persisted in `localStorage`, XP points progression, and confetti burst on 100% completion.
   - **Downloadable Resources Card**: Field runbooks, PDF one-pagers, and security SOPs generated dynamically.

4. **Participant Feed & Registration Strip**:
   - Live feed distribution status indicator: `Pushed to 1,240+ Enrolled Defenders`.
   - Real-time defender activity ticker.
   - Clean inline email enrollment with simulated instant feedback.

5. **Dispatch Reader Drawer / Modal**:
   - In-depth editorial reading mode with threat vector breakdowns, code/CLI snippets, and mandatory employee response runbooks.

6. **Defender Enrollment Modal**:
   - Team member registration with department selector, dispatch conduit, and cryptographic Digital Defender Credential badge issuance.

7. **Search / Filter Command Palette (`⌘K`)**:
   - Instant search across all 4 weeks, topics, tools, tags, and downloadable SOPs.

---

## ✦ Tech Stack

- **Framework**: React 18 (Functional components, hooks, clean modular structure)
- **Styling**: Tailwind CSS (arbitrary values for glassmorphism, hairline micro-borders, ambient radial gradients)
- **Icons**: Lucide React (`Shield`, `KeyRound`, `Terminal`, `Cpu`, `Siren`, `CheckCircle2`, `Sun`, `Moon`, etc.)
- **Delight & Micro-FX**: `canvas-confetti`
- **Build Tool**: Vite 6

---

## ✦ Development & Build Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
