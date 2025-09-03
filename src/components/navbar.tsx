import { useEffect, useRef, useState } from "react";
import { TabKey } from "../App";

export interface NavbarProps {
  tab: TabKey;
  setTab: React.Dispatch<React.SetStateAction<TabKey>>;
  left: number;
  sliderWidth: number;
}

const Navbar: React.FC<NavbarProps> = ({ tab, setTab }) => {
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
      className="text-white mx-auto top-0 z-[10000] backdrop-saturate-180 w-full pt-2"
      style={{
        marginTop: "30px",
        marginBottom: "30px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <div className="glass-card glass-glow ambient-light max-w-[500px] w-full m-auto rounded-full text-1.8rem p-[8px] shadow-2xl">
        <div className="flex rounded-full p-2 justify-between items-center text-white mx-auto relative">

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
              <span className="text-lg font-medium hover:text-blue-200 transition-all duration-300 drop-shadow-sm">
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
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(173, 216, 230, 0.15) 50%, rgba(255, 255, 255, 0.1) 100%)',
              backdropFilter: 'blur(20px) saturate(1.8) brightness(1.25)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.8) brightness(1.25)',
              border: '1px solid rgba(173, 216, 230, 0.35)',
              borderTop: '2px solid rgba(255, 255, 255, 0.5)',
              boxShadow: `
                0 8px 20px rgba(30, 58, 138, 0.2),
                0 4px 12px rgba(59, 130, 246, 0.15),
                0 2px 8px rgba(29, 78, 216, 0.1),
                0 0 0 1px rgba(173, 216, 230, 0.15) inset,
                0 1px 0 rgba(255, 255, 255, 0.35) inset
              `
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
