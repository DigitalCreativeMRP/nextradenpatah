import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ImageKitProvider } from "@/components/ImageKit";
import { ReactNode } from "react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Masjid Raden Patah",
  description: "Masjid Raden Patah Universitas Brawijaya",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <ImageKitProvider>
        <body
          className={`${poppins.variable} ${poppins.className} flex flex-col bg-[#EDEDED] antialiased`}
        >
          {modal}
          {children}
        </body>
      </ImageKitProvider>
    </html>
  );
}
