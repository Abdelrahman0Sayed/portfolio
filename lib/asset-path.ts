// Helper function to prefix asset paths with the base path for GitHub Pages deployment
const BASE_PATH = '/portfolio'

export function assetPath(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_PATH}/${cleanPath}`
}
