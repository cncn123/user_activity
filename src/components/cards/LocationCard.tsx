import { LocationData } from '../../types/customer';

interface LocationCardProps {
  data: LocationData;
}

export const LocationCard = ({ data }: LocationCardProps) => {
  const getTrackIcon = (isRoaming: boolean) => {
    return isRoaming ? '🌐' : '📍';
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const trackTime = new Date(timestamp);
    const diffHours = Math.floor((now.getTime() - trackTime.getTime()) / (1000 * 60 * 60));
    return `${diffHours}小时前`;
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 text-white rounded-3xl glass-card shadow-2xl">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span className="w-3 h-3 bg-blue-300 rounded-full mr-3 animate-pulse shadow-lg"></span>
            客户位置
          </h3>
          <div className="flex items-center bg-blue-400/30 text-blue-100 px-3 py-1 rounded-full text-xs border border-blue-300/50 shadow-sm">
            <span className="w-1.5 h-1.5 bg-blue-200 rounded-full mr-2 animate-ping"></span>
            实时
          </div>
        </div>

        {/* 当前位置 */}
        <div className="mb-4 glass-inner rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-4xl mr-4">📍</span>
              <div>
                <div className="text-xl font-extrabold text-white drop-shadow-sm mb-1">{data.location}</div>
              </div>
            </div>
            <span className={`text-sm px-4 py-2 rounded-full font-bold border-2 shadow-md ${data.isRoaming ? 'bg-orange-400/50 text-orange-50 border-orange-300/80' : 'bg-emerald-400/50 text-emerald-50 border-emerald-300/80'}`}>
              {data.isRoaming ? '🌐 漫游' : '🏠 本地'}
            </span>
          </div>
        </div>

        {/* 位置轨迹 */}
        <div className="space-y-2">
          <div className="flex justify-start items-center mb-1">
            <span className="text-lg font-bold text-white drop-shadow-sm flex items-center">
              <span className="w-3 h-3 bg-blue-300 rounded-full mr-3 animate-pulse shadow-lg"></span>
              最近轨迹
            </span>
          </div>
          <div className="glass-inner rounded-xl p-3 max-h-60 overflow-y-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-600 opacity-60"></div>
              
              <div className="space-y-4">
                {data.locationTrack.slice(-4).map((track, index) => (
                  <div key={index} className="relative flex items-start pl-10">
                    {/* Timeline dot */}
                    <div className={`absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 border-white ${
                      track.isRoaming ? 'bg-orange-500' : 'bg-blue-500'
                    } shadow-lg z-10`}></div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <span className="mr-3 text-lg">{getTrackIcon(track.isRoaming)}</span>
                          <span className="text-white font-bold text-sm drop-shadow-sm">{track.location}</span>
                        </div>
                        <div className="text-white/90 font-medium text-right text-xs bg-white/20 px-2 py-1 rounded border border-white/20">
                          {getTimeAgo(track.timestamp)}
                        </div>
                      </div>
                      <div className="text-xs text-white/80 font-medium ml-8 bg-white/15 px-2 py-1 rounded inline-block border border-white/20">
                        ⏱️ 停留 {track.duration}分钟
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-white/70 glass-footer px-3 py-2 rounded-lg">
        🕒 更新: {data.timestamp}
      </div>
    </div>
  );
};