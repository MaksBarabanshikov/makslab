'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './shadcn/card';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  path: string;
}

export const ProjectCard = ({ title, description, tech, image, path }: ProjectCardProps) => {
  return (
    <Link href={path} className="group block">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <Image
          src={image}
          alt={title}
          width={800}
          height={534}
          className="h-48 w-full object-cover transition-transform group-hover:scale-105"
          priority
        />

        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <ul className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <li
                key={t}
                className="rounded bg-primary/10 px-2 py-1 text-xs uppercase tracking-wide"
              >
                {t}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Link>
  );
};
