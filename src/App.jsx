import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Shield, Check, X, Sun, Moon, ArrowDown } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────── */
const CARDS = [
  {
    id: 'w1-1', week: 1, weekLabel: 'Week 1', tag: 'Identity',
    title: 'Kill the password.',
    excerpt: "Passkeys, FIDO2 hardware keys, and vault hygiene. A cryptographic keypair stored in your device's secure enclave is immune to every phishing proxy ever written.",
    stat: { value: '99.9%', label: 'of automated credential attacks stopped by hardware-bound passkeys' },
    readMin: 4,
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=80',
    aspect: '3/4',
    tasks: ['Register a passkey for your primary work account', 'Remove duplicate and reused passwords from your vault', 'Disable SMS fallback on accounts that support it'],
  },
  {
    id: 'w1-2', week: 1, weekLabel: 'Week 1', tag: 'Identity',
    title: 'What is a FIDO2 hardware key?',
    excerpt: 'A physical security key generates a unique challenge-response signature per domain. It cannot be phished because it refuses to sign challenges from unknown origins.',
    stat: { value: '0%', label: 'phishing success rate against FIDO2 hardware tokens in CISA field testing' },
    readMin: 3,
    img: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=900&q=80',
    aspect: '16/10',
    tasks: ['Order a backup FIDO2 key and store it at home', 'Register your hardware key in Okta or Entra ID', 'Revoke all legacy SMS 2FA options'],
  },
  {
    id: 'w1-3', week: 1, weekLabel: 'Week 1', tag: 'Identity',
    title: 'Vault hygiene: clean your credentials.',
    excerpt: "Password managers accumulate rot. Run a hygiene pass: revoke reused credentials, delete defunct logins, enable breach monitoring.",
    stat: { value: '87%', label: 'of credential-stuffing victims reused the same password on 3+ services' },
    readMin: 3,
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80',
    aspect: '1/1',
    tasks: ['Run the Watchtower or Bitwarden health report', 'Delete accounts you no longer use', 'Enable breach monitoring alerts'],
  },
  {
    id: 'w2-1', week: 2, weekLabel: 'Week 2', tag: 'Social engineering',
    title: 'The voice on the phone is not your CFO.',
    excerpt: 'Real-time audio deepfakes now require three seconds of reference audio. A cloned executive voice can authorise wire transfers and credential resets.',
    stat: { value: '1,200%', label: 'increase in voice-clone vishing attempts recorded year on year' },
    readMin: 5,
    img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=80',
    aspect: '4/5',
    tasks: ['Agree on a verbal out-of-band challenge phrase with your team', 'Never approve financial transfers over a voice call alone', 'Report suspicious calls via #security-reports'],
  },
  {
    id: 'w2-2', week: 2, weekLabel: 'Week 2', tag: 'Social engineering',
    title: 'QR codes in the office lobby are not safe.',
    excerpt: 'Attackers place adhesive QR labels over legitimate terminals — redirecting to credential harvesters that bypass every email filter entirely.',
    stat: { value: '87%', label: 'of quishing attacks bypass Secure Email Gateways — they carry no text payload' },
    readMin: 3,
    img: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=900&q=80',
    aspect: '1/1',
    tasks: ["Check your camera previews the destination URL before resolving a QR code", 'Report any QR sticker that looks layered or misaligned', 'Never enter credentials on a page reached via QR'],
  },
  {
    id: 'w2-3', week: 2, weekLabel: 'Week 2', tag: 'Social engineering',
    title: 'Inspect the header, not the sender name.',
    excerpt: 'Display names lie. DMARC alignment, SPF results, and DKIM signatures reveal whether an email truly came from where it claims.',
    stat: { value: '91%', label: 'of business email compromise attacks pass visual inspection but fail DMARC' },
    readMin: 4,
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    aspect: '16/10',
    tasks: ['Inspect raw headers on the next suspicious email you receive', 'Forward DMARC failures to your security team', 'Enable DMARC reporting on your own outbound domain'],
  },
  {
    id: 'w3-1', week: 3, weekLabel: 'Week 3', tag: 'Systems',
    title: 'Four hours to exploit.',
    excerpt: 'The median time between a CVE being published and automated scanners weaponising it. An unrebooted workstation is an open door.',
    stat: { value: '3.8 hrs', label: 'median time from CVE disclosure to first in-the-wild exploit attempt' },
    readMin: 4,
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
    aspect: '3/4',
    tasks: ['Reboot any workstation with a pending OS security update', 'Enable automatic browser updates', 'Confirm your VPN client is on the latest version'],
  },
  {
    id: 'w3-2', week: 3, weekLabel: 'Week 3', tag: 'Systems',
    title: 'The extension you installed last year has full access.',
    excerpt: 'Browser extensions requesting all_urls permissions can read every page, inject code into banking interfaces, and exfiltrate session cookies silently.',
    stat: { value: '34%', label: 'of corporate data exfiltration incidents in 2025 involved a malicious browser extension' },
    readMin: 3,
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    aspect: '16/10',
    tasks: ['Remove extensions not on the IT-approved list', 'Disable extensions unused in 90 days', 'Report any extension requesting clipboard or all-site access'],
  },
  {
    id: 'w3-3', week: 3, weekLabel: 'Week 3', tag: 'Systems',
    title: 'Shadow IT: the SaaS your IT team never approved.',
    excerpt: "Every unapproved cloud storage account and free AI assistant connected to a corporate email is a data egress channel. Map it before attackers find it.",
    stat: { value: '58%', label: 'of employees use at least one unapproved SaaS tool for company work' },
    readMin: 3,
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
    aspect: '4/3',
    tasks: ['List every cloud tool you use not on the IT catalog', 'Move company files out of personal cloud storage', 'Submit unapproved tools for security review via IT portal'],
  },
  {
    id: 'w4-1', week: 4, weekLabel: 'Week 4', tag: 'Incident response',
    title: 'Assume the breach already happened.',
    excerpt: "Immutable 3-2-1 backups, RAM-preserving isolation, and a blameless reporting culture. What you do in the first 15 minutes is everything.",
    stat: { value: '42 min', label: 'typical lateral-movement window after initial credential compromise' },
    readMin: 6,
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
    aspect: '4/5',
    tasks: ['Save the security operations hotline to your personal phone', 'Restore any file from your cloud backup to verify it works', "Complete this week's tabletop isolation drill"],
  },
  {
    id: 'w4-2', week: 4, weekLabel: 'Week 4', tag: 'Incident response',
    title: 'How to isolate a compromised machine.',
    excerpt: 'Disconnect the network interface — do not power off. Pulling power destroys RAM contents including encryption keys and malware artefacts needed for forensics.',
    stat: { value: '78%', label: 'of IR teams recover more forensic evidence from isolated machines than powered-off ones' },
    readMin: 4,
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80',
    aspect: '1/1',
    tasks: ['Disable Wi-Fi and unplug Ethernet — do not power off', 'Call the SOC hotline immediately from your mobile', 'Do not attempt to clean or reinstall the OS yourself'],
  },
  {
    id: 'w4-3', week: 4, weekLabel: 'Week 4', tag: 'Incident response',
    title: 'The 3-2-1 backup rule.',
    excerpt: '3 copies. 2 different media types. 1 immutable, air-gapped repository ransomware cannot reach. If you cannot restore in a drill, you do not have a backup.',
    stat: { value: '96%', label: 'of ransomware victims who paid had not tested backup restoration in the prior year' },
    readMin: 3,
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    aspect: '16/10',
    tasks: ['Verify your most recent backup completed successfully', 'Test restoring a single file from the backup now', 'Confirm your backup is versioned and immutable — not just synced'],
  },
];

const WEEKS = [
  {
    number: 1,
    id: 'week-1',
    label: 'Week 1',
    navLabel: 'Week 1 — Identity',
    tag: 'Identity & Authentication',
    dateRange: 'Oct 01 – Oct 07, 2026',
    title: 'Identity & Authentication',
    heroTitle: 'Eliminating Static Credentials',
    description: 'Passkeys replace memorised secrets with cryptographic proof anchored into your device\u2019s secure hardware enclave. A private key that never leaves the chip cannot be phished, stuffed, or sprayed — collapsing the single largest attack surface in enterprise security to near zero.',
    cards: CARDS.filter(c => c.week === 1),
  },
  {
    number: 2,
    id: 'week-2',
    label: 'Week 2',
    navLabel: 'Week 2 — Deception',
    tag: 'Social Engineering & AI Deception',
    dateRange: 'Oct 08 – Oct 14, 2026',
    title: 'Social Engineering & AI Deception',
    heroTitle: 'Synthetic Voices, Forged Origins',
    description: 'Three seconds of sampled audio is now sufficient to synthesise a voice indistinguishable from your CFO\u2019s. Adhesive QR overlays redirect from legitimate lobby terminals to credential harvesters that bypass every email gateway. Trust requires out-of-band verification — always.',
    cards: CARDS.filter(c => c.week === 2),
  },
  {
    number: 3,
    id: 'week-3',
    label: 'Week 3',
    navLabel: 'Week 3 — Systems',
    tag: 'Systems & Patchwork',
    dateRange: 'Oct 15 – Oct 21, 2026',
    title: 'Systems & Patchwork',
    heroTitle: 'Four Hours to Weaponisation',
    description: 'The interval between CVE disclosure and automated bot exploitation has collapsed to under four hours. Every unrebooted workstation, every unapproved browser extension with all-site permissions, every shadow SaaS account connected to a corporate inbox is an open egress channel.',
    cards: CARDS.filter(c => c.week === 3),
  },
  {
    number: 4,
    id: 'week-4',
    label: 'Week 4',
    navLabel: 'Week 4 — Response',
    tag: 'Incident Readiness & Response',
    dateRange: 'Oct 22 – Oct 28, 2026',
    title: 'Incident Readiness & Response',
    heroTitle: 'Assume the Breach Already Happened',
    description: 'Lateral movement begins within forty-two minutes of initial compromise. Survival is decided by containment speed: isolate the network interface, preserve volatile RAM for forensics, and report without fear of reprisal. If you cannot restore from your backup in a drill, you do not have a backup.',
    cards: CARDS.filter(c => c.week === 4),
  },
];

/* ─────────────────────────────────────────────────────────────────────
   EDITORIAL DROP CAP — renders the first letter in Imperial Script
───────────────────────────────────────────────────────────────────── */
function EditorialHeadline({ text, className = '' }) {
  if (!text || text.length === 0) return null;
  const firstLetter = text.charAt(0);
  const rest = text.slice(1);

  return (
    <h2 className={`week-hero-title ${className}`}>
      <span className="week-drop-cap">{firstLetter}</span>
      {rest}
    </h2>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   WEEK HERO SECTION — Shopify Editions editorial typography
───────────────────────────────────────────────────────────────────── */
function WeekHero({ week }) {
  return (
    <div className="week-hero">
      <div className="week-hero-inner">
        {/* Eyebrow badges */}
        <div className="week-hero-eyebrow">
          <span className="week-hero-badge">Week {String(week.number).padStart(2, '0')}</span>
          <span className="week-hero-date">{week.dateRange}</span>
          <span className="week-hero-tag">{week.tag}</span>
        </div>

        {/* Editorial headline with drop capital */}
        <EditorialHeadline text={week.heroTitle} />

        {/* Description in editorial serif */}
        <p className="week-hero-description">
          {week.description}
        </p>

        {/* Thin rule */}
        <div className="week-hero-rule" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   HOOK: parallax — returns how far the hero bg should translate
───────────────────────────────────────────────────────────────────── */
function useParallax(strength = 0.35) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * strength);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [strength]);
  return offset;
}

/* ─────────────────────────────────────────────────────────────────────
   HOOK: nav scroll state
───────────────────────────────────────────────────────────────────── */
function useNavScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
}

/* ─────────────────────────────────────────────────────────────────────
   ANIMATED WEEK CARD — IntersectionObserver for smooth entrance
───────────────────────────────────────────────────────────────────── */
function WeekCard({ card, delay, onClick }) {
  const ref = useRef(null);
  const [state, setState] = useState('hidden');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`week-card ${state === 'visible' ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onClick(card)}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick(card)}
      aria-label={`Read brief: ${card.title}`}
    >
      <div className="week-card-image-wrap">
        <img
          src={card.img}
          alt={card.title}
          loading="lazy"
        />
        <span className="week-card-tag-pill">{card.tag}</span>
        <span className="week-card-read-pill">{card.readMin} min read</span>
      </div>

      <div className="week-card-body">
        <h3 className="week-card-title">{card.title}</h3>
        <p className="week-card-excerpt">{card.excerpt}</p>

        <div className="week-card-stat-strip">
          <span className="week-card-stat-val">{card.stat.value}</span>
          <span className="week-card-stat-lbl">{card.stat.label}</span>
        </div>

        <div className="week-card-footer">
          <span>Read brief & checklist</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CHECKLIST
───────────────────────────────────────────────────────────────────── */
function Checklist({ card }) {
  const key = `sd_v4_${card.id}`;
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
  });
  const toggle = i => {
    const next = done.includes(i) ? done.filter(d => d !== i) : [...done, i];
    setDone(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  };
  return (
    <div>
      {card.tasks.map((t, i) => (
        <div key={i} className={`check-row ${done.includes(i) ? 'done' : ''}`}
          onClick={() => toggle(i)} role="checkbox" aria-checked={done.includes(i)}
          tabIndex={0} onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && toggle(i)}>
          <div className="cb">
            {done.includes(i) && <Check size={10} strokeWidth={3} color="var(--bg)" />}
          </div>
          <span className="cl">{t}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   DRAWER
───────────────────────────────────────────────────────────────────── */
function Drawer({ card, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="drawer-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="drawer">
        {/* Image */}
        <div style={{ position: 'relative' }}>
          <img src={card.img} alt={card.title} className="drawer-hero-img" />
          <button onClick={onClose} aria-label="Close"
            style={{ position:'absolute',top:14,right:14,width:32,height:32,borderRadius:'50%',background:'rgba(0,0,0,0.65)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#fff',backdropFilter:'blur(4px)' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '28px 32px 48px' }}>
          {/* Meta */}
          <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:14,flexWrap:'wrap' }}>
            <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:12,fontWeight:600,color:'var(--text-2)' }}>{card.weekLabel}</span>
            <span style={{ color:'var(--text-3)' }}>·</span>
            <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:12,fontWeight:600,color:'var(--text-2)' }}>{card.tag}</span>
            <span style={{ color:'var(--text-3)' }}>·</span>
            <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:12,fontWeight:600,color:'var(--text-2)' }}>{card.readMin} min read</span>
          </div>

          {/* Title */}
          <h2 style={{ fontFamily:"'Instrument Serif', 'Cormorant Garamond', Georgia, serif",fontSize:'clamp(1.5rem,3.5vw,2.2rem)',fontWeight:400,fontStretch:'normal',letterSpacing:'normal',transform:'none',lineHeight:1.15,color:'var(--text)',marginBottom:16 }}>
            {card.title}
          </h2>

          {/* Excerpt */}
          <p style={{ fontFamily:"'Cormorant Garamond', 'Instrument Serif', Georgia, serif",fontSize:16,fontStretch:'normal',letterSpacing:'normal',lineHeight:1.5,color:'var(--text-2)',marginBottom:28 }}>
            {card.excerpt}
          </p>

          {/* Stat */}
          <div style={{ borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'22px 0',marginBottom:28 }}>
            <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:'clamp(2.2rem,5vw,3.5rem)',fontWeight:700,letterSpacing:'-0.045em',color:'var(--text)',lineHeight:1 }}>
              {card.stat.value}
            </div>
            <div style={{ fontSize:13,color:'var(--text-2)',marginTop:7,maxWidth:'44ch',lineHeight:1.55 }}>
              {card.stat.label}
            </div>
          </div>

          {/* Checklist */}
          <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:12,fontWeight:600,color:'var(--text-3)',marginBottom:10,letterSpacing:'0.04em' }}>This week's actions</div>
          <Checklist card={card} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   REGISTRATION FORM
───────────────────────────────────────────────────────────────────── */
function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', team: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const submit = e => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.email.includes('@')) errs.email = 'Enter a valid email';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    setTimeout(() => setStatus('done'), 1000);
  };

  if (status === 'done') return (
    <div style={{ textAlign:'center',padding:'36px 0' }}>
      <div style={{ width:40,height:40,borderRadius:'50%',background:'rgba(128,128,128,0.1)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px' }}>
        <Check size={18} color="var(--text)" strokeWidth={2.5} />
      </div>
      <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontWeight:600,color:'var(--text)',marginBottom:6 }}>Registered.</div>
      <div style={{ fontSize:13,color:'var(--text-2)' }}>
        Week 1 brief goes to <span style={{ color:'var(--text)' }}>{form.email}</span> on October 1.
      </div>
    </div>
  );

  return (
    <form onSubmit={submit} noValidate style={{ display:'flex',flexDirection:'column',gap:12 }}>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 }} className="form-cols">
        <div>
          <input placeholder="Your name" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className={`input ${errors.name ? 'err' : ''}`} />
          {errors.name && <div style={{ fontSize:11.5,color:'#f87171',marginTop:4 }}>{errors.name}</div>}
        </div>
        <div>
          <input type="email" placeholder="Work email" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className={`input ${errors.email ? 'err' : ''}`} />
          {errors.email && <div style={{ fontSize:11.5,color:'#f87171',marginTop:4 }}>{errors.email}</div>}
        </div>
      </div>
      <input placeholder="Team (optional)" value={form.team}
        onChange={e => setForm(f => ({ ...f, team: e.target.value }))}
        className="input" />
      <button type="submit" className="btn btn-white" disabled={status === 'loading'}
        style={{ marginTop:4,width:'100%' }}>
        {status === 'loading' ? 'Registering…' : 'Join the program — free'}
      </button>
      <p style={{ fontSize:11.5,color:'var(--text-3)',textAlign:'center' }}>
        Four emails in October. No sales, no tracking. Unsubscribe any time.
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState('week-1');
  const [active, setActive]               = useState(null);
  const [theme, setTheme]                 = useState(() => {
    // Persist theme preference
    try {
      return localStorage.getItem('sd_theme') || 'dark';
    } catch { return 'dark'; }
  });
  const navScrolled                       = useNavScrolled();
  const parallaxOffset                    = useParallax(0.32);

  // Theme — toggle .light class on <html> and sync body
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    // Sync body background for scroll overscroll color
    document.body.style.background = theme === 'light' ? '#E5E5DC' : '#0a0a0b';
    document.body.style.color = theme === 'light' ? '#000000' : '#ececec';
    try { localStorage.setItem('sd_theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }, []);

  // Smooth scroll with offset for sticky top bars
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = 96;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - navOffset,
      behavior: 'smooth',
    });
  }, []);

  // Scroll spy to highlight active week in navigation
  useEffect(() => {
    const sectionIds = ['week-1', 'week-2', 'week-3', 'week-4', 'register'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      setActiveSection('week-1');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── TOP NAV — Glassmorphism ──────────────────────────────── */}
      <nav className={`nav ${navScrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Shield size={18} color="var(--text)" strokeWidth={2} />
          Sec Dispatch
        </a>

        <div className="nav-links">
          {WEEKS.map(w => (
            <button
              key={w.id}
              className={`nav-pill ${activeSection === w.id ? 'active' : ''}`}
              onClick={() => scrollToSection(w.id)}
            >
              {w.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('register')}
            className={`nav-pill cta ${activeSection === 'register' ? 'active' : ''}`}
          >
            Register free
          </button>
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </nav>

      {/* ── HERO — full-viewport, parallax background ────────────── */}
      <section className="hero">
        {/* Parallax background — the image moves slower than scroll */}
        <div
          className="hero-bg"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1800&q=80)',
            transform: `translateY(${parallaxOffset}px)`,
          }}
        />
        <div className="hero-overlay" />

        {/* Content */}
        <div className="hero-content enter">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-dot" />
            October 2026 · Free for any team · 1,240+ defenders enrolled
          </div>

          <h1 className="hero-title">
            <span className="hero-drop-cap">C</span>ybersecurity{'\u2002'}Awareness{'\u2002'}Month
          </h1>

          <p className="hero-sub">
            Four weeks of operational intelligence across identity, social engineering, systems hardening, and incident response — one brief at a time.
          </p>

          <div className="hero-actions">
            <button
              onClick={() => scrollToSection('register')}
              className="btn btn-white"
            >
              Register your team
            </button>
            <button
              onClick={() => scrollToSection('week-1')}
              className="btn btn-outline"
            >
              See the four weeks
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="scroll-hint"
          onClick={() => scrollToSection('week-1')}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && scrollToSection('week-1')}
        >
          <ArrowDown size={14} />
          Scroll
        </div>
      </section>

      {/* ── STICKY TIMELINE NAV — continuous scroll guide ─────────── */}
      <div id="briefs" className="filter-bar">
        <div className="timeline-nav-inner">
          <div className="timeline-nav-pills">
            {WEEKS.map(w => (
              <button
                key={w.id}
                className={`filter-pill ${activeSection === w.id ? 'active' : ''}`}
                aria-pressed={activeSection === w.id}
                onClick={() => scrollToSection(w.id)}
              >
                <span className="pill-dot" />
                {w.navLabel}
              </button>
            ))}
            <button
              className={`filter-pill ${activeSection === 'register' ? 'active' : ''}`}
              aria-pressed={activeSection === 'register'}
              onClick={() => scrollToSection('register')}
            >
              Register free
            </button>
          </div>
          <div className="timeline-nav-hint">
            <span className="live-dot" />
            <span>Continuous 4-Week Feed</span>
          </div>
        </div>
      </div>

      {/* ── CONTINUOUS 4-WEEK CAMPAIGN STREAM ───────────────────────── */}
      <main className="campaign-container">
        {WEEKS.map((week) => (
          <section key={week.id} id={week.id} className="week-section">
            {/* Editorial hero/description for this week */}
            <WeekHero week={week} />

            <div className="week-grid">
              {week.cards.map((card, i) => (
                <WeekCard
                  key={card.id}
                  card={card}
                  delay={i * 70}
                  onClick={setActive}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* ── REGISTER SECTION ─────────────────────────────────────── */}
      <div id="register" style={{ borderTop: '1px solid var(--border)', marginTop: 2 }}>
        <div className="reg-section">

          {/* Left copy */}
          <div>
            <h2 style={{ fontFamily:"'Instrument Serif', 'Cormorant Garamond', Georgia, serif",fontSize:'clamp(1.9rem,4vw,3rem)',fontWeight:400,fontStretch:'normal',letterSpacing:'normal',transform:'none',lineHeight:1.1,color:'var(--text)',marginBottom:18 }}>
              <span style={{ fontFamily:"'Imperial Script', cursive",fontSize:'1.35em',lineHeight:0.85,marginRight:'0.02em' }}>R</span>egister your team.
            </h2>
            <p style={{ fontFamily:"'Cormorant Garamond', 'Instrument Serif', Georgia, serif",fontSize:16.5,fontStretch:'normal',letterSpacing:'normal',lineHeight:1.5,color:'var(--text-2)',marginBottom:32,maxWidth:'44ch' }}>
              One brief a week, four weeks in October. The threats that actually compromise organisations in 2026 — no vendor pitch, no compliance theater.
            </p>
            <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
              {[
                { label: 'Identity & Authentication', date: 'Oct 1' },
                { label: 'Social Engineering & AI Deception', date: 'Oct 8' },
                { label: 'Systems & Patchwork', date: 'Oct 15' },
                { label: 'Incident Readiness & Response', date: 'Oct 22' },
              ].map(({ label, date }) => (
                <div key={label} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,padding:'12px 0',borderBottom:'1px solid var(--border)' }}>
                  <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                    <Check size={13} color="var(--text-2)" strokeWidth={2.5} />
                    <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:13.5,fontWeight:500,color:'var(--text-2)' }}>{label}</span>
                  </div>
                  <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:12,fontWeight:600,color:'var(--text-3)',flexShrink:0 }}>{date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background:'var(--surface)',border:'1px solid var(--border-mid)',borderRadius:14,padding:'28px 28px 32px' }}>
            <div style={{ marginBottom:22 }}>
              <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontWeight:700,fontSize:15,color:'var(--text)',marginBottom:4 }}>Join the program</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:13,fontWeight:500,color:'var(--text-2)' }}>1,240+ defenders enrolled · free forever</div>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{ borderTop:'1px solid var(--border)',padding:'22px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8 }}>
        <div style={{ display:'flex',alignItems:'center',gap:8 }}>
          <Shield size={14} color="var(--text-3)" />
          <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:12.5,fontWeight:500,color:'var(--text-3)' }}>Sec Dispatch 2026</span>
        </div>
        <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif",fontSize:12.5,fontWeight:500,color:'var(--text-3)' }}>Free · No tracking · Nairobi, Kenya</span>
      </footer>

      {/* ── DRAWER ───────────────────────────────────────────────── */}
      {active && <Drawer card={active} onClose={() => setActive(null)} />}

      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 600px) {
          .form-cols { grid-template-columns: 1fr !important; }
          .nav-links .nav-pill:not(.cta) { display: none; }
        }
      `}</style>
    </>
  );
}
