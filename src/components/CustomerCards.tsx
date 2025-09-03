import { useState, useEffect } from 'react';
import { LocationCard } from './cards/LocationCard';
import { NetworkCard } from './cards/NetworkCard';
import { ResourceCard } from './cards/ResourceCard';
import { BillingCard } from './cards/BillingCard';
import { SummaryCard } from './cards/SummaryCard';
import { 
  generateMockLocationData, 
  generateMockNetworkData, 
  generateMockResourceData, 
  generateMockBillingData 
} from '../utils/mockData';
import { LocationData, NetworkData, ResourceData, BillingData } from '../types/customer';

interface CustomerCardsProps {
  cardType: 'location' | 'network' | 'summary' | 'resource' | 'billing';
}

export const CustomerCards = ({ cardType }: CustomerCardsProps) => {
  const [locationData, setLocationData] = useState<LocationData>(generateMockLocationData());
  const [networkData, setNetworkData] = useState<NetworkData>(generateMockNetworkData());
  const [resourceData, setResourceData] = useState<ResourceData>(generateMockResourceData());
  const [billingData, setBillingData] = useState<BillingData>(generateMockBillingData());

  // 模拟数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setLocationData(generateMockLocationData());
      setNetworkData(generateMockNetworkData());
      setResourceData(generateMockResourceData());
      setBillingData(generateMockBillingData());
    }, 8000); // 每8秒更新一次

    return () => clearInterval(interval);
  }, []);

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
    
    default:
      return <SummaryCard data={locationData} />;
  }
};