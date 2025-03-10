<template>
  <div ref="chart" :style="{width: width, height: height}"></div>
</template>
<script>
export default {
  name: "Cybarchart",
  props: {
    width: { type: string, default: "100%" },
    height: { type: string, default: "400px" },
    // 防抖延迟时间（毫秒）
    debounceDelay: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
        data:[]
    };
  },
  watch:{
    initaldata:{}
  }
};
</script>