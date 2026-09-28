import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { fees, feesIntro, feesNote } from "@/data/fees";

export const metadata: Metadata = {
  title: "Fees",
  description: "Starting fees for brochure sites, extra pages, and updates.",
};

export default function FeesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-40 md:py-28">
      <PageHeader eyebrow="Prices" title="Fees">
        {feesIntro}
      </PageHeader>
      <div className="mt-12 overflow-x-auto rounded-3xl bg-white shadow-[0_10px_40px_rgba(17,17,19,0.06)] ring-1 ring-black/5">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">Starting fees for typical website work</caption>
          <thead className="bg-card text-ink">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Service
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                What you get
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Fee
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {fees.map((row) => (
              <tr key={row.service} className="border-t border-line align-top">
                <th scope="row" className="px-4 py-4 font-medium text-ink">
                  {row.service}
                </th>
                <td className="px-4 py-4 text-muted">{row.includes}</td>
                <td className="px-4 py-4 whitespace-nowrap text-ink">{row.fee}</td>
                <td className="px-4 py-4 whitespace-nowrap text-muted">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted">{feesNote}</p>
      <p className="mt-8">
        <Link href="/contact" className="text-sm text-pine underline-offset-4 hover:underline">
          Ask about a project
        </Link>
      </p>
    </div>
  );
}
