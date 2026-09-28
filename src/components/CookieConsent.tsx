"use client";

import { useLayoutEffect, useRef } from "react";

const STORAGE_KEY = "cookie-consent";

function rememberedChoice() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

function lockPage(locked: boolean) {
  document.querySelectorAll<HTMLElement>("[data-consent-lock]").forEach((el) => {
    if (locked) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  });
}

export function CookieConsent() {
  const rejectRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (rememberedChoice()) {
      document.documentElement.dataset.consent = "set";
      lockPage(false);
      return;
    }

    lockPage(true);
    rejectRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (document.documentElement.dataset.consent === "set") return;
      if (event.key === "Escape") {
        event.preventDefault();
        return;
      }
      if (event.key !== "Tab") return;
      const gate = document.querySelector(".cookie-gate");
      if (!gate) return;
      const items = [...gate.querySelectorAll<HTMLButtonElement>("button")];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!gate.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, []);

  function choose(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* The choice still applies for this view if storage is blocked. */
    }
    document.documentElement.dataset.consent = "set";
    lockPage(false);
    document.querySelector<HTMLElement>("header a")?.focus();
  }

  return (
    <div className="cookie-gate" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className="cookie-card">
        <h2 id="cookie-title">Cookies</h2>
        <p>This site stores one preference so it remembers your choice. Nothing else is tracked.</p>
        <div className="cookie-actions">
          <button
            ref={rejectRef}
            type="button"
            className="rounded-full px-4 py-2 text-sm font-medium text-ink ring-1 ring-black/10"
            onClick={() => choose("rejected")}
          >
            Reject
          </button>
          <button
            type="button"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white"
            onClick={() => choose("accepted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
