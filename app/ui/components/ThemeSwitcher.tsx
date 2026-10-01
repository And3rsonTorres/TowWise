/**
 * ThemeSwitcher component allows the user to switch between light and dark themes.
 *
 * It uses the useTheme hook from next-themes to get the current theme and set a new theme.
 *
 * There is also useState and useEffect used to handle mounting of the component.
 *
 */

"use client";

import { Button, Tooltip } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeIcon from "@/public/assets/ThemeIcon";

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
        className="text-amber-400 bg-white/10 hover:bg-white/20 border border-white/20 shadow-sm"
        onClick={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
      >
        <ThemeIcon dark={theme === "dark"} />
      </Button>
    </Tooltip>
  );
}
