import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Header, Footer} from "@/Home/components";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "TF Live",
    template: "%s | TF Live",
  },
  description: "Discover and book amazing travel experiences with live artists",
  keywords: ["travel", "artists", "packages", "concerts", "experiences"],
  authors: [{ name: "TF Live" }],
  creator: "TF Live",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tflive.com",
    title: "TF Live",
    description: "Discover and book amazing travel experiences with live artists",
    siteName: "TF Live",
  },
  twitter: {
    card: "summary_large_image",
    title: "TF Live",
    description: "Discover and book amazing travel experiences with live artists",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <header className="bg-transparent border-b-0">
        <Header />
      </header>
        {children}
      </body>
      <footer className="w-full bg-black">
          <Footer />
        </footer>
    </html>
  );
}
