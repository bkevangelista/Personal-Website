import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import {IMAGE_CONSTANTS} from "@/utils/constants/constants";

const OutfitFont = Outfit({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
});

const OvoFont = Ovo({
    subsets: ["latin"],
    weight: ["400"]
});

export const metadata = {
  title: "bkevangelista",
  description: "Personal website by Branden Evangelista",
  icons: {
      icon: IMAGE_CONSTANTS.MEMOJI_LOGO,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${OutfitFont.className} ${OvoFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
