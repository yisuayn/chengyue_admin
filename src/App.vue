<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkInterval: null, // 持久化定时器ID
      lastActivity: Date.now(), // 活动时间存到data中
    };
  },
  created() {
    this.startAuthCheck();
  },
  beforeDestroy() { // 组件销毁时清理
    this.cleanupAuthCheck();
  },
  methods: {
    startAuthCheck() {
     // 1. 清理旧定时器（防止重复创建）
      this.cleanupAuthCheck();

      this.checkInterval = setInterval(() => {
        const { isLogin, loginTime } = this.$store.state;
        const now = Date.now();
        
        if (!isLogin) {
          this.cleanupAuthCheck();
          return;
        }

        const maxLoginTime = 4 * 60 * 60 * 1000;
        const idleLimit = 3 * 60 * 1000;

        if (now - loginTime > maxLoginTime) {
          this.forceLogout("登录超过4小时，已自动退出");
          return;
        }

        console.log("计时器",now - this.lastActivity>idleLimit);
        if (now - this.lastActivity > idleLimit) {
          this.forceLogout("您30分钟无操作，已自动退出");
        }
      }, 60000); // 每分钟检查

      const updateActivity = () => {
        this.lastActivity = Date.now();
      };

      window.addEventListener("mousemove", updateActivity);
      window.addEventListener("keydown", updateActivity);

      // 5. 保存监听器以便移除
      this.activityListener = updateActivity;
    },

    forceLogout(message) {
      this.$store.commit("logout");
      this.$router.replace("/login");
      this.$message.warning(message);
      this.cleanupAuthCheck(); // 立即清理
    },
    cleanupAuthCheck() {
      // 1. 清除定时器
      if (this.checkInterval) {
        clearInterval(this.checkInterval);
        this.checkInterval = null;
      }

      // 2. 移除事件监听
      if (this.activityListener) {
        window.removeEventListener("mousemove", this.activityListener);
        window.removeEventListener("keydown", this.activityListener);
        this.activityListener = null;
      }
    }
    
  },
};
</script>

<style lang="scss">
*,
*::after,
*::before {
  padding: 0;
  margin: 0;
}
.Cybox {
  padding: 20px;
}
/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 4px; /* 滚动条宽度 */
  height: 4px; /* 滚动条高度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: transparent; /* 轨道背景色 */
  border-radius: 10px; /* 轨道圆角 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: #96d9f8; /* 滑块背景色 */
  border-radius: 10px; /* 滑块圆角 */
}

/* 滚动条滑块悬停效果 */
::-webkit-scrollbar-thumb:hover {
  background: #555; /* 滑块悬停背景色 */
}
#app {
  font-family: "Pacifico", cursive;
  font-size: 25px;
  font-weight: 600 !important;
}
</style>