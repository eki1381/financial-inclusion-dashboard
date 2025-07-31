import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Inklusi Keuangan, Industri, dan Pertumbuhan Ekonomi",
  description: "Analisis Spasial Indonesia 2019–2024 - Dashboard interaktif untuk memahami hubungan antara inklusi keuangan, sektor industri, dan pertumbuhan ekonomi di Indonesia",
  keywords: ["inklusi keuangan", "pertumbuhan ekonomi", "industri", "Indonesia", "analisis spasial", "GWR"],
  authors: [{ name: "Tim Peneliti Inklusi Keuangan Indonesia" }],
  openGraph: {
    title: "Dashboard Inklusi Keuangan Indonesia",
    description: "Analisis Spasial Indonesia 2019–2024",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
