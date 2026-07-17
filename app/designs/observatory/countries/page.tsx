import type { Metadata } from "next";
import CountriesPage from "../../../components/CountriesPage";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Countries & Map · Orphan Data Observatory",
  description:
    "Countries list with the interactive status map: published, in preparation, declared data gap, or internal — searchable and filterable.",
};

export default function CountriesDesign() {
  return (
    <>
      <CountriesPage />
      <BackToGallery />
    </>
  );
}
