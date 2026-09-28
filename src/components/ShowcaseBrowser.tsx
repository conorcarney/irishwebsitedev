"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteTags } from "@/components/SiteTags";
import { showcases } from "@/data/showcases";

export function ShowcaseBrowser({ initialId }: { initialId?: string }) {
  const router = useRouter();
  const starting =
    showcases.find((site) => site.id === initialId)?.id ?? showcases[0].id;
  const [activeId, setActiveId] = useState(starting);
  const [loaded, setLoaded] = useState(false);
  const active = showcases.find((site) => site.id === activeId) ?? showcases[0];

  function select(id: string) {
    if (id === activeId) return;
    setActiveId(id);
    setLoaded(false);
    router.replace(`/showcases?site=${id}`, { scroll: false });
  }

  return (
    <div className="mt-8">
      <div role="tablist" aria-label="Sites" className="flex flex-wrap gap-2">
        {showcases.map((site) => {
          const selected = site.id === active.id;
          return (
            <button
              key={site.id}
              type="button"
              role="tab"
              id={`tab-${site.id}`}
              aria-selected={selected}
              aria-controls="showcase-panel"
              onClick={() => select(site.id)}
              className={
                selected
                  ? "motion-tab rounded-full bg-ink px-4 py-2 text-sm text-white"
                  : "motion-tab rounded-full bg-card px-4 py-2 text-sm text-ink hover:bg-[#efefef] hover:opacity-70"
              }
            >
              {site.name}
            </button>
          );
        })}
      </div>
      <SiteTags tags={active.tags} />

      <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(17,17,19,0.08)] ring-1 ring-black/5">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#e7c7b4]" />
            <span className="size-2.5 rounded-full bg-[#ead7a6]" />
            <span className="size-2.5 rounded-full bg-[#c9d7c4]" />
          </span>
          <a
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 truncate text-sm text-ink underline-offset-4 hover:underline"
          >
            {active.url}
          </a>
        </div>
        <div
          role="tabpanel"
          id="showcase-panel"
          aria-labelledby={`tab-${active.id}`}
          className="relative h-[min(78dvh,860px)] min-h-[520px] bg-white"
        >
          {active.embeds === false ? (
            <div className="flex h-full flex-col items-start justify-center gap-4 bg-paper px-8">
              <p className="max-w-md text-ink">
                {active.name} does not allow other websites to show it inside a frame.
              </p>
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-fade rounded-full bg-ink px-5 py-3 text-sm font-medium text-white"
              >
                Open {active.name}
              </a>
            </div>
          ) : (
            <>
              {loaded ? null : (
                <div
                  className="absolute inset-0 z-10 flex items-center justify-center bg-paper"
                  role="status"
                  aria-live="polite"
                >
                  <span className="showcase-spinner" aria-hidden="true" />
                  <span className="sr-only">Loading {active.name}</span>
                </div>
              )}
              <iframe
                key={active.url}
                src={active.url}
                title={active.name}
                className="h-full w-full bg-white"
                onLoad={() => setLoaded(true)}
                sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              />
            </>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">
        {active.embeds === false
          ? "Use the button in the frame to open this site in a new tab."
          : "Scroll and click inside the frame. Use the address above to open the same site in a new tab."}
      </p>
    </div>
  );
}
