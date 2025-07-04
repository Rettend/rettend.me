export interface Project {
  name: string
  description: string
  url?: string
  githubUrl?: string
  tags: string[]
  category: 'Current Focus' | 'CLI Tools' | 'Starter Templates' | 'Apps' | 'Sites'
  image?: string
}

export const projects: Project[] = [
  {
    name: 'Portfolio Website',
    description: 'My personal portfolio website built with Astro, SolidJS, and UnoCSS, inspired by futuristic and cyberpunk aesthetics.',
    githubUrl: 'https://github.com/rettend/rettend.github.io',
    tags: ['Astro', 'SolidJS', 'UnoCSS', 'TypeScript', 'Shadcn'],
    category: 'Current Focus',
  },
  {
    name: 'Awesome CLI Tool',
    description: 'A conceptual command-line interface tool for automating daily tasks and boosting productivity.',
    tags: ['TypeScript', 'Node.js', 'CLI'],
    category: 'CLI Tools',
  },
  {
    name: 'Astro-Solid Starter',
    description: 'A starter template for building modern web applications with Astro and SolidJS, pre-configured with best practices.',
    tags: ['Astro', 'SolidJS', 'Starter'],
    category: 'Starter Templates',
  },
  {
    name: 'Project Management App',
    description: 'A web application for managing projects and tasks, with a focus on collaboration and real-time updates.',
    url: '#',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    category: 'Apps',
  },
  {
    name: 'E-commerce Site',
    description: 'A fully functional e-commerce website for a fictional brand, showcasing products and handling online payments.',
    url: '#',
    tags: ['Next.js', 'Stripe', 'GraphQL'],
    category: 'Sites',
  },
  {
    name: 'Another Cool App',
    description: 'This is another great application that solves a real-world problem with an elegant design.',
    url: '#',
    tags: ['SvelteKit', 'Supabase', 'TypeScript'],
    category: 'Apps',
  },
]
