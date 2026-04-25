"use client";

export default function Resume() {
  return (
    <div id="about" style={{ position: "relative", zIndex: 10, maxWidth: 700, margin: "0 auto", padding: "80px 40px 80px", color: "#d4d2e8" }}>

      {/* Name */}
      <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#eceaf6", marginBottom: 12, lineHeight: 1 }}>
        Rishabh Joshi
      </h1>

      {/* Contacts */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", marginBottom: 48, fontSize: 13, color: "#9B95B0" }}>
        {[
          { label: "xojoshirishabh@gmail.com", href: "mailto:xojoshirishabh@gmail.com" },
          { label: "+91 98918 23495", href: "tel:+919891823495" },
          { label: "GitHub", href: "#" },
          { label: "LinkedIn", href: "#" },
        ].map(({ label, href }) => (
          <a key={label} href={href} style={{ color: "inherit", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#E8E6F0")}
            onMouseLeave={e => (e.currentTarget.style.color = "#9B95B0")}>
            {label}
          </a>
        ))}
      </div>

      <Divider />

      {/* Summary */}
      <Section label="Summary">
        <p style={{ fontSize: 14, color: "#B0ABCA", lineHeight: 1.75 }}>
          Product-focused full-stack developer experienced in shipping fast, scalable SaaS features with React, Next.js, and Node.js. Strong in building real-time systems, AI-powered features, and production-ready applications.
        </p>
      </Section>

      <Divider />

      {/* Currently Building */}
      <Section label="Currently Building">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { name: "BacklinkOS", desc: "SEO & backlink tracking SaaS — from zero to paying customers, built solo in college.", tag: "Live · SaaS", accent: "#7C6FEA" },
            { name: "Savora", desc: "Serverless expense manager with real-time analytics, edge caching, and CI/CD pipelines.", tag: "Active · Full-stack", accent: "#059669" },
          ].map(item => (
            <div key={item.name} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${item.accent}25`, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#E8E6F0" }}>{item.name}</p>
                <span style={{ fontSize: 10, color: `${item.accent}99`, background: `${item.accent}12`, border: `1px solid ${item.accent}22`, borderRadius: 5, padding: "2px 7px", fontWeight: 600, letterSpacing: "0.06em" }}>{item.tag}</span>
              </div>
              <p style={{ fontSize: 12, color: "#9B95B0", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Skills */}
      <Section label="Skills">
        <SkillRow label="Frontend"     value="React, Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, React Hook Form" />
        <SkillRow label="Backend"      value="Node.js, Express, REST APIs, WebSockets, JWT, OAuth, GraphQL" />
        <SkillRow label="Databases"    value="PostgreSQL, MongoDB, Redis, Firebase, Supabase" />
        <SkillRow label="Mobile"       value="React Native (Android & iOS), Expo" />
        <SkillRow label="Tools & DevOps" value="Git, GitHub Actions, Docker, AWS, Vercel, Render, Sentry, Postman, Jest" />
      </Section>

      <Divider />

      {/* Experience */}
      <div id="experience" style={{ scrollMarginTop: 80 }} />
      <Section label="Work Experience">
        <Job
          company="BacklinkOS"
          link="backlinkos.io"
          role="Product Engineer"
          stack="React, Next.js, Node.js, Supabase, Clerk, Razorpay, PostHog, REST APIs"
          period="Dec 2025 – Present"
          bullets={[
            "Built and scaled BacklinkOS, an SEO and backlink tracking SaaS, handling 10,000+ backlink records with real-time domain monitoring and sub-500ms query response times.",
            "Engineered auth and subscription flows with Clerk and Razorpay for secure multi-tenant access; integrated PostHog analytics and AI-powered search for backlink discovery.",
            "Managed Supabase (PostgreSQL) schema design, RLS policies, and real-time subscriptions; maintained 99%+ uptime with CI/CD pipelines reducing deployment time by 40%.",
          ]}
        />
        <Job
          company="BSES Rajdhani Power Limited"
          link="Certificate"
          role="Fullstack Developer Intern"
          stack="React.js, Node.js, PostgreSQL, REST APIs, Infrastructure Monitoring"
          period="June 2024 – July 2024"
          bullets={[
            "Engineered internal systems and website features supporting enterprise infrastructure for 10,000+ users.",
            "Built and optimized backend APIs with PostgreSQL, reducing response times by 12% and cutting downtime incidents by 20%.",
            "Diagnosed and resolved network connectivity issues across distributed infrastructure, improving system reliability and reducing escalation tickets.",
          ]}
        />
      </Section>

      <Divider />

      {/* Projects */}
      <div id="projects" style={{ scrollMarginTop: 80 }} />
      <Section label="Projects">
        <Job
          company="Savora"
          link="Expense Manager"
          role="Fullstack Developer"
          stack="Next.js 15, NestJS, PostgreSQL, Neon DB, Vercel, Render, CI/CD"
          period="Jan 2026 – Present"
          bullets={[
            "Architected serverless backend with NestJS and Neon PostgreSQL; achieved sub-200ms dashboard load times via edge caching and automated CI/CD on Vercel and Render.",
            "Implemented secure JWT authentication and environment variable management across staging and production environments.",
            "Built real-time expense tracking with category breakdowns, monthly summaries, and Recharts-powered analytics dashboard.",
          ]}
        />
        <Job
          company="Zenra"
          link="Music-Based Connection App"
          role="Fullstack Developer"
          stack="React Native, React.js, Node.js, MongoDB, Firebase, GraphQL, Socket.io"
          period="Jan 2025 – Dec 2025"
          bullets={[
            "Grew platform to 500+ active users; built cross-platform app with React Native, reducing load times by 25% via code splitting and lazy loading.",
            "Engineered real-time matchmaking backend with Node.js, MongoDB, and Socket.io supporting 500+ concurrent users at 99.5% uptime.",
            "Designed end-to-end UX flows and high-fidelity Figma prototypes; implemented GraphQL API for music preference matching and user discovery.",
          ]}
        />
      </Section>

      <Divider />

      {/* Education */}
      <Section label="Education">
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#E8E6F0" }}>Dronacharya College of Engineering</p>
            <span style={{ fontSize: 12, color: "#7C7490" }}>Sept 2022 – Present</span>
          </div>
          <p style={{ fontSize: 13, color: "#B0ABCA" }}>B.Tech in Computer Science and Engineering · GPA: 7.5/10</p>
          <p style={{ fontSize: 12, color: "#7C7490", marginTop: 4 }}>Coursework: DSA, DBMS, OOP, Networking, OS</p>
        </div>
      </Section>

      <Divider />

      {/* Certificates */}
      <Section label="Certificates">
        {[
          ["Meta Front-End Developer Professional Certificate", "Coursera", "2025"],
          ["Google UX Design Professional Certificate", "Coursera", "2025"],
          ["Meta React Native Specialization", "Coursera", "2024"],
        ].map(([name, issuer, year]) => (
          <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: "#B0ABCA" }}>{name} <span style={{ color: "#7C7490", fontSize: 11 }}>({issuer})</span></p>
            <p style={{ fontSize: 12, color: "#9B95B0", flexShrink: 0, marginLeft: 16, fontWeight: 600 }}>{year}</p>
          </div>
        ))}
      </Section>

    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "40px 0" }} />;
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(124,111,234,0.55)", marginBottom: 20 }}>{label}</p>
      {children}
    </div>
  );
}

function Job({ company, link, role, stack, period, bullets }: {
  company: string; link: string; role: string; stack: string; period: string; bullets: string[];
}) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#E8E6F0" }}>{company}</p>
          <span style={{ fontSize: 11, color: "#7C6FEA", opacity: 0.7 }}>{link}</span>
        </div>
        <span style={{ fontSize: 12, color: "#7C7490", flexShrink: 0, marginLeft: 16 }}>{period}</span>
      </div>
      <p style={{ fontSize: 12, color: "#9B95B0", marginBottom: 5, fontWeight: 500 }}>{role}</p>
      <p style={{ fontSize: 11, color: "#5A5470", fontFamily: "monospace", marginBottom: 14, lineHeight: 1.6 }}>{stack}</p>
      <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "#B0ABCA", lineHeight: 1.7 }}>
            <span style={{ flexShrink: 0, marginTop: 9, width: 4, height: 4, borderRadius: "50%", background: "rgba(124,111,234,0.5)" }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 24, marginBottom: 10 }}>
      <p style={{ fontSize: 11, color: "#7C7490", width: 100, flexShrink: 0, paddingTop: 1, fontWeight: 500 }}>{label}</p>
      <p style={{ fontSize: 13, color: "#B0ABCA", lineHeight: 1.6 }}>{value}</p>
    </div>
  );
}
