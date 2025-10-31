import type { ClassValue } from 'class-variance-authority/types'
import { cx } from 'class-variance-authority'
import { unoMerge } from 'unocss-merge'

export function cn(...inputs: ClassValue[]) {
  return unoMerge(cx(inputs))
}
