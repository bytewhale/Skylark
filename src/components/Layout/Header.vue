<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  collapse: []
}>()

const handleCollapseClick = () => {
  emit('collapse')
}
</script>

<template>
  <a-layout>
    <a-layout-header style="background: #fff; padding: 0">
      <menu-unfold-outlined v-if="props.collapsed" class="trigger" @click="handleCollapseClick" />
      <menu-fold-outlined v-else class="trigger" @click="handleCollapseClick" />
    </a-layout-header>
    <slot></slot>
  </a-layout>
</template>

<style scoped lang="postcss">
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.trigger:hover {
  color: #1890ff;
}
</style>
