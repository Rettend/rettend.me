import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { Component, ValidComponent } from 'solid-js'

import * as TooltipPrimitive from '@kobalte/core/tooltip'
import { splitProps } from 'solid-js'

import { cn } from '~/lib/utils'

const TooltipTrigger = TooltipPrimitive.Trigger

const Tooltip: Component<TooltipPrimitive.TooltipRootProps> = (props) => {
  return <TooltipPrimitive.Root gutter={4} {...props} />
}

type TooltipContentProps<T extends ValidComponent = 'div'>
  = TooltipPrimitive.TooltipContentProps<T> & { class?: string | undefined }

function TooltipContent<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, TooltipContentProps<T>>) {
  const [local, others] = splitProps(props as TooltipContentProps, ['class'])
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          'z-50 origin-[var(--kb-popover-content-transform-origin)] overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
          local.class,
        )}
        {...others}
      />
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipTrigger }
