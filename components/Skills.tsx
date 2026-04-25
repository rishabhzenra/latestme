"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skillGroups = [
  { label: "Frontend", color: "#7C6FEA", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Hook Form"] },
  { label: "Backend", color: "#059669", skills: ["Node.js", "Express", "NestJS", "REST APIs", "WebSockets", "GraphQL", "JWT / OAuth"] },
  { label: "Databases", color: "#DB2777", skills: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase", "Neon DB"] },
  { label: "Mobile", color: "#D97706", skills: ["React Native", "Expo", "Android & iOS"] },
  { label: "Tools & DevOps", color: "#0891B2", skills: ["Git", "GitHub Actions", "Docker", "AWS", "Vercel", "Render", "Sentry", "Postman", "Jest"] },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

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

      const groups = sectionRef.current?.querySelectorAll(".skill-group");
      groups?.forEach((group, gi) => {
        const pills = group.querySelectorAll(".skill-pill");
        gsap.fromTo(
          pills,
          { opacity: 0, y: -20, scale: 0.85 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "elastic.out(1, 0.7)",
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
            delay: gi * 0.08,
          }
        );

        gsap.fromTo(
          group.querySelector(".group-label"),
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
            delay: gi * 0.08,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ maxWidth: 860, margin: "0 auto", padding: "96px 40px", position: "relative", zIndex: 1 }}
    >
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 64 }} />

      <div className="section-header" style={{ marginBottom: 56, opacity: 0 }}>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(124,111,234,0.5)", marginBottom: 10 }}>03 — Capabilities</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#E8E6F0" }}>Skills</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 40 }}>
        {skillGroups.map((group) => (
          <div key={group.label} className="skill-group">
            <p
              className="group-label"
              style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: group.color, marginBottom: 16, opacity: 0 }}
            >
              {group.label}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-pill"
                  style={{
                    padding: "5px 14px",
                    fontSize: 13,
                    borderRadius: 999,
                    cursor: "default",
                    color: "#6B6880",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    opacity: 0,
                    transition: "color 0.18s, border-color 0.18s, background 0.18s, transform 0.18s, box-shadow 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.color = group.color;
                    el.style.borderColor = `${group.color}40`;
                    el.style.background = `${group.color}0E`;
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = `0 4px 16px ${group.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.color = "#6B6880";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.background = "rgba(255,255,255,0.04)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
