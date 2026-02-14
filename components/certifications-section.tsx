'use client'

import { motion } from 'framer-motion'
import { Award, Check } from 'lucide-react'

interface Certification {
  id: number
  name: string
  issuer: string
  description: string
}

const certifications: Certification[] = [
  {
    id: 1,
    name: 'CRTA',
    issuer: 'Cyber Warfare Lab (CWL)',
    description: 'Certified Red Team Analyst - Advanced offensive security certification',
  },
  {
    id: 2,
    name: 'eJPTv2',
    issuer: 'Netriders Academy',
    description: 'Junior Penetration Tester - Foundational penetration testing skills',
  },
  {
    id: 3,
    name: 'CompTIA Security+',
    issuer: 'Netriders Academy',
    description: 'CompTIA Security+ - Comprehensive security fundamentals certification',
  },
]

const certVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-20 px-4">
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
            Certifications
          </h2>
          <p className="text-zinc-400 font-mono text-sm">
            Professional credentials and achievements
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={certVariants}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="card-dark group p-6 flex flex-col relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -mr-10 -mt-10 group-hover:bg-red-500/20 transition-colors duration-300"></div>

              {/* Icon */}
              <div className="mb-6 relative z-10">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-red-500/20 to-purple-500/20 border border-red-500/50 text-red-500 group-hover:text-red-400 transition-colors duration-300">
                  <Award size={24} />
                </div>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-4 text-red-500 font-mono text-sm relative z-10">
                <Check size={16} />
                <span>Verified</span>
              </div>

              {/* Certification Name */}
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300 relative z-10">
                {cert.name}
              </h3>

              {/* Issuer */}
              <p className="text-purple-400 font-mono text-sm mb-3 relative z-10">
                {cert.issuer}
              </p>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
                {cert.description}
              </p>

              {/* Hover border animation */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 rounded-xl transition-colors duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills section
        <motion.div
          className="mt-16 card-dark p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Core Competencies</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Penetration Testing',
              'Vulnerability Assessment',
              'Red Team Operations',
              'Network Security',
              'Malware Analysis',
              'Exploit Development',
              'Active Directory',
              'Web App Security',
              'Incident Response',
            ].map((skill) => (
              <motion.div
                key={skill}
                className="flex items-center gap-2 text-zinc-300 hover:text-red-500 transition-colors duration-300"
                whileHover={{ x: 4 }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}
