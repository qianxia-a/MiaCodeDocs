import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'Miacode',
  cleanUrls: true,
  themeConfig: {
    logo: '/images/miacode.png',
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/fanfaredash/MiaCode' }]
  }
})
