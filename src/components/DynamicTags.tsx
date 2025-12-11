import { createMemo, createSignal, For, onCleanup, onMount, Show, untrack } from 'solid-js'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

interface DynamicTagsProps {
  tags: string[]
  showAll?: boolean
  class?: string
}

const TAG_PADDING = 22
const CHAR_WIDTH = 6
const DEFAULT_CONTAINER_WIDTH = 352
const MORE_BUTTON_WIDTH = 28
const GAP = 8

function estimateTagWidth(tag: string): number {
  return TAG_PADDING + (tag.length * CHAR_WIDTH)
}

function estimateVisibleTags(tags: string[], containerWidth: number = DEFAULT_CONTAINER_WIDTH): number {
  if (tags.length === 0)
    return 0

  let usedWidth = 0
  let count = 0

  for (let i = 0; i < tags.length; i++) {
    const tagWidth = estimateTagWidth(tags[i])
    const widthWithGap = i === 0 ? tagWidth : tagWidth + GAP
    const remainingTags = tags.length - (i + 1)
    const needsMoreButton = remainingTags > 0
    const availableWidth = needsMoreButton
      ? containerWidth - MORE_BUTTON_WIDTH - GAP
      : containerWidth

    if (usedWidth + widthWithGap <= availableWidth) {
      usedWidth += widthWithGap
      count++
    }
    else {
      break
    }
  }

  return Math.max(1, count)
}

export function DynamicTags(props: DynamicTagsProps) {
  let containerRef: HTMLDivElement | undefined
  let measureRef: HTMLDivElement | undefined

  const [visibleCount, setVisibleCount] = createSignal(untrack(() => estimateVisibleTags(props.tags)))

  const calculateVisibleTags = () => {
    const showAll = props.showAll
    const tagsLength = props.tags.length

    if (showAll || !containerRef || !measureRef) {
      setVisibleCount(tagsLength)
      return
    }

    const containerWidth = containerRef.offsetWidth
    const tagElements = measureRef.querySelectorAll('[data-tag]')
    let usedWidth = 0
    let count = 0

    for (let i = 0; i < tagElements.length; i++) {
      const tagWidth = (tagElements[i] as HTMLElement).offsetWidth
      const widthWithGap = i === 0 ? tagWidth : tagWidth + GAP

      const remainingTags = tagsLength - (i + 1)
      const needsMoreButton = remainingTags > 0
      const availableWidth = needsMoreButton
        ? containerWidth - MORE_BUTTON_WIDTH - GAP
        : containerWidth

      if (usedWidth + widthWithGap <= availableWidth) {
        usedWidth += widthWithGap
        count++
      }
      else {
        break
      }
    }

    setVisibleCount(Math.max(1, count))
  }

  onMount(() => {
    calculateVisibleTags()

    if (!props.showAll && containerRef) {
      const resizeObserver = new ResizeObserver(() => {
        calculateVisibleTags()
      })
      resizeObserver.observe(containerRef)

      onCleanup(() => {
        resizeObserver.disconnect()
      })
    }
  })

  const visibleTags = createMemo(() => props.tags.slice(0, visibleCount()))
  const hiddenTags = createMemo(() => props.tags.slice(visibleCount()))

  return (
    <Show
      when={!props.showAll}
      fallback={(
        <div class={`flex flex-wrap items-center gap-2 ${props.class ?? ''}`}>
          <For each={props.tags}>
            {tag => <span class="border rounded-full px-2.5 py-0.5 text-xs font-semibold">{tag}</span>}
          </For>
        </div>
      )}
    >
      <div ref={containerRef} class={`relative w-full ${props.class ?? ''}`}>
        {/* Hidden measure container - used to calculate tag widths */}
        <div
          ref={measureRef}
          class="invisible absolute h-0 flex items-center gap-2 overflow-hidden"
          aria-hidden="true"
        >
          <For each={props.tags}>
            {tag => (
              <span data-tag class="whitespace-nowrap border rounded-full px-2.5 py-0.5 text-xs font-semibold">
                {tag}
              </span>
            )}
          </For>
        </div>

        {/* Visible tags */}
        <div class="flex items-center gap-2 overflow-hidden">
          <div class="min-w-0 flex flex-1 items-center gap-2">
            <For each={visibleTags()}>
              {tag => (
                <span class="whitespace-nowrap border rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  {tag}
                </span>
              )}
            </For>
          </div>
          <Show when={hiddenTags().length > 0}>
            <Popover>
              <PopoverTrigger class="ml-auto flex shrink-0">
                <span class="i-ph:dots-three-outline-fill size-5" />
              </PopoverTrigger>
              <PopoverContent>
                <div class="max-w-60 w-fit flex flex-wrap justify-center gap-2">
                  <For each={hiddenTags()}>
                    {tag => <span class="border rounded-full px-2.5 py-0.5 text-xs font-semibold">{tag}</span>}
                  </For>
                </div>
              </PopoverContent>
            </Popover>
          </Show>
        </div>
      </div>
    </Show>
  )
}
