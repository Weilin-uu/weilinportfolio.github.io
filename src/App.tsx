import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// 常量配置
// ─────────────────────────────────────────────
const navSections = [
  { id: "01", label: "UX/UI Projects" },
  { id: "02", label: "Creative Coding" },
  { id: "03", label: "Other Projects" },
  { id: "04", label: "About Me" },
];

const images = [
  { img: "/weilinportfolio.github.io/swiftfood.png",     title: "...", slug: "swiftfood" },
  { img: "/weilinportfolio.github.io/healthtech.png",    title: "...", slug: "healthtech" },
  { img: "/weilinportfolio.github.io/volunteer.png",     title: "...", slug: "volunteer" },
  { img: "/weilinportfolio.github.io/vrlibrary.png",     title: "...", slug: "vrlibrary" },
  { img: "/weilinportfolio.github.io/cardgame.png",      title: "...", slug: "cardgame" },
  { img: "/weilinportfolio.github.io/foldablerobot.png", title: "...", slug: "foldablerobot" },
];

const AUTO_DELAY         = 5000; // 自动切换间隔（ms）
const RESUME_DELAY       = 3000; // 用户停止交互后，恢复自动播放的延迟（ms）
const ANIMATION_DURATION = 0.8;  // 图片和标题动画统一时长（s）


// ─────────────────────────────────────────────
// 子组件：SlidingTitle
// 负责：顶部黑色 banner 里的项目标题滑入/滑出动画
// ─────────────────────────────────────────────
function SlidingTitle({ title, incomingTitle, isAnimating }) {
  return (
    <div className="relative self-stretch flex-1 overflow-hidden">

      {/* 静止状态：直接显示当前标题 */}
      {!isAnimating ? (
        <div className="absolute inset-0 flex items-center">
          <span className="font-sans text-sm leading-[1.15] tracking-widest uppercase whitespace-normal break-words">
            {title}
          </span>
        </div>

      ) : (
        /* 动画状态：旧标题向下滑出，新标题从上滑入 */
        <>
          {/* 旧标题：向下滑出 */}
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: "100%" }}
            transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
            className="absolute inset-0 flex items-center"
          >
            <span className="font-sans text-sm leading-[1.15] tracking-widest uppercase whitespace-normal break-words">
              {title}
            </span>
          </motion.div>

          {/* 新标题：从上滑入 */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
            className="absolute inset-0 flex items-center"
          >
            <span className="font-sans text-sm leading-[1.15] tracking-widest uppercase whitespace-normal break-words">
              {incomingTitle}
            </span>
          </motion.div>
        </>
      )}

    </div>
  );
}


// ─────────────────────────────────────────────
// 子组件：SlidingImage
// 负责：图片轮播的水平滑入/滑出动画
// ─────────────────────────────────────────────
function SlidingImage({ currentImg, incomingImg, currentTitle, incomingTitle, direction, isAnimating }) {
  return (
    <div className="relative w-full overflow-hidden">

      {/* 静止状态：直接显示当前图片 */}
      {!isAnimating ? (
        <img
          src={currentImg}
          alt={currentTitle}
          className="block w-full h-auto"
          draggable={false}
        />

      ) : (
        /* 动画状态：旧图片水平滑出，新图片水平滑入 */
        <div className="relative w-full overflow-hidden">

          {/* 旧图片：向左/右滑出 */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: direction === 1 ? "-100%" : "100%" }}
            transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
            className="absolute top-0 left-0 w-full"
          >
            <img
              src={currentImg}
              alt={currentTitle}
              className="block w-full h-auto"
              draggable={false}
            />
          </motion.div>

          {/* 新图片：从右/左滑入 */}
          <motion.div
            initial={{ x: direction === 1 ? "100%" : "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
            className="absolute top-0 left-0 w-full"
          >
            <img
              src={incomingImg}
              alt={incomingTitle}
              className="block w-full h-auto"
              draggable={false}
            />
          </motion.div>

          {/* 占位图：absolute 定位时撑开父容器高度，防止塌陷 */}
          <img
            src={currentImg}
            alt=""
            className="block w-full h-auto opacity-0 pointer-events-none"
            draggable={false}
          />

        </div>
      )}

    </div>
  );
}


// ─────────────────────────────────────────────
// 主组件：App（首页）
// 负责：整体页面布局、轮播状态管理、自动播放逻辑、导航跳转
// ─────────────────────────────────────────────
export default function App() {
  const navigate = useNavigate();

  // ── 轮播状态 ──────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);    // 当前图片索引
  const [direction, setDirection]       = useState(1);     // 1 = 下一张，-1 = 上一张
  const [isAnimating, setIsAnimating]   = useState(false); // 是否正在播放动画
  const [isPaused, setIsPaused]         = useState(false); // 是否暂停自动播放
  const [showArrows, setShowArrows]     = useState(false); // 是否显示左右箭头

  const autoTimerRef   = useRef(null); // 自动切换定时器
  const resumeTimerRef = useRef(null); // 恢复自动播放定时器


  // ── 定时器工具函数 ─────────────────────────

  const clearAllTimers = () => {
    if (autoTimerRef.current)   clearTimeout(autoTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  // 暂停自动播放（鼠标悬停 / 触摸开始时调用）
  const pauseAutoplay = () => {
    clearAllTimers();
    setIsPaused(true);
  };

  // 延迟恢复自动播放（鼠标离开 / 触摸结束时调用）
  const resumeAutoplayWithDelay = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  };


  // ── 切换图片逻辑 ───────────────────────────

  const goToSlide = (dir) => {
    if (isAnimating) return;

    clearAllTimers();
    setDirection(dir);
    setIsAnimating(true);

    // 动画结束后更新索引、结束动画状态
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (dir === 1) return (prev + 1) % images.length;
        return (prev - 1 + images.length) % images.length;
      });
      setIsAnimating(false);
    }, ANIMATION_DURATION * 1000);

    resumeAutoplayWithDelay();
  };

  const goToNext = () => goToSlide(1);
  const goToPrev = () => goToSlide(-1);


  // ── 自动播放 Effect ────────────────────────
  // 每次图片切换完成后，若未暂停则启动下一次自动切换
  useEffect(() => {
    if (isPaused || isAnimating) return;

    autoTimerRef.current = setTimeout(() => {
      setDirection(1);
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsAnimating(false);
      }, ANIMATION_DURATION * 1000);
    }, AUTO_DELAY);

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [currentIndex, isPaused, isAnimating]);

  // 组件卸载时清除所有定时器
  useEffect(() => {
    return () => clearAllTimers();
  }, []);


  // ── 计算相邻索引（供动画组件使用） ────────
  const nextIndex     = (currentIndex + 1) % images.length;
  const prevIndex     = (currentIndex - 1 + images.length) % images.length;
  const incomingIndex = direction === 1 ? nextIndex : prevIndex;


  // ─────────────────────────────────────────
  // 渲染
  // ─────────────────────────────────────────
  return (
    // 手机端：锁定屏幕高度、禁止滚动，所有内容在屏幕内显示
    <div className="min-h-screen max-md:h-screen max-md:overflow-hidden w-full overflow-x-hidden bg-my-bg text-black flex flex-col font-serif">

      {/* ── 顶部导航栏 ────────────────────────
           左半："Home" 文字链接（手机端占全宽）
           右半（桌面）：黑色 banner，显示当前项目标题 + 旋转箭头图标
      ─────────────────────────────────────── */}
      <header className="h-[64px] max-md:h-[48px] w-full flex border-b border-black flex-shrink-0 z-10">

        {/* 左：Home 链接（手机端占全宽） */}
        <div className="w-1/2 max-md:w-full flex items-center pl-[48px] max-md:pl-[24px] border-r border-black max-md:border-r-0">
          <span className="text-sm tracking-widest uppercase font-sans cursor-pointer hover:opacity-50 transition-opacity">
            Home
          </span>
        </div>

        {/* 右：项目标题 banner（仅桌面端显示） */}
        <div className="w-1/2 bg-black text-white items-center justify-between px-[48px] max-md:hidden flex overflow-hidden">

          {/* 滑动标题 */}
          <SlidingTitle
            title={images[currentIndex].title}
            incomingTitle={images[incomingIndex].title}
            isAnimating={isAnimating}
          />

          {/* 切换时旋转的箭头图标 */}
          <motion.div
            animate={{ rotate: isAnimating ? (direction === 1 ? 360 : -360) : 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
            className="cursor-pointer hover:scale-110 transition-transform flex-shrink-0 ml-4"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.div>

        </div>
      </header>


      {/* ── 主内容区 ──────────────────────────
           桌面端：左右两栏并排
           手机端：flex-col，order 控制顺序：简介(1) → 轮播(2) → 导航(3)
                   flex-1 + overflow-hidden 确保撑满剩余高度不溢出
      ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-row max-md:flex-col w-full max-w-[1920px] mx-auto max-md:overflow-hidden">

        {/* ── 左栏：大标题 + 简介 + 桌面导航 ──
             手机端 order-1，flex-shrink-0 防止被压缩
        ─────────────────────────────────────── */}
        <div
          className="
            w-1/2 max-md:w-full max-md:order-1 max-md:flex-shrink-0
            border-r border-black max-md:border-r-0
            flex flex-col
            pt-[80px] xl:pt-[64px] max-md:pt-[5vw]
            pl-[36px] max-md:pl-[24px]
            pr-[36px] max-md:pr-[24px]
            pb-0
          "
        >
          {/* 大标题 */}
          <h2 className="text-[clamp(2.5rem,5vw,6rem)] tracking-tighter leading-[0.9] mb-[32px] max-md:mb-[3vw]">
            Hello! I&apos;m Weilin.
          </h2>

          {/* 简介文字 */}
          <div className="font-futura-medium text-[clamp(12px,1.2vw,16px)] leading-[1.4] max-md:leading-[1.3] max-w-[560px] opacity-80 mb-[64px] xl:mb-[80px] max-md:mb-0">
            <p>I design futures that are grounded in reality.</p>
            <p>
              I have a background in Material Science and Engineering, I approach design through both speculative
              thinking and real-world constraints.
            </p>
          </div>

          {/* 导航菜单（桌面端显示，手机端隐藏，手机端另外用 order-3 渲染） */}
          <nav className="max-md:hidden mt-[64px] xl:mt-[80px]">
            <ul className="space-y-[24px]">
              {navSections.map((section) => (
                <li
                  key={section.id}
                  className="flex items-baseline cursor-pointer"
                  onClick={() => {
                    if (section.label === "UX/UI Projects")       navigate("/projects#ux-ui-projects");
                    else if (section.label === "Creative Coding") navigate("/projects#creative-coding");
                    else if (section.label === "Other Projects")  navigate("/projects#other-projects");
                    else if (section.label === "About Me")        navigate("/about");
                  }}
                >
                  <span className="font-sans text-[16px] mr-8 w-[24px] opacity-20 text-black flex-shrink-0">
                    {section.id}
                  </span>
                  <span className="font-futura-heavy text-[clamp(1.2rem,2.5vw,2.2rem)] leading-none text-black">
                    {section.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </div>


        {/* ── 右栏 / 手机端轮播区域 ─────────────
             桌面端：右半宽，撑满全高
             手机端：order-2，宽度 75% 居中，flex-shrink 允许压缩
        ─────────────────────────────────────── */}
        <div className="w-1/2 max-md:w-[75%] max-md:mx-auto max-md:order-2 max-md:flex-shrink flex flex-col h-auto min-h-0 max-md:my-[3vw]">

          {/* 移动端专属标题 banner（桌面端隐藏） */}
          <div className="hidden max-md:flex h-[40px] bg-black text-white items-center justify-between px-[16px] flex-shrink-0 overflow-hidden">

            <SlidingTitle
              title={images[currentIndex].title}
              incomingTitle={images[incomingIndex].title}
              isAnimating={isAnimating}
            />

            <motion.div
              animate={{ rotate: isAnimating ? (direction === 1 ? 360 : -360) : 0 }}
              transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
              className="cursor-pointer hover:scale-110 transition-transform flex-shrink-0 ml-3"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.div>

          </div>

          {/* 图片轮播容器 */}
          <div
            className="relative bg-gray-100 min-h-[calc(100vh-64px)] max-md:min-h-0 overflow-hidden group"
            onMouseEnter={() => { setShowArrows(true);  pauseAutoplay(); }}
            onMouseLeave={() => { setShowArrows(false); resumeAutoplayWithDelay(); }}
            onTouchStart={() => { pauseAutoplay(); }}
            onTouchEnd={()   => { resumeAutoplayWithDelay(); }}
          >
            {/* 滑动图片主体 */}
            <SlidingImage
              currentImg={images[currentIndex].img}
              incomingImg={images[incomingIndex].img}
              currentTitle={images[currentIndex].title}
              incomingTitle={images[incomingIndex].title}
              direction={direction}
              isAnimating={isAnimating}
            />

            {/* 图片遮罩：轻微暗化效果 */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />

            {/* 左箭头按钮：悬停时显示 */}
            <button
              onClick={goToPrev}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center transition-opacity duration-300 ${
                showArrows ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18L9 12L15 6" />
              </svg>
            </button>

            {/* 右箭头按钮：悬停时显示 */}
            <button
              onClick={goToNext}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center transition-opacity duration-300 ${
                showArrows ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6L15 12L9 18" />
              </svg>
            </button>

          </div>
        </div>


        {/* ── 手机端导航菜单 ────────────────────
             order-3，排在轮播下方
             flex-shrink-0 防止被压缩消失
        ─────────────────────────────────────── */}
        <nav className="hidden max-md:block max-md:order-3 max-md:flex-shrink-0 w-full px-[24px] pt-[3vw] pb-[4vw]">
          <ul className="space-y-[2vw]">
            {navSections.map((section) => (
              <li
                key={section.id}
                className="flex items-baseline cursor-pointer"
                onClick={() => {
                  if (section.label === "UX/UI Projects")       navigate("/projects#ux-ui-projects");
                  else if (section.label === "Creative Coding") navigate("/projects#creative-coding");
                  else if (section.label === "Other Projects")  navigate("/projects#other-projects");
                  else if (section.label === "About Me")        navigate("/about");
                }}
              >
                <span className="font-sans text-[14px] mr-6 w-[24px] opacity-20 text-black flex-shrink-0">
                  {section.id}
                </span>
                <span className="font-futura-heavy text-[clamp(1rem,5vw,2.2rem)] leading-none text-black">
                  {section.label}
                </span>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </div>
  );
}