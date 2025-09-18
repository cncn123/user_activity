export class StreamBuffer {
  private buffer: string[] = [];
  private bufferSize: number;
  private isOutputting = false;
  private outputInterval: NodeJS.Timeout | null = null;
  private onChunk: (chunk: string) => void;
  private onComplete: () => void;
  private outputSpeed: number;

  constructor(
    onChunk: (chunk: string) => void,
    onComplete: () => void,
    bufferSize = 3,
    outputSpeed = 50
  ) {
    this.onChunk = onChunk;
    this.onComplete = onComplete;
    this.bufferSize = bufferSize;
    this.outputSpeed = outputSpeed;
  }

  async processStream(response: ReadableStream<Uint8Array>): Promise<void> {
    const reader = response.getReader();
    const decoder = new TextDecoder();
    let isStreamComplete = false;
    let buffer = "";

    try {
      // 处理SSE流
      while (!isStreamComplete) {
        const { value, done } = await reader.read();
        if (done) {
          isStreamComplete = true;
          break;
        }
        
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        
        // 按行分割，保留最后一个可能不完整的行
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        
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
                
                // 将内容按字符分割，加入缓存
                const characters = content.split('');
                characters.forEach(char => {
                  if (char.trim() || char === ' ') {
                    this.buffer.push(char);
                  }
                });

                // 如果缓存达到指定大小，开始输出
                if (this.buffer.length >= this.bufferSize && !this.isOutputting) {
                  this.startOutput();
                }
              }
            } catch (parseError) {
              console.debug('跳过无效数据块:', data.substring(0, 50) + '...');
            }
          }
        }
      }

      // 开始输出剩余内容（如果还没开始输出）
      if (!this.isOutputting && this.buffer.length > 0) {
        this.startOutput();
      }

      // 等待所有缓存输出完成
      while (this.buffer.length > 0 || this.isOutputting) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }

    } catch (error) {
      console.error('Stream processing error:', error);
      this.stopOutput();
    } finally {
      reader.releaseLock();
    }
  }

  private startOutput(): void {
    if (this.isOutputting) return;
    
    this.isOutputting = true;
    this.outputInterval = setInterval(() => {
      if (this.buffer.length === 0) {
        this.stopOutput();
        this.onComplete();
        return;
      }
      
      const chunk = this.buffer.shift();
      if (chunk) {
        this.onChunk(chunk);
      }
    }, this.outputSpeed);
  }

  private stopOutput(): void {
    if (this.outputInterval) {
      clearInterval(this.outputInterval);
      this.outputInterval = null;
    }
    this.isOutputting = false;
  }

  public destroy(): void {
    this.stopOutput();
    this.buffer = [];
  }
}