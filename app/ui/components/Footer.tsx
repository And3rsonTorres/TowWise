/**
 * Renders the footer component for the application.
 * The footer includes a copyright notice and links to the background image sources.
 */
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full flex  flex-col justify-center items-center bg-[#52001F] text-white font-medium py-3">
      <p> © 2024-{new Date().getFullYear()} · Anderson Torres</p>
      <p className="text-tiny">
        Background from unplash by{" "}
        <Link
          className="underline"
          href={
            "https://unsplash.com/photos/aerial-photography-of-road-and-mountain-EKNVOn3zWUw"
          }
          target="_blank"
        >
          Aiden Frazier
        </Link>{" "}
        &{" "}
        <Link
          className="underline"
          href={
            "https://unsplash.com/photos/white-suv-on-road-near-mountain-during-daytime-Iib52-P3NO4"
          }
          target="_blank"
        >
          Eugene Chystiakov
        </Link>
      </p>
    </div>
  );
}
