"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/showcases", label: "Showcases" },
  { href: "/fees", label: "Fees" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    const onScroll = () => {
      const y = window.scrollY;
      root.dataset.hero = y > 12 ? "inset" : "full";
      root.dataset.shade = y > 100 ? "on" : "off";
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 text-ink">
      <div className="site-header-bar">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <Link href="/" className="nav-link text-[15px] font-semibold tracking-tight">
          {site.name}
        </Link>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <nav aria-label="Primary">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {links.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={
                        active
                          ? "nav-link font-medium text-ink"
                          : "nav-link text-ink/70 hover:text-ink"
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Link
            href="/contact"
            className="motion-fade rounded-full bg-ink px-4 py-2 text-sm font-medium text-white"
          >
            Start a project
          </Link>
        </div>
      </div>
      </div>
    </header>
  );
}
