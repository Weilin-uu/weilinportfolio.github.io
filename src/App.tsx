import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-my-bg text-black flex flex-col font-serif">
      {/* --- Top Nav --- */}
      <header className="h-[64px] max-md:h-[48px] w-full flex border-b border-black flex-shrink-0 z-10">
        <div className="w-1/2 max-md:w-full flex items-center pl-[48px] max-md:pl-[24px] border-r border-black max-md:border-r-0">
          <span className="text-sm tracking-widest uppercase font-sans cursor-pointer hover:opacity-50 transition-opacity">
            Home
          </span>
        </div>

        {/* Desktop / large screen right top nav */}
        <div className="w-1/2 bg-black text-white flex items-center justify-between px-[48px] max-md:hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="font-sans text-sm tracking-widest uppercase"
            >
              {images[currentIndex].title}
            </motion.span>
          </AnimatePresence>

          <div className="cursor-pointer hover:scale-110 transition-transform flex-shrink-0 ml-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
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

        {/* --- Right: Nav bar + Image Gallery --- */}
        <div className="w-1/2 max-md:w-full flex flex-col h-auto min-h-0">
          {/* Mobile right nav */}
          <div className="hidden max-md:flex h-[48px] bg-black text-white items-center justify-between px-[24px] flex-shrink-0 border-b border-black">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="font-sans text-sm tracking-widest uppercase"
              >
                {images[currentIndex].title}
              </motion.span>
            </AnimatePresence>

            <div className="cursor-pointer hover:scale-110 transition-transform flex-shrink-0 ml-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>

          {/* Image Gallery */}
          {/* Image Gallery */}
<div className="flex-1 relative bg-gray-100 min-h-[calc(100vh-56px)] max-md:min-h-0 max-md:w-full max-md:aspect-square overflow-hidden">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <img
        src={images[currentIndex].img}
        alt={images[currentIndex].title}
        className="block w-full h-auto object-contain"
      />
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
    </motion.div>
  </AnimatePresence>
</div>
        </div>
      </div>
    </div>
  );
}