"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import NavBar from "./ui/components/NavBar";
import Up from "./ui/components/Up";
import Footer from "./ui/components/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <NavBar />
        <Up />
        {children}
        <Footer />
      </NextThemesProvider>
    </NextUIProvider>
  );
}
