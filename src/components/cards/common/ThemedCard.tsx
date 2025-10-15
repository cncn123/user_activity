import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { buildCardThemeStyles } from "../../../utils/themeStyles";

interface ThemedCardProps {
  theme: {
    base: string;
    pulse: string;
  };
  className?: string;
  children: ReactNode;
}

export const ThemedCard = ({ theme, className, children }: ThemedCardProps) => (
  <div
    className={cn(
      "h-full w-full flex flex-col p-6 text-white rounded-3xl glass-card-themed shadow-2xl",
      className,
    )}
    style={buildCardThemeStyles(theme)}
  >
    {children}
  </div>
);
