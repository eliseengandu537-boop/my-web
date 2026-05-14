import { motion } from "framer-motion";
import { Nav } from "./Nav";
import type { ReactNode } from "react";

export function Page({ title, eyebrow, children }: { title: string; eyebrow?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40 pointer-events-none" />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-4"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-12"
        >
          {title}
        </motion.h1>
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
          <p>© {new Date().getFullYear()} dev.cube — Crafted in three dimensions.</p>
          <p className="font-mono text-xs">{"// built with react · three.js · ❤"}</p>
        </div>
      </footer>
    </div>
  );
}
