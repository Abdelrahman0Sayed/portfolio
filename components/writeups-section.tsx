'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { assetPath } from '@/lib/asset-path'

interface WriteupCard {
  id: number
  slug: string
  title: string
  date: string
  tags: string[]
  image: string
}

const writeups: WriteupCard[] = [
  {
    id: 1,
    slug: 'react2shell',
    title: 'React2Shell | CVE-2025-55182',
    date: '13/02/26',
    tags: ['Security Research', 'Web'],
    image: assetPath('/writeup-cover/react2shell.png'),
  },
  {id: 2,
    slug: 'zinad-26-rev',
    title: 'ZinadIT Cyber champions CTF | Reverse Engineering',
    date: '08/02/26',
    tags: ['CTF', 'Reverse Engineering'],
    image: assetPath('/writeup-cover/zinad-26-reverse.png'),
  },
  {
    id: 3,
    slug: 'privesc-to-application-admin',
    title: '$XXX Privilege Escalation Vulnerability Led me to be Application admin',
    date: '5/02/26',
    tags: ['Bug Hunting', 'Web', 'Privilege Escalation'],
    image: assetPath('/writeup-cover/privsec-to-application-admin.png'),
  },  
  {
    id: 4,
    slug: 'htb-facts',
    title: 'HTB Season 10 | Facts Writeup',
    date: '26/01/26',
    tags: ['HackTheBox', 'Web', 'Linux'],
    image: assetPath('/writeup-cover/HTB_Facts.png'),
  },
  {
    id: 5,
    slug: 'cve-2025-24071',
    title: 'CVE-2025-24071, File Explorer vulnerability expose the NTLM Hashes',
    date: '17/12/25',
    tags: ['Security Research', 'Network'],
    image: assetPath('/writeup-cover/CVE-2025-24071.png'),
  },
  {
    id: 6,
    slug: 'android-hacking-intro',
    title: 'Introduction to Android App Hacking',
    date: '24/08/25',
    tags: ['Mobile', 'OWASP'],
    image: assetPath('/writeup-cover/AndroidHacking.png'),
  }
]

const cardVariants = {
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

export function WriteupsSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Get all unique tags
  const allTags = Array.from(new Set(writeups.flatMap(w => w.tags)))

  // Filter writeups based on search and tag
  const filteredWriteups = useMemo(() => {
    return writeups.filter(writeup => {
      const matchesSearch = writeup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           writeup.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesTag = !selectedTag || writeup.tags.includes(selectedTag)
      return matchesSearch && matchesTag
    })
  }, [searchQuery, selectedTag])

  return (
    <section id="writeups" className="relative py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Writeups & Research
          </h2>
          <p className="text-zinc-400 font-mono text-sm">
            Security research, CTF writeups, and vulnerability analysis
          </p>
        </motion.div> */}

        {/* Basmalah Header
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-3xl text-white-500 font-bold tracking-widest">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </motion.div> */}

        {/* Search and Filter Bar */}
        <motion.div
          className="mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search writeups by title or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-lg pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:border-red-500/50 focus:outline-none transition-colors duration-300"
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 border ${
                selectedTag === null
                  ? 'bg-red-500/20 border-red-500/50 text-red-500'
                  : 'bg-zinc-900/50 border-zinc-800/50 text-zinc-400/50 hover:border-zinc-700/50'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 border ${
                  selectedTag === tag
                    ? 'bg-red-500/20 border-red-500/50 text-red-500'
                    : 'bg-zinc-900/30 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          key={`${selectedTag}-${searchQuery}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredWriteups.length > 0 ? (
            filteredWriteups.map((writeup, index) => (
            <Link
              key={writeup.id}
              href={`/writeup/${writeup.slug}`}
            >
              <motion.article
                variants={cardVariants}
                custom={index}
                className="card-dark group cursor-pointer h-full flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300"
              >
              {/* Image Placeholder */}
              <div className="w-full h-64 bg-zinc-800 border-b border-zinc-800 overflow-hidden relative">
                {writeup.image ? (
                  <img 
                    src={writeup.image} 
                    alt={writeup.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 group-hover:from-red-500/20 group-hover:to-purple-500/20 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-zinc-600 font-mono text-xs text-center px-4">
                        [No Cover Image]
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-3 pb-0">
                {/* Date */}
                <p className="text-s font-mono text-zinc-500 mb-1 uppercase tracking-wider">
                  {writeup.date}
                </p>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-auto group-hover:text-red-500 transition-colors duration-300 line-clamp-2">
                  {writeup.title}
                </h3>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 px-3 pb-2 pt-4">
                {writeup.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-0.5 rounded-full text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-500 group-hover:bg-red-500/20 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover Arrow */}
              <div className="px-3 pb-3 flex items-center gap-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-mono">Read</span>
                <ArrowRight size={16} />
              </div>
            </motion.article>
            </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-zinc-400 font-mono">No writeups found matching your search.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
