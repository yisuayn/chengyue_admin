<template>
  <header class="shadow">
    <div class="logo-container">
      <img src="../assets/logo.png" alt="Logo" class="logo-img" />
      <span class="logo-text">晟玥科技仓储管理系统</span>
    </div>
    <div class="header-right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar :size="50" :src="user.imgpath"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="inforVisible = true">信息修改</el-dropdown-item>
          <el-dropdown-item @click.native="passwordVisible = true">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 个人信息修改 -->
    <el-dialog
      title="提示"
      :visible.sync="inforVisible"
      width="24%"
      :before-close="handleClose"
      append-to-body
    >
      <el-form :model="uesrfrom">
        <el-form-item label="当前用户：" :label-width="formLabelWidth">
          <el-input v-model="uesrfrom.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户职位：" :label-width="formLabelWidth">
          <el-input v-model="uesrfrom.position" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在部门：" :label-width="formLabelWidth">
          <el-input v-model="uesrfrom.department" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在平台：" :label-width="formLabelWidth">
          <el-input v-model="uesrfrom.platform" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在公司：" :label-width="formLabelWidth">
          <el-input v-model="uesrfrom.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像URL：" :label-width="formLabelWidth">
          <el-input v-model="uesrfrom.imgpath" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="inforVisible = false">取 消</el-button>
        <el-button type="primary" @click="amend">确定修改</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="passwordVisible" append-to-body width="25%">
      <el-form :model="passwordForm" label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="passwordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="passwordForm.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passwordVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit(passwordForm)">确定</el-button>
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
      formLabelWidth: "100px",
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      uesrfrom: {},
    };

  },
  computed: {
    user() {
      return this.$store.state.user || {};
    },
  },
  watch: {
    user: {
      handler(newUser) {
        this.uesrfrom.username = newUser.username;
        this.uesrfrom.position = newUser.position;
        this.uesrfrom.department = newUser.department;
        this.uesrfrom.platform = newUser.platform;
        this.uesrfrom.company = newUser.company;
        this.uesrfrom.imgpath = newUser.imgpath;
      },
      deep: true, // 深度监听
      immediate: true, // 立即触发（替代 created）
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
    onSubmit(value) {
      // 表单验证
      if (value.newPassword !== value.confirmPassword) {
        this.$message.error("两次输入的密码不一致");
        return;
      }

      // 提交逻辑s
      this.passwordVisible = false; // 关闭对话框
      setTimeout(() => {
        this.$message.success("密码修改成功");
      }, 500);
    },
    logout() {
      this.$store.commit("logout");
      this.$router.replace("/login");
    },
    amend() {
      console.log(this.uesrfrom);
      this.inforVisible = false;
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