import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { IMAGE_CONSTANTS } from "@/utils/constants/constants";

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
    <html lang="en" className="smooth-scroll dark">
      <body
        className={`${OutfitFont.className} ${OvoFont.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        <DarkModeProvider>
            {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
