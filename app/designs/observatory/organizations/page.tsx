import type { Metadata } from "next";
import OrganizationsPage from "../../../components/OrganizationsPage";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Organizations Directory · Orphan Data Observatory",
};

export default function OrganizationsPageDesign() {
  return (
    <>
      <OrganizationsPage />
      <BackToGallery />
    </>
  );
}
