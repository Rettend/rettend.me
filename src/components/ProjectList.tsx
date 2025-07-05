import type { Project } from '~/lib/projects'
import { createMemo, createSignal, For, Show } from 'solid-js'
import { ProjectCard } from '~/components/ProjectCard'
import { Button } from '~/components/ui/button'
import { categoryOrder } from '~/lib/projects'

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList(props: ProjectListProps) {
  const allTags = [...new Set(props.projects.flatMap(p => [...p.tags, ...(p.hiddenTags ?? [])]))]
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

  return (
    <div>
      <div class="mb-12 flex flex-wrap gap-2">
        <For each={allTags}>
          {tag => (
            <Button
              variant={selectedTags().includes(tag) ? 'default' : 'outline'}
              class="border-1"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          )}
        </For>
        {selectedTags().length > 0 && (
          <Button variant="ghost" onClick={() => setSelectedTags([])}>
            Clear
          </Button>
        )}
      </div>

      <div class="space-y-16">
        <For each={categoryOrder}>
          {(category) => {
            const projects = () => groupedProjects()[category]

            return (
              <Show when={projects() && projects()!.length > 0}>
                <section>
                  <h2 class="mb-8 text-2xl font-bold tracking-tight">
                    {category}
                  </h2>
                  <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                    <For each={projects()}>
                      {project => <ProjectCard project={project} />}
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
