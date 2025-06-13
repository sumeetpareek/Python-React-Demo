import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || "Stocks Dashboard",
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "Interactive dashboard for visualizing daily returns of MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA)",
  keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS?.split(",") || [
    "stocks",
    "dashboard",
    "MAG7",
    "finance",
    "charts",
    "returns",
  ],
  authors: [{ name: "MAG7 Dashboard" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
