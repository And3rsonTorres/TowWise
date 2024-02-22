/**
 * ThemeSwitcher component allows the user to switch between light and dark themes.
 *
 * It uses the useTheme hook from next-themes to get the current theme and set a new theme.
 *
 * There is also useState and useEffect used to handle mounting of the component.
 *
 */

"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tooltip content="switch themes" color="foreground">
      <Button
        isIconOnly
        size="sm"
        aria-label="themes"
        radius="full"
        className="bg-gradient-to-r from-white via-grey to-black via-20%"
        onClick={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
      >
        <Image
          src="/assets/theme.gif"
          width={32}
          height={32}
          alt="themes"
          priority={true}
        />
      </Button>
    </Tooltip>
  );
}
