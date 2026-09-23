import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Nav } from "./Nav";

export function Page({
  title,
  eyebrow,
  children,
  dark = false,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`${dark ? "dark " : ""}relative min-h-screen overflow-hidden bg-background text-foreground`}
    >
      <Nav />

      <main className="relative mx-auto max-w-[1600px] px-5 pb-28 pt-36 md:px-10 md:pt-44">
        <div className="pointer-events-none absolute inset-y-0 left-5 right-5 -z-10 border-x border-ink/10 md:left-10 md:right-10" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-ink pb-10 md:pb-14"
        >
          <div className="mb-6 flex items-center justify-between gap-6">
            {eyebrow && <p className="eyebrow">{eyebrow.replace("// ", "")}</p>}
            <p className="hidden text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground sm:block">
              Software developer · Graphic designer · Digital marketer
            </p>
          </div>
          <h1 className="max-w-[1320px] font-display text-[clamp(4rem,10vw,9.5rem)] uppercase leading-[0.96] tracking-[-0.012em]">
            {title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="pt-12 md:pt-16"
        >
          {children}
        </motion.div>
      </main>

      <footer className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-10">
          <div>
            <p className="font-display text-4xl uppercase leading-none">
              Mr Ngandu<span className="text-flare">.</span>
            </p>
            <p className="mt-3 text-xs text-paper/50">
              Software development · Graphic design · Digital marketing
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 text-xs uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:gap-8">
            <a className="transition-colors hover:text-acid" href="mailto:eliseeweb@gmail.com">
              Email me
            </a>
            <a
              className="inline-flex items-center gap-1 transition-colors hover:text-acid"
              href="https://wa.me/27747067226"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp <ArrowUpRight size={13} />
            </a>
            <a
              className="inline-flex items-center gap-1 transition-colors hover:text-acid"
              href="https://www.linkedin.com/in/elisee-ngandu-79b4a9419/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={13} />
            </a>
            <span className="text-paper/35">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
