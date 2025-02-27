<template>
  <div class="Cyhome">
    <Weight>
      <el-row>
        <el-col>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <p>工作台</p>
          <div class="platform">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              :size="150"></el-avatar>
            <div>
              <p>上午好，田野院子，休息一会儿吧</p>
              <p>前端工程师|某某公司-某某部门-vue平台</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
         <p>更新时间</p>
         <p>更新次数</p>
         <p>更新内容</p>
        </el-col>
      </el-row>
    </Weight>
    <Weight>
      <Cyecharts :options="chartOptions" />
    </Weight>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      chartOptions: {
        title: {
          text: "柱状图示例",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["销量"],
        },
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "销量",
            type: "bar", // 使用柱状图
            data: [120, 200, 150, 80, 70, 110, 130],
          },
        ],
      },
    };
  },
};
</script>
<style lang="scss">
.platform {
  display: flex;
}
</style>
