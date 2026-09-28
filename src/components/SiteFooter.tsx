import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer data-consent-lock className="mt-auto border-t border-line bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-muted">
        <p className="font-medium text-ink">{site.name}</p>
        <a className="motion-link hover:text-ink" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <Link href="/contact" className="motion-link hover:text-ink">
          Contact
        </Link>
      </div>
    </footer>
  );
}
