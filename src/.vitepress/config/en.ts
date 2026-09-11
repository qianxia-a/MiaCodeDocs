import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  description: 'MiaCode documentation and simai chart creation guide',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/qianxia-a/MiacodeDocs/edit/main/src/:path',
      text: 'Edit this page on GitHub'
    },
    lastUpdated: {
      text: 'Last edited on',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    nav: [
      { text: 'MiaCode', link: '/en/miacode/' }, { text: 'About us', link: '/en/other/about' },
      { text: 'GitHub', link: 'https://github.com/fanfaredash/MiaCode' }
    ],
    sidebar: [
      { text: 'MiaCode', base: '/en/miacode', collapsed: false, items: [
        { text: 'Overview', link: '/' },
        { text: 'Using MiaCode', base: '/en/miacode/usage', collapsed: true, items: [
          { text: 'Create a chart', link: '/new' }, { text: 'Restore a backup', link: '/recovery' },
          { text: 'Timeline', link: '/timeline' }, { text: 'Audio and sync', link: '/audio-sync' }
        ] },
        { text: 'Settings', base: '/en/miacode/settings', collapsed: true, items: [
          { text: 'Edit area', link: '/edit' }, { text: 'Preview area', link: '/preview' }
        ] }
      ] },
      { text: 'More', base: '/en/other', collapsed: true, items: [{ text: 'About us', link: '/about' }] }
    ],
    docFooter: { prev: 'Previous', next: 'Next' }, outline: { level: [2, 3], label: 'On this page' }, langMenuLabel: 'Languages'
  }
})
