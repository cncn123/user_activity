import { ResourceData } from "../../types/customer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSignal, faExclamationTriangle, faBan, faRocket } from '@fortawesome/free-solid-svg-icons';

interface ResourceCardProps {
  data: ResourceData;
}

export const ResourceCard = ({ data }: ResourceCardProps) => {
  const getUsagePercentage = (used: number, total: number) =>
    Math.min((used / total) * 100, 100);

  const getSpeedLimitColor = (speedLimit: string) => {
    switch (speedLimit) {
      case "正常":
        return "text-emerald-300 bg-emerald-500/20 border-emerald-500/40";
      case "限速":
        return "text-amber-300 bg-amber-500/20 border-amber-500/40";
      case "0速":
        return "text-red-300 bg-red-500/20 border-red-500/40";
      default:
        return "text-white/80 bg-slate-500/20 border-slate-500/40";
    }
  };

  const hasOverage =
    data.isDataOverLimit || data.isVoiceOverLimit || data.isSmsOverLimit;

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 text-white rounded-3xl glass-card-cyan shadow-2xl">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse shadow-lg"></span>
            数据使用
          </h3>
          <div className="flex items-center space-x-2">
            {hasOverage && (
              <div className="flex items-center bg-red-400/40 text-red-100 px-3 py-1 rounded-full text-xs animate-pulse border border-red-300/60 shadow-md">
                <span className="w-1.5 h-1.5 bg-red-200 rounded-full mr-2"></span>
                超套警告
              </div>
            )}
            <div className="flex items-center bg-cyan-500/20 text-cyan-200 px-3 py-1.5 rounded-full text-xs border border-cyan-400/30 shadow-sm backdrop-blur-sm">
              <FontAwesomeIcon icon={faClock} className="mr-1.5 text-cyan-300" />
              <span className="font-mono mr-2">
                {new Date(new Date().getTime() - 8 * 60000).toLocaleTimeString(
                  "zh-CN",
                  { hour: "2-digit", minute: "2-digit" },
                )}
              </span>
              <span className="text-xs font-medium">· 实时</span>
            </div>
          </div>
        </div>

        <div className="mb-6 text-center py-4 border-b border-cyan-400/20">
          <div className="text-xs text-cyan-200 font-medium mb-1">当前套餐</div>
          <div className="text-lg font-extrabold text-white drop-shadow-sm bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-400/20">
            {data.packageName}
          </div>
        </div>

        <div className="space-y-5">
          {/* 数据流量 */}
          <div className="pb-4 border-b border-cyan-400/20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-white drop-shadow-sm flex items-center">
                <FontAwesomeIcon icon={faSignal} className="mr-2 text-cyan-300" />
                数据流量
              </span>
              <div className="text-right">
                <div className="text-sm font-extrabold text-white drop-shadow-sm">
                  {data.dataUsed}GB / {data.dataTotal}GB
                </div>
                <div className="text-xs text-white/80 font-medium">
                  {Math.round(
                    getUsagePercentage(data.dataUsed, data.dataTotal),
                  )}
                  % 已用
                </div>
              </div>
            </div>
            <div className="w-full bg-cyan-500/10 rounded-full h-3 mb-2 border border-cyan-400/20">
              <div
                className={`h-3 rounded-full transition-all duration-500 shadow-sm ${data.isDataOverLimit ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-cyan-400 to-cyan-600"}`}
                style={{
                  width: `${Math.min(getUsagePercentage(data.dataUsed, data.dataTotal), 100)}%`,
                }}
              ></div>
            </div>
            {data.isDataOverLimit && (
              <div className="text-xs text-red-300 bg-red-500/10 px-2 py-1 rounded mt-2">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 text-red-300" />
                超出 {(data.dataUsed - data.dataTotal).toFixed(2)}GB
              </div>
            )}
          </div>

          {/* 网络状态 */}
          <div className="pt-4 border-t border-cyan-400/20">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-white/90">
                网络状态
              </span>
              <span
                className={`text-sm font-semibold px-4 py-2 rounded-full border-2 ${getSpeedLimitColor(data.speedLimit)}`}
              >
                <FontAwesomeIcon 
                  icon={data.speedLimit === "0速" ? faBan : data.speedLimit === "限速" ? faClock : faRocket} 
                  className={`mr-2 ${data.speedLimit === "0速" ? "text-red-300" : data.speedLimit === "限速" ? "text-amber-300" : "text-emerald-300"}`} 
                />
                {data.speedLimit === "0速" ? "0速" : data.speedLimit === "限速" ? "限速" : "正常"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
