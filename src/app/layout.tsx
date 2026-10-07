import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cookies } from "next/headers";
import Script from "next/script";
import { CookieConsent } from "@/components/CookieConsent";
import { PageTransition } from "@/components/PageTransition";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const choice = (await cookies()).get("cookie-consent")?.value;
  const remembered = choice === "accepted" || choice === "rejected";

  return (
    <html
      lang="en"
      className={`${geist.variable} h-full antialiased`}
      data-consent={remembered ? "set" : undefined}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-paper">
        <Script id="cookie-consent-boot" strategy="beforeInteractive">
          {`try{var v=localStorage.getItem("cookie-consent");if(v==="accepted"||v==="rejected")document.documentElement.dataset.consent="set";}catch(e){}`}
        </Script>
        <a
          data-consent-lock
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-40 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" data-consent-lock className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
