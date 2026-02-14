'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  delay?: number
}

export function SectionDivider({ delay = 0 }: SectionDividerProps) {
  return (
    <motion.div
      className="relative h-8 flex items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="relative w-24 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-400 rounded-full"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(0, 217, 255, 0.4)',
              '0 0 0 10px rgba(0, 217, 255, 0)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  )
}
