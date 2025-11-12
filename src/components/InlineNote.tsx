import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { cn } from '~/lib/utils'

export interface InlineNoteProps {
  label?: string | number
  class?: string
  children: JSX.Element
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export default function InlineNote(props: InlineNoteProps) {
  const [local, others] = splitProps(props, ['label', 'class', 'children', 'placement'])

  return (
    <Popover placement={local.placement ?? 'top'} {...others}>
      <PopoverTrigger
        as="button"
        aria-label="Inline note"
        class={cn(
          'align-super inline-flex cursor-default size-4 items-center justify-center rounded-full border border-foreground/20 bg-accent/50 text-sm font-bold text-foreground/80 shadow-sm transition-colors hover:bg-accent',
          local.class,
        )}
      >
        {local.label ?? 'i'}
        <span class="sr-only">Open note</span>
      </PopoverTrigger>
      <PopoverContent class="max-w-72 whitespace-pre-wrap leading-snug">
        {local.children}
      </PopoverContent>
    </Popover>
  )
}
