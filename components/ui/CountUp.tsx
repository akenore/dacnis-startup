"use client";

import { useEffect, useRef } from "react";

/**
 * The server HTML holds the final number, so crawlers and no-JS readers see "50+", not "0".
 * When the number starts below the fold, it counts up from 0 as it reaches the viewport. It is
 * never reset ahead of time, so jumping past it (anchor link, End key) leaves the real value.
 */
export default function CountUp({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || value < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.textContent = `0${suffix}`;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1400, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(eased * value)}${suffix}`;
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      // Fires just before the number scrolls into view, so the reset to 0 is never seen.
      { rootMargin: "0px 0px 15% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = `${value}${suffix}`;
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
