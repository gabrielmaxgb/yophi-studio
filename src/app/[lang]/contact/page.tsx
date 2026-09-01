import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { getDictionary } from "@/lib/dictionary";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const prefix = isLocale(lang) ? `/${lang}` : "/pt";

  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: {
      canonical: `${prefix}/contact`,
      languages: {
        "pt-BR": "/pt/contact",
        en: "/en/contact",
        "x-default": "/pt/contact",
      },
    },
  };
}

export default function ContactPage() {
  return (
    <div className="bg-paper text-ink">
      <ContactForm />
    </div>
  );
}
