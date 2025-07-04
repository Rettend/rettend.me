import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import presetShadcn from 'unocss-preset-shadcn'

export default defineConfig({
  shortcuts: [
    {
      code: 'rounded-sm bg-muted-foreground/20 px-1 font-mono',
    },
  ],
  rules: [
    [
      'backdrop-pixelate',
      {
        'backdrop-filter': 'url(#pixelate)',
      },
    ],
    [
      'scrollbar-gutter-stable',
      {
        'scrollbar-gutter': 'stable',
      },
    ],
    [/^split-text-inner$/, ([,]) => `
      .split-text-inner {
        display: inline-flex;
        position: relative;
        color: hsl(var(--foreground) / 0.8);
        transition: color 0.2s ease-in-out, text-shadow 0.2s ease-in-out;
      }
      .group:hover .split-text-inner {
        color: hsl(var(--foreground));
        text-shadow: 0 0 3px hsl(var(--primary));
      }
      .split-text-inner > span {
        transition: transform 0.2s ease-in-out;
      }
      .group:hover .split-text-inner > span:first-child {
        transform: translateX(-8px);
      }
      .group:hover .split-text-inner > span:last-child {
        transform: translateX(8px);
      }
    `],
    [/^split-text$/, ([,]) => `
      .split-text {
        position: relative;
        display: inline-block;
      }
    `],
    [/^split-text-dash$/, ([,]) => `
      .split-text-dash {
        position: absolute;
        top: 50%;
        left: 50%;
        color: hsl(var(--primary));
        font-weight: bold;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        transition: all 0.5s ease-in-out;
        text-shadow: 0 0 5px hsl(var(--primary));
      }
      .group:hover .split-text-dash {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
      }
    `],
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  presets: [
    presetWind3(),
    presetTypography(),
    presetAnimations(),
    presetShadcn(
      {
        color: 'neutral',
      },
    ),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  preflights: [
    {
      getCSS: () => {
        return `
          html {
            padding: 0;
            margin: 0;
            height: 100dvh;
            width: 100dvw;
            overflow: hidden;
            scrollbar-width: thin;
            scrollbar-color: black transparent;
          }

          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: hsl(var(--background));
          }

          ::-webkit-scrollbar-thumb {
            background-color: hsl(var(--primary));
            border-radius: 4px;
            transition: background-color .2s ease-in-out;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: hsl(var(--primary));
          }

          @view-transition {
            navigation: auto;
          }

          ::view-transition-old(root) {
            animation: 400ms cubic-bezier(0.4, 0, 0.2, 1) both fade-out;
          }
          ::view-transition-new(root) {
            animation: 400ms cubic-bezier(0.4, 0, 0.2, 1) both fade-in;
          }

          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fade-out {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
        `
      },
    },
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}',
      ],
    },
  },
})
