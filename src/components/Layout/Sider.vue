<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import DynamicIcon from '@/components/Common/DynamicIcon.vue'

const props = defineProps<{
  collapsed: boolean
}>()

const selectedKeys = ref<string[]>(['1'])
const menuList = ref([
  {
    id: 1,
    name: '首页',
    icon: 'SmileOutlined',
    path: '/home'
  },
  {
    id: 2,
    name: '客户管理',
    icon: 'UserOutlined',
    path: '/client-management'
  }
])
</script>

<template>
  <a-layout-sider class="sider" :collapsed="props.collapsed" :trigger="null" collapsible>
    <div class="logo">
      <img class="logo-default" src="@/assets/images/skylark-logo.png" alt="" />
      <span class="logo-text" v-show="!props.collapsed">语燕</span>
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
      <a-menu-item v-for="menu in menuList" :key="menu.id">
        <DynamicIcon :name="menu.icon" />
        <span>{{ menu.name }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<style scoped lang="postcss">
.sider {
  height: 100vh;
  background-color: var(--color-background);
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-background);
  margin: 20px 6px;
  box-sizing: border-box;
  &-default {
    width: 32px;
    height: 24px;
  }
  &-text {
    font-family: AlibabaPuhuiBold;
  }
}
</style>
