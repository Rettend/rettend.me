export const site = {
  title: 'Rettend',
  url: 'https://rettend.me',
}

export const person = {
  name: 'Hegyi Áron Ferenc',
  handle: 'Rettend',
  email: 'hi@rettend.me',
}

export const socials = {
  github: 'https://github.com/rettend',
  twitter: 'https://x.com/rettend1',
  linkedin: 'https://www.linkedin.com/in/rettend',
}

export const handles = {
  github: 'Rettend',
  twitter: 'Rettend1',
  discord: 'rettend',
}

export const navbarSocialLinks = [
  { href: '/resume', icon: 'i-ph:file-pdf-duotone', label: 'Resume' },
  { href: socials.github, icon: 'i-ph:github-logo-duotone', label: 'GitHub' },
  { href: socials.twitter, icon: 'i-ph:x-logo-duotone', label: 'Twitter' },
]

export const contactLinks = [
  { title: 'rettend.me', href: site.url },
  { title: 'GitHub', href: socials.github },
  { title: 'Twitter', href: socials.twitter },
  { title: 'LinkedIn', href: socials.linkedin },
  { title: 'hi@rettend.me', href: `mailto:${person.email}` },
]

export const languages = [
  { name: 'Hungarian', level: 'Native' },
  { name: 'English', level: 'C1' },
  { name: 'Korean', level: 'A2' },
]

export const interests = {
  coding: 'SolidJS, Svelte, Astro, TypeScript, Mojo, Rust',
  other: 'SpaceX and Starbase ringwatching, Twitter, learning English/Korean/Japanese, LLMs and AI, startups, UI design, anime, ZZZ, reading books/docs/blogs',
}

export const tagline = 'Frontend performance enthusiast building apps, web apps, and libraries'

export const copyright = {
  startYear: 2025,
  owner: person.name,
  license: {
    name: 'CC BY-SA 4.0',
    url: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
}

export function copyrightRange(now = new Date()): string {
  const current = now.getFullYear()
  return current > copyright.startYear ? `${copyright.startYear}-PRESENT` : `${copyright.startYear}`
}
