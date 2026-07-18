import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Orphan Data Observatory — Every number has a source",
  description:
    "The Orphans Care Federation's bilingual platform for aggregated, non-personal orphan data — reviewed, classified, and approved before publication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var p=new URLSearchParams(location.search);var q=p.get("theme");var t=q||localStorage.getItem("odo-theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t==="light"?"light":"dark";var l=p.get("lang")||localStorage.getItem("odo-lang");if(l==="ar"){document.documentElement.lang="ar";document.documentElement.dir="rtl"}}catch(e){document.documentElement.dataset.theme="dark"}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
