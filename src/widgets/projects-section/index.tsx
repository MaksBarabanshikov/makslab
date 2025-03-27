// src/widgets/projects-section/index.tsx
import { ProjectCard } from "@/shared/ui/project-card";

const projects = [
  {
    title: "Фуллскрин Scroll сайт",
    description: "Сайт с анимацией скролла и эффектами",
    tech: ["Next.js", "GSAP", "Framer Motion"],
    image: "/image.png",
  },
  {
    title: "Список товаров",
    description: "Каталог с фильтрами, SSR и ISR",
    tech: ["Next.js", "TailwindCSS", "Zustand"],
    image: "/image.png",
  },
  {
    title: "UI Playground",
    description: "Компоненты и UI-эксперименты",
    tech: ["React", "Shadcn", "Radix UI"],
    image: "/image.png",
  },
];

export const ProjectsSection = () => {
    return (
      <section
        id="projects"
        className="px-4 sm:px-6 lg:px-8 py-16 text-foreground bg-secondary"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Проекты
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
    );
  };