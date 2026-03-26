"use client";

import { useEffect, useState, useCallback } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    if (!visible) setVisible(true);
  }, [visible]);

  const onMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const onMouseEnter = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.style.cursor = "none";

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [onMouseMove, onMouseLeave, onMouseEnter]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function checkHover() {
      const interactiveEls = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]'
      );

      const handler = () => setHovering(true);
      const leaveHandler = () => setHovering(false);

      for (const el of interactiveEls) {
        el.addEventListener("mouseenter", handler);
        el.addEventListener("mouseleave", leaveHandler);
      }

      return () => {
        for (const el of interactiveEls) {
          el.removeEventListener("mouseenter", handler);
          el.removeEventListener("mouseleave", leaveHandler);
        }
      };
    }

    // Run initially + observe DOM changes for dynamic content
    let cleanup = checkHover();
    const observer = new MutationObserver(() => {
      cleanup?.();
      cleanup = checkHover();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanup?.();
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const size = hovering ? 40 : 28;
  const dotSize = hovering ? 6 : 4;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <div
        style={{
          position: "absolute",
          left: pos.x - size / 2,
          top: pos.y - size / 2,
          width: size,
          height: size,
          borderRadius: "50%",
          border: "1.5px solid var(--color-ink)",
          opacity: visible ? 1 : 0,
          transition: "width 0.25s cubic-bezier(0.22, 1, 0.36, 1), height 0.25s cubic-bezier(0.22, 1, 0.36, 1), left 0.08s linear, top 0.08s linear, opacity 0.2s ease",
          willChange: "left, top, width, height",
        }}
      />
      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          left: pos.x - dotSize / 2,
          top: pos.y - dotSize / 2,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: "var(--color-ink)",
          opacity: visible ? 1 : 0,
          transition: "width 0.25s cubic-bezier(0.22, 1, 0.36, 1), height 0.25s cubic-bezier(0.22, 1, 0.36, 1), left 0.08s linear, top 0.08s linear, opacity 0.2s ease",
          willChange: "left, top, width, height",
        }}
      />
    </div>
  );
}
