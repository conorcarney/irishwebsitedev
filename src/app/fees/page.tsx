import type { Metadata } from "next";
import Link from "next/link";
import { FeeCarousel } from "@/components/FeeCarousel";
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
      <FeeCarousel fees={fees} />
      <p className="mt-4 text-sm text-muted">{feesNote}</p>
      <p className="mt-8">
        <Link href="/contact" className="text-sm text-pine underline-offset-4 hover:underline">
          Ask about a project
        </Link>
      </p>
    </div>
  );
}
