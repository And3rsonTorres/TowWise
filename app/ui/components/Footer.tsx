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
      <p className="text-tiny text-slate-300 max-w-4xl text-center px-4 mt-2">
        Disclaimer: TowWise is an independent informational resource and is not affiliated with, authorized, or endorsed by any vehicle manufacturer or brand. We do not own or claim any rights to any automotive trademarks or logos. Always verify all towing limits and safety specifications against your vehicle&apos;s official owner&apos;s manual.
      </p>
    </div>
  );
}
