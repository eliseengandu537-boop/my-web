import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";

export const Route = createFileRoute("/skills")({
  component: Skills,
  head: () => ({
    meta: [
      { title: "Skills — Mr Ngandu" },
      { name: "description", content: "Skills across web development, CRM systems, DevOps, graphic design and marketing." },
    ],
  }),
});

const groups = [
  {
    title: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    title: "Backend & CRM",
    items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB", "CRM Systems"],
  },
  {
    title: "DevOps & Cloud",
    items: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Linux", "Nginx"],
  },
  {
    title: "Design & Marketing",
    items: ["Graphic Design", "Branding", "UI Layouts", "Photoshop", "Illustrator", "Digital Marketing"],
  },
];

function Skills() {
  return (
    <Page eyebrow="// toolbox" title="Skills sharpened on real projects.">
      <div className="grid md:grid-cols-2 gap-6">
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.08 }}
            className="p-8 rounded-2xl border border-border bg-card perspective-1000 group"
          >
            <div className="preserve-3d transition-transform duration-500 group-hover:[transform:rotateX(4deg)_rotateY(-4deg)]">
              <h3 className="text-sm uppercase tracking-widest text-primary mb-6 font-semibold">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="px-4 py-2 rounded-lg bg-background border border-border text-sm hover:border-primary hover:text-primary transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}
