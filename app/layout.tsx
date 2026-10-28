import type { Metadata } from "next";
import { Roboto, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Arabic UI face. Loaded next to the Latin sans so the [dir="rtl"] rule in
// globals.css can switch fonts per language without affecting Latin pages.
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "Madar — The Next-Generation Multi-Tenant School ERP Suite",
  description:
    "Unified administration, examinations, finance, payroll, and transport for modern educational institutions. Role-gated portals, GCC compliance, real-time sync.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${geistMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
