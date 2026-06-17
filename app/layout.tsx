import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BottomNav from "@/components/navigation/BottomNav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FitApp Personal",
  description: "Rutinas, nutrición y progreso — Animal-Based · Testmaxxing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-bg-primary font-sans text-text-primary antialiased">
        <div className="mx-auto min-h-screen max-w-[430px] pb-24">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
