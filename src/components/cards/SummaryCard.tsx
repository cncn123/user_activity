import { LocationData } from '../../types/customer';

interface SummaryCardProps {
  data: LocationData;
}

export const SummaryCard = ({ data }: SummaryCardProps) => {
  const getNetworkColor = (type: string) => {
    switch (type) {
      case '5G': return 'text-emerald-300';
      case '4G': return 'text-cyan-300';
      case '3G': return 'text-amber-300';
      default: return 'text-white/80';
    }
  };

  const getNetworkBgColor = (type: string) => {
    switch (type) {
      case '5G': return 'bg-emerald-500/20 border-emerald-500/30';
      case '4G': return 'bg-cyan-500/20 border-cyan-500/30';
      case '3G': return 'bg-amber-500/20 border-amber-500/30';
      default: return 'bg-slate-500/20 border-slate-500/30';
    }
  };

  const getSignalBars = (strength: number) => {
    return '█'.repeat(strength) + '░'.repeat(5 - strength);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 text-white rounded-3xl glass-card shadow-2xl">
      <div>
        <h3 className="text-xl font-extrabold text-white drop-shadow-sm mb-6 flex items-center">
          <span className="w-3 h-3 bg-purple-300 rounded-full mr-3 animate-pulse shadow-lg"></span>
          客户轨迹概览
        </h3>
        <div className="space-y-3">
          <div className="glass-inner rounded-xl p-4 border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-white/90">当前位置</span>
              <span className="text-sm font-bold text-white drop-shadow-sm">{data.location}</span>
            </div>
          </div>
          <div className="glass-inner rounded-xl p-4 border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-white/90">网络</span>
              <span className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${getNetworkBgColor(data.networkType)} ${getNetworkColor(data.networkType)}`}>
                {data.networkType}
              </span>
            </div>
          </div>
          <div className="glass-inner rounded-xl p-4 border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-white/90">状态</span>
              <span className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${data.isRoaming ? 'bg-orange-400/40 text-orange-100 border-orange-300/60' : 'bg-emerald-400/40 text-emerald-100 border-emerald-300/60'}`}>
                {data.isRoaming ? '🌐 漫游' : '🏠 本地'}
              </span>
            </div>
          </div>
          <div className="glass-inner rounded-xl p-4 border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-white/90">信号</span>
              <span className="text-sm font-mono text-emerald-300 font-bold">
                {getSignalBars(data.signalStrength)} {data.signalStrength}/5
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-xs text-white/80 font-medium bg-white/15 px-3 py-2 rounded-lg border border-white/20">
        🕒 更新时间: {data.timestamp}
      </div>
    </div>
  );
};