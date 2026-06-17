import { motion } from "framer-motion";
import { Nav } from "./Nav";
import type { ReactNode } from "react";

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
    <div className={`${dark ? "dark " : ""}relative min-h-screen bg-background text-foreground`}>
      <Nav />

      {/* Ambient neon background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 [background:var(--gradient-radial)]" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full blur-[140px] opacity-30 [background:radial-gradient(circle,var(--primary),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[520px] translate-x-1/4 translate-y-1/4 rounded-full blur-[150px] opacity-20 [background:radial-gradient(circle,var(--primary-glow),transparent_70%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-semibold"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-5xl md:text-7xl font-bold tracking-tight mb-4 ${dark ? "neon-text" : ""}`}
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="origin-left h-px w-28 neon-line mb-12"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mr Ngandu Software Developer & Designer.</p>
          <p className="text-xs">+27 74 706 7226 · eliseeweb@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
