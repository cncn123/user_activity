// src/StreamChat.jsx
import { useState } from "react";

const StreamChat = () => {
  const [prompt, setPrompt] = useState(""); // 用户输入
  const [streamText, setStreamText] = useState(""); // 流式渲染的文本
  const [isLoading, setIsLoading] = useState(false); // 加载状态
  const [error, setError] = useState(""); // 错误信息

  // 发送请求并接收流
  const handleSend = async () => {
    if (!prompt.trim() || isLoading) return;

    // 重置状态
    setStreamText("");
    setError("");
    setIsLoading(true);

    try {
      // 1. 发送 POST 请求（传递 prompt），建立 SSE 连接
      const response = await fetch("http://localhost:3001/api/stream-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
        credentials: "include", // 如需跨域凭证可开启
      });

      if (!response.ok) throw new Error(`请求失败: ${response.status}`);

      // 2. 创建 EventSource 接收 SSE 流（注意：需后端支持 GET/POST，此处用 POST 需特殊处理）
      // （若浏览器不支持 POST 类型 EventSource，可改用 GET 传递 prompt 或用第三方库如 'eventsource-parser'）
      const eventSource = new EventSource(
        `http://localhost:3001/api/stream-chat?prompt=${encodeURIComponent(prompt.trim())}`,
      );

      // 3. 监听流消息
      eventSource.onmessage = (e) => {
        if (e.data === "[DONE]") {
          // 流结束，关闭连接
          eventSource.close();
          setIsLoading(false);
          return;
        }

        const { content, error: streamError } = JSON.parse(e.data);
        if (streamError) {
          setError(streamError);
          eventSource.close();
          setIsLoading(false);
          return;
        }

        // 实时追加文本（关键：流式显示）
        setStreamText((prev) => prev + content);
      };

      // 4. 监听连接错误
      eventSource.onerror = (err) => {
        setError("流式连接失败: " + err.message);
        eventSource.close();
        setIsLoading(false);
      };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "0 20px" }}>
      <h2>DeepSeek 流式聊天</h2>

      {/* 用户输入 */}
      <div style={{ marginBottom: "20px" }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="输入你的问题..."
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            fontSize: "16px",
          }}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          style={{
            marginTop: "10px",
            padding: "8px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? "发送中..." : "发送"}
        </button>
      </div>

      {/* 错误提示 */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      {/* 流式结果显示 */}
      <div
        style={{
          border: "1px solid #eee",
          padding: "20px",
          borderRadius: "8px",
          minHeight: "150px",
          whiteSpace: "pre-wrap", // 保留换行
        }}
      >
        {streamText || "等待响应..."}
      </div>
    </div>
  );
};

export default StreamChat;
