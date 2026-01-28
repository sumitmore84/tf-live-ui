import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/Home/components";
// 1. Import your AuthProvider (adjust the path if you chose /lib instead)
import { AuthProvider } from "@/context/AuthContext"; 

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
  // ... rest of your metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {/* 2. Wrap everything inside AuthProvider */}
        <AuthProvider>
          <header className="bg-transparent border-b-0">
            <Header />
          </header>
          
          <main>
            {children}
          </main>

          <footer className="w-full bg-black">
            <Footer />
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}