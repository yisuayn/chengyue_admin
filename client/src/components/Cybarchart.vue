<template>
  <div ref="chartRef" :style="{width: width, height: height}"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "Cybarchart",
  props: {
    options: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "400px",
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  watch: {
    options: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    initChart() {
      if (this.$refs.chartRef) {
        this.chartInstance = echarts.init(this.$refs.chartRef);
        this.chartInstance.setOption(this.options);
      }
    },
    updateChart() {
      if (this.chartInstance) {
        this.chartInstance.setOption(this.options);
      }
    },
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },
  },
};
</script>