import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Nav } from "@/components/Nav";
import bgVideo from "@/assets/background.mp4";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mr Ngandu — Software Developer & Graphic Designer" },
      { name: "description", content: "Portfolio of Mr Ngandu  software developer, graphic designer and marketer building scalable web apps and CRM systems." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 [background:var(--gradient-radial)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-primary mb-6 font-semibold"
          >
            // software developer · graphic designer · marketer
          </motion.p>

          <div className="flex items-start gap-6 mb-6 pointer-events-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] max-w-3xl text-white drop-shadow-lg"
            >
              Hi, I'm <span className="text-gradient">Mr Ngandu</span> I build the web.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-white/85 max-w-xl drop-shadow"
          >
            Software Developer . Graphic
            Designer & Marketeting manager. I create scalable web applications, CRM systems and digital assets that help businesses grow and succeed online.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-4 pointer-events-auto"
          >
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition-all glow"
            >
              <Download size={18} /> Download Resume
            </a>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card/40 backdrop-blur font-semibold hover:border-primary transition-colors"
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
              { Icon: Phone, href: "https://wa.me/27747067226" },
              { Icon: Mail, href: "mailto:eliseeweb@gmail.com" },
              { Icon: Github, href: "https://github.com/eliseengandu537-boop" },
              { Icon: Linkedin, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 grid place-items-center rounded-md border border-border bg-card/40 backdrop-blur text-white hover:text-primary hover:border-primary transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/70 tracking-widest">
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
            From rapid MVPs to large-scale platforms, I'll help you design, build and launch.
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
          <p>© {new Date().getFullYear()} Mr Ngandu, Software Developer & Designer.</p>
          <p className="text-xs">+27 74 706 7226 · eliseeweb@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
