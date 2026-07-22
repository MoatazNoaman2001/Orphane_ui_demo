import type { Metadata } from "next";
import { PrivacyPage } from "../../../components/InstitutionalPages";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Privacy Policy · Orphan Data Observatory",
};

export default function PrivacyPageRoute() {
  return (
    <>
      <PrivacyPage />
      <BackToGallery />
    </>
  );
}
