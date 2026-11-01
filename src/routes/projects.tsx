import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Page } from "@/components/Page";
import { clientWebsites, projects } from "@/data/projects";
import workCss from "../work.css?url";

export const Route = createFileRoute("/projects")({
  component: Projects,
  head: () => ({
    meta: [
      { title: "Selected Work — Mr Ngandu" },
      {
        name: "description",
        content: "Explore websites, brand identities, graphic design and software projects by Mr Ngandu.",
      },
    ],
    links: [{ rel: "stylesheet", href: workCss }],
  }),
});

const categories = ["All", "Websites", "Branding", "Graphic design", "Software"] as const;
type Category = (typeof categories)[number];
type WorkCategory = Exclude<Category, "All">;

type WorkItem = {
  id: string;
  title: string;
  category: WorkCategory;
  image: string;
  description: string;
} & ({ kind: "website"; url: string } | { kind: "project"; slug: string });

const projectCategories: Record<string, WorkCategory> = {
  "crm-suite": "Software",
  "tracking-reports": "Software",
  "cloud-deployments": "Software",
  "brand-identity": "Branding",
  "marketing-campaign": "Graphic design",
  "graphics-design": "Graphic design",
};

const workItems: WorkItem[] = [
  ...clientWebsites.map((site): WorkItem => ({
    id: site.url,
    title: site.name,
    category: "Websites",
    image: site.image,
    description: site.description,
    kind: "website",
    url: site.url,
  })),
  ...projects.map((project): WorkItem => ({
    id: project.slug,
    title: project.title,
    category: projectCategories[project.slug] ?? "Software",
    image: project.image,
    description: project.desc,
    kind: "project",
    slug: project.slug,
  })),
];

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const content = (
    <>
      <div className="work-visual">
        <img
          src={item.image}
          alt={`${item.title} — ${item.category === "Websites" ? "website preview" : "project preview"}`}
          width={1200}
          height={800}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="work-card-action">
          {item.kind === "website" ? "Visit website" : "View project"}
          <ArrowUpRight size={18} aria-hidden="true" />
          {item.kind === "website" && <span className="sr-only"> (opens in a new tab)</span>}
        </span>
      </div>
      <div className="work-card-info">
        <div>
          <h2>{item.title}</h2>
          <span className="work-category">{item.category === "Websites" ? "Web design & development" : item.category}</span>
        </div>
        <span className="work-arrow" aria-hidden="true"><ArrowUpRight size={23} /></span>
      </div>
      <p className="sr-only">{item.description}</p>
    </>
  );

  return item.kind === "website" ? (
    <a className="work-card" href={item.url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link className="work-card" to="/projects/$slug" params={{ slug: item.slug }}>
      {content}
    </Link>
  );
}

function Projects() {
  const location = useLocation();
  const [category, setCategory] = useState<Category>("All");

  if (location.pathname.replace(/\/$/, "") !== "/projects") {
    return <Outlet />;
  }

  const visibleItems = category === "All" ? workItems : workItems.filter((item) => item.category === category);

  return (
    <Page
      dark
      variant="work"
      eyebrow="Our work"
      title="Selected work."
      intro="Websites, identities and digital tools. A collection of projects where thoughtful design meets practical development."
    >
      <section aria-label="Project gallery">
        <div className="work-toolbar">
          <div className="work-filters" role="group" aria-label="Filter projects by category">
            {categories.map((name) => (
              <button
                key={name}
                type="button"
                className={`work-filter${category === name ? " is-active" : ""}`}
                aria-pressed={category === name}
                aria-controls="work-gallery"
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <p className="work-count" role="status" aria-live="polite" aria-atomic="true">
            <span>{String(visibleItems.length).padStart(2, "0")}</span> {visibleItems.length === 1 ? "project" : "projects"}
          </p>
        </div>

        <div id="work-gallery" className="work-grid">
          {visibleItems.map((item, index) => <WorkCard key={item.id} item={item} index={index} />)}
        </div>
      </section>

      <section className="work-cta" aria-labelledby="work-cta-title">
        <p className="eyebrow">Something in mind?</p>
        <div className="work-cta-content">
          <h2 id="work-cta-title">Your next project<br />starts with a <span>hello.</span></h2>
          <div className="work-cta-aside">
            <p>Let's make something that works for your business and feels right for your audience.</p>
            <Link to="/contact" className="work-contact-link">
              Let's talk <span><ArrowRight size={20} aria-hidden="true" /></span>
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
