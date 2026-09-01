export type CaseStudyTone = "deep" | "paper" | "signal";

export type CaseStudyMeta = {
  slug: string;
  client: string;
  tone: CaseStudyTone;
  image: string;
  url?: string;
  cover?: "portrait" | "wide";
};

export const caseStudyBase = [
  {
    slug: "maxdecoyer",
    client: "maxdecoyer",
    tone: "deep",
    image: "/work/maxdecoyer-cover.jpg",
    url: "https://www.maxdecoyer.com",
  },
  {
    slug: "dra-ana-cardenas",
    client: "Ana Cárdenas",
    tone: "deep",
    image: "/work/dra-ana-cardenas-og.jpg",
    url: "https://www.draanacardenas.com",
    cover: "wide",
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
    cover: "wide",
  },
  {
    slug: "casa-vera",
    client: "Casa Vera",
    tone: "paper",
    image: "/work/casa-vera.jpg",
  },
  {
    slug: "norte-vinhos",
    client: "Norte",
    tone: "deep",
    image: "/work/norte-vinhos.jpg",
    cover: "wide",
  },
  {
    slug: "lima-advocacia",
    client: "Lima",
    tone: "signal",
    image: "/work/lima-advocacia.jpg",
  },
  {
    slug: "horizonte-cafe",
    client: "Horizonte",
    tone: "paper",
    image: "/work/horizonte-cafe.jpg",
    cover: "wide",
  },
  {
    slug: "estudio-rio",
    client: "Estúdio Rio",
    tone: "deep",
    image: "/work/estudio-rio.jpg",
  },
  {
    slug: "marina-costa",
    client: "Marina Costa",
    tone: "paper",
    image: "/work/marina-costa.jpg",
    cover: "wide",
  },
] as const satisfies readonly CaseStudyMeta[];

export type CaseStudySlug = (typeof caseStudyBase)[number]["slug"];

export function isCaseStudySlug(slug: string): slug is CaseStudySlug {
  return caseStudyBase.some((study) => study.slug === slug);
}

export function getCaseStudy(slug: CaseStudySlug): CaseStudyMeta {
  return caseStudyBase.find((study) => study.slug === slug)!;
}

export const processKeys = [
  "SEE",
  "DEFINE",
  "SHAPE",
  "BUILD",
  "EVOLVE",
] as const;

export type ProcessKey = (typeof processKeys)[number];
