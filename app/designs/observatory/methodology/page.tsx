import type { Metadata } from "next";
import MethodologyPage from "../../../components/MethodologyPage";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Methodology · Orphan Data Observatory",
};

export default function MethodologyPageDesign() {
  return (
    <>
      <MethodologyPage />
      <BackToGallery />
    </>
  );
}
