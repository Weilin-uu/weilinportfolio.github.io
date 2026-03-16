import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// 年份动画 Hook（纯文字，无色带）
// ─────────────────────────────────────────────
function YearCounter() {
  const labelRef = useRef(null);

  useEffect(() => {
    const label = labelRef.current;
    if (!label) return;

    const startYear = 2021;
    const endYear   = 2026;
    const duration  = 1400;
    const delay     = 300;
    let startTime   = null;
    let rafId       = null;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function animate(now) {
      if (!startTime) startTime = now;
      const elapsed = Math.max(0, now - startTime - delay);
      const t       = Math.min(elapsed / duration, 1);
      const eased   = easeOut(t);

      label.textContent = `Portfolio ${startYear}–${startYear + Math.round(eased * (endYear - startYear))}`;

      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        label.textContent = `Portfolio ${startYear}–${endYear}`;
      }
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <span
      ref={labelRef}
      className="font-futura-light text-sm tracking-widest"
      style={{ color: "black" }}
    >
      Portfolio 2021–2021
    </span>
  );
}

// ─────────────────────────────────────────────
// 常量配置
// ─────────────────────────────────────────────
const navSections = [
  { id: "01", label: "UX/UI Projects",    target: "/projects#ux-ui-projects"   },
  { id: "02", label: "Creative Computing",target: "/projects#creative-coding"  },
  { id: "03", label: "Other Projects",    target: "/projects#other-projects"   },
  { id: "04", label: "About me",          target: "/about"                     },
];

const images = [
  { img: "/weilinportfolio.github.io/swiftfood.png",     title: "Swift Food App",     slug: "swiftfood"     },
  { img: "/weilinportfolio.github.io/healthtech.png",    title: "Health Tech Design", slug: "healthtech"    },
  { img: "/weilinportfolio.github.io/volunteer.png",     title: "Volunteer Platform", slug: "volunteer"     },
  { img: "/weilinportfolio.github.io/vrlibrary.png",     title: "VR Library",         slug: "vrlibrary"     },
  { img: "/weilinportfolio.github.io/cardgame.png",      title: "Card Game",          slug: "cardgame"      },
  { img: "/weilinportfolio.github.io/foldablerobot.png", title: "Foldable Robot",     slug: "foldablerobot" },
];

const AUTO_DELAY         = 5000;
const RESUME_DELAY       = 3000;
const ANIMATION_DURATION = 0.8;

// ─────────────────────────────────────────────
// SlidingTitle
// ─────────────────────────────────────────────
function SlidingTitle({ title, incomingTitle, isAnimating }) {
  return (
    <div className="relative self-stretch flex-1 overflow-hidden">
      {!isAnimating ? (
        <div className="absolute inset-0 flex items-center">
          <span className="font-futura-light text-sm leading-[1.15] tracking-widest uppercase whitespace-normal break-words">
            {title}
          </span>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: "100%" }}
            transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
            className="absolute inset-0 flex items-center"
          >
            <span className="font-futura-light text-sm leading-[1.15] tracking-widest uppercase whitespace-normal break-words">
              {title}
            </span>
          </motion.div>
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
            className="absolute inset-0 flex items-center"
          >
            <span className="font-futura-light text-sm leading-[1.15] tracking-widest uppercase whitespace-normal break-words">
              {incomingTitle}
            </span>
          </motion.div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// SlidingImage
// ─────────────────────────────────────────────
function SlidingImage({ currentImg, incomingImg, currentTitle, incomingTitle, direction, isAnimating }) {
  return (
    <div className="relative w-full overflow-hidden">
      {!isAnimating ? (
        <img src={currentImg} alt={currentTitle} className="block w-full h-auto" draggable={false} />
      ) : (
        <div className="relative w-full overflow-hidden">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: direction === 1 ? "-100%" : "100%" }}
            transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
            className="absolute top-0 left-0 w-full"
          >
            <img src={currentImg} alt={currentTitle} className="block w-full h-auto" draggable={false} />
          </motion.div>
          <motion.div
            initial={{ x: direction === 1 ? "100%" : "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
            className="absolute top-0 left-0 w-full"
          >
            <img src={incomingImg} alt={incomingTitle} className="block w-full h-auto" draggable={false} />
          </motion.div>
          <img src={currentImg} alt="" className="block w-full h-auto opacity-0 pointer-events-none" draggable={false} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// 主组件
// ─────────────────────────────────────────────
export default function App() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection]       = useState(1);
  const [isAnimating, setIsAnimating]   = useState(false);
  const [isPaused, setIsPaused]         = useState(false);
  const [showArrows, setShowArrows]     = useState(false);

  const autoTimerRef   = useRef(null);
  const resumeTimerRef = useRef(null);

  const clearAllTimers = () => {
    if (autoTimerRef.current)   clearTimeout(autoTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const pauseAutoplay = () => { clearAllTimers(); setIsPaused(true); };

  const resumeAutoplayWithDelay = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  };

  const goToSlide = (dir) => {
    if (isAnimating) return;
    clearAllTimers();
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => dir === 1
        ? (prev + 1) % images.length
        : (prev - 1 + images.length) % images.length
      );
      setIsAnimating(false);
    }, ANIMATION_DURATION * 1000);
    resumeAutoplayWithDelay();
  };

  const goToNext = () => goToSlide(1);
  const goToPrev = () => goToSlide(-1);

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
    return () => { if (autoTimerRef.current) clearTimeout(autoTimerRef.current); };
  }, [currentIndex, isPaused, isAnimating]);

  useEffect(() => { return () => clearAllTimers(); }, []);

  const nextIndex     = (currentIndex + 1) % images.length;
  const prevIndex     = (currentIndex - 1 + images.length) % images.length;
  const incomingIndex = direction === 1 ? nextIndex : prevIndex;

  // ── nav click helper ──
  const handleNav = (target) => navigate(target);

  return (
    <div className="min-h-screen max-md:min-h-screen w-full overflow-x-hidden bg-my-bg text-black flex flex-col font-serif">

      {/* ── 顶部导航 ─────────────────────────── */}
      <header className="h-[64px] max-md:h-[48px] w-full flex border-b-2 border-black flex-shrink-0 z-10">

        {/* 左：Home */}
        <div className="w-1/2 max-md:bg-my-bg max-md:w-full flex items-center pl-[48px] max-md:pl-[24px] border-r-1 border-black max-md:border-r-0">
          <span
            className="text-sm tracking-widest uppercase font-sans cursor-pointer transition-colors duration-200 hover:text-brand"
          >
            Home
          </span>
        </div>

        {/* 右：项目标题 banner（桌面） */}
        <div className="w-1/2 bg-black text-white items-center justify-between px-[32px] max-md:hidden flex overflow-hidden">
          <SlidingTitle
            title={images[currentIndex].title}
            incomingTitle={images[incomingIndex].title}
            isAnimating={isAnimating}
          />
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


      {/* ── 主内容区 ─────────────────────────── */}
      <div className="flex-1 flex flex-row max-md:flex-col w-full max-w-[1920px] mx-auto ">

        {/* ── 左栏 ──────────────────────────── */}
        <div
          className="
            w-1/2 max-md:w-full
            border-r-2 border-black max-md:border-r-0 
            flex flex-col
            pt-[80px] xl:pt-[48px] max-md:pt-[4vw]
            pl-[48px] max-md:pl-[24px]
            pr-[48px] max-md:pr-[24px]
            pb-[48px] max-md:pb-[6vw]
            max-md:z-[1] max-md:relative
          "
        >
          {/* 年份计数（纯文字动画） */}
          <div className="mb-[16px] max-md:mb-[3vw] max-md:fixed max-md:top-[10%]">
            <YearCounter />
          </div>

          {/* 大标题 */}
          <h1 className="font-futura-bold text-[clamp(3rem,6vw,7rem)] tracking-tighter leading-[0.88] mb-[18px] max-md:mb-[3vw] max-md:fixed max-md:top-[14%]">
            Weilin Sun
          </h1>

          {/* Pill 标签 */}
          <div className="flex flex-wrap gap-[10px] mb-[28px] max-md:mb-[2vw] max-md:fixed max-md:top-[23%]">
            <span
              className="
                font-futura-heavy text-[14px] md:text-[16px] tracking-widest
                border-2 border-black rounded-full
                max-md:border-1 max-md:px-[10px]
                px-[12px] py-[4px]
                cursor-default
                text-black
              "
            >
              Product Designer
            </span>
            <span
              className="
                font-futura-heavy text-[14px] md:text-[16px] tracking-widest
                border-2 border-grey-2 rounded-full
                max-md:border-1 max-md:px-[10px]
                px-[12px] py-[4px]
                cursor-default
                text-grey-2
              "
            >
              London/ Remote
            </span>
          </div>

          {/* 简介文字 */}
          <div className="font-futura-light text-[clamp(12px,1.1vw,15px)] leading-[1.55] w-full opacity-80 mb-[56px] max-md:mb-[30vw] max-md:fixed max-md:top-[30%]">
            <p className="mb-0">I design futures that are grounded in reality.</p>
            <p className="mb-0">
              I have a background in Material Science and Engineering, I approach design through both
              speculative thinking and real-world constraints.
            </p>
            <p className="mb-0">
              My work moves between speculative prototypes and real-world products—from exploring
              possible futures to building platforms used by thousands of users.
            </p>
          </div>

          {/* 导航菜单（桌面） */}
          <nav className="max-md:hidden flex-1">
            <ul className="space-y-[20px]">
              {navSections.map((section) => (
                <li
                  key={section.id}
                  className="flex items-center cursor-pointer"
                  onClick={() => handleNav(section.target)}
                >
                  <span className="font-futura-heavy text-[14px] mr-3 w-[18px] opacity-30 text-black flex-shrink-0">
                    {section.id}
                  </span>
                  <span className="font-futura-medium text-[clamp(1.4rem,2.8vw,2.5rem)] leading-none text-black transition-colors duration-200 hover:text-brand inline-block">
                    {section.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {/* 底部链接（桌面） */}
          <div className="max-md:hidden mt-auto pt-[64px] flex gap-[24px]">
            {[
              { label: "Linkedin", href: "https://www.linkedin.com/in/weilin-sun-429701291/" },
              { label: "Email",    href: "mailto:sunweilin3399@gmail.com" },
              { label: "Resume",   href: "https://weilin-uu.github.io/weilinportfolio.github.io/Weilin_Sun_Product_Designer.pdf" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-futura-light text-[13px] tracking-widest flex items-center gap-[4px] text-black transition-colors duration-200 hover:text-brand"
              >
                {label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            ))}
          </div>
        </div>


        {/* ── 右栏：图片轮播 ────────────────── */}
        <div className="w-1/2 max-md:z-[0] max-md:w-[68%] max-md:fixed max-md:top-[66%] max-md:left-[16%] max-md:-translate-y-1/2 max-md:left-0 max-md:right-0 flex flex-col">
          {/* 轮播主体 - relative 容器，移动端 nav 会 overlay 在此 */}
          <div
            className="relative flex-1 min-h-[calc(100vh-64px)] max-md:min-h-0 overflow-hidden group"
            onMouseEnter={() => { setShowArrows(true);  pauseAutoplay(); }}
            onMouseLeave={() => { setShowArrows(false); resumeAutoplayWithDelay(); }}
            onTouchStart={() => pauseAutoplay()}
            onTouchEnd={()   => resumeAutoplayWithDelay()}
          >
            <SlidingImage
              currentImg={images[currentIndex].img}
              incomingImg={images[incomingIndex].img}
              currentTitle={images[currentIndex].title}
              incomingTitle={images[incomingIndex].title}
              direction={direction}
              isAnimating={isAnimating}
            />

            <div className="absolute inset-0 bg-black/5 pointer-events-none" />


            <button
              onClick={goToPrev}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center transition-opacity duration-300 ${showArrows ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18L9 12L15 6" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center transition-opacity duration-300 ${showArrows ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6L15 12L9 18" />
              </svg>
            </button>
          </div>
        </div>

{/* 导航菜单（手机端） */}
<nav className="hidden max-md:fixed max-md:top-[66%] max-md:block mb-[20vw] max-md:z-[1] px-[24px]">
  <ul className="space-y-[2.5vw]">
    {navSections.map((section) => (
      <li
        key={section.id}
        className="flex items-center"
      >
        <span className="font-futura-heavy text-[12px] mr-4 opacity-30 text-black flex-shrink-0 bg-my-bg">
          {section.id}
        </span>
        <span
          className="font-futura-medium text-[clamp(1.3rem,5.0vw,2.2rem)] leading-none text-black transition-colors duration-200 hover:text-brand bg-my-bg cursor-pointer"
          onClick={() => handleNav(section.target)}
        >
          {section.label}
        </span>
      </li>
    ))}
  </ul>
</nav>

        {/* ── 手机端：底部链接 ─────────── */}
        <div className="hidden max-md:block max-md:fixed max-md:top-[95%] w-full px-[24px] max-md:z-[1] pb-[8vw]">
          <div className="flex flex-row gap-[8px]">
            {[
              { label: "Linkedin", href: "https://www.linkedin.com/in/weilin-sun-429701291/" },
              { label: "Email",    href: "mailto:sunweilin3399@gmail.com" },
              { label: "Resume",   href: "https://weilin-uu.github.io/weilinportfolio.github.io/Weilin_Sun_Product_Designer.pdf" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-sans text-[13px] tracking-widest flex items-center gap-[4px] text-black transition-colors duration-200 hover:text-brand"
              >
                {label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}