import type { Project } from '~/lib/projects'
import { For } from 'solid-js'

import { Button } from '~/components/ui/button'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard(props: ProjectCardProps) {
  const { project } = props

  return (
    <div class="group relative flex flex-col border rounded-lg bg-card text-card-foreground shadow-sm transition-all duration-300 hover:border-primary">
      <div class="flex flex-col p-6">
        <h3 class="text-lg font-semibold leading-none tracking-tight">{project.name}</h3>
        <p class="mt-2 text-sm text-muted-foreground">{project.description}</p>

        <div class="mt-4 flex flex-wrap gap-2">
          <For each={project.tags}>
            {tag => <div class="border rounded-full px-2.5 py-0.5 text-xs font-semibold">{tag}</div>}
          </For>
        </div>
      </div>

      <div class="mt-auto flex items-center p-6 pt-0">
        <div class="flex gap-2">
          {project.url && (
            <Button as="a" href={project.url} target="_blank" variant="outline" size="sm">
              <span class="i-ph:link-duotone mr-2 size-4" />
              Website
            </Button>
          )}
          {project.githubUrl && (
            <Button as="a" href={project.githubUrl} target="_blank" variant="outline" size="sm">
              <span class="i-ph:github-logo-duotone mr-2 size-4" />
              GitHub
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
