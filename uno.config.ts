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
    [/^no-scrollbar$/, () => `
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `],
    [
      'backdrop-pixelate',
      {
        'backdrop-filter': 'url(#pixelate) blur(1px)',
      },
    ],
    [
      'scrollbar-gutter-stable',
      {
        'scrollbar-gutter': 'stable',
      },
    ],
    [/^bg-speckles$/, ([,]) => `
      .bg-speckles {
        background-color: hsl(var(--background));
        background-image:
          radial-gradient(hsl(var(--foreground) / 0.12) 1px, transparent 1px),
          radial-gradient(hsl(var(--foreground) / 0.09) 1px, transparent 1px),
          radial-gradient(hsl(var(--foreground) / 0.08) 1px, transparent 1px),
          radial-gradient(hsl(var(--foreground) / 0.075) 1px, transparent 1px),
          radial-gradient(hsl(var(--foreground) / 0.07) 1px, transparent 1px);
        background-size:
          48px 48px,
          48px 48px,
          64px 64px,
          64px 64px,
          80px 80px;
        background-position:
          0 0,
          24px 24px,
          12px 36px,
          36px 12px,
          40px 0;
      }
    `],
    [/^split-text-inner$/, ([,]) => `
      .split-text-inner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        position: relative;
        color: hsl(var(--foreground) / 0.8);
        transition: color 0.2s ease-in-out, text-shadow 0.2s ease-in-out;
      }
      .group:hover .split-text-inner {
        color: hsl(var(--foreground));
        text-shadow: 0 0 3px hsl(var(--primary));
      }
      .split-text-inner > span:not(.split-text-dash) {
        transition: transform 0.2s ease-in-out;
      }
      .split-text-inner > span:first-child {
        text-align: right;
      }
      .split-text-inner > span:last-child {
        text-align: left;
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
        transition: all 0.2s ease-in-out;
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
      collections: {
        logo: {
          yuo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">  <path fill="currentColor" d="M46.1 187l324.6 411.4c11.5 14.6 12.1 35 1.5 50.3L239.5 839.9c-19.5 28.1.6 66.5 34.7 66.5h223.7c14.5 0 27.9-7.4 35.6-19.6l446.9-704.1c17.8-28.1-2.4-64.9-35.8-64.9h-84.4L698 118c-11.5 0-26.4 7.4-33.4 16.5L553.9 278.1c-18 23.4-47.9 23.7-66.5.8l-117-145.3c-6.9-8.6-21.7-15.7-32.9-15.7H185.5l-106.5.8C43.9 118.7 24.4 159.4 46.1 187z"/></svg>',
        },
      },
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
