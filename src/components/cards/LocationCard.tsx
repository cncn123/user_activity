import { LocationData } from '../../types/customer';
import { Timeline, TimelineItem } from '../Timeline';

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
    <div className="h-full w-full flex flex-col p-6 text-white rounded-3xl glass-card-blue shadow-2xl">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse shadow-lg"></span>
            客户位置
          </h3>
          <div className="flex items-center bg-blue-500/20 text-blue-100 px-3 py-1.5 rounded-full text-xs border border-blue-400/30 shadow-sm backdrop-blur-sm">
            <span className="mr-1.5">🕒</span>
            <span className="text-blue-100/90 font-mono mr-2">
              {new Date(new Date(data.timestamp).getTime() - 2 * 60000).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-white/80 text-xs font-medium">· 实时</span>
          </div>
        </div>

        {/* 当前位置 */}
        <div className="mb-4 pb-3 border-b border-blue-400/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-4xl mr-4">📍</span>
              <div>
                <div className="text-xl font-extrabold text-white drop-shadow-sm">{data.location}</div>
              </div>
            </div>
            <span className={`text-sm px-4 py-2 rounded-full font-semibold border shadow-sm ${data.isRoaming ? 'bg-amber-400/30 text-amber-100 border-amber-300/50' : 'bg-emerald-400/30 text-emerald-100 border-emerald-300/50'}`}>
              {data.isRoaming ? '🌐 漫游' : '🏠 本地'}
            </span>
          </div>
        </div>

        {/* 位置轨迹 */}
        <div className="flex flex-col flex-1 min-h-0 space-y-2">
          <div className="flex justify-start items-center mb-1 flex-shrink-0">
            <span className="text-lg font-bold text-white drop-shadow-sm flex items-center">
              <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse shadow-lg"></span>
              最近轨迹
            </span>
          </div>
          <div className="bg-white/5 rounded-xl p-4 flex-1 min-h-0 overflow-y-auto border border-blue-400/20">
            <Timeline>
              {data.locationTrack.slice(-4).map((track, index, array) => (
                <TimelineItem
                  key={index}
                  title={track.location}
                  description={`⏱️ 停留 ${track.duration}分钟`}
                  date={getTimeAgo(track.timestamp)}
                  icon={getTrackIcon(track.isRoaming)}
                  themeColor="blue"
                  isLast={index === array.length - 1}
                />
              ))}
            </Timeline>
          </div>
        </div>
      </div>


    </div>
  );
};