"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { MOTION_DISTANCE_REVEAL, MOTION_DURATION_FAST, MOTION_DURATION_REVEAL, MOTION_EASE_STANDARD } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
  y?: number;
}

export function Reveal({ children, delay = 0, className, amount = 0.2, y = MOTION_DISTANCE_REVEAL }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: prefersReducedMotion ? MOTION_DURATION_FAST : MOTION_DURATION_REVEAL, ease: MOTION_EASE_STANDARD, delay }}
    >
      {children}
    </motion.div>
  );
}
