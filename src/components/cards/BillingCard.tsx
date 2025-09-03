import { BillingData } from '../../types/customer';

interface BillingCardProps {
  data: BillingData;
}

export const BillingCard = ({ data }: BillingCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '已缴费': return 'text-emerald-100 bg-emerald-400/40 border-emerald-300/60';
      case '未缴费': return 'text-amber-100 bg-amber-400/40 border-amber-300/60';
      case '逾期': return 'text-red-100 bg-red-400/40 border-red-300/60';
      default: return 'text-white/90 bg-white/20 border-white/30';
    }
  };

  const getComparisonColor = (value: number) => {
    if (value > 0) return 'text-red-200 drop-shadow-sm';
    if (value < 0) return 'text-emerald-200 drop-shadow-sm';
    return 'text-white/90 drop-shadow-sm';
  };

  const getComparisonIcon = (value: number) => {
    if (value > 0) return '📈';
    if (value < 0) return '📉';
    return '➡️';
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 text-white rounded-3xl glass-card shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3 animate-pulse shadow-lg"></span>
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm">账单查询</h3>
        </div>
        <div className="flex items-center bg-blue-400/30 text-blue-100 px-3 py-1 rounded-full text-xs border border-blue-300/50 shadow-sm">
          <span className="w-1.5 h-1.5 bg-blue-200 rounded-full mr-2"></span>
          12个月历史
        </div>
      </div>

      <div className="space-y-3 flex-1">
        {/* 当前月份账单 */}
        <div className="glass-inner rounded-xl p-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-white/80 font-medium">本月账单</div>
              <div className="text-xl font-extrabold text-white drop-shadow-sm">¥{data.currentMonth.amount}</div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border shadow-sm ${getStatusColor(data.currentMonth.status)}`}>
              {data.currentMonth.status === '已缴费' ? '✅ 已缴费' : 
               data.currentMonth.status === '未缴费' ? '⏰ 未缴费' : '⚠️ 逾期'}
            </span>
          </div>
          <div className="text-xs text-white/60 mt-1">缴费截止日期: {data.currentMonth.dueDate}</div>
        </div>

        {/* 环比同比 */}
        <div className="glass-inner rounded-xl p-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xs text-white/80 font-medium">环比上月</div>
              <div className={`text-lg font-extrabold flex items-center justify-center ${getComparisonColor(data.monthlyComparison.currentVsPrevious)}`}>
                <span className="mr-1">{getComparisonIcon(data.monthlyComparison.currentVsPrevious)}</span>
                {Math.abs(data.monthlyComparison.currentVsPrevious)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-white/80 font-medium">同比去年</div>
              <div className={`text-lg font-extrabold flex items-center justify-center ${getComparisonColor(data.monthlyComparison.currentVsSameLastYear)}`}>
                <span className="mr-1">{getComparisonIcon(data.monthlyComparison.currentVsSameLastYear)}</span>
                {Math.abs(data.monthlyComparison.currentVsSameLastYear)}%
              </div>
            </div>
          </div>
        </div>

        {/* 12个月趋势图 */}
        <div className="glass-inner rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-white drop-shadow-sm flex items-center">
              📊 <span className="ml-1">12个月趋势</span>
            </span>
            <span className="text-xs text-white/90 font-semibold bg-white/20 px-3 py-1 rounded border border-white/30">
              总额 ¥{data.totalAmount12Months}
            </span>
          </div>
          
          {/* 趋势图 */}
          <div className="relative h-32 bg-white/10 rounded-lg p-4 mb-3 border border-white/20">
            <div className="relative h-20 w-full">
              {/* 生成折线图路径 */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {(() => {
                  const maxAmount = Math.max(...data.last12Months.map(m => m.amount));
                  const minAmount = Math.min(...data.last12Months.map(m => m.amount));
                  const range = maxAmount - minAmount;
                  
                  // 生成点坐标
                  const points = data.last12Months.map((month, index) => {
                    const x = (index / (data.last12Months.length - 1)) * 100;
                    const y = range > 0 ? 100 - ((month.amount - minAmount) / range) * 80 - 10 : 50;
                    return { x, y, amount: month.amount, month: month.month };
                  });
                  
                  // 生成路径字符串
                  const pathData = points.reduce((path, point, index) => {
                    return path + (index === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`);
                  }, '');
                  
                  // 生成填充区域路径
                  const areaData = pathData + ` L 100 100 L 0 100 Z`;
                  
                  return (
                    <>
                      {/* 填充区域 */}
                      <path d={areaData} fill="url(#areaGradient)" />
                      {/* 折线 */}
                      <path 
                        d={pathData} 
                        fill="none" 
                        stroke="url(#lineGradient)" 
                        strokeWidth="0.8" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-sm"
                      />
                      {/* 数据点 */}
                      {points.map((point, index) => (
                        <g key={index}>
                          <circle 
                            cx={point.x} 
                            cy={point.y} 
                            r="1.2" 
                            fill="#22d3ee" 
                            stroke="#ffffff" 
                            strokeWidth="0.3"
                            className="drop-shadow-sm hover:r-1.8 transition-all duration-200"
                          />
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
              
              {/* 悬停数据点 */}
              <div className="absolute inset-0 flex justify-between items-end">
                {data.last12Months.map((month, index) => (
                  <div key={index} className="group relative flex-1 h-full flex items-center justify-center">
                    <div className="w-full h-full opacity-0 hover:opacity-100 cursor-pointer"></div>
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/95 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-50 border border-white/20">
                      <div className="font-semibold">{month.month}</div>
                      <div className="text-cyan-300">¥{month.amount.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* X轴标签 */}
            <div className="flex justify-between text-xs text-white/70 font-medium mt-3 px-1">
              {data.last12Months.map((month, index) => (
                <span key={index} className="text-center flex-1">
                  {index % 2 === 0 ? month.month.slice(-2) : ''}
                </span>
              ))}
            </div>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xs text-white/80 font-medium">月均消费</div>
              <div className="text-lg font-extrabold text-white drop-shadow-sm">¥{data.averageMonthlyAmount}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-white/80 font-medium">最高月份</div>
              <div className="text-lg font-extrabold text-white drop-shadow-sm">
                ¥{Math.max(...data.last12Months.map(m => m.amount)).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-white/70 glass-footer px-3 py-1 rounded-lg mt-2">
        🕒 {new Date().toLocaleString('zh-CN')}
      </div>
    </div>
  );
};