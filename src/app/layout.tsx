import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/styles/content-utilities.css";
import SiteProviders from "@/components/site/SiteProviders";

/**
 * Fonts are loaded at runtime via <link> (same approach as the original
 * site) instead of next/font/google — this keeps builds fully offline-safe
 * (no network dependency at build time).
 */

export const metadata: Metadata = {
  title: "Bidemy | Best FREE eLearning Platform",
  description:
    "Boost your scores with Bidemy, Nigeria's best 100% FREE eLearning platform. Easy navigation, mock exams, and study tools for WAEC and JAMB success.",
  keywords: [
    "eLearning Nigeria",
    "free WAEC prep",
    "JAMB mock test",
    "online learning",
    "bidemy",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#3B82F6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        />
      </head>
      <body>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
