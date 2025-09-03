import { NetworkData } from '../../types/customer';

interface NetworkCardProps {
  data: NetworkData;
}

export const NetworkCard = ({ data }: NetworkCardProps) => {
  const getSignalBars = (strength: number) => {
    const bars = ['▁', '▂', '▃', '▄', '▅'];
    return bars.slice(0, strength).join(' ');
  };

  const getNetworkColor = (networkType: string) => {
    switch (networkType) {
      case '5G': return 'text-green-300';
      case '4G': return 'text-blue-300';
      case '3G': return 'text-orange-300';
      default: return 'text-gray-300';
    }
  };

  const getNetworkBgColor = (networkType: string) => {
    switch (networkType) {
      case '5G': return 'bg-green-500/20 border-green-500/40';
      case '4G': return 'bg-blue-500/20 border-blue-500/40';
      case '3G': return 'bg-orange-500/20 border-orange-500/40';
      default: return 'bg-gray-500/20 border-gray-500/40';
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 text-white rounded-3xl glass-card shadow-2xl">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span className="w-3 h-3 bg-green-300 rounded-full mr-3 animate-pulse shadow-lg"></span>
            网络制式
          </h3>
          <div className="text-xs text-white/90 font-semibold bg-white/20 px-3 py-1 rounded-full border border-green-300/50 shadow-sm">
            连接状态
          </div>
        </div>
        
        <div className="space-y-4">
          <div className={`flex items-center justify-center py-4 px-6 rounded-2xl border-2 ${getNetworkBgColor(data.networkType)}`}>
            <span className={`text-4xl font-bold ${getNetworkColor(data.networkType)}`}>
              {data.networkType}
            </span>
          </div>
          
          <div className="glass-inner rounded-xl p-4 border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-white drop-shadow-sm flex items-center">
                📶 <span className="ml-1">信号强度</span>
              </span>
              <div className="text-right">
                <div className="text-lg font-extrabold text-white drop-shadow-sm">{data.signalStrength}/5</div>
                <div className="text-xs text-white/80 font-medium">
                  {data.signalStrength >= 4 ? '优秀' : data.signalStrength >= 3 ? '良好' : data.signalStrength >= 2 ? '一般' : '较差'}
                </div>
              </div>
            </div>
            <div className="font-mono text-2xl text-emerald-300 text-center bg-white/5 py-2 rounded-lg">
              {getSignalBars(data.signalStrength)}
            </div>
          </div>
          
          <div className="glass-inner rounded-xl p-3 text-center border border-white/10">
            <div className="text-xs text-white/70 mb-1">技术制式</div>
            <span className="text-sm font-semibold text-white bg-white/10 px-4 py-2 rounded-full">
              {data.networkType === '5G' ? '🚀 NSA/SA' : data.networkType === '4G' ? '⚡ LTE' : '📡 UMTS'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-white/70 bg-white/10 px-3 py-2 rounded-lg">
        🕒 更新时间: {data.timestamp}
      </div>
    </div>
  );
};