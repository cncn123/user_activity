import { NetworkData } from "../../types/customer";

interface NetworkCardProps {
  data: NetworkData;
}

export const NetworkCard = ({ data }: NetworkCardProps) => {
  const getNetworkColor = (networkType: string) => {
    switch (networkType) {
      case "5G":
        return "text-green-300";
      case "4G":
        return "text-blue-300";
      case "3G":
        return "text-orange-300";
      default:
        return "text-gray-300";
    }
  };

  const getNetworkBgColor = (networkType: string) => {
    switch (networkType) {
      case "5G":
        return "bg-green-500/20 border-green-500/40";
      case "4G":
        return "bg-blue-500/20 border-blue-500/40";
      case "3G":
        return "bg-orange-500/20 border-orange-500/40";
      default:
        return "bg-gray-500/20 border-gray-500/40";
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 text-white rounded-3xl glass-card-emerald shadow-2xl">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse shadow-lg"></span>
            网络制式
          </h3>
          <div className="flex items-center bg-emerald-500/20 text-emerald-100 px-3 py-1.5 rounded-full text-xs border border-emerald-400/30 shadow-sm backdrop-blur-sm">
            <span className="mr-1.5">🕒</span>
            <span className="text-emerald-100/90 font-mono mr-2">
              {new Date(
                new Date(data.timestamp).getTime() - 15 * 60000,
              ).toLocaleTimeString("zh-CN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="text-white/80 text-xs font-medium">· 15分钟</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-emerald-400/20">
            <span className="text-sm font-semibold text-emerald-200">
              网络制式
            </span>
            <span className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${getNetworkBgColor(data.networkType)} ${getNetworkColor(data.networkType)}`}>
              {data.networkType}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-emerald-400/20">
            <span className="text-sm font-semibold text-emerald-200">信号强度</span>
            <span className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${
              data.signalStrength >= 4 
                ? 'bg-emerald-400/40 text-emerald-100 border-emerald-300/60' 
                : data.signalStrength >= 3
                ? 'bg-blue-400/40 text-blue-100 border-blue-300/60'
                : data.signalStrength >= 2
                ? 'bg-yellow-400/40 text-yellow-100 border-yellow-300/60'
                : 'bg-red-400/40 text-red-100 border-red-300/60'
            }`}>
              📶 {data.signalStrength}/5 · {data.signalStrength >= 4 ? "优秀" : data.signalStrength >= 3 ? "良好" : data.signalStrength >= 2 ? "一般" : "较差"}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-emerald-400/20">
            <span className="text-sm font-semibold text-emerald-200">技术制式</span>
            <span className="text-sm font-bold text-white drop-shadow-sm bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/30">
              {data.networkType === "5G" ? "🚀 NSA/SA" : data.networkType === "4G" ? "⚡ LTE" : "📡 UMTS"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
