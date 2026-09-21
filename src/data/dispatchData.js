/**
 * SEC_DISPATCH // 2026
 * Master campaign intelligence data for Cybersecurity Awareness Month (October 2026).
 * Follows Godly.website editorial design DNA: high-density metadata, crisp tags, interactive tooling.
 */

export const CAMPAIGN_METADATA = {
  year: 2026,
  month: "OCTOBER",
  theme: "DEFENDING AT MACHINE SPEED: CRYPTOGRAPHY, RESILIENCE & ZERO-TRUST",
  totalEnrolled: 1240,
  feedStatus: "ACTIVE",
  targetOrg: "GLOBAL CYBER DEFENSE INITIATIVE",
};

export const WEEKS_DATA = [
  {
    id: "week-1",
    weekNumber: 1,
    shortTitle: "Auth & Passkeys",
    dockLabel: "Week 1: Auth",
    tag: "WEEK 01 // PASSKEYS",
    kicker: "SEC_ARCH // IDENTITY DISPATCH",
    topic: "Identity & Authentication",
    title: "Eliminating Static Credentials: The Enterprise Passkey & FIDO2 Pivot",
    subtitle: "Why passwords belong in computer history museums, and how cryptographic public-key pairs defang 99.9% of credential-stuffing campaigns.",
    dateRange: "OCT 01 — OCT 07, 2026",
    status: "active", // active | completed | upcoming
    countdownText: "LIVE NOW // ACTIVE DRILL",
    readTime: "4 MIN READ",
    audioDuration: "5:20 AUDIO",
    riskLevel: "CRITICAL",
    category: "Identity & Access",
    summary: "Static passwords represent the single greatest vulnerability vector in contemporary enterprise networks. In 2026, identity is no longer a secret you memorize—it is a cryptographic proof physically anchored into TPM security chips and biometric enclaves.",
    
    // Detailed editorial content for full dispatch reader
    editorial: {
      author: "Elena Vance // Principal Identity Architect",
      classification: "UNRESTRICTED // ALL TEAMS",
      publishedAt: "2026-10-01 08:00 UTC",
      overview: "Every year, automated bots execute over 30 billion credential-stuffing attacks against enterprise login portals. The fundamental flaw of the static password is that it is a shared secret: if you know it, and the server knows it, any intermediary that intercepts it owns the account.",
      threatVectors: [
        {
          name: "Adversary-in-the-Middle (AiTM) Reverse Proxies",
          risk: "High",
          detail: "Tools like Evilginx actively intercept legacy TOTP/SMS codes and clone session cookies in real time. Passkeys render AiTM completely impotent because the public-key signature is bound cryptographically to the exact domain origin."
        },
        {
          name: "Password Spraying & Credential Stuffing",
          risk: "Critical",
          detail: "Breached password databases from external personal services are automated against corporate single sign-on portals. Eliminating passwords cuts this attack surface to zero."
        },
        {
          name: "MFA Fatigue (Push Bombing)",
          risk: "High",
          detail: "Attackers bombard employees with dozens of push notifications at 3:00 AM hoping for an accidental tap. FIDO2 requires intentional, localized biometric interaction."
        }
      ],
      corePrinciples: [
        "Cryptographic Asymmetry: Private keys never leave the secure hardware enclave (Apple Secure Enclave, Android Titan M2, or Windows Hello TPM).",
        "Domain Origin Binding: A passkey created on 'secure.company.internal' will refuse to sign a challenge from 'secure.company-login.fake'.",
        "Hardware-Backed FIDO2: Physical security keys (YubiKey) provide unphishable assurance for high-privilege administrators."
      ],
      codeSnippet: {
        language: "javascript",
        title: "navigator.credentials.get() // FIDO2 Challenge Assertion",
        code: `// Browser enforces exact domain matching at the hardware level
const assertion = await navigator.credentials.get({
  publicKey: {
    challenge: serverGeneratedRandomChallenge,
    rpId: "dispatch.defense.enterprise", // Cryptographically locked
    allowCredentials: [{
      id: userCredentialId,
      type: "public-key",
      transports: ["internal", "usb", "nfc"]
    }],
    userVerification: "required" // Biometric or PIN
  }
});
// The server verifies the signature without ever holding a password!`
      },
      actionableProtocol: [
        "Audit existing 1Password / Bitwarden vaults for remaining plain passwords and migrate enabled accounts to passkeys.",
        "Enroll your secondary hardware key: keep one primary YubiKey on your keychain and a backup key in your home vault.",
        "Revoke legacy SMS/Phone call 2FA options in Okta/Entra ID profile settings."
      ]
    },

    // Interactive tool config for Week 1
    simulator: {
      type: "passkey-checker",
      badge: "INTERACTIVE HARDWARE SIMULATOR",
      title: "Passkey & FIDO2 Readiness Simulator",
      description: "Test your platform's WebAuthn cryptographic capability and simulate biometric signature creation.",
    },

    // Stat card data
    stat: {
      primaryValue: "99.9%",
      label: "Automated Phishing Mitigation",
      change: "+48% YoY Passkey Adoption",
      subtext: "CISA and Microsoft identity telemetry confirms phishing-resistant FIDO2 tokens reduce credential hijackings to statistically zero.",
      metricBreakdown: [
        { name: "Legacy Password + SMS", risk: 84, color: "text-rose-400", status: "Critical Vulnerability" },
        { name: "Authenticator App (TOTP)", risk: 38, color: "text-amber-400", status: "AiTM Phishable" },
        { name: "Passkeys / FIDO2 Enclave", risk: 0.1, color: "text-emerald-400", status: "Cryptographically Immune" }
      ]
    },

    // Checklist items (persisted in localStorage)
    checklist: [
      {
        id: "w1-c1",
        title: "Register Windows Hello or Touch ID Passkey",
        description: "Set up your platform biometric authenticator in company SSO preferences.",
        actionUrl: "#sim",
        category: "Identity",
        xp: 100
      },
      {
        id: "w1-c2",
        title: "Audit & Purge Duplicate Reused Passwords",
        description: "Open your enterprise password vault and clean all flagged weak or reused credentials.",
        actionUrl: "#vault",
        category: "Vault Hygiene",
        xp: 75
      },
      {
        id: "w1-c3",
        title: "Disable SMS & Email Verification Fallbacks",
        description: "Ensure your primary accounts cannot be reset via insecure SIM-swap conduits.",
        actionUrl: "#settings",
        category: "MFA Hardening",
        xp: 75
      }
    ],

    // Downloadable resources & playbooks
    resources: [
      {
        id: "r1-1",
        title: "Enterprise Passkey Architecture Guide",
        format: "PDF // 2.4 MB",
        type: "Blueprint",
        code: "SEC-ARCH-2026-PK1"
      },
      {
        id: "r1-2",
        title: "FIDO2 Hardware Key Employee Playbook",
        format: "PDF // 1.1 MB",
        type: "Quick Start",
        code: "DEF-RUNBOOK-01"
      },
      {
        id: "r1-3",
        title: "Emergency Break-Glass Account SOP",
        format: "MD // 14 KB",
        type: "Protocol",
        code: "SOP-BREAKGLASS"
      }
    ]
  },

  {
    id: "week-2",
    weekNumber: 2,
    shortTitle: "AI Deception & QR",
    dockLabel: "Week 2: Deception",
    tag: "WEEK 02 // AI_DECEPTION",
    kicker: "THREAT_INTEL // COGNITIVE WARFARE",
    topic: "Social Engineering & AI Deception",
    title: "Synthetic Personas, Audio Cloning & Quishing Vectors",
    subtitle: "How generative deepfakes, weaponized physical QR codes, and automated CFO voice clones evade human intuition.",
    dateRange: "OCT 08 — OCT 14, 2026",
    status: "upcoming",
    countdownText: "UNLOCKS IN 16 DAYS",
    readTime: "5 MIN READ",
    audioDuration: "6:45 AUDIO",
    riskLevel: "HIGH",
    category: "Social Engineering",
    summary: "The threat landscape has evolved from misspelled emails to hyper-realistic neural voice synthesis and physical QR sticker tampering in office lobbies. Trust nothing without out-of-band cryptographic or verbal challenge confirmation.",
    
    editorial: {
      author: "Marcus Ray // Threat Intelligence Lead",
      classification: "RESTRICTED // EMPLOYEES ONLY",
      publishedAt: "2026-10-08 08:00 UTC",
      overview: "Generative audio synthesis now requires fewer than 3 seconds of reference audio to generate an indistinguishable voice clone of any executive or team member. Concurrently, attackers are plastering malicious QR codes over legitimate parking and cafeteria terminals to hijack sessions.",
      threatVectors: [
        {
          name: "Vishing via Real-Time Neural Voice Cloning",
          risk: "Critical",
          detail: "Attackers synthesize an executive's voice over Microsoft Teams or direct phone calls, citing an 'urgent banking crisis' or 'restricted M&A wire transfer' requiring instant override."
        },
        {
          name: "Quishing (Weaponized Physical QR Codes)",
          risk: "High",
          detail: "Physical adhesive labels placed over authentic QR codes in office lobbies, shared desks, or parking facilities redirect to credential harvesters that bypass perimeter firewalls."
        },
        {
          name: "Vendor Invoice Impersonation & Lookalike Domains",
          risk: "High",
          detail: "Punycode domain substitutions (e.g., replace 'i' with Turkish dotless 'ı' or Cyrillic characters) mimicking approved enterprise software vendors."
        }
      ],
      corePrinciples: [
        "Verbal Code-Word Protocol: Never execute emergency wire transfers or privileged security bypasses without an out-of-band verbal challenge code.",
        "Physical Inspection: Never scan a QR code if a physical sticker has been layered on top of the original substrate.",
        "Inspect RFC Headers: DMARC, DKIM, and SPF headers tell the truth even when the display name is meticulously spoofed."
      ],
      codeSnippet: {
        language: "bash",
        title: "Inspect DMARC Alignment & Authentication-Results",
        code: `# Checking raw headers for spoofed executive communications
Authentication-Results: mx.defense.enterprise;
  spf=fail (sender IP 198.51.100.42 is not authorized for domain executive.com);
  dkim=neutral (bad signature);
  dmarc=fail action=quarantine header.from=executive.com;
X-Forensic-Alert: [DISPLAY_NAME_SPOOF_DETECTED]`
      },
      actionableProtocol: [
        "Verify all financial transfer requests through an established secondary communication line (Signal or verified internal VoIP).",
        "Use the corporate camera app that inspects full target URLs prior to resolving any QR code.",
        "Flag suspect audio calls immediately via `#incident-hotline`."
      ]
    },

    simulator: {
      type: "header-inspector",
      badge: "LIVE THREAT INVESTIGATION",
      title: "Phish vs. Legit Header & Voice Clone Inspector",
      description: "Analyze raw RFC 5322 email headers, detect DMARC spoofing, and inspect synthetic voice spectrograms.",
    },

    stat: {
      primaryValue: "1,200%",
      label: "Surge in QR & Audio Clone Phishing",
      change: "Recorded in 2026 Threat Telemetry",
      subtext: "Quishing attacks bypassed 87% of legacy Secure Email Gateways (SEGs) due to pure image-based payload delivery.",
      metricBreakdown: [
        { name: "Traditional Text Phishing", risk: 22, color: "text-emerald-400", status: "Heavily Filtered" },
        { name: "Physical QR Code Lures", risk: 65, color: "text-amber-400", status: "High Human Susceptibility" },
        { name: "Executive AI Voice Clones", risk: 91, color: "text-rose-400", status: "Active High-Value Target" }
      ]
    },

    checklist: [
      {
        id: "w2-c1",
        title: "Test Your QR Scanner URL Preview",
        description: "Ensure your mobile device shows the destination domain before opening any link.",
        actionUrl: "#qr-test",
        category: "Quishing Defense",
        xp: 100
      },
      {
        id: "w2-c2",
        title: "Establish a Team Out-of-Band Challenge Phrase",
        description: "Agree on a verbal verification protocol for emergency wire or access requests.",
        actionUrl: "#protocol",
        category: "Anti-Deepfake",
        xp: 75
      },
      {
        id: "w2-c3",
        title: "Run Phishing Header Triage Drill",
        description: "Inspect sample raw headers in the interactive tool to identify spoofed SPF records.",
        actionUrl: "#sim",
        category: "Header Triage",
        xp: 75
      }
    ],

    resources: [
      {
        id: "r2-1",
        title: "Deepfake Voice & Vishing Defense SOP",
        format: "PDF // 1.8 MB",
        type: "Checklist",
        code: "THREAT-INTEL-VOICE-02"
      },
      {
        id: "r2-2",
        title: "Quishing & QR Sticker Triage One-Pager",
        format: "PDF // 900 KB",
        type: "Infographic",
        code: "DEF-QUISH-02"
      },
      {
        id: "r2-3",
        title: "Email RFC Header Diagnostic Cheat Sheet",
        format: "MD // 22 KB",
        type: "Diagnostic",
        code: "RFC-HEADER-REF"
      }
    ]
  },

  {
    id: "week-3",
    weekNumber: 3,
    shortTitle: "Systems & Patchwork",
    dockLabel: "Week 3: Patch",
    tag: "WEEK 03 // ZERO_DAY_DEFENSE",
    kicker: "VULN_MGMT // DEFENSIVE SURFACE",
    topic: "Systems & Patchwork",
    title: "Zero-Day Vulnerability Velocity & Shadow IT Sanitization",
    subtitle: "Defending the enterprise perimeter against rapid weaponization cycles and unmonitored AI browser extensions.",
    dateRange: "OCT 15 — OCT 21, 2026",
    status: "upcoming",
    countdownText: "UNLOCKS IN 23 DAYS",
    readTime: "4 MIN READ",
    audioDuration: "5:40 AUDIO",
    riskLevel: "CRITICAL",
    category: "Vulnerability Management",
    summary: "The average time between CVE publication and automated bot exploitation has plummeted to under 4 hours. Unapproved SaaS tools and AI browser plugins represent invisible egress conduits for corporate data.",
    
    editorial: {
      author: "Siddharth Chen // Head of Vulnerability Research",
      classification: "INTERNAL // SYSTEM HARDENING",
      publishedAt: "2026-10-15 08:00 UTC",
      overview: "Weaponized proof-of-concept exploits for critical vulnerabilities now appear in public repositories within minutes of a patch release. Simultaneously, rogue third-party extensions with broad 'read and change all data on all websites' permissions quietly siphon customer data.",
      threatVectors: [
        {
          name: "Sub-4-Hour Weaponization Windows",
          risk: "Critical",
          detail: "Automated scanner networks probe IP address ranges continuously for newly disclosed CVE signatures in Edge routers, VPN gateways, and web frameworks."
        },
        {
          name: "Rogue AI Assistant Browser Plugins",
          risk: "High",
          detail: "Free productivity extensions that intercept clipboard contents and DOM trees, transmitting sensitive customer PII to overseas unvetted servers."
        },
        {
          name: "Firmware & Microcode Degradation",
          risk: "Medium",
          detail: "Legacy hardware running out-of-date UEFI/BIOS firmware vulnerable to persistent physical and memory-based side-channel attacks."
        }
      ],
      corePrinciples: [
        "Automated Kernel & Browser Restarts: A security patch in a browser or OS kernel does not protect you until the process is restarted.",
        "Zero Trust Software Catalog: Only extensions signed and distributed via the corporate enterprise policy store are permitted.",
        "Continuous EDR Heartbeat: Endpoints that miss EDR check-ins for >24 hours are quarantined automatically from the corporate VPN."
      ],
      codeSnippet: {
        language: "powershell",
        title: "Verify System Patch & EDR Sensor Status",
        code: `# Inspect pending reboot state & CrowdStrike/Defender sensor
Get-ItemProperty "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Component Based Servicing\\RebootPending" -ErrorAction SilentlyContinue
Get-Service -Name "CSFalconService", "Sense" | Select-Object Name, Status, StartType
# Return CVE Compliance Index`
      },
      actionableProtocol: [
        "Perform immediate reboot if your workstation displays a yellow or red OS patch badge.",
        "Audit Chrome/Edge extensions: remove any extension with 'all_urls' permissions not issued by corporate IT.",
        "Report personal unapproved SaaS cloud storage accounts used for company documents."
      ]
    },

    simulator: {
      type: "cve-audit",
      badge: "ENDPOINT AUDIT SIMULATOR",
      title: "Enterprise Shadow IT & CVE Exposure Calculator",
      description: "Audit your simulated endpoint configuration, browser permissions, and pending reboot risk score.",
    },

    stat: {
      primaryValue: "3.8 HRS",
      label: "Median Time to First Exploit",
      change: "Down from 14 Days in 2021",
      subtext: "Automated vulnerability weaponization necessitates zero-lag automated operating system and browser updates.",
      metricBreakdown: [
        { name: "Zero-Day Discovery", risk: 10, color: "text-cyan-400", status: "Hour 0: Advisory Released" },
        { name: "Public Weaponized Exploit", risk: 75, color: "text-amber-400", status: "Hour 3.8: Bots Scanning" },
        { name: "Enterprise Unpatched Lag", risk: 95, color: "text-rose-400", status: "Day 3+: Mass Compromise" }
      ]
    },

    checklist: [
      {
        id: "w3-c1",
        title: "Execute Pending Workstation Security Restart",
        description: "Finalize pending kernel and browser security patches by doing a clean reboot.",
        actionUrl: "#reboot",
        category: "OS Hygiene",
        xp: 100
      },
      {
        id: "w3-c2",
        title: "Sanitize Browser Extension Footprint",
        description: "Remove obsolete or unverified plugins from your daily work browser profile.",
        actionUrl: "#extensions",
        category: "Shadow IT",
        xp: 75
      },
      {
        id: "w3-c3",
        title: "Verify Corporate EDR Sensor Heartbeat",
        description: "Check that your local security sensor status light is green and synchronized.",
        actionUrl: "#edr",
        category: "Sensor Health",
        xp: 75
      }
    ],

    resources: [
      {
        id: "r3-1",
        title: "Shadow IT Discovery & Sanitization Playbook",
        format: "PDF // 1.5 MB",
        type: "Playbook",
        code: "SYS-SHADOW-2026"
      },
      {
        id: "r3-2",
        title: "Zero-Day Vulnerability Response SOP (v4.1)",
        format: "PDF // 2.1 MB",
        type: "Standard SOP",
        code: "SOP-VULN-41"
      },
      {
        id: "r3-3",
        title: "Enterprise Approved AI Tools Matrix",
        format: "MD // 18 KB",
        type: "Catalog",
        code: "AI-GOV-MATRIX"
      }
    ]
  },

  {
    id: "week-4",
    weekNumber: 4,
    shortTitle: "Incident Readiness",
    dockLabel: "Week 4: Incident",
    tag: "WEEK 04 // CONTAINMENT_SOP",
    kicker: "IR_COMMAND // CRISIS RESILIENCE",
    topic: "Incident Readiness & Response",
    title: "Immutable 3-2-1 Backups & Blameless Containment Drills",
    subtitle: "When perimeter breaches occur, survival is determined by containment speed, unpolluted recovery points, and transparent reporting culture.",
    dateRange: "OCT 22 — OCT 31, 2026",
    status: "upcoming",
    countdownText: "UNLOCKS IN 30 DAYS",
    readTime: "6 MIN READ",
    audioDuration: "7:15 AUDIO",
    riskLevel: "CRITICAL",
    category: "Incident Response",
    summary: "Assume breach is an operational reality. The difference between a minor incident and a catastrophic corporate event is how rapidly defenders isolate endpoints, verify air-gapped backups, and report without fear of retribution.",
    
    editorial: {
      author: "Kassidy Thorne // Director of Incident Response",
      classification: "ENTERPRISE WIDE // DRILL PROTOCOL",
      publishedAt: "2026-10-22 08:00 UTC",
      overview: "The most dangerous mindset in security is the belief that prevention will never fail. When an adversary gains initial execution, defenders have a tight breakout window before lateral movement compromises domain controllers and backup repositories.",
      threatVectors: [
        {
          name: "Targeted Backup Tampering & Encryption",
          risk: "Critical",
          detail: "Modern ransomware strains actively seek out online Veeam, AWS S3, and NetApp snapshots to purge retention copies before initiating endpoint encryption."
        },
        {
          name: "Covert C2 Beacons & Lateral Pivoting",
          risk: "High",
          detail: "Living-off-the-land binaries (LOLBins like certutil, powershell) leveraged to silently pivot to adjacent machines in under 42 minutes."
        },
        {
          name: "Fear of Reprisal & Delayed Reporting",
          risk: "Critical",
          detail: "Employees delaying breach notifications by hours or days out of fear of punishment, giving attackers ample time to exfiltrate database records."
        }
      ],
      corePrinciples: [
        "Blameless Reporting Guarantee: If you click a bad link or notice suspicious behavior, reporting it immediately is celebrated, never penalized.",
        "Immutable 3-2-1 Air-Gapping: 3 copies of data, across 2 different media types, with 1 copy stored in an immutable, cryptographically locked WORM repository.",
        "Contain First, Investigate Second: Isolate the network interface immediately, but DO NOT power off the computer (which wipes RAM volatile evidence)."
      ],
      codeSnippet: {
        language: "bash",
        title: "Emergency Host Isolation CLI Protocol",
        code: `# Immediate network disconnect while preserving RAM forensics
# Step 1: Disconnect Wi-Fi & Ethernet adapter
nmcli networking off || ip link set dev eth0 down
# Step 2: NEVER pull the power cord (preserves memory encryption keys)
# Step 3: Call Security Operations Center 24/7 Hotline: +1-800-555-CYBER
echo "[ALERT] Host isolated from subnet. Forensic RAM capture standby."`
      },
      actionableProtocol: [
        "Save the 24/7 Security Operations Center emergency dispatch number to your mobile contacts.",
        "Verify your local project directories are synchronized to immutable cloud backup folders.",
        "Never delete evidence or attempt to reinstall the operating system yourself prior to incident response triage."
      ]
    },

    simulator: {
      type: "containment-sim",
      badge: "LIVE TABLETOP SIMULATOR",
      title: "Breach Containment Decision Tabletop Simulator",
      description: "Face a simulated active ransomware alert. Make rapid containment decisions to protect forensic RAM integrity.",
    },

    stat: {
      primaryValue: "42 MIN",
      label: "Target Adversary Breakout Time",
      change: "Defender SLA: < 15 Min Containment",
      subtext: "Lateral movement occurs within 42 minutes of initial credential compromise. Rapid isolation is non-negotiable.",
      metricBreakdown: [
        { name: "Initial Breach Execution", risk: 10, color: "text-cyan-400", status: "Minute 0: Phish Triggered" },
        { name: "Credential Scraping (LSASS)", risk: 55, color: "text-amber-400", status: "Minute 18: Token Harvest" },
        { name: "Domain Lateral Pivoting", risk: 90, color: "text-rose-400", status: "Minute 42: Domain Compromise" }
      ]
    },

    checklist: [
      {
        id: "w4-c1",
        title: "Store 24/7 Incident Hotline in Personal Phone",
        description: "Add `+1 (800) 555-CYBER` to your phone contacts for rapid emergency reporting.",
        actionUrl: "#hotline",
        category: "Emergency Contact",
        xp: 100
      },
      {
        id: "w4-c2",
        title: "Verify File Recovery Point from Immutable Vault",
        description: "Test restoring a previous version of any document to ensure sync fidelity.",
        actionUrl: "#backup",
        category: "3-2-1 Backup",
        xp: 75
      },
      {
        id: "w4-c3",
        title: "Complete the Tabletop Containment Drill",
        description: "Run through the interactive simulator and earn an optimal forensic preservation score.",
        actionUrl: "#sim",
        category: "Tabletop Sim",
        xp: 75
      }
    ],

    resources: [
      {
        id: "r4-1",
        title: "Incident Commander Quick-Reference Runbook",
        format: "PDF // 3.1 MB",
        type: "Runbook",
        code: "IR-COMMAND-2026"
      },
      {
        id: "r4-2",
        title: "Immutable 3-2-1 Backup Architecture Spec",
        format: "PDF // 1.7 MB",
        type: "Architecture",
        code: "SPEC-321-BACKUP"
      },
      {
        id: "r4-3",
        title: "Blameless Security Incident Reporting Template",
        format: "MD // 12 KB",
        type: "Template",
        code: "IR-BLAMELESS-RPT"
      }
    ]
  }
];

export const LIVE_DEFENDER_FEED = [
  { id: 1, user: "sec.ops.frank", action: "Activated FIDO2 Hardware Key", time: "2m ago", week: 1 },
  { id: 2, user: "analyst.devon", action: "Flagged Suspicious DMARC Header", time: "8m ago", week: 2 },
  { id: 3, user: "infra.maya", action: "Completed OS Security Kernel Patch", time: "14m ago", week: 3 },
  { id: 4, user: "eng.kai", action: "Verified Immutable S3 Vault Snapshot", time: "22m ago", week: 4 },
  { id: 5, user: "lead.zara", action: "Earned 250 XP // Week 1 Defense Shield", time: "31m ago", week: 1 },
];
