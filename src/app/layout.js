import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BJJ Scoreboard",
  description: "BJJ Scoreboard that keeps track of time, scores, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-M2RMLCPG" />
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-9NDCTP5TXW" />
    </html>
  );
}
