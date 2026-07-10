import type { Metadata } from "next";
import Landing from "../../components/Landing";
import BackToGallery from "../../components/BackToGallery";

export const metadata: Metadata = {
  title: "The Observatory — Orphan Data Observatory",
  description:
    "Design direction 01: dark, data-forward landing page for the Orphans Care Federation's Orphan Data Observatory.",
};

export default function ObservatoryDesign() {
  return (
    <>
      <Landing />
      <BackToGallery />
    </>
  );
}
