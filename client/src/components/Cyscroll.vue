<template>
  <div class="realtime-scroll-container">
    <!-- 控制栏 -->
    <div class="control-bar">
      <el-button
        @click="toggleAutoScroll"
        :type="autoScroll ? 'primary' : ''"
      >{{ autoScroll ? '暂停自动滚动' : '启用自动滚动' }}</el-button>
      <span class="count">当前数据量: {{ dataList.length }}</span>
    </div>

    <!-- 数据容器 -->
    <div class="data-container" ref="container" @scroll="handleScroll">
      <!-- 虚拟滚动优化 -->
      <div class="scroll-content" :style="{ height: totalHeight + 'px' }">
        <div
          v-for="visibleItem in visibleItems"
          :key="visibleItem.id"
          class="data-item"
          :style="{ transform: `translateY(${visibleItem.top}px)` }"
        >
          <div class="timestamp">{{ visibleItem.time }}</div>
          <div class="content">{{ visibleItem.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { throttle } from "lodash";

export default {
  props: {
    // 初始数据
    initialData: {
      type: Array,
      default: () => [],
    },
    // 最大保留数据量
    maxItems: {
      type: Number,
      default: 1000,
    },
  },

  data() {
    return {
      dataList: [],
      autoScroll: true,
      itemHeight: 50, // 每项高度
      buffer: 10, // 预渲染缓冲区
      scrollTop: 0, // 当前滚动位置
      containerHeight: 0, // 容器高度
      // WebSocket 相关
      ws: null,
      reconnectAttempts: 0,
      maxReconnectAttempts: 5,
    };
  },

  computed: {
    // 虚拟滚动相关计算
    totalHeight() {
      return this.dataList.length * this.itemHeight;
    },

    startIndex() {
      return Math.max(
        0,
        Math.floor(this.scrollTop / this.itemHeight) - this.buffer
      );
    },

    endIndex() {
      return Math.min(
        this.dataList.length,
        Math.ceil((this.scrollTop + this.containerHeight) / this.itemHeight) +
          this.buffer
      );
    },

    visibleItems() {
      return this.dataList
        .slice(this.startIndex, this.endIndex)
        .map((item, index) => ({
          ...item,
          top: (this.startIndex + index) * this.itemHeight,
        }));
    },
  },

  mounted() {
    // this.initWebSocket();
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    this.closeWebSocket();
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    // 初始化 WebSocket 连接
    initWebSocket() {
      const wsUrl = "wss://localhost:3000";
      this.ws = new WebSocket(wsUrl);

      this.ws.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
          this.addNewData(newData);
        } catch (error) {
          console.error("数据解析失败:", error);
        }
      };

      this.ws.onclose = () => {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          setTimeout(() => {
            this.reconnectAttempts++;
            this.initWebSocket();
          }, 2000);
        }
      };
    },

    // 添加新数据
    addNewData(newData) {
      const timestamp = new Date().toLocaleTimeString();
      const item = {
        id: Date.now() + Math.random(),
        time: timestamp,
        content: newData,
        height: this.itemHeight,
      };

      // 维护数据队列长度
      if (this.dataList.length >= this.maxItems) {
        this.dataList = [...this.dataList.slice(-this.maxItems + 1), item];
      } else {
        this.dataList = [...this.dataList, item];
      }

      // 自动滚动处理
      this.$nextTick(() => {
        if (this.autoScroll && this.isNearBottom()) {
          this.scrollToBottom();
        }
      });
    },

    // 滚动事件处理
    handleScroll: throttle(function (e) {
      this.scrollTop = e.target.scrollTop;
      this.checkAutoScrollState();
    }, 200),

    // 检查是否应该恢复自动滚动
    checkAutoScrollState() {
      if (this.isNearBottom()) {
        this.autoScroll = true;
      }
    },

    // 判断是否接近底部
    isNearBottom() {
      const container = this.$refs.container;
      return (
        container.scrollHeight -
          (container.scrollTop + container.clientHeight) <
        50
      );
    },

    // 滚动到底部
    scrollToBottom() {
      const container = this.$refs.container;
      container.scrollTop = container.scrollHeight;
    },

    // 切换自动滚动
    toggleAutoScroll() {
      this.autoScroll = !this.autoScroll;
      if (this.autoScroll) this.scrollToBottom();
    },

    // 窗口大小变化处理
    handleResize: throttle(function () {
      this.containerHeight = this.$refs.container.clientHeight;
    }, 200),

    // 关闭 WebSocket
    closeWebSocket() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    },
  },
};
</script>
  
  <style scoped>
.realtime-scroll-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.control-bar {
  padding: 10px;
  background: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  gap: 15px;
  align-items: center;
}

.data-container {
  flex: 1;
  overflow-y: auto;
  position: relative;
}

.scroll-content {
  position: relative;
}

.data-item {
  position: absolute;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid #eee;
  transition: background 0.3s;
}

.data-item:hover {
  background: #f5f7fa;
}

.timestamp {
  width: 120px;
  color: #909399;
  font-size: 0.9em;
}

.content {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.count {
  color: #67c23a;
  font-size: 0.9em;
}
</style>