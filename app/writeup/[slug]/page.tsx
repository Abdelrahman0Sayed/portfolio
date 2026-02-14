import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { getWriteup } from '@/lib/writeups-data'
import { notFound } from 'next/navigation'
import { JsonRceContent } from '@/components/writeup-content/json-rce-content'
import { HtbFactsContent } from '@/components/writeup-content/htb-facts-content'
import { CveContent } from '@/components/writeup-content/cve-content'
import { AndroidHackingContent } from '@/components/writeup-content/android-hacking-content'
import { PrivescToApplicationAdminContent } from '@/components/writeup-content/privesc-to-application-admin-content'
import { Zinad26RevContent } from '@/components/writeup-content/zinad-26-rev-content'
import { React2ShellContent } from '@/components/writeup-content/react2shell-content'
import { DefaultContent } from '@/components/writeup-content/default-content'
import { PinnedCodeProvider } from '@/components/pinned-code-context'

interface WriteupPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return [
    { slug: 'zinad-26-rev' },
    { slug: 'react2shell' },
    { slug: 'htb-facts' },
    { slug: 'cve-2025-24071' },
    { slug: 'android-hacking-intro' },
    { slug: 'json-rce' },
    { slug: 'privesc-to-application-admin' },
  ]
}

export default async function WriteupDetailPage({ params }: WriteupPageProps) {
  const { slug } = await params
  const writeup = getWriteup(slug)
  
  if (!writeup) {
    notFound()
  }

  // Render different content based on the slug
  const renderContent = () => {
    switch (slug) {
      case 'zinad-26-rev':
        return <Zinad26RevContent writeup={writeup} />
      case 'react2shell':
        return <React2ShellContent writeup={writeup} />
      case 'json-rce':
        return <JsonRceContent writeup={writeup} />
      case 'htb-facts':
        return <HtbFactsContent writeup={writeup} />
      case 'cve-2025-24071':
        return <CveContent writeup={writeup} />
      case 'android-hacking-intro':
        return <AndroidHackingContent writeup={writeup} />
      case 'privesc-to-application-admin':
        return <PrivescToApplicationAdminContent writeup={writeup} />
      default:
        return <DefaultContent writeup={writeup} />
    }
  }

  return (
    <PinnedCodeProvider>
      <main className="min-h-screen bg-zinc-950 text-white overflow-hidden relative">
        {/* Fixed B&W Background */}
        <div 
          className="fixed inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: 'url(/background.png)',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) brightness(0.5) contrast(1.1)'
          }}
        />
        
        <Navigation />

        {renderContent()}

        <Footer />
      </main>
    </PinnedCodeProvider>
  )
}
