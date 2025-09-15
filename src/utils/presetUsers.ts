import { LocationData, NetworkData, ResourceData, BillingData } from '../types/customer';

// 用户1: 商务精英
export const businessUser = {
  location: {
    location: "CBD商务区",
    networkType: "5G",
    signalStrength: 5,
    isRoaming: false,
    timestamp: new Date().toISOString(),
    locationTrack: [
      {
        location: "CBD商务区",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        duration: 120,
        isRoaming: false
      },
      {
        location: "国际机场",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        duration: 45,
        isRoaming: false
      },
      {
        location: "高铁站",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        duration: 30,
        isRoaming: true
      },
      {
        location: "会议中心",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        duration: 180,
        isRoaming: false
      }
    ]
  } as LocationData,
  
  network: {
    networkType: "5G",
    signalStrength: 5,
    timestamp: new Date().toISOString()
  } as NetworkData,
  
  resource: {
    dataUsed: 45.8,
    dataTotal: 50.0,
    voiceUsed: 680,
    voiceTotal: 1000,
    smsUsed: 45,
    smsTotal: 100,
    isDataOverLimit: false,
    isVoiceOverLimit: false,
    isSmsOverLimit: false,
    speedLimit: '正常' as const,
    packageName: '5G无限流量套餐',
    timestamp: new Date().toISOString()
  } as ResourceData,
  
  billing: {
    currentMonth: {
      amount: 332,
      dueDate: "2025-01-15",
      status: "已缴费"
    },
    last12Months: [
      { month: "2024-01", amount: 299, status: "已缴费" },
      { month: "2024-02", amount: 315, status: "已缴费" },
      { month: "2024-03", amount: 288, status: "已缴费" },
      { month: "2024-04", amount: 342, status: "已缴费" },
      { month: "2024-05", amount: 298, status: "已缴费" },
      { month: "2024-06", amount: 325, status: "已缴费" },
      { month: "2024-07", amount: 310, status: "已缴费" },
      { month: "2024-08", amount: 295, status: "已缴费" },
      { month: "2024-09", amount: 305, status: "已缴费" },
      { month: "2024-10", amount: 318, status: "已缴费" },
      { month: "2024-11", amount: 289, status: "已缴费" },
      { month: "2024-12", amount: 332, status: "已缴费" }
    ],
    monthlyComparison: {
      currentVsPrevious: 14.9,
      currentVsSameLastYear: 11.7
    },
    totalAmount12Months: 3716,
    averageMonthlyAmount: 309.67,
    timestamp: new Date().toISOString()
  } as BillingData
};

// 用户2: 学生用户
export const studentUser = {
  location: {
    location: "大学城",
    networkType: "4G",
    signalStrength: 4,
    isRoaming: false,
    timestamp: new Date().toISOString(),
    locationTrack: [
      {
        location: "大学城",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        duration: 240,
        isRoaming: false
      },
      {
        location: "图书馆",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        duration: 180,
        isRoaming: false
      },
      {
        location: "食堂",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        duration: 30,
        isRoaming: false
      },
      {
        location: "宿舍区",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        duration: 480,
        isRoaming: false
      }
    ]
  } as LocationData,
  
  network: {
    networkType: "4G",
    signalStrength: 4,
    timestamp: new Date().toISOString()
  } as NetworkData,
  
  resource: {
    dataUsed: 28.5,
    dataTotal: 30.0,
    voiceUsed: 320,
    voiceTotal: 500,
    smsUsed: 15,
    smsTotal: 50,
    isDataOverLimit: false,
    isVoiceOverLimit: false,
    isSmsOverLimit: false,
    speedLimit: '正常' as const,
    packageName: '4G精准流量套餐',
    timestamp: new Date().toISOString()
  } as ResourceData,
  
  billing: {
    currentMonth: {
      amount: 94,
      dueDate: "2025-01-15",
      status: "已缴费"
    },
    last12Months: [
      { month: "2024-01", amount: 89, status: "已缴费" },
      { month: "2024-02", amount: 92, status: "已缴费" },
      { month: "2024-03", amount: 88, status: "已缴费" },
      { month: "2024-04", amount: 95, status: "已缴费" },
      { month: "2024-05", amount: 87, status: "已缴费" },
      { month: "2024-06", amount: 91, status: "已缴费" },
      { month: "2024-07", amount: 89, status: "已缴费" },
      { month: "2024-08", amount: 93, status: "已缴费" },
      { month: "2024-09", amount: 86, status: "已缴费" },
      { month: "2024-10", amount: 90, status: "已缴费" },
      { month: "2024-11", amount: 88, status: "已缴费" },
      { month: "2024-12", amount: 94, status: "已缴费" }
    ],
    monthlyComparison: {
      currentVsPrevious: 6.8,
      currentVsSameLastYear: 5.6
    },
    totalAmount12Months: 1088,
    averageMonthlyAmount: 90.67,
    timestamp: new Date().toISOString()
  } as BillingData
};

// 用户3: 居家用户
export const homeUser = {
  location: {
    location: "住宅区",
    networkType: "4G",
    signalStrength: 3,
    isRoaming: false,
    timestamp: new Date().toISOString(),
    locationTrack: [
      {
        location: "住宅区",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        duration: 360,
        isRoaming: false
      },
      {
        location: "超市",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        duration: 45,
        isRoaming: false
      },
      {
        location: "社区公园",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        duration: 60,
        isRoaming: false
      },
      {
        location: "医院",
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        duration: 90,
        isRoaming: false
      }
    ]
  } as LocationData,
  
  network: {
    networkType: "4G", 
    signalStrength: 3,
    timestamp: new Date().toISOString()
  } as NetworkData,
  
  resource: {
    dataUsed: 12.3,
    dataTotal: 20.0,
    voiceUsed: 450,
    voiceTotal: 600,
    smsUsed: 25,
    smsTotal: 100,
    isDataOverLimit: false,
    isVoiceOverLimit: false,
    isSmsOverLimit: false,
    speedLimit: '正常' as const,
    packageName: '4G经济套餐',
    timestamp: new Date().toISOString()
  } as ResourceData,
  
  billing: {
    currentMonth: {
      amount: 136,
      dueDate: "2025-01-15",
      status: "已缴费"
    },
    last12Months: [
      { month: "2024-01", amount: 128, status: "已缴费" },
      { month: "2024-02", amount: 135, status: "已缴费" },
      { month: "2024-03", amount: 125, status: "已缴费" },
      { month: "2024-04", amount: 142, status: "已缴费" },
      { month: "2024-05", amount: 130, status: "已缴费" },
      { month: "2024-06", amount: 138, status: "已缴费" },
      { month: "2024-07", amount: 127, status: "已缴费" },
      { month: "2024-08", amount: 145, status: "已缴费" },
      { month: "2024-09", amount: 132, status: "已缴费" },
      { month: "2024-10", amount: 140, status: "已缴费" },
      { month: "2024-11", amount: 129, status: "已缴费" },
      { month: "2024-12", amount: 136, status: "已缴费" }
    ],
    monthlyComparison: {
      currentVsPrevious: 5.4,
      currentVsSameLastYear: 6.3
    },
    totalAmount12Months: 1622,
    averageMonthlyAmount: 135.17,
    timestamp: new Date().toISOString()
  } as BillingData
};

export const getUserData = (userKey: string) => {
  switch (userKey) {
    case "商务精英":
      return businessUser;
    case "学生用户":
      return studentUser;
    case "居家用户":
      return homeUser;
    default:
      return businessUser;
  }
};