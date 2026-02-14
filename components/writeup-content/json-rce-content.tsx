'use client'

import { Share2 } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock, InlineCode } from '@/components/code-block'
import { SplitViewWrapper } from '@/components/split-view-wrapper'

interface WriteupContentProps {
  writeup: any
}

export function JsonRceContent({ writeup }: WriteupContentProps) {
  const [copied, setCopied] = useState(false)

  return (
    <SplitViewWrapper>
      <article className="w-full max-w-3xl mx-auto px-6 py-20">
      {/* Date */}
      <div className="text-center mb-8">
        <p className="text-sm font-mono text-zinc-400">{writeup.date}</p>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-light text-center mb-6 font-mono leading-tight">
        {writeup.title}
      </h1>

      {/* Metadata */}
      <div className="text-center mb-8 space-y-4">
        <p className="text-sm text-zinc-400 font-mono">{writeup.subtitle}</p>
        
        {/* Share Button */}
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

      {/* Basmalah */}
      <div className="text-center mb-16">
        <p className="text-xl text-red-500 font-light tracking-widest">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
      </div>

      {/* Featured Image */}
      <div className="mb-16">
        <div className="w-full border-2 border-red-500/30 rounded-lg overflow-hidden bg-zinc-900">
          <img
            src={writeup.coverImage}
            alt={writeup.title}
            className="w-full h-96 object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8 text-lg leading-relaxed text-zinc-300">
        
        {/* Quote */}
        <p className="text-center italic text-zinc-400 border-l-4 border-red-500 pl-6 py-4">
          {"Once you see it, you can't unsee it."}
        </p>

        {/* Introduction */}
        <p>
          Hello!! "Gap" challenge writeup is finally here, this challenge wasn't about finding a complex gadget chain in the application logic. It was about exploiting a fundamental misalignment between how JSON derives data and how JavaScript defines code. Believe me, you are gonna enjoy this one!
        </p>

        <p>
          We are going to trick{' '}
          <InlineCode>lodash.template</InlineCode>{' '}
          into treating a single JSON object key as multiple function arguments, allowing us to smuggle in an RCE payload via ESC default parameters. Let's break it down step-by-step.
        </p>

        {/* Red Note Box */}
        <div className="bg-red-500/10 border-l-4 border-red-500 px-6 py-4 rounded">
          <p className="text-red-400 italic text-sm">
            If you ask how would I know it is related to image optimizer? You can go through Next.js documentation or source code, or simply ask a 🤖
          </p>
        </div>

        {/* Code Block */}
        <CodeBlock 
          code={`import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "http", hostname: "*" }]
  }
}

export default nextConfig`}
          language="typescript"
          fileName="next.config.ts"
          showLineNumbers={true}
        />

        <p>
          The <InlineCode>hostname: "*"</InlineCode> wildcard allows the image optimizer to fetch images from <InlineCode>any</InlineCode> HTTP host. This is a red flag here and might lead to an entry point!
        </p>

        {/* Info Box */}
        <div className="bg-blue-500/10 border-l-4 border-blue-500 px-6 py-4 rounded">
          <div className="flex items-start gap-3">
            <span className="text-blue-400 text-lg">✨</span>
            <div>
              <p className="text-blue-400 text-sm font-semibold mb-2">Show thinking</p>
              <div className="bg-zinc-900 border border-zinc-800 rounded p-3 text-xs text-zinc-400 mt-2">
                <p className="mb-2">This configuration tells Next.js to allow the Image Optimization API to load and resize images from any domain, but strictly over the insecure http protocol.</p>
                <p className="mt-2">Here is the direct breakdown of its effects:</p>
              </div>
            </div>
          </div>
        </div>

        {/* Numbered List */}
        <ol className="space-y-4 list-decimal list-inside">
          <li>
            It allows "Wildcard" Domains (<InlineCode>hostname: "*"</InlineCode>)
          </li>
          <li>
            Which means it will fetch images from <InlineCode>any</InlineCode> HTTP endpoint
          </li>
          <li>
            The image optimizer is now exposed to potential SSRF, XXE, and other attacks
          </li>
        </ol>

        {/* Section Heading */}
        <h2 className="text-2xl font-bold font-mono mt-12">Quick Summary</h2>
        
        <p>
          This challenge presents a simple web application built with Next.js that uses the Image Optimization API with insecure configuration, allowing us to exploit the vulnerability chain and achieve RCE.
        </p>

        <p className="text-red-500 font-mono hover:underline cursor-pointer">
          Download challenge from here
        </p>

      </div>
    </article>
    </SplitViewWrapper>
  )
}
