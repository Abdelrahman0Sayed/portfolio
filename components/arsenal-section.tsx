'use client'

import React from "react"

import { motion } from 'framer-motion'
import { Code2, AlertCircle, BarChart3 } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  status: 'In Progress' | 'Completed' | 'Continuous'
  technologies: string[]
  link?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Hudhayfa C2 (Command & Control)',
    description: 'Developing Hudhayfa C2, a custom Command & Control framework for centralized and secure management of remote agents, Supports encrypted communications, remote command execution, and Obfuscated Payloads Generation.',
    icon: <Code2 className="w-8 h-8" />,
    status: 'In Progress',
    technologies: ['C\\C++', 'Python', 'Encryption', 'Networking'],
  },
  {
    id: 2,
    title: 'Firmware Reverse Engineering using AI',
    description: 'AI-assisted reverse engineering of AVR firmware using Ghidra MCP and Claude AI to convert disassembled assembly code into readable C source code and recover program logic.',
    icon: <BarChart3 className="w-8 h-8" />,
    status: 'Completed',
    technologies: ['Ghidra', 'AI/ML', 'Reverse Engineering'],
    link: 'https://github.com/Abdelrahman0Sayed/ghidra_based_reverse_engineering',
  },
  {
    id: 3,
    title: 'RedTeam Attacks Replication',
    description: 'Built a self-hosted Active Directory lab to replicate real-world Red Team attacks by executing end-to-end TTPs, including information gathering, phishing, initial compromise, privilege escalation, and lateral movement.',
    icon: <AlertCircle className="w-8 h-8" />,
    status: 'Continuous',
    technologies: ['Active Directory', 'Windows', 'Security'],
  },
  {
    id: 4,
    title: 'Email Spam Detection',
    description: 'Email spam detection ML projects use machine learning algorithms to classify emails as spam or not spam based on content and features.',
    icon: <BarChart3 className="w-8 h-8" />,
    status: 'Completed',
    technologies: ['Machine Learning', 'Python', 'NLP'],
    link: 'https://www.kaggle.com/code/abdelrahman0sayed/emailspamdetection/',
  },
  {
    id: 5,
    title: 'PoCs & CTF Writeups',
    description: 'I am documenting and sharing my solutions to Capture The Flag (CTF) challenges and PoCs for public CVEs through detailed writeups on my portfolio & Medium & GitHub Account.',
    icon: <Code2 className="w-8 h-8" />,
    status: 'Continuous',
    technologies: ['Security Research', 'CTF', 'Documentation'],
    link: '/',
  },
]

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export function ArsenalSection() {
  return (
    <section id="arsenal" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Arsenal
          </h2>
          <p className="text-zinc-400 font-mono text-sm">
            Active projects and security tools
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              custom={index}
              className="card-dark group p-6 flex flex-col hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100"></div>
                <div className="relative w-12 h-12 flex items-center justify-center rounded-lg border border-purple-500/30 group-hover:border-purple-500 transition-colors bg-zinc-900/50 text-purple-400 group-hover:text-purple-300">
                  {project.icon}
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full border ${
                    project.status === 'In Progress'
                      ? 'bg-red-500/10 border-red-500/30 text-red-500'
                      : project.status === 'Completed'
                      ? 'bg-green-500/10 border-green-500/30 text-green-500'
                      : 'bg-purple-400/10 border-purple-400/30 text-purple-400'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800 group-hover:border-purple-500/30 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link */}
              {project.link && (
                <a
                  href={project.link}
                  className="text-sm font-mono text-red-500 hover:text-red-400 transition-colors flex items-center gap-2 mt-auto"
                >
                  View Project →
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </section>
  )
}
