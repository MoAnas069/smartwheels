import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Smart Wheels Skating Academy | Train Like a Champion",
  description: "Professional skating training for all ages with certified coaches and world-class facilities. Join Smart Wheels Skating Academy and skate like a pro.",
  keywords: "skating academy, roller skating, skating training, skating classes, professional skating, skating coach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
