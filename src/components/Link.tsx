import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { cn } from '~/lib/utils'

export interface LinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  external?: boolean
  class?: string
}

export default function Link(props: LinkProps) {
  const [local, rest] = splitProps(props, ['href', 'external', 'rel', 'target', 'class', 'children'])

  const rel = local.external ? (local.rel ?? 'noopener noreferrer') : local.rel
  const target = local.external ? (local.target ?? '_blank') : local.target

  return (
    <a
      href={local.href}
      rel={rel}
      target={target}
      class={cn('p-0 h-auto text-base', local.class)}
      {...rest}
    >
      {local.children}
    </a>
  )
}
