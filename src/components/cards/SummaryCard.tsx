import { LocationData } from "../../types/customer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGlobe, faHome } from '@fortawesome/free-solid-svg-icons';

interface SummaryCardProps {
  data: LocationData;
}

// Define consistent color schemes (violet-centric to match card theme)
const NETWORK_COLORS = {
  "5G": {
    text: "text-violet-100",
    bg: "bg-violet-500/20 border-violet-400/40",
    icon: "text-emerald-300"
  },
  "4G": {
    text: "text-violet-100",
    bg: "bg-violet-500/20 border-violet-400/40",
    icon: "text-cyan-300"
  },
  "3G": {
    text: "text-violet-100",
    bg: "bg-violet-500/20 border-violet-400/40",
    icon: "text-amber-300"
  },
  default: {
    text: "text-violet-100",
    bg: "bg-violet-500/20 border-violet-400/40",
    icon: "text-slate-300"
  }
};

// Define violet-themed roaming status colors for consistency with card theme
const ROAMING_STATUS_COLORS = {
  roaming: {
    bg: "bg-violet-500/30 text-violet-100 border-violet-400/50",
    icon: "text-violet-300"
  },
  local: {
    bg: "bg-violet-500/20 text-violet-100 border-violet-400/40",
    icon: "text-violet-200"
  }
};



export const SummaryCard = ({ data }: SummaryCardProps) => {
  const networkColor = NETWORK_COLORS[data.networkType as keyof typeof NETWORK_COLORS] || NETWORK_COLORS.default;
  const roamingColor = data.isRoaming ? ROAMING_STATUS_COLORS.roaming : ROAMING_STATUS_COLORS.local;

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 text-white rounded-3xl glass-card-violet shadow-2xl">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span className="w-3 h-3 bg-violet-400 rounded-full mr-3 animate-pulse shadow-lg"></span>
            客户轨迹
          </h3>
          <div className="flex items-center bg-violet-500/20 text-violet-200 px-3 py-1.5 rounded-full text-xs border border-violet-400/30 shadow-sm backdrop-blur-sm">
            <FontAwesomeIcon icon={faClock} className="mr-1.5 text-violet-300" />
            <span className="font-mono mr-2">
              {new Date(
                new Date(data.timestamp).getTime() - 45 * 60000,
              ).toLocaleTimeString("zh-CN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="text-xs font-medium">· 实时</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-violet-400/20">
            <span className="text-sm font-semibold text-violet-200">
              当前位置
            </span>
            <span className="text-sm font-bold text-violet-100 drop-shadow-sm bg-violet-500/30 px-3 py-1 rounded-full border border-violet-400/50">
              {data.location}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-violet-400/20">
            <span className="text-sm font-semibold text-violet-200">网络</span>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${networkColor.bg} ${networkColor.text}`}
            >
              {data.networkType}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-violet-400/20">
            <span className="text-sm font-semibold text-violet-200">状态</span>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${roamingColor.bg}`}
            >
              <FontAwesomeIcon icon={data.isRoaming ? faGlobe : faHome} className={`mr-2 ${roamingColor.icon}`} />
              {data.isRoaming ? "漫游" : "本地"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
