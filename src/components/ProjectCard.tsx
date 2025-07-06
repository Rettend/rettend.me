import type { Project } from '~/lib/projects'
import { For, Show } from 'solid-js'

import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard(props: ProjectCardProps) {
  const { project } = props

  return (
    <div class="group flex flex-col border rounded-lg bg-card text-card-foreground shadow-sm">
      <div class="flex flex-grow flex-col p-6">
        <div class="flex items-start justify-between">
          <div class="flex flex-row gap-1">
            <h3 class="pr-4 text-lg font-semibold leading-none tracking-tight">{project.name}</h3>
            <Show when={project.team && project.team > 1}>
              <div class="flex items-center gap-1 border rounded-full px-2.5 py-0.5 text-xs font-semibold">
                <span class="i-ph:users-duotone size-4" />
                <span>{project.team}</span>
              </div>
            </Show>
          </div>
          <div class="flex gap-1 -mr-2 -mt-2">
            <Show when={project.url}>
              <Button as="a" href={project.url} target="_blank" variant="glow" size="icon" title="Website">
                <span class="i-ph:link-duotone size-5" />
                <span class="sr-only">Website</span>
              </Button>
            </Show>
            <Show when={project.githubUrl}>
              <Button as="a" href={project.githubUrl} target="_blank" variant="glow" size="icon" title="GitHub">
                <span class="i-ph:github-logo-duotone size-5" />
                <span class="sr-only">GitHub</span>
              </Button>
            </Show>
            <Show when={project.designUrl}>
              <Button as="a" href={project.designUrl} target="_blank" variant="glow" size="icon" title="Design">
                <span class="i-ph:palette-duotone size-5" />
                <span class="sr-only">Design</span>
              </Button>
            </Show>
          </div>
        </div>
        <p class="mt-2 flex-grow text-sm text-muted-foreground">{project.description}</p>

        <div class="mt-4 flex flex-wrap items-center gap-2">
          <For each={project.tags}>
            {tag => <div class="border rounded-full px-2.5 py-0.5 text-xs font-semibold">{tag}</div>}
          </For>
          <Show when={project.hiddenTags && project.hiddenTags.length > 0}>
            <Tooltip>
              <TooltipTrigger class="flex">
                <span class="i-ph:dots-three-outline-fill size-5" />
              </TooltipTrigger>
              <TooltipContent>
                <div class="max-w-60 w-fit flex flex-wrap justify-center gap-2">
                  <For each={project.hiddenTags}>
                    {tag => <div class="border rounded-full px-2.5 py-0.5 text-xs font-semibold">{tag}</div>}
                  </For>
                </div>
              </TooltipContent>
            </Tooltip>
          </Show>
        </div>
      </div>
    </div>
  )
}
