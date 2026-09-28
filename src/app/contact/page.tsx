import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Send a project note to ${site.email}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-40 md:py-28">
      <PageHeader eyebrow="Projects" title="Contact">
        Write a note about the site you need. The form sends it to {site.email}.
      </PageHeader>
      <ContactForm />
    </div>
  );
}
