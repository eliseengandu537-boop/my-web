import crmImg from "@/assets/project-crm.png";
import trackingImg from "@/assets/project-tracking.jpg";
import cloudImg from "@/assets/project-cloud.jpg";
import brandImg from "@/assets/project-brand.jpg";
import marketingImg from "@/assets/project-marketing.jpg";
import graphicsImg from "@/assets/project-graphics.jpg";
import gAgro from "@/assets/graphics/logos-agro.jpg";
import gFinance from "@/assets/graphics/logos-finance.jpg";
import gShopping from "@/assets/graphics/logos-shopping.jpg";
import gEngineering from "@/assets/graphics/logos-engineering.jpg";
import gHotels from "@/assets/graphics/logos-hotels.jpg";
import gBanners from "@/assets/graphics/banners.jpg";
import gSocial1 from "@/assets/graphics/social-1.jpg";
import gSocial2 from "@/assets/graphics/social-2.jpg";
import gSocial3 from "@/assets/graphics/social-3.jpg";
import gSocial4 from "@/assets/graphics/social-4.jpg";

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
  gallery?: { src: string; caption: string }[];
};

export const projects: Project[] = [
  {
    slug: "crm-suite",
    title: "DG-Property CRM Suite",
    tag: "Web App · Node.js · WordPress",
    desc: "CRM for property management and broker operations with dashboards, financial tracking and workflow automation. Also built and maintain the main company website using WordPress and custom coding.",
    image: crmImg,
    accent: "from-primary to-primary-glow",
    client: "DG-Property",
    role: "Software Developer",
    year: "2024",
    tech: ["JavaScript", "Node.js", "Express", "PostgreSQL", "Docker", "AWS", "WordPress", "PHP"],
    challenge:
      "Brokers and management teams worked across spreadsheets and disconnected tools, slowing reporting and making financial tracking error-prone.",
    solution:
      "Designed a modular CRM with broker tracking, management dashboards, financial tracking and workflow automation. Built role-based access, audit trails and a reporting layer wired into the operations pipeline.",
    outcome:
      "Cut manual reporting work, centralized broker activity and gave leadership a single source of truth for property and financial KPIs.",
    link: "https://www.dg-property.co.za",
    gallery: [
      { src: crmImg, caption: "DG-Property CRM Suite" },
      // Add website screenshots here when available
    ],
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
      "Designed full campaign kits including brochures, posters, social tiles and ad creatives, anchored by a single visual system.",
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
    year: "2022 to 2024",
    tech: ["Photoshop", "Illustrator", "Figma", "After Effects"],
    challenge: "Varied client needs across illustration, UI and print.",
    solution:
      "Delivered tailored visual systems, from app UI mockups to printed collateral, with reusable component libraries.",
    outcome: "A versatile body of work spanning digital and print design.",
    gallery: [
      { src: gAgro, caption: "Agropastoral & Produits Bio logo collection" },
      { src: gFinance, caption: "Finance & Service Delivery logo collection" },
      { src: gShopping, caption: "Shopping & Beauty logo collection" },
      { src: gEngineering, caption: "Engineering & Construction logo collection" },
      { src: gHotels, caption: "Hôtels & Restaurants logo collection" },
      { src: gBanners, caption: "Web banners & marketing headers" },
      { src: gSocial1, caption: "Social media campaigns set 1" },
      { src: gSocial2, caption: "Social media campaigns set 2" },
      { src: gSocial3, caption: "Event & promo posts set 3" },
      { src: gSocial4, caption: "Event & promo posts set 4" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/**
 * Live client websites — add the sites you built for clients here.
 * Each one shows a screenshot and a "Visit Website" button that opens the real site.
 */
export type ClientWebsite = {
  name: string;
  url: string;
  image: string;
  description: string;
};

export const clientWebsites: ClientWebsite[] = [
  {
    name: "DG-Property",
    url: "https://www.dg-property.co.za",
    image: "https://image.thum.io/get/width/1200/crop/900/https://www.dg-property.co.za/",
    description:
      "Property management company website, built and maintained with WordPress and custom code.",
  },
  {
    name: "Micrologistics",
    url: "https://micrologistics.co.za/",
    image: "https://image.thum.io/get/width/1200/crop/900/https://micrologistics.co.za/",
    description: "Business website designed and developed for Micrologistics.",
  },
  {
    name: "New Life United",
    url: "https://newlifeunited.co.za/",
    image: "https://image.thum.io/get/width/1200/crop/900/https://newlifeunited.co.za/",
    description: "Website designed and developed for New Life United.",
  },
  {
    name: "Thunder Brothers",
    url: "https://thunderbrothers.co.za/",
    image: "https://image.thum.io/get/width/1200/crop/900/https://thunderbrothers.co.za/",
    description: "Website designed and developed for Thunder Brothers.",
  },
  {
    name: "CTCPM Data Warehouse",
    url: "https://www.datawarehouse.ctcpm.cd/",
    image: "https://image.thum.io/get/width/1200/crop/900/https://www.datawarehouse.ctcpm.cd/",
    description: "Data warehouse platform designed and developed for CTCPM.",
  },
  {
    name: "Lens Photo Studio",
    url: "https://lensphotostudio.co.za/",
    image: "https://image.thum.io/get/width/1200/crop/900/https://lensphotostudio.co.za/",
    description: "Website designed and developed for Lens Photo Studio.",
  },
  // Add more client websites below, e.g.:
  // {
  //   name: "Client Name",
  //   url: "https://clientsite.co.za",
  //   image: someImportedImage,
  //   description: "Short description of the website you built.",
  // },
];
