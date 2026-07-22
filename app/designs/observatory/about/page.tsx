import type { Metadata } from "next";
import { AboutPage } from "../../../components/InstitutionalPages";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "About the Observatory · Orphan Data Observatory",
};

export default function AboutPageRoute() {
  return (
    <>
      <AboutPage />
      <BackToGallery />
    </>
  );
}
