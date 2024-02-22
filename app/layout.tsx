import type { Metadata } from "next";
import {Providers} from "./providers";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TowWise",
  description: "TowWise is a web application designed to provide users with information about the maximum towing capacity of their vehicles. The app serves as a valuable tool for individuals who need to tow trailers, caravans, or other loads, offering insights into the safe and optimal towing limits based on their specific vehicle models.",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};
