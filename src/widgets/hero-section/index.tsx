'use client';
import { Button, buttonVariants } from '@/shared/ui/shadcn/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center text-center h-screen px-4 sm:px-6 lg:px-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
      >
        Привет, я Максим
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 text-lg sm:text-xl max-w-2xl text-muted-foreground"
      >
        Добро пожаловать в makslab — пространство, где рождаются идеи, превращающиеся в живой,
        интерактивный UI.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10"
      >
        <Link className={buttonVariants({ size: 'lg' })} href="#projects">
          Смотреть проекты
        </Link>
      </motion.div>
    </section>
  );
};
