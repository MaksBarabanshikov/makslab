'use client';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  path: string;
}

export const ProjectCard = ({ title, description, tech, image, path }: ProjectCardProps) => {
  return (
    <div className="bg-background border rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <Link href={path}>
        <Image
          src={image}
          alt={title}
          width={800}
          height={500}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tech.map((item, i) => (
              <span key={i} className="text-xs bg-primary/10 px-2 py-1 rounded">
                {item}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};
