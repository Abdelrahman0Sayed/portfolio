'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PinnedCodeBlock {
  code: string
  language: string
  fileName?: string
  showLineNumbers: boolean
}

interface PinnedCodeContextType {
  pinnedCode: PinnedCodeBlock | null
  setPinnedCode: (code: PinnedCodeBlock | null) => void
  isPinned: (code: string) => boolean
}

const PinnedCodeContext = createContext<PinnedCodeContextType | undefined>(undefined)

export function PinnedCodeProvider({ children }: { children: ReactNode }) {
  const [pinnedCode, setPinnedCode] = useState<PinnedCodeBlock | null>(null)

  const isPinned = (code: string) => {
    return pinnedCode?.code === code
  }

  return (
    <PinnedCodeContext.Provider value={{ pinnedCode, setPinnedCode, isPinned }}>
      {children}
    </PinnedCodeContext.Provider>
  )
}

export function usePinnedCode() {
  const context = useContext(PinnedCodeContext)
  if (context === undefined) {
    throw new Error('usePinnedCode must be used within a PinnedCodeProvider')
  }
  return context
}
