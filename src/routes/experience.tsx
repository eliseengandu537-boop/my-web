import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";

export const Route = createFileRoute("/experience")({
  component: Experience,
  head: () => ({
    meta: [
      { title: "Experience — Mr Ngandu" },
      { name: "description", content: "Professional experience as a software developer and graphic designer." },
    ],
  }),
});

const jobs = [
  {
    role: "Software Developer",
    company: "Kamu Support",
    period: "Recent",
    points: [
      "Built web-based management solutions and CRM modules.",
      "Developed tracking and reporting modules used across teams.",
      "Improved workflow automation and reduced manual operations.",
      "Managed system debugging, optimization and database integration.",
      "Worked with Docker and AWS for deployment and dev environments.",
    ],
  },
  {
    role: "Graphic / Digital Designer",
    company: "Takealot",
    period: "Previous",
    points: [
      "Created digital assets, UI layouts and branding materials.",
      "Designed for marketing campaigns and business platforms.",
      "Collaborated with cross-functional teams to improve digital UX.",
    ],
  },
];

function Experience() {
  return (
    <Page eyebrow="// timeline" title="Where I've shipped, designed and shaped systems.">
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
                <p className="text-xs tracking-widest text-primary uppercase font-semibold">{j.period}</p>
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
