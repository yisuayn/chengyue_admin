<template>
  <el-row>
    <Weight class="market">
      <Cyecharts :initialData="chartData" :intervalTime="5000" />
    </Weight>
    <el-row :gutter="12">
      <el-col :span="12">
        <Weight class="market">
          <Cybarchart :options="chartOptions" />
        </Weight>
      </el-col>
      <el-col :span="12">
        <Weight class="market">
          <Cypiechart :options="pieOptions" />
        </Weight>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      chartData: {
        categories: (function () {
          let now = new Date();
          let res = [];
          let len = 10;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
            now = new Date(+now - 2000);
          }
          return res;
        })(),
        categories2: (function () {
          let res = [];
          let len = 10;
          while (len--) {
            res.push(10 - len - 1);
          }
          return res;
        })(),
        data: (function () {
          let res = [];
          let len = 10;
          while (len--) {
            res.push(Math.round(Math.random() * 1000));
          }
          return res;
        })(),
        data2: (function () {
          let res = [];
          let len = 0;
          while (len < 10) {
            res.push(+(Math.random() * 10 + 5).toFixed(1));
            len++;
          }
          return res;
        })(),
      },
      chartOptions: {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            data: [120, 200, 150, 80, 70, 110, 130],
          },
        ],
      },
      pieOptions: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.updatachartOptions();
  },
  methods: {
    updatachartOptions() {},
  },
};
</script>
<style lang="scss" scoped>
.market {
  padding: 20px;
}
</style>
