import { LocationData } from "../../types/customer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGlobe, faHome } from '@fortawesome/free-solid-svg-icons';

interface SummaryCardProps {
  data: LocationData;
}

export const SummaryCard = ({ data }: SummaryCardProps) => {
  const getNetworkColor = (type: string) => {
    switch (type) {
      case "5G":
        return "text-emerald-300";
      case "4G":
        return "text-cyan-300";
      case "3G":
        return "text-amber-300";
      default:
        return "text-white/80";
    }
  };

  const getNetworkBgColor = (type: string) => {
    switch (type) {
      case "5G":
        return "bg-emerald-500/20 border-emerald-500/30";
      case "4G":
        return "bg-cyan-500/20 border-cyan-500/30";
      case "3G":
        return "bg-amber-500/20 border-amber-500/30";
      default:
        return "bg-slate-500/20 border-slate-500/30";
    }
  };


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
            <span className="text-sm font-bold text-white drop-shadow-sm bg-violet-500/10 px-3 py-1 rounded-full border border-violet-400/30">
              {data.location}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-violet-400/20">
            <span className="text-sm font-semibold text-violet-200">网络</span>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${getNetworkBgColor(data.networkType)} ${getNetworkColor(data.networkType)}`}
            >
              {data.networkType}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-violet-400/20">
            <span className="text-sm font-semibold text-violet-200">状态</span>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${data.isRoaming ? "bg-orange-400/40 text-orange-100 border-orange-300/60" : "bg-emerald-400/40 text-emerald-100 border-emerald-300/60"}`}
            >
              <FontAwesomeIcon icon={data.isRoaming ? faGlobe : faHome} className={`mr-2 ${data.isRoaming ? "text-orange-300" : "text-emerald-300"}`} />
              {data.isRoaming ? "漫游" : "本地"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
