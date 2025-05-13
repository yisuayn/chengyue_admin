<template>
  <div class="cylayout">
    <el-container>
      <el-header>
        <Cyheader v-if="$store.state.isLogin" />
      </el-header>
      <el-container>
        <el-aside width="auto">
          <el-menu
            :default-active="activeIndex"
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-menu-item index="/">
              <i class="el-icon-data-line"></i>
              <span slot="title">仪表盘</span>
            </el-menu-item>
            <el-menu-item index="market">
              <i class="el-icon-s-data"></i>
              <span slot="title">销售数据</span>
            </el-menu-item>
            <el-menu-item index="product">
              <i class="el-icon-help"></i>
              <span slot="title">产品管理</span>
            </el-menu-item>
            <el-menu-item index="inventory">
              <i class="el-icon-tickets"></i>
              <span slot="title">库存管理</span>
            </el-menu-item>
            <el-menu-item index="advertisement">
              <i class="el-icon-s-platform"></i>
              <span slot="title">广告管理</span>
            </el-menu-item>
            <el-menu-item index="order">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="client">
              <i class="el-icon-user-solid"></i>
              <span slot="title">客户管理</span>
            </el-menu-item>
            <el-menu-item index="Procurement">
              <i class="el-icon-s-shop"></i>
              <span slot="title">采购详情</span>
            </el-menu-item>
            <el-menu-item index="Warehouse">
              <i class="el-icon-house"></i>
              <span slot="title">仓库调拨</span>
            </el-menu-item>
            <el-menu-item index="consult">
              <i class="el-icon-copy-document"></i>
              <span slot="title">咨询动态</span>
            </el-menu-item>
            <el-menu-item index="settings">
              <i class="el-icon-s-tools"></i>
              <span slot="title">系统设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <div class="breadcrumb">
              <i
                :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                @click="toggleSidebar"
                class="collapse-btn"
              ></i>
              <!-- 面包屑导航 -->
              <el-breadcrumb separator="/">
                <el-breadcrumb-item
                  v-for="(item, index) in breadcrumbList"
                  :key="index"
                  :to="item.path"
                >{{ item.name }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <router-view />
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Cyheader from "../components/Cyheader.vue";
export default {
  name: "cylayout",
  data() {
    return {
      isCollapse: false,
      breadcrumbList: [], // 面包屑数据
      activeIndex: "", //默认菜单
    };
  },
  watch: {
    // 监听路由变化
    $route() {
      this.updateBreadcrumb();
    },
  },
  created() {
    // 初始化面包屑
    this.updateBreadcrumb();
    this.startAuthCheck();
  },
  components: { Cyheader },
  methods: {
    toggleSidebar() {
      this.isCollapse = !this.isCollapse;
    },
    updateBreadcrumb() {
      const matched = this.$route.matched;
      this.breadcrumbList = matched.reduce((list, route) => {
        if (route.meta && route.meta.breadcrumb) {
          list.push(...route.meta.breadcrumb);
        }
        return list;
      }, []);

      // 处理动态路由参数
      if (this.$route.params.id) {
        this.breadcrumbList[
          this.breadcrumbList.length - 1
        ].name = `用户 ${this.$route.params.id}`;
      }
    },
    startAuthCheck() {
      let lastActivity = Date.now();

      const checkInterval = setInterval(() => {
        const loginTime = this.$store.state.loginTime;
        const now = Date.now();

        if (!this.$store.state.isLogin) {
          clearInterval(checkInterval);
          return;
        }

        const maxLoginTime = 4 * 60 * 60 * 1000;
        const idleLimit = 30 * 60 * 1000;

        if (now - loginTime > maxLoginTime) {
          this.forceLogout("登录超过4小时，已自动退出");
          clearInterval(checkInterval);
        }

        if (now - lastActivity > idleLimit) {
          this.forceLogout("您30分钟无操作，已自动退出");
          clearInterval(checkInterval);
        }
      }, 60000); // 每分钟检查

      const updateActivity = () => {
        lastActivity = Date.now();
      };

      window.addEventListener("mousemove", updateActivity);
      window.addEventListener("keydown", updateActivity);
    },

    forceLogout(message) {
      this.$store.commit("logout");
      this.$router.replace("/login");
      this.$message.warning(message);
    },
  },
  mounted() {
    //路由监听
    if (this.$route.path === "/") {
      this.activeIndex = "/";
    } else {
      this.activeIndex = this.$route.path.split("/")[1];
    }
  },
};
</script>

<style lang="scss">
.breadcrumb {
  display: flex;
  padding: 10px;
  justify-items: center;
  align-items: center;
  .collapse-btn {
    font-size: 30px;
    padding-right: 30px;
  }
}
.el-header {
  box-shadow: 0 0.15rem 0.5rem 0 rgb(113, 113, 113, 0.5);
  z-index: 1;
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
  }
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
  .el-menu {
    height: 100%;
    .el-menu-item {
      i {
        font-size: 22px;
      }
      span {
        font-size: 18px;
      }
    }
  }
  .el-menu-item [class^="el-icon-"] {
    width: 26px;
    margin-right: 15px;
  }
}

.el-main {
  background-color: #eaedf1;
  color: #333;
  height: calc(100vh - 120px);
  overflow-y: scroll !important;
  padding: 10px !important;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
