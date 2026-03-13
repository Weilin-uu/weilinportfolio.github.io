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
    <div className="min-h-screen w-screen bg-my-bg text-black flex flex-col md:h-screen md:overflow-hidden font-serif">

      {/* --- Top Nav --- */}
      <header className="h-[48px] md:h-[64px] w-full flex border-b border-black flex-shrink-0 z-10">
        <div className="w-full md:w-1/2 flex items-center pl-[24px] md:pl-[48px] border-r border-black">
          <span className="text-sm tracking-widest uppercase font-sans cursor-pointer hover:opacity-50 transition-opacity">Home</span>
        </div>
        <div className="hidden md:flex w-1/2 bg-black text-white items-center justify-between px-[48px]">
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
      <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden w-full max-w-[1600px] mx-auto">

        {/* --- Left: Static Nav --- */}
        <div className="w-full md:w-1/2 h-auto md:h-full border-b md:border-b-0 md:border-r border-black flex flex-col
          pt-[40px] md:pt-[64px]
          pl-[24px] md:pl-[48px]
          pr-[24px] md:pr-[48px]
          pb-[40px] md:pb-0">

          <h2 className="text-[clamp(2.5rem,5vw,6rem)] tracking-tighter leading-[0.9] mb-[40px] md:mb-[64px]">
            Hello! I'm Weilin.
          </h2>

          <div className="font-futura-medium text-[clamp(12px,1.2vw,16px)] leading-[1.4] max-w-[420px] opacity-80 mb-[64px] md:mb-[128px]">
            <p>I design futures that are grounded in reality.</p>
            <p>I have a background in Material Science and Engineering, I approach design through both speculative thinking and real-world constraints.</p>
          </div>

          <nav>
            <ul className="space-y-[16px] md:space-y-[24px]">
              {navSections.map((section) => (
                <li
  key={section.id}
  className="flex items-baseline cursor-pointer"
  onClick={() => {
    if (section.label === "About Me") navigate("/about");
  }}
>
                  <span className="font-sans text-[14px] md:text-[16px] mr-6 md:mr-8 w-[24px] opacity-20 text-black flex-shrink-0">
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
        <div className="w-full md:w-1/2 flex flex-col h-[70vh] md:h-full md:flex-1">

          {/* Right nav bar — mobile only */}
          <div className="flex md:hidden h-[48px] bg-black text-white items-center justify-between px-[24px] flex-shrink-0 border-b border-black">
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
          <div className="flex-1 relative bg-gray-100">
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
                  src={images[currentIndex].img}
                  alt={images[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}