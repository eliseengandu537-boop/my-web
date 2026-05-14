import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: () => ({
    meta: [
      { title: "Projects — Mr Ngandu" },
      { name: "description", content: "Selected projects: CRM systems, web apps, branding and marketing assets." },
    ],
  }),
});

const projects = [
  {
    title: "CRM Suite",
    tag: "Web App · Node.js",
    desc: "Web-based management platform with tracking, reporting and workflow automation modules.",
    accent: "from-primary to-primary-glow",
  },
  {
    title: "Tracking & Reports",
    tag: "Dashboard · Postgres",
    desc: "Reporting module surfacing real-time KPIs, custom filters and exportable insights.",
    accent: "from-primary to-foreground",
  },
  {
    title: "Cloud Deployments",
    tag: "DevOps · Docker · AWS",
    desc: "Dockerized services deployed on AWS with CI/CD pipelines and monitored uptime.",
    accent: "from-foreground to-primary",
  },
  {
    title: "Brand & Campaigns",
    tag: "Design · Marketing",
    desc: "Branding kits, UI layouts and campaign visuals for marketing and business platforms.",
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
              <p className="text-xs uppercase tracking-widest text-primary font-semibold">{p.tag}</p>
              <div className="mt-4 flex items-start justify-between gap-4">
                <h3 className="text-3xl font-bold">{p.title}</h3>
                <ExternalLink className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="mt-8 h-40 rounded-xl border border-border bg-background/60 grid place-items-center text-xs text-muted-foreground">
                {`<${p.title.toLowerCase().replace(/\s/g, "-")} />`}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Page>
  );
}
