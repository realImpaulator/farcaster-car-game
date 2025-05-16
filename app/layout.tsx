import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Your frame metadata for Warpcast embed preview
const frameMetadata = {
  post_url: "https://farcaster-car-game.vercel.app/api/frame",
  image: "https://farcaster-car-game.vercel.app/icon.png",
  buttons: ["⬅️ Move Left", "➡️ Move Right"],
};

export const metadata: Metadata = {
  title: "Farcaster Car Game",
  description: "Steer a car to collect coins and dodge bombs. Classic arcade vibes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          property="fc:frame"
          content={encodeURIComponent(JSON.stringify(frameMetadata))}
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
