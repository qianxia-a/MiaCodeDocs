import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import MiaFooter from './components/MiaFooter.vue'
import './custom.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-top': () => h(NolebaseHighlightTargetedHeading),
    'layout-bottom': () => h(MiaFooter)
  })
}
