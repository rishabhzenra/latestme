"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Home",       id: "home"       },
  { label: "About",      id: "about"      },
  { label: "Skills",     id: "skills"     },
  { label: "Experience", id: "experience" },
  { label: "Projects",   id: "projects"   },
];

export default function Nav() {
  const [activeId, setActiveId]       = useState("home");
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY < 200) { setActiveId("home"); return; }
      const ids = links.map(l => l.id).filter(id => id !== "home");
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 100) { setActiveId(ids[i]); return; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      setActiveId("home");
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
    window.history.pushState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingLeft: "clamp(20px, 4vw, 48px)", paddingRight: "clamp(20px, 4vw, 48px)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        background: scrolled ? "rgba(14,14,18,0.75)" : "rgba(10,10,14,0.03)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}>

        {/* Logo */}
        <a href="/" onClick={e => handleLink(e, "home")} style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#E8E6F0", letterSpacing: "0.15em", userSelect: "none" }}>RJ</span>
        </a>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {links.map(l => {
            const isActive = activeId === l.id;
            return (
              <a key={l.id} href={l.id === "home" ? "/" : `#${l.id}`} onClick={e => handleLink(e, l.id)}
                style={{ height: 32, display: "inline-flex", alignItems: "center", padding: "0 14px", fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#E8E6F0" : "#4A4660", textDecoration: "none", borderRadius: 6, whiteSpace: "nowrap", background: isActive ? "rgba(255,255,255,0.06)" : "transparent", transition: "color 0.15s, background 0.15s" }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "#9B95B0"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "#4A4660"; }}
              >{l.label}</a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <a
            href="/resumemain.pdf"
            download
            style={{ height: 34, display: "inline-flex", alignItems: "center", gap: 7, padding: "0 16px", fontSize: 13, fontWeight: 600, color: "#0a0a0e", borderRadius: 8, background: "#ffffff", whiteSpace: "nowrap", textDecoration: "none", transition: "opacity 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            Download Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="nav-mobile" onClick={() => setMenuOpen(v => !v)}
          style={{ display: "none", flexDirection: "column", gap: 5, background: "transparent", border: "none", cursor: "pointer", padding: 6 }}
        >
          <span style={{ width: 22, height: 2, background: "#E8E6F0", borderRadius: 2, display: "block", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ width: 22, height: 2, background: "#E8E6F0", borderRadius: 2, display: "block", transition: "opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 22, height: 2, background: "#E8E6F0", borderRadius: 2, display: "block", transition: "transform 0.2s, opacity 0.2s", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 60, left: 0, right: 0, zIndex: 998, background: "rgba(11,11,15,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "16px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {links.map(l => (
            <a key={l.id} href={l.id === "home" ? "/" : `#${l.id}`} onClick={e => handleLink(e, l.id)}
              style={{ padding: "12px 8px", fontSize: 15, fontWeight: activeId === l.id ? 700 : 400, color: activeId === l.id ? "#E8E6F0" : "#6B6585", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >{l.label}</a>
          ))}
          <a href="/resumemain.pdf" download
            style={{ marginTop: 12, height: 42, borderRadius: 8, background: "#ffffff", color: "#0a0a0e", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
          >Resume</a>
        </div>
      )}

    </>
  );
}
