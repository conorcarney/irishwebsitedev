export type Showcase = {
  id: string;
  name: string;
  /** Address loaded in the showcase frame. Use the final https address, after any www redirect. */
  url: string;
  /** Short labels shown under the site name. */
  tags: string[];
  /**
   * False when the host sends a frame policy that stops the browser
   * drawing the site inside the portfolio. Those entries open in a new tab.
   */
  embeds?: boolean;
};

export const showcases: Showcase[] = [
  {
    id: "ahbegrand",
    name: "AhBeGrand",
    url: "https://www.ahbegrand.com",
    tags: [
      "Data display",
      "Blog",
      "Contact",
      "User login",
      "Admin panel",
      "Database",
      "React",
      "Next.js",
      "AWS buckets",
      "MongoDB",
    ],
  },
  {
    id: "shore-farm-pony-therapy",
    name: "Shore Farm Pony Therapy",
    url: "https://www.shorefarmponytherapy.ie",
    tags: ["Content heavy", "Contact form", "React", "Next.js", "AWS"],
  },
  {
    id: "trip-farm",
    name: "Tripfarm",
    url: "https://www.trip-farm.com",
    tags: ["Ecommerce", "Payments", "External APIs", "React", "Next.js", "Stripe", "MongoDB"],
  },
  {
    id: "travel-to-turkmenistan",
    name: "Travel to Turkmenistan",
    url: "https://www.traveltoturkmenistan.co.uk",
    tags: ["Content heavy", "Contact form", "React", "Next.js", "AWS"],
  },
  {
    id: "lough-conn-dash",
    name: "Lough Conn Dash",
    url: "https://loughconndash.ie",
    tags: ["Content heavy", "Contact form", "React", "Next.js", "AWS"],
  },
  {
    id: "rathkeale-medical",
    name: "Rathkeale Medical",
    url: "https://www.rathkealemedical.ie",
    tags: ["Content", "GP practice", "Contact form", "Squarespace"],
  },
  {
    id: "ballingarry-medical",
    name: "Ballingarry Medical",
    url: "https://www.ballingarrymedical.ie",
    tags: ["Content", "GP practice", "Contact form", "Squarespace"],
  },
];
