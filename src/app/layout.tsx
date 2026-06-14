import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "CityPulse X - The Autonomous API City",
  description: "A fully interactive, cinematic web demo where APIs decide what happens next",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark-bg text-white overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
