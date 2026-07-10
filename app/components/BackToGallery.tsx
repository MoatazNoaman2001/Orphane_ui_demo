import Link from "next/link";

/** Floating chip shown on every design page, linking back to the design gallery. */
export default function BackToGallery() {
  return (
    <Link
      href="/"
      className="fixed bottom-5 end-5 z-[70] flex items-center gap-2 rounded-full border border-[#1fc2f2]/40 bg-[#071228]/90 px-4 py-2 text-xs font-medium text-[#9fe8ff] shadow-[0_4px_24px_rgba(4,11,28,0.5)] backdrop-blur-md transition hover:border-[#1fc2f2] hover:text-white"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
      </svg>
      All designs · التصاميم
    </Link>
  );
}
