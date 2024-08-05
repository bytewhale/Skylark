<script setup lang="ts">
import { ref } from 'vue'
import { Layout } from 'ant-design-vue'
import Sider from './Sider.vue'
import Header from './Header.vue'

const collapsed = ref(false)

const handleCollapse = () => {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <a-layout>
    <Sider :collapsed="collapsed" />
    <Header :collapsed="collapsed" @collapse="handleCollapse" />
  </a-layout>
</template>

<style scoped lang="postcss"></style>
