"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experiences = [
  {
    company: "BacklinkOS",
    role: "Product Engineer",
    period: "Dec 2025 – Present",
    stack: "React · Next.js · Node.js · Supabase · Clerk · Razorpay · PostHog",
    bullets: [
      "Built and scaled an SEO and backlink tracking SaaS handling 10,000+ backlink records with real-time domain monitoring and sub-500ms query response times.",
      "Engineered auth and subscription flows with Clerk and Razorpay for secure multi-tenant access; integrated PostHog analytics and AI-powered backlink discovery.",
      "Managed Supabase (PostgreSQL) schema design, RLS policies, and real-time subscriptions; maintained 99%+ uptime with CI/CD pipelines reducing deployment time by 40%.",
    ],
  },
  {
    company: "BSES Rajdhani Power Limited",
    role: "Fullstack Developer Intern",
    period: "Jun 2024 – Jul 2024",
    stack: "React.js · Node.js · PostgreSQL · REST APIs · Infrastructure Monitoring",
    bullets: [
      "Engineered internal systems and website features supporting enterprise infrastructure for 10,000+ users.",
      "Built and optimized backend APIs with PostgreSQL, reducing response times by 12% and cutting downtime incidents by 20%.",
      "Diagnosed and resolved network connectivity issues across distributed infrastructure, improving reliability and reducing escalation tickets.",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      sectionRef.current?.querySelectorAll(".fade-up").forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} style={{ position: "relative", maxWidth: 860, margin: "0 auto", padding: "96px 40px", zIndex: 1 }}>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 64 }} />

      <div className="fade-up" style={{ marginBottom: 56, opacity: 0 }}>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(124,111,234,0.5)", marginBottom: 10 }}>01 — Career</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#E8E6F0" }}>Work Experience</h2>
      </div>

      <div style={{ position: "relative", paddingLeft: 24 }}>
        <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 1, background: "rgba(124,111,234,0.18)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
          {experiences.map((exp) => (
            <div key={exp.company} className="fade-up" style={{ position: "relative", opacity: 0 }}>
              <div style={{ position: "absolute", left: -28, top: 6, width: 9, height: 9, borderRadius: "50%", background: "#7C6FEA", border: "2px solid #0B0B0F", boxShadow: "0 0 0 3px rgba(124,111,234,0.18)" }} />
              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#E8E6F0" }}>{exp.company}</p>
                  <p style={{ fontSize: 11, color: "#5A5470", marginTop: 4 }}>{exp.period}</p>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#E8E6F0", marginBottom: 6 }}>{exp.role}</p>
                  <p style={{ fontSize: 11, color: "rgba(124,111,234,0.5)", fontFamily: "monospace", marginBottom: 16 }}>{exp.stack}</p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 14, color: "#6B6880", lineHeight: 1.65, display: "flex", gap: 10 }}>
                        <span style={{ marginTop: 7, flexShrink: 0, width: 4, height: 4, borderRadius: "50%", background: "rgba(124,111,234,0.3)" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
