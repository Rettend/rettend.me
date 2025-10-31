import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  astro: true,
  typescript: true,
  rules: {
    'no-console': 'warn',
    'antfu/if-newline': 'off',
    'style/brace-style': 'off',
  },
})
