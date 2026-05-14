import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="w-7 h-7 rounded-md bg-primary text-primary-foreground grid place-items-center text-sm">{"</>"}</span>
          <span className="tracking-tight">Mr Ngandu</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <a
          href="/resume.pdf"
          download
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-glow transition-colors"
        >
          <Download size={16} /> Resume
        </a>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95">
          <ul className="px-6 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm ${
                    pathname === l.to ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold"
              >
                <Download size={16} /> Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
