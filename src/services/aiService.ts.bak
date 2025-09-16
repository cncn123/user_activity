interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIRequest {
  model: string;
  stream: boolean;
  messages: AIMessage[];
  max_tokens?: number;
  temperature?: number;
}


const AI_CONFIG = {
  baseURL: '/api/open/router/v1/chat/completions',
  apiKey: 'ME-sk-4MqV2D/E45rOP2U8/G7bvQ==-X0SPG60S1jduKeDpUWMaQVyJofVHR1IZ',
  model: 'deepseek-r1-671b-0414'
};

export class AIService {
  static async generateUserProfile(
    userData: any, 
    onProgress?: (chunk: string) => void
  ): Promise<string> {
    console.log('AIService.generateUserProfile 被调用');
    console.log('接收到的用户数据:', userData);
    
    try {
      // 首先测试网络连接
      try {
        const testResponse = await fetch('/api/open/router/v1/models', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${AI_CONFIG.apiKey}`
          },
          mode: 'cors',
          credentials: 'omit'
        });
        console.log('网络测试响应:', testResponse.status);
      } catch (testError) {
        console.warn('网络测试失败:', testError);
      }

      const prompt = this.buildUserProfilePrompt(userData);
      console.log('生成的提示词:', prompt);
      
      const requestData: AIRequest = {
        model: AI_CONFIG.model,
        stream: true, // 启用流式响应
        messages: [
          {
            role: 'system',
            content: '你是一个专业的用户行为分析师，擅长根据用户的位置、网络、资源使用和账单数据来生成准确的用户画像。请用简洁专业的语言描述用户特征，控制在150字以内。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      };

      console.log('发送的请求数据:', requestData);

      const response = await fetch(AI_CONFIG.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
          'Accept': 'text/event-stream',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(requestData),
        mode: 'cors',
        credentials: 'omit'
      });

      console.log('HTTP 响应状态:', response.status);
      console.log('HTTP 响应头:', response.headers);
      console.log('响应类型:', response.type);

      if (!response.ok) {
        const errorText = await response.text().catch(() => '无法读取错误信息');
        console.error('API错误详情:', errorText);
        throw new Error(`AI API 请求失败: ${response.status} ${response.statusText}\n详情: ${errorText}`);
      }

      if (!response.body) {
        throw new Error('响应体为空');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      let buffer = '';

      try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          
          // 按行分割，保留最后一个可能不完整的行
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // 保存最后一行（可能不完整）
          
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data: ')) {
              const data = trimmedLine.slice(6).trim();
              
              if (data === '[DONE]' || data === '') {
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                  const content = parsed.choices[0].delta.content;
                  fullResponse += content;
                  
                  // 调用进度回调
                  if (onProgress) {
                    onProgress(content);
                  }
                }
              } catch (parseError) {
                // 忽略解析错误，可能是不完整的数据块
                console.debug('跳过无效数据块:', data.substring(0, 50) + '...');
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      console.log('完整响应:', fullResponse);
      return fullResponse || '生成的用户画像内容为空';
      
    } catch (error) {
      console.error('AI 用户画像生成失败:', error);
      
      // 如果API不可用，使用模拟流式响应作为备用方案
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.log('网络错误，使用模拟流式响应...');
        return this.simulateStreamResponse(userData, onProgress);
      }
      
      throw error;
    }
  }

  // 模拟流式响应的备用方案
  private static async simulateStreamResponse(
    userData: any, 
    onProgress?: (chunk: string) => void
  ): Promise<string> {
    const mockResponse = this.generateMockProfile(userData);
    const words = mockResponse.split('');
    let result = '';

    for (let i = 0; i < words.length; i++) {
      const chunk = words[i];
      result += chunk;
      
      if (onProgress) {
        onProgress(chunk);
      }
      
      // 模拟打字机效果
      await new Promise(resolve => setTimeout(resolve, 30));
    }

    return result;
  }

  // 生成模拟用户画像
  private static generateMockProfile(userData: any): string {
    const {
      location = '未知位置',
      networkType = '未知',
      dataUsed = 0,
      dataTotal = 1,
      billingHistory = []
    } = userData;

    const dataUsageRate = dataTotal > 0 ? Math.round((dataUsed / dataTotal) * 100) : 0;
    const avgBill = billingHistory.length > 0 ? 
      billingHistory.reduce((sum: number, bill: any) => sum + (bill.amount || 0), 0) / billingHistory.length : 0;

    const profiles = [
      `该用户是一位${networkType === '5G' ? '科技敏感' : '稳重实用'}型用户，主要活动区域在${location}。数据使用率达${dataUsageRate}%，显示出${dataUsageRate > 70 ? '高频' : '适度'}的网络使用习惯。月均消费${avgBill.toFixed(0)}元，属于${avgBill > 200 ? '高价值' : '标准'}用户群体。消费行为规律，缴费及时，是运营商的优质客户。建议提供${networkType === '5G' ? '5G增值服务' : '性价比套餐'}以提升用户满意度。`,
      
      `基于行为数据分析，该用户展现出典型的${location.includes('CBD') || location.includes('中心') ? '商务人士' : '生活型用户'}特征。网络偏好${networkType}，数据消费模式显示${dataUsageRate > 50 ? '重度' : '轻度'}使用倾向。账单稳定在${avgBill.toFixed(0)}元左右，支付习惯良好。用户价值较高，建议针对性推荐${dataUsageRate > 70 ? '无限流量' : '精准流量'}套餐，并关注其潜在的增值服务需求。`,
      
      `该用户画像显示其为${networkType === '4G' ? '稳健型' : '尝新型'}消费者，地理活动集中在${location}区域。数据使用呈现${dataUsageRate}%的适中水平，体现理性消费观念。近期账单均值${avgBill.toFixed(0)}元，缴费记录优良。综合评估为中高价值客户，具备良好的服务升级潜力，建议提供个性化的套餐优化建议。`
    ];

    return profiles[Math.floor(Math.random() * profiles.length)];
  }

  private static buildUserProfilePrompt(userData: any): string {
    const {
      location = '未知位置',
      networkType = '未知',
      signalStrength = 0,
      isRoaming = false,
      locationTrack = [],
      dataUsed = 0,
      dataTotal = 1,
      voiceUsed = 0,
      voiceTotal = 1,
      smsUsed = 0,
      smsTotal = 1,
      billingHistory = []
    } = userData;

    // 计算使用模式
    const dataUsageRate = dataTotal > 0 ? ((dataUsed / dataTotal) * 100).toFixed(1) : '0.0';
    const voiceUsageRate = voiceTotal > 0 ? ((voiceUsed / voiceTotal) * 100).toFixed(1) : '0.0';
    const smsUsageRate = smsTotal > 0 ? ((smsUsed / smsTotal) * 100).toFixed(1) : '0.0';

    // 分析位置行为
    const uniqueLocations = locationTrack.length > 0 ? [...new Set(locationTrack.map((track: any) => track.location))] : ['暂无数据'];
    const roamingCount = locationTrack.length > 0 ? locationTrack.filter((track: any) => track.isRoaming).length : 0;
    const roamingRate = locationTrack.length > 0 ? ((roamingCount / locationTrack.length) * 100).toFixed(1) : '0.0';

    // 分析消费行为
    const recentBills = billingHistory.length > 0 ? billingHistory.slice(-3) : [];
    const avgBill = recentBills.length > 0 ? recentBills.reduce((sum: number, bill: any) => sum + (bill.amount || 0), 0) / recentBills.length : 0;

    return `
请根据以下用户数据生成一个简洁的用户画像总结（控制在150字以内）：

**基本信息：**
- 当前位置：${location}
- 网络制式：${networkType}
- 信号强度：${signalStrength}/5
- 漫游状态：${isRoaming ? '是' : '否'}

**使用行为：**
- 数据使用率：${dataUsageRate}% (${dataUsed}GB/${dataTotal}GB)
- 语音使用率：${voiceUsageRate}% (${voiceUsed}分钟/${voiceTotal}分钟)
- 短信使用率：${smsUsageRate}% (${smsUsed}条/${smsTotal}条)

**位置行为：**
- 活动范围：${uniqueLocations.length}个不同地点
- 漫游频率：${roamingRate}%
- 主要活动地点：${uniqueLocations.slice(0, 3).join('、')}

**消费特征：**
- 近期平均账单：${avgBill.toFixed(0)}元
- 缴费状态：${billingHistory.length > 0 ? (billingHistory[billingHistory.length - 1]?.status || '正常') : '暂无数据'}

请生成一个专业的用户画像总结，重点分析用户的使用习惯、行为特征和消费模式。
    `.trim();
  }
}

export default AIService;