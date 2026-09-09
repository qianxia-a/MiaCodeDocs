import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'Miacode',
  lastUpdated: true,
  cleanUrls: true,
  vite: {
    ssr: {
      noExternal: ['@nolebase/*']
    },
    plugins: [
      GitChangelog({
        maxGitLogCount: 2000,
        repoURL: () => 'https://github.com/qianxia-a/MiacodeDocs'
      }),
      GitChangelogMarkdownSection({
        exclude: (id) => id.endsWith('index.md'),
        sections: {
          disableChangelog: false,
          disableContributors: true
        }
      }) as any
    ]
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/miacode.png' }]
  ],
  themeConfig: {
    logo: '/images/miacode.png',
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/fanfaredash/MiaCode' }]
  }
})
