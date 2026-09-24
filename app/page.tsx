"use client";
import SelectionSearch from "./ui/components/SelectionSearch";
import AnimatedText from "./ui/components/AnimateText";
import ContactForm from "./ui/components/ContactForm";

export default function Home() {
  return (
    <main className="mt-8 mb-12 flex-1">
      <AnimatedText
        textLines={["Welcome to", "TowWise", "Where Towing", "Gets SIMPLE"]}
      />
      <SelectionSearch />
      <ContactForm />
    </main>
  );
}
