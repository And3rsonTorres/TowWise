import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        LightModeBG: "url('/assets/aiden-frazier-EKNVOn3zWUw-unsplash.jpg')",
        DarkModeBG: "url('/assets/eugene-chystiakov-Iib52-P3NO4-unsplash.jpg')",
      },
    },
    colors: {
      chocolate_cosmos: "#52001F",
      gray: "#dddddd",
      white: "#ffffff",
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
