import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Scene3D } from "@/components/Scene3D";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "dev.cube — Software Developer Portfolio in 3D" },
      { name: "description", content: "Full-stack developer crafting performant, beautiful web experiences in three dimensions." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 [background:var(--gradient-radial)]" />

        <div className="absolute inset-0">
          <Scene3D interactive />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6"
          >
            // software engineer · creative coder
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] max-w-4xl"
          >
            Building the web in <span className="text-gradient">three</span> dimensions.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl"
          >
            I'm Alex — a software developer designing fast interfaces, expressive 3D worlds and resilient backends.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-4 pointer-events-auto"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition-all glow"
            >
              View projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card/40 backdrop-blur font-semibold hover:border-primary transition-colors"
            >
              Get in touch
            </Link>
          </motion.div>

          <div className="mt-16 flex gap-4 pointer-events-auto">
            {[
              { Icon: Github, href: "#" },
              { Icon: Linkedin, href: "#" },
              { Icon: Mail, href: "/contact" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-10 h-10 grid place-items-center rounded-md border border-border bg-card/40 backdrop-blur text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted-foreground tracking-widest">
          ↓ SCROLL TO EXPLORE
        </div>
      </section>

      {/* QUICK INTRO STATS */}
      <section className="relative border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8">
          {[
            { k: "6+", v: "Years building products" },
            { k: "40+", v: "Shipped projects" },
            { k: "12", v: "Happy long-term clients" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-border bg-background/40 perspective-1000 group"
            >
              <div className="preserve-3d transition-transform duration-500 group-hover:[transform:rotateX(8deg)_rotateY(-8deg)]">
                <p className="text-6xl font-bold text-gradient">{s.k}</p>
                <p className="mt-3 text-muted-foreground">{s.v}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Have an idea? Let's <span className="text-gradient">ship it.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            From rapid MVPs to large-scale platforms — I'll help you design, build and launch.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition-all glow"
          >
            Start a project <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} dev.cube — Crafted in three dimensions.</p>
          <p className="font-mono text-xs">{"// built with react · three.js · ❤"}</p>
        </div>
      </footer>
    </div>
  );
}
