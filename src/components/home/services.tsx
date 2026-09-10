"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/components/i18n/locale-provider";
import { prefersReducedMotion } from "@/lib/motion";

export function Services() {
  const { dict } = useI18n();
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.location.hash !== "#servicos") return;
    rootRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const pieces = root.querySelectorAll("[data-sv-piece]");

      if (prefersReducedMotion()) {
        gsap.set(pieces, { clearProps: "all" });
        return;
      }

      gsap.set(pieces, { autoAlpha: 0, y: 22 });

      gsap.to(pieces, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="servicos"
      className="relative scroll-mt-8 overflow-hidden border-b border-line bg-paper text-ink"
    >
      <div aria-hidden className="atmosphere-wash" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <p
          data-sv-piece
          className="text-[0.65rem] tracking-[0.28em] text-ember/75 uppercase"
        >
          {dict.services.eyebrow}
        </p>
        <h2
          data-sv-piece
          className="mt-6 max-w-3xl font-serif text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.95]"
        >
          {dict.services.headline}
        </h2>

        <ol className="mt-14 grid list-none gap-x-16 gap-y-12 md:mt-16 md:grid-cols-2">
          {dict.services.items.map((item, index) => (
            <li
              key={item.title}
              data-sv-piece
              className="ember-rule border-t border-line pt-6"
            >
              <span
                aria-hidden
                className="editorial-num text-[0.65rem] tracking-[0.22em] text-ember/80"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-2xl leading-snug md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-ink/70">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
