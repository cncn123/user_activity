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
import { CARD_THEMES } from "../../styles/theme";
import { buildThemeChipClasses } from "../../utils/themeStyles";
import { ThemedCard } from "./common";

interface AIProfileCardProps {
  userData: any;
}

export const AIProfileCard = ({ userData }: AIProfileCardProps) => {
  const [thinking, setThinking] = useState<string>("");
  const [finalAnswer, setFinalAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isStreamingThinking, setIsStreamingThinking] =
    useState<boolean>(false);
  const [isStreamingAnswer, setIsStreamingAnswer] = useState<boolean>(false);
  const lastClickRef = useRef<number>(0);
  const abortRef = useRef<AbortController | null>(null);
  const streamBufferRef = useRef<StreamBuffer | null>(null);

  const cardTheme = CARD_THEMES.AIProfile;
  const headerChipClasses = buildThemeChipClasses(cardTheme.base);

  // 清理显示内容中的think标签
  const cleanDisplayContent = (content: string): string => {
    return content
      .replace(/<think>/g, "")
      .replace(/<\/think>/g, "")
      .trim();
  };

  const generateProfile = async () => {
    // console.log("generateProfile 被调用");
    // console.log("用户数据:", userData);

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
      // console.log("开始调用 AI 服务...");

      let currentThinking = "";
      let currentAnswer = "";
      let inThinkingBlock = false;

      // 创建新的StreamBuffer实例
      streamBufferRef.current = new StreamBuffer(
        (chunk: string) => {
          // console.debug("chunk", chunk)
          
          // 检测思考块的开始
          if (chunk.includes("<think>")) {
            console.log("检测到<think>标签");
            inThinkingBlock = true;
            setIsStreamingThinking(true);
            setIsStreamingAnswer(false);
            
            // 处理<think>标签前的内容（如果有）
            const thinkStart = chunk.indexOf("<think>");
            const beforeThink = chunk.substring(0, thinkStart);
            if (beforeThink.trim()) {
              currentAnswer += beforeThink;
              setFinalAnswer(currentAnswer);
            }
            
            // 处理<think>标签后的内容
            const afterThinkTag = chunk.substring(thinkStart + 7);
            if (afterThinkTag) {
              currentThinking += afterThinkTag;
              setThinking(currentThinking);
              console.log("设置思考内容:", currentThinking);
            }
            return;
          }

          // 检测思考块的结束
          if (chunk.includes("</think>")) {
            console.log("检测到</think>标签");
            const thinkEnd = chunk.indexOf("</think>");
            
            // 处理</think>标签前的思考内容
            const thinkContent = chunk.substring(0, thinkEnd);
            if (thinkContent) {
              currentThinking += thinkContent;
              setThinking(currentThinking);
              console.log("完成思考内容:", currentThinking);
            }
            
            // 切换到答案模式
            inThinkingBlock = false;
            setIsStreamingThinking(false);
            setIsStreamingAnswer(true);
            
            // 处理</think>标签后的答案内容
            const afterThinkEnd = chunk.substring(thinkEnd + 8);
            if (afterThinkEnd.trim()) {
              // 清理可能的换行符和空格
              const cleanAnswer = afterThinkEnd.replace(/^\s+/, '');
              currentAnswer += cleanAnswer;
              setFinalAnswer(currentAnswer);
              console.log("开始答案内容:", currentAnswer);
            }
            return;
          }

          // 根据当前状态处理内容
          if (inThinkingBlock) {
            // 在思考块内，添加到思考内容
            currentThinking += chunk;
            setThinking(currentThinking);
            console.log("添加思考内容:", chunk, "总思考内容:", currentThinking);
          } else {
            // 在思考块外，添加到最终答案
            currentAnswer += chunk;
            setFinalAnswer(currentAnswer);
            console.log("添加答案内容:", chunk, "总答案内容:", currentAnswer);
          }
        },
        () => {
          // 流完成回调
          setIsStreamingThinking(false);
          setIsStreamingAnswer(false);
          setLoading(false);
        },
        1, // 缓存1个chunk
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
    <ThemedCard theme={cardTheme}>
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h3 className="text-xl font-extrabold text-white drop-shadow-sm flex items-center">
            <span
              className={`w-3 h-3 bg-${cardTheme.pulse}-400 rounded-full mr-3 animate-pulse shadow-lg`}
            ></span>
            <span className="text-white">AI 用户画像</span>
          </h3>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div
              className={`flex items-center ${headerChipClasses} px-3 py-1.5 rounded-full text-xs shadow-sm backdrop-blur-sm`}
            >
              <FontAwesomeIcon
                icon={faRobot}
                className={`mr-1.5 text-${cardTheme.base}-300`}
              />
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
                className={`p-2 rounded-full bg-${cardTheme.base}-500/20 hover:bg-${cardTheme.base}-500/30 border border-${cardTheme.base}-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-lg group-hover:scale-110 flex items-center justify-center`}
                title="重新生成"
                style={{ pointerEvents: "auto" }}
              >
                <FontAwesomeIcon
                  icon={faRotate}
                  className={`text-sm ${loading ? `text-${cardTheme.base}-300 animate-spin` : `text-${cardTheme.base}-300 hover:text-${cardTheme.base}-200`}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* AI 分析内容 */}
        <div className="flex flex-col flex-1 min-h-0">
          <div
            className={`bg-white/5 rounded-xl p-4 flex-1 min-h-0 overflow-y-auto border border-${cardTheme.base}-400/20`}
          >
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
                    className={`px-4 py-2 bg-${cardTheme.base}-500/20 hover:bg-${cardTheme.base}-500/30 rounded-lg border border-${cardTheme.base}-400/30 text-white text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed`}
                    style={{ pointerEvents: "auto" }}
                    disabled={loading}
                  >
                    重试
                  </button>
                </div>
              </div>
            ) : thinking || finalAnswer ? (
              <div className="space-y-4">
                {/* AI 思考过程 - 只在有思考内容时显示 */}
                {thinking && thinking.trim() && (
                  <div
                    className={`bg-${cardTheme.base}-500/10 border border-${cardTheme.base}-400/30 rounded-xl p-4`}
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-2 h-2 bg-${cardTheme.base}-400 rounded-full mr-2 animate-pulse`}
                      ></div>
                      <span
                        className={`text-${cardTheme.base}-200 text-sm font-medium`}
                      >
                        🤔 AI 思考过程
                      </span>
                      {isStreamingThinking && (
                        <div className="ml-2 flex items-center">
                          <span
                            className={`inline-block w-1 h-3 bg-${cardTheme.base}-400 animate-pulse`}
                          ></span>
                        </div>
                      )}
                      <div
                        className={`flex-1 ml-3 h-px bg-gradient-to-r from-${cardTheme.base}-400/30 to-transparent`}
                      ></div>
                    </div>
                    <div
                      className={`text-violet-100 text-xs leading-relaxed bg-${cardTheme.base}-500/20 rounded-lg p-3 border-l-2 border-${cardTheme.base}-400/50`}
                    >
                      <div
                        className={`text-${cardTheme.base}-200 whitespace-pre-wrap font-mono`}
                      >
                        {cleanDisplayContent(thinking)}
                        {isStreamingThinking && (
                          <span
                            className={`inline-block w-2 h-4 bg-${cardTheme.base}-400 animate-pulse ml-1`}
                          ></span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 分析结果 - 只在有最终答案时显示 */}
                {finalAnswer && finalAnswer.trim() && (
                  <div
                    className={`bg-${cardTheme.base}-500/10 border border-${cardTheme.base}-400/30 rounded-xl p-4`}
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-2 h-2 bg-${cardTheme.base}-400 rounded-full mr-2 animate-pulse`}
                      ></div>
                      <span
                        className={`text-${cardTheme.base}-200 text-sm font-medium`}
                      >
                        ✨ 分析结果
                      </span>
                      {isStreamingAnswer && (
                        <div className="ml-2 flex items-center">
                          <span
                            className={`inline-block w-1 h-3 bg-${cardTheme.base}-400 animate-pulse`}
                          ></span>
                        </div>
                      )}
                      <div
                        className={`flex-1 ml-3 h-px bg-gradient-to-r from-${cardTheme.base}-400/30 to-transparent`}
                      ></div>
                    </div>
                    <div
                      className={`text-white/95 text-sm leading-relaxed bg-${cardTheme.base}-500/20 rounded-lg p-4 border-l-2 border-${cardTheme.base}-400/50`}
                    >
                      {cleanDisplayContent(finalAnswer)}
                      {isStreamingAnswer && (
                        <span
                          className={`inline-block w-2 h-4 bg-${cardTheme.base}-400 animate-pulse ml-1`}
                        ></span>
                      )}
                    </div>
                  </div>
                )}

                {/* 加载状态 */}
                {loading && (
                  <div
                    className={`pt-4 border-t border-${cardTheme.base}-400/20`}
                  >
                    <div className="flex items-center justify-center">
                      <span
                        className={`text-${cardTheme.base}-300 text-xs font-medium bg-${cardTheme.base}-500/20 px-3 py-1.5 rounded-full border border-${cardTheme.base}-400/30`}
                      >
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
                  <div
                    className={`w-8 h-8 border-2 border-${cardTheme.base}-400 border-t-transparent rounded-full animate-spin`}
                  ></div>
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
                    className={`text-5xl mb-2 text-${cardTheme.base}-300`}
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
                    className={`px-6 py-3 bg-${cardTheme.base}-500/30 hover:bg-${cardTheme.base}-500/40 rounded-lg border border-${cardTheme.base}-400/50 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer`}
                    style={{ pointerEvents: "auto" }}
                  >
                    <span className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faRocket}
                        className={`text-${cardTheme.base}-300`}
                      />
                      <span>生成 AI 画像</span>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemedCard>
  );
};
