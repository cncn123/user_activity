import { LocationData, ResourceData, BillingData, LocationTrackPoint, NetworkData } from '../types/customer';

// 模拟位置轨迹数据生成函数
export const generateLocationTrack = (): LocationTrackPoint[] => {
  const locations = [
    '香港中环', '香港铜锣湾', '香港旺角', '香港尖沙咀',
    '深圳福田区', '深圳南山区', '深圳罗湖区',
    '广州天河区', '广州海珠区', '澳门氹仔'
  ];
  
  const track: LocationTrackPoint[] = [];
  const now = new Date();
  
  // 生成过去6小时的轨迹
  for (let i = 5; i >= 0; i--) {
    const trackTime = new Date(now.getTime() - i * 60 * 60 * 1000);
    const location = locations[Math.floor(Math.random() * locations.length)];
    const isRoaming = !location.includes('香港');
    const duration = Math.floor(Math.random() * 120) + 30; // 30-150分钟
    
    const point: LocationTrackPoint = {
      location,
      timestamp: trackTime.toISOString(),
      duration,
      isRoaming
    };
    
    track.push(point);
  }
  
  return track;
};

// 模拟位置数据生成函数
export const generateMockLocationData = (): LocationData => {
  const locations = [
    '香港中环',
    '香港铜锣湾', 
    '中国广东省',
    '中国福建省',
    '香港旺角',
    '澳门'
  ];
  
  const networks: Array<'4G' | '5G' | '3G'> = ['4G', '5G', '3G'];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const isRoaming = !location.includes('香港');
  
  // 生成位置轨迹
  const locationTrack = generateLocationTrack();
  const totalDistance = Number((Math.random() * 50 + 10).toFixed(1)); // 10-60km
  const trackingStartTime = new Date(Date.now() - 6 * 60 * 60 * 1000).toLocaleString('zh-CN');
  
  return {
    location,
    networkType: networks[Math.floor(Math.random() * networks.length)],
    isRoaming,
    timestamp: new Date().toLocaleString('zh-CN'),
    signalStrength: Math.floor(Math.random() * 5) + 1,
    locationTrack,
    totalDistance,
    trackingStartTime,
    accuracy: Math.floor(Math.random() * 20) + 5 // 5-25米精度
  };
};

// 模拟网络数据生成函数
export const generateMockNetworkData = (): NetworkData => {
  const networks: Array<'4G' | '5G' | '3G'> = ['4G', '5G', '3G'];
  return {
    networkType: networks[Math.floor(Math.random() * networks.length)],
    signalStrength: Math.floor(Math.random() * 5) + 1,
    timestamp: new Date().toLocaleString('zh-CN')
  };
};

// 模拟资源使用数据生成函数
export const generateMockResourceData = (): ResourceData => {
  const packages = ['5G畅享套餐', '4G无限套餐', '流量王套餐', '商务套餐'];
  const packageName = packages[Math.floor(Math.random() * packages.length)];
  
  // 模拟不同的使用情况
  const scenarios = [
    // 正常使用
    {
      dataUsed: Math.random() * 15 + 5, // 5-20GB
      dataTotal: 30,
      voiceUsed: Math.random() * 200 + 50, // 50-250分钟
      voiceTotal: 300,
      smsUsed: Math.random() * 80 + 20, // 20-100条
      smsTotal: 100,
      speedLimit: '正常' as const
    },
    // 超套使用
    {
      dataUsed: Math.random() * 10 + 35, // 35-45GB (超过30GB)
      dataTotal: 30,
      voiceUsed: Math.random() * 100 + 320, // 320-420分钟 (超过300分钟)
      voiceTotal: 300,
      smsUsed: Math.random() * 50 + 110, // 110-160条 (超过100条)
      smsTotal: 100,
      speedLimit: Math.random() > 0.5 ? '限速' as const : '0速' as const
    },
    // 轻度使用
    {
      dataUsed: Math.random() * 5 + 1, // 1-6GB
      dataTotal: 30,
      voiceUsed: Math.random() * 50 + 10, // 10-60分钟
      voiceTotal: 300,
      smsUsed: Math.random() * 20 + 5, // 5-25条
      smsTotal: 100,
      speedLimit: '正常' as const
    }
  ];

  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  
  const dataUsed = Number(scenario.dataUsed.toFixed(2));
  const voiceUsed = Math.floor(scenario.voiceUsed);
  const smsUsed = Math.floor(scenario.smsUsed);
  const speedLimit = scenario.speedLimit;

  return {
    dataUsed,
    dataTotal: scenario.dataTotal,
    voiceUsed,
    voiceTotal: scenario.voiceTotal,
    smsUsed,
    smsTotal: scenario.smsTotal,
    isDataOverLimit: dataUsed > scenario.dataTotal,
    isVoiceOverLimit: voiceUsed > scenario.voiceTotal,
    isSmsOverLimit: smsUsed > scenario.smsTotal,
    speedLimit,
    packageName
  };
};

// 模拟账单数据生成函数
export const generateMockBillingData = (): BillingData => {
  const currentDate = new Date();
  const months = [];
  
  // 生成过去12个月的数据
  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthName = date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit' });
    
    // 模拟账单金额（基础套餐费 + 浮动使用费）
    const baseAmount = 68; // 基础套餐费
    const variableAmount = Math.random() * 50; // 0-50元浮动费用
    const amount = Number((baseAmount + variableAmount).toFixed(2));
    
    const status: '已缴费' | '未缴费' | '逾期' = i === 0 ? (Math.random() > 0.7 ? '未缴费' : '已缴费') : '已缴费';
    
    months.push({
      month: monthName,
      amount,
      status
    });
  }
  
  const currentMonth = months[months.length - 1];
  const previousMonth = months[months.length - 2];
  const sameMonthLastYear = months[0];
  
  // 计算环比和同比
  const currentVsPrevious = previousMonth ? 
    Number((((currentMonth.amount - previousMonth.amount) / previousMonth.amount) * 100).toFixed(1)) : 0;
  
  const currentVsSameLastYear = sameMonthLastYear ? 
    Number((((currentMonth.amount - sameMonthLastYear.amount) / sameMonthLastYear.amount) * 100).toFixed(1)) : 0;
  
  const totalAmount12Months = Number(months.reduce((sum, month) => sum + month.amount, 0).toFixed(2));
  const averageMonthlyAmount = Number((totalAmount12Months / 12).toFixed(2));
  
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 10);
  const dueDate = nextMonth.toLocaleDateString('zh-CN');
  
  return {
    currentMonth: {
      amount: currentMonth.amount,
      dueDate,
      status: currentMonth.status
    },
    last12Months: months,
    monthlyComparison: {
      currentVsPrevious,
      currentVsSameLastYear
    },
    totalAmount12Months,
    averageMonthlyAmount
  };
};