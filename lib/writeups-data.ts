export interface WriteupContent {
  slug: string
  title: string
  date: string
  subtitle: string
  coverImage: string
  tags: string[]
  content: React.ReactNode
}

export const writeupsData: Record<string, WriteupContent> = {
  'zinad-26-rev': {
    slug: 'zinad-26-rev',
    title: 'Zinad Cyber champions CTF | Reverse Engineering | Easy level',
    date: '26/01/26',
    subtitle: 'CTF Writeup: Zinad Cyber Champions - Reverse Engineering Challenge',
    coverImage: '/writeup-cover/zinad-26-reverse.png',
    tags: ['CTF', 'Reverse Engineering'],
    content: null,
  },
  'react2shell': {
    slug: 'react2shell',
    title: 'React2Shell | CVE-2025-55182',
    date: '26/01/26',
    subtitle: 'Security Research: React Server-Side Rendering Vulnerability',
    coverImage: '/writeup-cover/react2shell.png',
    tags: ['Security Research', 'Web'],
    content: null,
  },
  'htb-facts': {
    slug: 'htb-facts',
    title: 'HTB Season 10 | Facts Writeup',
    date: '26/01/26',
    subtitle: 'Official Writeup: Facts | HackTheBox Season 10',
    coverImage: '/writeup-cover/HTB_Facts.png',
    tags: ['HackTheBox', 'Web', 'Linux'],
    content: null, // Content will be JSX in the detail page
  },
  'cve-2025-24071': {
    slug: 'cve-2025-24071',
    title: 'CVE-2025-24071, File Explorer vulnerability expose the NTLM Hashes',
    date: '17/12/25',
    subtitle: 'Security Research: Windows File Explorer NTLM Hash Exposure',
    coverImage: '/writeup-cover/CVE-2025-24071.png',
    tags: ['Security Research', 'Network'],
    content: null,
  },
  'android-hacking-intro': {
    slug: 'android-hacking-intro',
    title: 'Introduction to Android App Hacking',
    date: '24/08/25',
    subtitle: 'A comprehensive guide to mobile application security testing',
    coverImage: '/writeup-cover/AndroidHacking.png',
    tags: ['Mobile', 'OWASP'],
    content: null,
  },
  'json-rce': {
    slug: 'json-rce',
    title: 'How JSON-JavaScript Discrepancy Leads to RCE (Lodash)',
    date: '26/01/26',
    subtitle: 'Official Writeup: gap | 0xL4ugh v5',
    coverImage: '/placeholder-logo.png',
    tags: ['Web', 'RCE', 'JavaScript'],
    content: null,
  },
  'privesc-to-application-admin': {
    slug: 'privesc-to-application-admin',
    title: '$XXX Privilege Escalation Vulnerability Led me to be Application admin',
    date: '5/02/26',
    subtitle: 'Bug Bounty: Privilege Escalation to Application Admin',
    coverImage: '/writeup-cover/privsec-to-application-admin.png',
    tags: ['Bug Hunting', 'Web', 'Privilege Escalation'],
    content: null,
  },
}

export function getWriteup(slug: string): WriteupContent | undefined {
  return writeupsData[slug]
}

export function getAllWriteupSlugs(): string[] {
  return Object.keys(writeupsData)
}
