<template>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script>
  export default {
    name: 'Cyecharts',
    props: {
      options: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        // 使用全局挂载的 ECharts
        const myChart = this.$echarts.init(this.$refs.chart);
        myChart.setOption(this.options);
      },
    },
    watch: {
      // 监听 options 变化，更新图表
      options: {
        deep: true,
        handler() {
          this.initChart();
        },
      },
    },
  };
  </script>