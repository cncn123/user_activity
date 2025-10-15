import { LocationData } from "../../types/customer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faGlobe, faHome } from '@fortawesome/free-solid-svg-icons';
import { CARD_THEMES } from "../../styles/theme";
import { buildCardThemeStyles, buildThemeChipClasses } from "../../utils/themeStyles";

interface SummaryCardProps {
  data: LocationData;
}

const createNetworkBadgeStyles = (themeBase: string) => ({
  bg: `bg-${themeBase}-500/20 border-${themeBase}-400/40`,
  text: `text-${themeBase}-100`,
});

const createRoamingStatusStyles = (themeBase: string) => ({
  roaming: {
    bg: `bg-${themeBase}-500/30 text-${themeBase}-100 border-${themeBase}-400/50`,
    icon: `text-${themeBase}-200`,
  },
  local: {
    bg: `bg-${themeBase}-500/20 text-${themeBase}-100 border-${themeBase}-400/40`,
    icon: `text-${themeBase}-200`,
  },
});



export const SummaryCard = ({ data }: SummaryCardProps) => {
  const cardTheme = CARD_THEMES.Summary;
  const headerChipClasses = buildThemeChipClasses(cardTheme.base);
  const networkBadge = createNetworkBadgeStyles(cardTheme.base);
  const roamingStyles = createRoamingStatusStyles(cardTheme.base);
  const roamingColor = data.isRoaming ? roamingStyles.roaming : roamingStyles.local;

  return (
    <div
      className="h-full w-full flex flex-col justify-between p-6 text-white rounded-3xl glass-card-themed shadow-2xl"
      style={buildCardThemeStyles(cardTheme)}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span
              className={`w-3 h-3 bg-${cardTheme.pulse}-400 rounded-full mr-3 animate-pulse shadow-lg`}
            ></span>
            客户轨迹
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
          <div
            className={`flex justify-between items-center py-3 border-b border-${cardTheme.base}-400/20`}
          >
            <span className={`text-sm font-semibold text-${cardTheme.base}-200`}>
              当前位置
            </span>
            <span
              className={`text-sm font-bold text-${cardTheme.base}-100 drop-shadow-sm bg-${cardTheme.base}-500/30 px-3 py-1 rounded-full border border-${cardTheme.base}-400/50`}
            >
              {data.location}
            </span>
          </div>
          <div
            className={`flex justify-between items-center py-3 border-b border-${cardTheme.base}-400/20`}
          >
            <span className={`text-sm font-semibold text-${cardTheme.base}-200`}>网络</span>
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full border shadow-sm ${networkBadge.bg} ${networkBadge.text}`}
            >
              {data.networkType}
            </span>
          </div>
          <div
            className={`flex justify-between items-center py-3 border-b border-${cardTheme.base}-400/20`}
          >
            <span className={`text-sm font-semibold text-${cardTheme.base}-200`}>状态</span>
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
