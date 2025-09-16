import React, { useEffect, useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { TabKey, UserKey } from "../types";
import {
  ContactLayouts,
  AboutLayout,
  ProjectsLayouts,
  keys,
} from "../utils/layout.helper";
import { CustomerCards } from "./CustomerCards";

interface LayoutProps {
  tab: TabKey;
  setTab: React.Dispatch<React.SetStateAction<TabKey>>;
  selectedUser: UserKey;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserKey>>;
  left?: number;
  sliderWidth?: number;
}

function Layout({ tab, selectedUser, setSelectedUser }: LayoutProps) {
  const [currentlayout, setCurrentLayout] = useState(AboutLayout);

  useEffect(() => {
    switch (tab) {
      case TabKey.kexiang:
        setCurrentLayout(ProjectsLayouts);
        break;
      case TabKey.kejikegan:
        setCurrentLayout(AboutLayout);
        break;
      case TabKey.keji:
        setCurrentLayout(ContactLayouts);
        break;
      default:
        setCurrentLayout(AboutLayout);
    }
  }, [tab]);

  const ResponsiveReactGridLayout = useMemo(
    () => WidthProvider(Responsive),
    [],
  );

  return (
    <div className="flex h-screen">
      {/* 左侧悬浮导航栏 - 紧凑自适应设计 */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 w-48 z-50">
        <div className="flex flex-col space-y-3">
          {/* 用户选择按钮 */}
          {Object.values(UserKey).map((user, index) => {
            const userLabels = ["商务用户", "学生用户", "家庭用户"];
            const isActive = selectedUser === user;

            // 为不同用户类型设置不同的颜色
            const colorClasses = [
              "from-blue-400/30 to-blue-500/30 border-blue-400/50",
              "from-emerald-400/30 to-emerald-500/30 border-emerald-400/50",
              "from-purple-400/30 to-purple-500/30 border-purple-400/50",
            ];

            return (
              <button
                key={user}
                onClick={() => setSelectedUser(user as UserKey)}
                className={`flex items-center p-3 rounded-xl transition-all duration-300 text-left group relative overflow-hidden border backdrop-blur-sm shadow-lg hover:scale-105 ${
                  isActive
                    ? `bg-gradient-to-r ${colorClasses[index]} text-white scale-105`
                    : `bg-white/10 border-white/20 text-white/80 hover:bg-white/15 hover:text-white`
                }`}
              >
                {/* 背景光效 */}
                {isActive && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${colorClasses[index]} rounded-xl`}
                  ></div>
                )}

                {/* 文字内容 */}
                <div className="relative z-10 flex-1 min-w-0">
                  <div className="font-semibold text-sm">
                    {userLabels[index]}
                  </div>
                </div>

                {/* 右侧箭头指示器 */}
                <div
                  className={`relative z-10 ml-2 transition-all duration-300 ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-auto flex justify-center">
        <div className="w-full max-w-7xl px-6 py-6">
          <ResponsiveReactGridLayout
            className="w-full"
            breakpoints={{ xl: 1920, lg: 1200, md: 768, sm: 480, xs: 200 }}
            cols={{ xl: 4, lg: 4, md: 2, sm: 2, xs: 2 }}
            rowHeight={300}
            layouts={currentlayout}
          >
            {keys.map((key) => (
              <div
                key={key}
                className="flex justify-center items-center shadow-[inset_0_0_0_2px_rgba(0,0,0,0)] rounded-3xl text-2xl text-[#FFFFFF] visible cursor-grab active:cursor-grabbing fade-in ios-hover ambient-light glass-glow"
              >
                <Block keyProp={"Tile " + key} selectedUser={selectedUser} />
              </div>
            ))}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    </div>
  );
}

const Block = React.memo(
  ({ keyProp, selectedUser }: { keyProp: string; selectedUser: UserKey }) => {
    const [label, keyPart] = keyProp.split(" ");

    // 特定卡片显示客户信息
    if (keyProp === "Tile a") {
      return (
        <CustomerCards cardType="ai-profile" selectedUser={selectedUser} />
      );
    }
    if (keyProp === "Tile b") {
      return <CustomerCards cardType="network" selectedUser={selectedUser} />;
    }
    if (keyProp === "Tile c") {
      return <CustomerCards cardType="summary" selectedUser={selectedUser} />;
    }
    if (keyProp === "Tile d") {
      return <CustomerCards cardType="resource" selectedUser={selectedUser} />;
    }
    if (keyProp === "Tile e") {
      return <CustomerCards cardType="billing" selectedUser={selectedUser} />;
    }
    if (keyProp === "Tile f") {
      return <CustomerCards cardType="location" selectedUser={selectedUser} />;
    }

    return (
      <div className="h-full w-full flex flex-col justify-center items-center p-6 text-white rounded-3xl glass-morphism">
        <span>
          <span className="normal-case">{label}</span>{" "}
          <span className="uppercase">{keyPart}</span>
        </span>
      </div>
    );
  },
);

export default Layout;
