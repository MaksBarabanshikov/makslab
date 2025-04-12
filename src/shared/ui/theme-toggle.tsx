'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from './button';

import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleToggle = () => {
    return setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button onClick={handleToggle} aria-label="Переключить тему" size={'icon'}>
      {theme === 'dark' ? <Sun></Sun> : <Moon></Moon>}
    </Button>
  );
};
