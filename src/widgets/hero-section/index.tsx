"use client";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section id="home" className="flex flex-col justify-center items-center text-center h-screen px-4 sm:px-6 lg:px-8">
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
        Добро пожаловать в makslab — пространство, где рождаются идеи, превращающиеся в живой, интерактивный UI.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10"
      >
        <a
  href="#projects"
  className="inline-block px-6 py-3 rounded-xl text-foreground bg-background transition-all duration-300
    shadow-[0_4px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.12)]
    hover:-translate-y-1 active:scale-95
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50"
>
  Смотреть проекты
</a>
      </motion.div>
    </section>
  );
};