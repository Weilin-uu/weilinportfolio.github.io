import { Link } from "react-router-dom";

interface HeaderProps {
  right?: "projects" | "title";
  title?: string;
}

export default function Header({ right = "projects", title }: HeaderProps) {
  return (
    <header
      style={{ position: "relative", zIndex: 10 }}
      className="h-[64px] max-md:h-[48px] w-full flex items-center justify-between border-b border-black flex-shrink-0 bg-my-bg"
    >
      <Link
        to="/"
        className="text-sm tracking-widest uppercase font-sans hover:opacity-50 transition-opacity pl-[48px] max-md:pl-[24px]"
      >
        Home
      </Link>

      {right === "projects" ? (
        <Link
          to="/projects"
          className="text-sm tracking-widest uppercase font-sans hover:opacity-50 transition-opacity pr-[48px] max-md:pr-[24px]"
        >
          Projects
        </Link>
      ) : (
        <span className="font-sans text-sm tracking-widest uppercase pr-[48px] max-md:pr-[24px]">
          {title}
        </span>
      )}
    </header>
  );
}