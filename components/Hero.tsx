"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const socials = [
  { label: "GitHub",   href: "https://github.com/rishabhzenra",                   Icon: SiGithub   },
  { label: "LinkedIn", href: "https://linkedin.com/in/rishabh-joshi-6924a8354",   Icon: FaLinkedin },
  { label: "Twitter",  href: "https://twitter.com/rishabhjoshi",                  Icon: SiX        },
  { label: "Email",    href: "mailto:xojoshirishabh@gmail.com",                   Icon: FaEnvelope },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = wrapRef.current ? Array.from(wrapRef.current.querySelectorAll(".reveal")) : [];
      gsap.fromTo(items,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power2.out", delay: 0.1 }
      );
      gsap.to(sectionRef.current, {
        opacity: 0.2, yPercent: -4, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "70% top", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 60, zIndex: 1 }}>
      <div style={{ position: "absolute", top: "20%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,111,234,0.07) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />

      <div ref={wrapRef} className="hero-wrap" style={{ maxWidth: 860, margin: "0 auto", padding: "0 48px", width: "100%" }}>

        {/* Name */}
        <h1 className="reveal" style={{ fontSize: "clamp(44px, 8vw, 96px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.0, color: "#E8E6F0", marginBottom: 16, opacity: 0 }}>
          Rishabh Joshi
        </h1>

        {/* Role */}
        <div className="reveal" style={{ marginBottom: 24, opacity: 0 }}>
          <span style={{
            fontSize: "clamp(18px, 2.6vw, 28px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            background: "linear-gradient(90deg, #a78bfa 0%, #7C6FEA 50%, #c4b5fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            <span className="ai-gradient">AI</span>{" "}Product Engineer &amp; Manager
          </span>
        </div>

        {/* Summary */}
        <p className="reveal" style={{ fontSize: 16, lineHeight: 1.9, color: "#6B6585", maxWidth: 640, marginBottom: 40, fontWeight: 400, opacity: 0 }}>
          I don&apos;t just build for the sake of it, I build things people actually use. I move fast, figure things out, and turn ideas into real products that deliver value. Always learning, always shipping, never waiting.
        </p>

        {/* CTA buttons */}
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, opacity: 0 }}>
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ height: 38, display: "inline-flex", alignItems: "center", gap: 7, padding: "0 20px", fontSize: 13, fontWeight: 600, color: "#0a0a0e", textDecoration: "none", borderRadius: 8, background: "#ffffff", transition: "opacity 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
          >
            See what I&apos;ve built
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </a>
        </div>

        {/* Available line */}
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 32, marginBottom: 52, opacity: 0 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 10px rgba(34,197,94,0.8)", flexShrink: 0 }} className="pulse-dot" />
          <a href="https://backlinkos.io" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#4ade80", fontWeight: 500, textDecoration: "none" }}>Available to solve your problems</a>
        </div>

        {/* Socials */}
        <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: -36, opacity: 0 }}>
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, border: "1px solid rgba(255,255,255,0.28)", color: "#ffffff", textDecoration: "none", opacity: 0.6, transition: "opacity 0.18s, border-color 0.18s, background 0.18s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "1"; el.style.borderColor = "rgba(255,255,255,0.55)"; el.style.background = "rgba(255,255,255,0.07)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "0.6"; el.style.borderColor = "rgba(255,255,255,0.28)"; el.style.background = "transparent"; }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>


      </div>

    </section>
  );
}
