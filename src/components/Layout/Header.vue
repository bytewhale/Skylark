<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { Layout, LayoutHeader, LayoutContent } from 'ant-design-vue'
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
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
    >
      Content
    </a-layout-content>
  </a-layout>
</template>

<style scoped lang="postcss"></style>
