import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Globe } from "lucide-react";
import { clientWebsites, projects } from "@/data/projects";

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
  const location = useLocation();

  if (location.pathname !== "/projects") {
    return <Outlet />;
  }

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
              className="flex h-full flex-col relative rounded-2xl border border-border glass glow-hover overflow-hidden preserve-3d transition-transform duration-500 group-hover:[transform:rotateX(4deg)_rotateY(-4deg)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-tr ${p.accent} opacity-20 mix-blend-overlay`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <span className="absolute left-4 top-4 text-xs font-mono text-primary/80">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold">{p.tag}</p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{p.title}</h3>
                  <ArrowUpRight className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" size={20} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-border bg-background/40 text-muted-foreground group-hover:border-primary/40 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {clientWebsites.length > 0 && (
        <section className="mt-24">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="text-primary" size={20} />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Live Client Websites</h2>
          </div>
          <p className="text-muted-foreground mb-8">Click to visit the live site.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientWebsites.map((site, i) => (
              <motion.a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex h-full flex-col rounded-2xl border border-border glass glow-hover overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={site.image}
                    alt={site.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{site.name}</h3>
                    <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" size={18} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{site.description}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Visit Website
                    <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      )}
    </Page>
  );
}
