export const THEME_COLORS = {
  BLUE: "blue",
  EMERALD: "emerald",
  ORANGE: "orange",
  CYAN: "cyan",
  VIOLET: "violet",
} as const;

export const CARD_THEMES = {
  AIProfile: {
    base: THEME_COLORS.VIOLET,
    pulse: THEME_COLORS.VIOLET,
  },
  Billing: {
    base: "orange",
    pulse: "orange",
  },
  Location: {
    base: "violet",
    pulse: "violet",
  },
  Network: {
    base: "emerald",
    pulse: "emerald",
  },
  Resource: {
    base: "cyan",
    pulse: "cyan",
  },
  Summary: {
    base: THEME_COLORS.BLUE,
    pulse: THEME_COLORS.BLUE,
  },
} as const;