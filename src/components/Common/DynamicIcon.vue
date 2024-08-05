<template>
  <component :is="name" :style="style" :class="className" />
</template>

<script>
import { defineComponent } from 'vue'
import {
  SmileOutlined,
  UserOutlined,
  PoweroffOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
  FolderOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'DynamicIcon',
  components: {
    SmileOutlined,
    UserOutlined,
    PoweroffOutlined,
    InfoCircleOutlined,
    SafetyCertificateOutlined,
    FolderOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  props: {
    name: {
      type: String,
      default: 'SmileOutlined'
    },
    className: {
      type: String,
      default: ''
    },
    style: {
      type: Object,
      default: () => {}
    }
  }
})
</script>
