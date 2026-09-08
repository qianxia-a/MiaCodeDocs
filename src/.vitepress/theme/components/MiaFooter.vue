<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'

const { lang } = useData()
const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/en/' || route.path === '/en/index.html')
</script>

<template>
<footer v-if="isHome" class="mia-footer">
  <div class="mia-footer-inner">
    <div class="mia-footer-group">
      <h2>{{ lang === 'en-US' ? 'Community' : '社区' }}</h2>
      <a href="#">
        {{ lang === 'en-US' ? 'QQ Group: Miacode User Group' : 'QQ群 Miacode 用户交流群' }}
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
</footer>
</template>
