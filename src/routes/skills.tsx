import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";

export const Route = createFileRoute("/skills")({
  component: Skills,
  head: () => ({
    meta: [
      { title: "Skills — Mr Ngandu" },
      { name: "description", content: "Skills across web development, CRM systems, DevOps, graphic design and digital marketing." },
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
    title: "Design & Digital Marketing",
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: gi * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 rounded-2xl border border-border bg-card perspective-1000 group"
          >
            <div className="preserve-3d transition-transform duration-700 ease-out group-hover:[transform:rotateX(2deg)_rotateY(-2deg)]">
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
