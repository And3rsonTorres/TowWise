import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TowWise · Vehicle Towing & Safety Advisor",
    short_name: "TowWise",
    description:
      "Instant offline towing capacity advisor, 80% safety rule, trailer compatibility, hitch drop calculator, and US VIN decoder.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#52001F",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
