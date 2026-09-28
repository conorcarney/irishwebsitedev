import type { Metadata } from "next";
import Link from "next/link";
import { LogoFlight } from "@/components/LogoFlight";
import { SiteTags } from "@/components/SiteTags";
import { fees } from "@/data/fees";
import { showcases } from "@/data/showcases";
import { site } from "@/data/site";

const flightLogos: Record<string, string> = {
  ahbegrand: "/logos/ahbegrand.png",
  "trip-farm": "/logos/tripfarm.png",
  "shore-farm-pony-therapy": "/logos/shorefarm.jpg",
};

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function HomePage() {
  return (
    <div>
      <LogoFlight />
      <section className="relative min-h-[100dvh] overflow-hidden text-white">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-scene absolute inset-0" />
          <div className="hero-grid absolute inset-0" />
          <div className="hero-hill hero-hill-back" />
          <div className="hero-hill" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-center px-5 pb-28 pt-28">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              {site.title}
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[1.02] tracking-tight text-balance md:text-7xl">
              We build bespoke websites for Small Businesses in Ireland and Abroad.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
             In an online world of AI, make your business stand out. All our websites are bespoke, customised to what you want. 
             Check out the Showcases page for examples.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/showcases"
                className="motion-fade rounded-full bg-ink px-5 py-3 text-sm font-medium text-white"
              >
                Open our showcase websites
              </Link>
              <Link
                href="/contact"
                className="motion-fade rounded-full bg-white px-5 py-3 text-sm font-medium text-ink"
              >
              Get in touch to start building your dream website
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="live-sites" className="mx-auto w-full max-w-6xl px-5 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Work</p>
            <h2 className="mt-3 text-4xl font-medium tracking-tight">Live sites</h2>
          </div>
          <Link href="/showcases" className="motion-link text-sm text-ink underline-offset-4 hover:underline">
            Preview them in the page
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {showcases.map((item, index) => {
            const host = new URL(item.url).host.replace(/^www\./, "");
            const logo = flightLogos[item.id];
            return (
              <li key={item.id}>
                <Link
                  href={`/showcases?site=${item.id}`}
                  className="motion-card block h-full rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(17,17,19,0.06)] ring-1 ring-black/5"
                >
                  <p className="text-xs text-muted">{String(index + 1).padStart(2, "0")}</p>
                  <div className="mt-3 flex items-center gap-3">
                    {logo ? (
                      <span data-logo-anchor={item.id} className="logo-slot" aria-hidden="true">
                        <img src={logo} alt="" className="logo-slot-still" />
                      </span>
                    ) : null}
                    <p className="text-2xl font-medium tracking-tight">{item.name}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">{host}</p>
                  <SiteTags tags={item.tags} />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:py-28">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Prices</p>
            <h2 className="mt-3 text-4xl font-medium tracking-tight">Starting fees</h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              A short menu of typical jobs. The full table, including what each fee covers, is on
              the fees page.
            </p>
            <Link
              href="/fees"
              className="motion-fade mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-white"
            >
              Read the fee table
            </Link>
          </div>
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Starting fees</caption>
            <tbody>
              {fees.map((row) => (
                <tr key={row.service} className="border-b border-line">
                  <th scope="row" className="py-4 pr-4 font-medium text-ink">
                    {row.service}
                  </th>
                  <td className="py-4 text-right text-muted">{row.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
