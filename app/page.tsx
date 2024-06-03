"use client";
import Footer from "./ui/components/Footer";
import SelectionSearch from "./ui/components/SelectionSearch";
import AnimatedText from "./ui/components/AnimateText";

export default function Home() {
  return (
    <>
      <main className="w-full min-h-screen bg-LightModeBG dark:bg-DarkModeBG bg-cover bg-no-repeat bg-center">
        <AnimatedText
          textLines={["Welcome to", "TowWise", "Where Towing", "Get SIMPLY"]}
        />
        <div className="flex w-fit sm:w-full  bg-foreground bg-opacity-25 hover:bg-opacity-55 p-4 mt-12 mx-auto">
          <SelectionSearch />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-widest text-center mt-12">
          Towing Tables are being updated
        </h1>
      </main>
      <Footer />
    </>
  );
}
