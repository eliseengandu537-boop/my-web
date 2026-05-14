import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/Page";
import { Github, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Mr Ngandu" },
      { name: "description", content: "Get in touch with Mr Ngandu — messages are delivered instantly via WhatsApp." },
    ],
  }),
});

const WHATSAPP_NUMBER = "27747067226"; // +27 74 706 7226

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

function Contact() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    const { name, email, subject, message } = parsed.data;
    const text = `Hello Mr Ngandu,%0A%0A*${encodeURIComponent(subject)}*%0A%0A${encodeURIComponent(message)}%0A%0A— ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Page eyebrow="// say hello" title="Let's build something memorable.">
      <div className="grid lg:grid-cols-5 gap-12">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 space-y-6 p-8 rounded-2xl border border-border bg-card"
        >
          <p className="text-sm text-muted-foreground">
            Your message opens directly in WhatsApp and lands in my inbox at{" "}
            <span className="text-primary font-semibold">+27 74 706 7226</span>.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Name" name="name" placeholder="Your full name" maxLength={100} />
            <Field label="Email" name="email" type="email" placeholder="you@domain.com" maxLength={255} />
          </div>
          <Field label="Subject" name="subject" placeholder="A project, a job, a question…" maxLength={150} />
          <div>
            <label className="text-xs uppercase tracking-widest text-primary font-semibold">Message</label>
            <textarea
              required
              name="message"
              rows={6}
              maxLength={2000}
              className="mt-2 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Tell me about it…"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition-all glow"
          >
            <MessageCircle size={18} /> Send via WhatsApp
          </button>
        </form>

        <aside className="lg:col-span-2 space-y-4">
          <ContactRow Icon={Phone} label="Phone / WhatsApp" value="+27 74 706 7226" href="https://wa.me/27747067226" />
          <ContactRow Icon={Mail} label="Email" value="eliseeweb@gmail.com" href="mailto:eliseeweb@gmail.com" />
          <ContactRow Icon={MapPin} label="Based in" value="South Africa · DR Congo" />
          <ContactRow Icon={Github} label="GitHub" value="@mrngandu" />
          <ContactRow Icon={Linkedin} label="LinkedIn" value="/in/mrngandu" />

          <div className="p-6 rounded-xl border border-primary bg-primary/5">
            <p className="text-xs text-primary uppercase tracking-widest font-semibold">Response time</p>
            <p className="mt-2 text-foreground">Usually within a few hours.</p>
          </div>
        </aside>
      </div>
    </Page>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-primary font-semibold">{label}</label>
      <input
        required
        {...props}
        className="mt-2 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
      />
    </div>
  );
}

function ContactRow({ Icon, label, value, href }: { Icon: React.ComponentType<{ size?: number }>; label: string; value: string; href?: string }) {
  const Wrap: any = href ? "a" : "div";
  const props: any = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Wrap {...props} className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary transition-colors">
      <div className="w-10 h-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{label}</p>
        <p className="text-foreground">{value}</p>
      </div>
    </Wrap>
  );
}
