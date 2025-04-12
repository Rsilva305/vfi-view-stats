import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Velio - YouTube Analytics",
  description: "A modern video content platform for discovering and tracking YouTube channels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#121212] text-white`}>
        {children}
      </body>
    </html>
  );
}
