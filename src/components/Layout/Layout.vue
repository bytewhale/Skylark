<script setup lang="ts">
import { ref, computed } from 'vue'
import { Layout } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
import Sider from './Sider.vue'
import Header from './Header.vue'

const collapsed = ref(false)
const router = useRouter()
const route = useRoute()
const handleCollapse = () => {
  collapsed.value = !collapsed.value
}

const pageTitle = computed(() => {
  return route.meta.title
})
const keepAlive = computed(() => {
  return route.meta.keepAlive
})
</script>

<template>
  <a-layout>
    <Sider :collapsed="collapsed" />
    <Header :collapsed="collapsed" @collapse="handleCollapse">
      <!-- 内容区 -->
      <a-layout class="content" style="padding: 24px 24px 24px">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!keepAlive" />
        </router-view>
      </a-layout>
      <!-- 内容区结束 -->
    </Header>
  </a-layout>
</template>

<style scoped lang="postcss">
.content {
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
  background: var(--color-background);
  border-radius: 6px;
}
</style>
