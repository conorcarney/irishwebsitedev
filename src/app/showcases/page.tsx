import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ShowcaseBrowser } from "@/components/ShowcaseBrowser";

export const metadata: Metadata = {
  title: "Showcases",
  description: "Live websites loaded in the page so you can scroll and click through them.",
};

export default async function ShowcasesPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const { site } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 pt-40 md:py-28">
      <PageHeader eyebrow="Work" title="Showcases">
     Below are sample websites that I've built. 
      </PageHeader>
      <ShowcaseBrowser initialId={site} />
    </div>
  );
}
