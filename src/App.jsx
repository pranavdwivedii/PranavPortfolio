import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#05070f",
  bg2: "#080d1a",
  bg3: "#0d1424",
  cyan: "#06b6d4",
  cyanDim: "rgba(6,182,212,0.12)",
  cyanBorder: "rgba(6,182,212,0.18)",
  white: "#eef2ff",
  gray: "#5a6480",
  gray2: "#1e2535",
  green: "#22d3a5",
  border: "rgba(6,182,212,0.12)",
};

const skills = {
  Languages: ["Python", "C++"],
  "Frameworks & APIs": ["FastAPI", "Django", "Django REST Framework", "REST APIs", "Microservices"],
  "AI / ML": ["LangChain", "OpenAI API", "HuggingFace Transformers", "Scikit-learn", "PyTorch", "Pandas", "NumPy"],
  "Databases & Viz": ["MongoDB", "Plotly", "Matplotlib"],
  "Tools": ["Git", "GitHub", "Bitbucket", "aiohttp", "BeautifulSoup4", "Requests", "OpenPyXL"],
};

const stats = [
  { num: "13+", label: "Ad Platforms Integrated" },
  { num: "35%", label: "API Performance Gain" },
  { num: "40%", label: "Scraping Speed Up" },
  { num: "20+", label: "APIs Refactored" },
];

const experience = [
  {
    company: "Cyber Media India Ltd.",
    role: "Executive — Software Development Engineer",
    period: "Jan 2025 – Present",
    type: "Full-time",
    bullets: [
      "Designed scalable RESTful APIs for CMGalaxy, aggregating analytics from 13+ ad platforms",
      "Engineered MongoDB aggregation pipelines, improving API response time by 35%",
      "Built AI-powered dashboards for ROAS, CTR, CPA, CPC using Plotly & Matplotlib",
      "Refactored 20+ Django REST APIs from FBV to CBV for better modularity",
      "Integrated LangChain, HuggingFace & OpenAI for LLM-driven campaign recommendations",
      "Implemented caching strategies for core service reliability & scalability",
    ],
  },
  {
    company: "Cyber Media India Ltd.",
    role: "Intern — Software Development",
    period: "Jul 2024 – Dec 2024",
    type: "Internship",
    bullets: [
      "Built AI-based social media content automation — scraping to platform-ready output",
      "Developed async scraping pipelines with aiohttp & asyncio, cutting data collection by 40%",
      "Integrated OpenAI API & LangChain for brand-aligned content generation",
      "Designed modular FastAPI components for scalable content workflows",
    ],
  },
];

const projects = [
  {
    num: "01",
    title: "CMGalaxy",
    desc: "Centralized analytics platform unifying marketing data from 13+ sources — Google Ads, Meta, LinkedIn, Shopify — with real-time KPI dashboards.",
    highlights: [
      "API-first backend for scalable ad performance analytics",
      "Real-time dashboards: CPC, CTR, CPA, ROAS monitoring",
      "Optimized DB queries & caching to reduce latency",
      "LangChain-powered campaign optimization",
    ],
    stack: ["FastAPI", "Python", "MongoDB", "Plotly", "LangChain", "Matplotlib"],
    link: "https://www.cmgalaxy.com",
  },
  {
    num: "02",
    title: "SmartPostAI",
    desc: "LLM-powered content automation — scrapes, cleans and transforms web content into platform-ready social media posts and articles at scale.",
    highlights: [
      "Async scraping & processing for high throughput",
      "OpenAI + LangChain pipelines for creative generation",
      "40% faster data collection via async architecture",
      "Brand-aligned output across platforms automatically",
    ],
    stack: ["FastAPI", "Python", "OpenAI API", "LangChain", "aiohttp", "asyncio"],
    link: "https://github.com/pranavdwivedii/SmartPostAI",
  },
];

function useIntersect(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useIntersect();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ number, text }) {
  return (
    <div style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: "0.65rem",
      color: COLORS.cyan,
      letterSpacing: "0.35em",
      textTransform: "uppercase",
      marginBottom: "3rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    }}>
      {number} — {text}
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${COLORS.cyanBorder}, transparent)` }} />
    </div>
  );
}

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const handler = () => {
      const sections = ["about", "experience", "projects", "skills", "resume", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = ["about", "experience", "projects", "skills", "resume", "contact"];

  return (
    <div style={{ background: COLORS.bg, color: COLORS.white, minHeight: "100vh", fontFamily: "'Syne', sans-serif", overflowX: "hidden", cursor: "none" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; cursor: none !important; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(6,182,212,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.gray2}; border-radius: 2px; }
      `}</style>

      {/* Custom cursor */}
      <div style={{
        position: "fixed", left: mousePos.x, top: mousePos.y,
        width: 9, height: 9, background: COLORS.cyan, borderRadius: "50%",
        transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 9999,
        transition: "width 0.2s, height 0.2s",
      }} />
      <div style={{
        position: "fixed", left: mousePos.x, top: mousePos.y,
        width: 34, height: 34, border: `1px solid rgba(6,182,212,0.45)`, borderRadius: "50%",
        transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 9998,
        transition: "left 0.12s ease, top 0.12s ease",
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        padding: "1.5rem 3rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: `linear-gradient(to bottom, rgba(5,7,15,0.97), transparent)`,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", color: COLORS.cyan, letterSpacing: "0.1em" }}>
          PD // Portfolio
        </div>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          {navLinks.map((l) => (
            <button key={l} onClick={() => scroll(l)} style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.68rem",
              color: activeSection === l ? COLORS.cyan : COLORS.gray,
              background: "none", border: "none",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              transition: "color 0.2s",
              position: "relative",
              paddingBottom: "4px",
            }}>
              {l}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                background: COLORS.cyan,
                transform: `scaleX(${activeSection === l ? 1 : 0})`,
                transition: "transform 0.3s ease",
                transformOrigin: "left",
              }} />
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 3rem 5rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* bg glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 55% 50% at 70% 40%, rgba(6,182,212,0.07) 0%, transparent 70%),
                       radial-gradient(ellipse 35% 40% at 20% 70%, rgba(6,182,212,0.04) 0%, transparent 60%)`,
        }} />
        {/* grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 100%, black 20%, transparent 80%)",
        }} />

        {/* ── Live Terminal ── */}
        <HeroTerminal />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: "0.68rem",
            color: COLORS.cyan, letterSpacing: "0.3em", textTransform: "uppercase",
            marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem",
          }}>
            <div style={{ width: 38, height: 1, background: COLORS.cyan }} />
            Software Development Engineer
          </div>

          <h1 style={{ fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.03em", marginBottom: "2.2rem" }}>
            <span style={{ display: "block", color: COLORS.white }}>Pranav</span>
            <span style={{ display: "block", color: "transparent", WebkitTextStroke: `1px rgba(6,182,212,0.55)` }}>Dwivedi</span>
          </h1>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: COLORS.gray, maxWidth: 320, lineHeight: 1.9 }}>
              Building scalable AI-powered backend systems,<br />
              REST APIs, and analytics platforms.<br />
              <span style={{ color: COLORS.cyan }}>FastAPI · Django · MongoDB · LangChain</span>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: COLORS.green }}>
              <div style={{
                width: 7, height: 7, background: COLORS.green, borderRadius: "50%",
                animation: "pulse-g 2s infinite",
              }} />
              <style>{`@keyframes pulse-g { 0%,100%{box-shadow:0 0 0 0 rgba(34,211,165,0.4)} 50%{box-shadow:0 0 0 7px rgba(34,211,165,0)} }`}</style>
              Available for opportunities
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem" }}>
            <button onClick={() => scroll("contact")} style={{
              background: COLORS.cyan, color: "#000",
              border: "none", padding: "0.85rem 2rem",
              fontFamily: "'Space Mono', monospace", fontSize: "0.72rem",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.background = COLORS.white; e.target.style.transform = "translate(-2px,-2px)"; e.target.style.boxShadow = `4px 4px 0 ${COLORS.cyan}`; }}
              onMouseLeave={e => { e.target.style.background = COLORS.cyan; e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
            >
              Get in touch
            </button>
            <button onClick={() => scroll("projects")} style={{
              border: `1px solid ${COLORS.gray2}`, color: COLORS.gray,
              background: "none", padding: "0.85rem 2rem",
              fontFamily: "'Space Mono', monospace", fontSize: "0.72rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.cyan; e.currentTarget.style.color = COLORS.cyan; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.gray2; e.currentTarget.style.color = COLORS.gray; }}
            >
              View projects
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", right: "3rem", bottom: "2rem",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: COLORS.gray,
          letterSpacing: "0.2em", textTransform: "uppercase", writingMode: "vertical-rl",
        }}>
          scroll
          <div style={{
            width: 1, height: 60,
            background: `linear-gradient(to bottom, ${COLORS.cyan}, transparent)`,
            animation: "scroll-anim 2s infinite",
          }} />
          <style>{`@keyframes scroll-anim { 0%,100%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} }`}</style>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "6rem 3rem" }}>
        <SectionLabel number="00" text="About" />
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", maxWidth: 1100 }}>
            <div>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "2rem" }}>
                Building<br /><span style={{ color: COLORS.cyan }}>systems</span><br />that scale.
              </h2>
              {[
                <>I'm a <span style={{ color: COLORS.cyan }}>Software Development Engineer</span> based in Gurugram, India, currently at <span style={{ color: COLORS.white }}>Cyber Media India Ltd.</span> architecting high-performance APIs and AI-driven analytics platforms.</>,
                <>Specialized in <span style={{ color: COLORS.cyan }}>high-volume marketing data</span>, LLM integrations, and performance optimization — building systems that are clean, modular, and production-ready from day one.</>,
                <>B.Tech in Computer Science from <span style={{ color: COLORS.white }}>I.K. Gujral Punjab Technical University</span>, graduating Aug 2025.</>,
              ].map((text, i) => (
                <p key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: COLORS.gray, lineHeight: 2, marginBottom: "1.2rem" }}>
                  {text}
                </p>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {stats.map((s, i) => (
                <StatCard key={i} num={s.num} label={s.label} />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "6rem 3rem", background: COLORS.bg2 }}>
        <SectionLabel number="01" text="Experience" />
        <FadeIn>
          <div style={{ maxWidth: 860 }}>
            {experience.map((exp, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "190px 1fr",
                gap: "3rem", padding: "2.5rem 0",
                borderTop: `1px solid ${COLORS.border}`,
                borderBottom: i === experience.length - 1 ? `1px solid ${COLORS.border}` : "none",
              }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: COLORS.gray, lineHeight: 1.9 }}>
                  <div style={{ color: COLORS.cyan, fontWeight: 700, fontSize: "0.72rem", marginBottom: "0.25rem" }}>{exp.company}</div>
                  <div style={{ color: COLORS.white, marginBottom: "0.25rem" }}>{exp.role}</div>
                  <div>{exp.period}</div>
                  <div style={{ display: "inline-block", marginTop: "0.6rem", background: COLORS.cyanDim, border: `1px solid ${COLORS.cyanBorder}`, color: COLORS.cyan, fontSize: "0.58rem", padding: "0.2rem 0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {exp.type}
                  </div>
                </div>
                <div>
                  <ul style={{ listStyle: "none" }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.73rem", color: COLORS.gray, lineHeight: 1.9, paddingLeft: "1.1rem", position: "relative", marginBottom: "0.2rem" }}>
                        <span style={{ position: "absolute", left: 0, color: COLORS.cyan }}>›</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "6rem 3rem" }}>
        <SectionLabel number="02" text="Projects" />
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5px", maxWidth: 1100, background: COLORS.cyanBorder, border: `1px solid ${COLORS.cyanBorder}` }}>
            {projects.map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
            {/* GitHub CTA row */}
            <div style={{
              gridColumn: "1/-1", background: COLORS.bg,
              padding: "1.8rem 2.5rem",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: COLORS.gray, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.3rem" }}>More work</div>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.76rem", color: COLORS.gray }}>See all repositories and contributions on GitHub</p>
              </div>
              <a href="https://github.com/pranavdwivedii" target="_blank" rel="noreferrer" style={{
                background: COLORS.cyan, color: "#000",
                padding: "0.8rem 1.6rem",
                fontFamily: "'Space Mono', monospace", fontSize: "0.7rem",
                fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", whiteSpace: "nowrap",
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                transition: "background 0.2s",
              }}>
                View GitHub →
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "6rem 3rem", background: COLORS.bg2 }}>
        <SectionLabel number="03" text="Tech Stack" />
        <FadeIn>
          <div style={{ maxWidth: 1100 }}>
            {Object.entries(skills).map(([group, pills]) => (
              <div key={group} style={{ marginBottom: "2.5rem" }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: "0.63rem",
                  color: COLORS.cyan, letterSpacing: "0.3em", textTransform: "uppercase",
                  marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem",
                }}>
                  {group}
                  <div style={{ flex: 1, height: 1, background: COLORS.border }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
                  {pills.map((pill) => (
                    <SkillPill key={pill} label={pill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── RESUME ── */}
      <section id="resume" style={{ padding: "6rem 3rem" }}>
        <SectionLabel number="04" text="Resume" />
        <FadeIn>
          <div style={{ maxWidth: 1100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3rem", background: COLORS.bg2, border: `1px solid ${COLORS.border}`, flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem", color: COLORS.white }}>Full Resume</h3>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: COLORS.gray }}>Get a detailed overview of my experience, skills, and education.</p>
            </div>
            <a href="/Resume.pdf" download style={{
              background: COLORS.cyan, color: "#000",
              padding: "1rem 2.5rem", textDecoration: "none",
              fontFamily: "'Space Mono', monospace", fontSize: "0.75rem",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              transition: "all 0.2s",
              display: "inline-block",
            }}
              onMouseEnter={e => { e.target.style.background = COLORS.white; e.target.style.transform = "translate(-2px,-2px)"; e.target.style.boxShadow = `4px 4px 0 ${COLORS.cyan}`; }}
              onMouseLeave={e => { e.target.style.background = COLORS.cyan; e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
            >
              Download PDF ↓
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "6rem 3rem" }}>
        <SectionLabel number="05" text="Contact" />
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", maxWidth: 1100 }}>
            <div>
              <div style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.03em" }}>
                <div>Let's</div>
                <div style={{ color: "transparent", WebkitTextStroke: `1px rgba(6,182,212,0.5)` }}>build</div>
                <div>together.</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Email", val: "pranavdwivedi0204@gmail.com", href: "mailto:pranavdwivedi0204@gmail.com" },
                { label: "Phone", val: "+91 89682 50147", href: "tel:+918968250147" },
                { label: "Location", val: "Gurugram, India", href: null },
              ].map((item) => (
                <div key={item.label} style={{ padding: "1.4rem", border: `1px solid ${COLORS.border}`, background: COLORS.bg2, transition: "border-color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
                >
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", color: COLORS.cyan, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.82rem", color: COLORS.white, textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = COLORS.cyan}
                        onMouseLeave={e => e.target.style.color = COLORS.white}
                      >{item.val}</a>
                    : <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.82rem", color: COLORS.white }}>{item.val}</span>
                  }
                </div>
              ))}
              <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem" }}>
                {[
                  { label: "LinkedIn", href: "https://linkedin.com/in/pranav-dwivedi" },
                  { label: "GitHub", href: "https://github.com/pranavdwivedii" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                    flex: 1, textAlign: "center", padding: "0.85rem",
                    fontFamily: "'Space Mono', monospace", fontSize: "0.68rem",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    border: `1px solid ${COLORS.border}`, color: COLORS.gray,
                    background: COLORS.bg2, textDecoration: "none",
                    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = COLORS.cyan; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = COLORS.cyan; }}
                    onMouseLeave={e => { e.currentTarget.style.background = COLORS.bg2; e.currentTarget.style.color = COLORS.gray; e.currentTarget.style.borderColor = COLORS.border; }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${COLORS.border}`, padding: "2rem 3rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'Space Mono', monospace", fontSize: "0.63rem", color: COLORS.gray,
      }}>
        <span>© 2025 <span style={{ color: COLORS.cyan }}>Pranav Dwivedi</span></span>
        <span>Built with precision.</span>
        <span style={{ color: COLORS.cyan }}>Available for backend & AI roles →</span>
      </footer>
    </div>
  );
}

function StatCard({ num, label }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `1px solid ${hov ? "rgba(6,182,212,0.35)" : COLORS.border}`,
        padding: "1.5rem", background: COLORS.bg2,
        position: "relative", overflow: "hidden",
        transition: "border-color 0.3s",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: COLORS.cyan, transform: `scaleX(${hov ? 1 : 0})`, transformOrigin: "left", transition: "transform 0.4s ease" }} />
      <div style={{ fontSize: "2.4rem", fontWeight: 800, color: COLORS.cyan, lineHeight: 1 }}>{num}</div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: COLORS.gray, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: "0.5rem" }}>{label}</div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const [glow, setGlow] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({ x: `${((e.clientX - rect.left) / rect.width) * 100}%`, y: `${((e.clientY - rect.top) / rect.height) * 100}%` });
  };

  return (
    <a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={handleMouseMove}
      style={{
        display: "block", background: hov ? COLORS.bg2 : COLORS.bg,
        padding: "2.5rem", position: "relative",
        textDecoration: "none", color: "inherit",
        transition: "background 0.3s",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at ${glow.x} ${glow.y}, rgba(6,182,212,0.07), transparent 60%)`,
        opacity: hov ? 1 : 0, transition: "opacity 0.4s",
        pointerEvents: "none",
      }} />

      {/* Arrow */}
      <div style={{
        position: "absolute", top: "2rem", right: "2rem",
        width: 34, height: 34,
        border: `1px solid ${hov ? COLORS.cyan : COLORS.gray2}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hov ? COLORS.cyan : "none",
        color: hov ? "#000" : COLORS.gray,
        transform: hov ? "rotate(0deg)" : "rotate(45deg)",
        transition: "all 0.3s",
        fontSize: "1rem",
      }}>↗</div>

      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: COLORS.gray2, letterSpacing: "0.2em", marginBottom: "1.5rem" }}>
        Project {project.num}
      </div>
      <h3 style={{ fontSize: "1.55rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.8rem", color: hov ? COLORS.cyan : COLORS.white, transition: "color 0.2s" }}>
        {project.title}
      </h3>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.73rem", color: COLORS.gray, lineHeight: 1.85, marginBottom: "1.2rem" }}>
        {project.desc}
      </p>
      <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
        {project.highlights.map((h, i) => (
          <li key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.67rem", color: COLORS.gray, paddingLeft: "1rem", position: "relative", marginBottom: "0.25rem", lineHeight: 1.7 }}>
            <span style={{ position: "absolute", left: 0, color: COLORS.cyan }}>·</span>
            {h}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {project.stack.map((s) => (
          <span key={s} style={{
            fontFamily: "'Space Mono', monospace", fontSize: "0.6rem",
            color: hov ? COLORS.cyan : COLORS.gray,
            border: `1px solid ${hov ? "rgba(6,182,212,0.3)" : COLORS.gray2}`,
            padding: "0.25rem 0.6rem",
            transition: "all 0.2s",
          }}>{s}</span>
        ))}
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────
// 💻  HERO TERMINAL — replaced image cluster
// ─────────────────────────────────────────────

// TERMINAL LINES — feel free to edit these to show your own code/commands
const TERMINAL_SEQUENCES = [
  {
    prompt: "pranav@portfolio:~$",
    cmd: "python manage.py runserver",
    output: [
      { text: "Watching for file changes with StatReloader", color: "#5a6480" },
      { text: "Performing system checks...", color: "#5a6480" },
      { text: "System check identified no issues.", color: "#22d3a5" },
      { text: "Django version 5.0 · Starting dev server at http://127.0.0.1:8000/", color: "#06b6d4" },
    ],
  },
  {
    prompt: "pranav@portfolio:~$",
    cmd: "curl -X POST /api/v2/campaign/optimize",
    output: [
      { text: '> Analyzing 13 ad platforms...', color: "#5a6480" },
      { text: '> Running LangChain pipeline...', color: "#5a6480" },
      { text: '> ROAS: 4.2x  CTR: +18%  CPA: -23%', color: "#22d3a5" },
      { text: '{"status": "optimized", "latency": "41ms"}', color: "#06b6d4" },
    ],
  },
  {
    prompt: "pranav@portfolio:~$",
    cmd: "python -c \"import openai; print('LLM ready')\"",
    output: [
      { text: "Loading HuggingFace Transformers...", color: "#5a6480" },
      { text: "Connecting OpenAI API... ✓", color: "#5a6480" },
      { text: "LangChain initialized... ✓", color: "#22d3a5" },
      { text: "LLM ready", color: "#06b6d4" },
    ],
  },
  {
    prompt: "pranav@portfolio:~$",
    cmd: "mongosh --eval \"db.ads.aggregate([...])\"",
    output: [
      { text: "Connecting to MongoDB Atlas...", color: "#5a6480" },
      { text: "Running aggregation pipeline...", color: "#5a6480" },
      { text: "Query time: 38ms  (↓35% vs baseline)", color: "#22d3a5" },
      { text: "{ docs: 142857, status: 'ok' }", color: "#06b6d4" },
    ],
  },
];

function HeroTerminal() {
  const [seqIdx, setSeqIdx]     = useState(0);
  const [phase, setPhase]       = useState("typing");   // typing | output | pause
  const [cmdText, setCmdText]   = useState("");
  const [shownLines, setShownLines] = useState([]);
  const [mounted, setMounted]   = useState(false);
  const [history, setHistory]   = useState([]);          // completed blocks
  const bodyRef = useRef(null);

  // entrance
  useEffect(() => { setTimeout(() => setMounted(true), 500); }, []);

  // auto-scroll
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [cmdText, shownLines, history]);

  const seq = TERMINAL_SEQUENCES[seqIdx];

  // typing phase
  useEffect(() => {
    if (!mounted || phase !== "typing") return;
    if (cmdText.length < seq.cmd.length) {
      const speed = 38 + Math.random() * 30;
      const t = setTimeout(() => setCmdText(seq.cmd.slice(0, cmdText.length + 1)), speed);
      return () => clearTimeout(t);
    } else {
      // done typing — pause then show output
      const t = setTimeout(() => setPhase("output"), 500);
      return () => clearTimeout(t);
    }
  }, [mounted, phase, cmdText, seq]);

  // output reveal — one line at a time
  useEffect(() => {
    if (phase !== "output") return;
    if (shownLines.length < seq.output.length) {
      const t = setTimeout(() => setShownLines(seq.output.slice(0, shownLines.length + 1)), 320);
      return () => clearTimeout(t);
    } else {
      // all output shown — pause then move to next sequence
      const t = setTimeout(() => setPhase("pause"), 1800);
      return () => clearTimeout(t);
    }
  }, [phase, shownLines, seq]);

  // pause phase — archive current block and advance
  useEffect(() => {
    if (phase !== "pause") return;
    const t = setTimeout(() => {
      setHistory(h => [...h.slice(-6), { prompt: seq.prompt, cmd: cmdText, output: shownLines }]);
      const next = (seqIdx + 1) % TERMINAL_SEQUENCES.length;
      setSeqIdx(next);
      setCmdText("");
      setShownLines([]);
      setPhase("typing");
    }, 600);
    return () => clearTimeout(t);
  }, [phase]);

  const LINE = { fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", lineHeight: 1.8 };
  const PROMPT_COLOR = "#06b6d4";

  return (
    <>
      <style>{`
        @keyframes term-in {
          from { opacity: 0; transform: translateY(-50%) translateX(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0)    scale(1); }
        }
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .term-cursor { display:inline-block; width:8px; height:1em; background:#06b6d4; vertical-align:text-bottom; animation: blink 1s step-end infinite; margin-left:2px; }
        .term-body::-webkit-scrollbar { width:3px; }
        .term-body::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.2); border-radius:2px; }
      `}</style>

      <div style={{
        position: "absolute",
        right: "5%",
        top: "50%",
        transform: "translateY(-50%)",
        width: 420,
        zIndex: 3,
        animation: mounted ? "term-in 0.8s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
        opacity: mounted ? 1 : 0,
      }}>
        {/* outer glow */}
        <div style={{
          position: "absolute", inset: -24,
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(6,182,212,0.07), transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Terminal window */}
        <div style={{
          background: "rgba(8,13,26,0.92)",
          border: "1px solid rgba(6,182,212,0.22)",
          backdropFilter: "blur(16px)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* scanline overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
          }} />

          {/* Title bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.65rem 1rem",
            borderBottom: "1px solid rgba(6,182,212,0.12)",
            background: "rgba(6,182,212,0.04)",
          }}>
            {/* traffic lights */}
            {["#ff5f56","#ffbd2e","#27c93f"].map((c,i) => (
              <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:0.8 }} />
            ))}
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.62rem", color: COLORS.gray, marginLeft:"0.6rem", letterSpacing:"0.1em" }}>
              terminal — pranav@portfolio
            </span>
            {/* live dot */}
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"0.4rem" }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:"#22d3a5", animation:"pulse-g 2s infinite" }} />
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.58rem", color:"#22d3a5" }}>LIVE</span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={bodyRef}
            className="term-body"
            style={{ padding:"1rem 1.2rem", height:300, overflowY:"auto", position:"relative", zIndex:2 }}
          >
            {/* history blocks */}
            {history.map((block, hi) => (
              <div key={hi} style={{ marginBottom:"0.8rem", opacity: 0.45 }}>
                <div style={LINE}>
                  <span style={{ color: PROMPT_COLOR }}>{block.prompt} </span>
                  <span style={{ color: COLORS.white }}>{block.cmd}</span>
                </div>
                {block.output.map((l, li) => (
                  <div key={li} style={{ ...LINE, color: l.color, paddingLeft:"0.5rem" }}>{l.text}</div>
                ))}
              </div>
            ))}

            {/* active block */}
            <div>
              {/* prompt + typed command */}
              <div style={LINE}>
                <span style={{ color: PROMPT_COLOR }}>{seq.prompt} </span>
                <span style={{ color: COLORS.white }}>{cmdText}</span>
                {phase === "typing" && <span className="term-cursor" />}
              </div>

              {/* output lines */}
              {shownLines.map((l, i) => (
                <div key={i} style={{ ...LINE, color: l.color, paddingLeft:"0.5rem" }}>{l.text}</div>
              ))}

              {/* blinking cursor when idle after output */}
              {phase !== "typing" && shownLines.length === seq.output.length && (
                <div style={LINE}>
                  <span style={{ color: PROMPT_COLOR }}>{seq.prompt} </span>
                  <span className="term-cursor" />
                </div>
              )}
            </div>
          </div>

          {/* Bottom status bar */}
          <div style={{
            borderTop:"1px solid rgba(6,182,212,0.1)",
            padding:"0.4rem 1.2rem",
            display:"flex", gap:"1.5rem",
            background:"rgba(6,182,212,0.03)",
          }}>
            {[
              { label:"PYTHON", val:"3.12" },
              { label:"DJANGO", val:"5.0" },
              { label:"FASTAPI", val:"0.115" },
            ].map(item => (
              <span key={item.label} style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", color: COLORS.gray, letterSpacing:"0.08em" }}>
                <span style={{ color: COLORS.cyan }}>{item.label}</span> {item.val}
              </span>
            ))}
            <span style={{ marginLeft:"auto", fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", color:"#22d3a5" }}>
              ● utf-8
            </span>
          </div>
        </div>
      </div>
    </>
  );
}




function SkillPill({ label }) {
  const [hov, setHov] = useState(false);
  const highlight = ["Python", "FastAPI", "Django", "MongoDB", "LangChain", "OpenAI API"].includes(label);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'Space Mono', monospace", fontSize: "0.68rem",
        color: hov || highlight ? COLORS.cyan : COLORS.white,
        border: `1px solid ${hov || highlight ? "rgba(6,182,212,0.4)" : COLORS.gray2}`,
        padding: "0.5rem 1rem", background: hov || highlight ? COLORS.cyanDim : COLORS.bg3,
        transition: "all 0.2s",
        clipPath: "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))",
      }}
    >{label}</span>
  );
}