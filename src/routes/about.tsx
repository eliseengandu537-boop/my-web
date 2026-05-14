import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — dev.cube" },
      { name: "description", content: "Full-stack developer with a passion for 3D interfaces, performance and craft." },
    ],
  }),
});

function About() {
  return (
    <Page eyebrow="// about me" title="A developer who treats code as craft.">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            I'm <span className="text-foreground font-semibold">Alex Carter</span>, a software developer
            based between Berlin and the open web. I build products that feel as good as they look — performant
            apps, sculpted interfaces and immersive 3D experiences.
          </p>
          <p>
            For six years I've shipped at startups and agencies, leading frontend architecture, designing
            systems and getting deep into WebGL, real-time graphics and edge runtimes. I care about typography,
            milliseconds and the small details users never name but always feel.
          </p>
          <p>
            Off the keyboard you'll find me modeling in Blender, riding analog film cameras through cities,
            or contributing to open-source projects.
          </p>
        </div>

        <aside className="space-y-6">
          {[
            { label: "Location", value: "Berlin · Remote" },
            { label: "Available", value: "Q3 2026 — limited slots" },
            { label: "Stack", value: "TypeScript · React · Three.js · Rust" },
            { label: "Speaks", value: "English · Deutsch · Français" },
          ].map((row) => (
            <div key={row.label} className="p-5 rounded-xl border border-border bg-card">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">{row.label}</p>
              <p className="mt-2 text-foreground">{row.value}</p>
            </div>
          ))}
        </aside>
      </div>
    </Page>
  );
}
