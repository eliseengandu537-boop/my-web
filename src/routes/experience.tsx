import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus, Check } from "lucide-react";
import { Page } from "@/components/Page";
import { growthServices, growthPackages } from "@/data/services";

export const Route = createFileRoute("/experience")({
  component: Experience,
  head: () => ({
    meta: [
      { title: "What We Do — Mr Ngandu" },
      {
        name: "description",
        content:
          "Explore the Concrete Agency growth system: websites, verified buyer research, permission-first outreach, SEO, content and connected sales dashboards.",
      },
    ],
  }),
});
function Experience() {
  return (
    <Page
      eyebrow="What we do / Connected growth"
      title="More than a website. A system for growth."
      intro="Bring your website, outreach, content and sales follow-up together. Explore the growth offering outlined in Concrete Agency's What We Do guide."
    >
      <section className="services-intro" aria-labelledby="growth-heading">
        <h2 id="growth-heading">
          Five engines.
          <br />
          One <em>connected pipeline.</em>
        </h2>
        <p>
          Outbound helps identify the right buyers. Search and content help interested people find
          you. Both feed a shared dashboard, giving your sales team the context to make the next
          call. The website is included with the full managed system.
        </p>
      </section>
      <section className="growth-flow" aria-label="How the system connects">
        <div>
          <span>01 / Attract</span>
          <p>
            Buyer research · Email · LinkedIn
            <br />
            SEO & AEO · Content
          </p>
        </div>
        <ArrowUpRight aria-hidden="true" />
        <div>
          <span>02 / Connect</span>
          <p>
            Website & enquiry capture
            <br />
            One sales dashboard
          </p>
        </div>
        <ArrowUpRight aria-hidden="true" />
        <div>
          <span>03 / Follow through</span>
          <p>
            Rep calls · Quotes · Outcomes
            <br />
            Reporting & improvement
          </p>
        </div>
      </section>
      <section aria-labelledby="service-heading">
        <div className="studio-section-label">
          <h2 id="service-heading">What the system includes</h2>
          <span>10 connected parts</span>
        </div>
        <div className="services-list">
          {growthServices.map((service, index) => (
            <details
              id={`service-${index + 1}`}
              className="service-item"
              key={service.title}
              open={index === 0}
            >
              <summary>
                <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <Plus aria-hidden="true" />
              </summary>
              <div className="service-content">
                <p>{service.description}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="growth-fit" aria-labelledby="fit-heading">
        <p className="studio-kicker">Who this is for</p>
        <h2 id="fit-heading">
          Established businesses.
          <br />
          Ready for the next conversation.
        </h2>
        <p>
          The guide focuses on established South African businesses in construction, property, the
          trades and industrial services. The system works alongside an owner or sales rep who can
          follow up with interested buyers.
        </p>
        <div>
          <span>Construction & property</span>
          <span>Electrical, plumbing & roofing</span>
          <span>Solar & industrial services</span>
        </div>
      </section>
      <section className="growth-packages" aria-labelledby="packages-heading">
        <p className="studio-kicker">Choose your starting point</p>
        <h2 id="packages-heading">Three ways to work together.</h2>
        <div className="growth-package-grid">
          {growthPackages.map((pack, index) => (
            <article key={pack.name} className={index === 2 ? "is-featured" : ""}>
              <span className="studio-kicker">
                0{index + 1} / {index === 2 ? "Managed growth" : "Your foundation"}
              </span>
              <h3>{pack.name}</h3>
              <p>{pack.description}</p>
              <ul>
                {pack.features.map((feature) => (
                  <li key={feature}>
                    <Check size={14} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="studio-text-link">
                Discuss this package <ArrowUpRight size={15} />
              </Link>
            </article>
          ))}
        </div>
        <p className="growth-note">
          Scope and pricing are agreed after a discovery conversation. We measure the work and the
          outcomes; rankings, lead volumes and sales are not guaranteed.
        </p>
      </section>
      <section className="service-process" aria-labelledby="process-heading">
        <p className="studio-kicker">A clear beginning</p>
        <h2 id="process-heading">From first conversation to launch.</h2>
        <div className="service-process-grid">
          {[
            {
              title: "Discover & define",
              text: "Agree your ideal buyer, goals and lead handover. Gather the brand assets and access needed to build.",
            },
            {
              title: "Build & connect",
              text: "Prepare the website, dashboard, first buyer list and content. Configure the outreach setup and train the sales team.",
            },
            {
              title: "Launch & improve",
              text: "Launch after approval and readiness checks. Review responses, calls and quotes, and improve the system with real feedback.",
            },
          ].map((step, index) => (
            <article key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="growth-faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading">A few things to know.</h2>
        {[
          {
            q: "Why is a website included?",
            a: "The full managed package needs a clear destination for outreach, search and content. The website is part of that connected system rather than a separate add-on.",
          },
          {
            q: "How soon does everything start?",
            a: "The guide allows roughly two weeks for the website and at least 21 days of inbox warm-up before outreach begins. Actual launch dates depend on access, approvals and readiness checks. Search visibility develops over a longer period.",
          },
          {
            q: "Do you guarantee a number of leads?",
            a: "No. Market response varies. The focus is on agreed work, clear tracking and honest reporting from enquiries through to quotes and won jobs.",
          },
          {
            q: "What does my team need to do?",
            a: "Approve content and messaging, join reviews and follow up with interested leads promptly. The system supports your sales team; your team handles the sales conversation.",
          },
        ].map((faq) => (
          <details key={faq.q}>
            <summary>
              {faq.q}
              <Plus size={17} aria-hidden="true" />
            </summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </section>
      <section className="service-cta">
        <div>
          <h2>Let's connect the dots.</h2>
          <p>Tell me about your business and where you want to go next.</p>
        </div>
        <Link to="/contact" className="studio-button">
          Start a conversation <ArrowUpRight size={16} />
        </Link>
      </section>
    </Page>
  );
}
