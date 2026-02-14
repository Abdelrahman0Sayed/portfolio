'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, ExternalLink } from 'lucide-react'
import { assetPath } from '@/lib/asset-path'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-zinc-800 bg-zinc-950 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Contact Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* X (Twitter) */}
          <div className="card-dark p-6">
            <div className="flex items-center gap-3 mb-4">
              <img src={assetPath('/x.png')} alt="X" className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">X</h3>
            </div>
            <a
              href="https://x.com/th3Nyx0r"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors duration-300 font-mono text-sm flex items-center gap-1"
            >
              @th3Nyx0r
              <ExternalLink size={14} />
            </a>
          </div>

          {/* GitHub */}
          <div className="card-dark p-6">
            <div className="flex items-center gap-3 mb-4">
              <Github className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">GitHub</h3>
            </div>
            <a
              href="https://github.com/Abdelrahman0Sayed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-mono text-sm flex items-center gap-1"
            >
              @Abdelrahman0Sayed
              <ExternalLink size={14} />
            </a>
          </div>

          {/* LinkedIn */}
          <div className="card-dark p-6">
            <div className="flex items-center gap-3 mb-4">
              <Linkedin className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-white">LinkedIn</h3>
            </div>
            <a
              href="https://linkedin.com/in/abdelrahman-sayed-nyx0r"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors duration-300 font-mono text-sm flex items-center gap-1"
            >
              Abdelrahman Sayed
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-zinc-800 mb-8"></div>

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Left - Basmalah */}
          <div className="text-center md:text-left">
            <p className="text-sm text-zinc-500 font-mono mb-2">
              Built with React + Next.js + Framer Motion
            </p>
            <p className="text-xs text-zinc-600 font-light tracking-widest">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </div>

          {/* Right - Copyright */}
          <div className="text-center md:text-right">
            <p className="text-xs text-zinc-500 font-mono">
              © {currentYear} Abdelrahman Sayed Nasr. All rights reserved.
            </p>
            <p className="text-xs text-zinc-600 mt-1">
              Security through knowledge, strength through skill
            </p>
          </div>
        </motion.div>

        {/* Animated bottom line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </footer>
  )
}
