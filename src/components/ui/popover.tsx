import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { Component, ValidComponent } from 'solid-js'

import * as PopoverPrimitive from '@kobalte/core/popover'
import { createContext, createMemo, createSignal, splitProps, untrack, useContext } from 'solid-js'

import { cn } from '~/lib/utils'

interface HoverCtx {
  onEnter: () => void
  onLeave: () => void
}

const HoverPopoverContext = createContext<HoverCtx>()

const Popover: Component<PopoverPrimitive.PopoverRootProps> = (props) => {
  const [local, others] = splitProps(props, ['open', 'onOpenChange', 'children'])
  const [internalOpen, setInternalOpen] = createSignal(false)
  const [clickEnabled, setClickEnabled] = createSignal(true)
  let hoverTimeoutId: number | undefined
  let clickEnableTimeoutId: number | undefined

  const isControlled = createMemo(() => local.open !== undefined)
  const open = createMemo(() => (isControlled() ? local.open! : internalOpen()))

  const handleMouseEnter = () => {
    if (hoverTimeoutId !== undefined) clearTimeout(hoverTimeoutId)

    setClickEnabled(false)
    if (clickEnableTimeoutId !== undefined) clearTimeout(clickEnableTimeoutId)

    hoverTimeoutId = window.setTimeout(() => {
      untrack(() => {
        if (isControlled()) local.onOpenChange?.(true)
        else setInternalOpen(true)
      })
      clickEnableTimeoutId = window.setTimeout(() => {
        setClickEnabled(true)
      }, 500)
    }, 200)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutId !== undefined) clearTimeout(hoverTimeoutId)
    if (clickEnableTimeoutId !== undefined) clearTimeout(clickEnableTimeoutId)

    setClickEnabled(true)
    hoverTimeoutId = window.setTimeout(() => {
      untrack(() => {
        if (isControlled()) local.onOpenChange?.(false)
        else setInternalOpen(false)
      })
    }, 200)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!clickEnabled()) return
    if (isControlled()) local.onOpenChange?.(isOpen)
    else setInternalOpen(isOpen)
  }

  return (
    <HoverPopoverContext.Provider value={{ onEnter: handleMouseEnter, onLeave: handleMouseLeave }}>
      <PopoverPrimitive.Root gutter={4} open={open()} onOpenChange={handleOpenChange} {...others}>
        {local.children}
      </PopoverPrimitive.Root>
    </HoverPopoverContext.Provider>
  )
}

type PopoverContentProps<T extends ValidComponent = 'div'>
  = PopoverPrimitive.PopoverContentProps<T> & {
    class?: string | undefined
    onMouseEnter?: (e: MouseEvent) => void
    onMouseLeave?: (e: MouseEvent) => void
  }

function PopoverContent<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, PopoverContentProps<T>>) {
  const [local, others] = splitProps(props as PopoverContentProps, ['class', 'onMouseEnter', 'onMouseLeave'])
  const ctx = useContext(HoverPopoverContext)
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        class={cn(
          'z-50 w-fit origin-[var(--kb-popover-content-transform-origin)] rounded-md border border-2 bg-popover p-2 text-popover-foreground shadow-xl outline-none data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95',
          local.class,
        )}
        onMouseEnter={(e: MouseEvent) => {
          ctx?.onEnter()
          local.onMouseEnter?.(e)
        }}
        onMouseLeave={(e: MouseEvent) => {
          ctx?.onLeave()
          local.onMouseLeave?.(e)
        }}
        {...others}
      />
    </PopoverPrimitive.Portal>
  )
}

type PopoverTriggerProps<T extends ValidComponent = 'button'> = PopoverPrimitive.PopoverTriggerProps<T> & {
  class?: string | undefined
  onMouseEnter?: (e: MouseEvent) => void
  onMouseLeave?: (e: MouseEvent) => void
}

function PopoverTrigger<T extends ValidComponent = 'button'>(props: PolymorphicProps<T, PopoverTriggerProps<T>>) {
  const [local, others] = splitProps(props as PopoverTriggerProps, ['onMouseEnter', 'onMouseLeave', 'class'])
  const ctx = useContext(HoverPopoverContext)
  return (
    <PopoverPrimitive.Trigger
      class={cn('focus-visible:outline-none', local.class)}
      onMouseEnter={(e: MouseEvent) => {
        ctx?.onEnter()
        local.onMouseEnter?.(e)
      }}
      onMouseLeave={(e: MouseEvent) => {
        ctx?.onLeave()
        local.onMouseLeave?.(e)
      }}
      {...others}
    />
  )
}

export { Popover, PopoverContent, PopoverTrigger }
