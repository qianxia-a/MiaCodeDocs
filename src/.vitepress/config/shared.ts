import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'Miacode',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/miacode.png' }]
  ],
  themeConfig: {
    logo: '/images/miacode.png',
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/fanfaredash/MiaCode' }]
  }
})
