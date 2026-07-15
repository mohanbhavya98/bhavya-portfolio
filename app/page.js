'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
  useMotionValue,
} from 'framer-motion';
import {
  ArrowUp,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
  BookOpen,
  Code2,
  Database,
  BarChart3,
  Sparkles,
  GraduationCap,
  Briefcase,
  Award,
  Trophy,
  Send,
  ChevronRight,
  Globe,
  Star,
  Zap,
  Brain,
  LineChart,
  Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

/* ============================================================================
 * REPLACEABLE CONTENT — update the PROFILE object to personalise everything.
 * Replace placeholder image / resume / socials / research / projects, etc.
 * ==========================================================================*/
const PROFILE = {
  name: 'Your Name',
  headline: 'Economics Researcher • Data Analyst • AI Workflow Developer',
  short:
    'I build data-driven research and AI workflows that turn economic theory into practical insight.',
  location: 'Bengaluru, India',
  email: 'you@example.com',
  bio: `I am an economics researcher and data analyst who loves turning messy data into clear stories. My work sits at the intersection of applied econometrics, statistical modelling and modern AI tooling — combining rigorous quantitative methods with pragmatic engineering. I publish research, ship production dashboards, and prototype AI workflows that help teams reason about complex problems faster.`,
  objective:
    'Pursue graduate-level research in applied economics and computational social science, contributing to reproducible, policy-relevant scholarship.',
  currentEducation: 'B.A. (Hons.) Economics — (Your University), Graduating 2026',
  interests: ['Labour Economics', 'Development Economics', 'Applied Econometrics', 'AI for Research', 'Causal Inference'],
  expertise: ['Statistical Modelling', 'Data Pipelines', 'Research Writing', 'LLM Workflows', 'Dashboarding'],

  // REPLACE: put your files inside /app/public/ and update these paths.
  profileImage: 'https://images.unsplash.com/photo-1607503873903-c5e95f80d7b9?crop=entropy&cs=srgb&fm=jpg&q=85&w=800',
  resumeUrl: '/resume.pdf',
  socials: {
    github: 'https://github.com/yourhandle',
    linkedin: 'https://linkedin.com/in/yourhandle',
    scholar: 'https://scholar.google.com/citations?user=xxxxx',
    ssrn: 'https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=xxxxx',
    website: 'https://yourdomain.com',
  },
};

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const RESEARCH = [
  {
    title: 'Impact of Automation on Labour Market Outcomes in Emerging Economies',
    abstract:
      'A panel-data analysis of how automation intensity affects wage growth, employment composition, and skill premia across 18 emerging economies (2005–2022).',
    status: 'Under Review',
    venue: 'Journal of Development Economics (Working Paper)',
    tech: ['Panel Data', 'Fixed Effects', 'Stata', 'R'],
    link: '#',
    pdf: '#',
  },
  {
    title: 'LLM-Assisted Literature Reviews: A Reproducible Framework',
    abstract:
      'Proposes a reproducible pipeline that uses large language models to accelerate systematic literature reviews without compromising academic rigour.',
    status: 'Published',
    venue: 'SSRN Working Paper Series',
    tech: ['LLMs', 'Python', 'PRISMA', 'RAG'],
    link: '#',
    pdf: '#',
  },
  {
    title: 'Behavioural Nudges and Financial Literacy Among College Students',
    abstract:
      'An RCT-inspired study examining the effect of light-touch behavioural nudges on savings behaviour and financial literacy of undergraduate students.',
    status: 'Presented',
    venue: 'National Economics Conference 2024',
    tech: ['RCT', 'ANOVA', 'Python', 'Survey Design'],
    link: '#',
    pdf: '#',
  },
];

const PROJECTS = [
  { name: 'econ-dash', description: 'Interactive dashboard visualising key macroeconomic indicators (GDP, CPI, unemployment) with forecasting overlays.', tech: ['Next.js', 'Recharts', 'Python', 'FRED API'], github: 'https://github.com/yourhandle/econ-dash', demo: 'https://econ-dash.example.com' },
  { name: 'ai-lit-reviewer', description: 'LLM-powered research assistant that ingests PDFs, extracts key findings, and generates structured literature notes.', tech: ['Python', 'LangChain', 'FastAPI', 'RAG'], github: 'https://github.com/yourhandle/ai-lit-reviewer', demo: null },
  { name: 'wage-panel-analysis', description: 'Reproducible pipeline for cleaning and analysing large multi-country wage panels with automated diagnostics.', tech: ['R', 'plm', 'DuckDB', 'Quarto'], github: 'https://github.com/yourhandle/wage-panel-analysis', demo: null },
  { name: 'micro-elasticity-lab', description: 'A teaching toolkit for microeconomics: simulate demand curves, elasticity, and welfare in the browser.', tech: ['React', 'D3', 'TypeScript'], github: 'https://github.com/yourhandle/micro-elasticity-lab', demo: 'https://micro-lab.example.com' },
  { name: 'policy-scraper', description: 'Scrapes and structures policy documents from Indian ministries into an analysis-ready dataset.', tech: ['Python', 'Playwright', 'MongoDB'], github: 'https://github.com/yourhandle/policy-scraper', demo: null },
  { name: 'gpt-workflow-kit', description: 'A small library of composable prompt templates + evaluation harness for reproducible AI workflows.', tech: ['TypeScript', 'OpenAI', 'Vitest'], github: 'https://github.com/yourhandle/gpt-workflow-kit', demo: null },
];

const SKILLS = [
  { group: 'Programming', icon: Code2, items: [ { name: 'Python', level: 92 }, { name: 'R', level: 85 }, { name: 'SQL', level: 80 } ] },
  { group: 'Data Science', icon: Database, items: [ { name: 'Pandas', level: 92 }, { name: 'NumPy', level: 88 }, { name: 'Matplotlib', level: 85 }, { name: 'Scikit-learn', level: 80 } ] },
  { group: 'Statistics & Economics', icon: LineChart, items: [ { name: 'Econometrics', level: 90 }, { name: 'Microeconomics', level: 90 }, { name: 'Macroeconomics', level: 82 }, { name: 'Labour Economics', level: 85 }, { name: 'Development Economics', level: 82 } ] },
  { group: 'Data Visualization', icon: BarChart3, items: [ { name: 'Power BI', level: 82 }, { name: 'Excel', level: 90 } ] },
  { group: 'Research', icon: BookOpen, items: [ { name: 'Literature Review', level: 92 }, { name: 'Academic Writing', level: 88 }, { name: 'Data Collection', level: 85 }, { name: 'Statistical Analysis', level: 88 } ] },
  { group: 'Development', icon: Cpu, items: [ { name: 'HTML', level: 88 }, { name: 'CSS', level: 82 }, { name: 'JavaScript', level: 78 }, { name: 'Git', level: 85 }, { name: 'GitHub', level: 88 } ] },
];

const EDUCATION = [
  { institution: 'Your University', degree: 'B.A. (Hons.) Economics', duration: '2023 — 2026 (Expected)', gpa: 'GPA: 3.9 / 4.0', coursework: ['Advanced Microeconomics', 'Econometrics I & II', 'Development Economics', 'Statistics for Economists', 'Machine Learning'] },
  { institution: 'Your Senior Secondary School', degree: 'Higher Secondary — Commerce with Mathematics', duration: '2021 — 2023', gpa: 'Percentage: 94%', coursework: ['Mathematics', 'Economics', 'Business Studies', 'Accountancy'] },
];

const EXPERIENCE = [
  { org: 'Institute for Applied Economic Research', role: 'Research Intern', dates: 'May 2025 — Aug 2025', description: 'Assisted lead researchers on a labour market dynamics study; wrote data cleaning pipelines and drafted sections of the working paper.', skills: ['Stata', 'R', 'Panel Data', 'Academic Writing'], achievements: ['Co-authored a working paper submitted for review', 'Automated a monthly data pipeline saving ~10 hours / month'] },
  { org: 'FinData Analytics', role: 'Data Analyst Intern', dates: 'Dec 2024 — Feb 2025', description: 'Built interactive Power BI dashboards for a portfolio analytics team and mentored two juniors on SQL best practices.', skills: ['SQL', 'Power BI', 'Python', 'ETL'], achievements: ['Shipped 4 production dashboards used by 40+ analysts', 'Reduced weekly reporting time by 60%'] },
  { org: 'Open Source — AI for Research', role: 'Contributor', dates: '2024 — Present', description: 'Maintain open-source tools that use LLMs to accelerate systematic reviews and research writing.', skills: ['Python', 'LangChain', 'RAG', 'OSS'], achievements: ['200+ stars across repositories', 'Merged PRs from 6 external contributors'] },
];

const ACHIEVEMENTS = [
  { icon: Trophy, title: 'Best Undergraduate Paper', detail: 'National Economics Conference 2024' },
  { icon: Award, title: 'Dean’s List', detail: 'All semesters, 2023 — 2025' },
  { icon: Star, title: 'Merit Scholarship', detail: 'Awarded top 1% incoming cohort' },
  { icon: BookOpen, title: 'Certified Data Analyst', detail: 'Google • IBM Data Science' },
  { icon: Sparkles, title: 'AI for Economics Fellow', detail: 'Selected cohort of 25 across India' },
  { icon: Zap, title: 'Hackathon Winner', detail: '1st place — FinTech Hack 2024' },
];

const COUNTERS = [
  { label: 'Research Papers', value: 3, icon: FileText },
  { label: 'GitHub Projects', value: 24, icon: Github },
  { label: 'Certifications', value: 8, icon: Award },
  { label: 'Publications', value: 2, icon: BookOpen },
];

/* ============ ANIMATION HELPERS ============ */
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const slideLeft = { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const slideRight = { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function Reveal({ children, variants = fadeUp, className = '', amount = 0.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

function Particles({ count = 40 }) {
  const dots = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2 + 0.5, dur: Math.random() * 20 + 15, delay: Math.random() * -20, opacity: Math.random() * 0.5 + 0.1 })), [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span key={d.id} className="absolute rounded-full bg-white" style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, opacity: d.opacity }} animate={{ y: [-10, 10, -10], opacity: [d.opacity, d.opacity * 1.6, d.opacity] }} transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

function CursorGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);
  return (
    <motion.div className="pointer-events-none fixed z-[1] hidden md:block" style={{ left: sx, top: sy, width: 500, height: 500, translateX: '-50%', translateY: '-50%', background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0) 60%)', borderRadius: '9999px' }} />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  return (<motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-blue-500 via-sky-400 to-purple-500" />);
}

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`relative flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${scrolled ? 'glass-strong shadow-[0_8px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'}`}>
          <a href="#home" onClick={go('home')} className="group flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold">
              {PROFILE.name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <span className="hidden text-sm font-semibold tracking-tight text-white/90 sm:block">{PROFILE.name}</span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} className={`link-underline px-3 py-1.5 text-[13px] font-medium transition-colors ${active === l.id ? 'text-white active' : 'text-white/60 hover:text-white'}`}>{l.label}</a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button asChild size="sm" className="rounded-full bg-white text-black hover:bg-white/90">
              <a href={PROFILE.resumeUrl} download><Download className="mr-1.5 h-3.5 w-3.5" /> Resume</a>
            </Button>
          </div>
          <button className="lg:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="glass-strong mt-2 overflow-hidden rounded-2xl p-2 lg:hidden">
              {NAV_LINKS.map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} className={`block rounded-lg px-3 py-2 text-sm ${active === l.id ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}`}>{l.label}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function Hero() {
  const roles = useMemo(() => ['Economics Researcher', 'Data Analyst', 'AI Workflow Developer'], []);
  const [typed, setTyped] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        setTyped(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), 1400);
      } else {
        setTyped(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
        if (charIdx - 1 === 0) { setDeleting(false); setRoleIdx((r) => (r + 1) % roles.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx, roles]);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 radial-glow" />
      <Particles count={60} />
      <motion.div aria-hidden className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" animate={{ x: [0, 40, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[120px]" animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />

      <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/70 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available for research collaborations • {PROFILE.location}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="text-balance text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
          <span className="text-gradient">Welcome to</span><br /><span className="text-gradient">My Portfolio</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.6 }} className="mt-8 h-8 text-lg font-medium tracking-wide text-white/70 md:text-xl">
          <span className="text-gradient-blue">{typed}</span>
          <span className="caret ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-blue-400 md:h-6" />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.9 }} className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">{PROFILE.short}</motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ripple group rounded-full bg-white px-6 text-black hover:bg-white/90" size="lg">
            View Projects<ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="lg" className="btn-ripple rounded-full border-white/20 bg-white/[0.03] text-white hover:bg-white/[0.08]" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Get in touch</Button>
        </motion.div>
      </motion.div>

      <motion.button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50 hover:text-white" aria-label="Scroll down">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="grid h-10 w-6 place-items-start rounded-full border border-white/20 p-1">
            <motion.span animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="block h-1.5 w-1 rounded-full bg-white" />
          </div>
        </div>
      </motion.button>
    </section>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />{eyebrow}
      </div>
      <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl"><span className="text-gradient">{title}</span></h2>
      {description && <p className="mx-auto mt-4 max-w-xl text-sm text-white/50 md:text-base">{description}</p>}
    </Reveal>
  );
}

function InfoCard({ icon: Icon, title, value }) {
  return (
    <div className="glass group rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:border-white/20">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/50"><Icon className="h-3.5 w-3.5 text-blue-400" /> {title}</div>
      <p className="mt-2 text-sm text-white/85">{value}</p>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="About Me" title="A researcher who codes, and a coder who researches." />
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal variants={slideLeft} className="order-2 lg:order-1">
            <p className="text-lg font-semibold text-white/90">{PROFILE.name}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-blue-400/80">{PROFILE.headline}</p>
            <p className="mt-6 leading-relaxed text-white/70">{PROFILE.bio}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={GraduationCap} title="Current Education" value={PROFILE.currentEducation} />
              <InfoCard icon={Sparkles} title="Career Objective" value={PROFILE.objective} />
            </div>
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Research Interests</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PROFILE.interests.map((i) => (<Badge key={i} variant="outline" className="border-white/10 bg-white/[0.03] text-white/80">{i}</Badge>))}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Areas of Expertise</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PROFILE.expertise.map((i) => (<Badge key={i} className="bg-blue-500/15 text-blue-200 hover:bg-blue-500/25">{i}</Badge>))}
              </div>
            </div>
          </Reveal>
          <Reveal variants={slideRight} className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent blur-2xl" />
              <div className="glass-strong relative h-full w-full overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PROFILE.profileImage} alt={PROFILE.name} className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{PROFILE.name}</p>
                    <p className="text-[11px] text-white/60 flex items-center gap-1"><MapPin className="h-3 w-3" /> {PROFILE.location}</p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-black/60 p-2 backdrop-blur"><Brain className="h-4 w-4 text-blue-300" /></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section id="resume" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow="Resume" title="A quick look at my CV." description="Download or preview my full CV — kept up to date with publications and projects." />
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="absolute inset-0 opacity-30 grid-bg" />
            <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-stretch">
              <div className="flex aspect-[3/4] w-full max-w-[220px] flex-col items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-4 text-center">
                <FileText className="h-10 w-10 text-blue-300" />
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60">Resume</p>
                <p className="mt-1 text-sm font-semibold text-white">{PROFILE.name}</p>
                <p className="mt-1 text-[11px] text-white/50">PDF • Updated 2025</p>
                <div className="mt-4 h-1 w-full rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" /></div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Curriculum Vitae</h3>
                  <p className="mt-2 max-w-lg text-sm text-white/60">Comprehensive overview of my education, research output, technical skills and professional experience. Optimised for graduate school applications and technical recruiting.</p>
                  <ul className="mt-4 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                    <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-blue-400" /> Research publications & talks</li>
                    <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-blue-400" /> Technical stack & tooling</li>
                    <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-blue-400" /> Awards, scholarships & courses</li>
                    <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-blue-400" /> Two-page academic format</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="btn-ripple rounded-full bg-white text-black hover:bg-white/90">
                    <a href={PROFILE.resumeUrl} download><Download className="mr-2 h-4 w-4" /> Download Resume</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="btn-ripple rounded-full border-white/20 bg-white/[0.03] text-white hover:bg-white/[0.08]">
                    <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> View Resume</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ResearchSection() {
  return (
    <section id="research" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Research" title="Research Papers & Publications" description="Selected working papers and publications across labour, development, and AI-for-research." />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="grid gap-6 md:grid-cols-2">
          {RESEARCH.map((p, i) => (
            <motion.div key={p.title} variants={fadeUp}>
              <Card className="group glass-strong h-full rounded-2xl border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.35)]">
                <div className="mb-3 flex items-center justify-between">
                  <Badge className={`${p.status === 'Published' ? 'bg-emerald-500/20 text-emerald-300' : p.status === 'Under Review' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'} border-transparent`}>{p.status}</Badge>
                  <span className="text-[11px] uppercase tracking-widest text-white/40">Paper #{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-blue-100">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{p.abstract}</p>
                <div className="mt-4 text-xs text-white/50"><span className="text-white/70">Venue:</span> {p.venue}</div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (<span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/70">{t}</span>))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button asChild size="sm" className="btn-ripple rounded-full bg-white text-black hover:bg-white/90"><a href={p.link} target="_blank" rel="noreferrer"><BookOpen className="mr-1.5 h-3.5 w-3.5" /> Read Paper</a></Button>
                  <Button asChild size="sm" variant="outline" className="btn-ripple rounded-full border-white/20 bg-transparent text-white hover:bg-white/[0.08]"><a href={p.pdf} target="_blank" rel="noreferrer"><FileText className="mr-1.5 h-3.5 w-3.5" /> SSRN / PDF</a></Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Projects" title="Selected GitHub Repositories" description="Open-source tools, dashboards and experiments — mostly at the intersection of data, economics and AI." />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <motion.div key={p.name} variants={fadeUp}>
              <Card className="group relative h-full overflow-hidden rounded-2xl border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_18px_60px_-20px_rgba(96,165,250,0.4)]">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl" />
                </div>
                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-black"><Github className="h-5 w-5 text-white" /></div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-white/40">Repository</p>
                      <h3 className="text-base font-semibold text-white">{p.name}</h3>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">Public</span>
                </div>
                <p className="relative mt-4 text-sm leading-relaxed text-white/60">{p.description}</p>
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (<span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/70">{t}</span>))}
                </div>
                <div className="relative mt-6 flex gap-2">
                  <Button asChild size="sm" variant="outline" className="btn-ripple rounded-full border-white/20 bg-white/[0.03] text-white hover:bg-white/[0.1]"><a href={p.github} target="_blank" rel="noreferrer"><Github className="mr-1.5 h-3.5 w-3.5" /> GitHub</a></Button>
                  {p.demo && (<Button asChild size="sm" className="btn-ripple rounded-full bg-white text-black hover:bg-white/90"><a href={p.demo} target="_blank" rel="noreferrer"><ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live Demo</a></Button>)}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillBar({ name, level }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref}>
      <div className="mb-1 flex items-center justify-between text-xs"><span className="text-white/80">{name}</span><span className="text-white/40">{level}%</span></div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div initial={{ width: 0 }} animate={{ width: inView ? `${level}%` : 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="h-full rounded-full bg-gradient-to-r from-blue-400 via-sky-400 to-purple-500" />
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Skills" title="Toolkit & Techniques" description="A snapshot of the technical and analytical toolkit I use for research and applied projects." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((g, i) => (
            <Reveal key={g.group} variants={i % 2 === 0 ? slideLeft : slideRight}>
              <div className="glass-strong h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10"><g.icon className="h-5 w-5 text-blue-300" /></div>
                  <h3 className="text-base font-semibold">{g.group}</h3>
                </div>
                <div className="space-y-3.5">{g.items.map((s) => (<SkillBar key={s.name} name={s.name} level={s.level} />))}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Experience" title="Internships & Research Work" description="Hands-on experience across research institutes, analytics teams and open-source communities." />
        <div className="space-y-6">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.org} variants={i % 2 === 0 ? slideLeft : slideRight}>
              <div className="glass-strong group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-white/25 md:p-8">
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl transition-opacity duration-500 group-hover:bg-blue-500/20" />
                <div className="relative grid gap-4 md:grid-cols-[1fr_2fr]">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/50"><Briefcase className="h-3.5 w-3.5 text-blue-300" /> {e.dates}</div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{e.role}</h3>
                    <p className="text-sm text-blue-300/80">{e.org}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">{e.skills.map((s) => (<span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/70">{s}</span>))}</div>
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-white/70">{e.description}</p>
                    <div className="mt-4">
                      <p className="text-[11px] uppercase tracking-widest text-white/50">Highlights</p>
                      <ul className="mt-2 space-y-1.5">{e.achievements.map((a) => (<li key={a} className="flex items-start gap-2 text-sm text-white/80"><ChevronRight className="mt-1 h-3 w-3 flex-none text-blue-400" /> {a}</li>))}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader eyebrow="Education" title="Academic Journey" description="Where the foundations were laid." />
        <div className="relative">
          <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent md:left-1/2" />
          <div className="space-y-10">
            {EDUCATION.map((edu, i) => (
              <Reveal key={edu.institution} variants={i % 2 === 0 ? slideRight : slideLeft}>
                <div className={`relative md:flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                    <div className="glass-strong rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:border-white/25">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/50"><GraduationCap className="h-3.5 w-3.5 text-blue-300" /> {edu.duration}</div>
                      <h3 className="mt-2 text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-blue-300/80">{edu.institution}</p>
                      <p className="mt-2 text-sm text-white/70">{edu.gpa}</p>
                      <div className="mt-4">
                        <p className="text-[11px] uppercase tracking-widest text-white/50">Key coursework</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">{edu.coursework.map((c) => (<span key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/75">{c}</span>))}</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2">
                    <div className="grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 ring-4 ring-black"><span className="h-1.5 w-1.5 rounded-full bg-white" /></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({ to = 0, duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}</span>;
}

function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Achievements" title="Recognition & Milestones" description="A summary of research talks, publications, awards and certifications." />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COUNTERS.map((c) => (
            <motion.div key={c.label} variants={fadeUp}>
              <div className="glass-strong flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-white/25">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10"><c.icon className="h-5 w-5 text-blue-300" /></div>
                <div>
                  <p className="text-3xl font-bold text-white"><CountUp to={c.value} />+</p>
                  <p className="text-xs uppercase tracking-widest text-white/50">{c.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a) => (
            <motion.div key={a.title} variants={fadeUp}>
              <div className="glass group rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-white/25">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-amber-400/20 to-pink-500/10 ring-1 ring-white/10"><a.icon className="h-5 w-5 text-amber-300" /></div>
                  <div>
                    <p className="text-sm font-semibold text-white">{a.title}</p>
                    <p className="text-xs text-white/50">{a.detail}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill in your name, email, and message.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (res.ok) { toast.success('Message sent — I’ll get back to you soon.'); setForm({ name: '', email: '', subject: '', message: '' }); }
      else { toast.error(data?.error || 'Something went wrong.'); }
    } catch (err) { toast.error('Network error. Please try again.'); }
    finally { setLoading(false); }
  };
  const contactLinks = [
    { icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/yourhandle', href: PROFILE.socials.linkedin },
    { icon: Github, label: 'GitHub', value: 'github.com/yourhandle', href: PROFILE.socials.github },
    { icon: Globe, label: 'Website', value: PROFILE.socials.website?.replace(/^https?:\/\//, ''), href: PROFILE.socials.website },
    { icon: GraduationCap, label: 'Google Scholar', value: 'scholar.google.com', href: PROFILE.socials.scholar },
    { icon: FileText, label: 'SSRN', value: 'papers.ssrn.com', href: PROFILE.socials.ssrn },
  ];
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Contact" title="Let’s work together." description="Have a research idea, collaboration or role in mind? Send me a note — I read every message." />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal variants={slideLeft}>
            <form onSubmit={submit} className="glass-strong space-y-4 rounded-2xl p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/50">Name</label>
                  <Input className="mt-1 border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus-visible:ring-blue-500" placeholder="Ada Lovelace" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/50">Email</label>
                  <Input type="email" className="mt-1 border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus-visible:ring-blue-500" placeholder="ada@analytical.engine" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-white/50">Subject</label>
                <Input className="mt-1 border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus-visible:ring-blue-500" placeholder="Research collaboration" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-white/50">Message</label>
                <Textarea rows={6} className="mt-1 border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus-visible:ring-blue-500" placeholder="Tell me about your project..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-white/40">Typically replies within 48 hours.</p>
                <Button type="submit" disabled={loading} className="btn-ripple rounded-full bg-white px-5 text-black hover:bg-white/90">
                  {loading ? 'Sending...' : (<><Send className="mr-1.5 h-3.5 w-3.5" /> Send message</>)}
                </Button>
              </div>
            </form>
          </Reveal>
          <Reveal variants={slideRight}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {contactLinks.map((c) => (
                <a key={c.label} href={c.href} target={c.href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="glass group flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-white/25">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10"><c.icon className="h-4 w-4 text-blue-300" /></div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-widest text-white/50">{c.label}</p>
                    <p className="truncate text-sm text-white/85">{c.value || '—'}</p>
                  </div>
                  <ExternalLink className="ml-auto h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-white/80" />
                </a>
              ))}
              <a href={PROFILE.resumeUrl} download className="glass group col-span-1 flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-white/25 sm:col-span-2">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-gradient-to-br from-emerald-400/20 to-blue-500/20 ring-1 ring-white/10"><Download className="h-4 w-4 text-emerald-300" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-white/50">CV Download</p>
                  <p className="text-sm text-white/85">Grab the latest PDF of my CV</p>
                </div>
                <ExternalLink className="ml-auto h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-white/80" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={label} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-white">
      <Icon className="h-4 w-4" />
    </a>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold">{PROFILE.name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase()}</div>
              <span className="text-sm font-semibold text-white/90">{PROFILE.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/50">Turning economic questions into reproducible data-driven answers.</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/50">Quick Links</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">{NAV_LINKS.map((l) => (<li key={l.id}><a href={`#${l.id}`} className="text-white/70 hover:text-white">{l.label}</a></li>))}</ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/50">Elsewhere</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <SocialIcon href={PROFILE.socials.github} icon={Github} label="GitHub" />
              <SocialIcon href={PROFILE.socials.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialIcon href={`mailto:${PROFILE.email}`} icon={Mail} label="Email" />
              <SocialIcon href={PROFILE.socials.scholar} icon={GraduationCap} label="Scholar" />
              <SocialIcon href={PROFILE.socials.ssrn} icon={FileText} label="SSRN" />
              <SocialIcon href={PROFILE.socials.website} icon={Globe} label="Website" />
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-ripple flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/70 hover:text-white">
            <ArrowUp className="h-3.5 w-3.5" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <main className="relative min-h-screen bg-black text-white">
      <ScrollProgress />
      <CursorGlow />
      <Navbar active={active} />
      <Hero />
      <About />
      <ResumeSection />
      <ResearchSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

export default App;
