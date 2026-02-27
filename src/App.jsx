import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Brain, Cpu, Zap, Code2, Bot, Layers, Network, ChevronRight,
  ArrowRight, Menu, X, Github, Twitter, Linkedin, Globe,
  CheckCircle, Send, Sparkles, Activity, Shield, Eye,
  CircuitBoard, Atom, Radar, TerminalSquare, Microscope, Rocket
} from "lucide-react";

// ============================================================
// CONTENT CONFIGURATION — Edit all text here
// ============================================================
const CONTENT = {
  company: {
    name: "Aventirix",
    tagline: "Technology",
    status: "System Status: Online",
    copyright: "© 2025 Aventirix Technology. All rights reserved.",
  },
  nav: {
    links: ["Journey", "Services", "Stack", "About", "Contact"],
    cta: "Get Started",
  },
  hero: {
    badge: "Next-Gen AI Infrastructure",
    headline1: "Agentic AI",
    headline2: "to Physical Reality",
    subheadline: "We engineer the bridge between autonomous intelligence and the physical world — deploying AI agents, LLM systems, and robotic platforms that think, act, and evolve.",
    cta1: "Explore Our Work",
    cta2: "Watch Demo",
    stats: [
      { value: "300+", label: "AI Deployments" },
      { value: "99.8%", label: "Uptime SLA" },
      { value: "40+", label: "Enterprise Clients" },
    ],
  },
  journey: {
    badge: "The Transformation Path",
    title: "From Thought to Action",
    subtitle: "A deliberate, layered architecture that transforms raw intelligence into physical capability.",
    steps: [
      {
        num: "01",
        icon: Brain,
        title: "Agentic Intelligence",
        desc: "We build autonomous AI agents with memory, reasoning, and goal-directed behavior — systems that plan multi-step tasks without human intervention.",
        color: "#00FF9D",
      },
      {
        num: "02",
        icon: Network,
        title: "LLM Orchestration",
        desc: "Fine-tuned language models coordinate agents, tools, and APIs — creating cognitive layers that understand context, intent, and domain knowledge.",
        color: "#00C2FF",
      },
      {
        num: "03",
        icon: CircuitBoard,
        title: "Edge Integration",
        desc: "Intelligence is compressed and deployed at the edge — on embedded systems, FPGAs, and microcontrollers — enabling real-time, offline decision-making.",
        color: "#A855F7",
      },
      {
        num: "04",
        icon: Bot,
        title: "Physical AI (Robotics)",
        desc: "The cognitive layer merges with mechanical systems — robotic arms, autonomous vehicles, and sensor arrays that perceive and act in the physical world.",
        color: "#FF6B35",
      },
    ],
  },
  services: {
    badge: "What We Build",
    title: "End-to-End AI Engineering",
    subtitle: "From strategic consulting to hardware deployment — we own every layer of the stack.",
    items: [
      {
        icon: Sparkles,
        title: "AI Consulting",
        desc: "Strategic AI roadmaps, architecture audits, and transformation blueprints for enterprises entering the AI-first era.",
        tags: ["Strategy", "Roadmap", "Audit"],
        color: "#00FF9D",
        featured: true,
      },
      {
        icon: Brain,
        title: "LLM Integration",
        desc: "Custom fine-tuning, RAG pipelines, and multi-agent orchestration built on GPT-4, Claude, Gemini, and open-source models.",
        tags: ["RAG", "Fine-tuning", "Multi-Agent"],
        color: "#00C2FF",
        featured: false,
      },
      {
        icon: Bot,
        title: "Custom Robotics",
        desc: "End-to-end robotic system design — from actuator selection and ROS2 architecture to perception stacks and motor control.",
        tags: ["ROS2", "Perception", "Control"],
        color: "#A855F7",
        featured: false,
      },
      {
        icon: Cpu,
        title: "Edge AI",
        desc: "Quantized model deployment on NVIDIA Jetson, Raspberry Pi, and custom FPGA platforms for real-time inference at the edge.",
        tags: ["Jetson", "FPGA", "TensorRT"],
        color: "#FF6B35",
        featured: false,
      },
      {
        icon: Shield,
        title: "AI Security",
        desc: "Red-teaming, adversarial testing, and alignment frameworks to ensure your AI systems are safe, auditable, and trustworthy.",
        tags: ["Red-Team", "Alignment", "Audit"],
        color: "#00FF9D",
        featured: false,
      },
      {
        icon: Radar,
        title: "Sensor Fusion",
        desc: "Kalman filtering, LiDAR-camera fusion, and IMU integration for robust spatial awareness in autonomous systems.",
        tags: ["LiDAR", "Kalman", "SLAM"],
        color: "#00C2FF",
        featured: false,
      },
    ],
  },
  stack: {
    badge: "Technology Stack",
    title: "Built on the Frontier",
    items: [
      "PyTorch", "TensorRT", "ROS2", "CUDA", "OpenAI", "LangChain",
      "Kubernetes", "FastAPI", "Rust", "FPGA", "JAX", "Triton",
      "Anthropic", "Hugging Face", "ONNX", "AutoGen", "vLLM", "Isaac Sim",
    ],
  },
  about: {
    badge: "About Aventirix",
    title: "We Don't Just Build AI. We Build What AI Can Do.",
    body: "Founded by engineers from robotics labs and AI research institutions, Aventirix sits at the rare intersection of software intelligence and physical systems. We believe the next decade belongs to companies that can make AI tangible — not just in chatbots, but in machines that move, sense, and transform industries.",
    values: [
      { icon: Atom, title: "Research-First", desc: "Every system we build is grounded in peer-reviewed research and validated benchmarks." },
      { icon: Layers, title: "Full-Stack Ownership", desc: "We own the entire stack — from transformer architecture to motor driver firmware." },
      { icon: Eye, title: "Transparent AI", desc: "We build explainable, auditable systems — because trust is the only moat that matters." },
    ],
  },
  contact: {
    badge: "Start a Project",
    title: "Let's Build Something Real",
    subtitle: "Tell us about your vision. We'll tell you how to execute it.",
    fields: {
      name: "Full Name",
      company: "Company / Organization",
      inquiry: "Project Inquiry",
      inquiryPlaceholder: "Describe your AI or robotics challenge...",
    },
    cta: "Transmit Inquiry",
    email: "hello@aventirix.ai",
    location: "San Francisco · Singapore · Berlin",
  },
  footer: {
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
    socials: [
      { icon: Twitter, href: "#", label: "Twitter" },
      { icon: Linkedin, href: "#", label: "LinkedIn" },
      { icon: Github, href: "#", label: "GitHub" },
      { icon: Globe, href: "#", label: "Website" },
    ],
  },
};

// ============================================================
// UTILITY HOOKS
// ============================================================
const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

// ============================================================
// PARTICLE BACKGROUND
// ============================================================
const ParticleField = () => {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.03) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />
      {/* Orb gradients */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "60vw", height: "60vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,194,255,0.06) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", bottom: "-20%", left: "-10%",
        width: "50vw", height: "50vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      {/* Animated particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.id % 3 === 0 ? "#00FF9D" : p.id % 3 === 1 ? "#00C2FF" : "#A855F7",
            opacity: p.opacity,
          }}
          animate={{ y: [0, -30, 0], opacity: [p.opacity, p.opacity * 2, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

// ============================================================
// LOGO COMPONENT
// ============================================================
const Logo = ({ size = "md" }) => {
  const sizes = { sm: 28, md: 36, lg: 48 };
  const s = sizes[size];
  const textSize = size === "sm" ? "text-base" : size === "md" ? "text-xl" : "text-3xl";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Geometric logo mark */}
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF9D" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
          <linearGradient id="lg2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
        </defs>
        {/* Hexagon outer */}
        <polygon points="24,2 44,13 44,35 24,46 4,35 4,13" stroke="url(#lg1)" strokeWidth="1.5" fill="none" opacity="0.6" />
        {/* Inner diamond */}
        <polygon points="24,8 38,24 24,40 10,24" fill="url(#lg1)" opacity="0.15" />
        <polygon points="24,8 38,24 24,40 10,24" stroke="url(#lg1)" strokeWidth="1" fill="none" />
        {/* Center dot */}
        <circle cx="24" cy="24" r="4" fill="url(#lg1)" />
        {/* Connecting lines */}
        <line x1="24" y1="8" x2="24" y2="20" stroke="url(#lg2)" strokeWidth="1" opacity="0.7" />
        <line x1="38" y1="24" x2="28" y2="24" stroke="url(#lg2)" strokeWidth="1" opacity="0.7" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{
          fontFamily: "'Orbitron', 'Space Mono', monospace",
          fontWeight: 700,
          fontSize: size === "sm" ? "14px" : size === "md" ? "18px" : "26px",
          background: "linear-gradient(135deg, #00FF9D, #00C2FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.08em",
        }}>
          AVENTIRIX
        </span>
        <span style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: size === "sm" ? "8px" : "10px",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.25em",
          marginTop: "1px",
        }}>
          TECHNOLOGY
        </span>
      </div>
    </div>
  );
};

// ============================================================
// NAVIGATION
// ============================================================
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 24px",
          backdropFilter: scrolled ? "blur(24px) saturate(150%)" : "blur(0px)",
          background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(0,255,157,0.08)" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <Logo size="sm" />
          {/* Desktop links */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden-mobile">
            {CONTENT.nav.links.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.55)", fontSize: "13px",
                  fontFamily: "'Orbitron', monospace", letterSpacing: "0.12em",
                  textTransform: "uppercase", transition: "color 0.2s",
                }}
                onMouseEnter={e => e.target.style.color = "#00FF9D"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
              >
                {link}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("contact")}
              style={{
                padding: "9px 22px",
                background: "linear-gradient(135deg, #00FF9D, #00C2FF)",
                border: "none", borderRadius: 6, cursor: "pointer",
                fontFamily: "'Orbitron', monospace", fontSize: "11px",
                fontWeight: 700, letterSpacing: "0.1em", color: "#050505",
                textTransform: "uppercase",
              }}
            >
              {CONTENT.nav.cta}
            </motion.button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "none" }}
              className="show-mobile"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed", top: 72, left: 0, right: 0, zIndex: 99,
              background: "rgba(5,5,5,0.97)", backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(0,255,157,0.1)",
              padding: "24px",
            }}
          >
            {CONTENT.nav.links.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.7)", fontSize: "14px",
                  fontFamily: "'Orbitron', monospace", letterSpacing: "0.12em",
                  textTransform: "uppercase", padding: "14px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================================
// HERO SECTION
// ============================================================
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "120px 24px 80px" }}>
      <ParticleField />

      {/* Animated ring */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80vmin", height: "80vmin", borderRadius: "50%", border: "1px solid rgba(0,255,157,0.06)", pointerEvents: "none" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", inset: -1, borderRadius: "50%", border: "1px dashed rgba(0,194,255,0.1)" }} />
      </div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "55vmin", height: "55vmin", borderRadius: "50%", border: "1px solid rgba(168,85,247,0.06)", pointerEvents: "none" }}>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", inset: -1, borderRadius: "50%", border: "1px dashed rgba(168,85,247,0.12)" }} />
      </div>

      <motion.div style={{ y, opacity }} className="hero-content" >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, border: "1px solid rgba(0,255,157,0.25)", background: "rgba(0,255,157,0.05)", marginBottom: 32 }}>
            <Activity size={12} color="#00FF9D" />
            <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "11px", color: "#00FF9D", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {CONTENT.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: "'Orbitron', monospace", fontWeight: 800, lineHeight: 1.05, marginBottom: 12 }}>
            <span style={{ display: "block", fontSize: "clamp(48px, 8vw, 96px)", background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {CONTENT.hero.headline1}
            </span>
            <span style={{ display: "block", fontSize: "clamp(48px, 8vw, 96px)", background: "linear-gradient(135deg, #00FF9D, #00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {CONTENT.hero.headline2}
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 48px", fontFamily: "'DM Sans', sans-serif" }}>
            {CONTENT.hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(0,255,157,0.3)" }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "14px 32px", border: "none", borderRadius: 8, cursor: "pointer",
                background: "linear-gradient(135deg, #00FF9D, #00C2FF)", color: "#050505",
                fontFamily: "'Orbitron', monospace", fontSize: "12px", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8,
              }}>
              {CONTENT.hero.cta1} <ArrowRight size={14} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                padding: "14px 32px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, cursor: "pointer",
                background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.75)",
                fontFamily: "'Orbitron', monospace", fontSize: "12px", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8,
                backdropFilter: "blur(8px)",
              }}>
              {CONTENT.hero.cta2}
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
            style={{ display: "flex", justifyContent: "center", gap: "clamp(32px, 6vw, 80px)", flexWrap: "wrap" }}>
            {CONTENT.hero.stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, background: "linear-gradient(135deg, #00FF9D, #00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {s.value}
                </div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", fontFamily: "'Orbitron', monospace", letterSpacing: "0.1em", marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(transparent, #050505)", pointerEvents: "none" }} />
    </section>
  );
};

// ============================================================
// SECTION WRAPPER
// ============================================================
const SectionBadge = ({ children, color = "#00FF9D" }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 100, border: `1px solid ${color}30`, background: `${color}08`, marginBottom: 20 }}>
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: color }} />
    <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "10px", color, letterSpacing: "0.18em", textTransform: "uppercase" }}>
      {children}
    </span>
  </div>
);

const AnimatedSection = ({ children, id, style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section id={id} ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ padding: "100px 24px", maxWidth: 1280, margin: "0 auto", ...style }}>
      {children}
    </motion.section>
  );
};

// ============================================================
// JOURNEY SECTION
// ============================================================
const Journey = () => {
  const { steps, badge, title, subtitle } = CONTENT.journey;
  return (
    <section id="journey" style={{ padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SectionBadge>{badge}</SectionBadge>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#fff", marginBottom: 16 }}>
            {title}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 500, margin: "0 auto", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{subtitle}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2, position: "relative" }}>
          {/* Connector line */}
          <div style={{ position: "absolute", top: "80px", left: "12.5%", right: "12.5%", height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,157,0.2), rgba(0,194,255,0.2), rgba(168,85,247,0.2), transparent)", zIndex: 0 }} className="connector-line" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }} viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                style={{
                  position: "relative", padding: "36px 28px",
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16, backdropFilter: "blur(8px)", cursor: "default",
                  borderTop: `2px solid ${step.color}40`,
                }}
              >
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "11px", color: step.color, opacity: 0.6, letterSpacing: "0.2em", marginBottom: 20 }}>
                  {step.num}
                </div>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: `${step.color}12`, border: `1px solid ${step.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon size={22} color={step.color} />
                </div>
                <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                  {step.desc}
                </p>

                {i < steps.length - 1 && (
                  <div style={{ position: "absolute", right: -16, top: "50%", transform: "translateY(-50%)", zIndex: 2 }} className="journey-arrow">
                    <ChevronRight size={20} color="rgba(255,255,255,0.15)" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SERVICES SECTION
// ============================================================
const Services = () => {
  const { items, badge, title, subtitle } = CONTENT.services;
  return (
    <section id="services" style={{ padding: "100px 24px", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <SectionBadge color="#00C2FF">{badge}</SectionBadge>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#fff", marginBottom: 16 }}>
            {title}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 500, margin: "0 auto", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>{subtitle}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {items.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  padding: "32px 28px",
                  background: svc.featured ? `linear-gradient(135deg, rgba(0,255,157,0.07), rgba(0,194,255,0.05))` : "rgba(255,255,255,0.025)",
                  border: svc.featured ? `1px solid rgba(0,255,157,0.2)` : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16, backdropFilter: "blur(8px)", cursor: "default",
                  position: "relative", overflow: "hidden",
                }}
              >
                {svc.featured && (
                  <div style={{ position: "absolute", top: 16, right: 16, padding: "3px 10px", borderRadius: 100, background: "rgba(0,255,157,0.15)", border: "1px solid rgba(0,255,157,0.3)" }}>
                    <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "9px", color: "#00FF9D", letterSpacing: "0.15em" }}>FEATURED</span>
                  </div>
                )}
                <div style={{ width: 48, height: 48, borderRadius: 10, background: `${svc.color}12`, border: `1px solid ${svc.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon size={20} color={svc.color} />
                </div>
                <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: 10 }}>
                  {svc.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.7, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
                  {svc.desc}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {svc.tags.map(t => (
                    <span key={t} style={{ padding: "3px 10px", borderRadius: 100, background: `${svc.color}10`, border: `1px solid ${svc.color}20`, fontSize: "11px", color: svc.color, fontFamily: "'Orbitron', monospace", letterSpacing: "0.08em" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// TECH STACK MARQUEE
// ============================================================
const TechStack = () => {
  const { badge, title, items } = CONTENT.stack;
  const doubled = [...items, ...items];
  return (
    <section id="stack" style={{ padding: "100px 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: 56, padding: "0 24px" }}>
        <SectionBadge color="#A855F7">{badge}</SectionBadge>
        <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#fff" }}>
          {title}
        </h2>
      </div>

      {/* Marquee row 1 */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(90deg, #050505, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(-90deg, #050505, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <motion.div animate={{ x: [0, -1920] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: 12, width: "max-content" }}>
          {doubled.map((tech, i) => (
            <div key={i} style={{ padding: "10px 24px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", whiteSpace: "nowrap", fontFamily: "'Orbitron', monospace", fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>
              {tech}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee row 2 (reverse) */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(90deg, #050505, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(-90deg, #050505, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <motion.div animate={{ x: [-1920, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: 12, width: "max-content" }}>
          {[...doubled].reverse().map((tech, i) => (
            <div key={i} style={{ padding: "10px 24px", borderRadius: 8, background: "rgba(0,194,255,0.04)", border: "1px solid rgba(0,194,255,0.1)", whiteSpace: "nowrap", fontFamily: "'Orbitron', monospace", fontSize: "12px", color: "rgba(0,194,255,0.6)", letterSpacing: "0.1em" }}>
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================
// ABOUT SECTION
// ============================================================
const About = () => {
  const { badge, title, body, values } = CONTENT.about;
  return (
    <section id="about" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <SectionBadge>{badge}</SectionBadge>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 24 }}>
            {title}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif" }}>
            {body}
          </p>

          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              marginTop: 32, padding: "12px 28px", border: "1px solid rgba(0,255,157,0.3)", borderRadius: 8,
              background: "transparent", color: "#00FF9D", cursor: "pointer",
              fontFamily: "'Orbitron', monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
            Start a Conversation <ArrowRight size={12} />
          </motion.button>
        </motion.div>

        {/* Right - Value cards */}
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }} viewport={{ once: true }}
                style={{ padding: "24px 24px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 10, background: "rgba(0,255,157,0.08)", border: "1px solid rgba(0,255,157,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color="#00FF9D" />
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Orbitron', monospace", fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: 6 }}>{v.title}</h4>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{v.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================
// CONTACT SECTION
// ============================================================
const Contact = () => {
  const [form, setForm] = useState({ name: "", company: "", inquiry: "" });
  const [submitted, setSubmitted] = useState(false);
  const { badge, title, subtitle, fields, cta, email, location } = CONTENT.contact;

  const handleSubmit = () => {
    if (form.name && form.company && form.inquiry) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" style={{ padding: "100px 24px", position: "relative" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,255,157,0.04) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionBadge>{badge}</SectionBadge>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#fff", marginBottom: 16 }}>{title}</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>{subtitle}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} viewport={{ once: true }}
          style={{
            padding: "48px 40px", borderRadius: 20,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)", position: "relative", overflow: "hidden",
          }}>
          {/* Corner accents */}
          <div style={{ position: "absolute", top: 0, left: 0, width: 60, height: 60, borderTop: "2px solid rgba(0,255,157,0.3)", borderLeft: "2px solid rgba(0,255,157,0.3)", borderRadius: "20px 0 0 0", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60, borderBottom: "2px solid rgba(0,194,255,0.3)", borderRight: "2px solid rgba(0,194,255,0.3)", borderRadius: "0 0 20px 0", pointerEvents: "none" }} />

          <AnimatePresence>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "48px 0" }}>
                <CheckCircle size={56} color="#00FF9D" style={{ margin: "0 auto 20px" }} />
                <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "20px", color: "#fff", marginBottom: 12 }}>Inquiry Transmitted</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>We'll respond within 24 hours.</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { key: "name", label: fields.name, type: "text", placeholder: "Your full name" },
                  { key: "company", label: fields.company, type: "text", placeholder: "Company or organization" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontFamily: "'Orbitron', monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>{f.label}</label>
                    <input
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      style={{
                        width: "100%", padding: "14px 18px", borderRadius: 8,
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                        outline: "none", boxSizing: "border-box",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor = "rgba(0,255,157,0.4)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontFamily: "'Orbitron', monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>{fields.inquiry}</label>
                  <textarea
                    value={form.inquiry}
                    onChange={e => setForm(p => ({ ...p, inquiry: e.target.value }))}
                    placeholder={fields.inquiryPlaceholder}
                    rows={5}
                    style={{
                      width: "100%", padding: "14px 18px", borderRadius: 8,
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                      outline: "none", resize: "vertical", boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(0,255,157,0.4)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
                <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(0,255,157,0.25)" }} whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  style={{
                    padding: "15px 28px", border: "none", borderRadius: 8, cursor: "pointer",
                    background: "linear-gradient(135deg, #00FF9D, #00C2FF)", color: "#050505",
                    fontFamily: "'Orbitron', monospace", fontSize: "12px", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  }}>
                  {cta} <Send size={14} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>{email}</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>·</span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>{location}</span>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = () => {
  const { links, socials } = CONTENT.footer;
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
        <Logo size="sm" />

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          {links.map(l => (
            <a key={l.label} href={l.href} style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", fontFamily: "'Orbitron', monospace", letterSpacing: "0.1em", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {socials.map(s => {
            const Icon = s.icon;
            return (
              <a key={s.label} href={s.href} aria-label={s.label}
                style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,157,0.3)"; e.currentTarget.style.color = "#00FF9D"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "24px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>{CONTENT.company.copyright}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FF9D" }} />
          <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "10px", color: "#00FF9D", letterSpacing: "0.15em" }}>
            {CONTENT.company.status}
          </span>
        </div>
      </div>
    </footer>
  );
};

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
          background: #050505;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,157,0.25); border-radius: 4px; }

        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }

        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .connector-line { display: none !important; }
          .journey-arrow { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh" }}>
        <Navigation />
        <Hero />
        <Journey />
        <Services />
        <TechStack />
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
