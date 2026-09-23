import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const HOVER_TARGETS = "h1, h2, h3, h4, h5, h6, p, li, a, button, img, [data-fluid-hover]";

export function FluidPointer() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 260, damping: 32, mass: 0.32 });
  const smoothY = useSpring(y, { stiffness: 260, damping: 32, mass: 0.32 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    setEnabled(true);
    let hovered: HTMLElement | null = null;
    let frame = 0;
    let pending: { x: number; y: number; target: EventTarget | null } | null = null;
    const positions = new Map<HTMLElement, { x: number; y: number; targetX: number; targetY: number }>();

    const settle = () => {
      if (hovered) {
        const position = positions.get(hovered);
        if (position) {
          position.targetX = 0;
          position.targetY = 0;
        }
        hovered = null;
      }
    };

    const update = () => {
      frame = 0;
      if (pending) {
        const { x: pointerX, y: pointerY, target } = pending;
        pending = null;
        x.set(pointerX);
        y.set(pointerY);

        const element =
          target instanceof Element ? target.closest<HTMLElement>(HOVER_TARGETS) : null;

        if (element !== hovered) {
          settle();
          hovered = element;
          setActive(Boolean(hovered));
        }

        if (hovered) {
          const bounds = hovered.getBoundingClientRect();
          if (bounds.width && bounds.height) {
            const strength = hovered.tagName === "IMG" ? 8 : 5;
            const position = positions.get(hovered) ?? {
              x: 0,
              y: 0,
              targetX: 0,
              targetY: 0,
            };
            position.targetX = ((pointerX - bounds.left) / bounds.width - 0.5) * strength;
            position.targetY = ((pointerY - bounds.top) / bounds.height - 0.5) * strength;
            positions.set(hovered, position);
            hovered.classList.add("fluid-pointer-target");
          }
        }
      }

      let moving = false;
      for (const [element, position] of positions) {
        position.x += (position.targetX - position.x) * 0.2;
        position.y += (position.targetY - position.y) * 0.2;
        const remaining =
          Math.abs(position.targetX - position.x) + Math.abs(position.targetY - position.y);

        if (element !== hovered && remaining < 0.05) {
          element.style.removeProperty("translate");
          element.classList.remove("fluid-pointer-target");
          positions.delete(element);
        } else {
          element.style.translate = `${position.x.toFixed(2)}px ${position.y.toFixed(2)}px`;
          if (remaining >= 0.05) moving = true;
        }
      }

      if (moving || pending) frame = requestAnimationFrame(update);
    };

    const move = (event: PointerEvent) => {
      pending = { x: event.clientX, y: event.clientY, target: event.target };
      if (!frame) frame = requestAnimationFrame(update);
    };

    const leave = () => {
      pending = null;
      cancelAnimationFrame(frame);
      frame = 0;
      settle();
      x.set(-100);
      y.set(-100);
      setActive(false);
      if (positions.size) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(frame);
      for (const element of positions.keys()) {
        element.style.removeProperty("translate");
        element.classList.remove("fluid-pointer-target");
      }
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      animate={{ width: active ? 48 : 20, height: active ? 48 : 20 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      style={{ left: smoothX, top: smoothY }}
      className="creative-cursor"
    />
  );
}
