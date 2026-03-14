import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const navSections = [
  { id: "01", label: "UX/UI Projects" },
  { id: "02", label: "Creative Coding" },
  { id: "03", label: "Other Projects" },
  { id: "04", label: "About Me" },
];

const images = [
  { img: "/weilinportfolio.github.io/swiftfood.png", title: "Multi-sided Marketplace Platform for Food Delivery" },
  { img: "/weilinportfolio.github.io/healthtech.png", title: "AI-powered Health Tech App" },
  { img: "/weilinportfolio.github.io/volunteer.png", title: "AR Future Volunteer System Design" },
  { img: "/weilinportfolio.github.io/vrlibrary.png", title: "Future VR Library of Language Preservation" },
  { img: "/weilinportfolio.github.io/cardgame.png", title: "Gamified System for Cross-Cultural Communication" },
  { img: "/weilinportfolio.github.io/foldablerobot.png", title: "Foldable Robot" },
];

const AUTO_DELAY = 5000; // 每5秒切换
const RESUME_DELAY = 3000; // 停止交互后3秒恢复
const ANIMATION_DURATION = 0.8; // 图片和标题统一动画时长

function SlidingTitle({ title, incomingTitle, isAnimating }) {
  return (
    <div className="relative self-stretch flex-1 overflow-hidden">
      {!isAnimating ? (
        <div className="absolute inset-0 flex items-center">
          <span className="font-sans text-sm leading-[1.15] tracking-widest uppercase whitespace-normal break-words">
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
            <span className="font-sans text-sm leading-[1.15] tracking-widest uppercase whitespace-normal break-words">
              {title}
            </span>
          </motion.div>

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

function SlidingImage({ currentImg, incomingImg, currentTitle, incomingTitle, direction, isAnimating }) {
  return (
    <div className="relative w-full overflow-hidden">
      {!isAnimating ? (
        <img
          src={currentImg}
          alt={currentTitle}
          className="block w-full h-auto"
          draggable={false}
        />
      ) : (
        <div className="relative w-full overflow-hidden">
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

          {/* 占位，防止 absolute 时父容器塌掉 */}
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

export default function App() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const autoTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);

  const clearAllTimers = () => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const pauseAutoplay = () => {
    clearAllTimers();
    setIsPaused(true);
  };

  const resumeAutoplayWithDelay = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  };

  const goToSlide = (dir) => {
    if (isAnimating) return;

    clearAllTimers();
    setDirection(dir);
    setIsAnimating(true);

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

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const nextIndex = (currentIndex + 1) % images.length;
  const prevIndex = (currentIndex - 1 + images.length) % images.length;

  const incomingIndex = direction === 1 ? nextIndex : prevIndex;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-my-bg text-black flex flex-col font-serif">
      {/* --- Top Nav --- */}
      <header className="h-[64px] max-md:h-[48px] w-full flex border-b border-black flex-shrink-0 z-10">
        <div className="w-1/2 max-md:w-full flex items-center pl-[48px] max-md:pl-[24px] border-r border-black max-md:border-r-0">
          <span className="text-sm tracking-widest uppercase font-sans cursor-pointer hover:opacity-50 transition-opacity">
            Home
          </span>
        </div>

<div className="w-1/2 bg-black text-white items-center justify-between px-[48px] max-md:hidden flex overflow-hidden">
  <SlidingTitle
    title={images[currentIndex].title}
    incomingTitle={images[incomingIndex].title}
    isAnimating={isAnimating}
  />

  <motion.div
  animate={{
    rotate: isAnimating ? (direction === 1 ? 360 : -360) : 0,
  }}
  transition={{
    duration: ANIMATION_DURATION,
    ease: "linear",
  }}
  className="cursor-pointer hover:scale-110 transition-transform flex-shrink-0 ml-4"
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
</motion.div>
</div>
      </header>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-row max-md:flex-col w-full max-w-[1920px] mx-auto">
        {/* --- Left: Static Nav --- */}
        <div
          className="
            w-1/2 max-md:w-full
            h-auto border-r border-black max-md:border-r-0 max-md:border-b
            flex flex-col
            pt-[80px] xl:pt-[64px] max-md:pt-[40px]
            pl-[36px] max-md:pl-[24px]
            pr-[36px] max-md:pr-[24px]
            pb-0 max-md:pb-[40px]
          "
        >
          <h2 className="text-[clamp(2.5rem,5vw,6rem)] tracking-tighter leading-[0.9] mb-[32px]">
            Hello! I&apos;m Weilin.
          </h2>

          <div className="font-futura-medium text-[clamp(12px,1.2vw,16px)] leading-[1.4] max-w-[560px] opacity-80 mb-[64px] xl:mb-[80px] max-md:mb-[48px]">
            <p>I design futures that are grounded in reality.</p>
            <p>
              I have a background in Material Science and Engineering, I approach design through both speculative
              thinking and real-world constraints.
            </p>
          </div>

          <nav>
            <ul className="space-y-[24px] max-md:space-y-[16px]">
              {navSections.map((section) => (
                <li
                  key={section.id}
                  className="flex items-baseline cursor-pointer"
                  onClick={() => {
                    if (section.label === "About Me") navigate("/about");
                  }}
                >
                  <span className="font-sans text-[16px] max-md:text-[14px] mr-8 max-md:mr-6 w-[24px] opacity-20 text-black flex-shrink-0">
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

        {/* --- Right: mobile title + image slider --- */}
        <div className="w-1/2 max-md:w-full flex flex-col h-auto min-h-0">
         <div className="hidden max-md:flex h-[48px] bg-black text-white items-center justify-between px-[24px] flex-shrink-0 border-b border-black overflow-hidden">
  <SlidingTitle
    title={images[currentIndex].title}
    incomingTitle={images[incomingIndex].title}
    isAnimating={isAnimating}
  />

  <motion.div
  animate={{
    rotate: isAnimating ? (direction === 1 ? 360 : -360) : 0,
  }}
  transition={{
    duration: ANIMATION_DURATION,
    ease: "linear",
  }}
  className="cursor-pointer hover:scale-110 transition-transform flex-shrink-0 ml-4"
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
</motion.div>
</div>

         <div
  className="relative bg-gray-100 min-h-[calc(100vh-64px)] max-md:min-h-0 overflow-hidden group"
  onMouseEnter={() => {
    setShowArrows(true);
    pauseAutoplay();
  }}
  onMouseLeave={() => {
    setShowArrows(false);
    resumeAutoplayWithDelay();
  }}
  onTouchStart={() => {
    pauseAutoplay();
  }}
  onTouchEnd={() => {
    resumeAutoplayWithDelay();
  }}
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
    className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center transition-opacity duration-300 ${
      showArrows ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
    aria-label="Previous image"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 18L9 12L15 6" />
    </svg>
  </button>

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
      </div>
    </div>
  );
}