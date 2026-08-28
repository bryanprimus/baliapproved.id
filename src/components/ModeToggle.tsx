import { MoonIcon, SunIcon } from "lucide-react";
import * as React from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Theme = "light" | "dark";

const itemClassName =
  "size-8 rounded-full px-0 text-muted-foreground transition-[color,background-color,box-shadow] hover:bg-background/60 hover:text-foreground aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-sm";

export function ModeToggle() {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    // The inline script in Layout.astro has already resolved the theme, so read
    // it back off the element rather than re-deriving it here.
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  function handleThemeChange(value: string[]) {
    const next = value[0];
    // A toggle group lets you press the active item to clear it; a theme is
    // never "unset", so ignore that.
    if (next !== "light" && next !== "dark") {
      return;
    }

    localStorage.setItem("theme", next);
    setTheme(next);
    document.documentElement.classList[next === "dark" ? "add" : "remove"](
      "dark",
    );
  }

  return (
    <ToggleGroup
      value={[theme]}
      onValueChange={handleThemeChange}
      size="sm"
      spacing={1}
      aria-label="Theme"
      className="rounded-full bg-muted p-1"
    >
      <ToggleGroupItem
        value="light"
        aria-label="Light"
        className={itemClassName}
      >
        <SunIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark" className={itemClassName}>
        <MoonIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
