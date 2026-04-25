"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, Zap, TrendingUp, Users, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    name: "BacklinkOS",
    tagline: "SEO & Backlink Intelligence Platform",
    period: "Dec 2025 – Present",
    status: "Live",
    stack: ["Next.js", "Node.js", "Supabase", "PostgreSQL", "Clerk", "Razorpay", "PostHog", "pgvector"],
    summary: "A production SaaS giving SEO professionals a real-time command center for tracking, analyzing, and discovering backlinks across any domain.",
    metrics: [{ icon: Zap, label: "<500ms", sub: "queries" }, { icon: TrendingUp, label: "99%+", sub: "uptime" }, { icon: Users, label: "10K+", sub: "records" }, { icon: Clock, label: "40%", sub: "faster CI" }],
    accent: "#7C6FEA",
    caseStudy: {
      origin: "I was doing SEO for my own projects and every decent backlink tracking tool started at $200/month. They were bloated, slow, and not built for solo developers. I built the tool I actually wanted.",
      problem: "SEO teams managed backlink audits through spreadsheets and fragmented reports. No single platform could monitor thousands of backlinks in real time, flag toxic links, or surface new opportunities — while keeping multi-user teams in sync.",
      architecture: "Multi-tenant Supabase with row-level security (RLS) isolating each workspace at the database layer. A Vercel cron job crawls backlink status every 24 hours and pushes deltas via Supabase Realtime. pgvector powers AI similarity search for link-building discovery.",
      challenges: ["Crawler reliability at scale — HTTP timeouts, rate limiting, and deduplication across 10K+ records required a queue with exponential backoff.", "Designing RLS policies that are both secure and performant. Naive policies cause full table scans — partial indexes on (workspace_id, domain, status) solved this.", "Razorpay webhook reliability — idempotency keys on every subscription event prevented double-processing during retries."],
      engineering: ["PostgreSQL partial indexes on domain + status kept query times under 500ms — no caching layer needed.", "Clerk handled auth and org management; webhooks sync user state to Supabase with <100ms lag.", "CI/CD: GitHub Actions → Vercel preview deploys with Supabase branch environments — every PR gets its own isolated database.", "PostHog funnels showed 60% of users dropped before adding their first domain — one onboarding redesign cut churn by 18%."],
      outcome: "99%+ uptime since launch. CI/CD cut deployment time by 40%. Live at backlinkos.io with paying subscribers across India and South-East Asia.",
    },
  },
  {
    name: "Savora",
    tagline: "Expense Intelligence for Individuals",
    period: "Jan 2026 – Present",
    status: "Live",
    stack: ["Next.js 15", "NestJS", "PostgreSQL", "Neon DB", "Vercel", "Render", "Recharts", "JWT"],
    summary: "A serverless expense manager that turns raw transaction data into clear monthly insights with sub-200ms dashboards and smart category breakdowns.",
    metrics: [{ icon: Zap, label: "<200ms", sub: "dashboard" }, { icon: TrendingUp, label: "Zero", sub: "incidents" }, { icon: Users, label: "Branch", sub: "per-PR DBs" }, { icon: Clock, label: "15min", sub: "token TTL" }],
    accent: "#059669",
    caseStudy: {
      origin: "I was using three different apps to track expenses and still couldn't figure out where my money went. Most expense apps are either overwhelming accounting tools or glorified notes. I wanted something fast, clear, and actually smart.",
      problem: "People needed expense tracking that categorized spending automatically, surfaced trends without manual effort, and loaded instantly — not after a 3-second spinner.",
      architecture: "NestJS API on Render — module system maps to domain boundaries (expenses, categories, reports, auth). Neon serverless PostgreSQL with connection pooling. Next.js 15 App Router with React Server Components for edge-fetched data. Vercel handles the frontend with edge caching.",
      challenges: ["Smart categorization without expensive AI API calls — solved with a keyword-matching rule engine handling 90% of cases.", "Neon branch-per-PR workflow setup took a full day but eliminated an entire class of migration bugs.", "JWT refresh rotation: balancing short-lived access tokens with good UX required careful HttpOnly cookie + server state management."],
      engineering: ["Edge caching on Next.js 15 route handlers reduced dashboard TTFB from ~800ms to under 200ms, measured on cold start.", "JWT: HttpOnly refresh tokens server-side, access tokens rotated every 15 minutes — OWASP compliant.", "Recharts dashboard renders monthly breakdowns, category rings, YoY comparisons — driven by a single PostgreSQL aggregation query with window functions.", "Neon DB branch-per-PR: PRs get isolated DB branches, migrations run automatically, branches tear down on merge."],
      outcome: "Sub-200ms dashboard loads on cold start. Zero production incidents. Branch workflow eliminated migration-related bugs entirely. Rule engine classifies 90%+ of entries with zero AI cost.",
    },
  },
  {
    name: "Zenra",
    tagline: "Connect Through Music",
    period: "Jan 2025 – Dec 2025",
    status: "Completed",
    stack: ["React Native", "Node.js", "MongoDB", "Firebase", "GraphQL", "Socket.io", "Redis", "Expo"],
    summary: "A cross-platform social app matching people based on music taste — real-time chat, listening sessions, and a GraphQL-powered discovery engine.",
    metrics: [{ icon: Users, label: "500+", sub: "active users" }, { icon: TrendingUp, label: "99.5%", sub: "uptime" }, { icon: Zap, label: "3×", sub: "session length" }, { icon: Clock, label: "<80ms", sub: "discovery" }],
    accent: "#DB2777",
    caseStudy: {
      origin: "I met a stranger on a flight who loved the same obscure post-rock band. That conversation was better than any app-facilitated introduction. Music taste is a deep compatibility signal — no app was using it as the primary one.",
      problem: "Generic apps match on superficial filters. Music is a stronger signal — genre preferences, artist affinities, and mood tags correlate strongly with personality. The challenge was building matching that felt instant and personal, not algorithmic.",
      architecture: "GraphQL API on Apollo Server — its type system was perfect for complex nested user-preference data. Socket.io for real-time matches and chat. React Native + Expo for cross-platform mobile. MongoDB for flexible taste profile documents. Redis for caching similarity scores. Firebase Cloud Messaging for push notifications.",
      challenges: ["Taste vector similarity algorithm — needed to balance accuracy (cosine similarity on genre/artist embeddings) with latency. Redis caching with 1-hour TTL solved it.", "500+ concurrent Socket.io connections stressed the Node.js event loop at launch — migrated to sticky sessions and horizontal scaling with a Redis adapter.", "React Native cross-platform consistency — several components behaved differently on iOS vs Android, especially the audio visualizer."],
      engineering: ["Taste vector: each user's history is reduced to a 64-dimensional vector across genre, tempo, energy, artist affinity. Similarity scores pre-computed as background job, cached in Redis.", "Socket.io rooms scoped to matched pairs only — message delivery is O(1) regardless of active users.", "MongoDB aggregation pipelines power the discovery feed. Compound indexes on (genre, location) kept queries under 80ms at 500+ users.", "GraphQL persisted queries reduced mobile API payload by 40% — critical for 4G users.", "Code splitting and lazy loading cut bundle from 4.2MB to 2.9MB, reducing cold start by 25%."],
      outcome: "500+ active users. 99.5% uptime under 500 concurrent socket connections. Session length 3× higher than initial target. Music-first thesis proved out.",
    },
  },
];

function CaseStudyModal({ project, onClose }: { project: (typeof projects)[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full max-h-[88vh] overflow-y-auto rounded-2xl"
        style={{ background: "#141418", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 px-7 py-5 flex items-start justify-between"
          style={{
            background: "rgba(20,20,24,0.95)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h3 className="text-xl font-black" style={{ color: "#E8E6F0" }}>
                {project.name}
              </h3>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}40` }}
              >
                {project.status}
              </span>
            </div>
            <p className="text-sm" style={{ color: "#5A5470" }}>{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors"
            style={{ color: "#5A5470" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-7 py-6 space-y-7">
          <div className="grid grid-cols-4 gap-2.5">
            {project.metrics.map(({ icon: Icon, label, sub }) => (
              <div
                key={sub}
                className="text-center rounded-xl py-3"
                style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
              >
                <Icon size={13} style={{ color: project.accent, margin: "0 auto 4px" }} />
                <p className="text-sm font-bold" style={{ color: "#E8E6F0" }}>{label}</p>
                <p className="text-xs" style={{ color: "#5A5470" }}>{sub}</p>
              </div>
            ))}
          </div>

          {[
            { label: "Origin Story", content: `"${project.caseStudy.origin}"`, italic: true },
            { label: "The Problem", content: project.caseStudy.problem },
            { label: "Architecture", content: project.caseStudy.architecture },
          ].map(({ label, content, italic }) => (
            <div key={label}>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: `${project.accent}80` }}>{label}</p>
              <p
                className={`text-sm leading-relaxed ${italic ? "pl-4" : ""}`}
                style={{
                  color: "#6B6880",
                  fontStyle: italic ? "italic" : "normal",
                  borderLeft: italic ? `2px solid ${project.accent}40` : "none",
                }}
              >
                {content}
              </p>
            </div>
          ))}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: `${project.accent}80` }}>Hard Problems</p>
            <div className="space-y-2">
              {project.caseStudy.challenges.map((c, i) => (
                <div
                  key={i}
                  className="flex gap-3 text-sm rounded-xl px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#6B6880" }}
                >
                  <span className="shrink-0 font-bold" style={{ color: project.accent }}>{i + 1}.</span>
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: `${project.accent}80` }}>Engineering Decisions</p>
            <ul className="space-y-2">
              {project.caseStudy.engineering.map((e, i) => (
                <li key={i} className="text-sm flex gap-3" style={{ color: "#6B6880" }}>
                  <span style={{ marginTop: 8, flexShrink: 0, width: 5, height: 5, borderRadius: "50%", background: `${project.accent}40` }} />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ background: `${project.accent}10`, border: `1px solid ${project.accent}25` }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: `${project.accent}80` }}>Outcome</p>
            <p className="text-sm leading-relaxed" style={{ color: "#E8E6F0" }}>{project.caseStudy.outcome}</p>
          </div>

          <div className="flex flex-wrap gap-2 pb-1">
            {project.stack.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-full"
                style={{ color: "#6B6880", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<(typeof projects)[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelector(".section-header") ?? null,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ maxWidth: 860, margin: "0 auto", padding: "96px 40px", position: "relative", zIndex: 1 }}
    >
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 64 }} />

      <div className="section-header" style={{ marginBottom: 56, opacity: 0 }}>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(124,111,234,0.5)", marginBottom: 10 }}>02 — Selected Work</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#E8E6F0" }}>Projects</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {projects.map((project, i) => (
          <div
            key={project.name}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            onClick={() => setActive(project)}
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "24px 28px",
              cursor: "pointer",
              opacity: 0,
              transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${project.accent}40`;
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${project.accent}18`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: "#E8E6F0" }}>{project.name}</h3>
                  <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 999, fontWeight: 500, background: `${project.accent}18`, color: project.accent, border: `1px solid ${project.accent}35` }}>
                    {project.status}
                  </span>
                  <span style={{ fontSize: 11, color: "#3A3650" }}>{project.period}</span>
                </div>
                <p style={{ fontSize: 13, color: "#5A5470", marginBottom: 8 }}>{project.tagline}</p>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#6B6880", marginBottom: 16 }}>{project.summary}</p>

                <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 14 }}>
                  {project.metrics.map(({ label, sub }) => (
                    <div key={sub} style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: project.accent }}>{label}</span>
                      <span style={{ fontSize: 11, color: "#5A5470" }}>{sub}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {project.stack.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      style={{ padding: "2px 10px", fontSize: 11, borderRadius: 999, color: "#5A5470", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      {t}
                    </span>
                  ))}
                  {project.stack.length > 6 && (
                    <span style={{ padding: "2px 10px", fontSize: 11, borderRadius: 999, color: "#3A3650" }}>+{project.stack.length - 6}</span>
                  )}
                </div>
              </div>

              <ArrowUpRight size={16} style={{ color: "#3A3650", flexShrink: 0, marginTop: 4 }} />
            </div>

            <p style={{ fontSize: 11, marginTop: 16, display: "flex", alignItems: "center", gap: 8, color: "#3A3650" }}>
              <span style={{ width: 16, height: 1, background: "currentColor", display: "inline-block" }} />
              Read full case study
            </p>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
