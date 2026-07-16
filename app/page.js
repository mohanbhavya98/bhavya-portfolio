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
  TrendingUp,
  Quote,
  BadgeCheck,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

/* ============================================================================
 * PROFILE — Bhavya Mohan
 * ==========================================================================*/
const PROFILE = {
  name: 'Bhavya Mohan',
  headline: 'Economics Undergraduate • Empirical Research (R, Python) • Labour Economics • Applied Econometrics • Causal Inference',
  short:
    'Economics researcher building reproducible empirical research using applied econometrics, statistical programming, quantitative analysis and machine learning to study labour markets and public policy.',
  location: 'Delhi, India',
  email: 'mohanbhavya98@gmail.com',
  bio: [
    `I am an undergraduate student of Economics (Honours) at Sri Guru Tegh Bahadur Khalsa College, University of Delhi, with a deep interest in empirical labour economics, applied econometrics, human capital and causal inference. My research primarily uses large nationally representative datasets — particularly the Periodic Labour Force Survey (PLFS) — to study human capital accumulation, returns to education, wage determination and the structure of India’s labour market.`,
    `My research programme has developed progressively over the last two years. It began with an independent time-series study of the Expectations-Augmented Phillips Curve in the post-pandemic era using data from the Federal Reserve Economic Database (FRED), and has since matured into a series of empirical labour economics papers that estimate the returns to education across successive rounds of the PLFS using increasingly sophisticated econometric methods — Ordinary Least Squares, Instrumental Variables (two-stage least squares), and the Heckman Two-Step Sample Selection Model.`,
    `I conduct all of my empirical work in R and Python, with an emphasis on writing reproducible research code: clean data pipelines, versioned analysis scripts, and clearly documented results. I care deeply about open science, transparent empirical research, and evidence-based policymaking, and I try to make my analyses replicable at every step — from raw microdata to published estimates. Alongside labour economics, I am also actively studying quantitative finance and financial econometrics.`,
    `I am preparing for graduate study in Economics, with research interests spanning Labour Economics, Applied Econometrics, Human Capital, Causal Inference and Quantitative Finance. My longer-term goal is to contribute rigorous, policy-relevant empirical scholarship at the intersection of labour markets, human capital and applied econometric methodology.`,
  ],
  objective:
    'Pursue graduate research in Economics with interests in Labour Economics, Applied Econometrics, Causal Inference, Computational Economics and Quantitative Finance.',
  currentEducation: 'B.A. (Hons.) Economics — Sri Guru Tegh Bahadur Khalsa College, University of Delhi (Expected 2027)',
  interests: [
    'Labour Economics',
    'Applied Econometrics',
    'Human Capital',
    'Causal Inference',
    'Macroeconomics',
    'Development Economics',
    'Machine Learning',
    'Quantitative Finance',
    'Financial Econometrics',
  ],
  expertise: [
    'Empirical Research',
    'Applied Econometrics',
    'Statistical Programming',
    'Economic Data Analysis',
    'Research Writing',
    'Machine Learning',
  ],
  profileImage: '/bhavya.jpeg',
  resumeUrl: '/CV_Bhavya_Mohan.pdf',
  socials: {
    github: 'https://github.com/mohanbhavya98',
    linkedin: 'https://www.linkedin.com/in/bhavya-mohan-94998930b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    ssrn: 'https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=11212508',
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

/* ============================================================================
 * RESEARCH — chronological, showing evolution of methods.
 * ==========================================================================*/
const RESEARCH = [
  {
    year: '2025',
    title:
      'The Resurrection of the Trade-Off: An Empirical Re-examination of the Expectations-Augmented Phillips Curve in the Post-Pandemic Era',
    status: 'Available on SSRN',
    statusTone: 'emerald',
    tag: 'Early Research Project',
    venue: 'SSRN Working Paper Series',
    area: 'Macroeconomics • Monetary Economics • Time-Series Econometrics',
    abstract:
      'This paper — my first independent empirical study — revisits the Expectations-Augmented Phillips Curve using post-pandemic macroeconomic data to investigate whether the classical inflation–unemployment trade-off has re-emerged after the COVID-19 shock. Estimating the Phillips relation across two distinct macroeconomic regimes (post-2008 and post-pandemic) using U.S. monthly data from the Federal Reserve Economic Database (FRED), the study documents a substantial structural break: the slope of the Phillips Curve has steepened noticeably in the recent recovery, implying that inflationary pressures now respond more strongly to labour-market slack than they did during the low-inflation decade preceding the pandemic. While written largely as a learning exercise during the early phase of my research training, this paper laid the methodological foundation for the empirical work that followed — particularly the use of structural break tests, expectations dynamics, and reproducible time-series pipelines.',
    methods: ['Time-Series Regression', 'Expectations-Augmented Phillips Curve', 'Structural Break Analysis'],
    dataset: 'Federal Reserve Economic Data (FRED)',
    keywords: ['Macroeconomics', 'Phillips Curve', 'Inflation', 'Unemployment', 'Federal Reserve', 'Monetary Policy', 'Time Series'],
    links: { paper: 'https://ssrn.com/abstract=6635519', pdf: '/papers/paper_1.pdf', code: null },
  },
  {
    year: '2025',
    title:
      'Returns to Education and Labour Market Segmentation in India: Evidence from the Periodic Labour Force Survey (2019–20)',
    status: 'Presented • Under Review',
    statusTone: 'amber',
    tag: 'Conference Paper',
    venue: 'International Conference, Lady Shri Ram College, University of Delhi — currently under review at the Ramjas College Student Economics Journal',
    area: 'Labour Economics • Applied Econometrics',
    abstract:
      'This paper studies how the segmented structure of India’s labour market shapes the private economic returns to education, using nationally representative microdata from the Periodic Labour Force Survey (PLFS) 2019–20. Building on the Mincer earnings framework, I estimate wage equations for formally and informally employed workers separately, and I test whether comparable levels of schooling generate systematically different returns depending on the sector of employment. The results indicate that returns to education are significantly larger in the formal sector, consistent with a dual labour-market interpretation of Indian wage determination. The paper argues that education-policy debates in India cannot be understood in isolation from the structural composition of employment, and that models of human-capital accumulation must be conditioned on labour-market segmentation. This work represents my transition into empirical labour economics and was presented at the International Conference organised by the Department of Economics, Lady Shri Ram College, University of Delhi.',
    methods: ['Ordinary Least Squares', 'Mincer Earnings Equation', 'Labour Market Segmentation', 'Wage Regression'],
    dataset: 'PLFS 2019–20',
    keywords: ['Labour Economics', 'Returns to Education', 'Human Capital', 'PLFS', 'Formal Sector', 'Informal Sector', 'Applied Econometrics'],
    links: { paper: null, pdf: null, code: null },
    presentationCert: '/certificates/LSR-Conference.jpeg',
  },
  {
    year: '2026',
    title:
      'Returns to Education in India: A Gender-Based Analysis using Instrumental Variables (PLFS 2023–24)',
    status: 'Published • SSRN',
    statusTone: 'emerald',
    tag: 'Working Paper',
    venue: 'SSRN Working Paper Series',
    area: 'Applied Econometrics • Causal Inference • Labour Economics',
    abstract:
      'This paper extends my earlier PLFS-based work by explicitly confronting the endogeneity of education in Mincerian wage regressions. Using PLFS 2023–24 microdata, I employ parental education as an instrument for individual schooling in a Two-Stage Least Squares framework, allowing me to identify a causal effect of education on log wages rather than a purely correlational one. The paper further examines the heterogeneity of returns across gender and employment categories through interaction models, offering evidence on how the private returns to schooling differ between men and women, and between workers in different segments of the labour market. This represents my first fully-fledged causal-inference study in labour economics and marks a clear methodological step forward from the OLS-based analysis of the 2019–20 round.',
    methods: ['Instrumental Variables (IV)', 'Two-Stage Least Squares (2SLS)', 'Causal Inference', 'Interaction Models'],
    dataset: 'PLFS 2023–24',
    keywords: ['Applied Econometrics', 'Instrumental Variables', 'Causal Inference', 'Returns to Education', 'Gender Wage Gap', 'Labour Economics', 'PLFS'],
    links: { paper: 'http://ssrn.com/abstract=6602839', pdf: '/papers/paper_3.pdf', code: null },
  },
  {
    year: '2026',
    title:
      'Returns to Education in India using the Heckman Two-Step Sample Selection Model (PLFS 2023–24)',
    status: 'Under Review',
    statusTone: 'amber',
    tag: 'Journal Submission',
    venue: 'Berkeley Undergraduate Economics Journal',
    area: 'Labour Economics • Applied Econometrics • Sample Selection',
    abstract:
      'This paper represents the latest and methodologically most demanding stage of my research programme on returns to education in India. Using PLFS 2023–24 microdata, I estimate wage equations that explicitly model the decision to participate in the labour market before estimating wages, using the Heckman Two-Step Sample Selection Model. I compare conventional OLS estimates against selection-corrected estimates and further investigate gender heterogeneity through separate Heckman models for men and women, as well as interaction specifications on the pooled sample. The results suggest that ignoring sample-selection bias meaningfully distorts estimates of the returns to schooling — particularly for women, whose observed wages are heavily conditioned on participation. The paper contributes to the empirical literature on human capital in developing economies by providing selection-corrected estimates that are more consistent than the OLS and IV benchmarks typically used in the Indian context.',
    methods: ['Heckman Two-Step Selection Model', 'Sample Selection Bias', 'Probit Model', 'OLS Comparison', 'Gender Interaction Models'],
    dataset: 'PLFS 2023–24',
    keywords: ['Labour Economics', 'Applied Econometrics', 'Sample Selection', 'Heckman Model', 'Human Capital', 'Gender Wage Gap', 'PLFS'],
    links: { paper: null, pdf: null, code: null },
  },
];

const RESEARCH_JOURNEY = [
  { label: 'Macroeconomics', detail: 'Time-series analysis of the Phillips Curve (FRED)' },
  { label: 'Labour Economics', detail: 'Mincerian wage equations & market segmentation (PLFS 2019–20)' },
  { label: 'Applied Econometrics', detail: 'Formal vs. informal returns to schooling' },
  { label: 'Causal Inference', detail: 'Instrumental Variables & 2SLS (PLFS 2023–24)' },
  { label: 'Selection Models', detail: 'Heckman Two-Step correction & gender heterogeneity' },
];

/* ============================================================================
 * PROJECTS
 * ==========================================================================*/
const PROJECTS = [
  {
    name: 'Macro Regime Detection using Hidden Markov Models',
    description:
      'A quantitative-macro pipeline that classifies U.S. macroeconomic states (expansion, slowdown, recession, recovery) directly from macro time-series using Gaussian Hidden Markov Models. Includes state-conditional summary statistics and regime-switching diagnostics.',
    tech: ['Python', 'Machine Learning', 'HMM', 'Finance', 'Time Series'],
    github: 'https://github.com/mohanbhavya98/macro_regime_hmm_research',
    demo: null,
  },
  {
    name: 'Quantitative Equities Research & Derivative Pricing Pipeline',
    description:
      'End-to-end quant research toolkit covering CAPM and multi-factor pricing, portfolio optimisation, and Black–Scholes derivative pricing with risk metrics (VaR, Sharpe, drawdowns). Built as a reproducible research pipeline.',
    tech: ['Python', 'Portfolio Optimisation', 'Black–Scholes', 'CAPM', 'Factor Models', 'Risk Metrics'],
    github: 'https://github.com/mohanbhavya98/quant_research_portfolio',
    demo: null,
  },
  {
    name: 'Returns to Education Interactive Dashboard',
    description:
      'A reproducible Quarto dashboard visualising the returns-to-education results from the PLFS 2019–20 and 2023–24 studies — including OLS, IV, and Heckman-corrected estimates by gender and employment category.',
    tech: ['Python', 'R', 'Quarto', 'Econometrics'],
    github: 'https://mohanbhavya98.github.io/plfs-returns-to-education/',
    demo: null,
  },
  {
    name: 'Research Portfolio Website',
    description:
      'Designed and developed a fully responsive academic portfolio using Next.js, React, Tailwind CSS and Framer Motion to showcase research publications, quantitative projects, academic achievements and professional experience. The website integrates smooth animations, interactive timelines and modern UI principles while serving as a long-term research portfolio.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/mohanbhavya98/bhavya-portfolio',
    demo: null,
  },
  {
    name: 'Additional Research Projects',
    description:
      'Ongoing empirical projects in causal inference, difference-in-differences policy evaluation, and computational macroeconomics. Details will be published as manuscripts are completed.',
    tech: ['DiD', 'Causal Inference', 'Computational Macro'],
    github: 'https://github.com/mohanbhavya98',
    demo: null,
    comingSoon: true,
  },
];

/* ============================================================================
 * SKILLS
 * ==========================================================================*/
const SKILLS = [
  { group: 'Programming', icon: Code2, items: [
    { name: 'Python', level: 92 },
    { name: 'R', level: 88 },
    { name: 'SQL', level: 78 },
    { name: 'JavaScript', level: 72 },
    { name: 'HTML / CSS', level: 78 },
    { name: 'Git / GitHub', level: 85 },
  ]},
  { group: 'Econometrics', icon: LineChart, items: [
    { name: 'OLS Regression', level: 94 },
    { name: 'Instrumental Variables', level: 88 },
    { name: 'Heckman Selection', level: 86 },
    { name: 'Panel Data', level: 78 },
    { name: 'Difference-in-Differences', level: 78 },
    { name: 'Hypothesis Testing', level: 88 },
  ]},
  { group: 'Machine Learning', icon: Brain, items: [
    { name: 'Scikit-learn', level: 82 },
    { name: 'Hidden Markov Models', level: 78 },
    { name: 'Regression', level: 88 },
    { name: 'Classification', level: 78 },
    { name: 'Clustering', level: 74 },
  ]},
  { group: 'Data Analysis', icon: Database, items: [
    { name: 'Pandas', level: 92 },
    { name: 'NumPy', level: 88 },
    { name: 'Matplotlib', level: 85 },
    { name: 'Seaborn', level: 82 },
    { name: 'Power BI', level: 74 },
    { name: 'Excel', level: 90 },
  ]},
  { group: 'Research', icon: BookOpen, items: [
    { name: 'Academic Writing', level: 90 },
    { name: 'Literature Review', level: 90 },
    { name: 'LaTeX', level: 84 },
    { name: 'Quarto', level: 82 },
    { name: 'Policy Analysis', level: 80 },
  ]},
];

/* ============================================================================
 * EDUCATION
 * ==========================================================================*/
const EDUCATION = [
  {
    institution: 'Sri Guru Tegh Bahadur Khalsa College, University of Delhi',
    degree: 'B.A. (Hons.) Economics',
    duration: '2024 — 2027 (Expected)',
    gpa: 'Current CGPA: 8.27 / 10',
    coursework: ['Microeconomics', 'Macroeconomics', 'Mathematics for Economics', 'Statistics', 'Econometrics'],
  },
  {
    institution: 'Indian Institute of Management (IIM) Bangalore',
    degree: 'Digital Business & Entrepreneurship (First Year Completed)',
    duration: 'Certificate Programme',
    gpa: 'Successfully completed the first year of the programme',
    coursework: ['Digital Business', 'Entrepreneurship', 'Strategy', 'Business Analytics'],
  },
  {
    institution: 'St. Mary’s Convent School',
    degree: 'Higher Secondary (Class XII, CBSE)',
    duration: 'Completed',
    gpa: 'Class XII: 96.6%  •  Class X: 88.9%',
    coursework: ['Mathematics', 'Economics', 'Business Studies', 'Accountancy', 'English'],
  },
];

/* ============================================================================
 * EXPERIENCE
 * ==========================================================================*/
const EXPERIENCE = [
  {
    org: 'Independent Research — Empirical Economics',
    role: 'Independent Economics Researcher',
    dates: '2025 — Present',
    description:
      'Conducting independent empirical research in labour economics and applied econometrics using large nationally representative microdata (PLFS 2019–20, PLFS 2023–24). Authored four research papers spanning OLS, Instrumental Variables and Heckman Sample Selection methodology. One paper is published on SSRN, one is under review at the Berkeley Undergraduate Economics Journal, and another was presented at an International Conference at Lady Shri Ram College, University of Delhi.',
    skills: ['Python', 'R', 'PLFS Microdata', 'Applied Econometrics', 'Academic Writing'],
    achievements: [
      'Authored four working papers on returns to education and macroeconomic dynamics',
      'Presented empirical research at an international conference at LSR, University of Delhi',
      'Published a working paper on SSRN using Instrumental Variables on PLFS 2023–24',
    ],
  },
  {
    org: 'Indian Institute of Management (IIM) Bangalore — BBA in Digital Business & Entrepreneurship (BBA DBE)',
    role: 'Learning Pod Leader',
    dates: 'Academic Year 2025–26',
    description:
      'Selected as one of approximately 60–70 Learning Pod Leaders from a cohort of more than 1,000 students after achieving strong academic performance in the Term 1 Statistics course of the BBA(DBE) programme. In this role, I supported fellow students by conducting online doubt-solving sessions, mentoring peers in quantitative subjects, facilitating collaborative learning, and organising revision sessions before examinations — contributing to improving academic engagement within the BBA(DBE) community. I completed the first year of the BBA(DBE) programme before withdrawing. A Learning Pod Leader certificate has been issued confirming my service during Academic Year 2025–26.',
    skills: ['Statistics', 'Peer Mentoring', 'Quantitative Tutoring', 'Academic Facilitation', 'Communication'],
    achievements: [
      'Selected among ~60–70 Learning Pod Leaders from a cohort of 1,000+ students',
      'Conducted online doubt-solving and revision sessions for quantitative coursework',
      'Awarded an official Learning Pod Leader certificate for AY 2025–26',
    ],
  },
];

/* ============================================================================
 * ACHIEVEMENTS & CERTIFICATIONS
 * ==========================================================================*/
const ACHIEVEMENTS = [
  { icon: Trophy, title: 'Paper Presentation — International Conference', detail: 'Lady Shri Ram College, University of Delhi' },
  { icon: Award, title: 'International Commerce Olympiad — Gold Medal', detail: 'School Rank 1 • International Rank 457', cert: '/certificates/ICO.jpeg' },
  { icon: Globe, title: 'Agile COIL — Hiroshima University', detail: 'Social entrepreneurship collaborative project' },
  { icon: Star, title: 'GRE', detail: 'Score: 322' },
  { icon: BookOpen, title: 'IELTS', detail: 'Overall Band: 7.5' },
  { icon: FileText, title: 'SSRN Publication', detail: 'Working paper on returns to education (PLFS 2023–24)' },
];

const CERTIFICATIONS = [
  { title: 'Learning Pod Leader — IIM Bangalore (BBA DBE)', detail: 'Certificate of service for peer mentoring, AY 2025–26', cert: '/certificates/pod-leader.jpeg' },
  { title: 'Agile COIL — Hiroshima University', detail: 'Collaborative Online International Learning', cert: '/certificates/agile-coil.jpeg' },
  { title: 'Accenture — Data Analytics & Visualization Job Simulation', detail: 'Applied data analytics & visualization job simulation', cert: '/certificates/accenture.jpeg' },
  { title: 'IIM Bangalore — Digital Business & Entrepreneurship', detail: 'First-year certificate programme completed' },
];

const COUNTERS = [
  { label: 'Research Papers', value: 4, icon: FileText },
  { label: 'Conference Presentations', value: 1, icon: Trophy },
  { label: 'Published on SSRN', value: 1, icon: BookOpen },
  { label: 'Under Review', value: 2, icon: Sparkles },
  { label: 'GitHub Projects', value: 5, icon: Github },
  { label: 'Programming Languages', value: 6, icon: Code2 },
  { label: 'Certifications', value: 3, icon: Award },
  { label: 'Working Datasets', value: 3, icon: Database },
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
              <a href={PROFILE.resumeUrl} download><Download className="mr-1.5 h-3.5 w-3.5" /> CV</a>
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
  const roles = useMemo(() => ['Economics Researcher', 'Applied Econometrician', 'Data Analyst (R • Python)'], []);
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
          Applying to Graduate Programmes • {PROFILE.location}
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
          <Button onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ripple group rounded-full bg-white px-6 text-black hover:bg-white/90" size="lg">
            View Research<ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
        <SectionHeader eyebrow="About Me" title="An empirical researcher, and an aspiring economist." />
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal variants={slideLeft} className="order-2 lg:order-1">
            <p className="text-lg font-semibold text-white/90">{PROFILE.name}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-blue-400/80">{PROFILE.headline}</p>
            <div className="mt-6 space-y-4 leading-relaxed text-white/70">
              {PROFILE.bio.map((para, i) => (<p key={i}>{para}</p>))}
            </div>
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
        <SectionHeader eyebrow="Curriculum Vitæ" title="My full academic CV." description="A complete overview of my education, research output, technical training and academic activities." />
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="absolute inset-0 opacity-30 grid-bg" />
            <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-stretch">
              <div className="flex aspect-[3/4] w-full max-w-[220px] flex-col items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-4 text-center">
                <FileText className="h-10 w-10 text-blue-300" />
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60">CV</p>
                <p className="mt-1 text-sm font-semibold text-white">Bhavya Mohan</p>
                <p className="mt-1 text-[11px] text-white/50">PDF • Updated 2025</p>
                <div className="mt-4 h-1 w-full rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" /></div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Curriculum Vitæ</h3>
                  <p className="mt-2 max-w-lg text-sm text-white/60">A comprehensive academic CV listing my education, research portfolio, working papers, technical skills, and awards. Prepared in an academic format suitable for graduate programme applications and research collaborations.</p>
                  <ul className="mt-4 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                    <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-blue-400" /> Four research papers &amp; talks</li>
                    <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-blue-400" /> Statistical &amp; econometric toolkit</li>
                    <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-blue-400" /> Awards, olympiads &amp; certifications</li>
                    <li className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-blue-400" /> Academic two-page format</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="btn-ripple rounded-full bg-white text-black hover:bg-white/90">
                    <a href={PROFILE.resumeUrl} download><Download className="mr-2 h-4 w-4" /> Download CV</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="btn-ripple rounded-full border-white/20 bg-white/[0.03] text-white hover:bg-white/[0.08]">
                    <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> View CV</a>
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

function ResearchJourney() {
  return (
    <Reveal className="mb-14">
      <div className="glass-strong overflow-hidden rounded-2xl p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10"><TrendingUp className="h-5 w-5 text-blue-300" /></div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/50">Research Journey</p>
            <h3 className="text-lg font-semibold text-white">Progression of Methods &amp; Themes</h3>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          {RESEARCH_JOURNEY.map((step, i) => (
            <motion.div key={step.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-[10px] font-bold text-black">{i + 1}</span>
                Stage
              </div>
              <p className="mt-2 text-sm font-semibold text-white">{step.label}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-white/55">{step.detail}</p>
              {i < RESEARCH_JOURNEY.length - 1 && (
                <ChevronRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-blue-400/60 md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

const statusToneClass = {
  emerald: 'bg-emerald-500/20 text-emerald-300',
  amber: 'bg-amber-500/20 text-amber-300',
  blue: 'bg-blue-500/20 text-blue-300',
};

/* --------------------------------------------------------------------------
 * Citation helpers
 * ------------------------------------------------------------------------*/
function buildCitations(p) {
  const author = 'Mohan, B.';
  const year = p.year;
  const title = p.title;
  const venue = p.venue || 'Working Paper';
  const url = p.links?.paper || p.links?.pdf || '';
  const urlSuffix = url ? ` Retrieved from ${url}` : '';
  const bibKey = `mohan${year}${(title.split(/\s+/)[0] || 'paper').replace(/[^A-Za-z0-9]/g, '').toLowerCase()}`;

  return {
    APA: `${author} (${year}). ${title}. ${venue}.${urlSuffix}`,
    MLA: `${author.replace(',', ',')} "${title}." ${venue}, ${year}.${url ? ` Web. <${url}>.` : ''}`,
    Chicago: `${author} "${title}." ${venue} (${year}).${url ? ` ${url}.` : ''}`,
    BibTeX: `@techreport{${bibKey},\n  author = {Bhavya Mohan},\n  title  = {${title}},\n  year   = {${year}},\n  institution = {${venue}}${url ? `,\n  url    = {${url}}` : ''}\n}`,
  };
}

/* --------------------------------------------------------------------------
 * Certificate Viewer Dialog
 * ------------------------------------------------------------------------*/
function CertificateDialog({ url, title, trigger }) {
  const [open, setOpen] = useState(false);
  if (!url) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="glass-strong max-w-4xl border-white/10 bg-black/90 p-0 text-white sm:rounded-2xl">
        <DialogHeader className="flex-row items-center justify-between space-y-0 border-b border-white/10 p-4">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-blue-300" />
            <DialogTitle className="text-sm font-semibold text-white">{title}</DialogTitle>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mr-6 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[11px] text-white/80 hover:bg-white/10"
          >
            <ExternalLink className="h-3 w-3" /> Open in new tab
          </a>
        </DialogHeader>
        <div className="h-[70vh] w-full overflow-hidden rounded-b-2xl bg-black">
          <iframe src={url} title={title} className="h-full w-full border-0" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* --------------------------------------------------------------------------
 * Citation Dialog (APA / MLA / Chicago / BibTeX)
 * ------------------------------------------------------------------------*/
function CiteDialog({ paper }) {
  const citations = useMemo(() => buildCitations(paper), [paper]);
  const [copied, setCopied] = useState(null);
  const copy = (format) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(citations[format]).then(
      () => {
        setCopied(format);
        toast.success(`${format} citation copied`);
        setTimeout(() => setCopied(null), 1500);
      },
      () => toast.error('Copy failed')
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="btn-ripple rounded-full border-white/20 bg-transparent text-white hover:bg-white/[0.08]">
          <Quote className="mr-1.5 h-3.5 w-3.5" /> Cite
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong max-w-2xl border-white/10 bg-black/95 text-white sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-white">Cite this paper</DialogTitle>
          <DialogDescription className="text-xs text-white/50">
            Choose a citation style. Each format has its own copy button.
          </DialogDescription>
        </DialogHeader>
        <p className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-[11px] leading-relaxed text-white/60">
          {paper.title}
        </p>
        <Tabs defaultValue="APA" className="mt-2">
          <TabsList className="grid grid-cols-4 gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
            {['APA', 'MLA', 'Chicago', 'BibTeX'].map((f) => (
              <TabsTrigger
                key={f}
                value={f}
                className="rounded-full text-[11px] font-medium text-white/60 data-[state=active]:bg-white data-[state=active]:text-black"
              >
                {f}
              </TabsTrigger>
            ))}
          </TabsList>
          {['APA', 'MLA', 'Chicago', 'BibTeX'].map((f) => (
            <TabsContent key={f} value={f} className="mt-4">
              <div className="relative">
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[12px] leading-relaxed text-white/85">
                  {citations[f]}
                </pre>
                <Button
                  onClick={() => copy(f)}
                  size="sm"
                  className="btn-ripple mt-3 rounded-full bg-white text-black hover:bg-white/90"
                >
                  {copied === f ? (<><Check className="mr-1.5 h-3.5 w-3.5" /> Copied</>) : (<><Copy className="mr-1.5 h-3.5 w-3.5" /> Copy {f}</>)}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function ResearchCard({ p, index }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="group glass-strong h-full rounded-2xl border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.35)] md:p-8">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={`${statusToneClass[p.statusTone] || statusToneClass.blue} border-transparent`}>{p.status}</Badge>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/60">{p.tag}</span>
        </div>
        <span className="text-[11px] uppercase tracking-widest text-white/40">Paper #{String(index + 1).padStart(2, '0')} • {p.year}</span>
      </div>

      <p className="text-[11px] uppercase tracking-[0.2em] text-blue-300/70">{p.area}</p>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-blue-100 md:text-xl">{p.title}</h3>

      <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-[15px]">
        {expanded ? p.abstract : (p.abstract.length > 380 ? p.abstract.slice(0, 380) + '…' : p.abstract)}
        {p.abstract.length > 380 && (
          <button onClick={() => setExpanded((v) => !v)} className="ml-2 text-blue-300 hover:text-blue-200">
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/50">Methods</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.methods.map((m) => (<span key={m} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/75">{m}</span>))}
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/50">Dataset</p>
          <p className="mt-2 text-sm text-white/80">{p.dataset}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[10px] uppercase tracking-widest text-white/50">Keywords</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {p.keywords.map((k) => (<span key={k} className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] text-blue-200/90">{k}</span>))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs text-white/60">
        <span className="text-white/80">Venue:</span> {p.venue}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.links.paper ? (
          <Button asChild size="sm" className="btn-ripple rounded-full bg-white text-black hover:bg-white/90">
            <a href={p.links.paper} target="_blank" rel="noreferrer"><BookOpen className="mr-1.5 h-3.5 w-3.5" /> Read Paper</a>
          </Button>
        ) : p.presentationCert ? (
          <CertificateDialog
            url={p.presentationCert}
            title={`Paper Presentation Certificate — ${p.title}`}
            trigger={
              <Button size="sm" className="btn-ripple rounded-full bg-white/10 text-white/70 hover:bg-white/15">
                <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Paper (available on request)
              </Button>
            }
          />
        ) : (
          <Button size="sm" disabled className="rounded-full bg-white/10 text-white/50"><BookOpen className="mr-1.5 h-3.5 w-3.5" /> Paper (available on request)</Button>
        )}
        {p.links.pdf && (
          <Button asChild size="sm" variant="outline" className="btn-ripple rounded-full border-white/20 bg-transparent text-white hover:bg-white/[0.08]">
            <a href={p.links.pdf} target="_blank" rel="noreferrer"><FileText className="mr-1.5 h-3.5 w-3.5" /> SSRN / PDF</a>
          </Button>
        )}
        {p.links.code && (
          <Button asChild size="sm" variant="outline" className="btn-ripple rounded-full border-white/20 bg-transparent text-white hover:bg-white/[0.08]">
            <a href={p.links.code} target="_blank" rel="noreferrer"><Github className="mr-1.5 h-3.5 w-3.5" /> Code</a>
          </Button>
        )}
        <CiteDialog paper={p} />
      </div>
    </Card>
  );
}

function ResearchSection() {
  return (
    <section id="research" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Research" title="Research Papers &amp; Publications" description="A chronological account of my empirical work — tracing an evolution from time-series macroeconomics to causal inference and sample-selection econometrics in labour economics." />
        <ResearchJourney />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} variants={stagger} className="grid gap-6 lg:grid-cols-2">
          {RESEARCH.map((p, i) => (
            <motion.div key={p.title} variants={fadeUp}>
              <ResearchCard p={p} index={i} />
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
        <SectionHeader eyebrow="Projects" title="Research &amp; Quantitative Projects" description="Selected empirical and quantitative-finance projects — written primarily in Python and R with reproducibility in mind." />
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
                  {p.comingSoon ? (
                    <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-200">Coming Soon</span>
                  ) : (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">Public</span>
                  )}
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
        <SectionHeader eyebrow="Skills" title="Toolkit &amp; Techniques" description="An overview of the econometric, statistical, computational and research skills I use in my empirical work." />
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
        <SectionHeader eyebrow="Experience" title="Research &amp; Professional Work" description="Independent empirical research and academic peer-mentoring roles." />
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
        <SectionHeader eyebrow="Education" title="Academic Journey" description="University of Delhi • IIM Bangalore • St. Mary’s Convent School." />
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
        <SectionHeader eyebrow="Achievements" title="Recognition, Milestones &amp; Certifications" description="Selected honours, examinations, and certifications from my academic and research journey so far." />

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COUNTERS.map((c) => (
            <motion.div key={c.label} variants={fadeUp}>
              <div className="glass-strong flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:border-white/25">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10"><c.icon className="h-5 w-5 text-blue-300" /></div>
                <div>
                  <p className="text-3xl font-bold text-white"><CountUp to={c.value} /></p>
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
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-gradient-to-br from-amber-400/20 to-pink-500/10 ring-1 ring-white/10"><a.icon className="h-5 w-5 text-amber-300" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">{a.title}</p>
                    <p className="text-xs text-white/50">{a.detail}</p>
                  </div>
                </div>
                {a.cert && (
                  <div className="mt-3">
                    <CertificateDialog
                      url={a.cert}
                      title={a.title}
                      trigger={
                        <Button size="sm" variant="outline" className="btn-ripple rounded-full border-white/15 bg-white/[0.04] text-[11px] text-white/85 hover:bg-white/[0.1]">
                          <BadgeCheck className="mr-1.5 h-3.5 w-3.5 text-blue-300" /> View Certificate
                        </Button>
                      }
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Reveal className="mt-10">
          <div className="glass-strong rounded-2xl p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-emerald-400/20 to-blue-500/10 ring-1 ring-white/10"><Award className="h-5 w-5 text-emerald-300" /></div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/50">Certifications</p>
                <h3 className="text-lg font-semibold text-white">Selected Programmes &amp; Trainings</h3>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {CERTIFICATIONS.map((c) => (
                <div key={c.title} className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-white">{c.title}</p>
                  <p className="mt-1 text-xs text-white/55">{c.detail}</p>
                  {c.cert && (
                    <div className="mt-3">
                      <CertificateDialog
                        url={c.cert}
                        title={c.title}
                        trigger={
                          <Button size="sm" variant="outline" className="btn-ripple rounded-full border-white/15 bg-white/[0.04] text-[11px] text-white/85 hover:bg-white/[0.1]">
                            <BadgeCheck className="mr-1.5 h-3.5 w-3.5 text-blue-300" /> View Certificate
                          </Button>
                        }
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactSection() {
  const contactLinks = [
    { icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/bhavya-mohan', href: PROFILE.socials.linkedin },
    { icon: Github, label: 'GitHub', value: 'github.com/mohanbhavya98', href: PROFILE.socials.github },
    { icon: FileText, label: 'SSRN', value: 'SSRN Author Page', href: PROFILE.socials.ssrn },
    { icon: MapPin, label: 'Location', value: PROFILE.location, href: '#' },
    { icon: GraduationCap, label: 'Affiliation', value: 'SGTB Khalsa College, University of Delhi', href: '#' },
  ];
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Contact" title="Let’s work together." description="For research collaborations, graduate-admissions correspondence, or any academic enquiry — please write to me. I read every message." />
        <Reveal variants={fadeUp}>
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
              <a href={PROFILE.resumeUrl} download className="glass group flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-white/25 sm:col-span-2 lg:col-span-3">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-gradient-to-br from-emerald-400/20 to-blue-500/20 ring-1 ring-white/10"><Download className="h-4 w-4 text-emerald-300" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-white/50">Download CV</p>
                  <p className="text-sm text-white/85">Grab the latest PDF of my academic CV</p>
                </div>
                <ExternalLink className="ml-auto h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-white/80" />
              </a>
            </div>
            <p className="mt-8 text-center text-xs text-white/40">Typically replies within 48 hours.</p>
          </div>
        </Reveal>
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
            <p className="mt-4 max-w-xs text-sm text-white/50">Empirical economics research — reproducible, transparent, and evidence-based.</p>
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
              <SocialIcon href={PROFILE.socials.ssrn} icon={FileText} label="SSRN" />
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
