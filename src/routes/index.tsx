import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Layers3,
  Megaphone,
  PenTool,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/Nav";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mr Ngandu — Software Developer, Graphic Designer & Digital Marketer" },
      {
        name: "description",
        content:
          "Mr Ngandu brings software development, graphic design and digital marketing together to build memorable digital experiences.",
      },
    ],
  }),
});

const services = [
  {
    number: "01",
    title: "Software development",
    copy: "Expressive, fast web experiences built with React, TypeScript, Node.js and a sharp eye for interaction.",
    Icon: Code2,
  },
  {
    number: "02",
    title: "Product systems",
    copy: "CRM platforms, dashboards and workflow tools that turn complicated business operations into simple flows.",
    Icon: Layers3,
  },
  {
    number: "03",
    title: "Brand & visual design",
    copy: "Identity systems, campaign assets and digital interfaces that feel consistent wherever your audience meets you.",
    Icon: PenTool,
  },
  {
    number: "04",
    title: "Digital marketing & growth",
    copy: "Campaign thinking, content and conversion-minded design that connects creative work to real business goals.",
    Icon: Megaphone,
  },
];

const featuredProjects = [projects[0], projects[3], projects[4]].filter(Boolean);

function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "hello">("loading");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("skipIntro")) {
      setProgress(100);
      setVisible(false);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(100);
      setVisible(false);
      return;
    }

    const startedAt = performance.now();
    let frame = 0;
    let closeTimer = 0;

    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - startedAt) / 1050) * 100));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setPhase("hello");
        closeTimer = window.setTimeout(() => setVisible(false), 620);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(closeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink text-paper"
        >
          <AnimatePresence mode="wait">
            {phase === "loading" ? (
              <motion.div
                key="loading"
                exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                className="text-center"
              >
                <div
                  className="mx-auto grid size-28 place-items-center rounded-full p-[3px]"
                  style={{
                    background: `conic-gradient(#d9ff43 ${progress * 3.6}deg, rgba(238,233,222,.15) 0deg)`,
                  }}
                >
                  <div className="grid size-full place-items-center rounded-full bg-ink font-display text-4xl tabular-nums">
                    {progress}
                  </div>
                </div>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.28em] text-paper/55">
                  Loading the good stuff
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="hello"
                initial={{ opacity: 0, scale: 0.94, rotate: -2, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-6xl italic text-acid md:text-8xl"
              >
                hello.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnimatedWord({ word, revealOnView = false }: { word: string; revealOnView?: boolean }) {
  const reduceMotion = useReducedMotion();
  const reveal = { y: [18, -2, 0], scaleY: [0.98, 1.01, 1], opacity: 1, filter: "blur(0px)" };

  return (
    <span className="fluid-text fluid-text-active inline-flex">
      <span className="sr-only">{word}</span>
      {Array.from(word).map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${letter}-${index}`}
          initial={reduceMotion ? false : { y: 18, scaleY: 0.98, opacity: 0, filter: "blur(4px)" }}
          animate={!revealOnView && !reduceMotion ? reveal : undefined}
          whileInView={revealOnView && !reduceMotion ? reveal : undefined}
          viewport={revealOnView ? { once: true, amount: 0.5 } : undefined}
          whileHover={reduceMotion ? undefined : { y: -2, scaleY: 1.01, color: "#e9502e" }}
          transition={{
            duration: 0.75,
            delay: 0.1 + index * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hero-letter inline-block origin-bottom"
        >
          <span className="fluid-letter" style={{ animationDelay: `${-index * 0.115}s` }}>
            {letter}
          </span>
        </motion.span>
      ))}
    </span>
  );
}

function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 72, damping: 30, mass: 0.4 });
  const trackX = useTransform(
    smoothProgress,
    [0, 0.3, 0.94, 1],
    ["0vw", "0vw", "-142vw", "-142vw"],
  );
  const cardsY = useTransform(smoothProgress, [0, 0.17, 0.3], ["45vh", "45vh", "0vh"]);
  const cardsOpacity = useTransform(smoothProgress, [0, 0.17, 0.27], [0, 0, 1]);
  const titleScale = useTransform(smoothProgress, [0, 0.17], [1, 0.94]);
  const titleY = useTransform(smoothProgress, [0, 0.17], ["0vh", "-6vh"]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.08, 0.17], [1, 1, 0]);

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative hidden h-[360vh] bg-paper text-ink lg:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-x-10 top-24 z-20 flex items-center justify-between border-b border-ink pb-4">
            <p className="eyebrow">Selected projects</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/50">
              Scroll to explore / 03
            </p>
          </div>

          <motion.h2
            style={
              reduceMotion ? { opacity: 0 } : { scale: titleScale, y: titleY, opacity: titleOpacity }
            }
            className="pointer-events-none absolute inset-x-0 top-[29vh] origin-center text-center font-display text-[22vw] uppercase leading-[1.05] tracking-[-0.018em]"
          >
            <AnimatedWord word="Work" revealOnView />
          </motion.h2>

          <motion.div
            style={reduceMotion ? undefined : { x: trackX, y: cardsY, opacity: cardsOpacity }}
            className="absolute left-[8vw] top-[25vh] z-10 flex w-max gap-[6vw]"
          >
            {featuredProjects.map((project, index) => (
              <article
                key={project.slug}
                data-cursor
                className="group grid h-[59vh] w-[70vw] shrink-0 grid-cols-[1.35fr_0.65fr] overflow-hidden border border-ink bg-paper shadow-[14px_14px_0_#10100f]"
              >
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="relative overflow-hidden border-r border-ink"
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.035 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="absolute left-5 top-5 bg-ink px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-paper">
                    Project / 0{index + 1}
                  </span>
                </Link>
                <div className="flex flex-col justify-between p-8 xl:p-10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-flare">
                      {project.tag}
                    </p>
                    <h3 className="mt-6 font-display text-[clamp(3rem,4vw,5rem)] uppercase leading-[1.02] tracking-[-0.008em]">
                      {project.title}
                    </h3>
                    <p className="mt-5 text-sm leading-relaxed text-ink/60">{project.desc}</p>
                  </div>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="flex items-center justify-between border-t border-ink pt-4 text-xs font-bold uppercase tracking-[0.14em]"
                  >
                    View case study <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </motion.div>

          <div className="absolute inset-x-10 bottom-8 z-20 flex items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]">My work</span>
            <div className="h-px flex-1 overflow-hidden bg-ink/20">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full origin-left bg-ink"
              />
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]"
            >
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-24 text-ink lg:hidden">
        <div className="mb-14 border-b border-ink pb-7">
          <p className="eyebrow mb-6">Selected projects</p>
          <h2 className="font-display text-[26vw] uppercase leading-[1.05] tracking-[-0.015em]">
            <AnimatedWord word="Work" revealOnView />
          </h2>
        </div>
        <div className="space-y-20">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="relative block overflow-hidden border border-ink"
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                  whileInView={{ scale: [1.06, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="absolute left-4 top-4 bg-ink px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-paper">
                  Project / 0{index + 1}
                </span>
              </Link>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-flare">
                {project.tag}
              </p>
              <h3 className="mt-4 font-display text-5xl uppercase leading-[1.02] tracking-[-0.008em]">
                {project.title}
              </h3>
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="mt-5 inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-bold uppercase tracking-[0.14em]"
              >
                View project <ArrowUpRight size={15} />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}

function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, { stiffness: 72, damping: 30, mass: 0.4 });
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "-12%"]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(heroProgress, [0.65, 1], [1, 0]);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const body = `Hi Mr Ngandu,\n\n${message}\n\nFrom ${name} (${email})`;
    window.open(
      `https://wa.me/27747067226?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <IntroLoader />
      <motion.div
        aria-hidden="true"
        style={{ scaleX: pageProgress }}
        className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-flare"
      />
      <Nav />

      <main id="top">
        <section
          ref={heroRef}
          className="noise hero-grid relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-28 md:px-10 md:pb-10 md:pt-32"
        >
          <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-[1600px] flex-1 flex-col justify-between">
            <div className="flex items-start justify-between gap-6 text-[10px] font-extrabold uppercase tracking-[0.18em]">
              <p className="max-w-44 leading-relaxed">
                Independent creative developer based in Johannesburg
              </p>
              <p className="hidden text-right leading-relaxed sm:block">
                Available for selected projects
                <br />
                <span className="inline-flex items-center gap-2 text-[#527300]">
                  <span className="size-2 rounded-full bg-[#79a800]" /> Sep. 2026
                </span>
              </p>
            </div>

            <motion.div
              style={
                reduceMotion ? undefined : { y: heroY, scale: heroScale, opacity: heroOpacity }
              }
              className="relative w-full min-w-0 py-8 text-center will-change-transform md:py-2"
            >
              <motion.span
                animate={{ y: [0, -8, 0], rotate: [4, -2, 4] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[9%] top-[8%] hidden size-14 bg-flare md:block"
              />
              <motion.span
                animate={{ y: [0, 10, 0], x: [0, -5, 0], scale: [1, 0.96, 1] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[12%] top-[8%] hidden size-12 rounded-full bg-acid md:block"
              />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.38em] md:text-xs">
                  Portfolio / Twenty twenty-six
                </p>
                <h1 className="font-display text-[16vw] uppercase leading-[1.05] tracking-[-0.015em] md:text-[18.5vw]">
                  <AnimatedWord word="Creative" />
                </h1>
                <div className="mt-4 flex items-center justify-center gap-4 md:mt-6 md:gap-8">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.65, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="h-px w-10 origin-right bg-ink md:w-28"
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 14, scaleY: 0.98 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    transition={{ delay: 0.54, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="origin-bottom font-display text-[clamp(2.2rem,5.5vw,5.5rem)] uppercase leading-[1.05] tracking-[0.01em]"
                  >
                    Developer
                  </motion.p>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.65, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="h-px w-10 origin-left bg-ink md:w-28"
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.82, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto mt-7 w-[calc(100vw-2.5rem)] max-w-md px-3 text-sm font-medium leading-relaxed text-ink/62 md:mt-8 md:w-auto md:text-base"
                >
                  I combine software development, graphic design and digital marketing to build
                  experiences people remember.
                </motion.p>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-4 border-t border-ink pt-5 md:gap-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                  Built by
                </p>
                <p className="mt-1 text-sm font-extrabold uppercase">Mr Ngandu</p>
              </div>
              <a
                href="#about"
                data-cursor
                className="group grid size-16 place-items-center rounded-full border border-ink bg-ink text-paper transition-colors hover:bg-flare md:size-20"
                aria-label="Scroll to about"
              >
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="transition-transform group-hover:translate-y-1" size={21} />
                </motion.span>
              </a>
              <div className="hidden justify-self-end text-right sm:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">
                  Disciplines
                </p>
                <p className="mt-1 text-sm font-extrabold uppercase">
                  Software · Graphic design · Digital marketing
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-paper/15 bg-ink py-4 text-paper">
          <div className="marquee-track flex items-center">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center">
                {[
                  "React & TypeScript",
                  "Digital experiences",
                  "Brand systems",
                  "CRM platforms",
                  "Built to be useful",
                ].map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="flex items-center whitespace-nowrap font-display text-2xl uppercase md:text-4xl"
                  >
                    <span className="mx-5 text-acid md:mx-8">✦</span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="dark relative overflow-hidden bg-ink px-5 py-14 text-paper md:px-10 md:py-20"
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-8 flex items-center justify-between border-b border-paper/20 pb-5">
              <p className="eyebrow">About me</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-paper/45">
                01 / Story
              </p>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[1300px] font-display text-[clamp(3rem,7vw,8.5rem)] uppercase leading-[1.03] tracking-[-0.008em]"
            >
              I build digital worlds where{" "}
              <span className="text-acid">code, design & digital marketing meet.</span>
            </motion.h2>

            <div className="mt-8 flex justify-end">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 border-b border-paper/60 pb-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:border-acid hover:text-acid"
              >
                More about me <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-10 grid border-y border-paper/20 sm:grid-cols-3">
              {[
                ["40+", "Projects shipped"],
                ["12", "Long-term clients"],
                ["03", "Creative disciplines"],
              ].map(([value, label], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className={`py-8 sm:px-8 ${index > 0 ? "border-t border-paper/20 sm:border-l sm:border-t-0" : ""}`}
                >
                  <p className="font-display text-6xl text-acid md:text-8xl">{value}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-paper/45">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="dark bg-ink px-5 pb-28 text-paper md:px-10 md:pb-40">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <p className="eyebrow">What I do</p>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-10 font-display text-[clamp(4.1rem,8vw,8rem)] uppercase leading-[0.95] tracking-[-0.012em]"
                >
                  My
                  <br />
                  <span className="text-acid">expertise</span>
                </motion.h2>
                <p className="mt-10 max-w-sm text-sm leading-relaxed text-paper/50">
                  One multidisciplinary partner from the first sketch to production and the campaign
                  that follows.
                </p>
              </div>

              <div className="border-t border-paper/25">
                {services.map(({ number, title, copy, Icon }, index) => (
                  <motion.div
                    key={number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.85, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group grid gap-5 border-b border-paper/25 py-8 md:grid-cols-[48px_1fr_1fr_48px] md:items-center"
                  >
                    <span className="text-xs text-paper/35">/{number}</span>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] transition-colors group-hover:text-acid md:text-2xl">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-paper/50">{copy}</p>
                    <span className="grid size-11 place-items-center border border-paper/25 transition-all group-hover:rotate-6 group-hover:border-acid group-hover:bg-acid group-hover:text-ink">
                      <Icon size={19} />
                    </span>
                  </motion.div>
                ))}
                <Link
                  to="/skills"
                  className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-acid"
                >
                  See the full toolbox <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <WorkSection />

        <section className="dark relative overflow-hidden bg-ink px-5 py-24 text-paper md:px-10 md:py-36">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-flare blur-[100px] opacity-25" />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="grid gap-16 lg:grid-cols-[1fr_0.7fr] lg:gap-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="eyebrow">Start something</p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-10 font-display text-[clamp(4.4rem,8.5vw,9.5rem)] uppercase leading-[0.95] tracking-[-0.012em]"
                >
                  Let's create
                  <br />
                  <span className="text-acid">something</span>
                  <br />
                  meaningful.
                </motion.h2>
                <p className="mt-12 max-w-lg text-base leading-relaxed text-paper/55">
                  Have a product to build, a brand to sharpen or a workflow that needs fixing? Tell
                  me what you're imagining.
                </p>
                <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-[0.14em]">
                  <a
                    className="border-b border-paper/35 pb-1 hover:border-acid hover:text-acid"
                    href="mailto:eliseeweb@gmail.com"
                  >
                    Email
                  </a>
                  <a
                    className="border-b border-paper/35 pb-1 hover:border-acid hover:text-acid"
                    href="https://github.com/eliseengandu537-boop"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    className="border-b border-paper/35 pb-1 hover:border-acid hover:text-acid"
                    href="https://www.linkedin.com/in/elisee-ngandu-79b4a9419/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    className="border-b border-paper/35 pb-1 hover:border-acid hover:text-acid"
                    href="/resume.pdf"
                    download
                  >
                    Résumé
                  </a>
                </div>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={sendMessage}
                className="border-t border-paper/25 pt-2"
              >
                <label className="block border-b border-paper/25 py-6">
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-paper/40">
                    01 / Your name
                  </span>
                  <input
                    required
                    name="name"
                    maxLength={100}
                    className="mt-3 w-full bg-transparent text-lg outline-none placeholder:text-paper/25"
                    placeholder="What should I call you?"
                  />
                </label>
                <label className="block border-b border-paper/25 py-6">
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-paper/40">
                    02 / Your email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    maxLength={255}
                    className="mt-3 w-full bg-transparent text-lg outline-none placeholder:text-paper/25"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="block border-b border-paper/25 py-6">
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-paper/40">
                    03 / Tell me about it
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    maxLength={1500}
                    className="mt-3 w-full resize-none bg-transparent text-lg outline-none placeholder:text-paper/25"
                    placeholder="A quick project brief…"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-between bg-paper px-6 py-5 text-xs font-extrabold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-acid"
                >
                  Send via WhatsApp <ArrowUpRight size={18} />
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-paper/15 bg-ink px-5 py-8 text-paper md:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-3xl uppercase">
            Mr Ngandu<span className="text-flare">.</span>
          </p>
          <p className="text-paper/40">
            © {new Date().getFullYear()} · Built with intention in Johannesburg
          </p>
          <a className="font-bold uppercase tracking-[0.15em] hover:text-acid" href="#top">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
