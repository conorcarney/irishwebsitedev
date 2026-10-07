"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (typeof document.startViewTransition !== "function") return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const current = window.location.pathname + window.location.search;
      const next = url.pathname + url.search;
      if (next === current) return;

      event.preventDefault();
      event.stopPropagation();

      const destination = next + url.hash;
      const go = async () => {
        const main = document.getElementById("content");
        let changed = false;
        const observer =
          main &&
          new MutationObserver(() => {
            changed = true;
          });
        observer?.observe(main as HTMLElement, { childList: true, subtree: true });
        try {
          router.push(destination);
          const started = performance.now();
          while (!changed && performance.now() - started < 1200) {
            await new Promise((resolve) => setTimeout(resolve, 16));
          }
        } finally {
          observer?.disconnect();
        }
      };

      let started = false;
      const navigate = async () => {
        started = true;
        await go();
      };

      try {
        const transition = document.startViewTransition(navigate);
        transition.ready.catch(() => {
          if (!started) router.push(destination);
        });
        transition.finished.catch(() => {});
      } catch {
        if (!started) router.push(destination);
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return <div className="page-root">{children}</div>;
}
