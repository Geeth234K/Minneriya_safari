import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif-luxury",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Minneriya Safari | Wild Sri Lankan Adventures",
    template: "%s | Minneriya Safari",
  },
  description:
    "Experience the wild beauty of Minneriya with authentic jeep safaris, village tours, local cuisine, and comfortable accommodation in the heart of Sri Lanka.",
  keywords: [
    "Minneriya Safari",
    "Sri Lanka Safari",
    "Minneriya National Park",
    "Wildlife Safari",
    "Village Tour",
    "Sri Lanka Tourism",
    "Elephant Safari",
    "Minneriya Accommodation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Minneriya Safari",
    title: "Minneriya Safari | Wild Sri Lankan Adventures",
    description:
      "Experience the wild beauty of Minneriya with authentic jeep safaris, village tours, local cuisine, and comfortable accommodation.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${cormorant.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-inter), var(--font-body)",
        }}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
