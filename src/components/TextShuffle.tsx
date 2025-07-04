import type { JSX } from 'solid-js'
import { onCleanup, onMount } from 'solid-js'
import { Dynamic } from 'solid-js/web'

interface TextShuffleProps {
  text: string
  hoverText: string
  class?: string
  as?: 'h1' | 'p' | 'span'
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function TextShuffle(props: TextShuffleProps) {
  let el: HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | undefined
  let interval: NodeJS.Timeout | undefined

  const shuffle = (targetText: string) => {
    let iteration = 0
    clearInterval(interval)

    interval = setInterval(() => {
      if (!el)
        return
      el.textContent = targetText
        .split('')
        .map((_letter, index) => {
          if (index < iteration)
            return targetText[index]

          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join('')

      if (iteration >= targetText.length)
        clearInterval(interval)

      iteration += 1 / 3
    }, 30)
  }

  onMount(() => {
    if (el) {
      setTimeout(() => shuffle(props.text), 200)

      el.addEventListener('mouseover', () => shuffle(props.hoverText))
      el.addEventListener('mouseleave', () => shuffle(props.text))
    }
  })

  onCleanup(() => {
    clearInterval(interval)
  })

  return (
    <Dynamic
      component={props.as || 'h1'}
      ref={el}
      class={props.class}
    >
      {props.text}
    </Dynamic>
  )
}
