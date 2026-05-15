import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: () => ({
    meta: [
      { title: "Projects — Mr Ngandu" },
      { name: "description", content: "Selected projects: CRM systems, web apps, branding and marketing assets." },
    ],
  }),
});

function Projects() {
  return (
    <Page eyebrow="// selected work" title="Things I'm proud to have shipped.">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="group perspective-1000"
          >
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="block relative rounded-2xl border border-border bg-card overflow-hidden preserve-3d transition-transform duration-500 group-hover:[transform:rotateX(4deg)_rotateY(-4deg)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-tr ${p.accent} opacity-10 mix-blend-overlay`} />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold">{p.tag}</p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold leading-tight">{p.title}</h3>
                  <ArrowUpRight className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" size={20} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-border text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}
