import { NetworkData } from "../../types/customer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSignal, faRocket, faBolt, faSatelliteDish } from '@fortawesome/free-solid-svg-icons';
import { faWifi, } from "@fortawesome/free-solid-svg-icons";
import { CARD_THEMES } from "../../styles/theme";

interface NetworkCardProps {
  data: NetworkData;
}

// Define consistent color schemes
const NETWORK_COLORS = {
  "5G": {
    text: "text-emerald-300",
    bg: "bg-emerald-500/20 border-emerald-500/40",
    icon: "text-emerald-400"
  },
  "4G": {
    text: "text-blue-300",
    bg: "bg-blue-500/20 border-blue-500/40",
    icon: "text-blue-400"
  },
  "3G": {
    text: "text-orange-300",
    bg: "bg-orange-500/20 border-orange-500/40",
    icon: "text-orange-400"
  },
  default: {
    text: "text-gray-300",
    bg: "bg-gray-500/20 border-gray-500/40",
    icon: "text-gray-400"
  }
};

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
  const networkColor = NETWORK_COLORS[data.networkType as keyof typeof NETWORK_COLORS] || NETWORK_COLORS.default;

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 text-white rounded-3xl glass-card-emerald shadow-2xl">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse shadow-lg"></span>
            网络制式
          </h3>
          <div className="flex items-center bg-emerald-500/20 text-emerald-200 px-3 py-1.5 rounded-full text-xs border border-emerald-400/30 shadow-sm backdrop-blur-sm">
            <FontAwesomeIcon icon={faClock} className="mr-1.5 text-emerald-300" />
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
          <div className="flex justify-between items-center py-3 border-b border-emerald-400/20">
            <span className="text-sm font-semibold text-emerald-200">
              网络制式
            </span>
            <span className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${networkColor.bg} ${networkColor.text}`}>
              {data.networkType}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-emerald-400/20">
            <span className="text-sm font-semibold text-emerald-200">信号强度</span>
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
                <span className="text-emerald-100">{data.signalStrength}/5 · {getStatusText(data.signalStrength)}</span>
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-emerald-400/20">
            <span className="text-sm font-semibold text-emerald-200">技术制式</span>
            <span className="text-sm font-bold text-emerald-100 drop-shadow-sm bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/40">
              <FontAwesomeIcon 
                icon={data.networkType === "5G" ? faRocket : data.networkType === "4G" ? faBolt : faSatelliteDish} 
                className={`mr-2 ${networkColor.icon}`} 
              />
              {data.networkType === "5G" ? "NSA/SA" : data.networkType === "4G" ? "LTE" : "UMTS"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
