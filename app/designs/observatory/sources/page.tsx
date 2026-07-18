import type { Metadata } from "next";
import SourcesPage from "../../../components/SourcesPage";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Sources Library · Orphan Data Observatory",
};

export default function SourcesPageDesign() {
  return (
    <>
      <SourcesPage />
      <BackToGallery />
    </>
  );
}
