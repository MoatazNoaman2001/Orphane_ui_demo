import type { Metadata } from "next";
import ReportsPage from "../../../components/ReportsPage";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Reports · Orphan Data Observatory",
};

export default function ReportsPageDesign() {
  return (
    <>
      <ReportsPage />
      <BackToGallery />
    </>
  );
}
