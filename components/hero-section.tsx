'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import { GlitchText } from './glitch-text'
import { useState, useRef } from 'react'
import { assetPath } from '@/lib/asset-path'

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

export function HeroSection() {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    
    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <section className="relative flex items-center justify-center px-4 py-12 mt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl opacity-20 animate-[pulse_1s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 animate-[pulse_1s_ease-in-out_infinite]"></div>
      </div>

      {/* Hero Card with Mouse Tracking */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative max-w-5xl w-full mx-auto perspective-1000"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="card-dark p-8 md:p-12 rounded-3xl border-2 border-zinc-800 hover:border-red-500/50 transition-all duration-500 shadow-2xl">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Headline with Glitch Effect */}
            <motion.div
              className="relative text-center"
              variants={textVariants}
              custom={0}
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight" style={{ fontFamily: 'Csagerix, ui-sans-serif, system-ui, sans-serif' }}>
                <GlitchText className="neon-glow">
                  Your goddamn Security Savvy
                </GlitchText>
                </h1>
            </motion.div>

            {/* Sub-headline */}
            <motion.div
              className="space-y-2 text-center"
              variants={textVariants}
              custom={1}
            >
              
              <p className="text-lg md:text-xl text-light-gray-500 font-mono">
                Offensive Cybersecurity | Penetration Tester | BackEnd Developer
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex justify-center gap-6 pt-8"
              variants={textVariants}
              custom={2}
            >
              <a
                href="https://github.com/Abdelrahman0Sayed"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label="GitHub"
              >
                <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100"></div>
                <div className="relative w-12 h-12 flex items-center justify-center rounded-lg border border-red-500/30 group-hover:border-red-500 transition-colors bg-zinc-900/50">
                  <Github className="w-6 h-6 text-red-500 group-hover:text-red-400" />
                </div>
              </a>

              <a
                href="https://linkedin.com/in/abdelrahman-sayed-nyx0r"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100"></div>
                <div className="relative w-12 h-12 flex items-center justify-center rounded-lg border border-purple-500/30 group-hover:border-purple-500 transition-colors bg-zinc-900/50">
                  <Linkedin className="w-6 h-6 text-purple-500 group-hover:text-purple-400" />
                </div>
              </a>

              <a
                href="https://x.com/th3Nyx0r"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label="X (Twitter)"
              >
                <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100"></div>
                <div className="relative w-12 h-12 flex items-center justify-center rounded-lg border border-red-500/30 group-hover:border-red-500 transition-colors bg-zinc-900/50">
                  <img src={assetPath('/x.png')} alt="X" className="w-6 h-6 group-hover:opacity-80 transition-opacity" />
                </div>
              </a>
            </motion.div>

            {/* CTA Button */}
            
          </motion.div>

        {/* <motion.div
              className="space-y-2 pt-10 text-center"
              variants={textVariants}
              custom={1}
            >
              
              <p className="text-lg md:text-xl text-white-500 font-mono">
                "Sometimes you need to remind them who you are..."
              </p>
            </motion.div> */}
          
        </div>
        
      </motion.div>

      {/* Scroll Indicator
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-zinc-500">Scroll to explore</span>
          <div className="w-6 h-10 border border-zinc-500 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-red-500 rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div> */}
    </section>
  )
}
