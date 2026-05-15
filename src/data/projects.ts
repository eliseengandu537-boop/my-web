import crmImg from "@/assets/project-crm.jpg";
import trackingImg from "@/assets/project-tracking.jpg";
import cloudImg from "@/assets/project-cloud.jpg";
import brandImg from "@/assets/project-brand.jpg";
import marketingImg from "@/assets/project-marketing.jpg";
import graphicsImg from "@/assets/project-graphics.jpg";

export type Project = {
  slug: string;
  title: string;
  tag: string;
  desc: string;
  image: string;
  accent: string;
  client?: string;
  role?: string;
  year?: string;
  tech: string[];
  challenge: string;
  solution: string;
  outcome: string;
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "crm-suite",
    title: "DG-Property CRM Suite",
    tag: "Web App · Node.js",
    desc: "CRM for property management and broker operations with dashboards, financial tracking and workflow automation.",
    image: crmImg,
    accent: "from-primary to-primary-glow",
    client: "DG-Property",
    role: "Software Developer",
    year: "2024",
    tech: ["JavaScript", "Node.js", "Express", "PostgreSQL", "Docker", "AWS"],
    challenge:
      "Brokers and management teams worked across spreadsheets and disconnected tools, slowing reporting and making financial tracking error-prone.",
    solution:
      "Designed a modular CRM with broker tracking, management dashboards, financial tracking and workflow automation. Built role-based access, audit trails and a reporting layer wired into the operations pipeline.",
    outcome:
      "Cut manual reporting work, centralized broker activity and gave leadership a single source of truth for property and financial KPIs.",
  },
  {
    slug: "tracking-reports",
    title: "Tracking & Reports Module",
    tag: "Dashboard · Postgres",
    desc: "Reporting module surfacing real-time KPIs, custom filters and exportable insights.",
    image: trackingImg,
    accent: "from-primary to-foreground",
    role: "Full-stack Developer",
    year: "2024",
    tech: ["Node.js", "PostgreSQL", "Chart.js", "REST API"],
    challenge: "Teams needed live KPIs without waiting on weekly exports.",
    solution:
      "Built a reporting service with cached aggregations, custom filters and CSV/PDF exports, embedded into the main CRM dashboard.",
    outcome: "Real-time visibility on sales, pipeline and operations performance.",
  },
  {
    slug: "cloud-deployments",
    title: "Cloud Deployments",
    tag: "DevOps · Docker · AWS",
    desc: "Dockerized services on AWS with CI/CD pipelines and monitored uptime.",
    image: cloudImg,
    accent: "from-foreground to-primary",
    role: "DevOps",
    year: "2024",
    tech: ["Docker", "AWS EC2", "AWS S3", "GitHub Actions", "Nginx"],
    challenge: "Manual deployments caused downtime and inconsistent environments.",
    solution:
      "Containerized services, set up CI/CD with GitHub Actions, automated zero-downtime deploys and added log + uptime monitoring.",
    outcome: "Faster, safer releases and consistent dev / staging / prod parity.",
  },
  {
    slug: "brand-identity",
    title: "Brand Identity Design",
    tag: "Branding · Logo · Guidelines",
    desc: "Full branding package: logo, color palette, typography and visual identity for corporate clients.",
    image: brandImg,
    accent: "from-primary-glow to-primary",
    role: "Graphic Designer",
    year: "2023",
    tech: ["Illustrator", "Photoshop", "Figma"],
    challenge: "Clients lacked a coherent visual identity across touchpoints.",
    solution:
      "Built logo systems, brand guidelines, stationery and digital asset libraries that scale across web, print and social.",
    outcome: "Consistent, recognizable brands ready for marketing rollout.",
  },
  {
    slug: "marketing-campaign",
    title: "Integrated Marketing Campaign",
    tag: "Marketing · Print · Social",
    desc: "Brochures, posters, social assets and campaign materials with cohesive brand messaging.",
    image: marketingImg,
    accent: "from-primary to-primary-glow",
    role: "Designer & Marketer",
    year: "2023",
    tech: ["Photoshop", "Illustrator", "Canva", "InDesign"],
    challenge: "Campaigns needed unified visuals across digital and print.",
    solution:
      "Designed full campaign kits — brochures, posters, social tiles and ad creatives — anchored by a single visual system.",
    outcome: "Higher engagement and clearer brand recall across channels.",
  },
  {
    slug: "graphics-design",
    title: "Graphics Design Portfolio",
    tag: "Illustration · UI · Print",
    desc: "Digital illustrations, infographics, UI/UX layouts and visual content for web and print.",
    image: graphicsImg,
    accent: "from-foreground to-primary",
    role: "Graphic Designer",
    year: "2022 — 2024",
    tech: ["Photoshop", "Illustrator", "Figma", "After Effects"],
    challenge: "Varied client needs across illustration, UI and print.",
    solution:
      "Delivered tailored visual systems — from app UI mockups to printed collateral — with reusable component libraries.",
    outcome: "A versatile body of work spanning digital and print design.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
