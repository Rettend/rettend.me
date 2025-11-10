import type { Project } from '~/lib/projects'
import { createMemo, createSignal, For, onMount, Show, untrack } from 'solid-js'
import { ProjectCard } from '~/components/ProjectCard'
import { SectionHeading } from '~/components/SectionHeading'
import { Button } from '~/components/ui/button'
import { categoryOrder } from '~/lib/projects'

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList(props: ProjectListProps) {
  const allProjectTags = untrack(() => props.projects.flatMap(p => [...p.tags, ...(p.hiddenTags ?? [])]))

  const tagCounts = allProjectTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const allTags = [...new Set(allProjectTags)].sort((a, b) => tagCounts[b] - tagCounts[a])
  const [selectedTags, setSelectedTags] = createSignal<string[]>([])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    )
  }

  const filteredProjects = createMemo(() => {
    if (selectedTags().length === 0)
      return props.projects

    const tags = new Set(selectedTags())
    return props.projects.filter(p =>
      [...p.tags, ...(p.hiddenTags ?? [])].some(tag => tags.has(tag)),
    )
  })

  const groupedProjects = createMemo(() => {
    return filteredProjects().reduce((acc, project) => {
      if (!acc[project.category])
        acc[project.category] = []
      acc[project.category].push(project)
      return acc
    }, {} as Record<Project['category'], Project[]>)
  })

  let scrollContainerRef: HTMLDivElement | undefined
  const [isDragging, setIsDragging] = createSignal(false)
  const [startX, setStartX] = createSignal(0)
  const [scrollLeft, setScrollLeft] = createSignal(0)
  const [hasDragged, setHasDragged] = createSignal(false)

  let smoothScrollRAF: number | undefined
  let targetScrollLeft = 0

  const smoothScroll = () => {
    if (!scrollContainerRef)
      return

    const current = scrollContainerRef.scrollLeft
    const newScroll = current + (targetScrollLeft - current) * 0.1

    if (Math.abs(targetScrollLeft - newScroll) < 0.5) {
      scrollContainerRef.scrollLeft = targetScrollLeft
      smoothScrollRAF = undefined
    }
    else {
      scrollContainerRef.scrollLeft = newScroll
      smoothScrollRAF = requestAnimationFrame(smoothScroll)
    }
  }

  const onMouseDown = (e: MouseEvent) => {
    if (!scrollContainerRef)
      return

    if (smoothScrollRAF) {
      cancelAnimationFrame(smoothScrollRAF)
      smoothScrollRAF = undefined
    }

    setIsDragging(true)
    setHasDragged(false)
    setStartX(e.pageX - scrollContainerRef.offsetLeft)
    setScrollLeft(scrollContainerRef.scrollLeft)
    scrollContainerRef.style.userSelect = 'none'
  }

  const onMouseUp = () => {
    setIsDragging(false)
    if (scrollContainerRef)
      scrollContainerRef.style.userSelect = 'auto'
  }

  const onMouseLeave = () => {
    if (isDragging())
      onMouseUp()
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging() || !scrollContainerRef)
      return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.offsetLeft
    const walk = (x - startX())

    if (Math.abs(walk) > 5)
      setHasDragged(true)

    scrollContainerRef.scrollLeft = scrollLeft() - walk * 1.5
    targetScrollLeft = scrollContainerRef.scrollLeft
  }

  onMount(() => {
    if (!scrollContainerRef)
      return
    targetScrollLeft = scrollContainerRef.scrollLeft
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0 || !scrollContainerRef)
        return
      if (e.shiftKey) {
        e.preventDefault()

        const maxScroll = scrollContainerRef.scrollWidth - scrollContainerRef.clientWidth
        targetScrollLeft = Math.max(0, Math.min(maxScroll, targetScrollLeft + e.deltaY * 0.5))

        if (!smoothScrollRAF)
          smoothScroll()
      }
    }
    scrollContainerRef?.addEventListener('wheel', onWheel)
  })

  return (
    <div>
      <div class="relative -mx-4 lg:-mx-8 sm:-mx-6">
        <Show when={selectedTags().length > 0}>
          <Button
            variant="glow"
            size="icon"
            title="Clear selection"
            onClick={() => setSelectedTags([])}
            class="absolute right-4 top--10 z-10 lg:right-8 sm:right-6"
          >
            <span class="i-ph:arrow-counter-clockwise-bold size-5" />
            <span class="sr-only">Clear selection</span>
          </Button>
        </Show>
        <div
          ref={scrollContainerRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          class="overflow-x-auto py-1 no-scrollbar"
        >
          <div class="grid grid-flow-col rows-3 h-8.5rem w-max gap-2 px-4 md:rows-2 md:h-5.5rem lg:px-8 sm:px-6">
            <For each={allTags}>
              {tag => (
                <Button
                  variant={selectedTags().includes(tag) ? 'default' : 'outline'}
                  class="border-1"
                  onClick={() => {
                    if (!hasDragged())
                      toggleTag(tag)
                  }}
                >
                  {tag}
                  <span class="ml-1 text-xs op-60">
                    ×
                    {tagCounts[tag]}
                  </span>
                </Button>
              )}
            </For>
          </div>
        </div>
      </div>

      <div class="mt-10 space-y-10">
        <For each={categoryOrder}>
          {(category) => {
            const projects = () => groupedProjects()[category]

            return (
              <Show when={projects() && projects()!.length > 0}>
                <section class="relative pt-4">
                  <SectionHeading title={category} class="absolute inset-x-4 z-0 -top-6 lg:-top-4" />
                  <div class="flex flex-wrap items-start justify-center gap-6 lg:justify-start">
                    <For each={projects()}>
                      {project => <ProjectCard project={project} class="max-w-25rem w-full" />}
                    </For>
                  </div>
                </section>
              </Show>
            )
          }}
        </For>
      </div>
    </div>
  )
}
