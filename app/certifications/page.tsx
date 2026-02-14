import { Navigation } from '@/components/navigation'
import { CertificationsSection } from '@/components/certifications-section'
import { Footer } from '@/components/footer'

export default function CertificationsPage() {
  return (
    <main className="min-h-screen text-white overflow-hidden relative flex flex-col">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundAttachment: 'fixed',
          backgroundSize: '40%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0f0f0f'
        }}
      />
      
      <Navigation />
      <div className="flex-grow">
        <CertificationsSection />
      </div>
      <Footer />
    </main>
  )
}
