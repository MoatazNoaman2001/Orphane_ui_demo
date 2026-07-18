import type { Metadata } from "next";
import PortalPage from "../../../components/PortalPage";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Partner Portal · Orphan Data Observatory",
  description:
    "The partner portal: my submissions, aggregated data entry with live identity-card validation, attachments, preview before sending, status tracking, and the organization profile.",
};

export default function PortalDesign() {
  return (
    <>
      <PortalPage />
      <BackToGallery />
    </>
  );
}
