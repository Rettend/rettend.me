import type { ClassValue } from 'class-variance-authority/types'
import { cx } from 'class-variance-authority'
import { unoMerge } from 'unocss-merge'

export function cn(...inputs: ClassValue[]) {
  return unoMerge(cx(inputs))
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
