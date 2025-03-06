<template>
     <Weight>
      <Cyecharts :options="chartOptions" />
    </Weight>
</template>
<script>
export default{
    data(){
        return{
            chartOptions: {
        title: {
          text: '柱状图示例',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['销量'],
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '销量',
            type: 'bar', // 使用柱状图
            data: [120, 200, 150, 80, 70, 110, 130],
          },
        ],
      },
        }
    }
}
</script>