import type { Metadata } from "next";
import HumanitarianLanding from "../../components/HumanitarianLanding";
import BackToGallery from "../../components/BackToGallery";

export const metadata: Metadata = {
  title: "The Humanitarian — Orphan Data Observatory",
  description:
    "Design direction 03: warm, light, charity-sector language — the observatory presented through its services and results, in the visual tradition of UNICEF Data and humanitarian organizations.",
};

export default function HumanitarianDesign() {
  return (
    <>
      <HumanitarianLanding />
      <BackToGallery />
    </>
  );
}
