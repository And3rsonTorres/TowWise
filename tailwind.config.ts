import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        LightModeBG: "url('/assets/aiden-frazier-EKNVOn3zWUw-unsplash.jpg')",
        DarkModeBG: "url('/assets/eugene-chystiakov-Iib52-P3NO4-unsplash.jpg')",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
