'use client'

import { motion } from 'framer-motion'

interface ExperienceItem {
  id: number
  position: string
  company: string
  period: string
  description: string
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    position: 'Penetration Tester Internship',
    company: 'WE INNOVATE + ZeroSploit',
    period: 'Aug - Sep 2025',
    description: 'Conducted security assessments, vulnerability testing, and exploitation techniques for web applications and infrastructure.',
  },
  {
    id: 2,
    position: 'Cybersecurity Trainee',
    company: 'Information Technology Institute (ITI)',
    period: 'Aug - Sep 2023',
    description: 'Completed comprehensive cybersecurity fundamentals program including defensive and offensive security practices.',
  },    
  {
    id: 3,
    position: 'Systems and Biomedical Engineering Student',
    company: 'Cairo University',
    period: '2021 - 2026',
    description: '',
  },
]

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mission History
          </h2>
          <p className="text-zinc-400 font-mono text-sm">
            Professional experience and training
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-purple-500 to-transparent md:-translate-x-1/2"></div>

          {/* Timeline Items */}
          <motion.div
            className="space-y-12 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="relative"
              >
                <div className={`flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Left/Right Content */}
                  <div className="flex-1 md:block hidden"></div>

                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6">
                    <div className="relative w-4 h-4">
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-1 bg-zinc-950 rounded-full border border-red-500"></div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 ml-12 md:ml-0">
                    <div className="card-dark p-6 hover:border-red-500/50 transition-all duration-300">
                      {/* Period Badge */}
                      <div className="inline-block mb-4">
                        <span className="text-xs font-mono text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
                          {exp.period}
                        </span>
                      </div>

                      {/* Position */}
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {exp.position}
                      </h3>

                      {/* Company */}
                      <p className="text-purple-400 font-mono text-sm mb-4">
                        @ {exp.company}
                      </p>

                      {/* Description */}
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
