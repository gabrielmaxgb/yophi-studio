import type { Metadata } from "next";
import { WorkView } from "@/components/work/work-view";
import { dict } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: dict.work.metaTitle,
  description: dict.work.metaDescription,
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return <WorkView />;
}
