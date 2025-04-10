<!-- SimpleDrawer.vue -->
<template>
  <el-drawer
    :title="title"
    :visible.sync="localVisible"
    :direction="direction"
    :size="size"
  >
  <span>我来了</span>
  </el-drawer>
</template>

<script>
export default {
  name: 'CustomDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '抽屉标题'
    },
    direction: {
      type: String,
      default: 'rtl' // 支持：rtl / ltr / ttb / btt
    },
    size: {
      type: String,
      default: '30%' // 支持像素：'300px' 或百分比
    }
  },
  data() {
    return {
      localVisible: this.visible
    }
  },
  watch: {
    visible(newVal) {
      this.localVisible = newVal
    },
    localVisible(newVal) {
      this.$emit('update:visible', newVal)
    }
  }
}
</script>