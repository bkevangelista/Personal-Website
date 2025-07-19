import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {IMAGE_CONSTANTS} from "@/utils/constants/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "bkevangelista",
  description: "Personal website by Branden Evangelista",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <link
              rel="icon"
              href={IMAGE_CONSTANTS.MEMOJI_LOGO}
              type="image/png"
          />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
