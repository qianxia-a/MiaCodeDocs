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
      <a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=q6RJClO8ug9Y_Rtak5rxV_ITvV-qcKKx&authKey=TCBX53Kwrz%2BPrbBOidO%2Fb8moMBTeXyFMIpHog%2F0CqB%2FptUG4Bce%2BzN7RGBTyZ6qe&noverify=0&group_code=1095435375">
        {{ lang === 'en-US' ? 'QQ Group: MiaCode User Group' : 'QQ群 MiaCode 用户交流群' }}
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
</footer>
</template>
