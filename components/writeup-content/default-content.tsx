import { Share2 } from 'lucide-react'
import { useState } from 'react'
import { SplitViewWrapper } from '@/components/split-view-wrapper'

interface WriteupContentProps {
  writeup: any
}

export function DefaultContent({ writeup }: WriteupContentProps) {
  const [copied, setCopied] = useState(false)

  return (
    <SplitViewWrapper>
      <article className="w-full max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <p className="text-sm font-mono text-zinc-400">{writeup.date}</p>
      </div>

      <h1 className="text-4xl md:text-5xl font-light text-center mb-6 font-mono leading-tight">
        {writeup.title}
      </h1>

      <div className="text-center mb-8 space-y-4">
        <p className="text-sm text-zinc-400 font-mono">{writeup.subtitle}</p>
        
        <div className="flex items-center justify-center gap-2">
          <Share2 size={16} className={copied ? "text-green-500" : "text-red-500"} />
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="text-sm font-mono cursor-pointer hover:text-red-400 transition-colors"
          >
            {copied ? "Copied!" : "Share"}
          </button>
        </div>
      </div>

      <div className="text-center mb-16">
        <p className="text-3xl text-white-500 font-bold tracking-widest">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
      </div>

      <div className="mb-16">
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900">
          <img
            src={writeup.coverImage}
            alt={writeup.title}
            className="w-full h-96 object-cover"
          />
        </div>
      </div>

      <div className="space-y-8 text-lg leading-relaxed text-zinc-300">
        <p>
          Writeup content coming soon...
        </p>

        <div className="bg-zinc-800/50 border-l-4 border-zinc-600 px-6 py-4 rounded">
          <p className="text-zinc-400 italic text-sm">
            This writeup is currently under development. Check back soon for the full content.
          </p>
        </div>
      </div>
    </article>
    </SplitViewWrapper>
  )
}
