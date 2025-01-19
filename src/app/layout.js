"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeContextProvider } from "../context/ThemeContext"; // Import the provider
import "./globals.css";

const emotionCache = createCache({ key: "css", prepend: true });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CacheProvider value={emotionCache}>
          <ThemeContextProvider>{children}</ThemeContextProvider> {/* Wrap the app */}
        </CacheProvider>
      </body>
    </html>
  );
}
