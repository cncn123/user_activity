import { LocationData } from "../../types/customer";
import { Timeline, TimelineItem } from "../Timeline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMapMarkerAlt,
  faGlobe,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { CARD_THEMES } from "../../styles/theme";
import { buildCardThemeStyles, buildThemeChipClasses } from "../../utils/themeStyles";

interface LocationCardProps {
  data: LocationData;
}

const createRoamingStatusStyles = (themeBase: string) => ({
  roaming: {
    bg: `bg-${themeBase}-500/30 text-${themeBase}-100 border-${themeBase}-400/60`,
    icon: `text-${themeBase}-100`,
  },
  local: {
    bg: `bg-${themeBase}-500/20 text-${themeBase}-100 border-${themeBase}-400/40`,
    icon: `text-${themeBase}-200`,
  },
});

const getTrackIconColor = (themeBase: string, isRoaming: boolean) =>
  `text-${themeBase}-${isRoaming ? "200" : "300"}`;



const getTimeAgo = (timestamp: string) => {
  const now = new Date();
  const trackTime = new Date(timestamp);
  const diffHours = Math.floor(
    (now.getTime() - trackTime.getTime()) / (1000 * 60 * 60),
  );
  return `${diffHours}小时前`;
};

export const LocationCard = ({ data }: LocationCardProps) => {
  const cardTheme = CARD_THEMES.Location;
  const headerChipClasses = buildThemeChipClasses(cardTheme.base);
  const roamingStyles = createRoamingStatusStyles(cardTheme.base);
  const roamingColor = data.isRoaming
    ? roamingStyles.roaming
    : roamingStyles.local;

  return (
    <div
      className={`h-full w-full flex flex-col p-6 text-white rounded-3xl glass-card-themed shadow-2xl`}
      style={buildCardThemeStyles(cardTheme)}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
          <span
            className={`w-3 h-3 bg-${cardTheme.pulse}-400 rounded-full mr-3 animate-pulse shadow-lg`}
          ></span>
          客户位置
        </h3>
        <div
          className={`flex items-center ${headerChipClasses} px-3 py-1.5 rounded-full text-xs shadow-sm backdrop-blur-sm`}
        >
          <FontAwesomeIcon
            icon={faClock}
            className={`mr-1.5 text-${cardTheme.base}-300`}
          />
          <span className="font-mono mr-2">
            {new Date(
              new Date(data.timestamp).getTime() - 2 * 60000,
            ).toLocaleTimeString("zh-CN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="text-xs font-medium">· 实时</span>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 min-h-0">
        {/* 当前位置 */}
        <div
          className={`mb-4 pb-3 border-b border-${cardTheme.base}-400/20 flex-shrink-0`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className={`text-4xl mr-4 text-${cardTheme.base}-300`}
              />
              <div>
                <div className="text-xl font-extrabold text-white drop-shadow-sm">
                  {data.location}
                </div>
              </div>
            </div>
            <span
              className={`text-sm px-4 py-2 rounded-full font-semibold border shadow-sm flex items-center ${roamingColor.bg}`}
            >
              <FontAwesomeIcon
                icon={data.isRoaming ? faGlobe : faHome}
                className={`mr-2 ${roamingColor.icon}`}
              />
              {data.isRoaming ? "漫游" : "本地"}
            </span>
          </div>
        </div>

        {/* 位置轨迹 */}
        <div className="flex flex-col flex-1 min-h-0 space-y-2">
          <div className="flex justify-start items-center mb-1 flex-shrink-0">
            <span className="text-lg font-bold text-white drop-shadow-sm flex items-center">
              <span
                className={`w-3 h-3 bg-${cardTheme.pulse}-400 rounded-full mr-3 animate-pulse shadow-lg`}
              ></span>
              最近轨迹
            </span>
          </div>
          <div
            className={`bg-white/5 rounded-xl p-4 flex-1 min-h-0 overflow-y-auto border border-${cardTheme.base}-400/20`}
          >
            <Timeline>
              {data.locationTrack.slice(-4).map((track, index, array) => (
                <TimelineItem
                  key={index}
                  title={track.location}
                  description={`停留 ${track.duration}分钟`}
                  date={getTimeAgo(track.timestamp)}
                  icon={
                    <FontAwesomeIcon
                      icon={track.isRoaming ? faGlobe : faMapMarkerAlt}
                      className={getTrackIconColor(cardTheme.base, track.isRoaming)}
                    />
                  }
                  themeColor={cardTheme.base}
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
