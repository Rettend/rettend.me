interface SectionHeadingProps {
  title: string
  class?: string
}

export function SectionHeading(props: SectionHeadingProps) {
  return (
    <h2 class={`pointer-events-none select-none text-right text-6xl text-foreground/7 font-black sm:text-8xl ${props.class || ''}`}>
      {props.title}
    </h2>
  )
}
