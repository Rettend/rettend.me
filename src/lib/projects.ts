export const categoryOrder = ['Current Focus', 'Apps', 'Packages', 'CLI', 'Sites', 'Web Extensions', 'VSCode Extensions', 'Starter Templates', 'Major Contributions', 'Forks', 'Past'] as const
export type Category = typeof categoryOrder[number]

export interface Project {
  name: string
  description: string
  url?: string
  githubUrl?: string
  designUrl?: string
  tags: string[]
  hiddenTags?: string[]
  category: Category
  image?: string
  team?: number
}

export const projects: Project[] = [
  {
    name: 'rettend.github.io',
    description: 'Personal site, this site you are on',
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
    name: 'gau',
    description: 'A good authentication library with first-class Tauri support',
    githubUrl: 'https://github.com/yuo-app/gau',
    tags: ['TypeScript', 'Tauri'],
    category: 'Packages',
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
    name: 'Oneday',
    description: 'Extreme productivity app, a watch and not a calendar',
    githubUrl: 'https://github.com/Rettend/oneday',
    tags: ['SolidStart', 'Tauri', 'Turso', 'AI SDK'],
    hiddenTags: ['SolidJS', 'TypeScript', 'Drizzle', 'Shadcn', 'UnoCSS', 'Iconify', 'AuthJS'],
    category: 'Current Focus',
  },
  {
    name: 'the-stack',
    description: 'Web and Tauri app starter with Drizzle and SQLite WASM',
    githubUrl: 'https://github.com/yuo-app/the-stack',
    tags: ['SolidStart', 'SQLite WASM', 'Turso', 'Tauri'],
    hiddenTags: ['SolidJS', 'TypeScript', 'Drizzle', 'UnoCSS', 'Iconify', 'AuthJS'],
    category: 'Starter Templates',
  },
  {
    name: 'svelte-stack',
    description: 'Web app starter with Svelte',
    githubUrl: 'https://github.com/Rettend/svelte-stack',
    tags: ['SvelteKit', 'Drizzle', 'Turso', 'tRPC'],
    hiddenTags: ['Svelte', 'TypeScript', 'UnoCSS', 'Iconify', 'AuthJS'],
    category: 'Starter Templates',
  },
  {
    name: 'github-material-icon-theme',
    description: 'vscode-material-icon-theme for GitHub, uses Pure CSS icons inspired by Iconify',
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
    name: 'github-projects-milestone-progress',
    description: 'Progress bar for milestones in GitHub Projects',
    url: 'https://chromewebstore.google.com/detail/github-projects-milestone/midibmobbnmmbneompmcdkpjilddkjmd',
    githubUrl: 'https://github.com/Rettend/github-projects-milestone-progress',
    tags: ['TypeScript'],
    category: 'Web Extensions',
  },
  {
    name: 'vscode-copy-open-files',
    description: 'Copy open files and directory structure in VSCode',
    githubUrl: 'https://github.com/Rettend/vscode-copy-open-files',
    tags: ['TypeScript'],
    category: 'VSCode Extensions',
  },
  {
    name: 'GitHub Desktop Fork',
    description: 'I added a Secondary Editor option',
    githubUrl: 'https://github.com/Rettend/desktop',
    tags: ['TypeScript'],
    category: 'Forks',
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
    description: 'Lightweight, type-safe ORM for IndexedDB that closely matches the supabase-js API',
    githubUrl: 'https://github.com/yuo-app/idb-orm',
    tags: ['TypeScript'],
    category: 'Past',
  },
  {
    name: 'Gump',
    description: 'High school final project, modular recipe sharing app',
    githubUrl: 'https://github.com/Vitorlas-Devs/Gump',
    designUrl: 'https://www.figma.com/file/fuqFbwU64lUy7Dcime5fMZ/GUMP?type=design&node-id=51595%253A4712&mode=design&t=NqZlwfTlwczm2nif-1',
    tags: ['Nuxt', 'Ionic Capacitor', 'ASP.NET', 'Docker'],
    hiddenTags: ['TypeScript', 'Vue', 'UnoCSS'],
    category: 'Past',
    team: 3,
  },
  {
    name: 'DiaryAI',
    description: 'Project for HSUP 2023/24, diary generator with LLMs',
    url: 'https://diaryai.pages.dev',
    designUrl: 'https://www.figma.com/design/0UEW6E6iCF91FUTix2MaTZ/APP?node-id=2-287&t=C5bILwsXYQT4OLIO-1',
    tags: ['SvelteKit', 'TailwindCSS', 'Supabase', 'AI SDK'],
    hiddenTags: ['TypeScript', 'Svelte'],
    category: 'Past',
    team: 3,
  },
  {
    name: 'untitled-inventory-app',
    description: 'Text-based inventory app for your fridge',
    url: 'https://ashlsun.github.io/untitled-inventory-app',
    githubUrl: 'https://github.com/ashlsun/untitled-inventory-app',
    tags: ['SvelteKit', 'TypeScript', 'TailwindCSS'],
    hiddenTags: ['Svelte', 'Iconify'],
    category: 'Major Contributions',
    team: 2,
  },
  {
    name: 'tiszatohaus.hu',
    description: 'Personal booking site for an apartment owner',
    url: 'https://tiszatohaus.hu',
    tags: ['Astro', 'Vue', 'UnoCSS', 'Shadcn', 'Astro DB'],
    hiddenTags: ['TypeScript', 'Drizzle', 'Iconify'],
    category: 'Sites',
    team: 2,
  },
  {
    name: 'Safari Game',
    description: 'They made me create a game in libgdx....',
    githubUrl: 'https://github.com/Rettend/safari',
    tags: ['Java'],
    category: 'Past',
  },
]
