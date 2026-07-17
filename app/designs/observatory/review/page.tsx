import type { Metadata } from "next";
import ReviewPage from "../../../components/ReviewPage";
import BackToGallery from "../../../components/BackToGallery";

export const metadata: Metadata = {
  title: "Submission Review · Orphan Data Observatory",
  description:
    "The Union's internal review screen: the queue and the ten-stage review path — triage, methodological review, edit requests, confidence classification, approval, and the publish decision.",
};

export default function ReviewDesign() {
  return (
    <>
      <ReviewPage />
      <BackToGallery />
    </>
  );
}
