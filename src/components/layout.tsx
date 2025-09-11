import React, { useEffect, useMemo, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { TabKey } from "../App";
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
  left?: number;
  sliderWidth?: number;
}

function Layout({ tab }: LayoutProps) {
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
    []
  );

  return (
    <div className="w-auto max-w-[1280px] mx-auto flex justify-between b-10 relative">
      <ResponsiveReactGridLayout
        className="m-auto w-full" 
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
            <Block keyProp={"Tile " + key} />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

const Block = ({ keyProp }: { keyProp: string }) => {
  const [label, keyPart] = keyProp.split(" ");

  // 特定卡片显示客户信息
  if (keyProp === "Tile a") {
    return <CustomerCards cardType="location" />;
  }
  if (keyProp === "Tile b") {
    return <CustomerCards cardType="network" />;
  }
  if (keyProp === "Tile c") {
    return <CustomerCards cardType="summary" />;
  }
  if (keyProp === "Tile d") {
    return <CustomerCards cardType="resource" />;
  }
  if (keyProp === "Tile e") {
    return <CustomerCards cardType="billing" />;
  }

  return (
    <div
      className="h-full w-full flex flex-col justify-center items-center p-6 text-white rounded-3xl glass-morphism"
    >
      <span>
        <span className="normal-case">{label}</span>{" "}
        <span className="uppercase">{keyPart}</span>
      </span>
    </div>
  );
};


export default Layout;
