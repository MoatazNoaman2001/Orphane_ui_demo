import type { Metadata } from "next";
import AccessPage from "../../../components/AccessPage";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Restricted Access · Orphan Data Observatory",
};

export default function AccessDesign() {
  return (
    <>
      <AccessPage />
      <BackToGallery />
    </>
  );
}
