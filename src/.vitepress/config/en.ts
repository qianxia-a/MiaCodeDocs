import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  description: 'Miacode documentation and simai chart creation guide',
  themeConfig: {
    nav: [
      { text: 'Miacode', link: '/en/miacode/' }, { text: 'About us', link: '/en/other/about' },
      { text: 'GitHub', link: 'https://github.com/fanfaredash/MiaCode' }
    ],
    sidebar: [
      { text: 'Miacode', collapsed: false, items: [
        { text: 'Overview', link: '/en/miacode/' },
        { text: 'Using Miacode', collapsed: false, items: [
          { text: 'Create a chart', link: '/en/miacode/usage/new' }, { text: 'Restore a backup', link: '/en/miacode/usage/recovery' },
          { text: 'Edit a chart', link: '/en/miacode/usage/edit' }, { text: 'Timeline', link: '/en/miacode/usage/timeline' },
          { text: 'Preview', link: '/en/miacode/usage/preview' }, { text: 'Audio and sync', link: '/en/miacode/usage/audio-sync' }
        ] },
        { text: 'Export', collapsed: false, items: [
          { text: 'Export', link: '/en/export/' }, { text: 'Video export', link: '/en/export/video' }, { text: 'ZIP archive', link: '/en/export/zip' }
        ] }
      ] },
      { text: 'About us', base: '/en/other', collapsed: false, items: [{ text: 'About us', link: '/about' }] }
    ],
    docFooter: { prev: 'Previous', next: 'Next' }, outline: { level: [2, 3], label: 'On this page' }, langMenuLabel: 'Languages'
  }
})
