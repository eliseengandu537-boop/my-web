import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { projects } from "@/data/projects";
import { growthServices } from "@/data/services";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mr Ngandu — Developer, Designer & Digital Marketer" },
      {
        name: "description",
        content:
          "Software development, brand design and digital marketing by Mr Ngandu, Johannesburg.",
      },
    ],
  }),
});

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

function Index() {
  return (
    <div className="studio-home">
      <IntroLoader />
      <Nav />
      <main id="top">
        <section className="studio-hero">
          <div className="studio-stars" aria-hidden="true" />
          <div className="studio-horizon" aria-hidden="true" />
          <motion.div
            className="studio-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="studio-kicker">
              <span /> Independent creative · Johannesburg, ZA
            </p>
            <h1>
              Built at the intersection
              <br />
              of <em>code & creativity.</em>
            </h1>
            <p className="studio-description">
              Software that works beautifully. Design that means something.
              <br />I bring development, design and digital marketing together.
            </p>
            <Link to="/contact" className="studio-button">
              Let's build something <ArrowUpRight size={16} />
            </Link>
          </motion.div>
          <div className="studio-orbit studio-orbit-left">
            <span>01 — Development</span>
            <strong>Made to work.</strong>
            <small>Thoughtful code. Seamless experiences.</small>
          </div>
          <div className="studio-orbit studio-orbit-right">
            <span>02 — Design & growth</span>
            <strong>Made to connect.</strong>
            <small>Distinctive brands. Lasting impressions.</small>
          </div>
          <a href="#selected-work" className="studio-scroll" aria-label="Explore selected work">
            <ArrowDown size={19} />
            <span>
              Explore
              <br />
              the work
            </span>
          </a>
          <div className="studio-hero-caption">
            <span>Ideas into experiences.</span>
            <span>Scroll to discover ↓</span>
          </div>
        </section>
        <section id="selected-work" className="studio-work">
          <div className="studio-section-label">
            <p>Selected work / 01</p>
            <Link to="/projects">
              All projects <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="studio-project-grid">
            {[projects[0], projects[3], projects[4]].map((project, index) => (
              <motion.article
                key={project.slug}
                className="studio-project"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: index * 0.1 }}
              >
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="studio-project-link"
                >
                  <div className="studio-project-top">
                    <span>
                      0{index + 1} / {project.role}
                    </span>
                    <ArrowUpRight size={17} />
                  </div>
                  <div className="studio-project-image">
                    <img src={project.image} alt={project.title} loading="lazy" />
                  </div>
                  <div className="studio-project-copy">
                    <p>{project.tag}</p>
                    <h2>{project.title}</h2>
                    <span>
                      Explore project <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
        <section id="about" className="studio-about studio-container">
          <div>
            <p className="studio-kicker">The person behind the pixels / 02</p>
            <h2>
              A little curiosity.
              <br />A lot of <em>possibility.</em>
            </h2>
          </div>
          <div className="studio-about-copy">
            <p>
              I'm Mr Ngandu, an independent creative developer based in Johannesburg. I connect the
              technical and the visual to build digital experiences that feel as good as they
              function.
            </p>
            <p>
              From custom business platforms to brand identities and campaigns, I bring a considered
              approach to every part of the experience.
            </p>
            <Link to="/about" className="studio-text-link">
              A little more about me <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
        <section className="studio-services studio-container">
          <div className="studio-section-label">
            <p>What we do / Connected growth</p>
            <Link to="/experience">
              Explore the system <ArrowUpRight size={14} />
            </Link>
          </div>
          <h2>
            A great website.
            <br />
            <em>A whole system behind it.</em>
          </h2>
          <p className="home-growth-intro">
            From the first discovery to the next sales conversation. Explore Concrete Agency's
            connected approach to websites, outreach, content and sales follow-up.
          </p>
          <div className="home-services-list">
            {growthServices
              .filter((_, index) => [0, 1, 2, 5, 6, 7].includes(index))
              .map((service, index) => (
                <Link to="/experience" key={service.title}>
                  <span>
                    <small>0{index + 1}</small>
                    {service.title}
                  </span>
                  <ArrowUpRight size={18} />
                </Link>
              ))}
          </div>
          <Link to="/experience" className="studio-text-link">
            See all services & packages <ArrowUpRight size={16} />
          </Link>
        </section>
        <section className="studio-contact studio-container">
          <p className="studio-kicker">Have something in mind?</p>
          <h2>
            Let's make
            <br />
            <em>something matter.</em>
          </h2>
          <Link to="/contact" className="studio-button">
            Start a conversation <ArrowUpRight size={16} />
          </Link>
          <a className="studio-email" href="mailto:eliseeweb@gmail.com">
            eliseeweb@gmail.com
          </a>
        </section>
      </main>
      <footer className="studio-footer studio-container">
        <Link to="/">
          Mr Ngandu<span>✦</span>
        </Link>
        <p>© {new Date().getFullYear()} · Crafted in Johannesburg</p>
        <a
          href="https://www.linkedin.com/in/elisee-ngandu-79b4a9419/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn <ArrowUpRight size={14} />
        </a>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
