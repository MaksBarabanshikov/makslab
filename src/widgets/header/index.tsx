'use client';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { useEffect } from 'react';

export const Header = () => {
  useEffect(() => {
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({ duration: 1.2 });
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      document.querySelectorAll("a[href^='#']").forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute('href')!;
          const target = document.querySelector(targetId);
          if (target) {
            lenis.scrollTo(target as HTMLElement, { offset: -60 });
          }
        });
      });
    });
  }, []);

  const navData = [
    {
      href: '#home',
      text: 'Главная',
    },
    {
      href: '#projects',
      text: 'Проекты',
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-background/80 text-foreground border-b border-black/10 dark:border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <span className="font-bold text-xl tracking-tight">Makslab</span>

        <div className="flex items-center gap-6">
          <ul className="hidden sm:flex space-x-6 text-sm font-medium">
            {navData.map((item) => {
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-foreground/80 text-foreground"
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
