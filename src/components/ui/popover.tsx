import type { JSX, ParentProps } from 'solid-js'
import { createContext, createEffect, createMemo, createSignal, onCleanup, Show, splitProps, useContext } from 'solid-js'
import { Dynamic, Portal } from 'solid-js/web'

import { cn } from '~/lib/utils'

type Placement = 'top' | 'bottom' | 'left' | 'right'
type HandlerEvent<T extends HTMLElement, E extends Event> = Parameters<JSX.EventHandler<T, E>>[0]

function callEventHandler<T extends HTMLElement, E extends Event>(
  handler: JSX.EventHandlerUnion<T, E> | undefined,
  event: HandlerEvent<T, E>,
) {
  if (!handler)
    return

  if (typeof handler === 'function') {
    handler(event)
    return
  }

  handler[0](handler[1], event)
}

interface PopoverContextValue {
  open: () => boolean
  setOpen: (next: boolean) => void
  placement: () => Placement
  triggerRef: () => HTMLElement | undefined
  setTriggerRef: (el: HTMLElement | undefined) => void
  contentRef: () => HTMLDivElement | undefined
  setContentRef: (el: HTMLDivElement | undefined) => void
  position: () => { top: number, left: number }
  updatePosition: () => void
  openSoon: () => void
  closeSoon: () => void
  cancelTimers: () => void
}

const PopoverContext = createContext<PopoverContextValue>()

function usePopoverContext() {
  const context = useContext(PopoverContext)
  if (!context)
    throw new Error('Popover components must be used within <Popover>')
  return context
}

interface PopoverProps extends ParentProps {
  open?: boolean
  onOpenChange?: (next: boolean) => void
  placement?: Placement
}

function Popover(props: PopoverProps) {
  const [local] = splitProps(props, ['open', 'onOpenChange', 'placement', 'children'])
  const [internalOpen, setInternalOpen] = createSignal(false)
  const [triggerRef, setTriggerRef] = createSignal<HTMLElement>()
  const [contentRef, setContentRef] = createSignal<HTMLDivElement>()
  const [position, setPosition] = createSignal({ top: 0, left: 0 })

  const isControlled = createMemo(() => local.open !== undefined)
  const open = createMemo(() => (isControlled() ? local.open! : internalOpen()))
  const placement = createMemo<Placement>(() => local.placement ?? 'bottom')

  let openTimeout: number | undefined
  let closeTimeout: number | undefined

  const setOpen = (next: boolean) => {
    if (!isControlled())
      setInternalOpen(next)
    local.onOpenChange?.(next)
  }

  const cancelTimers = () => {
    if (openTimeout !== undefined) {
      clearTimeout(openTimeout)
      openTimeout = undefined
    }
    if (closeTimeout !== undefined) {
      clearTimeout(closeTimeout)
      closeTimeout = undefined
    }
  }

  const openSoon = () => {
    if (typeof window === 'undefined')
      return
    cancelTimers()
    openTimeout = window.setTimeout(() => setOpen(true), 120)
  }

  const closeSoon = () => {
    if (typeof window === 'undefined')
      return
    cancelTimers()
    closeTimeout = window.setTimeout(() => setOpen(false), 120)
  }

  const updatePosition = () => {
    if (typeof window === 'undefined')
      return

    const trigger = triggerRef()
    const content = contentRef()
    if (!trigger || !content)
      return

    const triggerRect = trigger.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()
    const gutter = 8
    const viewportPadding = 8

    let top = 0
    let left = 0

    switch (placement()) {
      case 'top':
        top = triggerRect.top - contentRect.height - gutter
        left = triggerRect.left + ((triggerRect.width - contentRect.width) / 2)
        break
      case 'left':
        top = triggerRect.top + ((triggerRect.height - contentRect.height) / 2)
        left = triggerRect.left - contentRect.width - gutter
        break
      case 'right':
        top = triggerRect.top + ((triggerRect.height - contentRect.height) / 2)
        left = triggerRect.right + gutter
        break
      case 'bottom':
      default:
        top = triggerRect.bottom + gutter
        left = triggerRect.left + ((triggerRect.width - contentRect.width) / 2)
        break
    }

    left = Math.min(
      Math.max(left, viewportPadding),
      window.innerWidth - contentRect.width - viewportPadding,
    )
    top = Math.min(
      Math.max(top, viewportPadding),
      window.innerHeight - contentRect.height - viewportPadding,
    )

    setPosition({ top, left })
  }

  createEffect(() => {
    if (typeof window === 'undefined' || !open())
      return

    const frame = window.requestAnimationFrame(updatePosition)

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node))
        return

      if (triggerRef()?.contains(target) || contentRef()?.contains(target))
        return

      setOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape')
        setOpen(false)
    }

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    onCleanup(() => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    })
  })

  const context: PopoverContextValue = {
    open,
    setOpen,
    placement,
    triggerRef,
    setTriggerRef,
    contentRef,
    setContentRef,
    position,
    updatePosition,
    openSoon,
    closeSoon,
    cancelTimers,
  }

  return (
    <PopoverContext.Provider value={context}>
      {local.children}
    </PopoverContext.Provider>
  )
}

interface PopoverContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string
}

function PopoverContent(props: PopoverContentProps) {
  const ctx = usePopoverContext()
  const [local, others] = splitProps(props, ['class', 'ref', 'onMouseEnter', 'onMouseLeave', 'children'])

  createEffect(() => {
    if (!ctx.open() || typeof window === 'undefined')
      return

    const frame = window.requestAnimationFrame(ctx.updatePosition)
    onCleanup(() => window.cancelAnimationFrame(frame))
  })

  return (
    <Show when={ctx.open()}>
      <Portal>
        <div
          ref={(el) => {
            ctx.setContentRef(el)
            if (typeof local.ref === 'function')
              local.ref(el)
          }}
          class={cn(
            'fixed z-50 w-fit rounded-md border border-2 bg-popover p-2 text-popover-foreground shadow-xl outline-none animate-in fade-in-0 zoom-in-95',
            local.class,
          )}
          style={{
            top: `${ctx.position().top}px`,
            left: `${ctx.position().left}px`,
          }}
          onMouseEnter={(event) => {
            ctx.cancelTimers()
            callEventHandler(local.onMouseEnter, event)
          }}
          onMouseLeave={(event) => {
            ctx.closeSoon()
            callEventHandler(local.onMouseLeave, event)
          }}
          {...others}
        >
          {local.children}
        </div>
      </Portal>
    </Show>
  )
}

interface PopoverTriggerProps extends JSX.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements
  class?: string
}

function PopoverTrigger(props: PopoverTriggerProps) {
  const ctx = usePopoverContext()
  const [local, others] = splitProps(props, ['as', 'class', 'ref', 'onClick', 'onMouseEnter', 'onMouseLeave', 'children'])
  const component = () => local.as ?? 'button'

  return (
    <Dynamic
      component={component()}
      ref={(el: HTMLElement) => {
        ctx.setTriggerRef(el)
        if (typeof local.ref === 'function')
          local.ref(el)
      }}
      type={component() === 'button' ? 'button' : undefined}
      aria-expanded={ctx.open()}
      class={cn('focus-visible:outline-none', local.class)}
      onClick={(event: HandlerEvent<HTMLElement, MouseEvent>) => {
        ctx.cancelTimers()
        ctx.setOpen(!ctx.open())
        callEventHandler(local.onClick, event)
      }}
      onMouseEnter={(event: HandlerEvent<HTMLElement, MouseEvent>) => {
        ctx.openSoon()
        callEventHandler(local.onMouseEnter, event)
      }}
      onMouseLeave={(event: HandlerEvent<HTMLElement, MouseEvent>) => {
        ctx.closeSoon()
        callEventHandler(local.onMouseLeave, event)
      }}
      {...others}
    >
      {local.children}
    </Dynamic>
  )
}

export { Popover, PopoverContent, PopoverTrigger }
