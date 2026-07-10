import type { Metadata } from "next";
import AccessMapLanding from "../../components/AccessMapLanding";
import BackToGallery from "../../components/BackToGallery";

export const metadata: Metadata = {
  title: "The Access Map — Orphan Data Observatory",
  description:
    "Design direction 02: light, institutional, map-first landing page in the visual language of humanitarian data platforms.",
};

export default function AccessMapDesign() {
  return (
    <>
      <AccessMapLanding />
      <BackToGallery />
    </>
  );
}
