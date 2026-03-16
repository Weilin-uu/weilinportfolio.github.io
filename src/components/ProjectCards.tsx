import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/project/${project.slug}`}
      className="block border-r border-b border-black first:border-l"
      aria-label={project.title}
    >
      <div className="group relative flex h-full min-h-[420px] flex-col bg-my-bg">
        {project.year && (
          <div className="absolute right-5 top-5 font-futura-heavy text-[16px] tracking-[0.08em] text-black">
            {project.year}
          </div>
        )}

        <div className="px-5 pt-5 md:px-6 md:pt-6">
          {project.chips?.[0] && (
            <span className="inline-flex rounded-full border border-black px-3 py-1 font-futura-medium text-[10px] uppercase tracking-[0.12em] text-black">
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
            <h3 className="font-futura-heavy text-[14px] uppercase tracking-[0.04em] leading-[1.2] text-black md:text-[15px]">
              {project.title}
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.chips.slice(1).map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-black px-3 py-1 font-futura-medium text-[10px] uppercase tracking-[0.12em] text-black/70"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 rounded-full border border-black px-4 py-2 font-futura-medium text-[11px] font-medium uppercase tracking-[0.08em] text-black transition-colors duration-200 hover:bg-brand hover:text-white hover:border-brand">
            View
          </div>
        </div>
      </div>
    </Link>
  );
}