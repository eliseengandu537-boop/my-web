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
    company: "DG-Property",
    location: "Johannesburg, South Africa",
    period: "Current",
    points: [
      "Developed and maintained a CRM system for property management and broker operations.",
      "Designed modules for broker tracking, management dashboards, financial tracking and workflow automation.",
      "Integrated system functionality to improve operational efficiency and reporting.",
      "Streamlined business process management across teams.",
    ],
  },
  {
    role: "Full-Stack Web Developer",
    company: "Micrologistics",
    location: "Randburg, Johannesburg",
    period: "2023 to 2024",
    points: [
      "Built and shipped client web applications using React, Node.js and PostgreSQL.",
      "Developed REST APIs and integrated third-party payment and CRM services.",
      "Set up Docker-based environments and CI/CD pipelines for faster releases.",
      "Worked directly with clients across Johannesburg to scope and deliver projects.",
    ],
  },
  {
    role: "Software Developer",
    company: "Kamu Support",
    location: "Johannesburg, South Africa",
    period: "2022 to 2023",
    points: [
      "Built web-based management solutions and CRM modules.",
      "Developed tracking and reporting modules used across teams.",
      "Improved workflow automation and reduced manual operations.",
      "Managed system debugging, optimization and database integration.",
      "Worked with Docker and AWS for deployment and dev environments.",
    ],
  },
  {
    role: "Web Developer & Designer",
    company: "Joburg Creative Studio",
    location: "Braamfontein, Johannesburg",
    period: "2021 to 2022",
    points: [
      "Designed and developed responsive websites and landing pages for local businesses.",
      "Created brand identities, UI layouts and marketing assets for campaigns.",
      "Optimized sites for performance, SEO and mobile experience.",
      "Collaborated with marketing teams to align design with business goals.",
    ],
  },
  {
    role: "Graphic / Digital Designer",
    company: "Takealot",
    location: "Johannesburg, South Africa",
    period: "Previous",
    points: [
      "Created digital assets, UI layouts and branding materials.",
      "Designed for marketing campaigns and business platforms.",
      "Collaborated with cross-functional teams to improve digital UX.",
    ],
  },
  {
    role: "Digital Marketing Manager",
    company: "MMC",
    location: "Braamfontein, Johannesburg",
    period: "2022 to 2023",
    points: [
      "Planned and managed digital marketing campaigns across social media, email and web.",
      "Grew brand reach and engagement through targeted content and paid ad strategies.",
      "Analyzed campaign performance and optimized for conversions and ROI.",
      "Coordinated design, content and ad creative for consistent brand messaging.",
    ],
  },
  {
    role: "Marketing & Social Media Specialist",
    company: "Maboneng Brands",
    location: "Maboneng, Johannesburg",
    period: "2020 to 2021",
    points: [
      "Managed social media accounts and built content calendars for local brands.",
      "Created promotional graphics, posters and campaign assets.",
      "Ran community engagement and influencer outreach to grow audiences.",
      "Tracked analytics and reported on growth, reach and engagement metrics.",
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
                {j.period === "Current" && (
                  <p className="text-xs tracking-widest text-primary uppercase font-semibold">Current</p>
                )}
                <h3 className="mt-2 text-2xl font-bold">{j.role}</h3>
                <p className="text-muted-foreground">{j.company}</p>
                <p className="text-sm text-muted-foreground/80">{j.location}</p>
              </div>
              <ul className={`mt-4 md:mt-0 pl-8 md:pl-0 space-y-2 text-muted-foreground ${i % 2 ? "md:col-start-1 md:row-start-1 md:text-right" : ""}`}>
                {j.points.map((p, pi) => (
                  <li key={pi} className="leading-relaxed">{p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Page>
  );
}
