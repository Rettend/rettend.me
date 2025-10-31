import type { JSX } from 'solid-js'
import type { ButtonProps } from '~/components/ui/button'

import { splitProps } from 'solid-js'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export interface LinkButtonProps extends ButtonProps<'a'>, JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  external?: boolean
  class?: string
}

export default function LinkButton(props: LinkButtonProps) {
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

  const rel = local.external ? (local.rel ?? 'noopener noreferrer') : local.rel
  const target = local.external ? (local.target ?? '_blank') : local.target
  const variant = local.variant ?? 'link'

  return (
    <Button
      as="a"
      href={local.href}
      rel={rel}
      target={target}
      class={cn('h-auto text-base', variant === 'link' && 'p-0', local.class)}
      variant={variant}
      size={local.size}
      {...rest}
    >
      {local.children}
    </Button>
  )
}
