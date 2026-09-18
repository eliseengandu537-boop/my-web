import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Expertise" },
  { to: "/experience", label: "Journey" },
] as const;

export function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="editorial-nav fixed inset-x-0 top-0 z-50"
      >
        <nav className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="group flex items-center gap-3" aria-label="Mr Ngandu — home">
            <span className="grid size-9 place-items-center border border-ink bg-ink text-xs font-black text-paper transition-transform duration-300 group-hover:-rotate-6">
              MN
            </span>
            <span className="text-sm font-extrabold uppercase tracking-[-0.04em]">
              Mr Ngandu<span className="text-flare">.</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((link) => {
              const active = pathname.startsWith(link.to);
              return (
                <li key={link.to}>
                  <Link to={link.to} className={`nav-link ${active ? "nav-link-active" : ""}`}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden items-center gap-2 border border-ink bg-ink px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-flare sm:inline-flex"
            >
              Let's talk <ArrowUpRight size={14} />
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="mobile-menu-button size-11 place-items-center border border-ink bg-paper text-ink"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-10 pt-28 text-paper lg:hidden"
          >
            <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.28em] text-paper/45">
              Navigation / 05
            </p>
            <div className="flex flex-1 flex-col">
              {[{ to: "/", label: "Home" }, ...links, { to: "/contact", label: "Contact" }].map(
                (link, index) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group flex items-center justify-between border-t border-paper/20 py-3"
                  >
                    <span className="font-display text-[clamp(3rem,15vw,5.5rem)] uppercase leading-none group-hover:text-acid">
                      {link.label}
                    </span>
                    <span className="text-xs text-paper/40">0{index + 1}</span>
                  </Link>
                ),
              )}
            </div>
            <div className="flex items-center justify-between border-t border-paper/20 pt-5 text-xs text-paper/55">
              <span>Johannesburg, ZA</span>
              <a href="mailto:eliseeweb@gmail.com">eliseeweb@gmail.com</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
