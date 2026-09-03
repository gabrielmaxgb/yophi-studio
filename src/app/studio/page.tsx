import type { Metadata } from "next";
import { StudioView } from "@/components/studio/studio-view";
import { dict } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: dict.studio.metaTitle,
  description: dict.studio.metaDescription,
  alternates: {
    canonical: "/studio",
  },
};

export default function StudioPage() {
  return <StudioView />;
}
