/**
 * NavBar component renders a navigation bar.
 *
 * It returns a nav element with some contents:
 * - HomeIcon component
 * - ThemeSwitcher component rendered absolutely positioned to top right
 *
 */
import React from "react";
import HomeIcon from "@/app/HomeIcon";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function NavBar() {
  return (
    <nav className="bg-chocolate_cosmos p-2 flex justify-center group">
      <HomeIcon />
      <div className="absolute  top-6 right-4 group-hover:rotate-45 dark:group-hover:rotate-12">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
