"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

function RevealSection({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("in-view"); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className="reveal-up">{children}</div>;
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "Overview" | "Experience" | "Projects" | "Case Studies" | "Interests";
const TABS: Tab[] = ["Overview", "Experience", "Projects", "Case Studies", "Interests"];

// ─── Data ────────────────────────────────────────────────────────────────────

const skills = [
  { cat: "Frontend",   tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Hook Form"] },
  { cat: "Backend",    tags: ["Node.js", "Express", "NestJS", "GraphQL", "REST APIs", "WebSockets", "JWT", "OAuth"] },
  { cat: "Databases",  tags: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Firebase", "Neon DB"] },
  { cat: "Mobile",     tags: ["React Native", "Expo"] },
  { cat: "DevOps",     tags: ["Docker", "AWS", "Vercel", "Render", "GitHub Actions", "Sentry", "Jest"] },
  { cat: "Soft Skills", tags: ["Product Mapping", "Product Thinking", "Fast Development", "Communication"] },
];

const experience = [
  {
    company: "BacklinkOS",
    role: "Product Engineer",
    period: "Dec 2025 – Present",
    type: "Full-time",
    liveUrl: "https://backlinkos.io",
    certUrl: null,
    tags: ["React", "Next.js", "Supabase", "Clerk", "Razorpay", "PostHog"],
    bullets: [
      "Built and scaled an SEO and backlink tracking SaaS handling 10,000+ records with real-time domain monitoring and sub-500ms query response times.",
      "Engineered auth and subscription flows with Clerk and Razorpay for secure multi-tenant access; integrated PostHog analytics and AI-powered search.",
      "Managed PostgreSQL schema design, RLS policies, and real-time subscriptions; 99%+ uptime with CI/CD pipelines reducing deployment time by 40%.",
    ],
  },
  {
    company: "BSES Rajdhani Power Limited",
    role: "Fullstack Developer Intern",
    period: "Jun – Jul 2024",
    type: "Internship",
    liveUrl: null,
    certUrl: "https://drive.google.com/uc?export=view&id=1-I2rNV0-GJipGniAdmPLpRqeoN_LEtam",
    tags: ["React.js", "Node.js", "PostgreSQL", "REST APIs"],
    bullets: [
      "Engineered internal systems and website features supporting enterprise infrastructure for 10,000+ users.",
      "Built and optimised backend APIs with PostgreSQL, reducing response times by 12% and downtime incidents by 20%.",
      "Diagnosed and resolved network connectivity issues across distributed infrastructure, improving reliability and reducing escalation tickets.",
    ],
  },
];

const projects = [
  {
    name: "Savora",
    subtitle: "Expense Manager",
    period: "Jan 2026 – Present",
    tags: ["Next.js 15", "NestJS", "PostgreSQL", "Neon DB", "Vercel", "Render"],
    liveUrl: "https://expense-front-eight.vercel.app",
    githubUrl: null,
    bullets: [
      "Serverless backend with NestJS and Neon PostgreSQL; sub-200ms dashboard load via edge caching and automated CI/CD pipelines.",
      "Secure JWT authentication with full environment variable management across staging and production.",
      "Real-time expense tracking with category breakdowns, monthly summaries, and Recharts analytics dashboard.",
    ],
  },
  {
    name: "Zenra",
    subtitle: "Music-Based Connection App",
    period: "Jan – Dec 2025",
    tags: ["React Native", "Node.js", "MongoDB", "Firebase", "GraphQL", "Socket.io"],
    liveUrl: "https://www.zenraapp.com",
    githubUrl: null,
    bullets: [
      "Grew to 500+ active users; reduced load times by 25% via code splitting and lazy loading across a cross-platform React Native app.",
      "Real-time matchmaking engine with Socket.io supporting 500+ concurrent users at 99.5% uptime.",
      "GraphQL API for music preference matching; end-to-end UX design with high-fidelity Figma prototypes.",
    ],
  },
  {
    name: "Veriplace",
    subtitle: "Location Verification Website",
    period: "Oct 2024 – Dec 2024",
    tags: ["React.js", "Node.js", "Tailwind CSS", "REST APIs", "Geolocation API", "PostgreSQL"],
    liveUrl: null,
    githubUrl: null,
    reportUrl: "https://drive.google.com/file/d/14p049MaK8aKfIWQHJ0fRE9m5zlagjlZn/view",
    bullets: [
      "Created secure UI flows and backend APIs for location verification with cryptographic validation.",
      "Implemented responsive React frontend with PostgreSQL integration for secure data storage.",
      "Enhanced performance, achieving 98.7% spoofing detection accuracy with faster response times.",
    ],
  },
];

const CASE_STUDIES = [
  {
    id: "blockchain",
    tag: "Distributed Systems",
    emoji: "⛓",
    title: "Blockchain: Trust Without a Middleman",
    subtitle: "Why this technology matters more than the hype",
    accent: "#7C6FEA",
    tldr: "Blockchain is not about crypto — it's about removing the need for a trusted third party in any transaction or agreement.",
    sections: [
      { heading: "The Core Problem", body: "Every digital system today relies on a central authority — a bank, a government, a platform — to verify that a transaction happened and wasn't tampered with. This creates single points of failure, censorship risk, and rent-seeking middlemen who charge for being the source of truth. Byzantine Generals' Problem: how do you reach consensus among participants who don't trust each other, with no central coordinator?" },
      { heading: "How Blockchain Solves It", body: "A blockchain is an append-only, cryptographically linked ledger replicated across thousands of nodes. Each block contains a hash of the previous block — mutating any historical record would require recomputing all subsequent blocks and outpacing 51% of the network's compute. Proof-of-Work trades energy for security. Proof-of-Stake trades staked capital — cutting energy use by ~99.95% while maintaining Byzantine fault tolerance." },
      { heading: "Smart Contracts", body: "Ethereum introduced programmable agreements: code that self-executes when conditions are met, with no counterparty risk. A DAO can govern a $1B treasury with no CEO. A DeFi protocol can process $100M in loans with no bank. The attack surface shifts from institutional fraud to code bugs — the 2016 DAO hack exploited a reentrancy vulnerability and drained $60M. Formal verification of smart contracts is now a research frontier." },
      { heading: "Real-World Signal vs. Noise", body: "Strip away speculation: supply chain provenance (Walmart uses Hyperledger to trace food contamination in seconds vs. days), land registries in Georgia and Sweden, cross-border settlement (Ripple cuts SWIFT's 3-5 day window to seconds). Blockchain is a coordination layer for high-stakes systems where trust is expensive. The noise is most of crypto Twitter." },
      { heading: "My Take", body: "The developer in me finds the cryptographic primitives genuinely elegant — Merkle trees, elliptic curve signatures, zero-knowledge proofs. The product thinker in me is skeptical of most blockchain 'solutions' that just add complexity where a Postgres database with good access controls would do. The right question isn't 'can we blockchain this?' — it's 'is decentralisation actually worth the tradeoff?'" },
    ],
  },
  {
    id: "nuclear",
    tag: "Energy Systems",
    emoji: "⚛",
    title: "Nuclear Power: The Math We're Ignoring",
    subtitle: "Why the most energy-dense fuel on Earth is the most misunderstood",
    accent: "#059669",
    tldr: "Nuclear energy produces more electricity per unit of land, materials, and deaths per TWh than almost any other source — including solar and wind. The debate is not scientific, it's political.",
    sections: [
      { heading: "Energy Density Is Everything", body: "One uranium pellet the size of a fingertip contains as much energy as 17,000 cubic feet of natural gas, 1,780 pounds of coal, or 149 gallons of oil. A 1 GW nuclear plant occupies ~1 sq km. To match it with solar, you'd need ~75 sq km of panels plus grid-scale storage. Energy density determines land use, supply chain complexity, and ultimately cost per MWh." },
      { heading: "The Safety Paradox", body: "Deaths per TWh — the only honest metric: Coal 24.6 · Oil 18.4 · Natural Gas 2.8 · Solar 0.02 · Wind 0.04 · Nuclear 0.03. Nuclear has caused fewer deaths per unit of energy produced than almost any other source, including renewables. The perception gap exists because nuclear accidents are spectacular and concentrated; coal deaths are invisible and distributed (air pollution kills 7M+ annually)." },
      { heading: "The Waste Problem and Its Scale", body: "All the high-level nuclear waste ever produced by the US civilian power program would fit inside a Walmart. Deep geological repositories (Finland's Onkalo, now operational) isolate it for 100,000 years. Meanwhile, coal plants emit hundreds of millions of tonnes of CO₂ yearly plus fly ash containing uranium and thorium — released directly into the atmosphere with zero containment." },
      { heading: "Gen IV and SMRs", body: "Small Modular Reactors like NuScale's VOYGR and Rolls-Royce's SMR are factory-built, standardised modules — solving the cost overrun problem of bespoke mega-projects. Molten salt reactors can consume existing nuclear waste as fuel. Thorium reactors offer 3× the energy density of uranium with no weapons-grade byproduct. The 2030s will look very different from the 1970s-era reactors that shaped public opinion." },
      { heading: "My Take", body: "I went in sceptical and came out convinced that Germany's Energiewende — shutting down nuclear and ramping coal — was one of the worst energy policy decisions of the 21st century. If you care about climate, you have to care about baseload. Wind and solar can't do it alone." },
    ],
  },
  {
    id: "drones",
    tag: "Autonomous Systems",
    emoji: "🚁",
    title: "Drones: The Last-Mile Revolution",
    subtitle: "How autonomous aerial systems are reshaping logistics, defence, and agriculture",
    accent: "#D97706",
    tldr: "Drones are not a gadget category — they are a new logistics primitive that collapses geography. Every industry that depends on physical access to a location will be disrupted.",
    sections: [
      { heading: "The Stack", body: "A modern autonomous drone is a systems engineering problem: flight controller (PX4/ArduPilot on STM32), sensor fusion (IMU + GPS + barometer + optical flow), computer vision (YOLO on Jetson Nano for object avoidance), MAVLink communication stack, and mission planning solving TSP variants. The software is almost more interesting than the hardware." },
      { heading: "Last-Mile Logistics", body: "Zipline delivers blood products to 2,500+ health facilities across Rwanda and Ghana. Wingman completes deliveries in under 10 minutes in parts of Australia and Texas. The unit economics only work at scale and in low-density areas. FAA BVLOS (Beyond Visual Line of Sight) approval is the regulatory unlock that opens the rest of the market." },
      { heading: "Defence Applications", body: "Ukraine changed drone warfare permanently. Cheap FPV drones ($400 + a grenade) achieved kill ratios that made $2M tank systems economically indefensible. Loitering munitions like the Switchblade 600 track targets with computer vision. The strategic implication: asymmetric cost curves favour the attacker. Drone swarms with distributed AI are the next frontier." },
      { heading: "Agriculture", body: "DJI Agras T40 carries 40 kg of payload and maps field health via multispectral sensors. Precision spraying reduces pesticide use by 30–50% while improving yield. In India, the PM Drone Didi scheme is training women in rural areas to operate agricultural drones. The satellite imagery + drone ground-truth combination is becoming the standard for precision agriculture at scale." },
      { heading: "My Take", body: "Autonomous flight is a solved problem in favourable conditions — it's the edge cases (wind gusts, sensor failure, urban RF interference) where the interesting engineering happens. The winning drone companies will be the ones that solve regulatory clearance and reliability, not the ones with the best aerodynamics. DJI's moat isn't hardware — it's the ecosystem and the supply chain." },
    ],
  },
  {
    id: "ai",
    tag: "Machine Intelligence",
    emoji: "🧠",
    title: "AI: What's Actually Happening Under the Hood",
    subtitle: "A developer's honest take on transformers, LLMs, and what comes next",
    accent: "#DB2777",
    tldr: "Large Language Models are not reasoning — they are extremely sophisticated pattern completion engines trained on human thought. That's both more impressive and more limited than most people realise.",
    sections: [
      { heading: "The Transformer Architecture", body: "Attention Is All You Need (Vaswani et al., 2017) replaced recurrent networks with self-attention: every token attends to every other token simultaneously. The attention head computes Q·Kᵀ/√dₖ scores, then softmax-weights the value vectors. Stack 96 layers with 96 attention heads (GPT-4 scale), train on 13 trillion tokens, and emergence happens." },
      { heading: "Why Scale Works", body: "No one predicted that scaling compute + data would produce qualitatively new capabilities. Chain-of-thought reasoning, few-shot learning, coding ability — these emerged without being explicitly trained for. The scaling laws describe power-law relationships between parameters, data, compute, and loss. GPT-4 scale models trained on GPT-4 quality synthetic data is the next frontier." },
      { heading: "What LLMs Can't Do", body: "Reliable arithmetic. True reasoning chains. Consistent world models (no persistent memory, no embodied grounding). Novel scientific discovery without human direction. The right mental model: LLMs are the best text compression and interpolation system ever built — which turns out to be extraordinarily useful even with those constraints." },
      { heading: "How I Use It as a Developer", body: "GPT-4 writes 60–70% of my boilerplate, explains unfamiliar codebases, generates test cases I'd skip, and rubber-ducks architecture decisions at 2 AM. The productivity gain is real — but it's a force multiplier for a developer who knows what they're doing, not a replacement. Senior engineers benefit more from LLMs than juniors, because they can evaluate outputs." },
      { heading: "What I'm Watching", body: "Inference efficiency (Mixture of Experts, speculative decoding, FlashAttention). Multimodal models grounding language in vision and action. Agent frameworks (LangGraph, CrewAI) orchestrating LLMs with tools — this is where AI stops being a chatbot and starts being infrastructure. And the alignment question: RLHF produces obedient models but not necessarily honest ones." },
    ],
  },
];

const books = [
  { title: "Zero to One", author: "Peter Thiel", note: "Rethinks competition entirely — secrets, monopolies, the future" },
  { title: "The Lean Startup", author: "Eric Ries", note: "How I approach building MVPs without wasting months" },
  { title: "Atomic Habits", author: "James Clear", note: "Systems over goals. This one stuck." },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", note: "Wealth & happiness frameworks I reread quarterly" },
  { title: "The Hard Thing About Hard Things", author: "Ben Horowitz", note: "No sugarcoating. What running a company actually feels like." },
  { title: "Deep Work", author: "Cal Newport", note: "Changed how I structure my 4-hour coding blocks" },
];

const openings = [
  { name: "Sicilian Defense", side: "Black", note: "Sharp, aggressive, asymmetric — matches how I like to compete" },
  { name: "King's Indian Defense", side: "Black", note: "Dynamic counterplay from cramped positions" },
  { name: "London System", side: "White", note: "Solid structure, slow grind — useful when opponent is stronger" },
];

const following = [
  { name: "Y Combinator", type: "Accelerator", note: "Startup School content is better than any MBA" },
  { name: "Paul Graham", type: "Essays", note: "Rethinks everything from first principles — required reading" },
  { name: "Lenny Rachitsky", type: "Newsletter", note: "Product strategy that actually ships" },
  { name: "Ben Thompson", type: "Stratechery", note: "Best business model deep dives on the internet" },
  { name: "Pieter Levels", type: "Indie Hacker", note: "Proof that one person can build, ship, and profit" },
];

// ─── Shared primitives ───────────────────────────────────────────────────────

function Label({ children }: { children: string }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(124,111,234,0.45)", marginBottom: 20 }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.1) 70%, transparent 100%)", margin: "36px 0" }} />;
}

function Tag({ children }: { children: string }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 11, fontWeight: 500, color: "#5A5470",
      padding: "3px 9px", borderRadius: 5,
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
    }}>
      {children}
    </span>
  );
}

// ─── Tab panels ──────────────────────────────────────────────────────────────

function AboutPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {[
        { emoji: "👨‍💻", text: "I'm 22, with 4 years of coding experience. Started in Figma obsessing over pixels, taught myself to code, went deep into full-stack, and eventually into AI-assisted building. Now I ship entire products solo." },
        { emoji: "♟️", text: "I play chess — it sharpens how I think through systems and tradeoffs. Same mental model I bring to product decisions." },
        { emoji: "🚀", text: "Genuinely obsessed with startups and business: how products grow, why they die, and what makes something people actually pay for." },
      ].map(({ emoji, text }) => (
        <div key={emoji} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }}>{emoji}</span>
          <p style={{ fontSize: 14, color: "#9B95B0", lineHeight: 1.85, fontWeight: 400, margin: 0 }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

function SkillsPanel() {
  const colors = ["#7C6FEA", "#3ECF8E", "#F59E0B", "#38BDF8", "#F472B6"];
  return (
    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {skills.map((s, i) => {
        const c = colors[i % colors.length];
        const isPrimary = i < 2;
        return (
          <div key={s.cat} style={{ padding: "22px 24px", borderRadius: 14, background: isPrimary ? `${c}10` : `${c}07`, border: `1px solid ${isPrimary ? c + "35" : c + "22"}`, display: "flex", flexDirection: "column", gap: 14, boxShadow: isPrimary ? `0 0 24px ${c}0d` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, boxShadow: `0 0 10px ${c}99`, flexShrink: 0 }} />
              <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: c }}>{s.cat}</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {s.tags.map(t => (
                <span key={t} style={{
                  fontSize: 12, fontWeight: 500, color: "#D4D0E8",
                  padding: "5px 13px", borderRadius: 7,
                  background: `${c}10`, border: `1px solid ${c}25`,
                  letterSpacing: "0.01em",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const certs = [
  { name: "Meta Front-End Developer",                    issuer: "Meta · Coursera",   year: "2025", color: "#7C6FEA" },
  { name: "Google UX Design",                            issuer: "Google · Coursera", year: "2025", color: "#059669" },
  { name: "Meta React Native",                           issuer: "Meta · Coursera",   year: "2024", color: "#D97706" },
  { name: "Understanding Incubation & Entrepreneurship", issuer: "NPTEL",             year: "2026", color: "#DB2777" },
  { name: "E-Business",                                  issuer: "NPTEL",             year: "2025", color: "#0EA5E9" },
];

function CertificatesPanel() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
      {certs.map(c => (
        <div key={c.name} style={{
          padding: "24px 22px", borderRadius: 14,
          border: `1px solid ${c.color}22`, background: `${c.color}07`,
          display: "flex", flexDirection: "column", gap: 16,
          transition: "border-color 0.18s, transform 0.18s",
        }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${c.color}50`; el.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${c.color}22`; el.style.transform = "translateY(0)"; }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: `${c.color}15`, border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"/><path d="M8 14v7l4-2 4 2v-7"/>
              </svg>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: `${c.color}bb`, background: `${c.color}12`, border: `1px solid ${c.color}28`, padding: "3px 10px", borderRadius: 5 }}>{c.year}</span>
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#E8E6F0", lineHeight: 1.4, marginBottom: 5 }}>{c.name}</p>
            <p style={{ fontSize: 11, color: "#5A5470" }}>{c.issuer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const expColors = ["#7C6FEA", "#3ECF8E"];
const projColors = ["#3ECF8E", "#F472B6", "#38BDF8"];

function ExperiencePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {experience.map((e, i) => {
        const c = expColors[i % expColors.length];
        return (
          <div key={e.company} style={{ padding: "24px 26px", borderRadius: 14, border: `1px solid ${c}20`, background: `${c}06`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: c, borderRadius: "14px 0 0 14px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 14 }}>
              <div>
                <p style={{ fontSize: 17, fontWeight: 800, color: "#E8E6F0", letterSpacing: "-0.02em" }}>{e.company}</p>
                <p style={{ fontSize: 13, color: c, fontWeight: 500, marginTop: 4 }}>{e.role}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: `${c}cc`, background: `${c}12`, border: `1px solid ${c}30`, padding: "4px 11px", borderRadius: 6, letterSpacing: "0.01em" }}>{e.period}</span>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: e.type === "Full-time" ? "#4ade80" : "#F59E0B", background: e.type === "Full-time" ? "rgba(74,222,128,0.08)" : "rgba(245,158,11,0.08)", border: e.type === "Full-time" ? "1px solid rgba(74,222,128,0.25)" : "1px solid rgba(245,158,11,0.25)", padding: "3px 10px", borderRadius: 5 }}>{e.type}</span>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {e.tags.map(t => (
                <span key={t} style={{ fontSize: 11, fontWeight: 500, color: "#C4BFE0", padding: "3px 10px", borderRadius: 5, background: `${c}10`, border: `1px solid ${c}25` }}>{t}</span>
              ))}
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: (e.liveUrl || e.certUrl) ? 20 : 0 }}>
              {e.bullets.map((b, j) => (
                <li key={j} style={{ display: "flex", gap: 12, fontSize: 13.5, color: "#9B95B0", lineHeight: 1.75 }}>
                  <span style={{ flexShrink: 0, marginTop: 10, width: 4, height: 4, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }} />
                  {b}
                </li>
              ))}
            </ul>
            {(e.liveUrl || e.certUrl) && (
              <div style={{ display: "flex", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {e.liveUrl && (
                  <a href={e.liveUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#E8E6F0", padding: "6px 14px", borderRadius: 7, border: `1px solid ${c}40`, background: `${c}10`, textDecoration: "none", transition: "background 0.15s, border-color 0.15s" }}
                    onMouseEnter={e2 => { const el = e2.currentTarget as HTMLAnchorElement; el.style.background = `${c}20`; el.style.borderColor = `${c}70`; }}
                    onMouseLeave={e2 => { const el = e2.currentTarget as HTMLAnchorElement; el.style.background = `${c}10`; el.style.borderColor = `${c}40`; }}
                  >
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 2H2v12h12V9"/><path d="M10 2h4v4"/><path d="M6 10l8-8"/></svg>
                    Live
                  </a>
                )}
                {e.certUrl && (
                  <a href={e.certUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#E8E6F0", padding: "6px 14px", borderRadius: 7, border: `1px solid ${c}40`, background: `${c}10`, textDecoration: "none", transition: "background 0.15s, border-color 0.15s" }}
                    onMouseEnter={e2 => { const el = e2.currentTarget as HTMLAnchorElement; el.style.background = `${c}20`; el.style.borderColor = `${c}70`; }}
                    onMouseLeave={e2 => { const el = e2.currentTarget as HTMLAnchorElement; el.style.background = `${c}10`; el.style.borderColor = `${c}40`; }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8 14v7l4-2 4 2v-7"/></svg>
                    Certificate
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProjectsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {projects.map((p, i) => {
        const c = projColors[i % projColors.length];
        return (
          <div key={p.name} style={{ padding: "24px 26px", borderRadius: 14, border: `1px solid ${c}20`, background: `${c}06`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: c, borderRadius: "14px 0 0 14px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 14 }}>
              <div>
                <p style={{ fontSize: 17, fontWeight: 800, color: "#E8E6F0", letterSpacing: "-0.02em" }}>{p.name}</p>
                <p style={{ fontSize: 13, color: c, fontWeight: 500, marginTop: 4 }}>{p.subtitle}</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: `${c}bb`, background: `${c}12`, border: `1px solid ${c}28`, padding: "3px 10px", borderRadius: 5, flexShrink: 0 }}>{p.period}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {p.tags.map(t => (
                <span key={t} style={{ fontSize: 11, fontWeight: 500, color: "#C4BFE0", padding: "3px 10px", borderRadius: 5, background: `${c}10`, border: `1px solid ${c}25` }}>{t}</span>
              ))}
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {p.bullets.map((b, j) => (
                <li key={j} style={{ display: "flex", gap: 12, fontSize: 13.5, color: "#9B95B0", lineHeight: 1.75 }}>
                  <span style={{ flexShrink: 0, marginTop: 10, width: 4, height: 4, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }} />
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              {p.liveUrl ? (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#E8E6F0", padding: "6px 14px", borderRadius: 7, border: `1px solid ${c}40`, background: `${c}10`, textDecoration: "none", transition: "background 0.15s, border-color 0.15s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = `${c}20`; el.style.borderColor = `${c}70`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = `${c}10`; el.style.borderColor = `${c}40`; }}
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 2H2v12h12V9"/><path d="M10 2h4v4"/><path d="M6 10l8-8"/></svg>
                  Live
                </a>
              ) : ("reportUrl" in p && p.reportUrl) ? (
                <a href={(p as { reportUrl: string }).reportUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#E8E6F0", padding: "6px 14px", borderRadius: 7, border: `1px solid ${c}40`, background: `${c}10`, textDecoration: "none", transition: "background 0.15s, border-color 0.15s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = `${c}20`; el.style.borderColor = `${c}70`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = `${c}10`; el.style.borderColor = `${c}40`; }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  Project Report
                </a>
              ) : (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#5A5470", padding: "6px 14px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.08)", cursor: "not-allowed", opacity: 0.5 }}>
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
                  Live — coming soon
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Case Studies modal ───────────────────────────────────────────────────────

function Modal({ study, onClose }: { study: typeof CASE_STUDIES[0]; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: 700, width: "100%", maxHeight: "88vh", background: "#0e0e12", border: `1px solid ${study.accent}30`, borderRadius: 20, overflowY: "auto", boxShadow: `0 0 60px ${study.accent}18, 0 40px 80px rgba(0,0,0,0.7)` }}>

        {/* Hero banner */}
        <div style={{ position: "relative", padding: "36px 32px 28px", background: `linear-gradient(135deg, ${study.accent}14 0%, transparent 60%)`, borderBottom: `1px solid ${study.accent}18` }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${study.accent} 0%, ${study.accent}44 100%)`, borderRadius: "20px 20px 0 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 32, lineHeight: 1 }}>{study.emoji}</span>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: study.accent, padding: "4px 10px", borderRadius: 6, background: `${study.accent}15`, border: `1px solid ${study.accent}35` }}>{study.tag}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: "#E8E6F0", letterSpacing: "-0.03em", lineHeight: 1.25, marginBottom: 6 }}>{study.title}</h3>
              <p style={{ fontSize: 13, color: "#6B6585" }}>{study.subtitle}</p>
            </div>
            <button onClick={onClose} style={{ flexShrink: 0, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 32, height: 32, color: "#9B95B0", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
          {/* TL;DR */}
          <div style={{ marginTop: 20, padding: "14px 18px", borderRadius: 10, background: `${study.accent}10`, border: `1px solid ${study.accent}25` }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: study.accent, marginBottom: 7 }}>TL;DR</p>
            <p style={{ fontSize: 14, color: "#D4D2E8", lineHeight: 1.75, fontStyle: "italic" }}>{study.tldr}</p>
          </div>
        </div>

        {/* Sections */}
        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 0 }}>
          {study.sections.map((s, i) => (
            <div key={i} style={{ paddingBottom: 24, marginBottom: 24, borderBottom: i < study.sections.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ width: 20, height: 20, borderRadius: 5, background: `${study.accent}18`, border: `1px solid ${study.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: study.accent, flexShrink: 0 }}>{i + 1}</span>
                <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: `${study.accent}cc` }}>{s.heading}</p>
              </div>
              <p style={{ fontSize: 14, color: "#9B95B0", lineHeight: 1.9, paddingLeft: 30 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CaseStudiesPanel() {
  const [active, setActive] = useState<typeof CASE_STUDIES[0] | null>(null);
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {CASE_STUDIES.map(study => (
          <div
            key={study.id}
            onClick={() => setActive(study)}
            style={{ borderRadius: 16, border: `1px solid ${study.accent}20`, background: `linear-gradient(135deg, ${study.accent}0a 0%, rgba(255,255,255,0.015) 100%)`, cursor: "pointer", overflow: "hidden", transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${study.accent}50`; el.style.transform = "translateY(-3px)"; el.style.boxShadow = `0 12px 40px ${study.accent}15`; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${study.accent}20`; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
          >
            {/* Top color bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${study.accent} 0%, ${study.accent}44 100%)` }} />
            <div style={{ padding: "22px 24px" }}>
              {/* Icon + tag row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 28, lineHeight: 1 }}>{study.emoji}</span>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: study.accent, padding: "3px 10px", borderRadius: 5, background: `${study.accent}12`, border: `1px solid ${study.accent}28` }}>{study.tag}</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "#E8E6F0", letterSpacing: "-0.02em", marginBottom: 6, lineHeight: 1.35 }}>{study.title}</h3>
              <p style={{ fontSize: 12, color: "#5A5470", marginBottom: 14, lineHeight: 1.5 }}>{study.subtitle}</p>
              <p style={{ fontSize: 12, color: "#7A748E", lineHeight: 1.75 }}>{study.tldr.slice(0, 110)}…</p>
              <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: study.accent }}>Read full study</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke={study.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      {active && <Modal study={active} onClose={() => setActive(null)} />}
    </>
  );
}

function InterestsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

      {/* Chess */}
      <div>
        <Label>Chess</Label>
        <p style={{ fontSize: 13.5, color: "#9B95B0", lineHeight: 1.8, marginBottom: 20, maxWidth: 560 }}>
          Rated on Chess.com and Lichess. Chess forces single-tasking — pattern recognition, multi-step thinking, knowing a position is lost before it looks obvious. Same mental model I bring to product decisions.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {openings.map((o, i) => (
            <div key={o.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < openings.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#D4D2E8" }}>{o.name}</p>
                <p style={{ fontSize: 12, color: "#5A5470", marginTop: 2 }}>{o.note}</p>
              </div>
              <span style={{ fontSize: 10, color: "#3A3650", flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{o.side}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Startups */}
      <div>
        <Label>Startups &amp; Business</Label>
        <p style={{ fontSize: 13.5, color: "#9B95B0", lineHeight: 1.8, marginBottom: 20, maxWidth: 560 }}>
          Building BacklinkOS solo in college — from zero to paying customers — taught me more than any internship. I think constantly about distribution, retention, and pricing.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {following.map((f, i) => (
            <div key={f.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < following.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#D4D2E8" }}>{f.name}</p>
                <p style={{ fontSize: 12, color: "#5A5470", marginTop: 2 }}>{f.note}</p>
              </div>
              <span style={{ fontSize: 10, color: "#3A3650", flexShrink: 0 }}>{f.type}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Books */}
      <div>
        <Label>Books</Label>
        <p style={{ fontSize: 13.5, color: "#9B95B0", lineHeight: 1.8, marginBottom: 20, maxWidth: 560 }}>
          Reading gives me mental models that directly shape how I design systems and think about users. I read slowly and take notes — it&apos;s not about volume.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
          {books.map(b => (
            <div key={b.title} style={{ padding: "14px 16px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, transition: "border-color 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(217,119,6,0.3)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"}
            >
              <p style={{ fontSize: 13, fontWeight: 700, color: "#D4D2E8", lineHeight: 1.35, marginBottom: 3 }}>{b.title}</p>
              <p style={{ fontSize: 11, color: "#3A3650", marginBottom: 8 }}>{b.author}</p>
              <p style={{ fontSize: 11, color: "rgba(217,119,6,0.7)", lineHeight: 1.5, fontStyle: "italic" }}>{b.note}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Section header ──────────────────────────────────────────────────────────

function SectionHeader({ num, title, sub }: { num: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 52 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{ width: 28, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #7C6FEA, #a78bfa)" }} />
        {num && <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(124,111,234,0.6)" }}>{num}</p>}
      </div>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-0.035em", color: "#E8E6F0", marginBottom: sub ? 10 : 0, lineHeight: 1.1 }}>
        {title}
      </h2>
      {sub && <p style={{ fontSize: 14, color: "#5A5470", lineHeight: 1.7, maxWidth: 520, marginTop: 8 }}>{sub}</p>}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TabSection() {
  return (
    <div className="tab-wrap" style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "0 auto", padding: "0 48px 120px" }}>

      {/* About */}
      <section id="about" style={{ paddingTop: 96, scrollMarginTop: 64 }}>
        <RevealSection><SectionHeader num="" title="About Me" sub="" /></RevealSection>
        <RevealSection delay={100}><AboutPanel /></RevealSection>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent 100%)", margin: "80px 0" }} />

      {/* Skills */}
      <section id="skills" style={{ scrollMarginTop: 64 }}>
        <RevealSection><SectionHeader num="" title="Skills" sub="" /></RevealSection>
        <RevealSection delay={100}><SkillsPanel /></RevealSection>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent 100%)", margin: "80px 0" }} />

      {/* Experience */}
      <section id="experience" style={{ scrollMarginTop: 64 }}>
        <RevealSection><SectionHeader num="" title="Experience" sub="" /></RevealSection>
        <RevealSection delay={100}><ExperiencePanel /></RevealSection>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent 100%)", margin: "80px 0" }} />

      {/* Projects */}
      <section id="projects" style={{ scrollMarginTop: 64 }}>
        <RevealSection><SectionHeader num="" title="Projects" sub="" /></RevealSection>
        <RevealSection delay={100}><ProjectsPanel /></RevealSection>
      </section>


    </div>
  );
}
