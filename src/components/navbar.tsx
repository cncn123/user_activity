import React, { useEffect, useRef, useState } from "react";
import { TabKey } from "../App";
import { Theme } from "../hooks/useTheme";

export interface NavbarProps {
  tab: TabKey;
  setTab: React.Dispatch<React.SetStateAction<TabKey>>;
  left: number;
  sliderWidth: number;
  theme: Theme;
  onThemeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  tab,
  setTab,
  theme,
  onThemeToggle,
}) => {
  const tabs = [
    { key: TabKey.kejikegan, label: "可知可感" },
    { key: TabKey.kexiang, label: "可享" },
    { key: TabKey.keji, label: "可及" },
  ];

  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<HTMLDivElement[]>([]); // Array of refs for each tab

  const updateSliderStyle = () => {
    const activeTabIndex = tabs.findIndex((t) => t.key === tab);
    const activeTabRef = tabRefs.current[activeTabIndex];

    if (activeTabRef) {
      const { offsetLeft, offsetWidth } = activeTabRef;
      setSliderStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateSliderStyle); // Add resize listener
    return () => {
      window.removeEventListener("resize", updateSliderStyle); // Clean up listener
    };
  }, [tab]); // Recalculate whenever the active tab changes

  useEffect(() => {
    updateSliderStyle(); // Initial slider style update
  }, [tab]);

  return (
    <div
      className={`mx-auto top-0 z-[10000] backdrop-saturate-180 w-full pt-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}
      style={{
        marginTop: "30px",
        marginBottom: "30px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <div className="glass-card glass-glow ambient-light max-w-[500px] w-full m-auto rounded-full text-1.8rem p-[8px] shadow-2xl">
        <div className={`flex rounded-full p-2 justify-between items-center mx-auto relative ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          {/* Theme Toggle Button */}
          <button
            onClick={onThemeToggle}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center glass-inner hover:scale-110 transition-all duration-300 z-40"
            style={{
              background:
                theme === "light"
                  ? "rgba(255, 255, 255, 0.8)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(173, 216, 230, 0.08) 100%)",
              backdropFilter: theme === "light" ? "blur(12px) saturate(1.1)" : "blur(15px) saturate(1.5)",
              WebkitBackdropFilter: theme === "light" ? "blur(12px) saturate(1.1)" : "blur(15px) saturate(1.5)",
              border: theme === "light" ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(173, 216, 230, 0.2)",
            }}
            title={theme === "light" ? "切换到暗黑模式" : "切换到明亮模式"}
          >
            {theme === "light" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="m12 1 0 2" />
                <path d="m12 21 0 2" />
                <path d="m4.22 4.22 1.42 1.42" />
                <path d="m18.36 18.36 1.42 1.42" />
                <path d="m1 12 2 0" />
                <path d="m21 12 2 0" />
                <path d="m4.22 19.78 1.42-1.42" />
                <path d="m18.36 5.64 1.42-1.42" />
              </svg>
            )}
          </button>

          {/* Tabs */}
          {tabs.map(({ key, label }, index) => (
            <div
              key={key}
              ref={(el) => (tabRefs.current[index] = el!)}
              className={`flex items-center h-8 flex-1 cursor-pointer justify-center ${
                tab === key ? "text-white" : "text-white"
              }`}
              onClick={() => setTab(key)}
              style={{ zIndex: 30 }}
            >
              <span 
                className="text-lg font-medium hover:text-blue-200 transition-all duration-300 drop-shadow-sm"
                style={{
                  color: theme === "light" ? "#1f2937" : "white"
                }}
              >
                {label}
              </span>
            </div>
          ))}

          {/* Sliding highlight div */}
          <div
            className="absolute h-10 rounded-full z-20"
            style={{
              left: `${sliderStyle.left}px`,
              width: `${sliderStyle.width}px`,
              transition:
                "left 0.38s cubic-bezier(0.4, 0, 0.2, 1), width 0.38s",
              background:
                theme === "light"
                  ? "rgba(255, 255, 255, 0.9)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(173, 216, 230, 0.15) 50%, rgba(255, 255, 255, 0.1) 100%)",
              backdropFilter: theme === "light" ? "blur(16px) saturate(1.2)" : "blur(20px) saturate(1.8) brightness(1.25)",
              WebkitBackdropFilter: theme === "light" ? "blur(16px) saturate(1.2)" : "blur(20px) saturate(1.8) brightness(1.25)",
              border: theme === "light" ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(173, 216, 230, 0.35)",
              borderTop: theme === "light" ? "1px solid rgba(0, 0, 0, 0.05)" : "2px solid rgba(255, 255, 255, 0.5)",
              boxShadow: theme === "light"
                ? `0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)`
                : `0 8px 20px rgba(30, 58, 138, 0.2), 0 4px 12px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(29, 78, 216, 0.1), 0 0 0 1px rgba(173, 216, 230, 0.15) inset, 0 1px 0 rgba(255, 255, 255, 0.35) inset`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
