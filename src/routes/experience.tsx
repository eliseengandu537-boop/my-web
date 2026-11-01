import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";
import { Page } from "@/components/Page";

export const Route = createFileRoute("/experience")({
  component: Experience,
  head: () => ({
    meta: [
      { title: "Journey & Services — Mr Ngandu" },
      {
        name: "description",
        content:
          "Explore branding, web design, development, custom software and digital marketing services by Mr Ngandu.",
      },
    ],
  }),
});

const services = [
  {
    title: "Branding",
    category: "Define your identity",
    description:
      "A clear visual identity that connects your business across every touchpoint.",
    deliverables: ["Logo design", "Visual identity", "Brand guidelines"],
  },
  {
    title: "Web design",
    category: "Make a first impression",
    description:
      "Thoughtful interfaces that make your story clear and your website easy to explore.",
    deliverables: ["UI/UX", "Responsive layouts", "Figma prototypes"],
  },
  {
    title: "Graphic design",
    category: "Bring your ideas to life",
    description:
      "Distinctive visuals for campaigns, everyday communication and the moments that matter.",
    deliverables: ["Campaign graphics", "Print design", "Social content"],
  },
  {
    title: "Web development",
    category: "Build the experience",
    description:
      "Responsive websites, built with care and supported beyond the initial launch.",
    deliverables: ["React", "WordPress", "Website maintenance"],
  },
  {
    title: "Custom software",
    category: "Make work flow",
    description:
      "Business tools that connect your data, simplify tasks and support your team.",
    deliverables: ["CRM systems", "Dashboards", "Workflow automation"],
  },
  {
    title: "Digital marketing",
    category: "Reach your audience",
    description:
      "Connected content and paid campaigns shaped around your audience and business goals.",
    deliverables: ["Google Ads", "Meta Ads", "Email campaigns"],
  },
  {
    title: "SEO",
    category: "Be easier to find",
    description:
      "Practical improvements to website structure, content and performance for better discoverability.",
    deliverables: ["Technical SEO", "Page optimisation", "Analytics"],
  },
];

function Experience() {
  return (
    <Page eyebrow="Journey / What I do" title="From idea to impact.">
      <section aria-labelledby="services-heading">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[1fr_1.35fr] md:gap-16">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Design · Development · Growth
            </p>
            <h2 id="services-heading" className="max-w-lg text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
              Good ideas deserve<br />
              <span className="text-flare">thoughtful execution.</span>
            </h2>
          </div>
          <div className="flex max-w-xl flex-col items-start justify-between gap-7 md:pt-8">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              I bring design, code and marketing together to help businesses take
              their next step. Explore the services below to find the right place
              to start.
            </p>
            <a href="#service-list" className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] hover:text-flare">
              Explore the services <ArrowDownRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div id="service-list" className="scroll-mt-28 border-t border-ink">
          {services.map((service, index) => (
            <details key={service.title} className="group border-b border-ink/25" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center gap-4 py-7 outline-offset-[-4px] transition-colors hover:text-flare focus-visible:outline-2 focus-visible:outline-flare md:gap-8 md:py-10 [&::-webkit-details-marker]:hidden">
                <span className="self-start pt-1 text-xs font-semibold tabular-nums text-flare md:pt-3" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="min-w-0 flex-1 text-2xl font-semibold tracking-[-0.045em] sm:text-4xl md:text-5xl">
                  {service.title}
                </h3>
                <span className="hidden text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground lg:block">
                  {service.category}
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/30 transition-colors group-open:border-ink group-open:bg-ink group-open:text-paper md:ml-8 md:size-12">
                  <Plus className="transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none" size={20} aria-hidden="true" />
                </span>
              </summary>
              <div className="grid gap-7 pb-9 pl-8 md:grid-cols-[1.2fr_1fr] md:gap-16 md:pb-12 md:pl-12">
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {service.description}
                </p>
                <ul className="flex flex-wrap items-start gap-x-6 gap-y-3 text-[11px] font-bold uppercase tracking-[0.1em]">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="inline-flex items-center gap-2">
                      <span className="size-1.5 shrink-0 bg-flare" aria-hidden="true" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 bg-ink p-7 text-paper sm:p-10 md:mt-28 md:grid-cols-[1.4fr_1fr] md:items-end md:p-16" aria-labelledby="journey-cta-heading">
        <div>
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-paper/60">Your next chapter</p>
          <h2 id="journey-cta-heading" className="font-display text-5xl uppercase leading-none md:text-7xl">
            Have an idea?<br />
            <span className="text-acid">Let's build it.</span>
          </h2>
        </div>
        <div className="flex flex-col items-start gap-7 md:items-end">
          <p className="max-w-sm text-sm leading-relaxed text-paper/70 md:text-right">
            Tell me what you have in mind. We can work out the next step together.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-between gap-10 bg-paper px-6 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-acid">
            Start a conversation <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
          <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] underline decoration-paper/40 underline-offset-4 transition-colors hover:text-acid">
            Explore my work <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Page>
  );
}
