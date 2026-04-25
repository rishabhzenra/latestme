"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const education = {
  school: "Dronacharya College of Engineering",
  degree: "B.Tech in Computer Science and Engineering",
  period: "Sept 2022 – Present",
  gpa: "7.5 / 10",
  coursework: ["DSA", "DBMS", "OOP", "Networking", "Operating Systems"],
};

const certificates = [
  { name: "Meta Front-End Developer Professional Certificate", issuer: "Coursera · Meta", year: "2025" },
  { name: "Google UX Design Professional Certificate", issuer: "Coursera · Google", year: "2025" },
  { name: "Meta React Native Specialization", issuer: "Coursera · Meta", year: "2024" },
];

export default function Education() {
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

      sectionRef.current?.querySelectorAll(".fade-up").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ maxWidth: 860, margin: "0 auto", padding: "96px 40px", position: "relative", zIndex: 1 }}
    >
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 64 }} />

      <div className="section-header" style={{ marginBottom: 56, opacity: 0 }}>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(124,111,234,0.5)", marginBottom: 10 }}>04 — Background</p>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#E8E6F0" }}>Education</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div
          className="fade-up"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: 24,
            opacity: 0,
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(124,111,234,0.5)", marginBottom: 20 }}>University</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#E8E6F0" }}>{education.school}</p>
          <p style={{ fontSize: 13, color: "#6B6880", marginTop: 4 }}>{education.degree}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
            <span style={{ fontSize: 11, color: "#5A5470" }}>{education.period}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#7C6FEA" }}>GPA {education.gpa}</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            {education.coursework.map((c) => (
              <span
                key={c}
                style={{ padding: "2px 10px", fontSize: 11, borderRadius: 999, color: "#5A5470", background: "rgba(124,111,234,0.07)", border: "1px solid rgba(124,111,234,0.15)" }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(124,111,234,0.5)", marginBottom: 20 }}>Certificates</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {certificates.map((cert, i) => (
              <div
                key={i}
                className="fade-up"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                  opacity: 0,
                  transition: "border-color 0.18s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,111,234,0.3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#E8E6F0", lineHeight: 1.4 }}>{cert.name}</p>
                  <p style={{ fontSize: 11, color: "#5A5470", marginTop: 3 }}>{cert.issuer}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(124,111,234,0.5)", flexShrink: 0 }}>{cert.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
