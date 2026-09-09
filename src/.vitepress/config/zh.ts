import { defineConfig } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-CN',
  description: 'Miacode 使用文档与 simai 谱面创作参考',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/qianxia-a/MiacodeDocs/edit/main/src/:path',
      text: '在 GitHub 上编辑此页面'
    },
    lastUpdated: {
      text: '最后编辑于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    nav: [
      { text: 'Miacode', base: '/miacode', collapsed: true, items: [
        { text: '简介', link: '/' }
      ] },
      { text: '关于我们', link: '/other/about' },
      { text: 'GitHub', link: 'https://github.com/fanfaredash/MiaCode' }
    ],
    sidebar: [
      { text: 'Miacode', base: '/miacode', collapsed: false, items: [
        { text: '简介', link: '/' },
        { text: '使用 Miacode', base: '/miacode/usage', collapsed: true, items: [
          { text: '新建谱面', link: '/new' }, { text: '恢复备份', link: '/recovery' },
          { text: '导出', link: '/export' }, { text: '时间轴', link: '/timeline' },
          { text: '音频与同步', link: '/audio-sync' },
          { text: '工具', link: '/tools' }, { text: 'touch 点击输入', link: '/touch-input' }
        ] },
        { text: '设置', base: '/miacode/settings', collapsed: true, items: [
          { text: '编辑区', link: '/edit' }, { text: '预览区', link: '/preview' }
        ] }
      ] },
      { text: '其余', base: '/other', collapsed: true, items: [{ text: '关于我们', link: '/about' }] }
    ],
    docFooter: { prev: '上一页', next: '下一页' }, outline: { level: [2, 3], label: '页面导航' }, langMenuLabel: '切换语言'
  }
})
