<template>
  <div class="login-container">
    <!-- 粒子背景 -->
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="5"
      linesColor="#dedede"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>

    <div class="login-box">
      <h2>家纺仓储管理系统</h2>
      <el-form :model="loginForm" @submit.native.prevent="handleLogin">
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.password" type="password" placeholder="密码" />
        </el-form-item>
        <el-button type="primary" @click="handleLogin" round>登录</el-button>
      </el-form>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin() {
      try {
        const response =this.$axios.post("http://localhost:3000/login",{
          username: this.loginForm.username,
        });

        if (this.loginForm.username && this.loginForm.password) {
        this.$store.commit("loginSuccess", {
          user: {
            username: response.data.username,
            password: response.data.password,
          },
        });
        this.$router.push("/");
      } else {
        this.$message.error("请输入用户名和密码");
      }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100vh;
  background: url(../../public/sky.871d198.jpg);
  overflow: hidden;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.login-box h2 {
  margin-bottom: 20px;
  font-size: 26px;
  color: #333;
}
</style>
  