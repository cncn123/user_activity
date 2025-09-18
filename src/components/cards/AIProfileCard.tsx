import { useRef, useState } from "react";
import AIService from "../../services/aiService";
import { StreamBuffer } from "../../utils/streamBuffer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faRotate,
  faRocket,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

interface AIProfileCardProps {
  userData: any;
}

export const AIProfileCard = ({ userData }: AIProfileCardProps) => {
  const [thinking, setThinking] = useState<string>("");
  const [finalAnswer, setFinalAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isStreamingThinking, setIsStreamingThinking] = useState<boolean>(false);
  const [isStreamingAnswer, setIsStreamingAnswer] = useState<boolean>(false);
  const lastClickRef = useRef<number>(0);
  const abortRef = useRef<AbortController | null>(null);
  const streamBufferRef = useRef<StreamBuffer | null>(null);

  const generateProfile = async () => {
    console.log("generateProfile 被调用");
    console.log("用户数据:", userData);

    setLoading(true);
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setError("");
    setThinking("");
    setFinalAnswer("");
    setIsStreamingThinking(false);
    setIsStreamingAnswer(false);

    // 销毁之前的StreamBuffer
    streamBufferRef.current?.destroy();

    try {
      console.log("开始调用 AI 服务...");

      let currentThinking = "";
      let currentAnswer = "";
      let inThinkingBlock = false;

      // 创建新的StreamBuffer实例
      streamBufferRef.current = new StreamBuffer(
        (chunk: string) => {
          let buffer = chunk;
          
          // 检测思考块的开始和结束
          if (buffer.includes("<think>")) {
            inThinkingBlock = true;
            setIsStreamingThinking(true);
            const thinkStart = buffer.indexOf("<think>") + 7;
            const beforeThink = buffer.substring(0, buffer.indexOf("<think>"));
            if (beforeThink && !inThinkingBlock) {
              currentAnswer += beforeThink;
              setFinalAnswer(currentAnswer);
            }
            buffer = buffer.substring(thinkStart);
          }

          if (buffer.includes("</think>")) {
            const thinkEnd = buffer.indexOf("</think>");
            const thinkContent = buffer.substring(0, thinkEnd);
            currentThinking += thinkContent;
            setThinking(currentThinking);
            setIsStreamingThinking(false);
            setIsStreamingAnswer(true);
            buffer = buffer.substring(thinkEnd + 8);
            inThinkingBlock = false;
          }

          if (inThinkingBlock) {
            currentThinking += buffer;
            setThinking(currentThinking);
          } else {
            currentAnswer += buffer;
            setFinalAnswer(currentAnswer);
          }
        },
        () => {
          // 流完成回调
          setIsStreamingThinking(false);
          setIsStreamingAnswer(false);
          setLoading(false);
        },
        3, // 缓存3个chunk
        80  // 每80ms输出一个chunk
      );

      // 获取流式响应
      const response = await AIService.generateUserProfileStream(userData);
      
      if (response.body) {
        await streamBufferRef.current.processStream(response.body);
      }

    } catch (err) {
      setError("生成用户画像失败，请稍后重试");
      console.error("AI Profile generation error:", err);
      setLoading(false);
      setIsStreamingThinking(false);
      setIsStreamingAnswer(false);
    }
  };

  const handleRefresh = () => {
    const now = Date.now();
    if (loading) return;
    if (now - lastClickRef.current < 800) return;
    lastClickRef.current = now;
    setThinking("");
    setFinalAnswer("");
    setError("");
    generateProfile();
  };

  return (
    <div className="h-full w-full flex flex-col p-6 text-white rounded-3xl glass-card-violet shadow-2xl">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span className="w-3 h-3 bg-violet-400 rounded-full mr-3 animate-pulse shadow-lg"></span>
            <span className="text-white">AI 用户画像</span>
          </h3>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="flex items-center bg-violet-500/20 text-violet-200 px-3 py-1.5 rounded-full text-xs border border-violet-400/30 shadow-sm backdrop-blur-sm">
              <FontAwesomeIcon icon={faRobot} className="mr-1.5 text-violet-300" />
              <span className="font-mono mr-2">
                {new Date().toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-xs font-medium">· DeepSeek 分析</span>
            </div>
            <div className="relative group flex-shrink-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRefresh();
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                disabled={loading}
                className="p-2 rounded-full bg-violet-500/20 hover:bg-violet-500/30 border border-violet-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-lg group-hover:scale-110 flex items-center justify-center"
                title="重新生成"
                style={{ pointerEvents: "auto" }}
              >
                <FontAwesomeIcon
                  icon={faRotate}
                  className={`text-sm ${loading ? "text-violet-300 animate-spin" : "text-violet-300 hover:text-violet-200"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* AI 分析内容 */}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="bg-white/5 rounded-xl p-4 flex-1 min-h-0 overflow-y-auto border border-violet-400/20">
            {error ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center space-y-3 text-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-2xl text-yellow-300"
                  />
                  <span className="text-red-300 text-sm">{error}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRefresh();
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 rounded-lg border border-violet-400/30 text-white text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ pointerEvents: "auto" }}
                    disabled={loading}
                  >
                    重试
                  </button>
                </div>
              </div>
            ) : thinking || finalAnswer ? (
              <div className="space-y-4">
                {/* AI 分析过程和结果 */}
                {(thinking || finalAnswer) && (
                  <div className="bg-white/5 border border-violet-400/20 rounded-xl p-4">
                    {/* AI 思考过程 */}
                    {thinking && (
                      <div className="mb-4">
                        <div className="flex items-center mb-3">
                          <div className="w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-violet-200 text-sm font-medium">
                            AI 思考过程
                          </span>
                          {isStreamingThinking && (
                            <div className="ml-2 flex items-center">
                              <span className="inline-block w-1 h-3 bg-violet-400 animate-pulse"></span>
                            </div>
                          )}
                          <div className="flex-1 ml-3 h-px bg-gradient-to-r from-violet-400/30 to-transparent"></div>
                        </div>
                        <div className="text-violet-100 text-xs leading-relaxed bg-violet-500/10 rounded-lg p-3 border-l-2 border-violet-400/40">
                          <div className="text-violet-200 whitespace-pre-wrap font-mono">
                            {thinking}
                            {isStreamingThinking && (
                              <span className="inline-block w-2 h-4 bg-violet-400 animate-pulse ml-1"></span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 最终回答 */}
                    {finalAnswer && (
                      <div>
                        <div className="flex items-center mb-3">
                          <div className="w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-violet-200 text-sm font-medium">
                            分析结果
                          </span>
                          {isStreamingAnswer && (
                            <div className="ml-2 flex items-center">
                              <span className="inline-block w-1 h-3 bg-violet-400 animate-pulse"></span>
                            </div>
                          )}
                          <div className="flex-1 ml-3 h-px bg-gradient-to-r from-violet-400/30 to-transparent"></div>
                        </div>
                        <div className="text-white/90 text-sm leading-relaxed">
                          {finalAnswer}
                          {isStreamingAnswer && (
                            <span className="inline-block w-2 h-4 bg-violet-400 animate-pulse ml-1"></span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 加载状态 */}
                {loading && (
                  <div className="pt-4 border-t border-violet-400/20">
                    <div className="flex items-center justify-center">
                      <span className="text-violet-300 text-xs font-medium bg-violet-500/20 px-3 py-1.5 rounded-full border border-violet-400/30">
                        {isStreamingThinking
                          ? "AI 正在思考..."
                          : isStreamingAnswer
                            ? "正在生成答案..."
                            : "正在分析..."}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-8 h-8 border-2 border-violet-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-white/80 text-sm">
                    {isStreamingThinking
                      ? "AI 正在思考..."
                      : isStreamingAnswer
                        ? "正在生成答案..."
                        : "AI 正在分析用户画像..."}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="text-5xl mb-2 text-violet-300"
                  />
                  <h4 className="text-white font-bold text-lg">
                    AI 用户画像分析
                  </h4>
                  <p className="text-white/70 text-sm mb-4 max-w-xs">
                    点击下方按钮，让 AI 分析用户的行为模式、消费习惯和使用偏好
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      generateProfile();
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                    }}
                    className="px-6 py-3 bg-violet-500/30 hover:bg-violet-500/40 rounded-lg border border-violet-400/50 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                    style={{ pointerEvents: "auto" }}
                  >
                    <span className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faRocket} className="text-violet-300" />
                      <span>生成 AI 画像</span>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};