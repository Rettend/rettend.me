import type { Project } from '~/lib/projects'
import { createSignal, For } from 'solid-js'
import { ProjectCard } from '~/components/ProjectCard'
import { Button } from '~/components/ui/button'

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList(props: ProjectListProps) {
  const allTags = [...new Set(props.projects.flatMap(p => p.tags))]
  const [selectedTags, setSelectedTags] = createSignal<string[]>([])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    )
  }

  const filteredProjects = () => {
    if (selectedTags().length === 0)
      return props.projects

    return props.projects.filter(p =>
      selectedTags().every(tag => p.tags.includes(tag)),
    )
  }

  const groupedProjects = () => {
    return filteredProjects().reduce((acc, project) => {
      if (!acc[project.category])
        acc[project.category] = []

      acc[project.category].push(project)
      return acc
    }, {} as Record<Project['category'], Project[]>)
  }

  const categoryOrder: Project['category'][] = ['Current Focus', 'Apps', 'Sites', 'CLI Tools', 'Starter Templates']

  return (
    <div>
      <div class="mb-12 flex flex-wrap justify-center gap-2">
        <For each={allTags}>
          {tag => (
            <Button
              variant={selectedTags().includes(tag) ? 'default' : 'outline'}
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
            const projects = groupedProjects()[category]
            if (!projects || projects.length === 0)
              return null

            return (
              <section>
                <h2 class="mb-8 text-2xl font-bold tracking-tight">{category}</h2>
                <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                  <For each={projects}>
                    {project => <ProjectCard project={project} />}
                  </For>
                </div>
              </section>
            )
          }}
        </For>
      </div>
    </div>
  )
}
