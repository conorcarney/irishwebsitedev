"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const logos = [
  {
    id: "ahbegrand",
    word: "AhBeGrand",
    x: 0.84,
    y: 0.36,
    endAt: 0.72,
    sw: 220,
    sh: 76,
    ew: 148,
    eh: 48,
  },
  {
    id: "trip-farm",
    src: "/logos/tripfarm.png",
    light: true,
    x: 0.9,
    y: 0.2,
    endAt: 0.84,
    sw: 132,
    sh: 132,
    ew: 56,
    eh: 56,
  },
  {
    id: "shore-farm-pony-therapy",
    src: "/logos/shorefarm.jpg",
    x: 0.86,
    y: 0.56,
    endAt: 0.96,
    sw: 132,
    sh: 132,
    ew: 56,
    eh: 56,
  },
] as const;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** Scroll-linked travel matching Playbook's drop keyframes: most of the move is done by 95%. */
function travelAmount(progress: number) {
  if (progress >= 1) return 1;
  const eased = Math.min(progress / 0.95, 1) * 0.94;
  const settle = progress > 0.95 ? ((progress - 0.95) / 0.05) * 0.06 : 0;
  return eased + settle;
}

export function LogoFlight() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.querySelector(".logo-flight");
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLElement>("[data-flight]")];
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const place = () => {
      frame = 0;
      const allow = !media.matches && window.innerWidth >= 768;
      document.documentElement.classList.toggle("logo-flight-on", allow);
      if (!allow) return;

      const section = document.getElementById("live-sites");
      const sectionTop = section?.getBoundingClientRect().top ?? window.innerHeight;
      const rangeStart = window.innerHeight * 1.05;
      const rangeEnd = window.innerHeight * 0.22;
      const progress = clamp((rangeStart - sectionTop) / (rangeStart - rangeEnd));

      for (const el of items) {
        const anchor = document.querySelector<HTMLElement>(
          `[data-logo-anchor="${el.dataset.flight}"]`,
        );
        if (!anchor) continue;
        const endAt = Number(el.dataset.end);
        const span = 0.62;
        const local = clamp((progress - (endAt - span)) / span);
        const travel = travelAmount(local);
        const dest = anchor.getBoundingClientRect();
        const startX = window.innerWidth * Number(el.dataset.x);
        const startY = window.innerHeight * Number(el.dataset.y);
        const destX = dest.left + dest.width / 2;
        const destY = dest.top + dest.height / 2;
        const x = startX + (destX - startX) * travel;
        const y = startY + (destY - startY) * travel;
        const width = Number(el.dataset.sw) + (Number(el.dataset.ew) - Number(el.dataset.sw)) * travel;
        const height = Number(el.dataset.sh) + (Number(el.dataset.eh) - Number(el.dataset.sh)) * travel;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.transform = `translate3d(${x - width / 2}px, ${y - height / 2}px, 0)`;
        const word = el.querySelector<HTMLElement>(".logo-word");
        if (word) word.style.fontSize = `${Math.max(14, height * 0.38)}px`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(place);
    };

    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    media.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", onScroll);
      document.documentElement.classList.remove("logo-flight-on");
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div className="logo-flight" aria-hidden="true">
      {logos.map((logo, index) => (
        <div
          key={logo.id}
          className={`logo-flight-item${"word" in logo ? " is-word" : ""}${"light" in logo ? " is-light" : ""}`}
          data-flight={logo.id}
          data-x={logo.x}
          data-y={logo.y}
          data-end={logo.endAt}
          data-sw={logo.sw}
          data-sh={logo.sh}
          data-ew={logo.ew}
          data-eh={logo.eh}
          style={{ animationDelay: `${[0.3, 0.8, 1.1][index]}s` }}
        >
          {"word" in logo ? (
            <span className="logo-word">{logo.word}</span>
          ) : (
            <img src={logo.src} alt="" />
          )}
        </div>
      ))}
    </div>,
    document.body,
  );
}
