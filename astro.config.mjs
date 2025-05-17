// @ts-check

import tailwindcss from '@tailwindcss/vite'
import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    AstroPWA({
      base: '/',
      scope: '/',
      registerType: 'autoUpdate',
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
