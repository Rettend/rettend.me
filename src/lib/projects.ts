export const categoryOrder = ['Current Focus', 'Apps', 'Sites', 'CLI', 'Web Extensions', 'VSCode Extensions', 'Starter Templates', 'Contributions', 'Past'] as const
export type Category = typeof categoryOrder[number]

export interface Project {
  name: string
  description: string
  url?: string
  githubUrl?: string
  tags: string[]
  hiddenTags?: string[]
  category: Category
  image?: string
}

export const projects: Project[] = [
  {
    name: 'rettend.github.io',
    description: 'My personal site, this site you are on',
    url: 'https://rettend.github.io',
    githubUrl: 'https://github.com/Rettend/rettend.github.io',
    tags: ['Astro', 'SolidJS', 'UnoCSS', 'Shadcn'],
    hiddenTags: ['Iconify', 'TypeScript'],
    category: 'Sites',
  },
  {
    name: 'lin',
    description: 'CLI tool that translates locale JSONs using LLMs',
    githubUrl: 'https://github.com/yuo-app/lin',
    tags: ['TypeScript', 'AI SDK'],
    category: 'CLI',
  },
  {
    name: 'Yuo',
    description: 'Language learning app that lets you create your own lessons using LLMs',
    url: 'https://yuo.app',
    tags: ['SolidStart', 'SQLite WASM', 'Turso', 'AI SDK'],
    hiddenTags: ['SolidJS', 'TypeScript', 'Drizzle', 'Shadcn', 'UnoCSS', 'Iconify', 'AuthJS'],
    category: 'Current Focus',
  },
  {
    name: 'the-stack',
    description: 'Web and Tauri app starter with Drizzle and SQLite WASM',
    url: 'https://yuo.app',
    tags: ['SolidStart', 'SQLite WASM', 'Turso', 'Tauri'],
    hiddenTags: ['SolidJS', 'TypeScript', 'Drizzle', 'UnoCSS', 'Iconify', 'AuthJS'],
    category: 'Starter Templates',
  },
  {
    name: 'github-material-icon-theme',
    description: 'vscode-material-icon-theme for GitHub',
    url: 'https://chromewebstore.google.com/detail/github-material-icon-them/hlgcfologjgpkkkokemkclndckfbbphb',
    githubUrl: 'https://github.com/Rettend/github-material-icon-theme',
    tags: ['TypeScript'],
    category: 'Web Extensions',
  },
  {
    name: 'eemoji',
    description: 'CLI tool that automatically adds emojis to your commit messages based on conventional commit types',
    githubUrl: 'https://github.com/Rettend/eemoji',
    tags: ['TypeScript'],
    category: 'CLI',
  },
  {
    name: 'Github Projects Milestone Progress',
    description: 'Progress bar for milestones in GitHub Projects',
    url: 'https://chromewebstore.google.com/detail/github-projects-milestone/midibmobbnmmbneompmcdkpjilddkjmd',
    githubUrl: 'https://github.com/Rettend/github-projects-milestone-progress',
    tags: ['TypeScript'],
    category: 'Web Extensions',
  },
  {
    name: 'Pinia Generic',
    description: 'Split stores and create Generic stores in Pinia',
    url: 'https://rettend.github.io/pinia-generic',
    githubUrl: 'https://github.com/Rettend/pinia-generic',
    tags: ['TypeScript'],
    category: 'Past',
  },
  {
    name: 'idb-orm',
    description: 'lightweight, type-safe ORM for IndexedDB that closely matches the supabase-js API',
    githubUrl: 'https://github.com/yuo-app/idb-orm',
    tags: ['TypeScript'],
    category: 'Past',
  },
  {
    name: 'Gump',
    description: 'high school final project, modular recipe sharing app',
    githubUrl: 'https://github.com/Vitorlas-Devs/Gump',
    tags: ['Nuxt', 'Ionic Capacitor', 'ASP.NET', 'Docker'],
    hiddenTags: ['TypeScript', 'Vue', 'UnoCSS'],
    category: 'Past',
  },
  {
    name: 'DiaryAI',
    description: 'project for HSUP 2023/24, diary generator with LLMs',
    url:'https://diaryai.pages.dev',
    tags: ['SvelteKit', 'TailwindCSS', 'Supabase', 'AI SDK'],
    hiddenTags: ['TypeScript', 'Svelte'],
    category: 'Past',
  },
  {
    name: 'untitled-inventory-app',
    description: 'a text-based inventory app for your fridge',
    url:'https://ashlsun.github.io/untitled-inventory-app',
    githubUrl: 'https://github.com/ashlsun/untitled-inventory-app',
    tags: ['SvelteKit', 'TypeScript', 'TailwindCSS'],
    hiddenTags: ['Svelte', 'Iconify'],
    category: 'Contributions',
  },
]
