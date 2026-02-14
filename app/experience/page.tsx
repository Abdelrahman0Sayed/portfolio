import { Navigation } from '@/components/navigation'
import { ExperienceSection } from '@/components/experience-section'
import { Footer } from '@/components/footer'
import { assetPath } from '@/lib/asset-path'

export default function ExperiencePage() {
  return (
    <main className="min-h-screen text-white overflow-hidden relative flex flex-col">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${assetPath('/background.png')})`,
          backgroundAttachment: 'fixed',
          backgroundSize: '40%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0f0f0f'
        }}
      />
      
      <Navigation />
      <div className="flex-grow">
        <ExperienceSection />
      </div>
      <Footer />
    </main>
  )
}
