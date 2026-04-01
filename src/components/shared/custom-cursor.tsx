"use client";

import { useEffect, useRef, useCallback } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  const raf = useRef<number>(0);
  const mx = useRef(-100);
  const my = useRef(-100);

  const animate = useCallback(() => {
    const el = cursorRef.current;
    if (el) {
      el.style.transform = `translate3d(${mx.current}px, ${my.current}px, 0) translate(-50%, -50%)`;
      el.style.opacity = visible.current ? "1" : "0";
    }
    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function onMove(e: MouseEvent) {
      mx.current = e.clientX;
      my.current = e.clientY;
      visible.current = true;
    }
    function onLeave() { visible.current = false; }
    function onEnter() { visible.current = true; }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [animate]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--color-ink)",
          opacity: 0,
          willChange: "transform",
        }}
      />
    </div>
  );
}
