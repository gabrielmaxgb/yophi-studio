export type CaseStudyTone = "deep" | "paper" | "signal";

export type CaseStudyMeta = {
  slug: string;
  client: string;
  tone: CaseStudyTone;
  image?: string;
  url?: string;
};

export const caseStudyBase = [
  {
    slug: "maxdecoyer",
    client: "maxdecoyer",
    tone: "deep",
    url: "https://www.maxdecoyer.com",
  },
  {
    slug: "atelier-luz",
    client: "Atelier Luz",
    tone: "paper",
    image: "/work/atelier-luz.jpg",
  },
  {
    slug: "orbit-systems",
    client: "Orbit Systems",
    tone: "signal",
    image: "/work/orbit-systems.jpg",
  },
] as const satisfies readonly CaseStudyMeta[];

export type CaseStudySlug = (typeof caseStudyBase)[number]["slug"];

export const processKeys = [
  "SEE",
  "DEFINE",
  "SHAPE",
  "BUILD",
  "EVOLVE",
] as const;

export type ProcessKey = (typeof processKeys)[number];
