'use client'

import { useState } from 'react'
import { Copy, Check, Pin, X } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { usePinnedCode } from './pinned-code-context'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  fileName?: string
}

export function CodeBlock({ code, language = 'bash', showLineNumbers = false, fileName }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const { pinnedCode, setPinnedCode, isPinned } = usePinnedCode()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePin = () => {
    if (isPinned(code)) {
      setPinnedCode(null)
    } else {
      setPinnedCode({ code, language: language || 'bash', fileName, showLineNumbers })
    }
  }

  const pinned = isPinned(code)

  // Custom style to match VS Code dark theme
  const customStyle = {
    margin: 0,
    padding: '1rem 1.5rem',
    background: '#1e1e1e',
    fontSize: '0.875rem',
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
  }

  return (
    <div className="bg-[#1e1e1e] border border-zinc-800 rounded-lg overflow-hidden shadow-lg my-6">
      {/* Header - VS Code style */}
      <div className="bg-[#2d2d30] px-4 py-2 border-b border-zinc-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {fileName && (
            <span className="text-xs font-mono text-zinc-300">{fileName}</span>
          )}
          {!fileName && (
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{language}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePin}
            className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-mono transition-all duration-200 ${
              pinned 
                ? 'text-red-400 bg-red-500/20 hover:bg-red-500/30' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-700/50'
            }`}
          >
            {pinned ? (
              <>
                <X size={14} />
                <span>Unpin</span>
              </>
            ) : (
              <>
                <Pin size={14} />
                <span>Pin</span>
              </>
            )}
          </button>
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
        </div>
      </div>

      {/* Code Content with Syntax Highlighting */}
      <div>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={customStyle}
          showLineNumbers={showLineNumbers}
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
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

// Inline code component for consistency
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-[#1e1e1e] px-2 py-1 rounded text-red-400 font-mono text-xs border border-zinc-800">
      {children}
    </code>
  )
}
