<template>
  <header class="shadow">
    <div class="logo-container">
      <img src="../assets/logo.png" alt="Logo" class="logo-img" />
      <span class="logo-text">XXX管理系统</span>
    </div>
    <div class="header-right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar
            :size="50"
            :src="user.imgpath"
          ></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="inforVisible = true">个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="passwordVisible = true">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 个人信息修改 -->
    <el-dialog title="提示" :visible.sync="inforVisible" width="30%" :before-close="handleClose" append-to-body>
      <span>{{ user.username }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="inforVisible = false">取 消</el-button>
        <el-button type="primary" @click="inforVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="passwordVisible" append-to-body width="30%">
      <el-form :model="passwordForm" label-width="100px">
        <el-form-item label="旧密码">
          <el-input type="password" v-model="passwordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="passwordForm.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passwordVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </el-dialog>
  </header>
</template>

<script>

export default {
  data() {
    return {
      inforVisible: false,
      passwordVisible: false,
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    user() {
      console.log(this.$store.state.user);
      return this.$store.state.user || {};      
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    onSubmit() {
      // 表单验证
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.$message.error("两次输入的密码不一致");
        return;
      }

      // 提交逻辑
      console.log("修改密码表单数据:", this.passwordForm);
      this.passwordVisible = false; // 关闭对话框
      setTimeout(() => {
        this.$message.success("密码修改成功");
      }, 500);
    },
     logout() {
      this.$store.commit("logout");
      this.$router.replace("/login");
    },
  },
};
</script>
<style lang="scss">
.el-breadcrumb__inner {
  font-size: 20px;
}
.logo-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.shadow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-right {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding-right: 40px;
    .el-dropdown {
      height: 50px;
    }
  }
}
.el-button--text {
  color: #606266;
}
.logo-img {
  height: 50px;
  padding-left: 20px;
}
</style>