import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { Origin } from "@/components/home/origin";
import { Philosophy } from "@/components/home/philosophy";
import { Process } from "@/components/home/process";
import { SelectedWork } from "@/components/home/selected-work";
import { Services } from "@/components/home/services";
import { Worlds } from "@/components/home/worlds";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Worlds />
      <SelectedWork />
      <Services />
      <Process />
      <Origin />
      <FinalCta />
    </>
  );
}
