import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { WriteupsSection } from '@/components/writeups-section'
import { ExperienceSection } from '@/components/experience-section'
import { ArsenalSection } from '@/components/arsenal-section'
import { CertificationsSection } from '@/components/certifications-section'
import { Footer } from '@/components/footer'
import { SectionDivider } from '@/components/section-divider'

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-hidden relative">
      {/* Hacky Dark Theme Background */}
      <div className="fixed inset-0 -z-10 bg-black">
        {/* Strong gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />
        
        {/* VERY VISIBLE Green Grid Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.25) 2px, transparent 2px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.25) 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px',
            opacity: 0.6
          }}
        />
        
        {/* Secondary grid for depth */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            opacity: 0.4
          }}
        />
        
        {/* VERY bright animated orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 right-20 w-[900px] h-[900px] bg-green-500/30 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-20 left-20 w-[800px] h-[800px] bg-cyan-500/25 rounded-full blur-[140px] animate-pulse" 
               style={{ animationDelay: '1.5s', animationDuration: '4s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-[120px] animate-pulse"
               style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
        </div>
        
        {/* Strong scanlines */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0, 255, 65, 0.03) 4px, rgba(0, 255, 65, 0.03) 8px)',
            opacity: 0.5
          }}
        />
      </div>
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Divider */}
      <SectionDivider />

      {/* Writeups & Research - Main Content */}
      <WriteupsSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
