import { BillingData } from "../../types/customer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "../../hooks/useTheme";

interface BillingCardProps {
  data: BillingData;
}

export const BillingCard = ({ data }: BillingCardProps) => {
  const { theme } = useTheme();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "已缴费":
        return "text-emerald-100 bg-emerald-400/40 border-emerald-300/60";
      case "未缴费":
        return "text-amber-100 bg-amber-400/40 border-amber-300/60";
      case "逾期":
        return "text-red-100 bg-red-400/40 border-red-300/60";
      default:
        return "text-white/90 bg-white/20 border-white/30";
    }
  };

  const getComparisonColor = (value: number) => {
    if (value > 0) return "text-red-200 drop-shadow-sm";
    if (value < 0) return "text-emerald-200 drop-shadow-sm";
    return "text-white/90 drop-shadow-sm";
  };

  const getComparisonIcon = (value: number) => {
    if (value > 0) return "📈";
    if (value < 0) return "📉";
    return "➡️";
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 text-white rounded-3xl glass-card-orange shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-orange-400 rounded-full mr-3 animate-pulse shadow-lg"></span>
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm">
            账单查询
          </h3>
        </div>
        <div className="flex items-center bg-orange-500/20 text-orange-100 px-3 py-1.5 rounded-full text-xs border border-orange-400/30 shadow-sm backdrop-blur-sm">
          <span className="mr-1.5">🕒</span>
          <span className="text-orange-100/90 font-mono mr-2">
            {new Date(new Date().getTime() - 3 * 60 * 60000).toLocaleTimeString(
              "zh-CN",
              { hour: "2-digit", minute: "2-digit" },
            )}
          </span>
          <span className="text-white/80 text-xs font-medium">· 每日</span>
        </div>
      </div>

      <div className="space-y-3 flex-1">
        {/* 当前月份账单 */}
        <div className="pb-4 border-b border-orange-400/20">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-white/80 font-medium">本月账单</div>
              <div className="text-xl font-extrabold text-white drop-shadow-sm">
                ${data.currentMonth.amount}
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border shadow-sm ${getStatusColor(data.currentMonth.status)}`}
            >
              {data.currentMonth.status === "已缴费"
                ? "✅ 已缴费"
                : data.currentMonth.status === "未缴费"
                  ? "⏰ 未缴费"
                  : "⚠️ 逾期"}
            </span>
          </div>
          <div className="text-xs text-white/60 mt-2">
            缴费截止日期: {data.currentMonth.dueDate}
          </div>
        </div>

        {/* 环比同比 */}
        <div className="py-4 border-b border-orange-400/20">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xs text-white/80 font-medium mb-1">
                环比上月
              </div>
              <div
                className={`text-lg font-extrabold flex items-center justify-center ${getComparisonColor(data.monthlyComparison.currentVsPrevious)}`}
              >
                <span className="mr-1">
                  {getComparisonIcon(data.monthlyComparison.currentVsPrevious)}
                </span>
                {Math.abs(data.monthlyComparison.currentVsPrevious)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-white/80 font-medium mb-1">
                同比去年
              </div>
              <div
                className={`text-lg font-extrabold flex items-center justify-center ${getComparisonColor(data.monthlyComparison.currentVsSameLastYear)}`}
              >
                <span className="mr-1">
                  {getComparisonIcon(
                    data.monthlyComparison.currentVsSameLastYear,
                  )}
                </span>
                {Math.abs(data.monthlyComparison.currentVsSameLastYear)}%
              </div>
            </div>
          </div>
        </div>

        {/* 12个月趋势图 */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-white drop-shadow-sm flex items-center">
              📊 <span className="ml-1">12个月趋势</span>
            </span>
            <span className="text-xs text-orange-100 font-semibold bg-orange-500/20 px-3 py-1 rounded border border-orange-400/30 shadow-sm">
              总额 ${data.totalAmount12Months}
            </span>
          </div>

          {/* 趋势图 */}
          <div className="relative h-32 bg-orange-500/5 rounded-lg p-2 mb-3 border border-orange-400/20 shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.last12Months}>
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={theme === "light" ? "#3b82f6" : "#60a5fa"}
                      stopOpacity={theme === "light" ? 0.6 : 0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={theme === "light" ? "#1d4ed8" : "#22d3ee"}
                      stopOpacity={theme === "light" ? 0.1 : 0.2}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill:
                      theme === "light"
                        ? "rgba(31,41,55,0.7)"
                        : "rgba(255,255,255,0.7)",
                  }}
                  tickFormatter={(value) => value.slice(-2)}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      theme === "light"
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(0,0,0,0.8)",
                    border:
                      theme === "light"
                        ? "1px solid rgba(0,0,0,0.1)"
                        : "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    color: theme === "light" ? "#1f2937" : "white",
                    fontSize: "12px",
                    boxShadow:
                      theme === "light" ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                  }}
                  formatter={(value: number) => [
                    `${value.toFixed(2)}`,
                    "账单金额",
                  ]}
                  labelStyle={{
                    color: theme === "light" ? "#1d4ed8" : "#22d3ee",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke={theme === "light" ? "#1d4ed8" : "#22d3ee"}
                  strokeWidth={2}
                  dot={{
                    fill: theme === "light" ? "#1d4ed8" : "#22d3ee",
                    strokeWidth: 2,
                    stroke: theme === "light" ? "#ffffff" : "#ffffff",
                    r: 3,
                  }}
                  activeDot={{
                    r: 4,
                    stroke: theme === "light" ? "#1d4ed8" : "#22d3ee",
                    strokeWidth: 2,
                    fill: theme === "light" ? "#ffffff" : "#ffffff",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xs text-white/80 font-medium">月均消费</div>
              <div className="text-lg font-extrabold text-white drop-shadow-sm">
                ¥{data.averageMonthlyAmount}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-white/80 font-medium">最高月份</div>
              <div className="text-lg font-extrabold text-white drop-shadow-sm">
                ¥
                {Math.max(...data.last12Months.map((m) => m.amount)).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
