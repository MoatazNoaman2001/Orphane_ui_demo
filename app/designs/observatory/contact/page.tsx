import type { Metadata } from "next";
import { ContactPage } from "../../../components/InstitutionalPages";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Contact Us · Orphan Data Observatory",
};

export default function ContactPageRoute() {
  return (
    <>
      <ContactPage />
      <BackToGallery />
    </>
  );
}
