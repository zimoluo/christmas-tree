import type { Metadata } from "next";
import {
  Roboto_Mono,
  Lora,
  Open_Sans,
  Pacifico,
  Inter,
} from "next/font/google";
import "@/styles/globals.css";
import MainPageFrame from "@/components/mainPage/MainPageFrame";
import MainPageElements from "@/components/mainPage/MainPageElements";
import { SettingsProvider } from "@/components/contexts/SettingsContext";
import MainPageEffect from "@/components/mainPage/MainPageEffect";
import { ToastProvider } from "@/components/contexts/ToastContext";
import { defaultRobotsMeta } from "@/lib/siteMetadata";
import ThemeDataInitializer from "@/components/theme/util/ThemeDataInitializer";
import ThemeApplier from "@/components/theme/util/ThemeApplier";
import { PopUpProvider } from "@/components/contexts/PopUpContext";

const mainFont = Inter({
  subsets: ["latin"],
  variable: "--font-main",
  display: "swap",
});

const fancyFont = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
  weight: "400",
});

const tabularFont = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const monoFont = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const serifFont = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const environment = "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://tree.zimoluo.me/"),
  robots: defaultRobotsMeta,
  authors: [{ name: "Zimo", url: "https://github.com/zimoluo" }],
  icons: [
    {
      rel: "icon",
      url: `/website-favicon/${environment}/favicon-32x32.png`,
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      url: `/website-favicon/${environment}/favicon-96x96.png`,
      type: "image/png",
      sizes: "96x96",
    },
    {
      rel: "icon",
      url: `/website-favicon/${environment}/favicon-192x192.png`,
      type: "image/png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: `/website-favicon/${environment}/favicon-1024x1024.png`,
      type: "image/png",
      sizes: "1024x1024",
    },
    {
      rel: "apple-touch-icon",
      url: `/website-favicon/${environment}/favicon-180x180.png`,
      type: "image/png",
      sizes: "180x180",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.variable} ${monoFont.variable} ${tabularFont.variable} ${serifFont.variable} ${fancyFont.variable} font-main overflow-hidden fixed top-0 antialiased`}
      >
        <SettingsProvider>
          <ToastProvider>
            <PopUpProvider>
              <ThemeDataInitializer>
                <ThemeApplier>
                  <MainPageFrame>
                    <MainPageEffect>
                      <MainPageElements>{children}</MainPageElements>
                    </MainPageEffect>
                  </MainPageFrame>
                </ThemeApplier>
              </ThemeDataInitializer>
            </PopUpProvider>
          </ToastProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
