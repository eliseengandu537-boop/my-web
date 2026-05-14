import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — dev.cube" },
      { name: "description", content: "Get in touch to start a project, collaborate or just say hi." },
    ],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Page eyebrow="// say hello" title="Let's build something memorable.">
      <div className="grid lg:grid-cols-5 gap-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="lg:col-span-3 space-y-6 p-8 rounded-2xl border border-border bg-card"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Name" name="name" placeholder="Ada Lovelace" />
            <Field label="Email" name="email" type="email" placeholder="ada@domain.com" />
          </div>
          <Field label="Subject" name="subject" placeholder="A 3D landing page for…" />
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-primary">Message</label>
            <textarea
              required
              rows={6}
              className="mt-2 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Tell me about the project…"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition-all glow"
          >
            {sent ? "Message sent ✓" : "Send message"}
          </button>
        </form>

        <aside className="lg:col-span-2 space-y-4">
          <ContactRow Icon={Mail} label="Email" value="hello@devcube.io" />
          <ContactRow Icon={MapPin} label="Based in" value="Berlin, Germany" />
          <ContactRow Icon={Github} label="GitHub" value="@alexcarter" />
          <ContactRow Icon={Linkedin} label="LinkedIn" value="/in/alexcarter" />
          <ContactRow Icon={Twitter} label="Twitter / X" value="@alex_codes" />

          <div className="p-6 rounded-xl border border-primary bg-primary/5">
            <p className="font-mono text-xs text-primary uppercase tracking-widest">Response time</p>
            <p className="mt-2 text-foreground">Within 24 hours, Mon–Fri.</p>
          </div>
        </aside>
      </div>
    </Page>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="font-mono text-xs uppercase tracking-widest text-primary">{label}</label>
      <input
        required
        {...props}
        className="mt-2 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
      />
    </div>
  );
}

function ContactRow({ Icon, label, value }: { Icon: React.ComponentType<{ size?: number }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary transition-colors">
      <div className="w-10 h-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon size={18} />
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-foreground">{value}</p>
      </div>
    </div>
  );
}
