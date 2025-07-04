import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { VariantProps } from 'class-variance-authority'

import type { JSX, ValidComponent } from 'solid-js'
import * as ButtonPrimitive from '@kobalte/core/button'
import { cva } from 'class-variance-authority'
import { createMemo, createSignal, onMount, Show, splitProps } from 'solid-js'

import { cn } from '~/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 underline decoration-primary/30 decoration-1 hover:decoration-primary/100',
        glow: 'bg-transparent text-foreground/80 hover:text-foreground hover:[text-shadow:0_0_3px_hsl(var(--primary))]',
        split: 'bg-transparent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-11 px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps<T extends ValidComponent = 'button'> = ButtonPrimitive.ButtonRootProps<T>
  & VariantProps<typeof buttonVariants> & { class?: string | undefined, children?: JSX.Element }

function Button<T extends ValidComponent = 'button'>(props: PolymorphicProps<T, ButtonProps<T>>) {
  const [local, others] = splitProps(props as ButtonProps, ['variant', 'size', 'class', 'children'])
  const split = createMemo(() => local.variant === 'split')

  const [isSplit, setIsSplit] = createSignal(false)
  const [leftText, setLeftText] = createSignal('')
  const [rightText, setRightText] = createSignal('')
  let splitInnerRef: HTMLSpanElement | undefined

  onMount(() => {
    if (split() && splitInnerRef) {
      const text = splitInnerRef.textContent ?? ''
      const mid = Math.floor(text.length / 2)
      setLeftText(text.substring(0, mid))
      setRightText(text.substring(mid))
      setIsSplit(true)
    }
  })

  return (
    <ButtonPrimitive.Root
      class={cn(
        buttonVariants({ variant: local.variant, size: local.size }),
        split() && 'group',
        local.class,
      )}
      {...others}
    >
      <Show
        when={split()}
        fallback={local.children}
      >
        <span class="split-text">
          <span class="split-text-inner" ref={splitInnerRef}>
            <Show when={isSplit()} fallback={local.children}>
              <span>{leftText()}</span>
              <span class="split-text-dash">-</span>
              <span>{rightText()}</span>
            </Show>
          </span>
        </span>
      </Show>
    </ButtonPrimitive.Root>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
