import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { dict } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: dict.contact.metaTitle,
  description: dict.contact.metaDescription,
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-paper text-ink">
      <div aria-hidden className="atmosphere-wash" />
      <ContactForm />
    </div>
  );
}
