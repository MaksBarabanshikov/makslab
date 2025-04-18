'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { APP_NAME } from '../config/app';

export function Logo() {
  return (
    <Link href="/" className="group inline-block">
      <motion.span
        className="
          relative font-bold text-xl tracking-tight text-foreground
          after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
          after:origin-left after:scale-x-0 after:bg-primary
          after:transition-transform after:duration-300
          group-hover:after:scale-x-100
        "
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.6 }}
      >
        {APP_NAME}
      </motion.span>
    </Link>
  );
}
