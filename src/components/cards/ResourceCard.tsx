import { ResourceData } from '../../types/customer';

interface ResourceCardProps {
  data: ResourceData;
}

export const ResourceCard = ({ data }: ResourceCardProps) => {
  const getUsagePercentage = (used: number, total: number) => Math.min((used / total) * 100, 100);
  
  const getSpeedLimitColor = (speedLimit: string) => {
    switch (speedLimit) {
      case '正常': return 'text-emerald-300 bg-emerald-500/20 border-emerald-500/40';
      case '限速': return 'text-amber-300 bg-amber-500/20 border-amber-500/40';
      case '0速': return 'text-red-300 bg-red-500/20 border-red-500/40';
      default: return 'text-white/80 bg-slate-500/20 border-slate-500/40';
    }
  };

  const hasOverage = data.isDataOverLimit || data.isVoiceOverLimit || data.isSmsOverLimit;

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 text-white rounded-3xl glass-card shadow-2xl">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span className="w-3 h-3 bg-purple-300 rounded-full mr-3 animate-pulse shadow-lg"></span>
            数据使用
          </h3>
          <div className="flex items-center space-x-2">
            {hasOverage && (
              <div className="flex items-center bg-red-400/40 text-red-100 px-3 py-1 rounded-full text-xs animate-pulse border border-red-300/60 shadow-md">
                <span className="w-1.5 h-1.5 bg-red-200 rounded-full mr-2"></span>
                超套警告
              </div>
            )}
            <div className="flex items-center bg-blue-400/30 text-blue-100 px-3 py-1 rounded-full text-xs border border-blue-300/50 shadow-sm">
            <span className="w-1.5 h-1.5 bg-blue-200 rounded-full mr-2 animate-ping"></span>
            实时
          </div>
          </div>
        </div>
        
        <div className="mb-4 glass-inner rounded-xl p-4 border border-white/10 text-center">
          <div className="text-xs text-white/80 font-medium mb-1">当前套餐</div>
          <div className="text-lg font-extrabold text-white drop-shadow-sm">{data.packageName}</div>
        </div>

        <div className="space-y-3">
          {/* 数据流量 */}
          <div className="glass-inner rounded-xl p-4 border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-white drop-shadow-sm flex items-center">
                📶 <span className="ml-2">数据流量</span>
              </span>
              <div className="text-right">
                <div className="text-sm font-extrabold text-white drop-shadow-sm">
                  {data.dataUsed}GB / {data.dataTotal}GB
                </div>
                <div className="text-xs text-white/80 font-medium">
                  {Math.round(getUsagePercentage(data.dataUsed, data.dataTotal))}% 已用
                </div>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 mb-2">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${data.isDataOverLimit ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}
                style={{ width: `${Math.min(getUsagePercentage(data.dataUsed, data.dataTotal), 100)}%` }}
              ></div>
            </div>
            {data.isDataOverLimit && (
              <div className="text-xs text-red-300 bg-red-500/10 px-2 py-1 rounded mt-2">
                ⚠️ 超出 {(data.dataUsed - data.dataTotal).toFixed(2)}GB
              </div>
            )}
          </div>


          {/* 网络状态 */}
          <div className="glass-inner rounded-xl p-4 border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-white/90">网络状态</span>
              <span className={`text-sm font-semibold px-4 py-2 rounded-full border-2 ${getSpeedLimitColor(data.speedLimit)}`}>
                {data.speedLimit === '0速' ? '⛔ 0速' : data.speedLimit === '限速' ? '🐌 限速' : '🚀 正常'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-white/70 bg-white/10 px-3 py-2 rounded-lg">
        🕒 更新时间: {new Date().toLocaleString('zh-CN')}
      </div>
    </div>
  );
};