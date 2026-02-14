'use client'

import { useState } from 'react'
import { usePinnedCode } from './pinned-code-context'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { X, Copy, Check } from 'lucide-react'

export function SplitViewWrapper({ children }: { children: React.ReactNode }) {
  const { pinnedCode, setPinnedCode } = usePinnedCode()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (pinnedCode) {
      await navigator.clipboard.writeText(pinnedCode.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const customStyle = {
    margin: 0,
    padding: '1rem 1.5rem',
    background: '#1e1e1e',
    fontSize: '0.875rem',
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
  }

  if (!pinnedCode) {
    return <>{children}</>
  }

  return (
    <div className="flex gap-4 relative">
      {/* Left side - Scrollable content */}
      <div className="w-1/2 pr-4">
        {children}
      </div>

      {/* Right side - Fixed pinned code */}
      <div className="w-1/2 fixed right-0 top-20 h-[calc(100vh-5rem)] overflow-hidden pr-6 flex items-center justify-center">
        <div className="bg-[#1e1e1e] border border-zinc-800 rounded-lg overflow-hidden shadow-lg max-h-full flex flex-col">
          {/* Header */}
          <div className="bg-[#2d2d30] px-4 py-2 border-b border-zinc-800 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              {pinnedCode.fileName && (
                <span className="text-xs font-mono text-zinc-300">{pinnedCode.fileName}</span>
              )}
              {!pinnedCode.fileName && (
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{pinnedCode.language}</span>
              )}
              <span className="text-xs text-red-400 font-mono">PINNED</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 rounded text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setPinnedCode(null)}
                className="flex items-center gap-2 px-3 py-1 rounded text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-all duration-200"
              >
                <X size={14} />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-hidden">
            <SyntaxHighlighter
              language={pinnedCode.language}
              style={vscDarkPlus}
              customStyle={customStyle}
              showLineNumbers={pinnedCode.showLineNumbers}
              lineNumberStyle={{
                minWidth: '3em',
                paddingRight: '1em',
                color: '#858585',
                borderRight: '1px solid #3e3e42',
                marginRight: '1em',
                userSelect: 'none',
              }}
              wrapLines={true}
              wrapLongLines={true}
              PreTag="div"
            >
              {pinnedCode.code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  )
}
