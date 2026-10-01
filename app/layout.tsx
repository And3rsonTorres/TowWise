import type { Metadata } from "next";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TowWise · Vehicle Towing Capacity & Safety Advisor",
  description:
    "TowWise provides accurate vehicle towing capacities, US VIN decoding via NHTSA, trailer category compatibility, and 80% rule safety calculations for confident towing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-LightModeBG dark:bg-DarkModeBG bg-cover bg-no-repeat bg-center bg-fixed text-slate-100 selection:bg-amber-500 selection:text-black flex flex-col justify-between relative`}
      >
        {/* Full-screen contrast scrim to ensure high text readability over background photography */}
        <div className="fixed inset-0 bg-slate-950/65 dark:bg-slate-950/75 pointer-events-none -z-10" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
