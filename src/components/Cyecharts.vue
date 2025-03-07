<template>
  <div ref="chart" style="width: 100%; height: 500px"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "DynamicChart",
  props: {
    // 父组件传递的数据
    initialData: {
      type: Object,
      required: true,
      default: () => ({
        categories: [],
        categories2: [],
        data: [],
        data2: [],
      }),
    },
    // 更新间隔时间（毫秒）
    intervalTime: {
      type: Number,
      default: 2100,
    },
  },
  data() {
    return {
      myChart: null,
      categories: [],
      categories2: [],
      data: [],
      data2: [],
      app: {
        count: 12,
      },
    };
  },
  watch: {
    // 监听父组件传递的数据变化
    initialData: {
      handler(newData) {
        this.categories = [...newData.categories];
        this.categories2 = [...newData.categories2];
        this.data = [...newData.data];
        this.data2 = [...newData.data2];
        this.updateChart();
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chart); // 初始化图表
    this.initChart();
    this.startInterval();
  },
  methods: {
    initChart() {
      // 初始化 ECharts 实例
      this.myChart = echarts.init(this.$refs.chart);

      // 配置项
      const option = {
        title: {
          text: "销售数据",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56",
            },
          },
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: this.categories,
          },
          {
            type: "category",
            boundaryGap: true,
            data: this.categories2,
          },
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "Price",
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2],
          },
          {
            type: "value",
            scale: true,
            name: "Order",
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2],
          },
        ],
        series: [
          {
            name: "销售柱状图",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: this.data,
          },
          {
            name: "销售折线图",
            type: "line",
            data: this.data2,
          },
        ],
      };

      // 设置配置项
      this.myChart.setOption(option);
    },
    startInterval() {
      setInterval(() => {
        let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
        this.data.shift();
        this.data.push(Math.round(Math.random() * 1000));
        this.data2.shift();
        this.data2.push(+(Math.random() * 10 + 5).toFixed(1));
        this.categories.shift();
        this.categories.push(axisData);
        this.categories2.shift();
        this.categories2.push(this.app.count++);

        // 更新图表
        this.updateChart();
      }, this.intervalTime);
    },
    updateChart() {
      if (this.myChart) {
        this.myChart.setOption({
          xAxis: [
            {
              data: this.categories,
            },
            {
              data: this.categories2,
            },
          ],
          series: [
            {
              data: this.data,
            },
            {
              data: this.data2,
            },
          ],
        });
      }
    },
  },
  beforeDestroy() {
    // 清除定时器
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
};
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>
