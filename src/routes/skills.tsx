import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";

export const Route = createFileRoute("/skills")({
  component: Skills,
  head: () => ({
    meta: [
      { title: "Skills — dev.cube" },
      { name: "description", content: "Technical skills: TypeScript, React, Three.js, Node, Rust, cloud and more." },
    ],
  }),
});

const groups = [
  {
    title: "Frontend",
    items: ["TypeScript", "React", "Next.js", "TanStack", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "3D & Graphics",
    items: ["Three.js", "React Three Fiber", "GLSL Shaders", "Blender", "WebGPU", "GSAP"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Rust", "PostgreSQL", "Supabase", "tRPC", "GraphQL"],
  },
  {
    title: "Cloud & DevOps",
    items: ["Cloudflare Workers", "AWS", "Docker", "Vercel", "GitHub Actions", "Terraform"],
  },
];

function Skills() {
  return (
    <Page eyebrow="// toolbox" title="Skills sharpened over six years.">
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
              <h3 className="font-mono text-sm uppercase tracking-widest text-primary mb-6">{g.title}</h3>
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
