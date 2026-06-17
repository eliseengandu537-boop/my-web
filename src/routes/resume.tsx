import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";
import { Download, FileText, Mail, MapPin, Phone } from "lucide-react";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/resume")({
  component: Resume,
  head: () => ({
    meta: [
      { title: "Resume — Mr Ngandu" },
      { name: "description", content: "Download the latest resume of Mr Ngandu — Software Developer & Graphic Designer." },
    ],
  }),
});

function Resume() {
  return (
    <Page eyebrow="// curriculum vitae" title="My latest resume.">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Download card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 p-8 rounded-2xl border border-border bg-card perspective-1000 group"
        >
          <div className="preserve-3d transition-transform duration-500 group-hover:[transform:rotateX(6deg)_rotateY(-6deg)] space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={portrait}
                alt="Mr Ngandu"
                className="w-20 h-20 rounded-xl object-cover border border-primary glow"
              />
              <div>
                <p className="font-semibold text-lg">Mr Ngandu</p>
                <p className="text-xs uppercase tracking-widest text-primary">Software Developer</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background/40">
              <FileText className="text-primary" size={22} />
              <div className="flex-1">
                <p className="font-semibold text-sm">resume.pdf</p>
                <p className="text-xs text-muted-foreground">Latest version · PDF</p>
              </div>
            </div>

            <a
              href="/resume.pdf"
              download
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition-all glow"
            >
              <Download size={18} /> Download Resume
            </a>

            <div className="space-y-3 text-sm">
              <Row Icon={Phone} label="+27 74 706 7226" />
              <Row Icon={Mail} label="eliseeweb@gmail.com" />
              <Row Icon={MapPin} label="South Africa" />
            </div>
          </div>
        </motion.div>

        {/* Inline resume preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 p-8 rounded-2xl border border-border bg-card space-y-8"
        >
          <Section title="Summary">
            <p className="text-muted-foreground leading-relaxed">
              Software Developer with experience building web applications and CRM systems. Skilled
              in JavaScript, Node.js, Docker, and AWS, with knowledge of frontend and backend
              development. Focused on creating efficient, scalable, and user-friendly software
              solutions. Also a Graphic Designer & Marketing creative.
            </p>
          </Section>

          <Section title="Education">
            <div className="space-y-1">
              <p className="font-semibold">Matric, Grade 12, Software Engineering</p>
              <p className="text-muted-foreground">Jeppe College · South Africa</p>
            </div>
          </Section>

          <Section title="Work Experience">
            <div className="space-y-6">
              <div>
                <p className="font-semibold">Software Developer, Kamu Support</p>
                <ul className="mt-2 space-y-1 text-muted-foreground text-sm">
                  <li>Built web-based management solutions and CRM modules</li>
                  <li>Developed tracking and reporting modules</li>
                  <li>Improved workflow automation</li>
                  <li>Managed system debugging and optimization</li>
                  <li>Supported database integration and maintenance</li>
                  <li>Worked with Docker and AWS deployment environments</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Graphic / Digital Designer, Takealot</p>
                <ul className="mt-2 space-y-1 text-muted-foreground text-sm">
                  <li>Created digital assets, UI layouts and branding materials</li>
                  <li>Designed marketing campaigns and business platform visuals</li>
                  <li>Collaborated with teams to improve digital user experiences</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {["JavaScript", "Node.js", "React", "Docker", "AWS", "PostgreSQL", "CRM Systems", "Graphic Design", "Branding", "UI Design"].map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-md bg-background border border-border text-xs">{s}</span>
              ))}
            </div>
          </Section>

          <Section title="Languages">
            <p className="text-muted-foreground">English · French</p>
          </Section>
        </motion.div>
      </div>
    </Page>
  );
}

function Row({ Icon, label }: { Icon: React.ComponentType<{ size?: number }>; label: string }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground">
      <Icon size={14} />
      <span>{label}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
