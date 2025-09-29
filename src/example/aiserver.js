// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors()); // 解决跨域（生产环境需限制 origin）
app.use(express.json());

// DeepSeek API 配置（替换为你的 API Key）
const DEEPSEEK_API_KEY = "your-deepseek-api-key";
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

// 流式请求接口
app.post("/api/stream-chat", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "缺少 prompt 参数" });
  }

  // 1. 配置 SSE 响应头
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    // 2. 调用 DeepSeek API（开启流式响应 stream: true）
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat", // DeepSeek 聊天模型（按官网更新）
        messages: [{ role: "user", content: prompt }],
        stream: true, // 关键：启用流式返回
        temperature: 0.7, // 随机性（0-1）
      }),
    });

    // 3. 处理 API 流式响应（逐块读取）
    if (!response.ok) throw new Error(`API 请求失败: ${response.status}`);

    // 监听 API 响应的数据流
    for await (const chunk of response.body) {
      // 解码二进制流为字符串
      const chunkStr = chunk.toString("utf-8");
      // 分割 SSE 格式的消息（DeepSeek 流式响应按 line 分割）
      const lines = chunkStr.split("\n").filter((line) => line.trim() !== "");

      for (const line of lines) {
        // 过滤掉非数据行（如 "data: [DONE]"）
        if (line.startsWith("data: ") && !line.includes("[DONE]")) {
          const data = JSON.parse(line.slice(6)); // 截取 "data: " 后的 JSON 内容
          // 提取当前流的文本内容
          const content = data.choices[0]?.delta?.content || "";
          if (content) {
            // 4. 通过 SSE 推送给前端（格式：data: 内容\n\n）
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
            // 强制刷新缓冲区，确保数据实时推送
            await new Promise((resolve) => res.flushHeaders(resolve));
          }
        }
      }
    }

    // 流式结束，发送关闭信号
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    // 错误处理：向前端推送错误信息
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }

  // 监听前端断开连接，清理资源
  req.on("close", () => {
    console.log("前端断开连接，终止流");
    res.end();
  });
});

// 启动服务
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`后端服务运行在 http://localhost:${PORT}`);
});
