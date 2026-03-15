import { useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

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

function ProjectCard({ project }) {
  return (
    <Link
      to={`/project/${project.slug}`}
      className="group block border-r border-b border-black first:border-l"
      aria-label={project.title}
    >
      <div className="relative flex h-full min-h-[420px] flex-col bg-my-bg">

        {project.year && (
          <div className="absolute right-5 top-5 font-sans text-[12px] tracking-[0.08em] text-black">
            {project.year}
          </div>
        )}

        <div className="px-5 pt-5 md:px-6 md:pt-6">
          {project.chips?.[0] && (
            <span className="inline-flex rounded-full border border-black px-3 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-black">
              {project.chips[0]}
            </span>
          )}
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-8 md:px-8 md:py-10">
          <img
            src={project.image}
            alt={project.title}
            className="max-h-[260px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 px-5 pb-5 pt-2 md:px-6 md:pb-6">
          <div className="min-w-0 flex-1">
            <h3 className="font-sans text-[14px] uppercase tracking-[0.04em] leading-[1.2] text-black md:text-[15px]">
              {project.title}
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.chips.slice(1).map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-black px-3 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-black/70"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 rounded-full border border-black px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-black transition-colors duration-200 group-hover:bg-black group-hover:text-white">
            View
          </div>
        </div>
      </div>
    </Link>
  );
}

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

      <header className="h-[64px] max-md:h-[48px] w-full flex border-b border-black flex-shrink-0 z-10">
        <div className="w-full flex items-center pl-[48px] max-md:pl-[24px]">
          <Link
            to="/"
            className="text-sm tracking-widest uppercase font-sans cursor-pointer hover:opacity-50 transition-opacity"
          >
            Home
          </Link>
        </div>
      </header>

      <div className="flex-1 mx-auto w-full max-w-[1920px] pb-[56px] pt-[40px] md:pb-[72px] md:pt-[56px]">

        <div className="mb-[0px] border-b border-black px-[24px] pb-[24px] md:px-[36px] md:pb-[32px] xl:px-[48px]">
          <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-black/45">
            Selected Work
          </p >

          <h1 className="mt-[14px] text-[clamp(2.5rem,5vw,6rem)] tracking-tighter leading-[0.9]">
            Projects
          </h1>
        </div>

        <div className="space-y-0">
          {projectSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-10 border-b border-black"
            >
              <div className="border-b border-black px-[24px] py-[18px] md:px-[36px] md:py-[22px] xl:px-[48px]">
                <h2 className="font-serif text-[clamp(2rem,3.2vw,3.5rem)] leading-[0.95] tracking-tighter">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {section.projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}