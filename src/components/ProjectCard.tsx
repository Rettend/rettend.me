import type { Project } from '~/lib/projects'
import { Show } from 'solid-js'
import { DynamicTags } from '~/components/DynamicTags'
import Link from '~/components/Link'
import { cn } from '~/lib/utils'

interface ProjectCardProps {
  project: Project
  class?: string
}

export function ProjectCard(props: ProjectCardProps) {
  return (
    <div class={cn('group flex flex-col border rounded-lg bg-card text-card-foreground shadow-sm', props.class)}>
      <div class="flex flex-grow flex-col p-6">
        <div class="flex items-start justify-between">
          <div class="flex flex-row gap-1">
            <h3 class="h-8 pr-4 text-lg font-semibold leading-none tracking-tight">{props.project.name}</h3>
            <Show when={props.project.team && props.project.team > 1}>
              <div class="h-fit flex items-center gap-1 border rounded-full px-2.5 py-0.5 text-xs font-semibold">
                <span class="i-ph:users-duotone size-4" />
                <span>{props.project.team}</span>
              </div>
            </Show>
          </div>
          <div class="flex gap-1 -mr-2 -mt-2">
            <Show when={props.project.url}>
              <Link href={props.project.url!} external variant="glow" size="icon" title="Website">
                <span class="i-ph:link-duotone size-5" />
                <span class="sr-only">Website</span>
              </Link>
            </Show>
            <Show when={props.project.githubUrl}>
              <Link href={props.project.githubUrl!} external variant="glow" size="icon" title="GitHub">
                <span class="i-ph:github-logo-duotone size-5" />
                <span class="sr-only">GitHub</span>
              </Link>
            </Show>
            <Show when={props.project.designUrl}>
              <Link href={props.project.designUrl!} external variant="glow" size="icon" title="Design">
                <span class="i-ph:palette-duotone size-5" />
                <span class="sr-only">Design</span>
              </Link>
            </Show>
          </div>
        </div>
        <p class="mt-2 min-h-5 flex-grow text-sm text-muted-foreground">
          {props.project.description}
        </p>

        <DynamicTags tags={props.project.tags} class="mt-4" />
      </div>
    </div>
  )
}
