<template>
  <div class="Cyhome">
    <el-row :gutter="15">
      <el-col :span="6">
        <Weight>
          <div class="download">
            <p>登录用户</p>
            <p>{{ item }}</p>
          </div>
        </Weight>
      </el-col>
      <el-col :span="6">
        <Weight>
          <div class="download">
            <p>下载</p>
          </div>
        </Weight>
      </el-col>
      <el-col :span="6">
        <Weight>
          <div class="download">
            <p>活跃用户</p>
          </div>
        </Weight>
      </el-col>
      <el-col :span="6">
        <Weight>
          <div class="download">
            <p>系统信息</p>
          </div>
        </Weight>
      </el-col>
    </el-row>
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
      socket: null,
      message: '',
      messages: [],
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
  mounted() { //dom渲染结束后调用
    this.initWebsocket();
  },
  beforeDestroy() { //销毁连接，防止内存溢出
    this.socket.close();
  },
  methods: {
    initWebsocket() {
      this.socket = new WebSocket('ws://');
      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };

      this.socket.onmessage = (event) => {
        this.messages.push(event.data);
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.socket.onclose = () => {
        console.log('WebSocket closed');
      };
    },
    sendMessage() {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(this.message);
        this.message = '';
      } else {
        console.error('WebSocket is not open');
      }
    }
  }
};
</script>
