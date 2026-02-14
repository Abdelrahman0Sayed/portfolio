'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlitchTextProps {
  children: ReactNode
  className?: string
}

const glitchVariants = {
  animate: {
    textShadow: [
      '0px 0px 0px rgba(0, 217, 255, 0)',
      '-2px 0px 0px rgba(0, 217, 255, 0.8)',
      '2px 0px 0px rgba(168, 85, 247, 0.8)',
      '0px 0px 0px rgba(0, 217, 255, 0)',
    ],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
}

export function GlitchText({ children, className = '' }: GlitchTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      variants={glitchVariants}
      animate="animate"
    >
      {children}
    </motion.span>
  )
}

// Typing animation variant
const typingVariants = {
  hidden: { opacity: 0, width: 0 },
  animate: {
    opacity: 1,
    width: 'auto',
    transition: {
      duration: 0.05,
    },
  },
}

const cursorVariants = {
  animate: {
    opacity: [1, 1, 0, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
    },
  },
}

interface TypingTextProps {
  text: string
  className?: string
  delay?: number
}

export function TypingText({ text, className = '', delay = 0 }: TypingTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <motion.span
        initial="hidden"
        animate="animate"
        transition={{ delayChildren: delay, staggerChildren: 0.05 }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={typingVariants}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
      <motion.span
        className="absolute -right-1 bottom-0 w-0.5 h-full bg-cyan-400"
        variants={cursorVariants}
        animate="animate"
      />
    </span>
  )
}
