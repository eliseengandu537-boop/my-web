import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";

export const Route = createFileRoute("/experience")({
  component: Experience,
  head: () => ({
    meta: [
      { title: "Experience — dev.cube" },
      { name: "description", content: "Professional experience as a software developer across startups and agencies." },
    ],
  }),
});

const jobs = [
  {
    role: "Senior Software Engineer",
    company: "Lumen Labs",
    period: "2023 — Present",
    points: [
      "Lead frontend architecture for a real-time 3D collaboration platform used by 30k creators.",
      "Cut interaction latency by 62% through WebGL instancing and shader optimisation.",
      "Mentor a team of 4 engineers; introduced design tokens and a shared motion system.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Northwind Studio",
    period: "2021 — 2023",
    points: [
      "Shipped 12 client products from concept to production — fintech, e-commerce, SaaS.",
      "Built a custom CMS on Cloudflare Workers powering 200+ marketing pages.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Pixel & Pine",
    period: "2019 — 2021",
    points: [
      "Designed reusable React component library adopted across 8 brand sites.",
      "Won 2 awwwards for interactive WebGL campaign sites.",
    ],
  },
];

function Experience() {
  return (
    <Page eyebrow="// timeline" title="Six years, one obsession: shipping.">
      <div className="relative">
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-16">
          {jobs.map((j, i) => (
            <motion.div
              key={j.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}
            >
              <div className={`pl-8 md:pl-0 ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                <div className="absolute left-0 md:left-1/2 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary glow" />
                <p className="font-mono text-xs tracking-widest text-primary uppercase">{j.period}</p>
                <h3 className="mt-2 text-2xl font-bold">{j.role}</h3>
                <p className="text-muted-foreground">{j.company}</p>
              </div>
              <ul className={`mt-4 md:mt-0 pl-8 md:pl-0 space-y-2 text-muted-foreground ${i % 2 ? "md:col-start-1 md:row-start-1 md:text-right" : ""}`}>
                {j.points.map((p, pi) => (
                  <li key={pi} className="leading-relaxed">— {p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Page>
  );
}
