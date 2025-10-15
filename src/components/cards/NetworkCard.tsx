import { NetworkData } from "../../types/customer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSignal, faRocket, faBolt, faSatelliteDish } from '@fortawesome/free-solid-svg-icons';
import { CARD_THEMES } from "../../styles/theme";
import { buildThemeChipClasses } from "../../utils/themeStyles";
import { ThemedCard } from "./common";

interface NetworkCardProps {
  data: NetworkData;
}

const SIGNAL_STRENGTH_COLORS = [
  { bg: "bg-red-500/40 text-red-50 border-red-500/60", icon: "text-red-300" },       // 0: No Signal
  { bg: "bg-red-400/40 text-red-100 border-red-400/60", icon: "text-red-300" },     // 1: Very Poor
  { bg: "bg-yellow-400/40 text-yellow-100 border-yellow-400/60", icon: "text-yellow-300" }, // 2: Poor/Fair
  { bg: "bg-blue-400/40 text-blue-100 border-blue-400/60", icon: "text-blue-300" }, // 3: Good
  { bg: "bg-blue-300/40 text-blue-50 border-blue-300/60", icon: "text-blue-200" },  // 4: Very Good
  { bg: "bg-emerald-400/40 text-emerald-50 border-emerald-400/60", icon: "text-emerald-200" } // 5: Excellent
];

const getStatusText = (strength: number) => {
  if (strength === 5) return "极佳";
  if (strength === 4) return "很好";
  if (strength === 3) return "良好";
  if (strength === 2) return "一般";
  if (strength === 1) return "较差";
  return "无信号";
};

export const NetworkCard = ({ data }: NetworkCardProps) => {
  const cardTheme = CARD_THEMES.Network;
  const networkChipSurface = buildThemeChipClasses(cardTheme.base, {
    text: "100",
    border: "400/40",
  });
  const networkChipIconClass = `text-${cardTheme.base}-300`;
  const headerChipClasses = buildThemeChipClasses(cardTheme.base);

  return (
    <ThemedCard theme={cardTheme} className="justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span
              className={`w-3 h-3 bg-${cardTheme.pulse}-400 rounded-full mr-3 animate-pulse shadow-lg`}
            ></span>
            网络制式
          </h3>
          <div
            className={`flex items-center ${headerChipClasses} px-3 py-1.5 rounded-full text-xs shadow-sm backdrop-blur-sm`}
          >
            <FontAwesomeIcon
              icon={faClock}
              className={`mr-1.5 text-${cardTheme.base}-300`}
            />
            <span className="font-mono mr-2">
              {new Date(
                new Date(data.timestamp).getTime() - 15 * 60000,
              ).toLocaleTimeString("zh-CN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="text-xs font-medium">· 实时</span>
          </div>
        </div>

        <div className="space-y-4">
          <div
            className={`flex justify-between items-center py-3 border-b border-${cardTheme.base}-400/20`}
          >
            <span className={`text-sm font-semibold text-${cardTheme.base}-200`}>
              网络制式
            </span>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full shadow-sm ${networkChipSurface}`}
            >
              {data.networkType}
            </span>
          </div>
          
          <div
            className={`flex justify-between items-center py-3 border-b border-${cardTheme.base}-400/20`}
          >
            <span className={`text-sm font-semibold text-${cardTheme.base}-200`}>信号强度</span>
            {data.signalStrength !== undefined && (
              <span 
                className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${
                  SIGNAL_STRENGTH_COLORS[Math.min(data.signalStrength, 5)]?.bg || SIGNAL_STRENGTH_COLORS[0].bg
                }`}
              >
                <FontAwesomeIcon 
                  icon={faSignal} 
                  className={`mr-2 ${
                    SIGNAL_STRENGTH_COLORS[Math.min(data.signalStrength, 5)]?.icon || SIGNAL_STRENGTH_COLORS[0].icon
                  }`} 
                />
                <span className={`text-${cardTheme.base}-100`}>{data.signalStrength}/5 · {getStatusText(data.signalStrength)}</span>
              </span>
            )}
          </div>
          
          <div
            className={`flex justify-between items-center py-3 border-b border-${cardTheme.base}-400/20`}
          >
            <span className={`text-sm font-semibold text-${cardTheme.base}-200`}>技术制式</span>
            <span
              className={`text-sm font-bold drop-shadow-sm px-3 py-1 rounded-full ${networkChipSurface}`}
            >
              <FontAwesomeIcon
                icon={data.networkType === "5G" ? faRocket : data.networkType === "4G" ? faBolt : faSatelliteDish}
                className={`mr-2 ${networkChipIconClass}`}
              />
              {data.networkType === "5G" ? "NSA/SA" : data.networkType === "4G" ? "LTE" : "UMTS"}
            </span>
          </div>
        </div>
      </div>
    </ThemedCard>
  );
};
