import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import ProjectCards from "./components/ProjectCards";

const projectSections = [
  {
    id: "ux-ui-projects",
    title: "UX/UI Projects",
    projects: [
      {
        slug: "swiftfood",
        title: "Multi-sided Marketplace Platform for Food Delivery",
        image: "/weilinportfolio.github.io/swiftfood.png",
        year: "2025",
        chips: ["Marketplace UX", "B2C/B2B", "Multi-sided Platform"],
      },
      {
        slug: "smarthome",
        title: "Smart Home System Based on Affective Computing",
        image: "/weilinportfolio.github.io/vrlibrary.png",
        year: "2021",
        chips: ["Smart Home", "AI", "Affective Computing"],
      },
      {
        slug: "healthtech",
        title: "AI-powered Health Tech App",
        image: "/weilinportfolio.github.io/healthtech.png",
        year: "2024",
        chips: ["Health Tech", "AI Experience", "Mobile App"],
      },
      {
        slug: "volunteer",
        title: "AR Future Volunteer System Design",
        image: "/weilinportfolio.github.io/volunteer.png",
        year: "2024",
        chips: ["AR", "Service Design", "Future Scenario"],
      },
      {
        slug: "vrlibrary",
        title: "Future VR Library of Language Preservation",
        image: "/weilinportfolio.github.io/vrlibrary.png",
        year: "2024",
        chips: ["VR", "Cultural Preservation", "Speculative Design"],
      },
      {
        slug: "cardgame",
        title: "Gamified System for Cross-Cultural Communication",
        image: "/weilinportfolio.github.io/cardgame.png",
        year: "2023",
        chips: ["Game Design", "Education", "Cross-cultural"],
      },
    ],
  },
  {
    id: "creative-coding",
    title: "Creative Coding",
    projects: [
      {
        slug: "creative-1",
        title: "Interactive Visual Experiment",
        image: "/weilinportfolio.github.io/vrlibrary.png",
        year: "2024",
        chips: ["Creative Coding", "Motion", "Interactive"],
      },
      {
        slug: "creative-2",
        title: "Generative Image Study",
        image: "/weilinportfolio.github.io/vrlibrary.png",
        year: "2026",
        chips: ["Generative", "Visual System", "Experiment"],
      },
      {
        slug: "foldable-robot",
        title: "Foldable Robot",
        image: "/weilinportfolio.github.io/foldablerobot.png",
        year: "2024",
        chips: ["Physical Computing", "Robotics", "Prototype"],
      },
    ],
  },
  {
    id: "other-projects",
    title: "Other Projects",
    projects: [
      {
        slug: "other-2",
        title: "Mortise and tenon structure parent-child furniture",
        image: "/weilinportfolio.github.io/vrlibrary.png",
        year: "2021",
        chips: ["Furniture design", "Critical thinking", "Carpentry"],
      },
      {
        slug: "other-3",
        title: "Rural Primary School Libraries in China",
        image: "/weilinportfolio.github.io/vrlibrary.png",
        year: "2020",
        chips: ["Architecture", "Interior", "Furniture"],
      },
      {
        slug: "other-1",
        title: "Pet-center furniture design",
        image: "/weilinportfolio.github.io/vrlibrary.png",
        year: "2020",
        chips: ["Furniture design", "Inclusive thinking", "Structural design"],
      },
      {
        slug: "other-4",
        title: "Furniture structure experiment",
        image: "/weilinportfolio.github.io/vrlibrary.png",
        year: "2019",
        chips: ["Furniture design", "Carpentry", "Structural design"],
      },
    ],
  },
];

export default function ProjectsPage() {
  const location = useLocation();

  const hashTarget = useMemo(() => {
    return location.hash ? location.hash.replace("#", "") : null;
  }, [location.hash]);

  useEffect(() => {
    if (!hashTarget) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const el = document.getElementById(hashTarget);

    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 32;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [hashTarget]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-my-bg text-black flex flex-col font-serif">
      <Header />

      <div className="flex-1 mx-auto w-full max-w-[1920px] pb-[56px] md:pb-[72px] ">       
        <div className="space-y-0">
          {projectSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-10 "
            >
              <div className="border-b border-black px-[24px] pb-[24px] md:pb-[48px] pt-[24px] md:pt-[48px] py-[2px] md:px-[36px] md:py-[2px] xl:px-[48px]">
                  <p className="font-futura-light text-[12px] uppercase tracking-[0.18em] text-black/45 mb-[8px]">
                     Selected Work
                  </p>
                
                <h2 className="font-inria-serif-rregular text-[clamp(2rem,3.2vw,3.5rem)] leading-[0.95] tracking-tighter">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {section.projects.map((project) => (
                  <ProjectCards key={project.slug} project={project} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}