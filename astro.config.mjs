// @ts-check
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

export default defineConfig({
  site: 'https://rettend.github.io',
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
  ],
})
