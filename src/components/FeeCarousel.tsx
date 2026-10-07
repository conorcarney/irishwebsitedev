"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import type { FeeRow } from "@/data/fees";

const tones = ["#3aa0e0", "#12a88a", "#2d4a6f", "#f0a202"];
const tonesDeep = ["#2b86c4", "#0e8c72", "#243c59", "#d48c00"];
const visible = 3;

export function FeeCarousel({ fees }: { fees: FeeRow[] }) {
  const count = fees.length;
  const slides = [0, 1, 2].flatMap((copy) =>
    fees.map((row, index) => ({
      row,
      index,
      copy,
      position: copy * count + index,
      key: `${copy}-${index}`,
    })),
  );
  const [index, setIndex] = useState(count);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (index >= count && index < count * 2) return;
    const delay = animate ? 480 : 0;
    const id = window.setTimeout(() => {
      setAnimate(false);
      setIndex((current) => {
        let next = current;
        while (next >= count * 2) next -= count;
        while (next < count) next += count;
        return next;
      });
    }, delay);
    return () => window.clearTimeout(id);
  }, [animate, count, index]);

  useEffect(() => {
    if (animate) return;
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setAnimate(true));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [animate]);

  function step(direction: -1 | 1) {
    setAnimate(true);
    setIndex((current) => current + direction);
  }

  const shift = `calc(${-index} * ((100% - 32px) / ${visible} + 16px))`;

  return (
    <div className="fee-carousel" aria-roledescription="carousel" aria-label="Starting fees">
      <button type="button" className="fee-nav" aria-label="Previous fees" onClick={() => step(-1)}>
        <span aria-hidden="true">‹</span>
      </button>
      <div className="fee-viewport">
        <div
          className={animate ? "fee-track is-animated" : "fee-track"}
          style={{ transform: `translate3d(${shift}, 0, 0)` }}
        >
          {slides.map((slide) => {
            const onScreen = slide.position >= index && slide.position < index + visible;
            const points = slide.row.includes
              .split(",")
              .map((part) => part.trim())
              .filter(Boolean);
            return (
              <article
                key={slide.key}
                className="fee-card"
                aria-hidden={!onScreen}
                inert={!onScreen}
                style={
                  {
                    "--tone": tones[slide.index % tones.length],
                    "--tone-deep": tonesDeep[slide.index % tonesDeep.length],
                  } as CSSProperties
                }
              >
                <div className="fee-card-top">
                  <p className="fee-card-price">{slide.row.fee}</p>
                  <p className="fee-card-name">{slide.row.service}</p>
                </div>
                <div className="fee-card-body">
                  <ul>
                    {points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                    <li>Time: {slide.row.time}</li>
                  </ul>
                  <Link
                    href="/contact"
                    className="fee-card-action"
                    aria-label={`Start a project: ${slide.row.service}`}
                    tabIndex={onScreen ? undefined : -1}
                  >
                    Start a project
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <button type="button" className="fee-nav" aria-label="Next fees" onClick={() => step(1)}>
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
