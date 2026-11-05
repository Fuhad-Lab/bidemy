import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import "@/styles/content-utilities.css";
import SiteProviders from "@/components/site/SiteProviders";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        />
      </head>
      <body className={`${jakarta.variable} ${inter.variable}`}>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
