import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { motion } from "framer-motion";
import about1 from "@/assets/12 (1).jpeg";
import about2 from "@/assets/13.jpeg";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Mr Ngandu" },
      { name: "description", content: "Software developer, graphic designer and marketer building scalable, user-friendly software solutions." },
    ],
  }),
});

function About() {
  return (
    <Page eyebrow="// about me" title="Code, design, and a little marketing magic.">
      <div className="space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          {[about1, about2].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="perspective-1000 group"
            >
              <div className="preserve-3d transition-transform duration-500 group-hover:[transform:rotateX(6deg)_rotateY(-6deg)]">
                <img
                  src={src}
                  alt="Mr Ngandu portrait"
                  className="w-full rounded-2xl border border-border object-cover aspect-[4/5] glow"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            I'm <span className="text-foreground font-semibold">Mr Ngandu</span>  a Software
            Developer, Graphic Designer and Marketer from DR Congo, currently based in South Africa.
          </p>
          <p>
            I build web applications and CRM systems with JavaScript, Node.js, Docker and AWS, and I
            love turning messy workflows into clean, scalable software. On the creative side, I
            design digital assets, UI layouts and branding for marketing campaigns and business
            platforms.
          </p>
          <p>
            I care about efficient, user-friendly products and the small details that make people
            actually enjoy using them.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            {[
              { label: "Location", value: "South Africa" },
              { label: "Origin", value: "DRCongo" },
              { label: "Stack", value: "JavaScript · Node.js · Python · WordPress · Next.js · Docker · AWS" },
              { label: "Speaks", value: "English · French" },
            ].map((row) => (
              <div key={row.label} className="p-5 rounded-xl border border-border bg-card perspective-1000 group">
                <div className="preserve-3d transition-transform duration-500 group-hover:[transform:rotateX(6deg)_rotateY(-6deg)]">
                  <p className="text-xs uppercase tracking-widest text-primary font-semibold">{row.label}</p>
                  <p className="mt-2 text-foreground">{row.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
