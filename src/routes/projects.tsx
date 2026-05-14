import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: () => ({
    meta: [
      { title: "Projects — dev.cube" },
      { name: "description", content: "Selected projects across 3D, web apps, design systems and open-source." },
    ],
  }),
});

const projects = [
  {
    title: "Orbit OS",
    tag: "3D · Realtime",
    desc: "Browser-based 3D operating system with multi-user spatial windows.",
    accent: "from-primary to-primary-glow",
  },
  {
    title: "Helix Pay",
    tag: "Fintech · Stripe",
    desc: "Subscription billing dashboard with revenue forecasting and dunning automation.",
    accent: "from-primary to-foreground",
  },
  {
    title: "Forge UI",
    tag: "Open-source",
    desc: "A 60-component React design system with accessible primitives and motion presets.",
    accent: "from-foreground to-primary",
  },
  {
    title: "Atlas Map",
    tag: "WebGL · Mapping",
    desc: "Custom vector map renderer pushing 1M points at 60fps in the browser.",
    accent: "from-primary-glow to-primary",
  },
];

function Projects() {
  return (
    <Page eyebrow="// selected work" title="Things I'm proud to have shipped.">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href="#"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative p-8 rounded-2xl border border-border bg-card overflow-hidden perspective-1000"
          >
            <div className="preserve-3d transition-transform duration-500 group-hover:[transform:rotateX(6deg)_rotateY(-6deg)]">
              <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-3xl`} />
              <p className="font-mono text-xs uppercase tracking-widest text-primary">{p.tag}</p>
              <div className="mt-4 flex items-start justify-between gap-4">
                <h3 className="text-3xl font-bold">{p.title}</h3>
                <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="mt-8 h-40 rounded-xl border border-border bg-background/60 grid place-items-center font-mono text-xs text-muted-foreground">
                {`<${p.title.toLowerCase().replace(/\s/g, "-")} />`}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Page>
  );
}
