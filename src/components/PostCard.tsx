import { createMemo } from 'solid-js'
import Link from '~/components/Link'

interface PostCardProps {
  slug: string
  title: string
  publishDate: Date
  readingTime: number
  class?: string
}

export function PostCard(props: PostCardProps) {
  const formattedDate = createMemo(() => props.publishDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }))

  return (
    <Link href={`/posts/${props.slug}`} class={props.class}>
      <div class="group flex items-center gap-4 rounded-lg px-4 py-2 transition-all duration-300 -mx-4 hover:scale-[1.02] hover:bg-accent/50">
        <h3 class="relative text-xl font-medium leading-tight">
          <span class="relative">
            {props.title}
            <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </span>
        </h3>
        <div class="flex flex-shrink-0 items-center gap-4 text-sm text-muted-foreground transition-colors group-hover:text-foreground/80">
          <span class="flex items-center gap-1">
            <span class="i-ph:calendar-duotone size-4" />
            {formattedDate()}
          </span>
          <span class="flex items-center gap-1">
            <span class="i-ph:clock-duotone size-4" />
            {props.readingTime}
            {' '}
            min read
          </span>
        </div>
      </div>
    </Link>
  )
}
