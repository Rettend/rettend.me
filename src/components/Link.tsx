import type { VariantProps } from 'class-variance-authority'
import type { JSX } from 'solid-js'
import { cva } from 'class-variance-authority'
import { createMemo, splitProps } from 'solid-js'
import { cn } from '~/lib/utils'

const linkVariants = cva('', {
  variants: {
    variant: {
      default: '',
      underline: 'underline underline-offset-4 decoration-primary/30 hover:decoration-primary',
      glow: 'text-foreground/80 hover:text-foreground hover:[text-shadow:0_0_3px_hsl(var(--primary))]',
    },
    size: {
      default: '',
      icon: 'size-10 inline-flex items-center justify-center',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface LinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
  href: string
  external?: boolean
  class?: string
}

export default function Link(props: LinkProps) {
  const [local, rest] = splitProps(props, [
    'href',
    'external',
    'rel',
    'target',
    'class',
    'children',
    'variant',
    'size',
  ])

  const rel = createMemo(() => local.external ? (local.rel ?? 'noopener noreferrer') : local.rel)
  const target = createMemo(() => local.external ? (local.target ?? '_blank') : local.target)

  return (
    <a
      href={local.href}
      rel={rel()}
      target={target()}
      class={cn(linkVariants({ variant: local.variant, size: local.size }), local.class)}
      {...rest}
    >
      {local.children}
    </a>
  )
}
