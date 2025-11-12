// @ts-check

import mdx from '@astrojs/mdx'
import SolidJS from '@astrojs/solid-js'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

export default defineConfig({
  site: 'https://rettend.me',
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    SolidJS(),
    mdx(),
  ],
  prefetch: {
    defaultStrategy: 'viewport',
  },
  markdown: {
    shikiConfig: {
      theme: 'vitesse-dark',
    },
  },
})
