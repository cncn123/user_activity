// 客户信息卡片通用类型定义

export interface LocationTrackPoint {
  location: string;
  timestamp: string;
  duration: number; // 在此位置停留的分钟数
  isRoaming: boolean;
}

export interface LocationData {
  location: string;
  networkType: '4G' | '5G' | '3G';
  isRoaming: boolean;
  timestamp: string;
  signalStrength: number;
  locationTrack: LocationTrackPoint[]; // 位置轨迹历史
  totalDistance: number; // 总移动距离(km)
  trackingStartTime: string; // 轨迹开始追踪时间
  accuracy: number; // GPS精度(米)
}

export interface ResourceData {
  dataUsed: number; // GB
  dataTotal: number; // GB
  voiceUsed: number; // 分钟
  voiceTotal: number; // 分钟
  smsUsed: number;
  smsTotal: number;
  isDataOverLimit: boolean;
  isVoiceOverLimit: boolean;
  isSmsOverLimit: boolean;
  speedLimit: '正常' | '限速' | '0速';
  packageName: string;
}

export interface BillingData {
  currentMonth: {
    amount: number;
    dueDate: string;
    status: '已缴费' | '未缴费' | '逾期';
  };
  last12Months: Array<{
    month: string;
    amount: number;
    status: '已缴费' | '未缴费' | '逾期';
  }>;
  monthlyComparison: {
    currentVsPrevious: number; // 环比百分比
    currentVsSameLastYear: number; // 同比百分比
  };
  totalAmount12Months: number;
  averageMonthlyAmount: number;
}

export interface NetworkData extends Pick<LocationData, 'networkType' | 'signalStrength' | 'timestamp'> {
  // 网络卡片特有属性可以在此扩展
}