export function countWords(s: string): number {
  const t = s.trim()
  if (!t) return 0
  return t.split(/\s+/).length
}
