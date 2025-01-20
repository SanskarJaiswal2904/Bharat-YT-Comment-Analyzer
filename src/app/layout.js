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
      <head>
        {/* Meta Tags */}
        <meta name="description" content="Web site created using create-react-app" />
        <meta name="description" content="Get the total length/duration of a YouTube playlist by passing its link as input. You get the time required to watch that playlist at different speeds." />

        {/* Favicon */}
        <link rel="icon" href="/YT-comment-analyzer.svg" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/logo192.png" />


        {/* Font Awesome Links */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CacheProvider value={emotionCache}>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
