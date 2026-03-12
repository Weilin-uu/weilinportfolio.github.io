import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    { id: "01", label: "UX/UI Projects", title: "SAFEBUMP APP", img: "https://picsum.photos/seed/p1/800/1200" },
    { id: "02", label: "Creative Computing", title: "GENERATIVE ART", img: "https://picsum.photos/seed/p2/800/1200" },
    { id: "03", label: "Other Projects", title: "MATERIAL DESIGN", img: "https://picsum.photos/seed/p3/800/1200" },
    { id: "04", label: "About me", title: "PERSONAL BRAND", img: "https://picsum.photos/seed/p4/800/1200" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [projects.length]);

  return (
    <div className="h-screen w-screen bg-my-bg text-black flex flex-col overflow-hidden font-serif">
      
      {/* --- 1. 顶部导航栏 --- */}
      <header className="h-[48px] md:h-[64px] w-full flex border-b border-black flex-shrink-0 z-10">
        <div className="w-1/2 flex items-center pl-[48px] border-r border-black">
          <span className="text-sm tracking-widest uppercase font-sans cursor-pointer hover:opacity-50 transition-opacity">Home</span>
        </div>
        
        <div className="w-1/2 bg-black text-white flex items-center justify-between px-[48px]">
          <AnimatePresence mode="wait">
            <motion.span 
              key={currentIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="font-sans text-sm tracking-widest uppercase"
            >
              {projects[currentIndex].title}
            </motion.span>
          </AnimatePresence>
          <div className="cursor-pointer hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </header>

      {/* --- 2. 下部内容区 (关键容器) --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* --- 左半部分：文字区域 --- */}
        <div className="w-1/2 h-full border-r border-black pt-[64px] pl-[48px] flex flex-col overflow-hidden">
          {/* 大标题 */}
          <h2 className="text-h3 md:text-h2 lg:text-h1 tracking-tighter leading-[0.9] mb-[64px]">
            Hello! I'm Weilin.
          </h2>

          {/* 自我介绍 - 保持你的 Futura Medium */}
          <div className="font-futura-medium text-[14px] leading-[1.2] max-w-[420px] opacity-80 mb-[128px]">
            <p>I design futures that are grounded in reality.</p>
            <p>I have a background in Material Science and Engineering, I approach design through both speculative thinking and real-world constraints.</p>
          </div>

          {/* 目录列表 - 保持你的静态 Futura Heavy */}
          <nav>
            <ul className="space-y-[24px]">
              {projects.map((item) => (
                <li key={item.id} className="flex items-baseline">
                  {/* 序号：固定常灰 */}
                  <span className="font-sans text-[16px] mr-8 w-[24px] opacity-20 text-black">
                    {item.id}
                  </span>
                  
                  {/* 标题：固定常黑 */}
                  <span className="font-futura-heavy text-[32px] leading-none text-black">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </div> {/* 这里是左侧区域的正确闭合 */}

        {/* --- 右半部分：图片展示区域 --- */}
        <div className="w-1/2 h-full relative bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img
                src={projects[currentIndex].img}
                alt={projects[currentIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5" />
            </motion.div>
          </AnimatePresence>
        </div>

      </div> {/* 这里是下部内容总容器的正确闭合 */}
    </div>
  );
}
