import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProject, projects, type Project } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Mr Ngandu` },
          { name: "description", content: loaderData.project.desc },
          { property: "og:title", content: loaderData.project.title },
          { property: "og:description", content: loaderData.project.desc },
          { property: "og:image", content: loaderData.project.image },
        ]
      : [{ title: "Project — Mr Ngandu" }],
  }),
  notFoundComponent: () => (
    <Page eyebrow="// 404" title="Project not found.">
      <Link to="/projects" className="text-primary underline">← Back to projects</Link>
    </Page>
  ),
  errorComponent: ({ error }) => (
    <Page eyebrow="// error" title="Something went wrong.">
      <p className="text-muted-foreground">{error.message}</p>
    </Page>
  ),
});

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <Page eyebrow={`// ${project.tag}`} title={project.title}>
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} /> All projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden border border-border glow mb-12"
      >
        <img src={project.image} alt={project.title} width={1024} height={640} className="w-full h-auto" />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Overview</h2>
            <p className="text-lg text-foreground">{project.desc}</p>
          </section>
          <section>
            <h2 className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">The challenge</h2>
            <p>{project.challenge}</p>
          </section>
          <section>
            <h2 className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">What I built</h2>
            <p>{project.solution}</p>
          </section>
          <section>
            <h2 className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Outcome</h2>
            <p>{project.outcome}</p>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            {project.client && (
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold">Client</p>
                <p className="mt-1 text-foreground">{project.client}</p>
              </div>
            )}
            {project.role && (
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold">Role</p>
                <p className="mt-1 text-foreground">{project.role}</p>
              </div>
            )}
            {project.year && (
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold">Year</p>
                <p className="mt-1 text-foreground">{project.year}</p>
              </div>
            )}
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Tech stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full border border-border text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
                Visit project <ExternalLink size={14} />
              </a>
            )}
          </div>
        </aside>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xs uppercase tracking-widest text-primary font-semibold mb-6">Gallery</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.gallery.map((g, i) => (
              <motion.a
                key={i}
                href={g.src}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group rounded-xl overflow-hidden border border-border bg-card block"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="p-3 text-sm text-muted-foreground">{g.caption}</p>
              </motion.a>
            ))}
          </div>
        </section>
      )}

      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-6">More projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {others.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group rounded-xl overflow-hidden border border-border bg-card"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" width={1024} height={640} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <p className="text-[10px] uppercase tracking-widest text-primary font-semibold">{p.tag}</p>
                <h3 className="mt-1 font-semibold group-hover:text-primary transition-colors">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}
