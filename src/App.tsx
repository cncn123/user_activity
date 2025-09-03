import { useState } from 'react';
import Layout from './components/layout';
import Navbar from './components/navbar';

export enum TabKey {
  kejikegan = "可知可感",
  kexiang = "可享",
  keji = "可及",
  // Contact = "Contact",
}

function App() {
  const [tab, setTab] = useState<TabKey>(TabKey.kejikegan);

  const tabOffsets: { [key in TabKey]: number } = {
    "可知可感": 0,
    "可享": 1,
    "可及": 2,
  };

  const baseX = 520;
  const baseW = 221.5;

  const x = baseX + tabOffsets[tab];
  const w = baseW;

  return (
    <main className="relative">
      <Navbar tab={tab} setTab={setTab} left={x} sliderWidth={w} />
      <Layout tab={tab} setTab={setTab} left={x} sliderWidth={w} />
    </main>
  );
}

export default App;
