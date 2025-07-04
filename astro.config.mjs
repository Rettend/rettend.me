// @ts-check

import SolidJS from '@astrojs/solid-js'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

export default defineConfig({
  site: 'https://rettend.github.io',
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    SolidJS(),
  ],
  prefetch: {
    defaultStrategy: 'viewport',
  },
})
