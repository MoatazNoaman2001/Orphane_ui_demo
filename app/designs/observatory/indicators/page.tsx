import type { Metadata } from "next";
import IndicatorsPage from "../../../components/IndicatorsPage";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Indicators Dashboard · Orphan Data Observatory",
  description:
    "Compact indicators by country and data type — every figure with its source, year, and confidence grade, plus careful cross-country comparison.",
};

export default function IndicatorsDesign() {
  return (
    <>
      <IndicatorsPage />
      <BackToGallery />
    </>
  );
}
