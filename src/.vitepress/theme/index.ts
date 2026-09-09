import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { InjectionKey, NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import MiaFooter from './components/MiaFooter.vue'
import './custom.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(NolebaseGitChangelogPlugin)
    app.provide(InjectionKey, {
      hideChangelogNoChangesText: true,
      commitsRelativeTime: true,
      displayAuthorsInsideCommitLine: true,
      hideContributorsHeader: true,
      hideChangelogHeader: true
    })
  },
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-top': () => h(NolebaseHighlightTargetedHeading),
    'layout-bottom': () => h(MiaFooter)
  })
}
