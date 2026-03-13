import { useNavigate } from "react-router-dom";

export default function AboutMe() {
  const navigate = useNavigate();

  const skills = [
    {
      category: "Design",
      items: ["UX Research", "Wireframing", "Prototyping", "User Testing", "Information Architecture"],
    },
    {
      category: "Tools",
      items: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Miro"],
    },
    {
      category: "Development",
      items: ["HTML", "CSS", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Methods",
      items: ["Design Thinking", "Agile", "Speculative Design", "Systems Thinking"],
    },
  ];

  return (
    <div className="min-h-screen w-screen bg-my-bg text-black flex flex-col font-serif">

      <header className="h-[48px] md:h-[64px] w-full flex border-b border-black flex-shrink-0 z-10">
        <div className="w-full flex items-center pl-[24px] md:pl-[48px]">
          <span
            onClick={() => navigate("/")}
            className="text-sm tracking-widest uppercase font-sans cursor-pointer hover:opacity-50 transition-opacity"
          >
            Home
          </span>
        </div>
      </header>

      <div className="w-full flex flex-col md:flex-row border-b border-black">
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-black">
          <img
            src="/weilinportfolio.github.io/me.jpg"
            alt="Weilin"
            className="w-full h-full object-cover max-h-[70vh]"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-end pt-[40px] md:pt-[64px] pl-[24px] md:pl-[48px] pr-[24px] md:pr-[48px] pb-[40px] md:pb-[64px]">
          <h2 className="text-[clamp(2.5rem,5vw,6rem)] tracking-tighter leading-[0.9] mb-[40px] md:mb-[64px]">
            About Me
          </h2>
          <div className="font-futura-medium text-[14px] md:text-[16px] leading-[1.6] max-w-[480px] opacity-80">
            <p>
              Hi, I am Weilin, a designer with a background in Material Science and Engineering.
              I design futures that are grounded in reality, approaching problems through both
              speculative thinking and real-world constraints. I care deeply about the intersection
              of technology, people, and systems.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-black pt-[40px] md:pt-[64px] pl-[24px] md:pl-[48px] pr-[24px] md:pr-[48px] pb-[40px] md:pb-[64px]">
        <h3 className="font-sans text-sm tracking-widest uppercase opacity-40 mb-[40px]">
          Skills
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[40px]">
          {skills.map((group) => (
            <div key={group.category}>
              <p className="font-futura-heavy text-[18px] mb-[16px]">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-[8px]">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="font-sans text-[12px] tracking-wide border border-black px-[12px] py-[6px] opacity-70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full pt-[40px] md:pt-[64px] pl-[24px] md:pl-[48px] pr-[24px] md:pr-[48px] pb-[40px] md:pb-[64px]">
        <h3 className="font-sans text-sm tracking-widest uppercase opacity-40 mb-[40px]">
          CV
        </h3>
        <div className="w-full border border-black mb-[32px] overflow-hidden">
          <iframe
            src="/weilinportfolio.github.io/Weilin_Sun_Product_Designer.pdf"
            className="w-full h-[60vh] md:h-[80vh]"
            title="Weilin CV"
          />
        </div>
        <a
          href="/weilinportfolio.github.io/Weilin_Sun_Product_Designer.pdf"
          download
          className="inline-flex items-center gap-3 border border-black px-6 py-4 font-sans text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors w-fit"
        >
          Download CV
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>

    </div>
  );
}
