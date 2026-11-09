export type Category = "markets" | "policy" | "finance" | "opinion";

export const CATEGORIES: { slug: Category; label: string }[] = [
  { slug: "markets", label: "Markets" },
  { slug: "policy", label: "Policy" },
  { slug: "finance", label: "Finance" },
  { slug: "opinion", label: "Opinion" },
];

export interface Article {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  readMinutes: number;
  author: string;
  affiliation: string;
  publishedAt: string;
  body: string[];
  featured?: boolean;
}

export const ARTICLES: Article[] = [
  {
    slug: "algorithmic-commons-central-banks-ai",
    title: "The Algorithmic Commons: Why Central Banks are Betting on Artificial Intelligence",
    dek: "As global markets shift toward high-frequency automated governance, student researchers explore the implications of non-human monetary policy on emerging economies.",
    category: "policy",
    readMinutes: 12,
    author: "Julian Thorne",
    affiliation: "London School of Economics",
    publishedAt: "2026-05-28",
    featured: true,
    body: [
      "For most of the twentieth century, the operating room of monetary policy was a wood-panelled chamber filled with measured voices. Today, that room is increasingly filled with the soft hum of GPUs.",
      "The Bank of England's quiet 2025 procurement of three forecasting models from a private vendor passed largely without comment in the financial press. Inside the building, it was treated as routine. Outside, it should not have been.",
      "What is genuinely new is not the use of statistics — central banks have run econometric models for decades — but the delegation of inference itself. When a model's outputs cannot be fully audited by the humans nominally responsible for the decision, the chain of democratic accountability frays.",
      "Emerging economies feel this most acutely. A model trained predominantly on OECD data carries the prior assumptions of OECD economies; deployed in Lagos or Jakarta, those priors become invisible policy choices.",
      "The honest answer is that we do not yet know what a fully algorithmic monetary regime would look like in steady state. The honest follow-up is that we are running the experiment anyway.",
    ],
  },
  {
    slug: "copper-is-the-new-oil",
    title: "Copper is the New Oil: The Geopolitics of the Grid",
    dek: "Examining the supply chain bottlenecks at the heart of the post-carbon energy transition.",
    category: "markets",
    readMinutes: 7,
    author: "Sarah Chen",
    affiliation: "Stanford University",
    publishedAt: "2026-05-22",
    body: [
      "The barrel has dominated geopolitical writing for half a century. The next half-century belongs to the cathode.",
      "Chile and the Democratic Republic of the Congo together control resources whose strategic weight rivals that of the Persian Gulf in 1973. The diplomatic vocabulary has not yet caught up.",
      "Refining, not extraction, is where the genuine chokepoint sits — and refining capacity is overwhelmingly concentrated in a single jurisdiction.",
    ],
  },
  {
    slug: "de-dollarization-myths-swift",
    title: "De-dollarization Myths and the Reality of SWIFT",
    dek: "How student fintech researchers view the future of global settlements behind the headlines.",
    category: "finance",
    readMinutes: 9,
    author: "Marcus Vane",
    affiliation: "University of Chicago",
    publishedAt: "2026-05-19",
    body: [
      "Every quarter brings a fresh round of headlines announcing the imminent demise of the dollar. Every quarter, the underlying plumbing tells a different story.",
      "SWIFT is not the dollar system, and the dollar system is not SWIFT — but the two are entangled in ways that make rapid substitution far harder than the rhetoric implies.",
      "Bilateral local-currency settlement is real, growing, and still a rounding error in aggregate cross-border flow.",
    ],
  },
  {
    slug: "gig-economy-graduation-present",
    title: "The Gig Economy is a Failed Graduation Present",
    dek: "A critique of precarious labour in the modern university town.",
    category: "opinion",
    readMinutes: 6,
    author: "Elena Rossi",
    affiliation: "Bocconi University",
    publishedAt: "2026-05-15",
    body: [
      "The promise made to the graduating class of 2014 — flexibility, autonomy, the dignity of being one's own boss — has aged poorly.",
      "What looked like a labour-market revolution was, in retrospect, a venture-subsidised arbitrage on employment law.",
      "The students I teach today are not naive about this. They are, however, running out of alternatives.",
    ],
  },
  {
    slug: "vc-retreat-from-campus-lab",
    title: "Venture Capital's Retreat from the Campus Lab",
    dek: "Why early-stage funding for university spin-outs has hit a ten-year low.",
    category: "markets",
    readMinutes: 8,
    author: "Amara Okafor",
    affiliation: "University of Oxford",
    publishedAt: "2026-05-10",
    body: [
      "Deep-tech timelines and venture-fund timelines have always been in tension. In 2026 that tension has become open conflict.",
      "Translational research grants are filling part of the gap. Sovereign wealth is filling another. Neither moves at the speed of a graduate student with a working prototype.",
    ],
  },
  {
    slug: "deflationary-pressure-aging-demographics",
    title: "The Deflationary Pressure of Aging Demographics",
    dek: "Looking toward 2050: what the Japanese model teaches the rest of the world.",
    category: "policy",
    readMinutes: 11,
    author: "Marco Rossi",
    affiliation: "Bocconi University",
    publishedAt: "2026-05-04",
    body: [
      "Japan is no longer an outlier; it is a preview.",
      "The conventional inflationary framework assumes a roughly stable dependency ratio. That assumption is now wrong almost everywhere outside sub-Saharan Africa.",
    ],
  },
  {
    slug: "onshoring-the-microchip",
    title: "On-shoring the Microchip: A Student's View",
    dek: "Industrial policy and the return of the factory to the American Midwest.",
    category: "finance",
    readMinutes: 9,
    author: "Elena Vance",
    affiliation: "University of Chicago",
    publishedAt: "2026-04-28",
    body: [
      "The CHIPS Act is, depending on whom you ask, either the most successful piece of US industrial policy in a generation or an extraordinarily expensive subsidy programme.",
      "From the perspective of an Ohio undergraduate watching cranes go up over what used to be a soybean field, both readings can be true at once.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getFeatured(): Article {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
}

export function getByCategory(category: Category): Article[] {
  return ARTICLES.filter((a) => a.category === category);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
