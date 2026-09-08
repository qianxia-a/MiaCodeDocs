import { defineConfig } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-CN',
  description: 'Miacode 使用文档与 simai 谱面创作参考',
  themeConfig: {
    nav: [
      { text: 'Miacode', link: '/miacode/' },
      { text: '关于我们', link: '/other/about' },
      { text: 'GitHub', link: 'https://github.com/fanfaredash/MiaCode' }
    ],
    sidebar: [
      { text: 'Miacode', collapsed: false, items: [
        { text: '简介', link: '/miacode/' },
        { text: '使用 Miacode', collapsed: false, items: [
          { text: '新建谱面', link: '/miacode/usage/new' }, { text: '恢复备份', link: '/miacode/usage/recovery' },
          { text: '编辑谱面', link: '/miacode/usage/edit' }, { text: '时间轴', link: '/miacode/usage/timeline' },
          { text: '预览', link: '/miacode/usage/preview' }, { text: '音频与同步', link: '/miacode/usage/audio-sync' }
        ] },
        { text: '导出', collapsed: false, items: [
          { text: '导出', link: '/export/' }, { text: '视频导出', link: '/export/video' }, { text: 'ZIP 打包', link: '/export/zip' }
        ] }
      ] },
      { text: '关于我们', base: '/other', collapsed: false, items: [{ text: '关于我们', link: '/about' }] }
    ],
    docFooter: { prev: '上一页', next: '下一页' }, outline: { level: [2, 3], label: '页面导航' }, langMenuLabel: '切换语言'
  }
})
