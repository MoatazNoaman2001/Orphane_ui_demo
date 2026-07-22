import type { Metadata } from "next";
import { DataUsePage } from "../../../components/InstitutionalPages";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Data Use & Citation · Orphan Data Observatory",
};

export default function DataUsePageRoute() {
  return (
    <>
      <DataUsePage />
      <BackToGallery />
    </>
  );
}
