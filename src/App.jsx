import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import LiveTerminal from "./components/LiveTerminal";
import ContactSection from "./components/ContactSection";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "experience", "terminal", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 260) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#030508] text-[#f8fafc] min-h-screen font-body relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      
      {/* Noise Texture Overlay for Editorial Grain */}
      <div className="noise-overlay" />

      {/* Magnetic Cursor */}
      <CustomCursor />

      {/* Global Navbar */}
      <Navbar activeSection={activeSection} />

      {/* ── 00. Pinned Scroll-Controlled Hero Section ── */}
      <Hero onNavigate={handleNavigate} />

      {/* ── 01. About Persona & Engineering Pillars ── */}
      <AboutSection />

      {/* ── 02. Featured Architectures & Projects ── */}
      <ProjectsSection />

      {/* ── 03. Technical Matrix & Skills ── */}
      <SkillsSection />

      {/* ── 04. Career Milestones & Experience ── */}
      <ExperienceSection />

      {/* ── 05. Live Backend Console Simulation ── */}
      <LiveTerminal />

      {/* ── 06. Contact & Direct Connect ── */}
      <ContactSection />

      {/* ── Footer ── */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#020306] text-center relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-code text-xs text-slate-500">
          <div>
            PRANAV DWIVEDI © {new Date().getFullYear()} — ENGINEERED FOR PERFORMANCE & SCALE
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-cyan-400">FASTAPI</span> · <span className="text-cyan-400">PYTHON</span> · <span className="text-cyan-400">MONGODB</span> · <span className="text-cyan-400">LANGCHAIN</span>
          </div>
        </div>
      </footer>

    </div>
  );
}