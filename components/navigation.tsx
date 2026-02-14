'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/arsenal' },
    { label: 'Certificates', href: '/certifications' },
    { label: 'About', href: '/experience' },
    // { label: 'Resources', href: '/resources' },
    // { label: 'Coffee', href: '/coffee' },
  ]

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Center: Brand */}
            <div className="flex flex-col items-center">
            <span className="font-light text-white text-2xl tracking-wider" style={{ fontFamily: 'Csagerix, ui-sans-serif, system-ui, sans-serif' }}><a href='/'>NyxOr - 古鲁</a></span>
            </div>

          {/* Right: Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-red-500 hover:text-red-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center pt-20">
          <div className="flex flex-col items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl md:text-4xl font-bold text-white hover:text-red-500 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
