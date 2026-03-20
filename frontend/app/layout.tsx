import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paraswift | Smart Income Protection",
  description: "Automated parametric insurance for gig economy workers.",
};

import ConditionalNavbar from "@/components/ConditionalNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-slate-50 text-slate-900 dark:bg-black dark:text-white transition-colors antialiased`}>
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
