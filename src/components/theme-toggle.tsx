"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo, useSyncExternalStore } from "react";

const themes = ["system", "light", "dark"] as const;
const emptySubscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    clientSnapshot,
    serverSnapshot,
  );

  const activeTheme = mounted ? theme ?? "system" : "system";
  const Icon = useMemo(() => {
    if (!mounted || activeTheme === "system") {
      return Monitor;
    }

    return resolvedTheme === "dark" ? Moon : Sun;
  }, [activeTheme, mounted, resolvedTheme]);

  const label =
    activeTheme === "system"
      ? "Auto"
      : activeTheme === "dark"
        ? "Dark"
        : "Light";

  function cycleTheme() {
    const currentIndex = themes.indexOf(activeTheme as (typeof themes)[number]);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch color theme. Current theme: ${label}`}
      onClick={cycleTheme}
      suppressHydrationWarning
    >
      <span className="theme-toggle__dot" aria-hidden="true" />
      <span>{label}</span>
      <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
    </button>
  );
}
