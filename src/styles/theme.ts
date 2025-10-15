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
    base: THEME_COLORS.ORANGE,
    pulse: THEME_COLORS.ORANGE,
  },
  Location: {
    base: THEME_COLORS.VIOLET,
    pulse: THEME_COLORS.VIOLET,
  },
  Network: {
    base: THEME_COLORS.EMERALD,
    pulse: THEME_COLORS.EMERALD,
  },
  Resource: {
    base: THEME_COLORS.CYAN,
    pulse: THEME_COLORS.CYAN,
  },
  Summary: {
    base: THEME_COLORS.BLUE,
    pulse: THEME_COLORS.BLUE,
  },
} as const;