"use client";

import { useState, useEffect } from "react";

/* ─── DATA ────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
];

const SKILLS = [
  {
    label: "Frontend",
    color: "#0071e3",
    items: ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "React Hook Form"],
  },
  {
    label: "Backend",
    color: "#34c759",
    items: ["Node.js", "Express", "NestJS", "REST APIs", "WebSockets", "JWT / OAuth", "GraphQL"],
  },
  {
    label: "Databases",
    color: "#ff9500",
    items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase", "Neon DB"],
  },
  {
    label: "Mobile",
    color: "#5856d6",
    items: ["React Native (Android & iOS)", "Expo"],
  },
  {
    label: "Tools & DevOps",
    color: "#ff3b30",
    items: ["Git", "GitHub Actions", "Docker", "AWS", "Vercel", "Render", "Sentry", "Postman", "Jest"],
  },
];

const EXPERIENCE = [
  {
    company: "BacklinkOS",
    url: "https://backlinkos.io",
    urlLabel: "backlinkos.io",
    role: "Product Engineer",
    stack: "React · Next.js · Node.js · Supabase · Clerk · Razorpay · PostHog · REST APIs",
    period: "Dec 2025 – Present",
    color: "#0071e3",
    bullets: [
      "Built and scaled BacklinkOS, an SEO and backlink tracking SaaS, handling 10,000+ backlink records with real-time domain monitoring and sub-500ms query response times.",
      "Engineered auth and subscription flows with Clerk and Razorpay for secure multi-tenant access; integrated PostHog analytics and AI-powered search for backlink discovery.",
      "Managed Supabase (PostgreSQL) schema design, RLS policies, and real-time subscriptions; maintained 99%+ uptime with CI/CD pipelines reducing deployment time by 40%.",
    ],
  },
  {
    company: "BSES Rajdhani Power Limited",
    url: "#",
    urlLabel: "Certificate",
    role: "Fullstack Developer Intern",
    stack: "React.js · Node.js · PostgreSQL · REST APIs · Infrastructure Monitoring",
    period: "June 2024 – July 2024",
    color: "#34c759",
    bullets: [
      "Engineered internal systems and website features supporting enterprise infrastructure for 10,000+ users.",
      "Built and optimized backend APIs with PostgreSQL, reducing response times by 12% and cutting downtime incidents by 20%.",
      "Diagnosed and resolved network connectivity issues across distributed infrastructure, improving system reliability and reducing escalation tickets.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Savora",
    subtitle: "Expense Manager",
    url: "#",
    role: "Fullstack Developer",
    stack: "Next.js 15 · NestJS · PostgreSQL · Neon DB · Vercel · Render · CI/CD",
    period: "Jan 2026 – Present",
    status: "Live",
    statusColor: "#34c759",
    color: "#0071e3",
    bullets: [
      "Architected serverless backend with NestJS and Neon PostgreSQL; achieved sub-200ms dashboard load times via edge caching and automated CI/CD on Vercel and Render.",
      "Implemented secure JWT authentication and environment variable management across staging and production environments.",
      "Built real-time expense tracking with category breakdowns, monthly summaries, and Recharts-powered analytics dashboard.",
    ],
  },
  {
    name: "Zenra",
    subtitle: "Music-Based Connection App",
    url: "#",
    role: "Fullstack Developer",
    stack: "React Native · React.js · Node.js · MongoDB · Firebase · GraphQL · Socket.io",
    period: "Jan 2025 – Dec 2025",
    status: "Completed",
    statusColor: "#5856d6",
    color: "#5856d6",
    bullets: [
      "Grew platform to 500+ active users; built cross-platform app with React Native, reducing load times by 25% via code splitting and lazy loading.",
      "Engineered real-time matchmaking backend with Node.js, MongoDB, and Socket.io supporting 500+ concurrent users at 99.5% uptime.",
      "Designed end-to-end UX flows and high-fidelity Figma prototypes; implemented GraphQL API for music preference matching and user discovery.",
    ],
  },
];

const CERTIFICATES = [
  { name: "Meta Front-End Developer Professional Certificate", issuer: "Coursera", year: "2025" },
  { name: "Google UX Design Professional Certificate", issuer: "Coursera", year: "2025" },
  { name: "Meta React Native Specialization", issuer: "Coursera", year: "2024" },
];

/* ─── NAV ─────────────────────────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 52,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 max(24px, calc((100vw - 860px)/2))",
      background: scrolled ? "rgba(250,250,250,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
      transition: "all 0.3s ease",
    }}>
      <a href="#" style={{ fontSize: 17, fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.02em", textDecoration: "none" }}>
        Rishabh Joshi
      </a>
      <ul style={{ display: "flex", gap: 4, listStyle: "none" }}>
        {NAV_LINKS.map(l => (
          <li key={l.label}>
            <a href={l.href} style={{
              display: "block", padding: "5px 14px",
              fontSize: 13, fontWeight: 500, color: "#424245",
              textDecoration: "none", borderRadius: 8,
              transition: "color 0.15s, background 0.15s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1d1d1f"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,0,0,0.05)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#424245"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ─── SECTION WRAPPER ─────────────────────────────────────────────────── */

function Section({ id, number, label, title, children }: {
  id?: string; number: string; label: string; title: string; children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ padding: "80px 0", borderTop: "1px solid #e5e5e7" }}>
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.16em", color: "#a1a1a6", marginBottom: 8 }}>
          {number} — {label}
        </p>
        <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#1d1d1f", lineHeight: 1.1 }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/* ─── CHIP ───────────────────────────────────────────────────────────── */

function Chip({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      fontSize: 11,
      fontWeight: 500,
      borderRadius: 999,
      background: color ? `${color}12` : "#f5f5f7",
      color: color ?? "#6e6e73",
      border: `1px solid ${color ? `${color}25` : "#e5e5e7"}`,
    }}>
      {children}
    </span>
  );
}

/* ─── EXPERIENCE CARD ─────────────────────────────────────────────────── */

function ExpCard({ exp }: { exp: typeof EXPERIENCE[0] }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e5e7",
      borderRadius: 16,
      padding: "28px 32px",
      marginBottom: 16,
      transition: "border-color 0.2s, box-shadow 0.2s",
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = exp.color + "40"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px ${exp.color}10`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e5e7"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#1d1d1f" }}>{exp.company}</span>
          <a href={exp.url} style={{
            fontSize: 11, color: exp.color, textDecoration: "none",
            padding: "2px 8px", borderRadius: 6,
            background: `${exp.color}0e`, border: `1px solid ${exp.color}25`,
            fontWeight: 500,
          }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none"}
          >
            ↗ {exp.urlLabel}
          </a>
        </div>
        <span style={{ fontSize: 12, color: "#a1a1a6", fontWeight: 400, flexShrink: 0 }}>{exp.period}</span>
      </div>

      {/* Role */}
      <p style={{ fontSize: 13, fontWeight: 600, color: "#424245", marginBottom: 4 }}>{exp.role}</p>

      {/* Stack */}
      <p style={{ fontSize: 11, color: "#a1a1a6", fontFamily: "monospace", marginBottom: 20, lineHeight: 1.5 }}>{exp.stack}</p>

      {/* Bullets */}
      <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {exp.bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 12, fontSize: 13.5, color: "#424245", lineHeight: 1.65 }}>
            <span style={{
              flexShrink: 0, marginTop: 9,
              width: 4, height: 4, borderRadius: "50%",
              background: exp.color, opacity: 0.5,
            }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── PROJECT CARD ────────────────────────────────────────────────────── */

function ProjectCard({ proj }: { proj: typeof PROJECTS[0] }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e5e7",
      borderRadius: 16,
      padding: "28px 32px",
      marginBottom: 16,
      transition: "border-color 0.2s, box-shadow 0.2s",
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = proj.color + "40"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px ${proj.color}10`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e5e7"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#1d1d1f" }}>{proj.name}</span>
          <span style={{ fontSize: 12, color: "#6e6e73", fontWeight: 400 }}>{proj.subtitle}</span>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6,
            background: `${proj.statusColor}12`, color: proj.statusColor, border: `1px solid ${proj.statusColor}25`,
          }}>
            {proj.status}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {proj.url !== "#" && (
            <a href={proj.url} style={{ fontSize: 12, color: proj.color, textDecoration: "none", fontWeight: 500 }}>
              ↗ Website
            </a>
          )}
          <span style={{ fontSize: 12, color: "#a1a1a6", flexShrink: 0 }}>{proj.period}</span>
        </div>
      </div>

      <p style={{ fontSize: 13, fontWeight: 600, color: "#424245", marginBottom: 4 }}>{proj.role}</p>
      <p style={{ fontSize: 11, color: "#a1a1a6", fontFamily: "monospace", marginBottom: 20, lineHeight: 1.5 }}>{proj.stack}</p>

      <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {proj.bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 12, fontSize: 13.5, color: "#424245", lineHeight: 1.65 }}>
            <span style={{
              flexShrink: 0, marginTop: 9,
              width: 4, height: 4, borderRadius: "50%",
              background: proj.color, opacity: 0.5,
            }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────────────────── */

export default function Portfolio() {
  return (
    <>
      <Nav />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 max(24px, 40px)" }}>

        {/* ── HERO ───────────────────────────────────────────────────── */}
        <section style={{ paddingTop: 120, paddingBottom: 80 }}>

          {/* Available badge */}
          <div className="fade-in fade-in-1" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            marginBottom: 28, padding: "5px 14px",
            borderRadius: 999, border: "1px solid #d2d2d7",
            background: "#fff", fontSize: 12, fontWeight: 500, color: "#424245",
          }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#34c759", flexShrink: 0 }} />
            Available for opportunities
          </div>

          {/* Name */}
          <h1 className="fade-in fade-in-2" style={{
            fontSize: "clamp(48px, 8vw, 88px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            color: "#1d1d1f",
            marginBottom: 10,
          }}>
            Rishabh Joshi
          </h1>

          {/* Title */}
          <p className="fade-in fade-in-3" style={{
            fontSize: "clamp(18px, 2.5vw, 24px)",
            fontWeight: 400,
            color: "#6e6e73",
            letterSpacing: "-0.01em",
            marginBottom: 28,
          }}>
            Full-Stack Developer · SaaS Builder · Product Engineer
          </p>

          {/* Summary */}
          <p className="fade-in fade-in-4" style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: "#424245",
            maxWidth: 560,
            marginBottom: 40,
            fontWeight: 400,
          }}>
            Product-focused full-stack developer experienced in shipping fast, scalable SaaS features with React, Next.js, and Node.js.
            Strong in building real-time systems, AI-powered features, and production-ready applications.
          </p>

          {/* Contacts */}
          <div className="fade-in fade-in-5" style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px", marginBottom: 48 }}>
            {[
              { label: "xojoshirishabh@gmail.com", href: "mailto:xojoshirishabh@gmail.com" },
              { label: "+91 98918 23495", href: "tel:+919891823495" },
              { label: "Portfolio", href: "#" },
              { label: "GitHub", href: "https://github.com" },
              { label: "LinkedIn", href: "https://linkedin.com" },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{
                fontSize: 13, fontWeight: 500, color: "#0071e3",
                textDecoration: "none", display: "flex", alignItems: "center", gap: 4,
              }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none"}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { value: "3+", label: "Years shipping" },
              { value: "10K+", label: "Records handled" },
              { value: "500+", label: "Active users" },
              { value: "99.5%", label: "Uptime maintained" },
            ].map(s => (
              <div key={s.label} style={{
                background: "#fff", border: "1px solid #e5e5e7",
                borderRadius: 12, padding: "14px 20px", minWidth: 108,
                transition: "border-color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#0071e3"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e5e7"}
              >
                <p style={{ fontSize: 22, fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: 11, color: "#a1a1a6", marginTop: 4, fontWeight: 400 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ─────────────────────────────────────────────── */}
        <Section id="experience" number="01" label="Career" title="Work Experience">
          {EXPERIENCE.map(exp => <ExpCard key={exp.company} exp={exp} />)}
        </Section>

        {/* ── PROJECTS ───────────────────────────────────────────────── */}
        <Section id="projects" number="02" label="Selected Work" title="Projects">
          {PROJECTS.map(proj => <ProjectCard key={proj.name} proj={proj} />)}
        </Section>

        {/* ── SKILLS ─────────────────────────────────────────────────── */}
        <Section id="skills" number="03" label="Capabilities" title="Skills">
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {SKILLS.map(group => (
              <div key={group.label} style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ width: 120, flexShrink: 0 }}>
                  <p style={{
                    fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.1em", color: group.color,
                    paddingTop: 6,
                  }}>
                    {group.label}
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
                  {group.items.map(skill => (
                    <span key={skill} style={{
                      padding: "5px 13px",
                      fontSize: 13,
                      borderRadius: 8,
                      background: "#fff",
                      color: "#424245",
                      border: "1px solid #e5e5e7",
                      fontWeight: 400,
                      transition: "border-color 0.15s, color 0.15s, background 0.15s",
                      cursor: "default",
                    }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLSpanElement;
                        el.style.borderColor = group.color + "50";
                        el.style.background = group.color + "08";
                        el.style.color = group.color;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLSpanElement;
                        el.style.borderColor = "#e5e5e7";
                        el.style.background = "#fff";
                        el.style.color = "#424245";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── EDUCATION ──────────────────────────────────────────────── */}
        <Section id="education" number="04" label="Background" title="Education & Certificates">
          {/* University */}
          <div style={{
            background: "#fff", border: "1px solid #e5e5e7",
            borderRadius: 16, padding: "28px 32px", marginBottom: 24,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 8 }}>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#1d1d1f" }}>Dronacharya College of Engineering</p>
                <p style={{ fontSize: 13, color: "#6e6e73", marginTop: 3 }}>
                  B.Tech in Computer Science and Engineering
                </p>
              </div>
              <span style={{ fontSize: 12, color: "#a1a1a6", flexShrink: 0, fontWeight: 400 }}>Sept 2022 – Present</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
              <span style={{
                fontSize: 12, fontWeight: 600, color: "#0071e3",
                background: "#0071e312", border: "1px solid #0071e325",
                borderRadius: 6, padding: "3px 10px",
              }}>
                GPA: 7.5 / 10
              </span>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "#a1a1a6", marginBottom: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>Coursework</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["DSA", "DBMS", "OOP", "Networking", "Operating Systems"].map(c => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </div>
          </div>

          {/* Certificates */}
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a1a1a6", marginBottom: 16 }}>
            Certifications
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CERTIFICATES.map((cert, i) => (
              <div key={i} style={{
                background: "#fff", border: "1px solid #e5e5e7",
                borderRadius: 12, padding: "16px 20px",
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                transition: "border-color 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#0071e360"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e5e7"}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#1d1d1f", lineHeight: 1.4 }}>{cert.name}</p>
                  <p style={{ fontSize: 12, color: "#a1a1a6", marginTop: 3 }}>{cert.issuer}</p>
                </div>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: "#0071e3",
                  flexShrink: 0, background: "#0071e310",
                  border: "1px solid #0071e320", borderRadius: 6, padding: "2px 8px",
                }}>
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── FOOTER ─────────────────────────────────────────────────── */}
        <footer style={{
          borderTop: "1px solid #e5e5e7",
          padding: "40px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.01em" }}>Rishabh Joshi</p>
            <p style={{ fontSize: 12, color: "#a1a1a6", marginTop: 2 }}>Full-Stack Developer · Available for opportunities</p>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "GitHub", href: "https://github.com" },
              { label: "LinkedIn", href: "https://linkedin.com" },
              { label: "Email", href: "mailto:xojoshirishabh@gmail.com" },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{ fontSize: 13, color: "#6e6e73", textDecoration: "none", fontWeight: 400 }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#0071e3"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#6e6e73"}
              >
                {label}
              </a>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#a1a1a6" }}>© {new Date().getFullYear()} · Built with Next.js</p>
        </footer>

      </div>
    </>
  );
}
