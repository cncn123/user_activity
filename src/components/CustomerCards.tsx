import { useMemo } from 'react';
import { LocationCard } from './cards/LocationCard';
import { NetworkCard } from './cards/NetworkCard';
import { ResourceCard } from './cards/ResourceCard';
import { BillingCard } from './cards/BillingCard';
import { SummaryCard } from './cards/SummaryCard';
import { AIProfileCard } from './cards/AIProfileCard';
import { getUserData } from '../utils/presetUsers';
import { UserKey } from '../App';

interface CustomerCardsProps {
  cardType: 'location' | 'network' | 'summary' | 'resource' | 'billing' | 'ai-profile';
  selectedUser: UserKey;
}

export const CustomerCards = ({ cardType, selectedUser }: CustomerCardsProps) => {
  // 根据选中的用户获取对应的预设数据
  const userData = useMemo(() => {
    return getUserData(selectedUser);
  }, [selectedUser]);

  const { location: locationData, network: networkData, resource: resourceData, billing: billingData } = userData;

  // 根据卡片类型渲染对应组件
  switch (cardType) {
    case 'location':
      return <LocationCard data={locationData} />;
    
    case 'network':
      return <NetworkCard data={networkData} />;
    
    case 'resource':
      return <ResourceCard data={resourceData} />;
    
    case 'billing':
      return <BillingCard data={billingData} />;
    
    case 'summary':
      return <SummaryCard data={locationData} />;
    
    case 'ai-profile': {
      // 合并所有数据用于 AI 分析
      const combinedData = {
        ...locationData,
        ...networkData,
        ...resourceData,
        billingHistory: billingData.last12Months,
        currentBilling: billingData.currentMonth
      };
      return <AIProfileCard userData={combinedData} />;
    }
    
    default:
      return <SummaryCard data={locationData} />;
  }
};