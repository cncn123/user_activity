import type { CSSProperties } from "react";

interface CardThemeConfig {
  base: string;
}

interface ThemeChipOptions {
  background?: string;
  text?: string;
  border?: string;
  includeBorder?: boolean;
}

export const buildCardThemeStyles = (cardTheme: CardThemeConfig): CSSProperties => ({
  "--theme-primary-rgb": `var(--${cardTheme.base}-primary-rgb)`,
  "--theme-secondary-rgb": `var(--${cardTheme.base}-secondary-rgb)`,
  "--theme-tertiary-rgb": `var(--${cardTheme.base}-tertiary-rgb)`,
});

export const buildThemeChipClasses = (
  base: string,
  {
    background = "500/20",
    text = "200",
    border = "400/30",
    includeBorder = true,
  }: ThemeChipOptions = {},
) => {
  const classes = [`bg-${base}-${background}`, `text-${base}-${text}`];

  if (includeBorder) {
    classes.push("border", `border-${base}-${border}`);
  }

  return classes.join(" ");
};
