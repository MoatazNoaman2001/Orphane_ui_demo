import type { Metadata } from "next";
import CountryPage from "../../../components/CountryPage";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Türkiye — Country Page · Orphan Data Observatory",
  description:
    "Sample unified country page: real TÜİK 2024 figures with source, year, and confidence grade on every number — and honest page states, including declared data gaps.",
};

export default function CountryDesign() {
  return (
    <>
      <CountryPage />
      <BackToGallery />
    </>
  );
}
