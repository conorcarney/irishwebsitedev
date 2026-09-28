import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "How AhBeGrand started, the name, and the Next.js, React, and MongoDB build behind it.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-40 md:py-28">
      <PageHeader eyebrow="The work" title="About">
        My names Conor, and I've been building websites since 2017, initally for my own small business.
      </PageHeader>
      <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
        <p> Through these years, I've built sites for events, SME's, start ups, and even large commercial ecommerce sites that handle thousands of users and millions in revenue.
          I use a mix of different tech for different websites adapting to each customers individual needs.
        </p>
        <p>
          <Link href="/showcases" className="text-pine underline-offset-4 hover:underline">
            See the other sites
          </Link>
        </p>
      </div>
    </div>
  );
}
