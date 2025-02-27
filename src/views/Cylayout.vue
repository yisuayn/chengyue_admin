<template>
  <div class="cylayout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="auto">
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="product">
              <i class="el-icon-location"></i>
              <span slot="title">产品管理</span>
            </el-menu-item>
            <el-menu-item index="advertisement">
              <i class="el-icon-setting"></i>
              <span slot="title">广告管理</span>
            </el-menu-item>
            <el-menu-item index="assets">
              <i class="el-icon-s-home"></i>
              <span slot="title">资源存储</span>
            </el-menu-item>
            <el-menu-item index="consult">
              <i class="el-icon-s-data"></i>
              <span slot="title">咨询动态</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main><router-view /></el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>


export default {
  name: "cylayout",
  components: {
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss">
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
  .el-menu{
    height: 100%;
    width: 260px;
  }
}

.el-main {
  background-color: #faf8f8;
  color: #333;
  height: calc(100vh - 120px);
  overflow-y: scroll !important;
  padding: 10px !important;
}

body>.el-container {
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
