
export type FeeRow = {
  service: string;
  includes: string;
  fee: string;
  time: string;
};

export const feesIntro =
  "Starting prices for websites. We include a free detailed consultation about your website needs and wants before sending out an offical quote. Prices vary depending on project complexity and services used.";

export const feesNote =
  "All fees are in euro and excluding VAT. Hosting, domain names, and photography are not included unless explicitly listed on the quote. Extra monthly charges may occur for services that rely on outside services eg databases.";

export const fees: FeeRow[] = [
  {
    service: "Basic Business/Event Information site",
    includes:
      "Up to five pages, mobile and desktop optimised, with your domain connected",
    fee: "€1199",
    time: "1 week",
  },
  {
    service: "Business/Event Information site with contact page",
    includes:
      "The site, plus a photo gallery, a contact page containing a map, and an enquiry form that emails you.",
    fee: "€1,800",
    time: "1-2 weeks",
  },
  {
    service: "Business/Event website with online payments",
    includes:
      "The above, with an online payment portal included.",
    fee: "€2000-2500",
    time: "1-2 weeks",
  },
  {
    service: "Business/Event website with payment portal, date/time booking system",
    includes:
      "The above, with an online payment portal, and google calendar integration included.",
    fee: "€2500-5000",
    time: "2 weeks+",
  },
  {
    service: "Business full ecommerce website",
    includes:
      "The above, with an online payment portal, including product listings, customer information, google analytics, payment methods.",
    fee: "€5000+",
    time: "1month+",
  },
  {
    service: "Extra page",
    includes: "One additional text based page on a site we already built, in the existing design.",
    fee: "€250",
    time: "Up to 1 week",
  },
  {
    service: "Updates",
    includes: "Text, photo, and small layout changes after the site is live.",
    fee: "€75 / hour",
    time: "As needed",
  },
];
